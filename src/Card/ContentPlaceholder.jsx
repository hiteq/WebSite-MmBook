import { motion } from "framer-motion";

export const ContentPlaceholder = ({ article }) => (
  <motion.div
    className="content-container"
    style={{ originX: 0, originY: 0 }}
  >
    <p dangerouslySetInnerHTML={{ __html: article }} />
  </motion.div>
);
