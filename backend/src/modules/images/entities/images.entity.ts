import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength } from 'class-validator';
import { Users } from '../../users/entities/users.entity';
import { SubCategories } from 'src/modules/sub-categories/entities/sub-categories.entity';
import { Products } from 'src/modules/products/entities/products.entity';
import { ProductVariants } from 'src/modules/product-variants/entities/product-variants.entity';
import { Categories } from 'src/modules/categories/entities/categories.entity';
import { Blogs } from 'src/modules/blogs/entities/blogs.entity';
import { AssociateUserDetails } from 'src/modules/associate-user-details/entities/associate-user-details.entity';
import { AssociateProducts } from 'src/modules/associate-products/entities/associate-products.entity';
import { StoreLayoutSliders } from 'src/modules/store-layout-sliders/entities/store-layout-sliders.entity';
import { StoreLayoutDetails } from 'src/modules/store-layout-details/entities/store-layout-details.entity';
import { AssociateImages } from 'src/modules/associate-images/entities/associate-images.entity';
import { ShopSlider } from 'src/modules/shop-slider/entities/shop-slider.entity';
import { AboutProductBottomBarImage } from 'src/modules/about-product-bottom-bar-image/entities/about-product-bottom-bar-image.entity';

@Entity('images', { schema: 'hulahop_dev' })
export class Images {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @MaxLength(256)
  @Column('varchar', { name: 'name', nullable: true, length: 256 })
  name: string | null;

  @Column('varchar', { name: 'compressed_name', nullable: true, length: 256 })
  compressed_name: string | null;


  @MaxLength(256)
  @Column('varchar', { name: 'original_name', nullable: true, length: 256 })
  original_name: string | null;

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: number | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: number | null;

  @OneToMany(
    () => AssociateImages,
    (associate_images) => associate_images.image,
  )
  associate_images: AssociateImages[];

  @OneToMany(
    () => AboutProductBottomBarImage,
    (about_product_bottom_bar_image) =>
      about_product_bottom_bar_image.bottom_bar_images,
  )
  about_product_bottom_bar_images: AboutProductBottomBarImage[];

  @OneToMany(
    () => AssociateUserDetails,
    (associate_user_details) => associate_user_details.image,
  )
  associate_user_details: AssociateUserDetails[];

  @OneToMany(() => Blogs, (blogs) => blogs.image)
  blogs: Blogs[];

  @OneToMany(() => Categories, (categories) => categories.image)
  categories: Categories[];

  @OneToMany(
    () => ProductVariants,
    (product_variants) => product_variants.image,
  )
  product_variants: ProductVariants[];

  @OneToMany(() => Products, (products) => products.image)
  products: Products[];

  @OneToMany(
    () => StoreLayoutDetails,
    (store_layout_details) => store_layout_details.logo_image2,
  )
  store_layout_details: StoreLayoutDetails[];

  @OneToMany(
    () => StoreLayoutSliders,
    (store_layout_sliders) => store_layout_sliders.image,
  )
  store_layout_sliders: StoreLayoutSliders[];

  @OneToMany(() => SubCategories, (sub_categories) => sub_categories.image)
  sub_categories: SubCategories[];

  @OneToMany(() => Users, (users) => users.image)
  users: Users[];

  @OneToMany(() => ShopSlider, (shop_slider) => shop_slider.image)
  shop_sliders: ShopSlider[];
}
