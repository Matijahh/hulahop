import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { productsRepository } from './repository/products.repository';
import { Products } from './entities/products.entity';
import { CreateProductsInput } from './dto/create-products.input';
import { UpdateProductsInput } from './dto/update-products.input';
import { Like, UpdateResult } from 'typeorm';
import { ProductVariantsService } from '../product-variants/product-variants.service';
import { dataSource } from 'src/core/data-source';
import { ProductVariants } from '../product-variants/entities/product-variants.entity';
import { ProductSubVariants } from '../product-sub-variants/entities/product-sub-variants.entity';
import { filterInputDto } from './dto/filter-input.dto';
import { masterFilterInputDto } from './dto/master-filter.dto';
import { productVariantsRepository } from '../product-variants/repository/product-variants.repository';

@Injectable()
export class ProductsService extends AbstractService {
  constructor(private productVariantsService: ProductVariantsService) {
    super(productsRepository);
  }

  async createProduct(
    data: CreateProductsInput,
    relations: string[] = null,
  ): Promise<Products | boolean> {
    data.created_at = Date.now();
    const { product_variants, ...rest } = data;
    const queryRunner = await dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const createdProduct = await queryRunner.manager.save(Products, {
        ...rest,
        created_at: Date.now(),
      });
      if (createdProduct) {
        for (const product_variant of product_variants) {
          const productVariant = await queryRunner.manager.save(
            ProductVariants,
            {
              product_id: createdProduct.id,
              color_id: product_variant.color_id,
              image_id: product_variant.image_id,
            },
          );
          for (const variant of product_variant.sub_variants) {
            await queryRunner.manager.save(ProductSubVariants, {
              product_variant_id: productVariant.id,
              value: variant.value,
              quantity: variant.quantity,
            });
          }
        }
        await queryRunner.commitTransaction();
        return createdProduct;
      }
      return false;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: number,
    data: UpdateProductsInput,
  ): Promise<Products | boolean | UpdateResult> {
    const { product_variants, ...rest } = data;
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const updateProduct = await queryRunner.manager.update(Products, id, {
        ...rest,
        created_at: Date.now(),
      });
      if (updateProduct) {
        const existProductVaraints = await queryRunner.manager.find(
          ProductVariants,
          { where: { product_id: id } },
        );
        for (const existProductVaraint of existProductVaraints) {
          await queryRunner.manager.delete(ProductSubVariants, {
            product_variant_id: existProductVaraint.id,
          });
          await queryRunner.manager.delete(ProductVariants, {
            id: existProductVaraint.id,
          });
        }
        for (const product_variant of product_variants) {
          const productVariant = await queryRunner.manager.save(
            ProductVariants,
            {
              product_id: id,
              color_id: product_variant.color_id,
              image_id: product_variant.image_id,
            },
          );
          for (const variant of product_variant.sub_variants) {
            await queryRunner.manager.save(ProductSubVariants, {
              product_variant_id: productVariant.id,
              value: variant.value,
              quantity: variant.quantity,
            });
          }
        }
        await queryRunner.commitTransaction();
        if (updateProduct && updateProduct.affected > 0) {
          return await this.findOne({
            where: { id },
            relations: {
              product_variants: {
                sub_variants: true,
                color: true,
              },
              category: true,
              sub_category: true,
            },
          });
        }
      }
      return false;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const relatedVariants = await productVariantsRepository.find({
      where: { id: id },
    });
    console.log('related', productVariantsRepository);
    const categoriesData = await this.findOne({ where: { id } });
    if (!categoriesData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }

  async findAll(query: filterInputDto) {
    let where = {};
    if (query.category_id) {
      where = {
        ...where,
        category_id: query.category_id,
      };
    }
    if (query.subcategory_id) {
      where = {
        ...where,
        subcategory_id: query.subcategory_id,
      };
    }
    if (query.search_string) {
      where = { ...where, name: Like(`%${query.search_string}%`) };
    }
    const findProduct = await this.find({
      where,
      order: { id: 'ASC', product_variants: { sub_variants: { id: 'ASC' } } },
      relations: {
        product_variants: {
          sub_variants: true,
          color: true,
        },
        category: true,
        sub_category: true,
      },
    });
    return findProduct;
  }

  async masterFilter(query: masterFilterInputDto) {
    let where = {};
    if (query.search_string) {
      where = [
        { name: Like(`%${query.search_string}%`) },
        {
          product_variants: {
            sub_variants: { value: Like(`%${query.search_string}%`) },
          },
        },
        {
          product_variants: {
            color: { name: Like(`%${query.search_string}%`) },
          },
        },
        {
          category: { name: Like(`%${query.search_string}%`) },
        },
        {
          subcategory: { name: Like(`%${query.search_string}%`) },
        },
      ];
    }
    const findProduct = await this.find({
      where,
      relations: {
        product_variants: { sub_variants: true, color: true },
        category: true,
        subcategory: true,
      },
    });
    return findProduct;
  }
}
