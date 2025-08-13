import AddBatch from "./add-batch";
import AddProduct from "./add-product";
import ConfirmCode from "./confirm-code";
import CreateStore from "./create-store";
import EditBatch from "./edit-batch";
import EditDataStore from "./edit-data-store";
import EditProduct from "./edit-product";
import EditProfile from "./edit-profile";
import FAQ from "./FAQ";
import ForgotPassword from "./forgot-password";
import Login from "./login";
import ManageNotifications from "./manage-notifications";
import ManageStores from "./manage-stores";
import Members from "./members";
import ModifyPassword from "./modify-password";
import NewPassword from "./new-password";
import Notification from "./notification";
import OnboardingScreen from "./on-boarding";
import PlanScreen from "./plan-free";
import PlanPro from "./plan-pro";
import PlanScreenLoadCancel from "./plan-pro/components/plan-screen-load-cancel";
import PlansManager from "./plans-manager";
import PlanScreenLoad from "./plans-manager/components/plan-screen-load";
import Profile from "./profile";
import Register from "./register";
import ScamProduct from "./scam-product";
import { RedirectTo } from "./store-registration-flow";
import Supplier from "./supplier";
import { TermsScreen } from "./terms";
import ViewBatch from "./view-batch";
import ViewProduct from "./view-product";

const Screens = {
  OnboardingScreen,
  Login,
  Register,
  ForgotPassword,
  NewPassword,
  ConfirmCode,
  ScamProduct,
  AddProduct,
  Profile,
  Notification,
  EditProfile,
  ModifyPassword,
  PlansManager,
  PlanPro,
  FAQ,
  ManageNotifications,
  Members,
  Supplier,
  ManageStores,
  EditDataStore,
  ViewBatch,
  ViewProduct,
  EditBatch,
  EditProduct,
  AddBatch,
  CreateStore,
  TermsScreen,
  LoadingScreen: RedirectTo,
  PlanScreen,
  PlanScreenLoad,
  PlanScreenLoadCancel,
};

export type ScreensType = {
  PlanScreenLoad: undefined;
  PlanScreenLoadCancel: undefined;
  PlanScreen: undefined;
  CreateStore: undefined;
  LoadingScreen: undefined;
  PlanPro: undefined;
  AddBatch: undefined;
  EditProduct: {
    productCode?: string;
    productInformation?: any;
    batchId?: string;
  };
  EditBatch: {
    batchCode: string;
  };
  ViewProduct: {
    productId: string;
    batchId?: string;
  };
  ViewBatch: any;
  EditDataStore: undefined;
  ManageStores: undefined;
  FAQ: undefined;
  Supplier: undefined;
  Members: undefined;
  ManageNotifications: undefined;
  PlanPremium: undefined;
  PlansManager: undefined;
  ModifyPassword: undefined;
  EditProfile: undefined;
  ForgotPassword: undefined;
  NewPassword: undefined;
  Notification: undefined;
  OnboardingScreen: undefined;
  ScamProduct: {
    isSearch?: boolean;
  };
  Profile: undefined;
  Login: {
    successMessage?: string;
    successType?: "success";
  };
  Register: undefined;
  ResetPassword: undefined;
  Home: {
    screen?: string;
    params?: {
      screen?: string;
      params?: { productInformation: any };
    };
  };
  AddProduct: { productInformation: any; photoUri?: any };
  ConfirmCode: undefined;
  StoreRegistrationFlow: {
    email: string;
    name: string;
    token: string;
    storeId: string;
    storeName: string;
    storeAddress: string;
  };
  TermsScreen: undefined;
};
export default Screens;
