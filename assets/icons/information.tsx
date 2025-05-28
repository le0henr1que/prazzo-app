import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

interface InformationIconProps {
  size?: number;
  color?: string;
}

const InformationIcon: React.FC<InformationIconProps> = ({
  size = 40,
  color = "#0D9488",
}) => (
  <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <Rect width={size} height={size} rx="20" fill="#F3F4F6" />
    <Path
      d="M21.0625 24.875C21.0625 25.4618 20.5868 25.9375 20 25.9375C19.4132 25.9375 18.9375 25.4618 18.9375 24.875C18.9375 24.2882 19.4132 23.8125 20 23.8125C20.5868 23.8125 21.0625 24.2882 21.0625 24.875Z"
      fill="#111827"
      stroke="#0F172A"
      stroke-width="0.125"
    />
    <Path
      d="M20 21.5V20.75C21.6566 20.75 23 19.5744 23 18.125C23 16.6756 21.6566 15.5 20 15.5C18.3434 15.5 17 16.6756 17 18.125V18.5"
      stroke="#0F172A"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M20 29C24.9706 29 29 24.9706 29 20C29 15.0294 24.9706 11 20 11C15.0294 11 11 15.0294 11 20C11 24.9706 15.0294 29 20 29Z"
      stroke="#111827"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default InformationIcon;
