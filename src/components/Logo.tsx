import { motion } from "motion/react";
import { useTheme } from "../storage/ThemeContext";

export default function Logo({ still }: { still?: boolean }) {
  const { themeColor } = useTheme();
  if (still) {
    return (
      <h1 className="xl:text-6xl md:text-5xl text-4xl font-black text-slate-100 flex items-center mx-auto">
        daily
        <span
          className={`lg:text-8xl text-6xl pl-0 text-${themeColor}-500 opacity-70 _text-handwritten`}
        >
          Do
        </span>
      </h1>
    );
  }
  return (
    <motion.h1
      className="xl:text-6xl md:text-5xl text-4xl font-black text-slate-100 flex items-center mx-auto"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1.2,
      }}
    >
      daily
      <span
        className={`lg:text-8xl text-6xl pl-0 text-${themeColor}-500 opacity-70 _text-handwritten`}
      >
        Do
      </span>
    </motion.h1>
  );
}
