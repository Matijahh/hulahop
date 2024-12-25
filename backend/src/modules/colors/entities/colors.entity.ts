import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { ProductVariants } from 'src/modules/product-variants/entities/product-variants.entity';
import { AssociateProducts } from 'src/modules/associate-products/entities/associate-products.entity';
import { AssociateProductColors } from 'src/modules/associate-product-colors/entities/associate-product-colors.entity';

@Entity('colors', { schema: 'hulahop_dev' })
export class Colors {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @MaxLength(50)
  @Column('varchar', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @MaxLength(50)
  @Column('varchar', { name: 'code', nullable: true, length: 50 })
  code: string | null;

  @ValidateIf((val) => val.status !== null)
  @Column('boolean', { name: 'status', nullable: true })
  status: boolean | null;

  @OneToMany(
    () => ProductVariants,
    (product_variants) => product_variants.color,
  )
  product_variants: ProductVariants[];

  @OneToMany(
    () => AssociateProductColors,
    (associate_product_colors) => associate_product_colors.color,
  )
  associate_product_colors: AssociateProductColors[];

  @OneToMany(
    () => AssociateProducts,
    (associate_products) => associate_products.cover_image_color,
  )
  associate_products: AssociateProducts[];
}
