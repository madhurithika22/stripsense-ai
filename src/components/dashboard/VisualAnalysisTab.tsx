import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Layers } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StripType, BiomarkerResult } from "@/data/stripTypes";
import { getStatusColor } from "@/lib/analysisUtils";
import heroStripImage from "@/assets/hero-strip.jpg";

interface VisualAnalysisTabProps {
  imageUrl: string | null;
  stripType: StripType;
  biomarkerResults: BiomarkerResult[];
}

export const VisualAnalysisTab = ({
  imageUrl,
  stripType,
  biomarkerResults,
}: VisualAnalysisTabProps) => {
  const [hoveredPad, setHoveredPad] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);

  // Generate pad positions for the overlay
  const padCount = Math.min(biomarkerResults.length, 10);
  const pads = biomarkerResults.slice(0, padCount).map((result, index) => ({
    ...result,
    x: 15 + (index % 5) * 17,
    y: index < 5 ? 35 : 55,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Visual Analysis</h2>
          <p className="text-muted-foreground">AI-detected reaction zones and color mapping</p>
        </div>
        <button
          onClick={() => setShowOverlay(!showOverlay)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            showOverlay ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
          }`}
        >
          <Layers className="w-4 h-4" />
          {showOverlay ? "Hide" : "Show"} Overlay
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <GlassCard>
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Original Image
            </h3>
            <div className="aspect-video rounded-xl bg-muted/30 overflow-hidden flex items-center justify-center">
              <img
                src={imageUrl || heroStripImage}
                alt="Original strip"
                className="w-full h-full object-contain"
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* Processed Image with Overlay */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <GlassCard>
            <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              AI-Processed View
            </h3>
            <div className="aspect-video rounded-xl bg-muted/30 overflow-hidden relative">
              <img
                src={imageUrl || heroStripImage}
                alt="Processed strip"
                className="w-full h-full object-contain opacity-70"
              />

              {/* Detection overlay */}
              {showOverlay && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0"
                >
                  {pads.map((pad, index) => (
                    <motion.div
                      key={index}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${pad.x}%`,
                        top: `${pad.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onMouseEnter={() => setHoveredPad(index)}
                      onMouseLeave={() => setHoveredPad(null)}
                    >
                      {/* Pad indicator */}
                      <div
                        className="w-8 h-8 rounded-lg border-2 transition-transform"
                        style={{
                          backgroundColor: pad.detectedColor + "80",
                          borderColor: hoveredPad === index ? "white" : getStatusColor(pad.status),
                          transform: hoveredPad === index ? "scale(1.2)" : "scale(1)",
                        }}
                      />

                      {/* Tooltip */}
                      {hoveredPad === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg glass text-xs whitespace-nowrap z-10"
                        >
                          <div className="font-medium text-foreground">{pad.name}</div>
                          <div className="text-muted-foreground">{pad.value}</div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {/* Connection lines */}
                  <svg className="absolute inset-0 pointer-events-none">
                    {pads.map((pad, index) => (
                      <motion.line
                        key={index}
                        x1={`${pad.x}%`}
                        y1={`${pad.y}%`}
                        x2={`${pad.x}%`}
                        y2="90%"
                        stroke={getStatusColor(pad.status)}
                        strokeWidth="1"
                        strokeDasharray="4 2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        opacity={0.3}
                      />
                    ))}
                  </svg>
                </motion.div>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard>
          <h3 className="text-sm font-medium text-foreground mb-4">Detection Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {pads.map((pad, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                onMouseEnter={() => setHoveredPad(index)}
                onMouseLeave={() => setHoveredPad(null)}
              >
                <div
                  className="w-6 h-6 rounded border-2"
                  style={{
                    backgroundColor: pad.detectedColor,
                    borderColor: getStatusColor(pad.status),
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {pad.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{pad.value}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
