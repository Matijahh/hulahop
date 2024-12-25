import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { associateProductColorsRepository } from './repository/associate-product-colors.repository';
import { AssociateProductColors } from './entities/associate-product-colors.entity';
import { CreateAssociateProductColorsInput } from './dto/create-associate-product-colors.input';
import { UpdateAssociateProductColorsInput } from './dto/update-associate-product-colors.input';

@Injectable()
export class AssociateProductColorsService extends AbstractService {
  constructor() {
    super(associateProductColorsRepository);
  }

  async create(
    data: CreateAssociateProductColorsInput,
    relations: string[] = null,
  ): Promise<AssociateProductColors | boolean> {
    const create = this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateAssociateProductColorsInput,
    relations: string[] = null,
  ): Promise<AssociateProductColors | boolean> {
    const update = this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async remove(id: number) {
    const associateProductColorData = await this.findOne({ where: { id } });
    if (!associateProductColorData) {
      throw new NotFoundException('This record does not exist!');
    }
    const remove = this.abstractRemove(id);
    return remove;
  }
}
