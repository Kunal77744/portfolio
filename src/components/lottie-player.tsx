"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LottiePlayerProps {
  src: string;
  className?: string;
}

export default function LottiePlayer({ src, className = "" }: LottiePlayerProps) {
  return (
    <div className={className} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <DotLottieReact
        src={src}
        loop
        autoplay
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}
