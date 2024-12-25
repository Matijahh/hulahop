import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { shopSliderRepository } from './repository/shop-slider.repository';
import { ShopSlider } from './entities/shop-slider.entity';
import { CreateShopSliderInput } from './dto/create-shop-slider.input';
import { UpdateShopSliderInput } from './dto/update-shop-slider.input';

@Injectable()
export class ShopSliderService extends AbstractService {
  constructor() {
    super(shopSliderRepository);
  }

  async create(
    data: CreateShopSliderInput,
    relations: string[] = null,
  ): Promise<ShopSlider | boolean> {
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateShopSliderInput,
    relations: string[] = null,
  ): Promise<ShopSlider | boolean> {
    const shopSliderData = await this.findOne({ where: { id } });
    if (!shopSliderData) {
      throw new NotFoundException('This record does not exist!');
    }
    const update = await this.abstractUpdate(id, data, relations);
    return update;
  }

  async remove(id: number) {
    const shopSliderData = await this.findOne({ where: { id } });
    if (!shopSliderData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
