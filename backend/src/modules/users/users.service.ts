import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { usersRepository } from './repository/users.repository';
import { Users } from './entities/users.entity';
import { BecomeSellerInput, CreateUsersInput } from './dto/create-users.input';
import { UpdateUsersInput } from './dto/update-users.input';
import { UpdatePasswordInput } from './dto/update-password.dto';
import { comparePassword, generatePassword } from 'src/commons';
import { UserTypes } from '../../commons/enum';

@Injectable()
export class UsersService extends AbstractService {
  MAX_HIGHLIGHTED_USERS = 8;
  constructor() {
    super(usersRepository);
  }

  async create(
    data: CreateUsersInput,
    relations: string[] = null,
  ): Promise<Users> {
    data.created_at = Date.now().toString();
    const result = await this.abstractCreate(data, relations);
    return result;
  }

  async findOneById(id: number, relations: string[] = null): Promise<Users> {
    const user = await this.findOne({ where: { id }, relations });
    if (!user) {
      throw new NotFoundException('This record does not exist!');
    }
    return user;
  }

  async getAllAdmins() {
    const admins = await this.find({ where: { type: UserTypes.ADMIN } });
    return admins;
  }

  async getAllAssociates() {
    const associates = await this.find({ where: { type: UserTypes.ASSOCIATE } });
    return associates;
  }

  async update(
    id: number,
    data: UpdateUsersInput,
    relations: string[] = null,
  ): Promise<Users | boolean> {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('This record does not exist!');
    }

    if (data.isHighlighted && user.isHighlighted === false) {
      await this.checkIfUserCanBeHighlighted();
    }

    data.updated_at = Date.now().toString();
    const { password, ...rest } = data;
    const update = this.abstractUpdate(
      id,
      { ...rest, id, password },
      relations,
    );
    return update;
  }

  async getHighlightedUsersCount() {
    const count = await this.find({ where: { isHighlighted: true } });
    return count.length;
  }

  async checkIfUserCanBeHighlighted() {
    const highlightedUsersCount = await this.getHighlightedUsersCount();
    if (highlightedUsersCount >= this.MAX_HIGHLIGHTED_USERS) {
      throw new ConflictException(
        `You can only highlight ${this.MAX_HIGHLIGHTED_USERS} users!`,
      );
    }
  }

  async remove(id: number) {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('This record does not exist!');
    }
    const remove = await this.abstractRemove(id);
    return remove;
  }

  async updateUserPassword(
    id: number,
    updateUserRoleInput: UpdatePasswordInput,
  ) {
    const prevUserData = await this.findOne({
      select: { password: true },
      where: {
        id,
      },
    });
    const isMatchPassword = await comparePassword(
      updateUserRoleInput.old_password,
      prevUserData.password,
    );
    if (!isMatchPassword) {
      throw new BadRequestException(
        'Your old password is wrong! make sure correct.',
      );
    }

    if (updateUserRoleInput.password !== updateUserRoleInput.retype_password) {
      throw new BadRequestException(
        'Your password and retype password are not matched! Please enter again!',
      );
    }

    const samePassword = await comparePassword(
      updateUserRoleInput.password,
      prevUserData.password,
    );

    if (samePassword) {
      throw new BadRequestException(
        'Your password is the same one of your previous password. Please enter a different password!',
      );
    }

    const password = await generatePassword(updateUserRoleInput.password);
    const currentUser = await this.abstractUpdate(id, {
      id,
      password: password,
    });
    return currentUser;
  }

  async becomeSeller(becomeSellerInput: BecomeSellerInput, id: number) {
    const user = await this.findOne({ where: { id } });
    if (user.type === UserTypes.ASSOCIATE || user.type === UserTypes.ADMIN) {
      throw new NotFoundException(`This user is already ${user.type}!`);
    }
    const update = await this.abstractUpdate(id, {
      id: id,
      type: UserTypes.ASSOCIATE,
      ...becomeSellerInput,
    });
    return update;
  }
}
