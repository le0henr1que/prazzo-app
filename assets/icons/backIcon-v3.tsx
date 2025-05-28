import React from "react";
import Svg, { Path } from "react-native-svg";

interface BackIconProps {
  size?: number;
  color?: string;
}

const BackIconV3: React.FC<BackIconProps> = ({
  size = 24,
  color = "white",
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.25 12H3.75"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.5 5.25L3.75 12L10.5 18.75"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default BackIconV3;
