import { MailerModule } from 'src/providers/mailer/mailer.module';
import { AboutPageSliderModule } from './about-page-slider/about-page-slider.module';
import { AboutProductBottomBarImageModule } from './about-product-bottom-bar-image/about-product-bottom-bar-image.module';
import { AboutProductDataModule } from './about-product-data/about-product-data.module';
import { AboutProductSizeChartImageModule } from './about-product-size-chart-image/about-product-size-chart-image.module';
import { AboutProductTopBarImageModule } from './about-product-top-bar-image/about-product-top-bar-image.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { AssociateImagesModule } from './associate-images/associate-images.module';
import { AssociateProductsModule } from './associate-products/associate-products.module';
import { AssociateUserDetailsModule } from './associate-user-details/associate-user-details.module';
import { AssociateWithdrawnRequestModule } from './associate-withdrawn-request/associate-withdrawn-request.module';
import { AssociateModule } from './associate/associate.module';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { CartProductsModule } from './cart-products/cart-products.module';
import { CartsModule } from './carts/carts.module';
import { CategoriesModule } from './categories/categories.module';
import { ColorsModule } from './colors/colors.module';
import { ImagesModule } from './images/images.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { OrderAddressesModule } from './order-addresses/order-addresses.module';
import { OrderProductsModule } from './order-products/order-products.module';
import { OrdersModule } from './orders/orders.module';
import { ProductReviewModule } from './product-review/product-review.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { ProductsModule } from './products/products.module';
import { ReturnProductsModule } from './return-products/return-products.module';
import { ShopSliderModule } from './shop-slider/shop-slider.module';
import { SizesModule } from './sizes/sizes.module';
import { StoreLayoutDetailsModule } from './store-layout-details/store-layout-details.module';
import { StoreLayoutSlidersModule } from './store-layout-sliders/store-layout-sliders.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { UserAddressesModule } from './user-addresses/user-addresses.module';
import { UsersModule } from './users/users.module';
import { WishListModule } from './wish-list/wish-list.module';
import { BlogPageSliderModule } from './blog_page_slider/blog_page_slider.module';
import { AssociateBlogsModule } from './associate_blogs/associate-blogs.module';
import { DashboardModule } from './dashboard/dashboard.module';

export const ApplicationModules = [
  AuthModule,
  UsersModule,
  AssociateModule,
  ImagesModule,
  ColorsModule,
  SizesModule,
  CategoriesModule,
  SubCategoriesModule,
  ProductsModule,
  ProductVariantsModule,
  InquiriesModule,
  AssociateImagesModule,
  AssociateProductsModule,
  AssociateUserDetailsModule,
  AssociateWithdrawnRequestModule,
  BlogsModule,
  CartProductsModule,
  OrderProductsModule,
  OrdersModule,
  AnnouncementsModule,
  ReturnProductsModule,
  StoreLayoutDetailsModule,
  StoreLayoutSlidersModule,
  ShopSliderModule,
  AboutPageSliderModule,
  AboutProductDataModule,
  OrderAddressesModule,
  UserAddressesModule,
  AboutProductTopBarImageModule,
  AboutProductSizeChartImageModule,
  CartsModule,
  WishListModule,
  ProductReviewModule,
  AboutProductBottomBarImageModule,
  MailerModule,
  BlogPageSliderModule,
  AssociateBlogsModule,
  DashboardModule,
];
