import { Module } from '@nestjs/common';
import { AssociateUserDetailsService } from './associate-user-details.service';
import { AssociateUserDetailsController } from './associate-user-details.controller';
@Module({
  controllers: [AssociateUserDetailsController],
  providers: [AssociateUserDetailsService],
  exports: [AssociateUserDetailsService],
})
export class AssociateUserDetailsModule {}
