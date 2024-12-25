import { Module } from '@nestjs/common';
import { CartProductsService } from './cart-products.service';
import { CartProductsController } from './cart-products.controller';
import { CartsModule } from '../carts/carts.module';

@Module({
  controllers: [CartProductsController],
  providers: [CartProductsService],
  exports: [CartProductsService],
  imports: [CartsModule],
})
export class CartProductsModule {}
