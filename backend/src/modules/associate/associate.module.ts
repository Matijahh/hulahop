import { Module } from '@nestjs/common';
import { AssociateController } from './associate.controller';
import { AssociateService } from './associate.service';

@Module({
  controllers: [AssociateController],
  providers: [AssociateService],
  exports: [AssociateService],
})
export class AssociateModule {}
