import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutProductTopBarImageDto } from './dto/create-about-product-top-bar-image.dto';
import { UpdateAboutProductTopBarImageDto } from './dto/update-about-product-top-bar-image.dto';
import { aboutProductTopBarImageRepository } from './repository/about-product-top-bar-image.repository';
import { AbstractService } from 'src/commons';

@Injectable()
export class AboutProductTopBarImageService extends AbstractService {
  constructor() {
    super(aboutProductTopBarImageRepository);
  }

  async create(
    data: CreateAboutProductTopBarImageDto,
    relations: string[] = null,
  ) {
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  findAll() {
    return `This action returns all aboutProductTopBarImage`;
  }

  async update(
    id: number,
    data: UpdateAboutProductTopBarImageDto,
    relations: string[] = null,
  ) {
    const aboutProductSizeChartImageData = await this.findOne({
      where: { id },
    });
    if (!aboutProductSizeChartImageData) {
      throw new NotFoundException('This record does not exist!');
    }
    const update = await this.abstractUpdate(id, data, relations);
    return update;
  }

  remove(id: number) {
    return `This action removes a #${id} aboutProductTopBarImage`;
  }
}
