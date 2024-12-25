import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { wishListRepository } from './repository/wish-list.repository';
import { WishList } from './entities/wish-list.entity';
import { CreateWishListInput } from './dto/create-wish-list.input';
import { UpdateWishListInput } from './dto/update-wish-list.input';

@Injectable()
export class WishListService extends AbstractService {
  constructor() {
    super(wishListRepository);
  }

  async create(
    data: CreateWishListInput,
    relations: string[] = null,
  ): Promise<WishList | boolean> {
    const create = this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateWishListInput,
    relations: string[] = null,
  ): Promise<WishList | boolean> {
    const update = this.abstractUpdate(id, data, relations);
    return update;
  }

  async remove(id: number) {
    const wishlist = await this.findOne({ where: { id } });
    if (!wishlist) {
      throw new NotFoundException('WishList not found');
    }
    const remove = this.abstractRemove(id);
    return remove;
  }
}
