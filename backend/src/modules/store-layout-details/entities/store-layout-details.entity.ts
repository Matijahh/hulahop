import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { Users } from '../../users/entities/users.entity';
import { Images } from '../../images/entities/images.entity';
import { StoreLayoutSliders } from '../../store-layout-sliders/entities/store-layout-sliders.entity';
import { AssociateBlogs } from 'src/modules/associate_blogs/entities/associate_blogs.entity';

@Entity('store_layout_details', { schema: 'hulahop_dev' })
export class StoreLayoutDetails {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.user_id !== null)
  @IsInt()
  @Column('int', { name: 'user_id', nullable: true })
  user_id: number | null;

  @MaxLength(100)
  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @MaxLength(36)
  @Column('varchar', { name: 'logo_image', nullable: true, length: 36 })
  logo_image: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('simple-json', { name: 'social_links', nullable: true })
  social_links: any;

  @Column('text', { name: 'slug', nullable: true })
  slug: string;

  @ManyToOne(() => Users, (users) => users.store_layout_details, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Images, (images) => images.store_layout_details, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'logo_image', referencedColumnName: 'id' }])
  logo_image2: Images;

  @OneToMany(
    () => StoreLayoutSliders,
    (store_layout_sliders) => store_layout_sliders.store,
  )
  store_layout_sliders: StoreLayoutSliders[];

  @OneToMany(() => AssociateBlogs, (blog) => blog.store)
  blogs: AssociateBlogs[];
}
