import React from "react";
import Svg, { Path } from "react-native-svg";

interface UserIconProps {
  size?: number;
  color?: string;
}

const UserIcon: React.FC<UserIconProps> = ({
  size = 24,
  color = "#4B5563",
}) => (
  <Svg width={size} height={size} viewBox="0 0 29 28" fill="none">
    <Path
      d="M14.5 14C17.5376 14 20 11.5376 20 8.5C20 5.46243 17.5376 3 14.5 3C11.4624 3 9 5.46243 9 8.5C9 11.5376 11.4624 14 14.5 14Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 23.625C6.11859 19.9642 9.96641 17.5 14.5 17.5C19.0336 17.5 22.8814 19.9642 25 23.625"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default UserIcon;
