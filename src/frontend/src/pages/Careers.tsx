import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import RippleButton from "@/components/ui/RippleButton";
import type { CareerOpening } from "@/types";
import {
  BookOpen,
  Briefcase,
  ChevronRight,
  Clock,
  Heart,
  Lightbulb,
  MapPin,
  Rocket,
  Send,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const openings: CareerOpening[] = [
  {
    id: 1,
    title: "Commerce Faculty — Accountancy",
    department: "Academic",
    type: "Full-time",
    location: "Bhopal (On-site)",
    description:
      "Deliver engaging live and recorded Accountancy sessions for Class 11–12 and CA Foundation. Proven track record required.",
  },
  {
    id: 2,
    title: "Economics Educator",
    department: "Academic",
    type: "Part-time / Remote",
    location: "Remote",
    description:
      "Create video lectures and study notes for Economics. Proficiency in CBSE and competitive exam syllabi needed.",
  },
  {
    id: 3,
    title: "Full-stack Developer",
    department: "Technology",
    type: "Full-time",
    location: "Bhopal / Remote",
    description:
      "Build and maintain the Arthashastra learning platform. Experience with React, TypeScript, and modern backend technologies.",
  },
  {
    id: 4,
    title: "Content & SEO Writer",
    department: "Marketing",
    type: "Part-time / Freelance",
    location: "Remote",
    description:
      "Write compelling blog posts, study tips, and SEO-optimized articles. Commerce background is a plus.",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    desc: "We build education experiences that feel more like a product launch than a textbook. Your ideas shape what we ship.",
    color: "cyan" as const,
  },
  {
    icon: Heart,
    title: "Impact-Driven Work",
    desc: "Every line of code, every lecture, every article directly affects thousands of students across India.",
    color: "violet" as const,
  },
  {
    icon: Rocket,
    title: "Fast-Track Growth",
    desc: "Grow at startup speed. Take ownership early, ship fast, and build skills that compound year over year.",
    color: "magenta" as const,
  },
];

const perks = [
  {
    icon: Users,
    label: "Collaborative team",
    sub: "Flat hierarchy, everyone's voice matters",
  },
  {
    icon: BookOpen,
    label: "Learning budget",
    sub: "Annual allowance for courses & books",
  },
  {
    icon: Clock,
    label: "Flexible hours",
    sub: "Remote-first culture, async by default",
  },
  {
    icon: Rocket,
    label: "Equity upside",
    sub: "Early joiners share in our growth",
  },
];

interface ApplicationForm {
  name: string;
  email: string;
  role: string;
  resumeLink: string;
  message: string;
}

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationForm>();

  const onSubmit = async (data: ApplicationForm) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log("Application submitted:", data);
    toast.success("Application received! We'll be in touch.", {
      description: "Our team reviews applications within 3–5 business days.",
    });
    reset();
    setSelectedJob(null);
  };

  const deptColors: Record<string, string> = {
    Academic: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    Technology: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    Marketing: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
  };

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero */}
      <section className="py-24 relative" data-ocid="careers.hero.section">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-600/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 block">
              Join Our Team
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold text-foreground mb-6">
              Build the{" "}
              <span className="gradient-text-cyan-violet">Future</span> of
              Education
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're looking for passionate educators, developers, and creators
              who believe education can be cinematic, immersive, and truly
              transformational.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values section */}
      <section
        className="py-16 bg-muted/10 border-y border-white/5"
        data-ocid="careers.values.section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="text-violet-400 text-xs font-bold uppercase tracking-widest mb-3 block">
              Why Work With Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground">
              A team that{" "}
              <span className="gradient-text-cyan-violet">
                thinks differently
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.12}>
                <GlowCard
                  glowColor={v.color}
                  className="p-6 h-full"
                  data-ocid={`careers.values.item.${i + 1}`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                      v.color === "cyan"
                        ? "bg-cyan-500/10 text-cyan-400"
                        : v.color === "violet"
                          ? "bg-violet-500/10 text-violet-400"
                          : "bg-fuchsia-500/10 text-fuchsia-400"
                    }`}
                  >
                    <v.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>

          {/* Perks grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {perks.map((p, i) => (
              <AnimatedSection key={p.label} delay={0.36 + i * 0.08}>
                <div className="glass-morphism rounded-xl border border-white/10 p-4 text-center">
                  <p.icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-foreground mb-0.5">
                    {p.label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {p.sub}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section
        className="py-16 bg-background"
        data-ocid="careers.openings.section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="font-display text-3xl font-extrabold text-foreground">
              Open Positions
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {openings.length} role{openings.length !== 1 ? "s" : ""} currently
              open
            </p>
          </AnimatedSection>

          {openings.length === 0 ? (
            <div
              className="text-center py-20"
              data-ocid="careers.openings.empty_state"
            >
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No openings right now. Check back soon!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {openings.map((job, i) => (
                <AnimatedSection key={job.id} delay={i * 0.08}>
                  <GlowCard
                    className="p-6"
                    data-ocid={`careers.openings.item.${i + 1}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-display font-bold text-lg text-foreground">
                            {job.title}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${
                              deptColors[job.department] ??
                              "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
                            }`}
                          >
                            {job.department}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-cyan-400" />{" "}
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-cyan-400" />{" "}
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedJob(job.title)}
                        className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-500/30 text-cyan-400 font-semibold text-sm hover:from-cyan-500 hover:to-violet-600 hover:text-white hover:border-transparent transition-smooth"
                        data-ocid={`careers.apply.button.${i + 1}`}
                      >
                        Apply Now <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </GlowCard>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application form */}
      {selectedJob && (
        <section
          className="py-16 bg-muted/10 border-t border-white/5"
          data-ocid="careers.application.section"
        >
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="glass-morphism rounded-2xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Apply for
                    </h2>
                    <p className="text-cyan-400 font-semibold mt-0.5">
                      {selectedJob}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="w-8 h-8 rounded-lg glass-morphism border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth text-sm"
                    aria-label="Close form"
                    data-ocid="careers.close_form.button"
                  >
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <label
                      className="block text-sm font-medium text-foreground mb-2"
                      htmlFor="car-name"
                    >
                      Full Name
                    </label>
                    <input
                      id="car-name"
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/50 transition-smooth"
                      data-ocid="careers.name.input"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p
                        className="text-xs text-red-400 mt-1"
                        data-ocid="careers.name.field_error"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="block text-sm font-medium text-foreground mb-2"
                      htmlFor="car-email"
                    >
                      Email
                    </label>
                    <input
                      id="car-email"
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/50 transition-smooth"
                      data-ocid="careers.email.input"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email",
                        },
                      })}
                    />
                    {errors.email && (
                      <p
                        className="text-xs text-red-400 mt-1"
                        data-ocid="careers.email.field_error"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Role dropdown */}
                  <div>
                    <label
                      className="block text-sm font-medium text-foreground mb-2"
                      htmlFor="car-role"
                    >
                      Role Applying For
                    </label>
                    <select
                      id="car-role"
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm focus:outline-none focus:border-cyan-400/50 transition-smooth appearance-none"
                      data-ocid="careers.role.select"
                      defaultValue={selectedJob}
                      {...register("role", {
                        required: "Please select a role",
                      })}
                    >
                      {openings.map((o) => (
                        <option key={o.id} value={o.title}>
                          {o.title}
                        </option>
                      ))}
                    </select>
                    {errors.role && (
                      <p
                        className="text-xs text-red-400 mt-1"
                        data-ocid="careers.role.field_error"
                      >
                        {errors.role.message}
                      </p>
                    )}
                  </div>

                  {/* Resume link */}
                  <div>
                    <label
                      className="block text-sm font-medium text-foreground mb-2"
                      htmlFor="car-resume"
                    >
                      Resume / Portfolio Link
                    </label>
                    <input
                      id="car-resume"
                      type="url"
                      placeholder="https://drive.google.com/..."
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/50 transition-smooth"
                      data-ocid="careers.resume.input"
                      {...register("resumeLink", {
                        required: "Please provide a resume link",
                      })}
                    />
                    {errors.resumeLink && (
                      <p
                        className="text-xs text-red-400 mt-1"
                        data-ocid="careers.resume.field_error"
                      >
                        {errors.resumeLink.message}
                      </p>
                    )}
                  </div>

                  {/* Cover letter */}
                  <div>
                    <label
                      className="block text-sm font-medium text-foreground mb-2"
                      htmlFor="car-message"
                    >
                      Cover Letter
                    </label>
                    <textarea
                      id="car-message"
                      rows={4}
                      placeholder="Why do you want to join Arthashastra Classes? What makes you the right fit?"
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/50 transition-smooth resize-none"
                      data-ocid="careers.message.textarea"
                      {...register("message", {
                        required: "Please add a cover letter",
                      })}
                    />
                    {errors.message && (
                      <p
                        className="text-xs text-red-400 mt-1"
                        data-ocid="careers.message.field_error"
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="flex-1 py-3 rounded-xl glass-morphism border border-white/10 text-muted-foreground text-sm font-medium hover:text-foreground transition-smooth"
                      data-ocid="careers.cancel_button"
                    >
                      Cancel
                    </button>
                    <RippleButton
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm shadow-[0_0_20px_oklch(0.68_0.24_200/0.3)] hover:shadow-[0_0_30px_oklch(0.68_0.24_200/0.5)] transition-smooth flex items-center justify-center gap-2 disabled:opacity-50"
                      disabled={isSubmitting}
                      data-ocid="careers.submit_button"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">Submitting…</span>
                      ) : (
                        <>
                          Submit Application <Send className="w-4 h-4" />
                        </>
                      )}
                    </RippleButton>
                  </div>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}
    </div>
  );
}
