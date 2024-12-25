import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaxLength, ValidateIf, IsInt, IsOptional } from 'class-validator';
import { Orders } from '../../orders/entities/orders.entity';

@Entity('order_addresses', { schema: 'hulahop_dev' })
export class OrderAddresses {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.order_id !== null)
  @IsInt()
  @Column('int', { name: 'order_id', nullable: true })
  order_id: number | null;

  @Column('text', { name: 'house_flat_no', nullable: true })
  house_flat_no: string | null;

  @Column('text', { name: 'street_locality', nullable: true })
  street_locality: string | null;

  @MaxLength(100)
  @Column('varchar', { name: 'city', nullable: true, length: 100 })
  city: string | null;

  @MaxLength(100)
  @Column('varchar', { name: 'state', nullable: true, length: 100 })
  @IsOptional()
  state: string | null;

  @MaxLength(100)
  @Column('varchar', { name: 'country', nullable: true, length: 100 })
  country: string | null;

  @MaxLength(100)
  @Column('varchar', { name: 'pincode', nullable: true, length: 100 })
  pincode: string | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: string | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: string | null;

  @MaxLength(50)
  @Column('varchar', { name: 'first_name', nullable: true, length: 50 })
  first_name: string | null;

  @MaxLength(50)
  @Column('varchar', { name: 'last_name', nullable: true, length: 50 })
  last_name: string | null;

  @MaxLength(70)
  @Column('varchar', {
    name: 'email',
    nullable: true,
    unique: true,
    length: 70,
  })
  email: string | null;

  @MaxLength(50)
  @Column('varchar', { name: 'mobile', nullable: true, length: 50 })
  @IsOptional()
  mobile: string | null;

  @ManyToOne(() => Orders, (orders) => orders.order_addresses, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Orders;
}
