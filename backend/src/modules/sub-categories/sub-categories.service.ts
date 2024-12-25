import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { subCategoriesRepository } from './repository/sub-categories.repository';
import { SubCategories } from './entities/sub-categories.entity';
import { CreateSubCategoriesInput } from './dto/create-sub-categories.input';
import { UpdateSubCategoriesInput } from './dto/update-sub-categories.input';

@Injectable()
export class SubCategoriesService extends AbstractService {
  constructor() {
    super(subCategoriesRepository);
  }

  async createSubCategories(
    data: CreateSubCategoriesInput,
    relations: string[] = null,
  ): Promise<SubCategories | boolean> {
    data.created_at = Date.now().toString();
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateSubCategoriesInput,
    relations: string[] = null,
  ): Promise<SubCategories | boolean> {
    const subCategory = await this.findOne({ where: { id } });
    if (!subCategory) {
      throw new NotFoundException('This record does not exist!');
    }
    data.updated_at = Date.now().toString();
    const update = this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async findAllSubCategories(): Promise<any> {
    const result = this.find();
    return result;
  }

  async remove(id: number): Promise<any> {
    const remove = this.abstractRemove(id);
    return remove;
  }
}
