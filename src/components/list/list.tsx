import { PhosphorLogo } from "phosphor-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { IconProps } from "phosphor-react-native";
import * as PhosphorIcons from "phosphor-react-native";
import { colors } from "../../styles/colors";
import Typography from "../text";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreensType } from "../../screens/index.screens";

export interface ListProps {
  title: string;
  description: string;
  redirectTo: ScreensType | string;
  icon: keyof typeof PhosphorIcons;
  iconColor?: string;
  isDisabled?: boolean;
  weight?: "fill" | "regular" | "bold";
}

export function List({ options }: { options: ListProps[] }) {
  const navigation = useNavigation();
  return (
    <View>
      {options.map((item, index) => {
        const IconComponent = PhosphorIcons[
          item.icon
        ] as React.ComponentType<IconProps>;
        return (
          <Pressable
            key={index}
            style={({ pressed }: { pressed: boolean }) => [
              styles.option,
              pressed && { backgroundColor: colors.neutral[2] },
              item.isDisabled && { opacity: 0.5 },
              index !== 0 && {
                borderTopWidth: 1,
                borderTopColor: colors.neutral[2],
              },
            ]}
            onPress={() => navigation.navigate(item.redirectTo as never)}
            disabled={item.isDisabled}
          >
            <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
              <View>
                <View style={styles.iconSpace}>
                  <IconComponent
                    color={item.iconColor || colors.neutral[6]}
                    size={24}
                    weight={item.weight}
                  />
                </View>
              </View>
              <View>
                <Typography
                  family="medium"
                  variant="BASE"
                  color={colors.neutral[7]}
                >
                  {item.title}
                </Typography>
                <Typography
                  family="medium"
                  variant="XS"
                  color={colors.neutral[5]}
                >
                  {item.description}
                </Typography>
              </View>
            </View>
            <View>
              <PhosphorIcons.CaretRight color={colors.neutral[5]} size={20} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  iconSpace: {
    padding: 4,
    backgroundColor: colors.neutral[1],
    borderRadius: 8,
    width: 38,
    height: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
