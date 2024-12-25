import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { productReviewRepository } from './repository/product-review.repository';
import { ProductReview } from './entities/product-review.entity';
import { CreateProductReviewInput } from './dto/create-product-review.input';
import { UpdateProductReviewInput } from './dto/update-product-review.input';

@Injectable()
export class ProductReviewService extends AbstractService {
  constructor() {
    super(productReviewRepository);
  }

  async create(
    data: CreateProductReviewInput,
    userId: number,
    relations: string[] = null,
  ): Promise<ProductReview | boolean> {
    const create = this.abstractCreate({ ...data, user_id: userId }, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateProductReviewInput,
    relations: string[] = null,
  ): Promise<ProductReview | boolean> {
    const update = this.abstractUpdate(id, { ...data, id: id }, relations);
    return update;
  }

  async remove(id: number) {
    const reviewData = await this.findOne({ where: { id } });
    if (!reviewData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
