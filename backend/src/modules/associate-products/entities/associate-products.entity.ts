import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaxLength, ValidateIf, IsInt } from 'class-validator';
import { Products } from 'src/modules/products/entities/products.entity';
import { Users } from 'src/modules/users/entities/users.entity';
import { CartProducts } from 'src/modules/cart-products/entities/cart-products.entity';
import { OrderProducts } from 'src/modules/order-products/entities/order-products.entity';
import { ReturnProducts } from 'src/modules/return-products/entities/return-products.entity';
import { Colors } from 'src/modules/colors/entities/colors.entity';
import { AssociateProductColors } from 'src/modules/associate-product-colors/entities/associate-product-colors.entity';
import { WishList } from 'src/modules/wish-list/entities/wish-list.entity';
import { ProductReview } from '../../product-review/entities/product-review.entity';

@Entity('associate_products', { schema: 'hulahop_dev' })
export class AssociateProducts {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.product_id !== null)
  @IsInt()
  @Column('int', { name: 'product_id', nullable: true })
  product_id: number | null;

  @ValidateIf((val) => val.user_id !== null)
  @IsInt()
  @Column('int', { name: 'user_id', nullable: true })
  user_id: number | null;

  @MaxLength(100)
  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @ValidateIf((val) => val.cover_image_color_id !== null)
  @IsInt()
  @Column('int', { name: 'cover_image_color_id', nullable: true })
  cover_image_color_id: number | null;

  @Column('simple-json', { name: 'image_json', nullable: true })
  image_json: string | null;

  @MaxLength(36)
  @Column('varchar', { name: 'image_id', nullable: true, length: 36 })
  image_id: string | null;

  @Column('decimal', {
    name: 'price',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  price: string | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: string | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: string | null;

  @ValidateIf((val) => val.is_visible_on_site !== null)
  @Column('boolean', {
    name: 'is_visible_on_site',
    nullable: true,
    default: () => false,
  })
  is_visible_on_site: boolean | null;

  @ValidateIf((val) => val.is_approve !== null)
  @Column('boolean', {
    name: 'is_approve',
    nullable: true,
    default: () => false,
  })
  is_approve: boolean | null;

  @ValidateIf((val) => val.best_selling !== null)
  @Column('boolean', {
    name: 'best_selling',
    nullable: true,
    default: () => false,
  })
  best_selling: boolean | null;

  @ValidateIf((val) => val.associate_highlighted !== null)
  @Column('boolean', {
    name: 'associate_highlighted',
    nullable: true,
    default: () => false,
  })
  associate_highlighted: boolean | null;

  @ManyToOne(() => Products, (products) => products.associate_products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Products;

  @ManyToOne(() => Users, (users) => users.associate_products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Colors, (colors) => colors.associate_products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'cover_image_color_id', referencedColumnName: 'id' }])
  cover_image_color: Colors;

  @OneToMany(
    () => AssociateProductColors,
    (associate_product_colors) => associate_product_colors.associate_product,
  )
  associate_product_colors: AssociateProductColors[];

  @OneToMany(
    () => CartProducts,
    (cart_products) => cart_products.associate_product,
  )
  cart_products: CartProducts[];

  @OneToMany(
    () => OrderProducts,
    (order_products) => order_products.associate_product,
  )
  order_products: OrderProducts[];

  @OneToMany(
    () => ReturnProducts,
    (return_products) => return_products.associate_product,
  )
  return_products: ReturnProducts[];

  @OneToMany(() => WishList, (wishlist) => wishlist.associate_product)
  wishlists: WishList[];

  @OneToMany(
    () => ProductReview,
    (product_review) => product_review.associate_product,
  )
  product_reviews: ProductReview[];
}
