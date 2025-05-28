import React from "react";
import Svg, { Path } from "react-native-svg";

interface StoreIconProps {
  size?: number;
  color?: string;
}

const StoreIcon: React.FC<StoreIconProps> = ({
  size = 24,
  color = "#0D9488",
}) => (
  <Svg width={size} height={size} viewBox="0 0 29 28" fill="none">
    <Path
      d="M5.75 15.2676V23.6249H23.25V15.2676"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.40625 4.375H22.5938C22.7838 4.37504 22.9687 4.43697 23.1205 4.55142C23.2722 4.66587 23.3826 4.82663 23.4348 5.00937L25 10.5H4L5.56844 5.00937C5.62055 4.82717 5.73041 4.66681 5.8815 4.5524C6.03259 4.438 6.21674 4.37575 6.40625 4.375Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 10.5V12.25C11 13.1783 10.6313 14.0685 9.97487 14.7249C9.3185 15.3813 8.42826 15.75 7.5 15.75C6.57174 15.75 5.6815 15.3813 5.02513 14.7249C4.36875 14.0685 4 13.1783 4 12.25V10.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18 10.5V12.25C18 13.1783 17.6313 14.0685 16.9749 14.7249C16.3185 15.3813 15.4283 15.75 14.5 15.75C13.5717 15.75 12.6815 15.3813 12.0251 14.7249C11.3687 14.0685 11 13.1783 11 12.25V10.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M25 10.5V12.25C25 13.1783 24.6313 14.0685 23.9749 14.7249C23.3185 15.3813 22.4283 15.75 21.5 15.75C20.5717 15.75 19.6815 15.3813 19.0251 14.7249C18.3687 14.0685 18 13.1783 18 12.25V10.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default StoreIcon;
