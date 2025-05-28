import { useLayoutEffect } from "react";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/HomeScreen";

const useHideTabBar = (screenName: keyof RootStackParamList) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const route = useRoute();

  useLayoutEffect(() => {
    console.log(route.name, screenName);
    if (isFocused && route.name === screenName) {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, isFocused, route, screenName]);
};

export default useHideTabBar;
