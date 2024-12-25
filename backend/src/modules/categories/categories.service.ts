import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { categoriesRepository } from './repository/categories.repository';
import { Categories } from './entities/categories.entity';
import { CreateCategoriesInput } from './dto/create-categories.input';
import { UpdateCategoriesInput } from './dto/update-categories.input';

@Injectable()
export class CategoriesService extends AbstractService {
  constructor() {
    super(categoriesRepository);
  }

  async create(
    data: CreateCategoriesInput,
    relations: string[] = null,
  ): Promise<Categories | boolean> {
    data.created_at = Date.now().toString();
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateCategoriesInput,
    relations: string[] = null,
  ): Promise<Categories | boolean> {
    const categoriesData = await this.findOne({ where: { id } });
    if (!categoriesData) {
      throw new NotFoundException('This record does not exist!');
    }
    data.updated_at = Date.now().toString();
    const update = await this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async updateOrder(id: number, data: UpdateCategoriesInput) {
    const categoriesData = await this.findOne({ where: { id: id } });
    if (!categoriesData) {
      throw new NotFoundException('This record does not exist!');
    }
    const update = await this.abstractUpdate(id, {...data, id});
    return update;
  }


  async remove(id: number) {
    const categoriesData = await this.findOne({ where: { id } });
    if (!categoriesData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
