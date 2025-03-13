import { LoaderCircle } from "lucide-react";
import { useTheme } from "../../storage/ThemeContext";
import { motion } from "motion/react";
import { useState } from "react";

function Loader({
  className,
  delay = 0,
  size = 96,
}: {
  className?: string;
  delay?: number;
  size?: number;
}) {
  const { themeColor } = useTheme();
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, delay);

  if (loading)
    return (
      <div
        className={`flex h-full items-center justify-center ${className}`}
      ></div>
    );

  return (
    <motion.div
      className={`flex h-full items-center justify-center`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.4 }}
      transition={{
        delay: 0.5,
        duration: 0.25,
        ease: "easeOut",
      }}
    >
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.25,
        }}
      >
        <LoaderCircle
          size={size}
          strokeWidth={2}
          className={`animate-spin text-${themeColor}-500 flex items-center justify-center min-h-parent ${className}`}
        />
      </motion.div>
    </motion.div>
  );
}

export default Loader;
