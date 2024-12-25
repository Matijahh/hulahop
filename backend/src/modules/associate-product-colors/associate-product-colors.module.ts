import { Module } from '@nestjs/common';
import { AssociateProductColorsService } from './associate-product-colors.service';

@Module({
  providers: [AssociateProductColorsService],
  exports: [AssociateProductColorsService],
})
export class AssociateProductColorsModule {}
