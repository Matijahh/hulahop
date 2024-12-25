import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { Users } from '../../users/entities/users.entity';

@Entity('user_addresses', { schema: 'hulahop_dev' })
export class UserAddresses {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.user_id !== null)
  @IsInt()
  @Column('int', { name: 'user_id', nullable: true })
  user_id: number | null;

  @Column('text', { name: 'house_flat_no', nullable: true })
  house_flat_no: string | null;

  @Column('text', { name: 'street_locality', nullable: true })
  street_locality: string | null;

  @MaxLength(100)
  @Column('varchar', { name: 'city', nullable: true, length: 100 })
  city: string | null;

  @MaxLength(100)
  @Column('varchar', { name: 'state', nullable: true, length: 100 })
  state: string | null;

  @MaxLength(100)
  @Column('varchar', { name: 'country', nullable: true, length: 100 })
  country: string | null;

  @MaxLength(100)
  @Column('varchar', { name: 'pincode', nullable: true, length: 100 })
  pincode: string | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: string | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: string | null;

  @ManyToOne(() => Users, (users) => users.user_addresses, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
