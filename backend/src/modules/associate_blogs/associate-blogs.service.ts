import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from 'src/commons';
import { associateBlogsRepository } from './repository/associate_blogs.repository';
import { CreateAssociateBlogsInput } from './dto/create-associate-blog.input';
import { AssociateBlogs } from './entities/associate_blogs.entity';
import { UpdateAssociateBlogsInput } from './dto/update-associate-blog.input';
import { StoreLayoutDetailsService } from '../store-layout-details/store-layout-details.service';

@Injectable()
export class AssociateBlogsService extends AbstractService {
  constructor(private readonly storeLayoutDetails: StoreLayoutDetailsService) {
    super(associateBlogsRepository);
  }

  async create(
    data: CreateAssociateBlogsInput,
    user_id: number,
    relations: string[] = null,
  ): Promise<AssociateBlogs | boolean> {
    const store = await this.storeLayoutDetails.findOne({ where: { user_id } });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    data.created_at = Date.now().toString();
    const create = await this.abstractCreate(
      { ...data, store_id: store.id },
      relations,
    );
    return create;
  }

  async update(
    id: number,
    data: UpdateAssociateBlogsInput,
    relations: string[] = null,
  ): Promise<AssociateBlogs | boolean> {
    const blog = await this.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('This record does not exist!');
    }

    data.updated_at = Date.now().toString();
    const update = await this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async remove(id: number) {
    const blog = await this.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('This record does not exist!');
    }

    return await this.abstractRemove(id);
  }
}
