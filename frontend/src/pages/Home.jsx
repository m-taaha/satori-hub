import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Share2, Star, BookOpen, Zap } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">

      <div className="absolute inset-0 z-0">
       
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-6 pt-32 relative z-10">
        <div className="max-w-4xl">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold mb-8 shadow-sm"
          >
            <Zap className="w-3 h-3 text-blue-500 fill-blue-500" />
            Satori Hub v1.0 • Join the Developer Community
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-9xl font-black text-slate-900 leading-[0.85] tracking-tighter"
          >
            ELEVATE <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">
              KNOWLEDGE.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 text-xl text-slate-600 leading-relaxed max-w-lg"
          >
            A centralized hub for technical learning. Share MERN guides, Web3
            roadmaps, and academic notes with a community that rates quality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="h-16 px-10 text-lg rounded-2xl shadow-xl shadow-blue-100 transition-all hover:scale-105 active:scale-95 group"
              onClick={() => navigate("/register")}
            >
              Get Started{" "}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-16 px-10 text-lg rounded-2xl bg-white/50 backdrop-blur-md border-slate-200 hover:bg-white transition-all"
              onClick={() => navigate("/explore")}
            >
              Explore Feed
            </Button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-28 grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-slate-100 pt-12"
          >
            <FeatureItem
              icon={<Share2 className="w-6 h-6" />}
              title="Instant Sharing"
              desc="Upload PDFs or link tutorials in seconds."
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <FeatureItem
              icon={<Star className="w-6 h-6" />}
              title="Trust Metrics"
              desc="Peer reviews ensure high-quality content."
              color="text-yellow-600"
              bgColor="bg-yellow-50"
            />
            <FeatureItem
              icon={<BookOpen className="w-6 h-6" />}
              title="Roadmap Ready"
              desc="Organized paths for every tech stack."
              color="text-indigo-600"
              bgColor="bg-indigo-50"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc, color, bgColor }) {
  return (
    <div className="group space-y-3 cursor-default">
      <div
        className={`w-14 h-14 ${bgColor} ${color} rounded-2xl flex items-center justify-center transition-transform group-hover:-translate-y-1`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
      <p className="text-sm text-slate-500 leading-snug">{desc}</p>
    </div>
  );
}
