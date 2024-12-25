import { Injectable } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { associateImagesRepository } from './repository/associate-images.repository';
import { AssociateImages } from './entities/associate-images.entity';
import { CreateAssociateImagesInput } from './dto/create-associate-images.input';
import { UpdateAssociateImagesInput } from './dto/update-associate-images.input';

@Injectable()
export class AssociateImagesService extends AbstractService {
  constructor() {
    super(associateImagesRepository);
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
