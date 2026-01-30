import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  RotateCw, 
  ZoomIn,
  ZoomOut,
  ArrowLeft,
  Check,
  X
} from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { stripTypes } from "@/data/stripTypes";
import { AnalysisAnimation } from "@/components/AnalysisAnimation";

const Analysis = () => {
  const { stripId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const selectedStrip = stripTypes.find(s => s.id === stripId);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    navigate(`/dashboard/${stripId}`, { 
      state: { 
        imageUrl: image,
        rotation,
        timestamp: new Date().toISOString()
      } 
    });
  };

  if (isAnalyzing) {
    return (
      <AnalysisAnimation 
        stripType={selectedStrip!} 
        onComplete={handleAnalysisComplete} 
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
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
            <span>Back to Selection</span>
          </button>

          {selectedStrip && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-full glass">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: selectedStrip.color }}
              />
              <span className="text-foreground font-medium">
                {selectedStrip.name} Analysis
              </span>
            </div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upload Strip Image
            </h1>
            <p className="text-muted-foreground">
              Capture or upload a clear image of your diagnostic strip
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!image ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <GlassCard
                  className={`p-12 ${isDragging ? "border-primary shadow-glow" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <motion.div
                      animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                      className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-muted/50 flex items-center justify-center"
                    >
                      <Upload className={`w-10 h-10 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
                    </motion.div>

                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {isDragging ? "Drop your image here" : "Drag & drop your image"}
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      or use one of the options below
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                      <input
                        ref={cameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileInput}
                        className="hidden"
                      />

                      <AnimatedButton
                        variant="primary"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2"
                      >
                        <ImageIcon className="w-5 h-5" />
                        Browse Files
                      </AnimatedButton>

                      <AnimatedButton
                        variant="outline"
                        onClick={() => cameraInputRef.current?.click()}
                        className="flex items-center gap-2"
                      >
                        <Camera className="w-5 h-5" />
                        Take Photo
                      </AnimatedButton>
                    </div>
                  </div>

                  {/* Alignment guide */}
                  <div className="mt-12 p-6 rounded-xl bg-muted/30 border border-border/50">
                    <h4 className="text-sm font-semibold text-foreground mb-3">
                      📐 Alignment Tips
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-success mt-0.5" />
                        Place the strip on a flat, white surface for best results
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-success mt-0.5" />
                        Ensure all reaction pads are clearly visible
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-success mt-0.5" />
                        Use good lighting without shadows or glare
                      </li>
                    </ul>
                  </div>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <GlassCard className="p-6">
                  {/* Image Preview */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-background/50 mb-6">
                    <motion.img
                      src={image}
                      alt="Strip preview"
                      className="w-full h-full object-contain"
                      style={{ 
                        transform: `rotate(${rotation}deg) scale(${zoom})`,
                        transition: "transform 0.3s ease"
                      }}
                    />

                    {/* Overlay guide */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-x-1/4 top-1/4 bottom-1/4 border-2 border-dashed border-primary/50 rounded-lg" />
                      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 border-l-2 border-t-2 border-primary" />
                      </div>
                      <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 border-r-2 border-t-2 border-primary" />
                      </div>
                      <div className="absolute bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2">
                        <div className="w-3 h-3 border-l-2 border-b-2 border-primary" />
                      </div>
                      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2">
                        <div className="w-3 h-3 border-r-2 border-b-2 border-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                    <div className="flex items-center gap-2 p-1 rounded-lg bg-muted/50">
                      <button
                        onClick={() => setRotation(r => r - 90)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <RotateCw className="w-5 h-5 transform scale-x-[-1]" />
                      </button>
                      <button
                        onClick={() => setRotation(r => r + 90)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <RotateCw className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 p-1 rounded-lg bg-muted/50">
                      <button
                        onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <ZoomOut className="w-5 h-5" />
                      </button>
                      <span className="px-2 text-sm text-muted-foreground">
                        {Math.round(zoom * 100)}%
                      </span>
                      <button
                        onClick={() => setZoom(z => Math.min(2, z + 0.25))}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <ZoomIn className="w-5 h-5" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setImage(null);
                        setRotation(0);
                        setZoom(1);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Remove
                    </button>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <AnimatedButton
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change Image
                    </AnimatedButton>
                    <AnimatedButton
                      variant="primary"
                      size="lg"
                      onClick={handleAnalyze}
                      className="flex items-center gap-2"
                    >
                      <span>Start Analysis</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </AnimatedButton>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
