import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { storeLayoutSlidersRepository } from './repository/store-layout-sliders.repository';
import { StoreLayoutSliders } from './entities/store-layout-sliders.entity';
import { CreateStoreLayoutSlidersInput } from './dto/create-store-layout-sliders.input';
import { UpdateStoreLayoutSlidersInput } from './dto/update-store-layout-sliders.input';

@Injectable()
export class StoreLayoutSlidersService extends AbstractService {
  constructor() {
    super(storeLayoutSlidersRepository);
  }

  async create(
    data: CreateStoreLayoutSlidersInput,
    relations: string[] = null,
  ): Promise<StoreLayoutSliders | boolean> {
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateStoreLayoutSlidersInput,
    relations: string[] = null,
  ): Promise<StoreLayoutSliders | boolean> {
    const storeLayoutSlidersData = await this.findOne({ where: { id } });
    if (!storeLayoutSlidersData) {
      throw new NotFoundException('This record does not exist!');
    }
    const update = await this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async remove(id: number) {
    const storeLayoutSlidersData = await this.findOne({ where: { id } });
    if (!storeLayoutSlidersData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
