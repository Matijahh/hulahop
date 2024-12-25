import { Module } from '@nestjs/common';
import { AssociateWithdrawnRequestService } from './associate-withdrawn-request.service';
import { AssociateWithdrawnRequestController } from './associate-withdrawn-request.controller';

@Module({
  controllers: [AssociateWithdrawnRequestController],
  providers: [AssociateWithdrawnRequestService],
  exports: [AssociateWithdrawnRequestService],
})
export class AssociateWithdrawnRequestModule {}
