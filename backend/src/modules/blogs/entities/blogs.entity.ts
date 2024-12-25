import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { Users } from 'src/modules/users/entities/users.entity';
import { Images } from 'src/modules/images/entities/images.entity';

@Entity('blogs', { schema: 'hulahop_dev' })
export class Blogs {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.image_id !== null)
  @MaxLength(36)
  @Column('varchar', { name: 'image_id', nullable: true })
  image_id: string | null;

  @MaxLength(100)
  @Column('varchar', { name: 'heading', nullable: true, length: 100 })
  heading: string | null;

  @MaxLength(100)
  @Column('varchar', { name: 'category_name', nullable: true, length: 100 })
  category_name: string | null;

  @Column('simple-json', { name: 'content', nullable: true })
  content: any;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: string | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: string | null;

  @ValidateIf((val) => val.created_by !== null)
  @IsInt()
  @Column('int', { name: 'created_by', nullable: true })
  created_by: number | null;

  @ManyToOne(() => Images, (images) => images.blogs, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;

  @ManyToOne(() => Users, (users) => users.blogs, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  created_by2: Users;
}
