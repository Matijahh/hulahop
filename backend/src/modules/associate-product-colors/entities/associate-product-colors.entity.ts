import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { AssociateProducts } from '../../associate-products/entities/associate-products.entity';
import { Colors } from '../../colors/entities/colors.entity';

@Entity('associate_product_colors', { schema: 'hulahop_dev' })
export class AssociateProductColors {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.associate_product_id !== null)
  @IsInt()
  @Column('int', { name: 'associate_product_id', nullable: true })
  associate_product_id: number | null;

  @ValidateIf((val) => val.color_id !== null)
  @IsInt()
  @Column('int', { name: 'color_id', nullable: true })
  color_id: number | null;

  @ManyToOne(
    () => AssociateProducts,
    (associate_products) => associate_products.associate_product_colors,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'associate_product_id', referencedColumnName: 'id' }])
  associate_product: AssociateProducts;

  @ManyToOne(() => Colors, (colors) => colors.associate_product_colors, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'color_id', referencedColumnName: 'id' }])
  color: Colors;
}
