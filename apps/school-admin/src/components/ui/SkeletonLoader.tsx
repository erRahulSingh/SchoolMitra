"use client";

import React from "react";

interface SkeletonProps {
  height?: number | string;
  width?: number | string;
  borderRadius?: number | string;
  style?: React.CSSProperties;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({
  height = 20,
  width = "100%",
  borderRadius = 6,
  style
}) => {
  return (
    <div
      style={{
        height,
        width,
        borderRadius,
        background: "linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        ...style
      }}
    />
  );
};
