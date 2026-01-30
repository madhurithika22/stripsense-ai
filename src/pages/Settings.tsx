import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Moon, 
  Sun, 
  Activity,
  Database,
  Shield,
  Trash2,
  Download
} from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { stripTypes } from "@/data/stripTypes";

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [enabledBiomarkers, setEnabledBiomarkers] = useState<Record<string, boolean>>(
    Object.fromEntries(stripTypes.flatMap(s => s.biomarkers.map(b => [b, true])))
  );

  const toggleBiomarker = (biomarker: string) => {
    setEnabledBiomarkers(prev => ({
      ...prev,
      [biomarker]: !prev[biomarker],
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    document.documentElement.classList.toggle("light");
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold gradient-text">StripZ Settings</span>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                Appearance
              </h2>
              
              <div className="flex items-center justify-between py-4 border-b border-border/50">
                <div>
                  <div className="text-foreground font-medium">Dark Mode</div>
                  <div className="text-sm text-muted-foreground">Use dark theme for reduced eye strain</div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    darkMode ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <motion.div
                    className="absolute top-1 left-1 w-6 h-6 rounded-full bg-foreground flex items-center justify-center"
                    animate={{ x: darkMode ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {darkMode ? (
                      <Moon className="w-3 h-3 text-background" />
                    ) : (
                      <Sun className="w-3 h-3 text-background" />
                    )}
                  </motion.div>
                </button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Strip Configurations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Biomarker Configuration
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Enable or disable specific biomarkers for each strip type
              </p>

              <div className="space-y-6">
                {stripTypes.slice(0, 3).map((strip) => (
                  <div key={strip.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: strip.color }}
                      />
                      <span className="font-medium text-foreground">{strip.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {strip.biomarkers.map((biomarker) => (
                        <button
                          key={biomarker}
                          onClick={() => toggleBiomarker(biomarker)}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            enabledBiomarkers[biomarker]
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "bg-muted text-muted-foreground border border-transparent"
                          }`}
                        >
                          {biomarker}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data Management
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-border/50">
                  <div>
                    <div className="text-foreground font-medium">Export Data</div>
                    <div className="text-sm text-muted-foreground">Download all analysis history as JSON</div>
                  </div>
                  <AnimatedButton variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </AnimatedButton>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <div className="text-foreground font-medium">Clear History</div>
                    <div className="text-sm text-muted-foreground">Remove all stored analysis data</div>
                  </div>
                  <AnimatedButton variant="outline" size="sm" className="flex items-center gap-2 text-destructive border-destructive/50 hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </AnimatedButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold gradient-text mb-2">StripZ</h3>
              <p className="text-muted-foreground mb-2">
                Multi-Parameter Diagnostic Strip Intelligence Platform
              </p>
              <p className="text-sm text-muted-foreground">
                Version 1.0.0 • © 2024
              </p>
              <p className="text-xs text-muted-foreground mt-4 italic">
                "Turning diagnostic strips into intelligent digital insights."
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
