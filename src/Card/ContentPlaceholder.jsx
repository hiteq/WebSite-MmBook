import * as React from "react";
import { motion, useInvertedScale } from "framer-motion";

export const ContentPlaceholder = React.memo(({ article }) => {
  const inverted = useInvertedScale();
  return (
    <motion.div
      className="content-container"
      style={{ ...inverted, originY: 0, originX: 0 }}
    >
      <div className="article" dangerouslySetInnerHTML={{ __html: article }} />
    </motion.div>
  );
});
