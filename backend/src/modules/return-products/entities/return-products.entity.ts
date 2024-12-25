import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { Orders } from '../../orders/entities/orders.entity';
import { AssociateProducts } from '../../associate-products/entities/associate-products.entity';

@Entity('return_products', { schema: 'hulahop_dev' })
export class ReturnProducts {
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

  @Column('text', { name: 'reason', nullable: true })
  reason: string | null;

  @ValidateIf((val) => val.quantity !== null)
  @IsInt()
  @Column('int', { name: 'quantity', nullable: true })
  quantity: number | null;

  @ManyToOne(() => Orders, (orders) => orders.return_products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Orders;

  @ManyToOne(
    () => AssociateProducts,
    (associate_products) => associate_products.return_products,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'associate_product_id', referencedColumnName: 'id' }])
  associate_product: AssociateProducts;
}
