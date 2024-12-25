import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { Users } from 'src/modules/users/entities/users.entity';

@Entity('user_session', { schema: 'hulahop_dev' })
export class UserSession {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsInt()
  @Column('int', { name: 'user_id' })
  user_id: number;

  @Column('text', { name: 'refresh_token', nullable: true })
  refresh_token: string | null;

  @Column('bigint', { name: 'created', nullable: true })
  created: number | null;

  @Column('bigint', { name: 'expire', nullable: true })
  expire: string | null;

  @ManyToOne(() => Users, (users) => users.user_sessions, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
