import { Module } from '@nestjs/common';
import { ReturnProductsService } from './return-products.service';
import { ReturnProductsController } from './return-products.controller';

@Module({
  controllers: [ReturnProductsController],
  providers: [ReturnProductsService],
  exports: [ReturnProductsService],
})
export class ReturnProductsModule {}
