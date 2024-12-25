export const ROUTE_MAIN = "/";
export const ROUTE_MAIN_SHOP = "/shop";
export const ROUTE_MAIN_SHOP_PRODUCT = "/shop/:id/product";
export const ROUTE_MAIN_ABOUT_PLATFORM = "/aboutplatform";
export const ROUTE_MAIN_DESIGN_IT_YOUR_SELF = "/designityourself";
export const ROUTE_MAIN_ABOUT_PRODUCT = "/aboutproduct";
export const ROUTE_MAIN_ASSOCIETS = "/associateslist";
export const ROUTE_MAIN_INSTRUCTIONS = "/instructions";
export const ROUTE_MAIN_BLOG = "/blog";
export const ROUTE_MAIN_BLOG_SINGLE = "/blog/:id/single";
export const ROUTE_MAIN_CONTACT = "/contact";
export const ROUTE_MAIN_CART = "/cart";
export const ROUTE_MAIN_CHECKOUT = "/checkout";
export const ROUTE_MAIN_DASHBOARD = "/dashboard";
export const ROUTE_MAIN_ORDERS = "/orders";
export const ROUTE_MAIN_PROFILE = "/profile";
export const ROUTE_MAIN_WISHLIST = "/wishlist";
export const ROUTE_MAIN_CHANGE_PASSWORD = "/change-password";
export const ROUTE_SIGN_UP = "/sign-up";
export const ROUTE_SIGN_IN = "/sign-in";
export const ROUTE_FORGET_PASSWORD = "/forget-password";
export const ROUTE_PASSWORD_RESET = "/reset-password/:token";
export const ROUTE_MAIN_TERMS_OF_USE = "/terms-of-use";
export const ROUTE_PRIVACY_POLICY = "/privacy-policy";
export const ROUTE_RETURN_POLICY = "/return-policy";

// associate routes
export const ROUTE_ASSOCIATE_MAIN = "/associate";
export const ROUTE_ASSOCIATE_MAIN_DASHBOARD = "/associate/dashboard";
export const ROUTE_ASSOCIATE_MAIN_PRODUCTS = "/associate/products";
export const ROUTE_ASSOCIATE_MAIN_ORDERS = "/associate/orders";
export const ROUTE_ASSOCIATE_MAIN_ORDER_PREVIEW =
  "/associate/orders-preview/:orderId";

export const ROUTE_ASSOCIATE_MAIN_RETURN_PRODUCTS =
  "/associate/returned-products";
export const ROUTE_ASSOCIATE_MAIN_CATEGORIES = "/associate/categories";
export const ROUTE_ASSOCIATE_MAIN_SETTINGS = "/associate/settings";
export const ROUTE_ASSOCIATE_CREATE_PRODUCT =
  "/associate/products/create-product/:categoryId/:sub_categoryId";
export const ROUTE_ASSOCIATE_EDIT_PRODUCT =
  "/associate/products/edit-product/:productId";
export const ROUTE_ASSOCIATE_REVIEWS = "/associate/reviews";
export const ROUTE_ASSOCIATE_WITHDRAWAL = "/associate/withdrawal";
export const ROUTE_ASSOCIATE_ANNOUNCEMENTS = "/associate/announcements";
export const ROUTE_ASSOCIATE_STORE_LAYOUT = "/associate/store-layout";
export const ROUTE_ASSOCIATE_BLOG = "/associate/blog";
export const ROUTE_ASSOCIATE_BLOG_ADD = "/admin/blog/add";
export const ROUTE_ASSOCIATE_BLOG_EDIT = "/admin/blog/:id/edit";

// Associates brand shop routes
export const ROUTE_ASSOCIATE_BRAND_STORE = "/:id";
export const ROUTE_ASSOCIATE_BRAND_STORE_SHOP = "/:id/shop";
export const ROUTE_ASSOCIATE_BRAND_STORE_CONTACT = "/:id/contact";
export const ROUTE_ASSOCIATE_BRAND_STORE_SHOP_SINGLE_VIEW =
  "/:sId/shop/product/:id";
export const ROUTE_ASSOCIATE_BRAND_STORE_SHOP_PRODUCTS =
  "/:id/shop/product/:productid";
export const ROUTE_ASSOCIATE_BRAND_STORE_CART = "/:id/cart/:cartId";
export const ROUTE_ASSOCIATE_BRAND_STORE_BLOGS = "/:id/blogs";
export const ROUTE_ASSOCIATE_BRAND_STORE_BLOGS_ID = "/:id/blogs/:blogId";

// Admin Routes
export const ROUTE_ADMIN = "/admin";
export const ROUTE_ADMIN_SIGN_IN = "/admin/sign-in";

export const ROUTE_ADMIN_APPEARANCE = "/admin/appearance";
export const ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_ADD =
  "/admin/appearance/shop-slider/add";
export const ROUTE_ADMIN_APPEARANCE_SHOP_SLIDER_EDIT =
  "/admin/appearance/shop-slider/:id/edit";
export const ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_ADD =
  "/admin/appearance/about-slider/add";
export const ROUTE_ADMIN_APPEARANCE_ABOUT_SLIDER_EDIT =
  "/admin/appearance/about-slider/:id/edit";

export const ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_ADD =
  "/admin/appearance/blog-slider/add";
export const ROUTE_ADMIN_APPEARANCE_BLOG_SLIDER_EDIT =
  "/admin/appearance/blog-slider/:id/edit";

export const ROUTE_ADMIN_ASSOCIATES = "/admin/associates";
export const ROUTE_ADMIN_EDIT_ASSOCIATE_STORE =
  "/admin/associates/edit/store/:id";

export const ROUTE_ADMIN_BLOG = "/admin/blog";
export const ROUTE_ADMIN_BLOG_ADD = "/admin/blog/add";
export const ROUTE_ADMIN_BLOG_EDIT = "/admin/blog/:id/edit";

export const ROUTE_ADMIN_CATEGORIES = "/admin/categories";
export const ROUTE_ADMIN_CATEGORIES_ADD = "/admin/categories/add";

export const ROUTE_ADMIN_COLORS = "/admin/colors";
export const ROUTE_ADMIN_COLORS_ADD = "/admin/colors/add";
export const ROUTE_ADMIN_COLORS_EDIT = "/admin/colors/:id/edit";

export const ROUTE_ADMIN_CONTACT = "/admin/contact";
export const ROUTE_ADMIN_DASHBOARD = "/admin/dashboard";
export const ROUTE_ADMIN_ORDERS = "/admin/orders";
export const ROUTE_ADMIN_ASSOCIATE_PRODUCTS = "/admin/associate-products";
export const ROUTE_ADMIN_ASSOCIATE_VIEW_PRODUCTS =
  "/admin/associate-products/:id/view";
export const ROUTE_ADMIN_ASSOCIATE_EDIT_PRODUCTS =
  "/admin/associate-products/:productId/edit-product";

// route product
export const ROUTE_ADMIN_PRODUCTS = "/admin/products";
export const ROUTE_ADMIN_PRODUCTS_ADD = "/admin/products/add";
export const ROUTE_ADMIN_PRODUCTS_EDIT = "/admin/products/:id/edit";

export const ROUTE_ADMIN_REVIEWS = "/admin/reviews";
export const ROUTE_ADMIN_RETURNED_PRODUCTS = "/admin/rerurned-products";
export const ROUTE_ADMIN_USERS = "/admin/users";
export const ROUTE_ADMIN_WITHDRAWN = "/admin/withdrawn";

export const ROUTE_ADMIN_ABOUT_PRODUCT = "/admin/aboutproduct";
export const ROUTE_ADMIN_ABOUT_PRODUCT_ADD = "/admin/aboutproduct/add";
export const ROUTE_ADMIN_ABOUT_PRODUCT_EDIT = "/admin/aboutproduct/:id/edit";

export const ROUTE_ADMIN_ANNOUNCEMENTS = "/admin/announcements";
export const ROUTE_ADMIN_ANNOUNCEMENTS_ADD = "/admin/announcements/add";
export const ROUTE_ADMIN_ANNOUNCEMENTS_EDIT = "/admin/announcements/:id/edit";

export const ROUTE_ADMIN_TRANSLATION = "/admin/translation";
