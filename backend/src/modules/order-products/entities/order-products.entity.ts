import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidateIf, IsInt } from 'class-validator';
import { Orders } from 'src/modules/orders/entities/orders.entity';
import { AssociateProducts } from 'src/modules/associate-products/entities/associate-products.entity';
import { ProductVariants } from '../../product-variants/entities/product-variants.entity';
import { ProductSubVariants } from '../../product-sub-variants/entities/product-sub-variants.entity';

@Entity('order_products', { schema: 'hulahop_dev' })
export class OrderProducts {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.order_id !== null)
  @IsInt()
  @Column('int', { name: 'order_id', nullable: true })
  order_id: number | null;

  @ValidateIf((val) => val.associate_product_id !== null)
  @IsInt()
  @Column('int', { name: 'associate_product_id', nullable: true })
  associate_product_id: number | null;

  @Column('int', { name: 'product_variant_id' })
  product_variant_id: number;

  @Column('int', { name: 'product_sub_variant_id' })
  product_sub_variant_id: number;

  @ValidateIf((val) => val.quantity !== null)
  @IsInt()
  @Column('int', { name: 'quantity', nullable: true })
  quantity: number | null;

  @Column('decimal', {
    name: 'price',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  price: string | null;

  @ManyToOne(() => Orders, (orders) => orders.order_products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Orders;

  @ManyToOne(
    () => AssociateProducts,
    (associate_products) => associate_products.order_products,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'associate_product_id', referencedColumnName: 'id' }])
  associate_product: AssociateProducts;

  @ManyToOne(
    () => ProductVariants,
    (product_variants) => product_variants.order_products,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'product_variant_id', referencedColumnName: 'id' }])
  product_variant: ProductVariants;

  @ManyToOne(
    () => ProductSubVariants,
    (product_sub_variants) => product_sub_variants.order_products,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'product_sub_variant_id', referencedColumnName: 'id' }])
  product_sub_variant: ProductSubVariants;
}
