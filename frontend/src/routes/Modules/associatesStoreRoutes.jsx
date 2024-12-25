import {
  ROUTE_ASSOCIATE_BRAND_STORE,
  ROUTE_ASSOCIATE_BRAND_STORE_BLOGS,
  ROUTE_ASSOCIATE_BRAND_STORE_BLOGS_ID,
  ROUTE_ASSOCIATE_BRAND_STORE_CART,
  ROUTE_ASSOCIATE_BRAND_STORE_CONTACT,
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP,
  ROUTE_ASSOCIATE_BRAND_STORE_SHOP_SINGLE_VIEW,
} from "../routes";

import AssociatsStoreLayout from "../../layouts/AssociatsStoreLayout";
import BrandShopHome from "../../views/Associats/BrandShop/Home";
import BrandShopCart from "../../views/Associats/BrandShop/Cart";
import BrandShop from "../../views/Associats/BrandShop/Shop";
import SingleProduct from "../../views/Users/Shop/SingleProduct";
import ShopContact from "../../views/Associats/BrandShop/contact";
import ShopBlog from "../../views/Associats/BrandShop/ShopBlog";
import ShopBlogPage from "../../views/Associats/BrandShop/ShopBlog/BlogPage";

const routes = [
  {
    name: "Brand Store Home",
    path: ROUTE_ASSOCIATE_BRAND_STORE,
    component: (props) => (
      <AssociatsStoreLayout {...props}>
        <BrandShopHome {...props} />
      </AssociatsStoreLayout>
    ),
  },
  {
    name: "Brand Store Cart",
    path: ROUTE_ASSOCIATE_BRAND_STORE_CART,
    component: (props) => (
      <AssociatsStoreLayout {...props}>
        <BrandShopCart {...props} />
      </AssociatsStoreLayout>
    ),
  },
  {
    name: "Brand Store Shop",
    path: ROUTE_ASSOCIATE_BRAND_STORE_SHOP,
    component: (props) => (
      <AssociatsStoreLayout {...props}>
        <BrandShop {...props} />
      </AssociatsStoreLayout>
    ),
  },

  {
    name: "Brand Store Contact",
    path: ROUTE_ASSOCIATE_BRAND_STORE_CONTACT,
    component: (props) => (
      <AssociatsStoreLayout {...props}>
        <ShopContact {...props} />
      </AssociatsStoreLayout>
    ),
  },

  {
    name: "Brand Store Shop Product Single View",
    path: ROUTE_ASSOCIATE_BRAND_STORE_SHOP_SINGLE_VIEW,
    component: (props) => (
      <AssociatsStoreLayout {...props}>
        <SingleProduct {...props} isAssociateProduct />
      </AssociatsStoreLayout>
    ),
  },
  {
    name: "Brand Store Shop Blogs",
    path: ROUTE_ASSOCIATE_BRAND_STORE_BLOGS,
    component: (props) => (
      <AssociatsStoreLayout {...props}>
        <ShopBlog {...props} isAssociateProduct />
      </AssociatsStoreLayout>
    ),
  },
  {
    name: "Brand Store Shop Blogs",
    path: ROUTE_ASSOCIATE_BRAND_STORE_BLOGS_ID,
    component: (props) => (
      <AssociatsStoreLayout {...props}>
        <ShopBlogPage {...props} isAssociateProduct />
      </AssociatsStoreLayout>
    ),
  },
];
export default routes;
