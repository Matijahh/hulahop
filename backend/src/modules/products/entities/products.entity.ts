import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { Images } from 'src/modules/images/entities/images.entity';
import { ProductVariants } from 'src/modules/product-variants/entities/product-variants.entity';
import { AssociateProducts } from 'src/modules/associate-products/entities/associate-products.entity';
import { Categories } from '../../categories/entities/categories.entity';
import { SubCategories } from '../../sub-categories/entities/sub-categories.entity';

@Entity('products', { schema: 'hulahop_dev' })
export class Products {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @MaxLength(100)
  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @ValidateIf((val) => val.image_id !== null)
  @MaxLength(36)
  @Column('varchar', { name: 'image_id', nullable: true })
  image_id: string | null;

  @ValidateIf((val) => val.category_id !== null)
  @MaxLength(36)
  @Column('int', { name: 'category_id', nullable: true })
  category_id: number | null;

  @ValidateIf((val) => val.subcategory_id !== null)
  @MaxLength(36)
  @Column('int', { name: 'subcategory_id', nullable: true })
  subcategory_id: number | null;

  @Column('numeric', {
    name: 'price',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  price: number | null;

  @ValidateIf((val) => val.status !== null)
  @Column('boolean', { name: 'status', nullable: true })
  status: boolean | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: number | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: number | null;

  @Column('decimal', {
    name: 'x_position',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  x_position: string | null;

  @Column('decimal', {
    name: 'y_position',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  y_position: string | null;

  @Column('decimal', {
    name: 'frame_width',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  frame_width: string | null;

  @Column('decimal', {
    name: 'frame_height',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  frame_height: string | null;

  @OneToMany(
    () => AssociateProducts,
    (associate_products) => associate_products.product,
  )
  associate_products: AssociateProducts[];

  @OneToMany(
    () => ProductVariants,
    (product_variants) => product_variants.product,
  )
  product_variants: ProductVariants[];

  @ManyToOne(() => Images, (images) => images.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;

  @ManyToOne(() => Categories, (categories) => categories.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Categories;

  @ManyToOne(() => SubCategories, (sub_categories) => sub_categories.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'subcategory_id', referencedColumnName: 'id' }])
  sub_category: SubCategories;
}
