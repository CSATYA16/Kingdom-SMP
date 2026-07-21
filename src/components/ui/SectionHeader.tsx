
import { motion } from "framer-motion";
import { fadeUp } from "../../utils/animations";
import { cn } from "../../utils/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  gradientTitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  gradientTitle,
  description,
  align = "center",
  className,
}) => {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block text-accent-gold text-sm font-semibold tracking-wider uppercase mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
        {title}
        {gradientTitle && (
          <>
            {" "}
            <span className="text-gradient block mt-2">{gradientTitle}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="text-gray-400 text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};
