import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

interface BellIconProps {
  size?: number;
  color?: string;
}

const BellIcon: React.FC<BellIconProps> = ({
  size = 40,
  color = "#0D9488",
}) => (
  <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Rect width="40" height="40" rx="20" fill="#F3F4F6" />
    <Path
      d="M17 26C17 26.7956 17.3161 27.5587 17.8787 28.1213C18.4413 28.6839 19.2044 29 20 29C20.7956 29 21.5587 28.6839 22.1213 28.1213C22.6839 27.5587 23 26.7956 23 26"
      stroke="#0F172A"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M13.25 17.75C13.25 15.9598 13.9612 14.2429 15.227 12.977C16.4929 11.7112 18.2098 11 20 11C21.7902 11 23.5071 11.7112 24.773 12.977C26.0388 14.2429 26.75 15.9598 26.75 17.75C26.75 21.1081 27.5281 23.8063 28.1469 24.875C28.2126 24.9888 28.2472 25.1179 28.2474 25.2493C28.2475 25.3808 28.213 25.5099 28.1475 25.6239C28.082 25.7378 27.9877 25.8325 27.8741 25.8985C27.7604 25.9645 27.6314 25.9995 27.5 26H12.5C12.3687 25.9992 12.24 25.964 12.1266 25.8978C12.0132 25.8317 11.9192 25.7369 11.8539 25.6231C11.7886 25.5092 11.7543 25.3801 11.7545 25.2489C11.7547 25.1176 11.7894 24.9887 11.855 24.875C12.4728 23.8063 13.25 21.1072 13.25 17.75Z"
      stroke="#0F172A"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default BellIcon;
