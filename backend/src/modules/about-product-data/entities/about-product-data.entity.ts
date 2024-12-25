import { ValidateIf } from 'class-validator';
import { Categories } from 'src/modules/categories/entities/categories.entity';
import { SubCategories } from 'src/modules/sub-categories/entities/sub-categories.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AboutProductSizeChartImage } from '../../about-product-size-chart-image/entities/about-product-size-chart-image.entity';
import { AboutProductTopBarImage } from 'src/modules/about-product-top-bar-image/entities/about-product-top-bar-image.entity';
import { AboutProductBottomBarImage } from 'src/modules/about-product-bottom-bar-image/entities/about-product-bottom-bar-image.entity';

@Entity('about_product_data', { schema: 'hulahop_dev' })
export class AboutProductData {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ValidateIf((val) => val.category_id !== null)
  @Column('int', { name: 'category_id' })
  category_id: number | null;

  @ValidateIf((val) => val.subcategory_id !== null)
  @Column('int', { name: 'subcategory_id' })
  subcategory_id: number | null;

  @Column('text', { name: 'product_description_1', nullable: true })
  product_description_1: string | null;

  @Column('text', { name: 'product_description_2', nullable: true })
  product_description_2: string | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: number | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: number | null;

  @Column('text', { name: 'product_description_1_ab', nullable: true })
  product_description_1_ab: string | null;

  @Column('text', { name: 'product_description_2_sb', nullable: true })
  product_description_2_sb: string | null;

  @OneToMany(
    () => AboutProductBottomBarImage,
    (about_product_bottom_bar_image) =>
      about_product_bottom_bar_image.about_product_data,
  )
  about_product_bottom_bar_images: AboutProductBottomBarImage[];

  @ManyToOne(() => Categories, (categories) => categories.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Categories;

  @ManyToOne(() => SubCategories, (sub_categories) => sub_categories.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'subcategory_id', referencedColumnName: 'id' }])
  sub_category: SubCategories;

  @OneToMany(
    () => AboutProductSizeChartImage,
    (about_product_size_chart_image) =>
      about_product_size_chart_image.about_product_data,
  )
  about_product_size_chart_image: AboutProductSizeChartImage[];

  @OneToMany(
    () => AboutProductTopBarImage,
    (about_product_top_bar_image) =>
      about_product_top_bar_image.about_product_data,
  )
  about_product_top_bar_image: AboutProductTopBarImage[];
}
