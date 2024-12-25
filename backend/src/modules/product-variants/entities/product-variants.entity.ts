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
import { Sizes } from 'src/modules/sizes/entities/sizes.entity';
import { Colors } from 'src/modules/colors/entities/colors.entity';
import { Products } from 'src/modules/products/entities/products.entity';
import { ProductSubVariants } from 'src/modules/product-sub-variants/entities/product-sub-variants.entity';
import { CartProducts } from '../../cart-products/entities/cart-products.entity';
import { OrderProducts } from '../../order-products/entities/order-products.entity';

@Entity('product_variants', { schema: 'hulahop_dev' })
export class ProductVariants {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.product_id !== null)
  @IsInt()
  @Column('int', { name: 'product_id', nullable: true })
  product_id: number | null;

  @ValidateIf((val) => val.color_id !== null)
  @IsInt()
  @Column('int', { name: 'color_id', nullable: true })
  color_id: number | null;

  @ValidateIf((val) => val.image_id !== null)
  @MaxLength(36)
  @Column('varchar', { name: 'image_id', nullable: true })
  image_id: string | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: number | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: number | null;

  @OneToMany(
    () => ProductSubVariants,
    (product_sub_variants) => product_sub_variants.product_variant,
  )
  sub_variants: ProductSubVariants[];

  @ManyToOne(() => Products, (products) => products.product_variants, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Products;

  @ManyToOne(() => Colors, (colors) => colors.product_variants, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'color_id', referencedColumnName: 'id' }])
  color: Colors;

  @ManyToOne(() => Images, (images) => images.product_variants, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;

  @OneToOne(
    () => CartProducts,
    (cart_products) => cart_products.product_variant,
  )
  cart_product: CartProducts;

  @OneToMany(
    () => OrderProducts,
    (order_products) => order_products.product_variant,
  )
  order_products: OrderProducts[];
}
