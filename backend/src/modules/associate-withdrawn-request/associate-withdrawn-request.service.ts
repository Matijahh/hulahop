import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { associateWithdrawnRequestRepository } from './repository/associate-withdrawn-request.repository';
import { AssociateWithdrawnRequest } from './entities/associate-withdrawn-request.entity';
import { CreateAssociateWithdrawnRequestInput } from './dto/create-associate-withdrawn-request.input';
import { UpdateAssociateWithdrawnRequestInput } from './dto/update-associate-withdrawn-request.input';

@Injectable()
export class AssociateWithdrawnRequestService extends AbstractService {
  constructor() {
    super(associateWithdrawnRequestRepository);
  }

  async create(
    data: CreateAssociateWithdrawnRequestInput,
    relations: string[] = null,
  ): Promise<AssociateWithdrawnRequest | boolean> {
    data.created_at = Date.now().toString();
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateAssociateWithdrawnRequestInput,
    relations: string[] = null,
  ): Promise<AssociateWithdrawnRequest | boolean> {
    const associateWithdrawRequestData = await this.findOne({ where: { id } });
    if (!associateWithdrawRequestData) {
      throw new NotFoundException('This record does not exist!');
    }
    data.updated_at = Date.now().toString();
    const update = await this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async remove(id: number) {
    const associateWithdrawRequestData = await this.findOne({ where: { id } });
    if (!associateWithdrawRequestData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
