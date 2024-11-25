import { LoaderCircle } from "lucide-react";
import { useTheme } from "../../storage/ThemeContext";
import { motion } from "motion/react";

function Loader({ className }: { className?: string }) {
  const { themeColor } = useTheme();
  return (
    <motion.div
      className={`flex h-full items-center justify-center ${className}`}
      initial={{ opacity: 0 }} // Initial animation for first render
      animate={{ opacity: 1 }} // Animate to full visibility and size
      transition={{
        scale: { duration: 0.5, ease: "easeIn" },
        opacity: { duration: 0.5 },
      }}
    >
      <motion.div
        initial={{ opacity: 1 }} // No need for this to start at 0
        animate={{ opacity: 0.2 }} // Create the repeating fade effect
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <LoaderCircle
          size={96}
          strokeWidth={2}
          className={`animate-spin text-${themeColor}-500 flex items-center justify-center min-h-parent`}
        />
      </motion.div>
    </motion.div>
  );
}

export default Loader;
