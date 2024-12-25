import { Module } from '@nestjs/common';
import { AssociateImagesService } from './associate-images.service';
import { AssociateImagesController } from './associate-images.controller';

@Module({
  controllers: [AssociateImagesController],
  providers: [AssociateImagesService],
  exports: [AssociateImagesService],
})
export class AssociateImagesModule {}
