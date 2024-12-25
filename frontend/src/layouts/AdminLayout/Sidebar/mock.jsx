import GridViewIcon from "@mui/icons-material/GridView";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import GroupIcon from "@mui/icons-material/Group";
import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import CampaignIcon from "@mui/icons-material/Campaign";
import LogoutIcon from "@mui/icons-material/Logout";
import GTranslateOutlinedIcon from "@mui/icons-material/GTranslateOutlined";

import {
  ROUTE_ADMIN_APPEARANCE,
  ROUTE_ADMIN_ASSOCIATES,
  ROUTE_ADMIN_BLOG,
  ROUTE_ADMIN_CATEGORIES,
  ROUTE_ADMIN_COLORS,
  ROUTE_ADMIN_CONTACT,
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_ADMIN_ORDERS,
  ROUTE_ADMIN_PRODUCTS,
  ROUTE_ADMIN_USERS,
  ROUTE_ADMIN_WITHDRAWN,
  ROUTE_ADMIN_ASSOCIATE_PRODUCTS,
  ROUTE_ADMIN_ABOUT_PRODUCT,
  ROUTE_ADMIN_ANNOUNCEMENTS,
  ROUTE_ADMIN_TRANSLATION,
} from "../../../routes/routes";

export const SidebarTabList = [
  {
    icon: <GridViewIcon />,
    name: "Dashboard",
    path: ROUTE_ADMIN_DASHBOARD,
  },
  {
    icon: <ShoppingBagOutlinedIcon />,
    name: "Products",
    path: ROUTE_ADMIN_PRODUCTS,
  },
  {
    icon: <AssignmentIndOutlinedIcon />,
    name: "Associate Products",
    path: ROUTE_ADMIN_ASSOCIATE_PRODUCTS,
  },
  {
    icon: <ShoppingCartOutlinedIcon />,
    name: "Orders",
    path: ROUTE_ADMIN_ORDERS,
  },
  {
    icon: <GroupIcon />,
    name: "Users",
    path: ROUTE_ADMIN_USERS,
  },
  {
    icon: <ViewQuiltOutlinedIcon />,
    name: "Appearance",
    path: ROUTE_ADMIN_APPEARANCE,
  },
  {
    icon: <AssignmentIndOutlinedIcon />,
    name: "Associates",
    path: ROUTE_ADMIN_ASSOCIATES,
  },
  {
    icon: <AssignmentIndOutlinedIcon />,
    name: "About Product Data",
    path: ROUTE_ADMIN_ABOUT_PRODUCT,
  },
  {
    icon: <ArticleOutlinedIcon />,
    name: "Blogs",
    path: ROUTE_ADMIN_BLOG,
  },
  {
    icon: <CategoryOutlinedIcon />,
    name: "Categories",
    path: ROUTE_ADMIN_CATEGORIES,
  },

  {
    icon: <ColorLensOutlinedIcon />,
    name: "Colors",
    path: ROUTE_ADMIN_COLORS,
  },
  {
    icon: <ContactPhoneOutlinedIcon />,
    name: "Contact",
    path: ROUTE_ADMIN_CONTACT,
  },
  {
    icon: <AccountBalanceWalletOutlinedIcon />,
    name: "Withdrawn",
    path: ROUTE_ADMIN_WITHDRAWN,
  },
  {
    icon: <CampaignIcon />,
    name: "Announcements",
    path: ROUTE_ADMIN_ANNOUNCEMENTS,
  },
  {
    icon: <GTranslateOutlinedIcon />,
    name: "Translations",
    path: ROUTE_ADMIN_TRANSLATION,
  },
  {
    icon: <LogoutIcon />,
    name: "Logout",
    path: "#",
  },
];
