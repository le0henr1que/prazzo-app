import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SwitchStoreLoad from "../../components/switch-store-load";
import { useAuth } from "../../hook/auth";
import Screen from "../../screens/index.screens";
import TabRoutes from "./tab.private.routes";
const Stack = createNativeStackNavigator();

export default function StackPrivateRoute() {
  const { switchStore, isLoadingSwitchStore } = useAuth();

  if (isLoadingSwitchStore) {
    return <SwitchStoreLoad />;
  }

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScamProduct"
        component={Screen.ScamProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProduct"
        component={Screen.AddProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Screen.Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={Screen.EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModifyPassword"
        component={Screen.ModifyPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FAQ"
        component={Screen.FAQ}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlansManager"
        component={Screen.PlansManager}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlanPro"
        component={Screen.PlanPro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlanScreen"
        component={Screen.PlanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageNotifications"
        component={Screen.ManageNotifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Members"
        component={Screen.Members}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Supplier"
        component={Screen.Supplier}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageStores"
        component={Screen.ManageStores}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditDataStore"
        component={Screen.EditDataStore}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewBatch"
        component={Screen.ViewBatch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewProduct"
        component={Screen.ViewProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditBatch"
        component={Screen.EditBatch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProduct"
        component={Screen.EditProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddBatch"
        component={Screen.AddBatch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateStore"
        component={Screen.CreateStore}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsScreen"
        component={Screen.TermsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
