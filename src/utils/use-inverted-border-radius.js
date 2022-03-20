import { useMotionValue, useInvertedScale } from "framer-motion";
import { useEffect } from "react";
export function useInvertedBorderRadius(radius) {
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  const borderRadius = useMotionValue(`${radius}px`);
  useEffect(() => {
    // const unsubScaleX = inverted.scaleX.onChange(updateRadius);
    // const unsubScaleY = inverted.scaleY.onChange(updateRadius);
    return () => {
      // unsubScaleX();
      // unsubScaleY();
    };
  }, [radius, borderRadius]);
  return {
    scaleX,
    scaleY,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius
  };
}
