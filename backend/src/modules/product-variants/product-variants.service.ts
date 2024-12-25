import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { productVariantsRepository } from './repository/product-variants.repository';
import { ProductVariants } from './entities/product-variants.entity';
import { CreateProductVariantsInput } from './dto/create-product-variants.input';
import { UpdateProductVariantsInput } from './dto/update-product-variants.input';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ProductVariantsService extends AbstractService {
  constructor() {
    super(productVariantsRepository);
  }

  async createProductVariant(
    data: CreateProductVariantsInput,
    relations: string[] = null,
  ): Promise<ProductVariants | boolean> {
    data.created_at = Date.now().toString();
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async updateProductVariant(
    id: number,
    data: UpdateProductVariantsInput,
    relations: string[] = null,
  ): Promise<UpdateResult> {
    const productVariantData = await this.findOne({ where: { id } });
    if (!productVariantData) {
      throw new NotFoundException('This record does not exist!');
    }
    data.updated_at = Date.now().toString();
    const update = await this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async removeProductVariant(id: number) {
    const productVariantData = await this.findOne({ where: { id } });
    if (!productVariantData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
