import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, MaxLength, ValidateIf, IsInt } from 'class-validator';
import { Images } from '../../images/entities/images.entity';
import { AboutProductData } from '../../about-product-data/entities/about-product-data.entity';

@Entity('about_product_bottom_bar_image', { schema: 'hulahop_dev' })
export class AboutProductBottomBarImage {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsInt()
  @Column('int', { name: 'about_product_data_id' })
  about_product_data_id: number;

  @MaxLength(36)
  @Column('varchar', {
    name: 'bottom_bar_images_id',
    nullable: true,
    length: 36,
  })
  bottom_bar_images_id: string | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: number | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: number | null;

  @ManyToOne(() => Images, (images) => images.about_product_bottom_bar_images, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'bottom_bar_images_id', referencedColumnName: 'id' }])
  bottom_bar_images: Images;

  @ManyToOne(
    () => AboutProductData,
    (about_product_data) => about_product_data.about_product_bottom_bar_images,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'about_product_data_id', referencedColumnName: 'id' }])
  about_product_data: AboutProductData;
}
