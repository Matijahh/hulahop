import { Module } from '@nestjs/common';
import { OrderAddressesService } from './order-addresses.service';
import { OrderAddressesController } from './order-addresses.controller';

@Module({
  controllers: [OrderAddressesController],
  providers: [OrderAddressesService],
  exports: [OrderAddressesService],
})
export class OrderAddressesModule {}
