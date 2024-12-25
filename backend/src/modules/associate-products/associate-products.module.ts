import { Module } from '@nestjs/common';
import { AssociateProductsService } from './associate-products.service';
import { AssociateProductsController } from './associate-products.controller';
import { AssociateProductColorsModule } from '../associate-product-colors/associate-product-colors.module';
import { ImagesModule } from '../images/images.module';
import { CategoriesModule } from '../categories/categories.module';
@Module({
  controllers: [AssociateProductsController],
  providers: [AssociateProductsService],
  imports: [AssociateProductColorsModule, ImagesModule],
  exports: [AssociateProductsService, AssociateProductColorsModule],
})
export class AssociateProductsModule {}
