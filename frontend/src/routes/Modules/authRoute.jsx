import {
  ROUTE_ADMIN_SIGN_IN,
  ROUTE_FORGET_PASSWORD,
  ROUTE_PASSWORD_RESET,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
} from "../routes";

import SignIn from "../../views/Authentication/SignIn";
import SignUp from "../../views/Authentication/SignUp";
import AuthenticateLayout from "../../layouts/AuthenticateLayout";
import AdminSignIn from "../../views/Admin/Authentication/signIn";
import ForgetPassword from "../../views/Authentication/ForgetPassword";
import ResetPassword from "../../views/Authentication/ResetPassword";

const routes = [
  {
    name: "Sign In",
    path: ROUTE_SIGN_IN,
    component: (props) => (
      <AuthenticateLayout {...props}>
        <SignIn {...props} />
      </AuthenticateLayout>
    ),
  },
  {
    name: "Sign Up",
    path: ROUTE_SIGN_UP,
    component: (props) => (
      <AuthenticateLayout {...props}>
        <SignUp {...props} />
      </AuthenticateLayout>
    ),
  },
  {
    name: "Sign Up",
    path: ROUTE_ADMIN_SIGN_IN,
    component: (props) => (
      <AuthenticateLayout {...props}>
        <AdminSignIn {...props} />
      </AuthenticateLayout>
    ),
  },
  {
    name: "Forget Password",
    path: ROUTE_FORGET_PASSWORD,
    component: (props) => (
      <AuthenticateLayout {...props}>
        <ForgetPassword {...props} />
      </AuthenticateLayout>
    ),
  },
  {
    name: "Reset Password",
    path: ROUTE_PASSWORD_RESET,
    component: (props) => (
      <AuthenticateLayout {...props}>
        <ResetPassword {...props} />
      </AuthenticateLayout>
    ),
  },
];

export default routes;
