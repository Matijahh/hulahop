import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidateIf, IsInt } from 'class-validator';
import { Carts } from '../../carts/entities/carts.entity';
import { AssociateProducts } from '../../associate-products/entities/associate-products.entity';
import { ProductVariants } from '../../product-variants/entities/product-variants.entity';
import { ProductSubVariants } from '../../product-sub-variants/entities/product-sub-variants.entity';

@Entity('cart_products', { schema: 'hulahop_dev' })
export class CartProducts {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.cart_id !== null)
  @IsInt()
  @Column('int', { name: 'cart_id' })
  cart_id: number;

  @Column('int', { name: 'associate_product_id' })
  associate_product_id: number;

  @Column('int', { name: 'product_variant_id' })
  product_variant_id: number;

  @Column('int', { name: 'product_sub_variant_id', nullable: true })
  product_sub_variant_id: number | null;

  @ValidateIf((val) => val.quantity !== null)
  @IsInt()
  @Column('int', { name: 'quantity', nullable: true })
  quantity: number | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: string | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: string | null;

  @ManyToOne(() => Carts, (carts) => carts.cart_products, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'cart_id', referencedColumnName: 'id' }])
  cart: Carts;

  @ManyToOne(
    () => AssociateProducts,
    (associate_products) => associate_products.cart_products,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'associate_product_id', referencedColumnName: 'id' }])
  associate_product: AssociateProducts;

  @OneToOne(
    () => ProductVariants,
    (product_variants) => product_variants.cart_product,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'product_variant_id', referencedColumnName: 'id' }])
  product_variant: ProductVariants;

  @OneToOne(
    () => ProductSubVariants,
    (product_sub_variants) => product_sub_variants.cart_product,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'product_sub_variant_id', referencedColumnName: 'id' }])
  product_sub_variant: ProductSubVariants;
}
