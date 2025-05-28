import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderMain from "../../../components/header";
import { CameraPermission } from "../../../hook/use-camera";
import { colors } from "../../../styles/colors";
import { typography } from "../../../styles/typography";
import { useProductFilterActions } from "../ducks/filter/hooks/actions";

export default function Header({
  productInformation,
}: {
  productInformation: any;
}) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { updateFilter } = useProductFilterActions();
  const handleImageSelected = (uri: string | null) => {
    updateFilter({ key: "imageUrl", value: uri });
  };

  return (
    <HeaderMain.Root>
      <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
        <TouchableOpacity
          onPress={() => {
            updateFilter({ key: "imageUri", value: null });
            navigation.goBack();
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#343330" />
        </TouchableOpacity>

        <View style={{}}>
          <Text
            style={{
              color: colors.neutral["900"],
              fontSize: 16,
              fontWeight: "600",
              fontFamily: typography.fontFamily.semibold,
              lineHeight: 24,
            }}
          >
            Adicionar produto
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
          gap: 12,
        }}
      >
        {!productInformation?.imageUrl && (
          <CameraPermission onImageSelected={handleImageSelected}>
            <Ionicons name="camera-outline" size={24} color="#343330" />
          </CameraPermission>
        )}
      </View>
    </HeaderMain.Root>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: 0,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    height: 20,
    minWidth: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    zIndex: 1,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  icon: {
    width: 40,
    height: 40,
    padding: 8,
    backgroundColor: colors.neutral["100"],
    borderRadius: 22.5,
    alignItems: "center",
    display: "flex",
  },
});
