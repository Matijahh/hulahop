import { BadRequestException, Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  QueryRunner,
  Repository,
} from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async find(options?: FindManyOptions): Promise<any[]> {
    return await this.repository.find(options);
  }

  async findOne(options: FindOneOptions): Promise<any> {
    const data = await this.repository.find(options);
    return data[0];
  }

  async findWithPagination(
    options: FindManyOptions,
    limit?: number,
    page?: number,
  ): Promise<{ data: any[]; total: number; totalPages: number; currentPage: number }> {
    const take = limit ?? 20;   // Default limit
    const skip = ((page ?? 1) - 1) * take;

    const [data, total] = await this.repository.findAndCount({
      ...options,
      take,
      skip,
    });

    const totalPages = Math.ceil(total / take);
    const currentPage = page ?? 1;

    return {
      data,
      total,
      totalPages,
      currentPage,
    };
  }

  async abstractCreate(data: any, relations: string[] = null): Promise<any> {
    const entity = this.repository.create(data);
    const errors = await validate(entity);
    if (errors.length > 0) {
      const error = errors.map((e) => {
        return {
          target: e.target.constructor.name,
          error: {
            [e.property]: Object.values(e.constraints).join(' '),
          },
        };
      });
      throw new BadRequestException(error);
    }

    const res = await this.repository.save(entity);
    if (res && res.id) {
      return await this.findOne({
        where: { id: res.id },
        relations: relations,
      });
    } else {
      throw new BadRequestException(
        typeof this.repository + ' Failed to insert',
      );
    }
  }

  async abstractUpdate(
    id: number,
    data: any,
    relations: string[] = null,
  ): Promise<any> {
    const entity = await this.repository.preload(data);
    const errors = await validate(entity);
    if (errors.length > 0) {
      const error = errors.map((e) => {
        return {
          target: e.target.constructor.name,
          error: {
            [e.property]: Object.values(e.constraints).join(' '),
          },
        };
      });
      throw new BadRequestException(error);
    }
    const res = await this.repository.update(id, data);
    if (res && res.affected > 0) {
      return await this.findOne({ where: { id }, relations: relations });
    } else {
      throw new BadRequestException(
        typeof this.repository + ' Failed to update',
      );
    }
  }

  async abstractBulkUpdate(
    criteria: FindOptionsWhere<any>,
    data: any,
  ): Promise<any> {
    const records = await this.find({
      where: criteria,
    });
    // Validate at Entity level
    for (let index = 0; index < records?.length; index++) {
      const record = records[index];
      const entity = await this.repository.preload({ ...record, ...data });
      const errors = await validate(entity);
      if (errors.length > 0) {
        const error = errors.map((e) => {
          return {
            target: e.target.constructor.name,
            error: {
              [e.property]: Object.values(e.constraints).join(' '),
            },
          };
        });
        throw new BadRequestException(error);
      }
    }

    // Bulk update
    const res = await this.repository.update(criteria, data);
    if (res && res.affected > 0) {
      return { status: true };
    } else {
      throw new BadRequestException(
        typeof this.repository + ' Failed to update',
      );
    }
  }

  async abstractRemove(data: any): Promise<any> {
    const res = await this.repository.delete(data);
    if (res && res.affected > 0) {
      return { status: true };
    } else {
      throw new BadRequestException('Record does not exists.');
    }
  }

  async abstractRemoveByQueryRunner(
    data: any,
    queryRunner: QueryRunner,
  ): Promise<any> {
    const res = await queryRunner.manager.delete(this.repository.target, data);
    if (res && res.affected > 0) {
      return true;
    } else {
      return false;
    }
  }

  async countInRelation(relation: string, id: number): Promise<any> {
    const entityName = this.repository.metadata.tableName;
    let queryBuilder = this.repository.createQueryBuilder(`${entityName}`);
    const relations = relation.split('.');
    for (let i = 0; i <= relations.length - 1; i++) {
      if (i == 0) {
        queryBuilder = queryBuilder.innerJoinAndSelect(
          `${entityName}.${relations[i]}`,
          `${relations[i]}${i}`,
        );
      } else {
        queryBuilder = queryBuilder.innerJoinAndSelect(
          `${relations[i - 1]}${i - 1}.${relations[i]}`,
          `${relations[i]}${i}`,
        );
      }
    }

    const count = await queryBuilder
      .where(`${entityName}.id = :id`, { id })
      .getCount();

    return count;
  }
}
