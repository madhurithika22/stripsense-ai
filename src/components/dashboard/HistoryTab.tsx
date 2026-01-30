import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Filter, TrendingUp, Calendar } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { StripType } from "@/data/stripTypes";
import { getStatusColor } from "@/lib/analysisUtils";

interface HistoryTabProps {
  stripType: StripType;
}

// Mock history data
const generateMockHistory = (stripType: StripType) => {
  const history = [];
  const now = new Date();
  
  for (let i = 0; i < 8; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i * 3);
    
    const statuses: ("normal" | "attention" | "critical")[] = ["normal", "attention", "critical"];
    const rand = Math.random();
    const status = rand < 0.6 ? "normal" : rand < 0.9 ? "attention" : "critical";
    
    history.push({
      id: `analysis-${i}`,
      date,
      stripType: stripType.name,
      status,
      biomarkerCount: stripType.biomarkers.length,
      normalCount: Math.floor(stripType.biomarkers.length * (status === "normal" ? 0.9 : status === "attention" ? 0.7 : 0.5)),
    });
  }
  
  return history;
};

export const HistoryTab = ({ stripType }: HistoryTabProps) => {
  const [filter, setFilter] = useState<"all" | "normal" | "attention" | "critical">("all");
  const history = generateMockHistory(stripType);
  
  const filteredHistory = filter === "all" 
    ? history 
    : history.filter(h => h.status === filter);

  // Generate chart data
  const chartData = history.slice().reverse().map(h => ({
    date: h.date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value: (h.normalCount / h.biomarkerCount) * 100,
    status: h.status,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Analysis History</h2>
          <p className="text-muted-foreground">Track your diagnostic results over time</p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 p-1 rounded-lg bg-muted/30">
          {(["all", "normal", "attention", "critical"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GlassCard>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Health Score Trend</h3>
          </div>

          <div className="h-48 flex items-end gap-2">
            {chartData.map((data, index) => (
              <motion.div
                key={index}
                className="flex-1 flex flex-col items-center gap-2"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.div
                  className="w-full rounded-t-lg relative group cursor-pointer"
                  style={{
                    height: `${data.value * 1.5}px`,
                    backgroundColor: getStatusColor(data.status) + "60",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-t-lg"
                    style={{ 
                      backgroundColor: getStatusColor(data.status),
                      transformOrigin: "bottom" 
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: index * 0.05 + 0.3, duration: 0.4 }}
                  />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-2 py-1 rounded bg-popover text-xs text-foreground whitespace-nowrap shadow-lg">
                      {Math.round(data.value)}% Normal
                    </div>
                  </div>
                </motion.div>
                <span className="text-xs text-muted-foreground">{data.date}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* History List */}
      <div className="space-y-3">
        {filteredHistory.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="hover:shadow-glow transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                {/* Status indicator */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: getStatusColor(item.status) + "20" }}
                >
                  <Clock className="w-5 h-5" style={{ color: getStatusColor(item.status) }} />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{item.stripType} Analysis</span>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: getStatusColor(item.status) + "20",
                        color: getStatusColor(item.status),
                      }}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.normalCount} of {item.biomarkerCount} biomarkers normal
                  </div>
                </div>

                {/* Date */}
                <div className="text-right">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {item.date.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.date.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
