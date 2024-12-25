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
import { ProductVariants } from '../../product-variants/entities/product-variants.entity';
import { CartProducts } from '../../cart-products/entities/cart-products.entity';
import { OrderProducts } from '../../order-products/entities/order-products.entity';

@Entity('product_sub_variants', { schema: 'hulahop_dev' })
export class ProductSubVariants {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.product_variant_id !== null)
  @IsInt()
  @Column('int', { name: 'product_variant_id', nullable: true })
  product_variant_id: number | null;

  @MaxLength(100)
  @Column('varchar', { name: 'value', nullable: true, length: 100 })
  value: string | null;

  @ValidateIf((val) => val.quantity !== null)
  @IsInt()
  @Column('int', { name: 'quantity', nullable: true })
  quantity: number | null;

  @ManyToOne(
    () => ProductVariants,
    (product_variants) => product_variants.sub_variants,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'product_variant_id', referencedColumnName: 'id' }])
  product_variant: ProductVariants;

  @OneToOne(
    () => CartProducts,
    (cart_products) => cart_products.product_sub_variant,
  )
  cart_product: CartProducts[];

  @OneToMany(
    () => OrderProducts,
    (order_products) => order_products.product_sub_variant,
  )
  order_products: OrderProducts[];
}
