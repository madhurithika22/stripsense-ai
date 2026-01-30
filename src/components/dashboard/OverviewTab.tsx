import { motion } from "framer-motion";
import { Shield, AlertTriangle, XCircle, TrendingUp, Activity } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StripType, BiomarkerResult } from "@/data/stripTypes";
import { getStatusColor, getStatusText } from "@/lib/analysisUtils";

interface OverviewTabProps {
  stripType: StripType;
  biomarkerResults: BiomarkerResult[];
  overallStatus: "normal" | "attention" | "critical";
  timestamp: Date;
}

export const OverviewTab = ({
  stripType,
  biomarkerResults,
  overallStatus,
  timestamp,
}: OverviewTabProps) => {
  const statusIcons = {
    normal: Shield,
    attention: AlertTriangle,
    critical: XCircle,
  };

  const StatusIcon = statusIcons[overallStatus];

  const normalCount = biomarkerResults.filter(r => r.status === "normal").length;
  const attentionCount = biomarkerResults.filter(r => r.status === "attention").length;
  const criticalCount = biomarkerResults.filter(r => r.status === "critical").length;

  return (
    <div className="space-y-6">
      {/* Status Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard
          className="relative overflow-hidden"
          style={{
            borderColor: getStatusColor(overallStatus) + "40",
          }}
        >
          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: getStatusColor(overallStatus) }}
          />

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: getStatusColor(overallStatus) + "20" }}
            >
              <StatusIcon
                className="w-10 h-10"
                style={{ color: getStatusColor(overallStatus) }}
              />
            </motion.div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {getStatusText(overallStatus)}
              </h2>
              <p className="text-muted-foreground mb-4">
                {overallStatus === "normal" && "All biomarkers are within normal ranges. Continue monitoring as recommended."}
                {overallStatus === "attention" && "Some biomarkers require attention. Review the detailed analysis below."}
                {overallStatus === "critical" && "Critical values detected. Please consult with a healthcare professional."}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-muted-foreground">
                    {normalCount} Normal
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-muted-foreground">
                    {attentionCount} Attention
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-danger" />
                  <span className="text-muted-foreground">
                    {criticalCount} Critical
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-muted-foreground">Analysis Date</div>
              <div className="text-foreground font-medium">
                {timestamp.toLocaleDateString()}
              </div>
              <div className="text-sm text-muted-foreground">
                {timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Total Biomarkers",
            value: biomarkerResults.length,
            icon: Activity,
            color: stripType.color,
          },
          {
            label: "Avg. Confidence",
            value: `${Math.round(biomarkerResults.reduce((a, b) => a + b.confidence, 0) / biomarkerResults.length)}%`,
            icon: TrendingUp,
            color: "hsl(175 80% 45%)",
          },
          {
            label: "Strip Type",
            value: stripType.name,
            icon: stripType.icon,
            color: stripType.color,
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <GlassCard className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: stat.color + "20" }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Analysis Summary
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            The {stripType.name.toLowerCase()} analysis detected {biomarkerResults.length} biomarkers 
            using advanced AI-powered color interpretation. The analysis utilized LAB color-space 
            processing with white reference normalization for clinical-grade accuracy. 
            {overallStatus === "normal" 
              ? " All detected values fall within expected reference ranges."
              : " Some biomarkers show variations from expected ranges and may warrant further investigation."}
          </p>

          <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-2">
              Biomarkers Analyzed
            </h4>
            <div className="flex flex-wrap gap-2">
              {biomarkerResults.map((result) => (
                <span
                  key={result.name}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: getStatusColor(result.status) + "20",
                    color: getStatusColor(result.status),
                  }}
                >
                  {result.name}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
