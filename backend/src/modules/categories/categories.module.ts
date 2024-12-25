import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AssociateProductsService } from '../associate-products/associate-products.service';
import { AssociateProductsModule } from '../associate-products/associate-products.module';
import { ImagesService } from '../images/images.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, AssociateProductsService, ImagesService],
  exports: [CategoriesService],
  imports: [AssociateProductsModule],
})
export class CategoriesModule {}
