import { Module } from '@nestjs/common';
import { AssociateBlogsController } from './associate-blogs.controller';
import { AssociateBlogsService } from './associate-blogs.service';
import { StoreLayoutDetailsModule } from '../store-layout-details/store-layout-details.module';

@Module({
  imports: [StoreLayoutDetailsModule],
  controllers: [AssociateBlogsController],
  providers: [AssociateBlogsService],
})
export class AssociateBlogsModule {}
