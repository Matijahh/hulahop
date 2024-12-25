import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { orderProductsRepository } from './repository/order-products.repository';
import { OrderProducts } from './entities/order-products.entity';
import { CreateOrderProductsInput } from './dto/create-order-products.input';
import { UpdateOrderProductsInput } from './dto/update-order-products.input';

@Injectable()
export class OrderProductsService extends AbstractService {
  constructor() {
    super(orderProductsRepository);
  }

  async create(
    data: CreateOrderProductsInput,
    relations: string[] = null,
  ): Promise<OrderProducts | boolean> {
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateOrderProductsInput,
    relations: string[] = null,
  ): Promise<OrderProducts | boolean> {
    const update = await this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async remove(id: number) {
    const orderProductData = await this.findOne({ where: { id } });
    if (!orderProductData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
