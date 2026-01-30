import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { BiomarkerResult } from "@/data/stripTypes";
import { getStatusColor } from "@/lib/analysisUtils";

interface BiomarkerDetailsTabProps {
  biomarkerResults: BiomarkerResult[];
}

export const BiomarkerDetailsTab = ({ biomarkerResults }: BiomarkerDetailsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Biomarker Details</h2>
          <p className="text-muted-foreground">Individual analysis for each detected biomarker</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {biomarkerResults.map((result, index) => (
          <motion.div
            key={result.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="relative overflow-hidden hover:shadow-glow transition-shadow">
              {/* Status indicator strip */}
              <div
                className="absolute top-0 left-0 w-1 h-full"
                style={{ backgroundColor: getStatusColor(result.status) }}
              />

              <div className="ml-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {result.name}
                    </h3>
                    <span
                      className="inline-block px-2 py-0.5 rounded text-xs font-medium mt-1"
                      style={{
                        backgroundColor: getStatusColor(result.status) + "20",
                        color: getStatusColor(result.status),
                      }}
                    >
                      {result.value}
                    </span>
                  </div>

                  {/* Color swatch */}
                  <div
                    className="w-12 h-12 rounded-xl border-2 border-border/50 shadow-inner"
                    style={{ backgroundColor: result.detectedColor }}
                  />
                </div>

                {/* Confidence bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="text-foreground font-medium">{result.confidence}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: getStatusColor(result.status) }}
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ duration: 0.8, delay: index * 0.05 }}
                    />
                  </div>
                </div>

                {/* Reference range */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="text-foreground">{result.referenceRange}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
