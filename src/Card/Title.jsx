import { motion } from "framer-motion";

export const Title = ({ title, category, isSelected }) => (
  <motion.div
    className="title-container"
    style={{ originY: 0, originX: 0 }}
  >
    <span className="category">{category}</span>
    <h2>{title}</h2>
  </motion.div>
);
