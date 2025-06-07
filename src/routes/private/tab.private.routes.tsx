import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Products from "../../screens/products";
import Profile from "../../screens/profile";
import MyStore from "../../screens/store";
import { colors } from "../../styles/colors";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Vencimentos") {
            iconName = focused ? "timer-sharp" : "timer-outline";
          } else if (route.name === "Minha Loja") {
            iconName = focused ? "storefront-sharp" : "storefront-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person-sharp" : "person-outline";
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary["600"],
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Vencimentos" component={Products} />
      <Tab.Screen name="Minha Loja" component={MyStore} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
