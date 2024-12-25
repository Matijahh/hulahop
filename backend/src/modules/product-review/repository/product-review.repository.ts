import { ProductReview } from '../entities/product-review.entity';
import { dataSource } from '../../../core/data-source';

export const productReviewRepository = dataSource.getRepository(ProductReview);
