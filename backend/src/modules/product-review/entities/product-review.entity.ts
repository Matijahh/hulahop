import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidateIf, IsInt } from 'class-validator';
import { Users } from '../../users/entities/users.entity';
import { AssociateProducts } from '../../associate-products/entities/associate-products.entity';

@Entity('product_review', { schema: 'hulahop_dev' })
export class ProductReview {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.associate_product_id !== null)
  @IsInt()
  @Column('int', { name: 'associate_product_id', nullable: true })
  associate_product_id: number | null;

  @ValidateIf((val) => val.user_id !== null)
  @IsInt()
  @Column('int', { name: 'user_id', nullable: true })
  user_id: number | null;

  @Column('text', { name: 'review', nullable: true })
  review: string | null;

  @ManyToOne(() => Users, (users) => users.product_reviews, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(
    () => AssociateProducts,
    (associate_products) => associate_products.product_reviews,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'associate_product_id', referencedColumnName: 'id' }])
  associate_product: AssociateProducts;
}
