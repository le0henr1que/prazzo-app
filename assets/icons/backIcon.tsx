import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

interface BackIconconProps {
  size?: number;
  color?: string;
}

const BackIconcon: React.FC<BackIconconProps> = ({
  /* size = 40,
  color = "#0D9488", */
}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.25 12H3.75"
      stroke="white"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M10.5 5.25L3.75 12L10.5 18.75"
      stroke="white"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default BackIconcon;
