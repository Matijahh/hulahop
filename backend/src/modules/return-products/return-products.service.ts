import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { returnProductsRepository } from './repository/return-products.repository';
import { ReturnProducts } from './entities/return-products.entity';
import { CreateReturnProductsInput } from './dto/create-return-products.input';
import { UpdateReturnProductsInput } from './dto/update-return-products.input';

@Injectable()
export class ReturnProductsService extends AbstractService {
  constructor() {
    super(returnProductsRepository);
  }

  async create(
    data: CreateReturnProductsInput,
    relations: string[] = null,
  ): Promise<ReturnProducts | boolean> {
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateReturnProductsInput,
    relations: string[] = null,
  ): Promise<ReturnProducts | boolean> {
    const returnProductData = await this.findOne({ where: { id } });
    if (!returnProductData) {
      throw new NotFoundException('This record does not exist!');
    }
    const update = await this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async remove(id: number) {
    const returnProductData = await this.findOne({ where: { id } });
    if (!returnProductData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
