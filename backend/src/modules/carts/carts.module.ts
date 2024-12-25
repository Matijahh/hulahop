import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartProductsController } from './carts.controller';

@Module({
  providers: [CartsService],
  exports: [CartsService],
  controllers: [CartProductsController],
})
export class CartsModule {}
