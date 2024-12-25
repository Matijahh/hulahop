import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductVariantsModule } from '../product-variants/product-variants.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [ProductVariantsModule],
  exports: [ProductsService, ProductVariantsModule],
})
export class ProductsModule {}
