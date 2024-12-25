import { Module } from '@nestjs/common';
import { ProductSubVariantsService } from './product-sub-variants.service';
import { ProductSubVariantsController } from './product-sub-variants.controller';

@Module({
  controllers: [ProductSubVariantsController],
  providers: [ProductSubVariantsService],
  exports: [ProductSubVariantsService],
})
export class ProductSubVariantsModule {}
