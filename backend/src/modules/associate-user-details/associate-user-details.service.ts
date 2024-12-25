import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { associateUserDetailsRepository } from './repository/associate-user-details.repository';
import { AssociateUserDetails } from './entities/associate-user-details.entity';
import { CreateAssociateUserDetailsInput } from './dto/create-associate-user-details.input';
import { UpdateAssociateUserDetailsInput } from './dto/update-associate-user-details.input';

@Injectable()
export class AssociateUserDetailsService extends AbstractService {
  constructor() {
    super(associateUserDetailsRepository);
  }

  async create(
    data: CreateAssociateUserDetailsInput,
    relations: string[] = null,
  ): Promise<AssociateUserDetails | boolean> {
    data.created_at = Date.now().toString();
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateAssociateUserDetailsInput,
    relations: string[] = null,
  ): Promise<AssociateUserDetails | boolean> {
    const associateUserDetailsData = await this.findOne({ where: { id } });
    if (!associateUserDetailsData) {
      throw new NotFoundException('This record does not exist!');
    }
    data.updated_at = Date.now().toString();
    const update = await this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async remove(id: number) {
    const associateUserDetailsData = await this.findOne({ where: { id } });
    if (!associateUserDetailsData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
