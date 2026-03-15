import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Twitter,
  Download,
  Mail,
  Terminal as TerminalIcon,
  ChevronRight,
  MessageCircle,
  ExternalLink,
  Zap,
  Shield,
  BarChart3,
  Layers,
  X,
} from "lucide-react";
import portfolioData from "./data/portfolio.json";
import { ThreeScene } from "./components/ThreeScene";
import { Terminal } from "./components/Terminal";
import { Chatbot } from "./components/Chatbot";
import { CustomCursor } from "./components/CustomCursor";
import { Typewriter } from "./components/Typewriter";
import { OrbitingIcons } from "./components/OrbitingIcons";
import { ThemeToggler } from "./components/ThemeToggler";
import { cn } from "./utils/cn";
import { useSubmit } from "./hooks/useSubmit";
import Tilt from "react-parallax-tilt";
import { GitHubCalendar } from "react-github-calendar";

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSummaryMode, setIsSummaryMode] = useState(false);
  const [booting, setBooting] = useState(true);
  const [bootText, setBootText] = useState<string[]>([]);
  const { formRef, formStatus, handleSubmit } = useSubmit();

  const bootSequence = [
    "> Initializing MT-OS v2.4.0...",
    "> Loading kernel modules...",
    "> Establishing secure connection...",
    "> Fetching developer profile...",
    "> Welcome, Manish Tiwari.",
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < bootSequence.length) {
        setBootText((prev) => [...prev, bootSequence[current]]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 1000);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  if (booting) {
    return (
      <div className="fixed inset-0 bg-bg flex items-center justify-center font-mono p-6 z-[100]">
        <div className="w-full max-w-xl">
          {bootText.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary mb-2"
            >
              {text}
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-3 h-5 bg-primary inline-block ml-1"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-white selection:bg-primary selection:text-bg md:cursor-none">
      <CustomCursor />
      <ThreeScene />
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-20 space-y-20 sm:space-y-40">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-[60vh] sm:min-h-[80vh] flex flex-col justify-center items-center text-center relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-orbitron text-primary text-lg md:text-xl mb-4 tracking-[0.2em] uppercase">
              {portfolioData.profile.title}
            </h2>
            <h1 className="text-3xl sm:text-5xl md:text-8xl font-black mb-4 sm:mb-6 font-orbitron tracking-tighter">
              <span className="text-white">MANISH</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary neon-text">
                TIWARI
              </span>
            </h1>
            <div className="text-white/60 text-base sm:text-lg md:text-2xl max-w-2xl mx-auto mb-6 sm:mb-10 font-rajdhani h-8">
              <Typewriter text={portfolioData.profile.tagline} delay={40} />
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
              <button
                onClick={() => setIsTerminalOpen(true)}
                className="group relative px-5 py-3 sm:px-8 sm:py-4 bg-primary/10 border border-primary/50 rounded-full font-orbitron text-xs sm:text-sm font-bold text-primary hover:bg-primary hover:text-bg transition-all duration-300 shadow-[0_0_20px_rgba(0,255,65,0.2)]"
              >
                <span className="flex items-center gap-2">
                  <TerminalIcon size={18} />
                  LAUNCH TERMINAL
                </span>
              </button>
              <button
                onClick={() => setIsSummaryMode(!isSummaryMode)}
                className={cn(
                  "px-5 py-3 sm:px-8 sm:py-4 border rounded-full font-orbitron text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2",
                  isSummaryMode
                    ? "bg-secondary text-bg border-secondary shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10",
                )}
              >
                <Zap size={18} />
                {isSummaryMode ? "EXIT SUMMARY" : "RECRUITER MODE"}
              </button>
            </div>

            <AnimatePresence>
              {isSummaryMode && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="mt-12 max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-left"
                >
                  <div className="glass p-6 rounded-2xl border-secondary/30">
                    <h4 className="text-secondary font-orbitron text-xs tracking-widest mb-4 flex items-center gap-2">
                      <BarChart3 size={14} /> CORE METRICS
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between">
                        <span className="text-white/40">Exp:</span>{" "}
                        <span className="text-white font-bold">
                          {portfolioData.quickSummary.experience}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-white/40">Status:</span>{" "}
                        <span className="text-green-400 font-bold">
                          {portfolioData.quickSummary.availability}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-white/40">Loc:</span>{" "}
                        <span className="text-white font-bold">
                          {portfolioData.quickSummary.location}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="glass p-6 rounded-2xl border-primary/30">
                    <h4 className="text-primary font-orbitron text-xs tracking-widest mb-4 flex items-center gap-2">
                      <Shield size={14} /> TOP STACK
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {portfolioData.quickSummary.topSkills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-[10px] text-primary font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="glass p-6 rounded-2xl border-white/20">
                    <h4 className="text-white font-orbitron text-xs tracking-widest mb-4 flex items-center gap-2">
                      <Layers size={14} /> HIGHLIGHTS
                    </h4>
                    <ul className="space-y-2">
                      {portfolioData.quickSummary.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="text-[11px] text-white/60 flex gap-2"
                        >
                          <span className="text-primary">▹</span> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className={cn(
                "flex gap-8",
                isSummaryMode
                  ? "mt-12 justify-center"
                  : "absolute bottom-0 left-1/2 -translate-x-1/2",
              )}
            >
              {portfolioData.socials.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/40 hover:text-primary transition-colors duration-300"
                >
                  {social.platform === "Github" && <Github size={24} />}
                  {social.platform === "LinkedIn" && <Linkedin size={24} />}
                  {social.platform === "Twitter" && <Twitter size={24} />}
                  {social.platform === "WhatsApp" && (
                    <MessageCircle size={24} />
                  )}
                </a>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeader title="ABOUT ME" subtitle="The Architect" />
            <div className="glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16" />
              <p className="text-white/70 leading-relaxed text-base sm:text-lg font-rajdhani">
                {portfolioData.profile.bio}
              </p>
              <div className="flex gap-4">
                <a
                  href={portfolioData.profile.resumeUrl}
                  target="_blank"
                  className="flex items-center gap-2 text-secondary font-bold hover:underline"
                >
                  <Download size={18} />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <OrbitingIcons />
            <div className="relative z-10 w-full aspect-square max-w-xs mx-auto rounded-full overflow-hidden neon-border group">
              <img
                src={portfolioData.profile.avatar}
                alt="Manish Tiwari"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent opacity-60" />
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SectionHeader
            title="TECH STACK"
            subtitle="Core Competencies"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {portfolioData.skills.map((skillGroup, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl border-t-2 border-primary/20 hover:border-primary/50 transition-all duration-500 group"
              >
                <h3 className="font-orbitron text-primary text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform" />
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill, j) => (
                    <span
                      key={j}
                      className="px-4 py-2 bg-white/5 rounded-lg text-sm border border-white/10 hover:bg-primary/10 hover:border-primary/30 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Journey Section */}
        <section id="journey">
          <SectionHeader
            title="JOURNEY"
            subtitle="Experience & Education"
            center
          />
          <div className="max-w-4xl mx-auto relative">
            {/* Animated Timeline Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-0 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent origin-top"
            />

            <div className="space-y-8 sm:space-y-12">
              {portfolioData.journey.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: i % 2 === 0 ? -100 : 100,
                    scale: 0.8,
                  }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    type: "spring",
                    bounce: 0.3,
                  }}
                  className={cn(
                    "relative flex flex-col md:flex-row items-center gap-8",
                    i % 2 === 0 ? "md:flex-row-reverse" : "",
                  )}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-bg border-2 border-primary rounded-full z-10 shadow-[0_0_15px_rgba(0,255,65,0.8)]"
                  />
                  <div className="w-full md:w-1/2">
                    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                      <div className="glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-primary/30 group">
                        <span className="text-primary font-mono text-sm mb-2 block group-hover:neon-text transition-all">
                          {item.year}
                        </span>
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-secondary font-medium mb-4">
                          {item.organization}
                        </p>
                        <p className="text-white/60 text-sm leading-relaxed mb-4">
                          {item.description}
                        </p>
                        {item.technologies && (
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech, j) => (
                              <span
                                key={j}
                                className="text-[10px] uppercase tracking-widest text-white/40 px-2 py-1 bg-white/5 rounded border border-white/5 group-hover:border-primary/20 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Tilt>
                  </div>
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-12 sm:space-y-20">
          <div>
            <SectionHeader
              title="CASE STUDIES"
              subtitle="Engineering Deep Dives"
              center
            />
            <div className="space-y-10 sm:space-y-16">
              {portfolioData.caseStudies.map((study, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-[3rem] border-white/5 hover:border-primary/20 transition-all group"
                >
                  <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div
                      className={cn("space-y-8", i % 2 !== 0 && "lg:order-2")}
                    >
                      <div>
                        <h3 className="text-xl sm:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {study.title}
                        </h3>
                        <div className="w-20 h-1 bg-primary/30 rounded-full" />
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h4 className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
                            The Problem
                          </h4>
                          <p className="text-white/70 leading-relaxed">
                            {study.problem}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xs font-orbitron text-secondary uppercase tracking-widest">
                            The Solution
                          </h4>
                          <p className="text-white/70 leading-relaxed">
                            {study.solution}
                          </p>
                        </div>
                        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
                          <h4 className="text-xs font-orbitron text-primary uppercase tracking-widest mb-2">
                            The Impact
                          </h4>
                          <p className="text-primary font-bold">
                            {study.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Tilt
                      tiltMaxAngleX={5}
                      tiltMaxAngleY={5}
                      scale={1.01}
                      className={cn(i % 2 !== 0 && "lg:order-1")}
                    >
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <img
                          src={study.diagram}
                          alt="Architecture Diagram"
                          className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
                      </div>
                    </Tilt>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              title="PROFESSIONAL"
              subtitle="Enterprise Solutions"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
              {portfolioData.projects
                .filter((p) => p.type === "professional")
                .map((project, i) => (
                  <ProjectCard key={i} project={project} index={i} />
                ))}
            </div>
          </div>

          <div>
            <SectionHeader title="PERSONAL" subtitle="Experimental Lab" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
              {portfolioData.projects
                .filter((p) => p.type === "personal")
                .map((project, i) => (
                  <ProjectCard key={i} project={project} index={i} />
                ))}
            </div>
          </div>
        </section>

        {/* GitHub Activity */}
        <section id="github">
          <SectionHeader
            title="ACTIVITY"
            subtitle="GitHub Contributions"
            center
          />
          <div className="glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col items-center overflow-x-auto">
            <GitHubCalendar
              username={portfolioData.github.username}
              colorScheme="dark"
              theme={{
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
            />
            <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mt-8 sm:mt-12 w-full">
              <img
                src={portfolioData.github.stats}
                alt="GitHub Stats"
                className="w-full rounded-xl"
              />
              <img
                src={portfolioData.github.languages}
                alt="Top Languages"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-4xl mx-auto">
          <SectionHeader
            title="CONTACT"
            subtitle="Let's Build Something"
            center
          />
          <div className="grid md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
            <div className="glass p-6 rounded-3xl text-center flex flex-col items-center gap-4 group hover:border-primary/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-orbitron text-xs text-white/40 uppercase tracking-widest mb-1">
                  Email
                </h4>
                <p className="text-sm font-mono">
                  {portfolioData.profile.email}
                </p>
              </div>
            </div>
            <div className="glass p-6 rounded-3xl text-center flex flex-col items-center gap-4 group hover:border-secondary/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <Linkedin size={24} />
              </div>
              <div>
                <h4 className="font-orbitron text-xs text-white/40 uppercase tracking-widest mb-1">
                  LinkedIn
                </h4>
                <p className="text-sm font-mono">/in/manishtiwari</p>
              </div>
            </div>
            <a
              href={
                portfolioData.socials.find((s) => s.platform === "WhatsApp")
                  ?.url
              }
              target="_blank"
              rel="noreferrer"
              className="glass p-6 rounded-3xl text-center flex flex-col items-center gap-4 group hover:border-green-500/30 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                <MessageCircle size={24} />
              </div>
              <div>
                <h4 className="font-orbitron text-xs text-white/40 uppercase tracking-widest mb-1">
                  WhatsApp
                </h4>
                <p className="text-sm font-mono">Chat with me</p>
              </div>
            </a>
          </div>
          <div className="glass p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full" />
            <form
              ref={formRef}
              className="space-y-8 relative z-10"
              onSubmit={handleSubmit}
            >
              <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-orbitron text-white/40 uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className={cn(
                  "w-full py-4 sm:py-5 font-orbitron font-black text-base sm:text-lg rounded-2xl transition-transform active:scale-95",
                  formStatus === "sending"
                    ? "bg-white/10 text-white/40 cursor-wait"
                    : "bg-primary text-bg shadow-[0_0_30px_rgba(0,255,65,0.3)] hover:scale-[1.02]",
                )}
              >
                {formStatus === "sending"
                  ? "TRANSMITTING..."
                  : "SEND TRANSMISSION"}
              </button>
              <AnimatePresence>
                {formStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-primary font-orbitron text-sm"
                  >
                    TRANSMISSION SUCCESSFUL
                  </motion.p>
                )}
                {formStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-red-400 font-orbitron text-sm"
                  >
                    TRANSMISSION FAILED — TRY AGAIN
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-white/5 text-center text-white/40 font-mono text-xs">
        <p>© {new Date().getFullYear()} MANISH TIWARI. ALL RIGHTS RESERVED.</p>
        <p className="mt-2 text-primary/40">
          BUILT WITH REACT, THREE.JS & NEON DREAMS
        </p>
      </footer>

      <Chatbot />

      <AnimatePresence>
        {isTerminalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-bg/80 backdrop-blur-sm">
            <Terminal onClose={() => setIsTerminalOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      <ScrollProgress />
    </div>
  );
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "SKILLS", href: "#skills" },
    { name: "JOURNEY", href: "#journey" },
    { name: "PROJECTS", href: "#projects" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a
          href="#home"
          className="font-orbitron text-2xl font-black tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-bg text-sm">
            MT
          </div>
          <span className="hidden sm:inline">MANISH.</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="font-orbitron text-[10px] font-bold tracking-[0.2em] text-white/60 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <ThemeToggler />
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2 -mr-2"
        >
          {mobileOpen ? <X size={24} /> : <TerminalIcon size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg/95 border-b border-white/10 overflow-hidden relative z-50"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-orbitron text-sm font-bold tracking-[0.2em] text-white"
                >
                  {link.name}
                </a>
              ))}
              <ThemeToggler />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProjectCard = ({ project, index }: { project: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.01}>
      <div className="glass rounded-2xl sm:rounded-3xl overflow-hidden group border border-white/5 hover:border-primary/30 transition-all duration-500">
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-primary/20 rounded-full text-primary hover:bg-primary hover:text-bg transition-all"
              >
                <Github size={24} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-secondary/20 rounded-full text-secondary hover:bg-secondary hover:text-bg transition-all"
              >
                <ExternalLink size={24} />
              </a>
            )}
            {!project.github && !project.demo && (
              <span className="text-white/40 font-orbitron text-xs uppercase tracking-widest">
                Internal Project
              </span>
            )}
          </div>
          {/* Metrics Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {project.metrics?.map((metric: any, idx: number) => (
              <div
                key={idx}
                className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg"
              >
                <p className="text-[8px] text-white/40 uppercase font-orbitron">
                  {metric.label}
                </p>
                <p className="text-xs font-bold text-primary">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 sm:p-8">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <span
              className={cn(
                "text-[10px] uppercase tracking-widest px-2 py-1 rounded border",
                project.type === "professional"
                  ? "border-primary/30 text-primary bg-primary/5"
                  : "border-secondary/30 text-secondary bg-secondary/5",
              )}
            >
              {project.type}
            </span>
          </div>
          <p className="text-white/60 text-sm mb-6 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string, j: number) => (
              <span
                key={j}
                className="text-[10px] font-mono text-white/40 px-2 py-1 bg-white/5 border border-white/10 rounded group-hover:border-primary/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Tilt>
  </motion.div>
);

const SectionHeader = ({
  title,
  subtitle,
  center = false,
}: {
  title: string;
  subtitle: string;
  center?: boolean;
}) => (
  <div className={cn("mb-10 sm:mb-16", center ? "text-center" : "")}>
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-primary font-mono text-xs tracking-[0.5em] uppercase mb-2 block"
    >
      {title}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-2xl sm:text-3xl md:text-5xl font-orbitron font-black tracking-tight"
    >
      {subtitle}
    </motion.h2>
    <div
      className={cn(
        "h-1 bg-gradient-to-r from-primary to-transparent mt-4",
        center ? "mx-auto w-24" : "w-20",
      )}
    />
  </div>
);

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setProgress((winScroll / height) * 100);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100]">
      <div
        className="h-full bg-primary shadow-[0_0_10px_#00FF41]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
