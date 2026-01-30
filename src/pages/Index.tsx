import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Activity, Shield, Zap } from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { StripCard } from "@/components/StripCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { stripTypes } from "@/data/stripTypes";

const Index = () => {
  const [selectedStrip, setSelectedStrip] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (selectedStrip) {
      navigate(`/analysis/${selectedStrip}`);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 py-8"
        >
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold gradient-text">StripZ</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <AnimatedButton variant="outline" size="sm" onClick={() => navigate("/settings")}>
                Settings
              </AnimatedButton>
            </div>
          </nav>
        </motion.header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-12 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">AI-Powered Diagnostics</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Multi-Parameter</span>
              <br />
              <span className="gradient-text">Diagnostic Intelligence</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Transform diagnostic strips into actionable health insights with our 
              advanced AI color interpretation technology.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { icon: Shield, text: "Clinical Grade" },
                { icon: Zap, text: "Real-time Analysis" },
                { icon: Activity, text: "10+ Biomarkers" },
              ].map((badge, index) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50"
                >
                  <badge.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Strip Selection */}
        <section className="container mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Select Analysis Type
            </h2>
            <p className="text-muted-foreground">
              Choose the diagnostic strip type to begin your analysis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {stripTypes.map((strip, index) => (
              <StripCard
                key={strip.id}
                icon={strip.icon}
                name={strip.name}
                description={strip.description}
                color={strip.color}
                isSelected={selectedStrip === strip.id}
                onClick={() => setSelectedStrip(strip.id)}
                index={index}
              />
            ))}
          </div>

          {/* Proceed Button */}
          <AnimatePresence>
            {selectedStrip && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center mt-12"
              >
                <AnimatedButton
                  onClick={handleProceed}
                  size="lg"
                  className="flex items-center gap-3"
                >
                  <span>Proceed to Analysis</span>
                  <ArrowRight className="w-5 h-5" />
                </AnimatedButton>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for accuracy, scalability, and seamless integration into healthcare workflows
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "AI Color Analysis",
                description: "LAB color-space processing with white reference normalization for clinical-grade accuracy",
                icon: "🎨",
              },
              {
                title: "Multi-Strip Support",
                description: "Supports urine, sweat, saliva, hair, nails, and tear analysis with expandable architecture",
                icon: "🧪",
              },
              {
                title: "Instant Reports",
                description: "Generate professional PDF reports with complete biomarker analysis and recommendations",
                icon: "📊",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full text-center hover:shadow-glow transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer Tagline */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 py-16 text-center"
        >
          <p className="text-lg text-muted-foreground italic">
            "Turning diagnostic strips into intelligent digital insights."
          </p>
          <div className="mt-8 flex justify-center gap-8 text-sm text-muted-foreground">
            <span>© 2024 StripZ</span>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
