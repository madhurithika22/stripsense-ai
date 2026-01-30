import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StripCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export const StripCard = ({
  icon: Icon,
  name,
  description,
  color,
  isSelected,
  onClick,
  index,
}: StripCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative group cursor-pointer rounded-2xl p-6 transition-all duration-300",
        "glass border border-border/50",
        "hover:border-primary/50 hover:shadow-glow",
        isSelected && "border-primary shadow-glow ring-2 ring-primary/30"
      )}
    >
      {/* Glow effect on selection */}
      {isSelected && (
        <motion.div
          layoutId="selectedGlow"
          className="absolute inset-0 rounded-2xl bg-primary/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Icon container */}
      <motion.div
        className={cn(
          "relative w-16 h-16 rounded-xl flex items-center justify-center mb-4",
          "bg-gradient-to-br from-muted to-muted/50"
        )}
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute inset-0 rounded-xl opacity-50"
          style={{ backgroundColor: color }}
        />
        <Icon className="w-8 h-8 text-foreground relative z-10" />
        
        {/* Animated ring */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2"
          style={{ borderColor: color }}
          animate={isSelected ? { scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Selection indicator */}
      <motion.div
        className={cn(
          "absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center",
          isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
        )}
        animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {isSelected && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-3 h-3 text-primary-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        )}
      </motion.div>
    </motion.div>
  );
};
