import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsInt } from 'class-validator';
import { CartProducts } from '../../cart-products/entities/cart-products.entity';
import { Users } from '../../users/entities/users.entity';

@Entity('carts', { schema: 'hulahop_dev' })
export class Carts {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsInt()
  @Column('int', { name: 'user_id' })
  user_id: number;

  @OneToMany(() => CartProducts, (cart_products) => cart_products.cart)
  cart_products: CartProducts[];

  @ManyToOne(() => Users, (users) => users.carts, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
