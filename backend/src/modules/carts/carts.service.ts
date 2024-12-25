import { Injectable } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { cartsRepository } from './repository/carts.repository';
import { Carts } from './entities/carts.entity';
import { CreateCartsInput } from './dto/create-carts.input';
import { UpdateCartsInput } from './dto/update-carts.input';

@Injectable()
export class CartsService extends AbstractService {
  constructor() {
    super(cartsRepository);
  }

  async create(
    data: CreateCartsInput,
    relations: string[] = null,
  ): Promise<Carts | boolean> {
    const create = this.abstractCreate(data, relations);
    return create;
  }

  removeCart(userId: number) {
    return this.abstractRemove({ user_id: userId });
  }
}
