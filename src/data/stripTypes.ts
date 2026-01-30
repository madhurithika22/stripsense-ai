import { 
  Droplet, 
  TestTube, 
  Sparkles, 
  Scissors, 
  Hand,
  Eye 
} from "lucide-react";

export interface StripType {
  id: string;
  name: string;
  icon: typeof Droplet;
  description: string;
  color: string;
  biomarkers: string[];
}

export const stripTypes: StripType[] = [
  {
    id: "urine",
    name: "Urine",
    icon: TestTube,
    description: "Metabolic & renal biomarker analysis for comprehensive health screening",
    color: "#F59E0B",
    biomarkers: ["Glucose", "Protein", "pH", "Blood", "Ketones", "Bilirubin", "Urobilinogen", "Nitrite", "Leukocytes", "Specific Gravity"],
  },
  {
    id: "sweat",
    name: "Sweat",
    icon: Droplet,
    description: "Electrolyte balance and hydration status assessment",
    color: "#3B82F6",
    biomarkers: ["Sodium", "Chloride", "Potassium", "Lactate", "Cortisol", "Glucose"],
  },
  {
    id: "saliva",
    name: "Saliva",
    icon: Sparkles,
    description: "Hormonal and stress marker evaluation for wellness monitoring",
    color: "#EC4899",
    biomarkers: ["Cortisol", "Testosterone", "Estradiol", "DHEA", "Melatonin", "Progesterone"],
  },
  {
    id: "hair",
    name: "Hair Strands",
    icon: Scissors,
    description: "Long-term mineral and toxin accumulation detection",
    color: "#8B5CF6",
    biomarkers: ["Lead", "Mercury", "Arsenic", "Cadmium", "Zinc", "Copper", "Magnesium", "Calcium"],
  },
  {
    id: "nails",
    name: "Nails",
    icon: Hand,
    description: "Chronic exposure and nutritional status analysis",
    color: "#10B981",
    biomarkers: ["Selenium", "Zinc", "Calcium", "Iron", "Arsenic", "Lead"],
  },
  {
    id: "tears",
    name: "Tears",
    icon: Eye,
    description: "Ocular health and systemic biomarker detection",
    color: "#06B6D4",
    biomarkers: ["Glucose", "Lactoferrin", "Lipocalin", "Lysozyme", "Albumin", "IgA"],
  },
];

export interface AnalysisResult {
  id: string;
  timestamp: Date;
  stripType: StripType;
  imageUrl: string;
  biomarkerResults: BiomarkerResult[];
  overallStatus: "normal" | "attention" | "critical";
  summary: string;
}

export interface BiomarkerResult {
  name: string;
  detectedColor: string;
  value: string;
  status: "normal" | "attention" | "critical";
  confidence: number;
  referenceRange: string;
}

// Mock analysis history for demo
export const mockAnalysisHistory: AnalysisResult[] = [];
