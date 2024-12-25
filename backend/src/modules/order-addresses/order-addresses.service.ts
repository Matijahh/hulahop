import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { orderAddressesRepository } from './repository/order-addresses.repository';
import { OrderAddresses } from './entities/order-addresses.entity';
import { CreateOrderAddressesInput } from './dto/create-order-addresses.input';
import { UpdateOrderAddressesInput } from './dto/update-order-addresses.input';

@Injectable()
export class OrderAddressesService extends AbstractService {
  constructor() {
    super(orderAddressesRepository);
  }

  async create(
    data: CreateOrderAddressesInput,
    relations: string[] = null,
  ): Promise<OrderAddresses | boolean> {
    data.created_at = Date.now().toString();
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateOrderAddressesInput,
    relations: string[] = null,
  ): Promise<OrderAddresses | boolean> {
    const orderAddressesData = await this.findOne({ where: { id } });
    if (!orderAddressesData) {
      throw new NotFoundException('This record does not exist!');
    }
    data.updated_at = Date.now().toString();
    const update = await this.abstractUpdate(id, data, relations);
    return update;
  }

  async remove(id: number) {
    const orderAddressesData = await this.findOne({ where: { id } });
    if (!orderAddressesData) {
      throw new NotFoundException('This record does not exist!');
    }
    const remove = await this.abstractRemove(id);
    return remove;
  }
}
