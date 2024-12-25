import { Injectable } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { productSubVariantsRepository } from './repository/product-sub-variants.repository';
import { ProductSubVariants } from './entities/product-sub-variants.entity';
import { CreateProductSubVariantsInput } from './dto/create-product-sub-variants.input';
import { UpdateProductSubVariantsInput } from './dto/update-product-sub-variants.input';

@Injectable()
export class ProductSubVariantsService extends AbstractService {
  constructor() {
    super(productSubVariantsRepository);
  }

  async create(
    data: CreateProductSubVariantsInput,
    relations: string[] = null,
  ): Promise<ProductSubVariants | boolean> {
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateProductSubVariantsInput,
    relations: string[] = null,
  ): Promise<ProductSubVariants | boolean> {
    const update = await this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async remove(id: number) {
    const productSubVariant = await this.findOne({ where: { id } });
    if (!productSubVariant) return false;
    const remove = await this.abstractRemove(id);
    return remove;
  }
}
