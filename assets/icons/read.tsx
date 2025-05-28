import React from "react";
import Svg, { Mask, Path, Rect } from "react-native-svg";

interface ReadIconProps {
  size?: number;
  color?: string;
}

const ReadIcon: React.FC<ReadIconProps> = ({
  size = 40,
  color = "#0D9488",
}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M1.5 12.2147L5.1 15.75L13.5 7.5"
      stroke="#111827"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M11.8087 13.5L14.1 15.75L22.5 7.5"
      stroke="#111827"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default ReadIcon;
