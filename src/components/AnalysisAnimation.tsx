import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StripType } from "@/data/stripTypes";
import { Activity } from "lucide-react";

interface AnalysisAnimationProps {
  stripType: StripType;
  onComplete: () => void;
}

const analysisSteps = [
  { label: "Detecting strip geometry", duration: 1500 },
  { label: "Identifying reaction zones", duration: 2000 },
  { label: "Normalizing color signals", duration: 1800 },
  { label: "Generating insights", duration: 1200 },
];

export const AnalysisAnimation = ({ stripType, onComplete }: AnalysisAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentStep < analysisSteps.length) {
      const stepDuration = analysisSteps[currentStep].duration;
      const startProgress = (currentStep / analysisSteps.length) * 100;
      const endProgress = ((currentStep + 1) / analysisSteps.length) * 100;
      
      // Animate progress
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const stepProgress = Math.min(elapsed / stepDuration, 1);
        setProgress(startProgress + (endProgress - startProgress) * stepProgress);
        
        if (stepProgress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);

      timeout = setTimeout(() => {
        if (currentStep < analysisSteps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setTimeout(onComplete, 500);
        }
      }, stepDuration);
    }

    return () => clearTimeout(timeout);
  }, [currentStep, onComplete]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-primary opacity-50" />
      <motion.div
        className="absolute inset-0"
        animate={{ 
          background: [
            "radial-gradient(ellipse at 30% 50%, hsl(175 80% 45% / 0.1) 0%, transparent 50%)",
            "radial-gradient(ellipse at 70% 50%, hsl(175 80% 45% / 0.1) 0%, transparent 50%)",
            "radial-gradient(ellipse at 30% 50%, hsl(175 80% 45% / 0.1) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10 text-center max-w-lg mx-auto px-6">
        {/* Animated strip illustration */}
        <motion.div
          className="relative w-48 h-48 mx-auto mb-12"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Scanning rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-primary/40"
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.7,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: stripType.color + "20" }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <stripType.icon 
                className="w-12 h-12"
                style={{ color: stripType.color }}
              />
            </motion.div>
          </div>

          {/* Orbiting dots */}
          {stripType.biomarkers.slice(0, 6).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-primary"
              style={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: [0, Math.cos((i / 6) * Math.PI * 2 + Date.now() / 1000) * 80],
                y: [0, Math.sin((i / 6) * Math.PI * 2 + Date.now() / 1000) * 80],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Strip type label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: stripType.color }}
          />
          <span className="text-lg font-medium text-foreground">
            {stripType.name} Analysis
          </span>
        </motion.div>

        {/* Progress steps */}
        <div className="space-y-4 mb-8">
          {analysisSteps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="relative w-8 h-8 flex-shrink-0">
                {index < currentStep ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full rounded-full bg-primary flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>
                ) : index === currentStep ? (
                  <motion.div
                    className="w-full h-full rounded-full border-2 border-primary"
                    animate={{ borderColor: ["hsl(175 80% 45%)", "hsl(200 95% 50%)", "hsl(175 80% 45%)"] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <motion.div
                      className="w-3 h-3 bg-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  </motion.div>
                ) : (
                  <div className="w-full h-full rounded-full border-2 border-muted-foreground/30" />
                )}
              </div>
              <span className={`text-sm ${
                index <= currentStep ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
            style={{ width: `${progress}%` }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 bg-shimmer-gradient"
            style={{ width: `${progress}%` }}
            animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.p
          className="mt-6 text-sm text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Processing with AI-powered color analysis...
        </motion.p>
      </div>
    </div>
  );
};
