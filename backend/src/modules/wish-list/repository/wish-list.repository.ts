import { WishList } from '../entities/wish-list.entity';
import { dataSource } from '../../../core/data-source';

export const wishListRepository = dataSource.getRepository(WishList);
