import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductVariantsModule } from '../product-variants/product-variants.module';
import { AssociateProductsModule } from '../associate-products/associate-products.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [ProductVariantsModule, AssociateProductsModule],
  exports: [ProductsService, ProductVariantsModule],
})
export class ProductsModule {}
