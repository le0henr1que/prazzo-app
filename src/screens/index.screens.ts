import AddProduct from "./add-product";
import ConfirmCode from "./confirm-code";
import EditProfile from "./edit-profile";
import FAQ from "./FAQ";
import Login from "./login";
import ManageNotifications from "./manage-notifications";
import ModifyPassword from "./modify-password";
import Notification from "./notification";
import OnboardingScreen from "./on-boarding";
import { PlanPremium } from "./plan-premium";
import PlansManager from "./plans-manager";
import Profile from "./profile";
import Register from "./register";
import ScamProduct from "./scam-product";
import StoreRegistrationFlow from "./store-registration-flow";

const Screens = {
  OnboardingScreen,
  Login,
  Register,
  ConfirmCode,
  StoreRegistrationFlow,
  ScamProduct,
  AddProduct,
  Profile,
  Notification,
  EditProfile,
  ModifyPassword,
  PlansManager,
  PlanPremium,
  FAQ,
  ManageNotifications,
};

export type ScreensType = {
  FAQ: undefined;
  ManageNotifications: undefined;
  PlanPremium: undefined;
  PlansManager: undefined;
  ModifyPassword: undefined;
  EditProfile: undefined;
  Notification: undefined;
  OnboardingScreen: undefined;
  ScamProduct: {
    isSearch?: boolean;
  };
  Profile: undefined;
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  Home: {
    screen?: string;
    params?: {
      screen?: string;
      params?: { productInformation: any };
    };
  };
  AddProduct: { productInformation: any };
  ConfirmCode: undefined;
  StoreRegistrationFlow: {
    email: string;
    name: string;
    token: string;
    storeId: string;
    storeName: string;
    storeAddress: string;
  };
};
export default Screens;
