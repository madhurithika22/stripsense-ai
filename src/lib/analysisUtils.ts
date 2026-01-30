import { BiomarkerResult, StripType } from "@/data/stripTypes";

// Generate mock biomarker results based on strip type
export const generateMockResults = (stripType: StripType): BiomarkerResult[] => {
  const statusOptions: ("normal" | "attention" | "critical")[] = ["normal", "attention", "critical"];
  
  const colorPalettes: Record<string, string[]> = {
    normal: ["#22C55E", "#4ADE80", "#86EFAC"],
    attention: ["#F59E0B", "#FBBF24", "#FCD34D"],
    critical: ["#EF4444", "#F87171", "#FCA5A5"],
  };

  return stripType.biomarkers.map((biomarker, index) => {
    // Weighted random - more normal results
    const rand = Math.random();
    const status = rand < 0.6 ? "normal" : rand < 0.85 ? "attention" : "critical";
    const colors = colorPalettes[status];
    const detectedColor = colors[Math.floor(Math.random() * colors.length)];
    const confidence = 75 + Math.random() * 25;

    const values: Record<string, { value: string; range: string }> = {
      normal: { value: "Normal", range: "Within range" },
      attention: { value: "Elevated", range: "Slightly above range" },
      critical: { value: "High", range: "Above normal range" },
    };

    return {
      name: biomarker,
      detectedColor,
      value: values[status].value,
      status,
      confidence: Math.round(confidence),
      referenceRange: values[status].range,
    };
  });
};

export const getOverallStatus = (results: BiomarkerResult[]): "normal" | "attention" | "critical" => {
  const hasCritical = results.some(r => r.status === "critical");
  const hasAttention = results.some(r => r.status === "attention");
  
  if (hasCritical) return "critical";
  if (hasAttention) return "attention";
  return "normal";
};

export const getStatusColor = (status: "normal" | "attention" | "critical") => {
  switch (status) {
    case "normal": return "hsl(142 76% 45%)";
    case "attention": return "hsl(38 92% 50%)";
    case "critical": return "hsl(0 84% 60%)";
  }
};

export const getStatusText = (status: "normal" | "attention" | "critical") => {
  switch (status) {
    case "normal": return "All Clear";
    case "attention": return "Attention Needed";
    case "critical": return "Requires Review";
  }
};
