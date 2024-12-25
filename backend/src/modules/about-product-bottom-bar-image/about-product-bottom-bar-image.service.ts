import { Injectable } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { aboutProductBottomBarImageRepository } from './repository/about-product-bottom-bar-image.repository';
import { AboutProductBottomBarImage } from './entities/about-product-bottom-bar-image.entity';
import { CreateAboutProductBottomBarImageInput } from './dto/create-about-product-bottom-bar-image.input';
import { UpdateAboutProductBottomBarImageInput } from './dto/update-about-product-bottom-bar-image.input';

@Injectable()
export class AboutProductBottomBarImageService extends AbstractService {
  constructor() {
    super(aboutProductBottomBarImageRepository);
  }

  async create(
    data: CreateAboutProductBottomBarImageInput,
    relations: string[] = null,
  ): Promise<AboutProductBottomBarImage | boolean> {
    data.created_at = Date.now().toString();
    const create = this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateAboutProductBottomBarImageInput,
    relations: string[] = null,
  ): Promise<AboutProductBottomBarImage | boolean> {
    data.updated_at = Date.now().toString();
    const update = this.abstractUpdate(id, data, relations);
    return update;
  }

  async remove(id: number) {
    const aboutProductBottomBarImage = await this.findOne({ where: { id } });
    if (!aboutProductBottomBarImage) {
      throw new Error('About product bottom bar image not found');
    }
    const remove = this.abstractRemove(id);
    return remove;
  }
}
