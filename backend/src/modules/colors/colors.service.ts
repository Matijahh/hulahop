import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { colorsRepository } from './repository/colors.repository';
import { Colors } from './entities/colors.entity';
import { CreateColorsInput } from './dto/create-colors.input';
import { UpdateColorsInput } from './dto/update-colors.input';

@Injectable()
export class ColorsService extends AbstractService {
  constructor() {
    super(colorsRepository);
  }

  async create(
    data: CreateColorsInput,
    relations: string[] = null,
  ): Promise<Colors | boolean> {
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateColorsInput,
    relations: string[] = null,
  ): Promise<Colors | boolean> {
    const update = await this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async remove(id: number) {
    const colorData = await this.findOne({ where: { id } });
    if (!colorData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
