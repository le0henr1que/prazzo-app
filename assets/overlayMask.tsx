import React from "react";
import { Dimensions } from "react-native";
import Svg, { Defs, Mask, Rect, G } from "react-native-svg";

type OverlayMaskSvgProps = {
  offsetY?: number;
};

export default function OverlayMaskSvg({ offsetY = 0 }: OverlayMaskSvgProps) {
  const { width: W, height: H } = Dimensions.get("window");
  const holeWidth = 359;
  const holeHeight = 170;
  const holeX = (W - holeWidth) / 2;
  const holeY = (H - holeHeight) / 2 + offsetY;
  const radius = 20;

  return (
    <Svg width={W} height={H} style={{ position: "absolute", top: 0, left: 0 }}>
      <Defs>
        <Mask id="mask">
          <Rect width={W} height={H} fill="white" />
          <Rect
            x={holeX}
            y={holeY}
            width={holeWidth}
            height={holeHeight}
            rx={radius}
            ry={radius}
            fill="black"
          />
        </Mask>
      </Defs>

      <G mask="url(#mask)">
        <Rect width={W} height={H} fill="rgba(0,0,0,0.75)" />
      </G>
    </Svg>
  );
}
