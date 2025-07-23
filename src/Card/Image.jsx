import * as React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { closeSpring } from "./animations";

export const Image = ({
  id,
  isSelected,
  pointOfInterest = 0,
  backgroundColor
}) => {
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  
  // Create inverted scale values
  const invertedScaleX = useTransform(scaleX, (value) => 1 / value);
  const invertedScaleY = useTransform(scaleY, (value) => 1 / value);

  return (
    <motion.div
      className="card-image-container"
      style={{ 
        backgroundColor, 
        originX: 0, 
        originY: 0,
        scaleX: invertedScaleX,
        scaleY: invertedScaleY
      }}
    >
      <motion.img
        className="card-image"
        src={`${process.env.PUBLIC_URL}/images/${id}.jpg`}
        alt="작품이미지"
        initial={false}
        animate={isSelected ? { x: -20, y: 0 } : { x: -pointOfInterest, y: 0 }}
        transition={closeSpring}
      />
    </motion.div>
  );
};
