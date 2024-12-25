import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { Users } from '../../users/entities/users.entity';
import { AssociateProducts } from '../../associate-products/entities/associate-products.entity';

@Entity('wishlist', { schema: 'hulahop_dev' })
export class WishList {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.user_id !== null)
  @IsInt()
  @Column('int', { name: 'user_id', nullable: true })
  user_id: number | null;

  @ValidateIf((val) => val.associate_product_id !== null)
  @IsInt()
  @Column('int', { name: 'associate_product_id', nullable: true })
  associate_product_id: number | null;

  @ManyToOne(() => Users, (users) => users.wishlists, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(
    () => AssociateProducts,
    (associate_products) => associate_products.wishlists,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'associate_product_id', referencedColumnName: 'id' }])
  associate_product: AssociateProducts;
}
