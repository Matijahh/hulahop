import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { associateProductsRepository } from './repository/associate-products.repository';
import { AssociateProducts } from './entities/associate-products.entity';
import { CreateAssociateProductsInput } from './dto/create-associate-products.input';
import { UpdateAssociateProductsInput } from './dto/update-associate-products.input';
import { AssociateProductColorsService } from '../associate-product-colors/associate-product-colors.service';
import { GetAssociateProductFilterInputDto } from './dto/get-associate-product-filter.input';
import { In, Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import { masterFilterInputDto } from './dto/master-filter.dto';

@Injectable()
export class AssociateProductsService extends AbstractService {
  MAX_ASSOCIATE_HIGHLIGHTED = 8;
  MAX_BEST_SELLING = 12;

  constructor(
    private associateProductColorsService: AssociateProductColorsService,
    private imagesService: ImagesService,
  ) {
    super(associateProductsRepository);
  }

  async findAll(filterDto: GetAssociateProductFilterInputDto) {
    const categoryIds = Array.isArray(filterDto.category_ids)
      ? filterDto.category_ids.map(Number)
      : filterDto.category_ids ? [Number(filterDto.category_ids)] : null;

    const subCategoryIds = Array.isArray(filterDto.sub_category_ids)
      ? filterDto.sub_category_ids.map(Number)
      : filterDto.sub_category_ids ? [Number(filterDto.sub_category_ids)] : null;

    let where = {};
    let order = {};

    if (categoryIds) {
      where = {
        ...where,
        product: {
          category_id: In(categoryIds),
        },
      };
    }
    if (subCategoryIds) {
      where = {
        ...where,
        product: {
          subcategory_id: In(subCategoryIds),
        },
      };
    }
    if (filterDto.search_string) {
      where = { ...where, name: Like(`%${filterDto.search_string}%`) };
    }
    if (filterDto.user_id) {
      where = { ...where, user_id: filterDto.user_id };
    }
    if (filterDto.best_selling === 'true') {
      where = { ...where, best_selling: true };
    }
    if (filterDto.price_low_to_high === 'true') {
      order = { ...order, price: 'ASC' };
    } else if (filterDto.price_low_to_high === 'false') {
      order = { ...order, price: 'DESC' };
    }

    if(filterDto.date_added === 'true') {
      order = { ...order, created_at: 'ASC' };
    } else if (filterDto.date_added === 'false') {
      order = { ...order, created_at: 'DESC' };
    }

    if(Object.keys(order).length === 0) {
      order = { id: 'DESC' };
    }

    if (filterDto.associate_highlighted === 'true') {
      where = { ...where, associate_highlighted: true };
    }else if (filterDto.associate_highlighted === 'false') {
      where = { ...where, associate_highlighted: false };
    }

    if (filterDto.limit && filterDto.page) {
      const limit = filterDto.limit;
      const page = filterDto.page;

      // Use the findWithPagination method for paginated results
      return await this.findWithPagination(
        {
          where,
          relations: {
            product: {
              category: true,
              sub_category: true,
              product_variants: {
                color: true,
                sub_variants: true,
              },
            },
            user: { store_layout_details: true },
            cover_image_color: true,
            associate_product_colors: { color: true },
          },
          order,
        },
        limit,
        page,
      );
    } else {
      // If limit and page are not provided, return all results without pagination
      return await this.find({
        where,
        relations: {
          product: {
            category: true,
            sub_category: true,
            product_variants: {
              color: true,
              sub_variants: true,
            },
          },
          user: { store_layout_details: true },
          cover_image_color: true,
          associate_product_colors: { color: true },
        },
        order,
      });
    }
  }
  

  async create(
    data: CreateAssociateProductsInput,
    relations: string[] = null,
  ): Promise<AssociateProducts | boolean> {
    data.created_at = Date.now().toString();
    const saveImage = await this.convertBase64ToImgWithSave(data.base64);
    const createdProduct = await this.abstractCreate(
      { ...data, image_id: saveImage.id },
      relations,
    );
    if (createdProduct && data?.selected_colors?.length) {
      for (const color_id of data?.selected_colors) {
        await this.associateProductColorsService.create({
          associate_product_id: createdProduct.id,
          color_id,
        });
      }
    }
    return createdProduct;
  }

  async update(
    id: number,
    data: UpdateAssociateProductsInput,
    relations: string[] = null,
  ): Promise<AssociateProducts | boolean> {
    const associateProductData = await this.findOne({ where: { id } });
    if (!associateProductData) {
      throw new NotFoundException('This record does not exist!');
    }
    data.updated_at = Date.now().toString();
    const { selected_colors, base64, ...rest } = data;
    const saveImage = await this.convertBase64ToImgWithSave(base64);
    const updatedProduct = await this.abstractUpdate(
      id,
      { ...rest, image_id: saveImage.id },
      relations,
    );
    await this.imagesService.remove(associateProductData.image_id);
    if (updatedProduct) {
      const existingColors = await this.associateProductColorsService.find({
        where: { associate_product_id: updatedProduct.id },
      });
      if (existingColors.length > 0) {
        for (const color of existingColors) {
          await this.associateProductColorsService.remove(color.id);
        }
      }
      for (const color_id of selected_colors) {
        await this.associateProductColorsService.create({
          associate_product_id: updatedProduct.id,
          color_id,
        });
      }
    }
    return updatedProduct;
  }

  async updateStatus(
    id: number,
    data: any,
    relations: string[] = null,
  ): Promise<AssociateProducts | boolean> {
    const associateProductData = await this.findOne({ where: { id } });
    if (!associateProductData) {
      throw new NotFoundException('This record does not exist!');
    }
    const updatedProduct = await this.abstractUpdate(
      id,
      { ...data, id },
      relations,
    );
    return updatedProduct;
  }

  async updateBestSellingStatus(
    id: number,
    data: any,
    relations: string[] = null,
  ): Promise<AssociateProducts | boolean> {
    const associateProductData = await this.findOne({ where: { id } });
    if (!associateProductData) {
      throw new NotFoundException('This record does not exist!');
    }
    if (data.best_selling) {
      const bestSellingProducts = await this.find({
        where: { best_selling: true },
      });
      if (bestSellingProducts.length >= this.MAX_BEST_SELLING) {
        throw new BadRequestException(
          `You can only mark ${this.MAX_BEST_SELLING} products as best selling`,
        );
      }
    }
    const updatedProduct = await this.abstractUpdate(
      id,
      { ...data, id },
      relations,
    );
    return updatedProduct;
  }

  async updateHighlightStatus(
    id: number,
    data: any,
    relations: string[] = null,
  ): Promise<AssociateProducts | boolean> {
    const associateProductData = await this.findOne({ where: { id } });
    if (!associateProductData) {
      throw new NotFoundException('This record does not exist!');
    }
    if (data.associate_highlighted) {
      const highlightedProducts = await this.find({
        where: { associate_highlighted: true },
      });
      if (highlightedProducts.length >= this.MAX_ASSOCIATE_HIGHLIGHTED) {
        throw new BadRequestException(
          `You can only highlight ${this.MAX_ASSOCIATE_HIGHLIGHTED} products`,
        );
      }
    }
    const updatedProduct = await this.abstractUpdate(
      id,
      { ...data, id },
      relations,
    );
    return updatedProduct;
  }

  async remove(id: number) {
    const associateProductData = await this.findOne({ where: { id } });
    if (!associateProductData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }

  async convertBase64ToImgWithSave(base64String: string) {
    const extractBase64img = this.imagesService.extractBase64img(base64String);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    const filename = `${randomName}${extractBase64img.extensionName}`;
    const path = `./uploads/${filename}`;
    fs.writeFile(path, extractBase64img.base64, 'base64', (err) => {
      if (err) {
        fs.rmSync(path, { recursive: true });
      }
    });
    const saveImage = await this.imagesService.basicCreate({
      id: uuid(),
      name: filename,
      original_name: filename,
      created_at: Date.now().toString(),
    });
    return saveImage;
  }

  async masterFilter(query: masterFilterInputDto) {
    let where = {};
    if (query.search_string) {
      where = [
        { name: Like(`%${query.search_string}%`) },
        {
          product: [
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
              sub_category: { name: Like(`%${query.search_string}%`) },
            },
          ],
        },
      ];
    }

    return await this.find({
      where,
      relations: {
        product: {
          product_variants: { sub_variants: true, color: true },
          category: true,
          sub_category: true,
        },
        user: { store_layout_details: true },
        cover_image_color: true,
        associate_product_colors: { color: true },
      },
    });
  }

  public async getCategoryAndSubCategoryIds(userId: number){
    const associateProducts = await this.find({
      where: { user_id: userId },
      relations: { product: true },
    });
    
    const categoryIds = [...new Set(associateProducts.map(
      (associateProduct) => associateProduct.product.category_id,
    ))];
    const subCategoryIds = [...new Set(associateProducts.map(
      (associateProduct) => associateProduct.product.subcategory_id,
    ))];
    return { categoryIds, subCategoryIds };
  }
}
