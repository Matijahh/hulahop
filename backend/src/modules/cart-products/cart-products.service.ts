import { BadRequestException, Injectable } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { cartProductsRepository } from './repository/cart-products.repository';
import { CartProducts } from './entities/cart-products.entity';
import { CreateCartProductsInput } from './dto/create-cart-products.input';
import { UpdateCartProductsInput } from './dto/update-cart-products.input';
import { CartsService } from '../carts/carts.service';
import { Carts } from '../carts/entities/carts.entity';
import { Actiontype } from '../../commons/constant';
import { ProductSubVariantsService } from '../product-sub-variants/product-sub-variants.service';

@Injectable()
export class CartProductsService extends AbstractService {
  constructor(private cartsService: CartsService) {
    super(cartProductsRepository);
  }

  async create(
    data: CreateCartProductsInput,
    userId: number,
  ): Promise<CartProducts | boolean> {
    const { action_type, ...rest } = data;
    const checkCartExists = await this.cartsService.findOne({
      where: { user_id: userId },
    });

    let cartId: number;
    if (!checkCartExists) {
      const createCart = (await this.cartsService.create({
        user_id: userId,
      })) as Carts;
      cartId = createCart.id;
    } else {
      cartId = checkCartExists.id;
    }

    switch (action_type) {
      case Actiontype.ADD_TO_CART:
        const checkProductExists = await this.findOne({
          where: {
            associate_product_id: rest.associate_product_id,
            cart_id: cartId,
            product_sub_variant_id: rest.product_sub_variant_id,
          },
        });
        if (!checkProductExists) {
          const addProductCart = await this.abstractCreate({
            ...rest,
            cart_id: cartId,
            quantity: rest.quantity,
            created_at: Date.now(),
          });
          return addProductCart;
        } else {
          const updateQty = await this.abstractUpdate(checkProductExists.id, {
            id: checkProductExists.id,
            quantity: checkProductExists.quantity + rest.quantity,
            updated_at: Date.now(),
          });
          return updateQty;
        }
      case Actiontype.ADD_QTY:
        const addQty = await this.findOne({
          where: {
            associate_product_id: rest.associate_product_id,
            cart_id: cartId,
            product_sub_variant_id: rest.product_sub_variant_id,
          },
        });
        if (!addQty) {
          throw new BadRequestException('Product not found in cart');
        }
        const updateQty = await this.abstractUpdate(addQty.id, {
          id: addQty.id,
          quantity: addQty.quantity + 1,
          updated_at: Date.now(),
        });
        return updateQty;
      case Actiontype.REMOVE_QTY:
        const removeQty = await this.findOne({
          where: {
            associate_product_id: rest.associate_product_id,
            cart_id: cartId,
            product_sub_variant_id: rest.product_sub_variant_id,
          },
        });
        if (!removeQty) {
          throw new BadRequestException('Product not found in cart');
        }
        if (removeQty.quantity > 1) {
          return await this.abstractUpdate(removeQty.id, {
            id: removeQty.id,
            quantity: removeQty.quantity - 1,
            updated_at: Date.now(),
          });
        } else {
          // Assuming you have a method to remove the cart
          await this.abstractRemove({ cart_id: cartId });
        }
      case Actiontype.REMOVE:
        const checkCartExists = await this.find({
          where: {
            cart_id: cartId,
          },
        });
        if (checkCartExists.length === 0) {
          throw new BadRequestException('Cart is empty');
        }
        const removedCart = await this.abstractRemove({ cart_id: cartId });
        return removedCart;

      case Actiontype.REMOVE_PRODUCT:
        const productExists = await this.findOne({
          where: {
            associate_product_id: rest.associate_product_id,
            cart_id: cartId,
            product_sub_variant_id: rest.product_sub_variant_id,
          },
        });

        if (!productExists) {
          throw new BadRequestException('Product is not in the cart');
        }

        const removedProduct = await this.abstractRemove({
          id: productExists.id,
        });
        return removedProduct;

      default:
        break;
    }
  }

  async update(
    id: number,
    data: UpdateCartProductsInput,
    relations: string[] = null,
  ): Promise<CartProducts | boolean> {
    const update = this.abstractUpdate(id, data, relations);
    return update;
  }
}
