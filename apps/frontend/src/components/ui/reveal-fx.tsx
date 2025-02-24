"use client";

import { motion, useInView, useAnimation, type Variant } from "framer-motion";
import { useEffect, useRef } from "react";

interface RevealFXProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  noVertical?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
}

export function RevealFX({
  children,
  width = "fit-content",
  noVertical = false,
  delay = 0,
  duration = 0.5,
  className,
}: RevealFXProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const slideVariants: { hidden: Variant; visible: Variant } = {
    hidden: {
      opacity: 0,
      y: noVertical ? 0 : 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.25, 0, 1], // Custom ease curve for smooth reveal
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div variants={slideVariants} initial="hidden" animate={controls}>
        {children}
      </motion.div>
    </div>
  );
}
