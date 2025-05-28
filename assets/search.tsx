import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

interface SearchIconProps {
  size?: number;
  color?: string;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  size = 40,
  color = "#0D9488",
}) => (
  <Svg width="153" height="139" viewBox="0 0 153 139" fill="none">
    <Rect
      x="1.5"
      y="27.7588"
      width="40.7923"
      height="28.1497"
      rx="4"
      stroke="#E5E7EB"
      stroke-width="3.00068"
      stroke-linecap="round"
    />
    <Path
      d="M7.92401 43.1855H29.7656M7.92401 49.6134H19.5066"
      stroke="#E5E7EB"
      stroke-width="3.00068"
      stroke-linecap="round"
    />
    <Rect
      x="7.12653"
      y="31.9814"
      width="7.73647"
      height="7.74117"
      rx="2"
      fill="#E5E7EB"
    />
    <Rect
      x="11.7784"
      y="98.4658"
      width="40.7923"
      height="28.1497"
      rx="4"
      stroke="#E5E7EB"
      stroke-width="3.00068"
      stroke-linecap="round"
    />
    <Path
      d="M18.2024 113.893H40.0439M18.2024 120.32H29.785"
      stroke="#E5E7EB"
      stroke-width="3.00068"
      stroke-linecap="round"
    />
    <Rect
      x="17.4049"
      y="102.688"
      width="7.73647"
      height="7.74117"
      rx="2"
      fill="#E5E7EB"
    />
    <Rect
      x="110.708"
      y="41.9004"
      width="40.7923"
      height="28.1497"
      rx="4"
      stroke="#E5E7EB"
      stroke-width="3.00068"
      stroke-linecap="round"
    />
    <Path
      d="M117.132 57.3271H138.973M117.132 63.755H128.714"
      stroke="#E5E7EB"
      stroke-width="3.00068"
      stroke-linecap="round"
    />
    <Rect
      x="116.334"
      y="46.123"
      width="7.73647"
      height="7.74117"
      rx="2"
      fill="#E5E7EB"
    />
    <Rect
      x="55.4614"
      y="57.3271"
      width="40.7923"
      height="28.1497"
      rx="4"
      stroke="#E5E7EB"
      stroke-width="3.00068"
      stroke-linecap="round"
    />
    <Path
      d="M61.7913 72.8096H83.594M61.7913 77.7358H73.3533"
      stroke="#E5E7EB"
      stroke-width="3.00068"
      stroke-linecap="round"
    />
    <Rect
      x="61.088"
      y="61.5498"
      width="7.73647"
      height="7.74117"
      rx="2"
      fill="#E5E7EB"
    />
    <Path
      d="M111.662 35.1416C105.111 28.5862 97.2169 24.1924 88.8662 21.9603C75.3189 18.339 60.5687 20.4069 48.3951 28.1637M25.3471 63.7551C24.1246 72.1467 24.9983 80.7851 27.9683 88.8238M65.0975 120.935C77.9221 123.653 91.5929 121.375 102.999 114.1M119.026 97.8229C122.943 91.4661 125.333 84.4342 126.197 77.2536"
      stroke="#E5E7EB"
      stroke-width="3"
      stroke-linecap="round"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M103.43 43.7092C88.2835 28.5533 63.7258 28.5533 48.579 43.7092C33.4323 58.8652 33.4323 83.4378 48.579 98.5937C62.617 112.64 84.7386 113.668 99.96 101.678L121.323 123.054C123.162 124.894 126.144 124.894 127.983 123.054C129.822 121.214 129.822 118.231 127.983 116.391L106.607 95.0018C118.49 79.775 117.431 57.719 103.43 43.7092ZM54.9385 50.0725C66.573 38.4309 85.4363 38.4309 97.0708 50.0725C108.705 61.7141 108.705 80.5889 97.0708 92.2305C85.4363 103.872 66.573 103.872 54.9385 92.2305C43.3039 80.5889 43.3039 61.7141 54.9385 50.0725Z"
      fill="#D1D5DB"
    />
  </Svg>
);

export default SearchIcon;
