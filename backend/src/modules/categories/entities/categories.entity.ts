import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaxLength, ValidateIf } from 'class-validator';
import { Images } from 'src/modules/images/entities/images.entity';
import { SubCategories } from 'src/modules/sub-categories/entities/sub-categories.entity';
import { Products } from '../../products/entities/products.entity';

@Entity('categories', { schema: 'hulahop_dev' })
export class Categories {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @MaxLength(64)
  @Column('varchar', { name: 'name', nullable: true, length: 64 })
  name: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @ValidateIf((val) => val.image_id !== null)
  @MaxLength(36)
  @Column('varchar', { name: 'image_id', nullable: true })
  image_id: string | null;

  @ValidateIf((val) => val.active !== null)
  @Column('boolean', { name: 'active', nullable: true })
  active: boolean | null;

  @ValidateIf((val) => val.is_top_selling !== null)
  @Column('boolean', { name: 'is_top_selling', nullable: true })
  is_top_selling: boolean | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: number | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: number | null;

  @Column('int')
  category_order: number;

  @ManyToOne(() => Images, (images) => images.categories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;

  @OneToOne(() => Products, (products) => products.category)
  products: Products;

  @OneToMany(() => SubCategories, (sub_categories) => sub_categories.category)
  sub_categories: SubCategories[];
}
