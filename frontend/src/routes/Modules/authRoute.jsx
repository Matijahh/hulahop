import {
  ROUTE_ADMIN_SIGN_IN,
  ROUTE_FORGET_PASSWORD,
  ROUTE_PASSWORD_RESET,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
} from "../routes";

import SignIn from "../../views/Authentication/SignIn";
import SignUp from "../../views/Authentication/SignUp";
import PublicLayout from "../../layouts/PublicLayout";
import AdminSignIn from "../../views/Admin/Authentication/signIn";
import ForgetPassword from "../../views/Authentication/ForgetPassword";
import ResetPassword from "../../views/Authentication/ResetPassword";

const routes = [
  {
    name: "Sign In",
    path: ROUTE_SIGN_IN,
    component: (props) => (
      <PublicLayout {...props}>
        <SignIn {...props} />
      </PublicLayout>
    ),
  },
  {
    name: "Sign Up",
    path: ROUTE_SIGN_UP,
    component: (props) => (
      <PublicLayout {...props}>
        <SignUp {...props} />
      </PublicLayout>
    ),
  },
  {
    name: "Sign Up",
    path: ROUTE_ADMIN_SIGN_IN,
    component: (props) => (
      <PublicLayout {...props}>
        <AdminSignIn {...props} />
      </PublicLayout>
    ),
  },
  {
    name: "Forget Password",
    path: ROUTE_FORGET_PASSWORD,
    component: (props) => (
      <PublicLayout {...props}>
        <ForgetPassword {...props} />
      </PublicLayout>
    ),
  },
  {
    name: "Reset Password",
    path: ROUTE_PASSWORD_RESET,
    component: (props) => (
      <PublicLayout {...props}>
        <ResetPassword {...props} />
      </PublicLayout>
    ),
  },
];

export default routes;
