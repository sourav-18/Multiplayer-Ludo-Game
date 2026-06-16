import { motion } from "framer-motion";
import Logo from "../common/Logo";

function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      <Logo />

      <h2 className="text-5xl font-black leading-tight">
        Play
        <span className="text-yellow-400"> Ludo </span>
        With Friends
      </h2>

      <p className="max-w-xl text-lg text-gray-400">
        Create your own room, invite your friends and enjoy
        a modern multiplayer Ludo experience.
      </p>
    </motion.div>
  );
}

export default HeroSection;