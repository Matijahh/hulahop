import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { sizesRepository } from './repository/sizes.repository';
import { Sizes } from './entities/sizes.entity';
import { CreateSizesInput } from './dto/create-sizes.input';
import { UpdateSizesInput } from './dto/update-sizes.input';

@Injectable()
export class SizesService extends AbstractService {
  constructor() {
    super(sizesRepository);
  }

  async create(
    data: CreateSizesInput,
    relations: string[] = null,
  ): Promise<Sizes | boolean> {
    const create = this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateSizesInput,
    relations: string[] = null,
  ): Promise<Sizes | boolean> {
    const update = this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async remove(id: number) {
    const sizesData = await this.findOne({ where: { id } });
    if (!sizesData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
