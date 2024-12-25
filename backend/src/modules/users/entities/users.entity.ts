import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaxLength, ValidateIf, IsInt, IsEnum } from 'class-validator';
import { UserTypes } from 'src/commons/enum';
import { Images } from '../../images/entities/images.entity';
import { AssociateProducts } from 'src/modules/associate-products/entities/associate-products.entity';
import { AssociateUserDetails } from 'src/modules/associate-user-details/entities/associate-user-details.entity';
import { AssociateWithdrawnRequest } from 'src/modules/associate-withdrawn-request/entities/associate-withdrawn-request.entity';
import { Blogs } from 'src/modules/blogs/entities/blogs.entity';
import { CartProducts } from 'src/modules/cart-products/entities/cart-products.entity';
import { UserSession } from 'src/modules/user-session/entities/user-session.entity';
import { StoreLayoutDetails } from 'src/modules/store-layout-details/entities/store-layout-details.entity';
import { AssociateImages } from 'src/modules/associate-images/entities/associate-images.entity';
import { UserAddresses } from 'src/modules/user-addresses/entities/user-addresses.entity';
import { Carts } from '../../carts/entities/carts.entity';
import { WishList } from 'src/modules/wish-list/entities/wish-list.entity';
import { ProductReview } from '../../product-review/entities/product-review.entity';
import { Orders } from 'src/modules/orders/entities/orders.entity';

@Entity('users', { schema: 'hulahop_dev' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

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
  mobile: string | null;

  @Column('varchar', {
    name: 'password',
    nullable: true,
    length: 256,
    select: false,
  })
  password: string | null;

  @Column('varchar', {
    name: 'resetPasswordToken',
    nullable: true,
    length: 256,
    select: false,
  })
  resetPasswordToken: string | null;

  @Column('bigint', {
    name: 'resetPasswordTokenExpiry',
    nullable: true,
    select: false,
  })
  resetPasswordTokenExpiry: number | null;

  @ValidateIf((val) => val.image_id !== null)
  @MaxLength(36)
  @Column('varchar', { name: 'image_id', nullable: true })
  image_id: string | null;

  @ValidateIf((val) => val.status !== null)
  @Column('boolean', { name: 'status', nullable: true })
  status: boolean | null;

  @IsEnum(UserTypes)
  @Column('enum', {
    name: 'type',
    enum: ['USER', 'ASSOCIATE', 'ADMIN'],
    default: 'USER',
  })
  type: 'USER' | 'ASSOCIATE' | 'ADMIN';

  @Column('bigint', { name: 'created_at', nullable: true })
  created_at: number | null;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at: number | null;

  @Column('decimal', {
    name: 'wallet',
    default: () => '0.00',
    precision: 10,
    scale: 2,
  })
  wallet: number | null;

  @Column('boolean', { name: 'isHighlighted', default: false })
  isHighlighted: boolean;


  @OneToMany(() => AssociateImages, (associate_images) => associate_images.user)
  associate_images: AssociateImages[];

  @OneToMany(
    () => AssociateProducts,
    (associate_products) => associate_products.user,
  )
  associate_products: AssociateProducts[];

  @OneToMany(
    () => AssociateUserDetails,
    (associate_user_details) => associate_user_details.user,
  )
  associate_user_details: AssociateUserDetails[];

  @OneToMany(
    () => AssociateWithdrawnRequest,
    (associate_withdrawn_request) => associate_withdrawn_request.user,
  )
  associate_withdrawn_requests: AssociateWithdrawnRequest[];

  @OneToMany(() => Blogs, (blogs) => blogs.created_by2)
  blogs: Blogs[];

  @OneToMany(() => UserSession, (user_session) => user_session.user)
  user_sessions: UserSession[];

  @ManyToOne(() => Images, (images) => images.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;

  @OneToMany(
    () => StoreLayoutDetails,
    (store_layout_details) => store_layout_details.user,
  )
  store_layout_details: StoreLayoutDetails[];

  @OneToMany(() => UserAddresses, (user_addresses) => user_addresses.user)
  user_addresses: UserAddresses[];

  @OneToMany(() => Carts, (carts) => carts.user)
  carts: Carts[];

  @OneToMany(() => WishList, (wishlist) => wishlist.user)
  wishlists: WishList[];

  @OneToMany(() => ProductReview, (product_review) => product_review.user)
  product_reviews: ProductReview[];

  @OneToMany(() => Orders, (orders) => orders.user)
  orders: Orders[];
}
