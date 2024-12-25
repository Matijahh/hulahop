import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { blogsRepository } from './repository/blogs.repository';
import { Blogs } from './entities/blogs.entity';
import { CreateBlogsInput } from './dto/create-blogs.input';
import { UpdateBlogsInput } from './dto/update-blogs.input';

@Injectable()
export class BlogsService extends AbstractService {
  constructor() {
    super(blogsRepository);
  }

  async create(
    data: CreateBlogsInput,
    relations: string[] = null,
  ): Promise<Blogs | boolean> {
    data.created_at = Date.now().toString();
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateBlogsInput,
    relations: string[] = null,
  ): Promise<Blogs | boolean> {
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

  async find(options?: any): Promise<Blogs[]> {
    return await super.find({ 
      ...options, 
      relations: ['created_by2'] 
    });
  }

  async findOne(options: any): Promise<Blogs> {
    return await super.findOne({
      ...options,
      relations: ['created_by2']
    });
  }

}
