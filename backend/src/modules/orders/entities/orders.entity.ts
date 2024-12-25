import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaxLength, IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { OrderProducts } from 'src/modules/order-products/entities/order-products.entity';
import { ReturnProducts } from 'src/modules/return-products/entities/return-products.entity';
import { OrderAddresses } from 'src/modules/order-addresses/entities/order-addresses.entity';
import { OrderStatus } from '../../../commons/enum';
import { Users } from 'src/modules/users/entities/users.entity';

@Entity('orders', { schema: 'hulahop_dev' })
export class Orders {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsInt()
  @IsNotEmpty()
  @Column('int', { name: 'user_id' })
  user_id: number;

  @MaxLength(100)
  @Column('varchar', { name: 'sku', nullable: true, length: 100 })
  sku: string | null;

  @Column('decimal', {
    name: 'total_amount',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  total_amount: string | null;

  @IsEnum(OrderStatus)
  @Column('enum', {
    name: 'status',
    enum: ['PENDING', 'DISPATCHED', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';

  @Column('decimal', {
    name: 'sub_total_amount',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  sub_total_amount: string | null;

  @Column('decimal', { name: 'tax', nullable: true, precision: 10, scale: 2 })
  tax: string | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: string | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: string | null;

  @Column('text', { name: 'instructions', nullable: true })
  instructions: string | null;

  @OneToMany(() => OrderProducts, (order_products) => order_products.order)
  order_products: OrderProducts[];

  @OneToMany(() => ReturnProducts, (return_products) => return_products.order)
  return_products: ReturnProducts[];

  @OneToMany(() => OrderAddresses, (order_addresses) => order_addresses.order)
  order_addresses: OrderAddresses[];

  @ManyToOne(() => Users, (users) => users.orders, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
