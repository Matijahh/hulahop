import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { Images } from 'src/modules/images/entities/images.entity';
import { Users } from 'src/modules/users/entities/users.entity';

@Entity('associate_user_details', { schema: 'hulahop_dev' })
export class AssociateUserDetails {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.user_id !== null)
  @IsInt()
  @Column('int', { name: 'user_id', nullable: true })
  user_id: number | null;

  @ValidateIf((val) => val.image_id !== null)
  @MaxLength(36)
  @Column('varchar', { name: 'image_id', nullable: true })
  image_id: string | null;

  @MaxLength(100)
  @Column('varchar', { name: 'heading', nullable: true, length: 100 })
  heading: string | null;

  @MaxLength(100)
  @Column('varchar', { name: 'sub_heading', nullable: true, length: 100 })
  sub_heading: string | null;

  @MaxLength(100)
  @Column('varchar', { name: 'url', nullable: true, length: 100 })
  url: string | null;

  @ValidateIf((val) => val.status !== null)
  @Column('boolean', { name: 'status', nullable: true })
  status: boolean | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: string | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: string | null;

  @ManyToOne(() => Users, (users) => users.associate_user_details, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Images, (images) => images.associate_user_details, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;
}
