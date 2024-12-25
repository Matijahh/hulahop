import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { Images } from 'src/modules/images/entities/images.entity';
import { Categories } from 'src/modules/categories/entities/categories.entity';
import { Products } from '../../products/entities/products.entity';

@Entity('sub_categories', { schema: 'hulahop_dev' })
export class SubCategories {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.category_id !== null)
  @IsInt()
  @Column('int', { name: 'category_id', nullable: true })
  category_id: number | null;

  @MaxLength(64)
  @Column('varchar', { name: 'name', nullable: true, length: 64 })
  name: string | null;

  @ValidateIf((val) => val.image_id !== null)
  @MaxLength(36)
  @Column('varchar', { name: 'image_id', nullable: true })
  image_id: string | null;

  @ValidateIf((val) => val.active !== null)
  @Column('boolean', { name: 'active', nullable: true })
  active: boolean | null;

  @Column('int')
  sub_category_order: number;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: number | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: number | null;

  @ManyToOne(() => Categories, (categories) => categories.sub_categories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Categories;

  @ManyToOne(() => Images, (images) => images.sub_categories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;

  @OneToOne(() => Products, (products) => products.sub_category)
  products: Products;
}
