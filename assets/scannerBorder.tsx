import React from "react";
import Svg, { Path, Line } from "react-native-svg";

type ScannerBorderProps = {
  width: number;
  height: number;
  strokeColor?: string;
  strokeWidth?: number;
};

const ScannerBorder: React.FC<ScannerBorderProps> = ({
  width,
  height,
  strokeColor = "white",
  strokeWidth = 3,
}) => {
  const r = 20;
  const halfSt = strokeWidth / 2;
  const arcR = r - halfSt;

  const clX = Math.round(width * 0.15);
  const clY = Math.round(height * 0.3);
  const hW = Math.round(width * 0.35);
  const sX = Math.round((width - hW) / 2);
  const eX = sX + hW;

  const vecEff = "non-scaling-stroke" as const;

  return (
    <Svg width={width} height={height}>
      <Path
        d={`
          M${halfSt},${clY + halfSt}
          L${halfSt},${arcR + halfSt}
          A${arcR},${arcR} 0 0 1 ${arcR + halfSt},${halfSt}
          L${clX + halfSt},${halfSt}
        `}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect={vecEff}
        fill="none"
      />
      <Path
        d={`
          M${width - clX - halfSt},${halfSt}
          L${width - arcR - halfSt},${halfSt}
          A${arcR},${arcR} 0 0 1 ${width - halfSt},${arcR + halfSt}
          L${width - halfSt},${clY + halfSt}
        `}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect={vecEff}
        fill="none"
      />
      <Path
        d={`
          M${halfSt},${height - clY - halfSt}
          L${halfSt},${height - arcR - halfSt}
          A${arcR},${arcR} 0 0 0 ${arcR + halfSt},${height - halfSt}
          L${clX + halfSt},${height - halfSt}
        `}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect={vecEff}
        fill="none"
      />
      <Path
        d={`
          M${width - halfSt},${height - clY - halfSt}
          L${width - halfSt},${height - arcR - halfSt}
          A${arcR},${arcR} 0 0 1 ${width - arcR - halfSt},${height - halfSt}
          L${width - clX - halfSt},${height - halfSt}
        `}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect={vecEff}
        fill="none"
      />
      <Line
        x1={sX + halfSt}
        y1={halfSt}
        x2={eX - halfSt}
        y2={halfSt}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect={vecEff}
      />
      <Line
        x1={sX + halfSt}
        y1={height - halfSt}
        x2={eX - halfSt}
        y2={height - halfSt}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect={vecEff}
      />
    </Svg>
  );
};

export default ScannerBorder;
