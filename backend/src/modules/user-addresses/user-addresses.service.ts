import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { userAddressesRepository } from './repository/user-addresses.repository';
import { UserAddresses } from './entities/user-addresses.entity';
import { CreateUserAddressesInput } from './dto/create-user-addresses.input';
import { UpdateUserAddressesInput } from './dto/update-user-addresses.input';

@Injectable()
export class UserAddressesService extends AbstractService {
  constructor() {
    super(userAddressesRepository);
  }

  async create(
    data: CreateUserAddressesInput,
    relations: string[] = null,
  ): Promise<UserAddresses | boolean> {
    data.created_at = Date.now().toString();
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateUserAddressesInput,
    relations: string[] = null,
  ): Promise<UserAddresses | boolean> {
    const userAddressesData = await this.findOne({ where: { id } });
    if (!userAddressesData) {
      throw new NotFoundException('This record does not exist!');
    }
    data.updated_at = Date.now().toString();
    const update = await this.abstractUpdate(id, data, relations);
    return update;
  }

  async remove(id: number) {
    const userAddressesData = await this.findOne({ where: { id } });
    if (!userAddressesData) {
      throw new NotFoundException('This record does not exist!');
    }
    const remove = await this.abstractRemove(id);
    return remove;
  }
}
