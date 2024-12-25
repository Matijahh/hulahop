import { Blogs } from '../entities/blogs.entity';
import { dataSource } from '../../../core/data-source';

export const blogsRepository = dataSource.getRepository(Blogs);
