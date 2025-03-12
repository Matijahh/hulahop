import { Injectable } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { associateImagesRepository } from './repository/associate-images.repository';
import { AssociateImages } from './entities/associate-images.entity';
import { CreateAssociateImagesInput } from './dto/create-associate-images.input';
import { UpdateAssociateImagesInput } from './dto/update-associate-images.input';
import { GetAssociateImagesFilterInputDto } from './dto/get-associate-images-filter.input';
import { Like } from 'typeorm';

@Injectable()
export class AssociateImagesService extends AbstractService {
  constructor() {
    super(associateImagesRepository);
  }

  async findAll(filterDto: GetAssociateImagesFilterInputDto, userId: number) {
    let where = {};
    where = { user_id: userId };
    const order = { id: 'DESC' };
    const relations = { image: true };
    if(filterDto.image_name) {
      where = { ... where, image: { original_name: Like(`%${filterDto.image_name}%`) } };
    }
    return await this.findWithPagination({
      where,
      order,
      relations,
    },
      filterDto.limit,
      filterDto.page,
    );
  }

  async create(
    data: CreateAssociateImagesInput,
    relations: string[] = null,
  ): Promise<AssociateImages | boolean> {
    return await this.abstractCreate(data, relations);
  }

  async update(
    id: number,
    data: UpdateAssociateImagesInput,
    relations: string[] = null,
  ): Promise<AssociateImages | boolean> {
    return await this.abstractUpdate(id, { ...data, id }, relations);
  }

  async remove(ids: number[]) {
    return await this.abstractRemove(ids);
  }
}
