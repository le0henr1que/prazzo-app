import React from "react";
import Svg, { Path } from "react-native-svg";

interface PlusIconProps {
  size?: number;
  color?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({
  size = 24,
  color = "#0D9488",
}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M3.75 12H20.25"
      stroke="#111827"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M12 3.75V20.25"
      stroke="#111827"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default PlusIcon;
