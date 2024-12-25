import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { userSessionRepository } from './repository/user-session.repository';
import { UserSession } from './entities/user-session.entity';
// import { RemoveDto } from '../../commons/dto/remove.dto';
import { CreateUserSessionInput } from './dto/create-user-session.input';
import { UpdateUserSessionInput } from './dto/update-user-session.input';
import * as dayjs from 'dayjs';

@Injectable()
export class UserSessionService extends AbstractService {
  constructor() {
    super(userSessionRepository);
  }

  async create(
    data: CreateUserSessionInput,
    relations: string[] = null,
  ): Promise<UserSession | Boolean> {
    data.created = Date.now();
    const entity = userSessionRepository.create(data);
    entity.expire = dayjs().add(1, 'day').valueOf().toString();
    const res = await this.abstractCreate(entity);
    if (res && res.id) {
      return true;
    } else {
      throw new BadRequestException('something went wrong!');
    }
  }

  async update(
    id: number,
    data: UpdateUserSessionInput,
    relations: string[] = null,
  ): Promise<UserSession | boolean> {
    const update = this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async remove(id: number) {
    const userSessionData = await this.findOne({ where: { id } });
    if (!userSessionData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
