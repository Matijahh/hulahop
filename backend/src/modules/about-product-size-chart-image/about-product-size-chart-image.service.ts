import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutProductSizeChartImageDto } from './dto/create-about-product-size-chart-image.dto';
import { UpdateAboutProductSizeChartImageDto } from './dto/update-about-product-size-chart-image.dto';
import { aboutProductDataSizeChartImageRepository } from './repository/about-product-size-chart-image.repository';
import { AbstractService } from 'src/commons';

@Injectable()
export class AboutProductSizeChartImageService extends AbstractService {
  constructor() {
    super(aboutProductDataSizeChartImageRepository);
  }

  async create(
    data: CreateAboutProductSizeChartImageDto,
    relations: string[] = null,
  ) {
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  findAll() {
    return `This action returns all aboutProductSizeChartImage`;
  }

  async update(
    id: number,
    data: UpdateAboutProductSizeChartImageDto,
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

  async remove(id: number) {
    const aboutProductSizeChartImage = await this.findOne({
      where: { about_product_data_id: id },
    });
    if (!aboutProductSizeChartImage) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
