import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductSubVariantsModule } from '../product-sub-variants/product-sub-variants.module';
import { CartsModule } from '../carts/carts.module';
import { MailerModule } from 'src/providers/mailer/mailer.module';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, UsersService],
  exports: [OrdersService],
  imports: [CartsModule, ProductSubVariantsModule, MailerModule],
})
export class OrdersModule {}
