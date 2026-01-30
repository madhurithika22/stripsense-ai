import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Activity, 
  FileText, 
  BarChart3, 
  Clock, 
  Download,
  Eye,
  Settings,
  Share2
} from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { stripTypes, BiomarkerResult } from "@/data/stripTypes";
import { generateMockResults, getOverallStatus } from "@/lib/analysisUtils";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { BiomarkerDetailsTab } from "@/components/dashboard/BiomarkerDetailsTab";
import { VisualAnalysisTab } from "@/components/dashboard/VisualAnalysisTab";
import { HistoryTab } from "@/components/dashboard/HistoryTab";
import { ReportsTab } from "@/components/dashboard/ReportsTab";

const tabs = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "biomarkers", label: "Biomarker Details", icon: BarChart3 },
  { id: "visual", label: "Visual Analysis", icon: Eye },
  { id: "history", label: "History", icon: Clock },
  { id: "reports", label: "Reports", icon: FileText },
];

const Dashboard = () => {
  const { stripId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [biomarkerResults, setBiomarkerResults] = useState<BiomarkerResult[]>([]);

  const selectedStrip = stripTypes.find(s => s.id === stripId);
  const imageUrl = location.state?.imageUrl;
  const timestamp = location.state?.timestamp ? new Date(location.state.timestamp) : new Date();

  useEffect(() => {
    if (selectedStrip) {
      setBiomarkerResults(generateMockResults(selectedStrip));
    }
  }, [selectedStrip]);

  const overallStatus = getOverallStatus(biomarkerResults);

  if (!selectedStrip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Strip type not found</p>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            stripType={selectedStrip}
            biomarkerResults={biomarkerResults}
            overallStatus={overallStatus}
            timestamp={timestamp}
          />
        );
      case "biomarkers":
        return <BiomarkerDetailsTab biomarkerResults={biomarkerResults} />;
      case "visual":
        return (
          <VisualAnalysisTab
            imageUrl={imageUrl}
            stripType={selectedStrip}
            biomarkerResults={biomarkerResults}
          />
        );
      case "history":
        return <HistoryTab stripType={selectedStrip} />;
      case "reports":
        return (
          <ReportsTab
            stripType={selectedStrip}
            biomarkerResults={biomarkerResults}
            overallStatus={overallStatus}
            timestamp={timestamp}
            imageUrl={imageUrl}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-50 glass-strong border-b border-border/50"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="font-semibold text-foreground">StripZ Dashboard</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: selectedStrip.color }}
                      />
                      <span>{selectedStrip.name} Analysis</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AnimatedButton variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </AnimatedButton>
                <AnimatedButton variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  size="sm"
                  onClick={() => navigate("/")}
                >
                  New Analysis
                </AnimatedButton>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Tab Navigation */}
        <div className="sticky top-[73px] z-40 glass border-b border-border/50">
          <div className="container mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <main className="container mx-auto px-6 py-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
