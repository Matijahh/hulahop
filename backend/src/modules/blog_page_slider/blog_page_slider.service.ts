import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from 'src/commons';
import { blogPageSliderRepository } from './repository/blog_page_slider.repository';
import { CreateBlogPageSliderInput } from './dto/create_blog_page_slider.dto';
import { BlogPageSlider } from './entities/blog_page_slider.entity';
import { UpdateBlogPageSliderInput } from './dto/update_blog_page_slider.dto';

@Injectable()
export class BlogPageSliderService extends AbstractService {
  constructor() {
    super(blogPageSliderRepository);
  }

  async create(
    data: CreateBlogPageSliderInput,
    relations: string[] = null,
  ): Promise<BlogPageSlider> {
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateBlogPageSliderInput,
    relations: string[] = null,
  ): Promise<BlogPageSlider | boolean> {
    const blogPageSliderData = this.findOne({ where: { id } });
    if (!blogPageSliderData) {
      throw new NotFoundException('This record does not exist!');
    }

    const update = await this.abstractUpdate(id, data, relations);
    return update;
  }

  async remove(id: number) {
    const blogPageSliderData = await this.findOne({ where: { id } });
    if (!blogPageSliderData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
