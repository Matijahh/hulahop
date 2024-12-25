import { Module } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { ProductReviewController } from './product-review.controller';

@Module({
  providers: [ProductReviewService],
  exports: [ProductReviewService],
  controllers: [ProductReviewController],
})
export class ProductReviewModule {}
