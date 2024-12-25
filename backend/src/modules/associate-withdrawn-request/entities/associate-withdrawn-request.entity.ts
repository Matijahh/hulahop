import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { Users } from 'src/modules/users/entities/users.entity';

@Entity('associate_withdrawn_request', { schema: 'hulahop_dev' })
export class AssociateWithdrawnRequest {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.user_id !== null)
  @IsInt()
  @Column('int', { name: 'user_id', nullable: true })
  user_id: number | null;

  @Column('decimal', {
    name: 'amount',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  amount: string | null;

  @Column('enum', {
    name: 'status',
    enum: ['PENDING', 'CANCELLED', 'COMPLETED'],
  })
  status: 'PENDING' | 'CANCELLED' | 'COMPLETED';

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: number | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: number | null;

  @ManyToOne(() => Users, (users) => users.associate_withdrawn_requests, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
