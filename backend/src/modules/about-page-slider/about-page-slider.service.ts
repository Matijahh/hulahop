import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutPageSliderInput } from './dto/create-about-page-slider.dto';
import { aboutPageSliderRepository } from './repository/about-page-slider.repository';
import { AbstractService } from 'src/commons';
import { AboutPageSlider } from './entities/about-page-slider.entity';
import { UpdateAboutPageSliderInput } from './dto/update-about-page-slider.dto';

@Injectable()
export class AboutPageSliderService extends AbstractService {
  constructor() {
    super(aboutPageSliderRepository);
  }

  async create(
    data: CreateAboutPageSliderInput,
    relations: string[] = null,
  ): Promise<AboutPageSlider | boolean> {
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateAboutPageSliderInput,
    relations: string[] = null,
  ): Promise<AboutPageSlider | boolean> {
    const aboutPageSliderData = await this.findOne({ where: { id } });
    if (!aboutPageSliderData) {
      throw new NotFoundException('This record does not exist!');
    }
    const update = await this.abstractUpdate(id, data, relations);
    return update;
  }

  async remove(id: number) {
    const aboutPageSliderData = await this.findOne({ where: { id } });
    if (!aboutPageSliderData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
