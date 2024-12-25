import { dataSource } from '../../../core/data-source';
import { AssociateBlogs } from '../entities/associate_blogs.entity';

export const associateBlogsRepository =
  dataSource.getRepository(AssociateBlogs);
