import * as React from "react";
import { motion, useInvertedScale } from "framer-motion";
import { closeSpring, openSpring } from "./animations";

export const Title = ({ title, category, isSelected }) => {
  const inverted = useInvertedScale();
  const x = isSelected ? 32 : 24;
  const y = 10;

  return (
    <motion.div
      className="title-container"
      initial={false}
      animate={{ x, y }}
      transition={isSelected ? openSpring : closeSpring}
      transformTemplate={scaleTranslate}
      style={{ ...inverted, originX: 0, originY: 0 }}
    >
      <div className="author">
        <span className="category">{category}</span>
      </div>
      <h2>{title}</h2>
    </motion.div>
  );
};

const scaleTranslate = ({ x, y, scaleX, scaleY }) =>
  `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`;
