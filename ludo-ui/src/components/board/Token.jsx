import { motion } from "framer-motion";

function Token({
  color,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.15,
      }}
      className="h-7 w-7 rounded-full border-4 border-white shadow-lg"
      style={{
        background: color,
      }}
    />
  );
}

export default Token;