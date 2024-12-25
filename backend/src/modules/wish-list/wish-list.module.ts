import { Module } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { WishListController } from './wish-list.controller';

@Module({
  controllers: [WishListController],
  providers: [WishListService],
  exports: [WishListService],
})
export class WishListModule {}
