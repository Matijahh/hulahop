import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { storeLayoutDetailsRepository } from './repository/store-layout-details.repository';
import { StoreLayoutDetails } from './entities/store-layout-details.entity';
import { CreateStoreLayoutDetailsInput } from './dto/create-store-layout-details.input';
import { UpdateStoreLayoutDetailsInput } from './dto/update-store-layout-details.input';
import { StoreLayoutSlidersService } from '../store-layout-sliders/store-layout-sliders.service';
import slugify from 'slugify';

@Injectable()
export class StoreLayoutDetailsService extends AbstractService {
  constructor(private storeLayoutSlidersService: StoreLayoutSlidersService) {
    super(storeLayoutDetailsRepository);
  }

  async create(
    data: CreateStoreLayoutDetailsInput,
    relations: string[] = null,
  ): Promise<StoreLayoutDetails | boolean> {
    data.social_links = JSON.stringify(data.social_links);
    const { slider_name, slider_description, slider_image, ...rest } = data;

    if (!this.validateStoreName(data.name)) {
      throw new BadRequestException('Invalid store name! Store name should be alphanumeric.');
    }

    // check if a store with the same name exists
    const storeLayoutDetailsData = await this.findOneByName(data.name);
    if (storeLayoutDetailsData) {
      throw new BadRequestException('A store with this name already exist!');
    }

    // use slugify to generate a slug from the store name
    const slug = slugify(data.name);
    const storeLayoutDetailsDataSlug = await this.findOneBySlug(slug);
    if (storeLayoutDetailsDataSlug) {
      throw new BadRequestException('A store with this name already exist!');
    }

    const finalSotreData = { ...rest, slug };

    const create = await this.abstractCreate(finalSotreData, relations);
    if (create) {
      await this.storeLayoutSlidersService.create({
        name: slider_name,
        description: slider_description,
        image_id: slider_image,
        store_id: create.id,
      });
    }
    return create;
  }

  private validateStoreName(name: string) {
    // should not have "/" "\" or any special characters but can have spaces
    const nameRegex = /^[a-zA-Z0-9 ]*$/; // alphanumeric and space
    return nameRegex.test(name);
  }

  async findOneByName(name: string): Promise<StoreLayoutDetails> {
    return await this.findOne({ where: { name }, relations: ['store_layout_sliders'] });
  }

  async findOneBySlug(slug: string): Promise<StoreLayoutDetails> {
    return await this.findOne({ where: { slug }, relations: ['store_layout_sliders'] });
  }

  async update(
    id: number,
    data: UpdateStoreLayoutDetailsInput,
    relations: string[] = null,
  ): Promise<StoreLayoutDetails | boolean> {
    const storeLayoutDetailsData = await this.findOne({
      where: { id },
    });

    if (!storeLayoutDetailsData) {
      throw new NotFoundException('This record does not exist!');
    }

    if (!this.validateStoreName(data.name)) {
      throw new BadRequestException('Invalid store name! Store name should be alphanumeric.');
    }

    // check if a store with the same name exists
    const storeLayoutDetailsDataCheck = await this.findOneByName(data.name);

    if (storeLayoutDetailsDataCheck && storeLayoutDetailsDataCheck.id !== id) {
      throw new BadRequestException('A store with this name already exist!');
    }

    // use slugify to generate a slug from the store name
    const slug = slugify(data.name);
    const storeLayoutDetailsDataSlug = await this.findOneBySlug(slug);
    if (storeLayoutDetailsDataSlug && storeLayoutDetailsDataSlug.id !== id) {
      throw new BadRequestException('A store with this name already exist!');
    }

    data.social_links = JSON.stringify(data.social_links);
    const { slider_name, slider_description, slider_image, ...rest } = data;
    const update = await this.abstractUpdate(id, { ...rest, id, slug }, relations);
    if (update) {
      const storeLayoutSliders = await this.storeLayoutSlidersService.findOne({
        where: { store_id: id },
      });

      await this.storeLayoutSlidersService.abstractUpdate(
        storeLayoutSliders.id,
        {
          id: storeLayoutSliders.id,
          name: slider_name,
          description: slider_description,
          image_id: slider_image,
        },
      );
    }
    return update;
  }

  async remove(id: number) {
    const storeLayoutDetailsData = await this.findOne({ where: { id } });
    if (!storeLayoutDetailsData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
