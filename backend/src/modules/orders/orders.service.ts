import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { ordersRepository } from './repository/orders.repository';
import { Orders } from './entities/orders.entity';
import {
  CreateOrdersInput,
  UpdateOrderStatusInput,
} from './dto/create-orders.input';
import { UpdateOrdersInput } from './dto/update-orders.input';
import { generateSku } from 'src/commons';
import { dataSource } from 'src/core/data-source';
import { OrderProducts } from '../order-products/entities/order-products.entity';
import { OrderAddresses } from '../order-addresses/entities/order-addresses.entity';
import { ProductSubVariantsService } from '../product-sub-variants/product-sub-variants.service';
import { CartsService } from '../carts/carts.service';
import { Carts } from '../carts/entities/carts.entity';
import { ProductSubVariants } from '../product-sub-variants/entities/product-sub-variants.entity';
import { FilterInputDto } from './dto/filter-dto-input';
import { UserTypes } from 'src/commons/enum';
import { ORDER_STATUS } from 'src/commons/constant';
import { Users } from '../users/entities/users.entity';
import { MailerService } from 'src/providers/mailer/mailer.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService extends AbstractService {
  constructor(
    private productSubVariantsService: ProductSubVariantsService,
    private readonly cartsService: CartsService,
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {
    super(ordersRepository);
  }

  async findAll(filterDto: FilterInputDto, user: any): Promise<Orders[]> {
    let where = {};
    if (user && user.type === UserTypes.USER) {
      where = { ...where, user_id: user.id };
    }
    if (filterDto.associate_id) {
      where = {
        ...where,
        order_products: {
          associate_product: { user_id: filterDto.associate_id },
        },
      };
    }

    if (filterDto.status) {
      where = { ...where, status: filterDto.status };
    }

    const result = await this.find({
      where,
      relations: {
        order_products: {
          associate_product: {
            product: true,
            user: { store_layout_details: true },
            cover_image_color: true,
          },
          product_variant: {
            color: true,
          },
          product_sub_variant: true,
        },
        order_addresses: true,
      },
    });
    return result;
  }

  async create(
    data: CreateOrdersInput,
    userId: number,
  ): Promise<Orders | boolean> {
    data.created_at = Date.now().toString();
    data.sku = generateSku();
    const { order_addresses, ...rest } = data;

    const emailProducts = [];

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const cart = await this.cartsService.findOne({
        where: { user_id: userId },
        relations: {
          cart_products: { associate_product: { user: true } },
          user: true,
        },
      });

      if (!cart) {
        throw new NotFoundException('Cart not found');
      }

      const createOrder = await queryRunner.manager.save(Orders, {
        ...rest,
        user_id: cart.user_id,
        created_at: Date.now().toString(),
      });

      const order_products = cart.cart_products.map((cart_product) => {
        const product = {
          name: cart_product?.associate_product?.name,
          quantity: cart_product?.quantity,
          price: cart_product?.associate_product?.price,
          totalPrice:
            cart_product?.associate_product?.price * cart_product?.quantity,
        };

        emailProducts.push(product);

        return {
          associate_product_id: cart_product.associate_product_id,
          product_variant_id: cart_product.product_variant_id,
          product_sub_variant_id: cart_product.product_sub_variant_id,
          quantity: cart_product.quantity,
          price:
            Number(cart_product.associate_product.price) *
            Number(cart_product.quantity),
        };
      });

      const totalAmount = order_products.reduce(
        (acc: number, val: OrderProducts) => acc + val.price,
        0,
      );

      await queryRunner.manager.update(Orders, createOrder.id, {
        total_amount: totalAmount,
        sub_total_amount: totalAmount,
        tax: '0',
      });
      for (const order_product of order_products) {
        order_product.order_id = createOrder.id;
        await queryRunner.manager.save(OrderProducts, order_product);
      }
      order_addresses.order_id = createOrder.id;
      await queryRunner.manager.save(OrderAddresses, {
        ...order_addresses,
        created_at: Date.now().toString(),
      });
      await queryRunner.manager.delete(Carts, { id: cart.id });
      const html = this.mailerService.generateHtml({
        fileName: 'order-receipt',
        context: {
          ...order_addresses,
          customerName: `${cart?.user?.first_name} ${cart?.user?.last_name}`,
          products: emailProducts,
          orderTotal: totalAmount,
        },
      });

      [cart?.user?.email, process.env.SMTP_SENDER].map((email) => {
        this.mailerService.sendOrderReceipt({
          from: process.env.SMTP_SENDER,
          to: email,
          html,
        });
      });

      const orderNotificationHtml = this.mailerService.generateHtml({
        fileName: 'order-notification',
        context: {
          sku: createOrder.sku,
        },
      });

      const adminAndAssociateEmails = new Set<string>();
      // get all admin emails
      const admins = await this.usersService.getAllAdmins();
      const adminEmails = admins.map((admin) => admin.email);
      adminEmails.forEach((email) => adminAndAssociateEmails.add(email));
      // get all the associate emails that are associated with the products in the order
      const associateEmails = cart.cart_products.map(
        (cartProduct) => cartProduct.associate_product.user.email,
      );
      associateEmails.forEach((email) => adminAndAssociateEmails.add(email));

      Array.from(adminAndAssociateEmails).map((email: string) => {
        this.mailerService.sendOrderNotification({
          from: process.env.SMTP_SENDER,
          to: email,
          html: orderNotificationHtml,
          sku: createOrder.sku,
        });
      });

      await queryRunner.commitTransaction();
      return this.findOne({ where: { id: createOrder.id } });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async createGuest(
    data: CreateOrdersInput,
    cart: any,
  ): Promise<Orders | boolean> {
    data.created_at = Date.now().toString();
    data.sku = generateSku();
    const { order_addresses, ...rest } = data;

    const emailProducts = [];

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (!cart) {
        throw new NotFoundException('Cart not found');
      }

      const createOrder = await queryRunner.manager.save(Orders, {
        ...rest,
        // user_id: cart.user_id,
        created_at: Date.now().toString(),
      });

      const order_products = cart.cart_products.map((cart_product) => {
        const product = {
          name: cart_product?.associate_product?.name,
          quantity: cart_product?.quantity,
          price: cart_product?.associate_product?.price,
          totalPrice:
            cart_product?.associate_product?.price * cart_product?.quantity,
        };

        emailProducts.push(product);

        return {
          associate_product_id: cart_product.associate_product_id,
          product_variant_id: cart_product.product_variant_id,
          product_sub_variant_id: cart_product.product_sub_variant_id,
          quantity: cart_product.quantity,
          price:
            Number(cart_product.associate_product.price) *
            Number(cart_product.quantity),
        };
      });

      const totalAmount = order_products.reduce(
        (acc: number, val: OrderProducts) => acc + val.price,
        0,
      );

      await queryRunner.manager.update(Orders, createOrder.id, {
        total_amount: totalAmount,
        sub_total_amount: totalAmount,
        tax: '0',
      });
      for (const order_product of order_products) {
        order_product.order_id = createOrder.id;
        await queryRunner.manager.save(OrderProducts, order_product);
      }
      order_addresses.order_id = createOrder.id;
      await queryRunner.manager.save(OrderAddresses, {
        ...order_addresses,
        created_at: Date.now().toString(),
      });
      await queryRunner.manager.delete(Carts, { id: cart.id });
      const html = this.mailerService.generateHtml({
        fileName: 'order-receipt',
        context: {
          ...order_addresses,
          customerName: `${cart?.user?.first_name} ${cart?.user?.last_name}`,
          products: emailProducts,
          orderTotal: totalAmount,
        },
      });

      // [cart?.user?.email, process.env.SMTP_SENDER].map((email) => {
      //   this.mailerService.sendOrderReceipt({
      //     from: process.env.SMTP_SENDER,
      //     to: email,
      //     html,
      //   });
      // });
      //send email to guest
      this.mailerService.sendOrderReceipt({
        from: process.env.SMTP_SENDER,
        to: order_addresses.email,
        html,
      });

      const orderNotificationHtml = this.mailerService.generateHtml({
        fileName: 'order-notification',
        context: {
          sku: createOrder.sku,
        },
      });

      const adminAndAssociateEmails = new Set<string>();
      // get all admin emails
      const admins = await this.usersService.getAllAdmins();
      const adminEmails = admins.map((admin) => admin.email);
      adminEmails.forEach((email) => adminAndAssociateEmails.add(email));
      // get all the associate emails that are associated with the products in the order
      const associateEmails = cart.cart_products.map(
        (cartProduct) => cartProduct.associate_product.user.email,
      );
      associateEmails.forEach((email) => adminAndAssociateEmails.add(email));

      Array.from(adminAndAssociateEmails).map((email: string) => {
        this.mailerService.sendOrderNotification({
          from: process.env.SMTP_SENDER,
          to: email,
          html: orderNotificationHtml,
          sku: createOrder.sku,
        });
      });

      await queryRunner.commitTransaction();
      return this.findOne({ where: { id: createOrder.id } });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: number,
    data: UpdateOrdersInput,
    relations: string[] = null,
  ): Promise<Orders | boolean> {
    const orderData = await this.findOne({ where: { id } });
    if (!orderData) {
      throw new NotFoundException('This record does not exist!');
    }
    data.updated_at = Date.now().toString();
    const update = await this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async updateOrderStatus(id: number, data: UpdateOrderStatusInput) {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const relations = {
      order_products: {
        associate_product: {
          product: {
            product_variants: {
              sub_variants: true,
            },
          },
          user: {
            store_layout_details: true,
          },
        },
      },
      user: true,
    };
    const [result] = await this.find({
      where: { id },
      relations,
    });
    if (!result) {
      throw new NotFoundException('Order not found');
    }

    if (result.status === data.status) {
      throw new ConflictException('AlreadyUpdateStatus');
    }

    if (result.status === ORDER_STATUS.CANCELLED) {
      throw new ConflictException('AlreadyCancelled');
    }

    try {
      let updateResults = [];

      if (
        data.status === ORDER_STATUS.DISPATCHED ||
        data.status === ORDER_STATUS.PENDING
      ) {
        const finalUpdate = await queryRunner.manager.update(Orders, id, {
          status: data.status,
          updated_at: Date.now().toString(),
        });
        updateResults.push(finalUpdate);
      }
      if (data.status === ORDER_STATUS.DELIVERED) {
        // update user wallet
        for (let i = 0; i < result.order_products.length; i++) {
          const orderProduct = result.order_products[i];
          const marginPrice =
            (Number(orderProduct.associate_product.price) -
              Number(orderProduct.associate_product.product.price)) *
            Number(orderProduct.quantity);
          await queryRunner.manager.increment(
            Users,
            { id: orderProduct.associate_product.user.id },
            'wallet',
            marginPrice,
          );
        }
        // update order status
        const finalUpdate = await queryRunner.manager.update(Orders, id, {
          status: data.status,
          updated_at: Date.now().toString(),
        });
        updateResults.push(finalUpdate);
      }

      // if order is cancelled
      if (data.status === ORDER_STATUS.CANCELLED) {
        // Group order_products by product_sub_variant_id
        const groupedOrderProducts = result.order_products.reduce(
          (groups, orderProduct) => {
            const key = orderProduct.product_sub_variant_id;
            if (!groups[key]) {
              groups[key] = [];
            }
            groups[key].push(orderProduct);
            return groups;
          },
          {},
        );

        // Update quantity for each group
        for (let productSubVariantId in groupedOrderProducts) {
          const orderProducts = groupedOrderProducts[productSubVariantId];

          const productSubVariant =
            await this.productSubVariantsService.findOne({
              where: { id: productSubVariantId },
            });

          if (productSubVariant) {
            let totalQuantity = orderProducts.reduce(
              (total, orderProduct) => total + Number(orderProduct.quantity),
              0,
            );

            const updateResult = await queryRunner.manager.update(
              ProductSubVariants,
              productSubVariantId,
              {
                quantity: Number(productSubVariant.quantity) + totalQuantity,
              },
            );
            updateResults.push(updateResult);
          }
        }
        await queryRunner.manager.update(Orders, id, {
          status: data.status,
          updated_at: Date.now().toString(),
        });
      }

      await queryRunner.commitTransaction();

      return updateResults.flat();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const orderData = await this.findOne({ where: { id } });
    if (!orderData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
