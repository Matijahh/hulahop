import { Injectable } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { usersRepository } from '../users/repository/users.repository';

@Injectable()
export class AssociateService extends AbstractService {
  constructor() {
    super(usersRepository);
  }
}
