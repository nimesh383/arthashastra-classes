import AnimatedSection from "@/components/ui/AnimatedSection";
import GlowCard from "@/components/ui/GlowCard";
import RippleButton from "@/components/ui/RippleButton";
import type { EnquiryInput } from "@/types";
import { Clock, ExternalLink, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { FaLinkedinIn } from "react-icons/fa";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { toast } from "sonner";

// ─── Data ─────────────────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Arthashastra Classes, MP Nagar Zone-I, Bhopal, MP 462011",
    color: "cyan" as const,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    color: "violet" as const,
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@arthashastraclasses.com",
    href: "mailto:info@arthashastraclasses.com",
    color: "magenta" as const,
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Sat: 9:00 AM – 7:00 PM",
    color: "cyan" as const,
  },
];

const socialLinks = [
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://linkedin.com",
    color: "text-cyan-400",
    border: "border-cyan-400/30 hover:border-cyan-400",
    bg: "hover:bg-cyan-400/10",
  },
  {
    icon: SiX,
    label: "Twitter / X",
    href: "https://twitter.com",
    color: "text-violet-400",
    border: "border-violet-400/30 hover:border-violet-400",
    bg: "hover:bg-violet-400/10",
  },
  {
    icon: SiInstagram,
    label: "Instagram",
    href: "https://instagram.com",
    color: "text-fuchsia-400",
    border: "border-fuchsia-400/30 hover:border-fuchsia-400",
    bg: "hover:bg-fuchsia-400/10",
  },
  {
    icon: SiYoutube,
    label: "YouTube",
    href: "https://youtube.com",
    color: "text-cyan-300",
    border: "border-cyan-300/30 hover:border-cyan-300",
    bg: "hover:bg-cyan-300/10",
  },
];

const courses = [
  "Class 11 Commerce",
  "Class 12 Commerce",
  "CA Foundation",
  "Economics Honours",
  "Business Studies",
  "Accountancy Advanced",
  "Other / General Enquiry",
];

// ─── Extended form type ────────────────────────────────────────────────────────

interface ContactFormInput extends EnquiryInput {
  course: string;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    defaultValues: { course: "" },
  });

  const onSubmit = async (data: ContactFormInput) => {
    try {
      await new Promise<void>((r) => setTimeout(r, 900));
      console.log("Enquiry submitted:", data);
      toast.success("Enquiry sent! We'll reach out within 24 hours.", {
        duration: 5000,
        description: `Thanks, ${data.name}! Our team will call you shortly.`,
      });
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.", {
        duration: 4000,
      });
    }
  };

  return (
    <div className="pt-16 overflow-hidden">
      {/* ── HERO ── */}
      <section
        className="relative py-20 overflow-hidden"
        data-ocid="contact.hero.section"
      >
        {/* BG layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-background to-fuchsia-600/8 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,oklch(0.60_0.25_290/0.06),transparent)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.68 0.24 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.24 200) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: "oklch(0.60 0.25 290 / 0.12)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: "oklch(0.68 0.24 200 / 0.10)" }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-5 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5">
              Get In Touch
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              Let's <span className="gradient-text-cyan-violet">Connect</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Ready to start your commerce mastery journey? Ask us anything —
              courses, admissions, schedules, or just say hello.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT GRID ── */}
      <section
        className="py-8 pb-24 bg-background"
        data-ocid="contact.main.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* ─ LEFT: Contact info + map + social ─ */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <AnimatedSection direction="left">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Reach Out Directly
                </h2>

                {/* Info cards */}
                <div className="flex flex-col gap-4">
                  {contactInfo.map((item) => (
                    <GlowCard
                      key={item.label}
                      glowColor={item.color}
                      className="p-5"
                      data-ocid={`contact.info.${item.label.toLowerCase()}_card`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            item.color === "cyan"
                              ? "bg-cyan-500/10 text-cyan-400"
                              : item.color === "violet"
                                ? "bg-violet-500/10 text-violet-400"
                                : "bg-fuchsia-500/10 text-fuchsia-400"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="font-medium text-sm break-all hover:underline transition-colors text-violet-400"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-foreground text-sm">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </GlowCard>
                  ))}
                </div>
              </AnimatedSection>

              {/* Map */}
              <AnimatedSection direction="left" delay={0.15}>
                <div
                  className="relative rounded-2xl overflow-hidden border border-cyan-400/20 shadow-[0_0_30px_oklch(0.68_0.24_200/0.12)]"
                  data-ocid="contact.map.section"
                >
                  {/* Neon corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg z-10 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg z-10 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-violet-400 rounded-bl-lg z-10 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-violet-400 rounded-br-lg z-10 pointer-events-none" />

                  <iframe
                    title="Arthashastra Classes — Bhopal Location"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=77.38,23.24,77.44,23.28&layer=mapnik"
                    width="100%"
                    height="240"
                    style={{
                      border: 0,
                      filter: "invert(90%) hue-rotate(180deg) saturate(0.8)",
                      display: "block",
                    }}
                    loading="lazy"
                  />

                  {/* Open in maps link */}
                  <a
                    href="https://www.openstreetmap.org/?mlat=23.26&mlon=77.41#map=14/23.26/77.41"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-card/90 backdrop-blur border-t border-white/5 text-xs text-muted-foreground hover:text-cyan-400 transition-colors group"
                    data-ocid="contact.map.open_link"
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="flex-1">MP Nagar Zone-I, Bhopal, MP</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </AnimatedSection>

              {/* Social links */}
              <AnimatedSection direction="left" delay={0.2}>
                <div data-ocid="contact.social.section">
                  <p className="text-sm text-muted-foreground mb-4 font-medium">
                    Follow us on social media
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`w-11 h-11 rounded-xl glass-morphism border flex items-center justify-center transition-smooth ${social.color} ${social.border} ${social.bg}`}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        data-ocid={`contact.social.${social.label.toLowerCase().replace(/\s.*/, "")}_link`}
                      >
                        <social.icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* ─ RIGHT: Enquiry form ─ */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="right">
                <GlowCard glowColor="violet" className="p-8 md:p-10">
                  <div className="mb-8">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                      Send an Enquiry
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Fill in the form and our counselor will get back to you
                      within 24 hours.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                    noValidate
                    data-ocid="contact.enquiry.form"
                  >
                    {/* Row: Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          className="block text-sm font-medium text-foreground mb-2"
                          htmlFor="contact-name"
                        >
                          Full Name{" "}
                          <span className="text-cyan-400" aria-hidden>
                            *
                          </span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="Rahul Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-smooth"
                          data-ocid="contact.name.input"
                          {...register("name", {
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters",
                            },
                          })}
                        />
                        {errors.name && (
                          <p
                            className="text-xs text-red-400 mt-1.5 flex items-center gap-1"
                            data-ocid="contact.name.field_error"
                            role="alert"
                          >
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium text-foreground mb-2"
                          htmlFor="contact-phone"
                        >
                          Phone{" "}
                          <span className="text-cyan-400" aria-hidden>
                            *
                          </span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-smooth"
                          data-ocid="contact.phone.input"
                          {...register("phone", {
                            required: "Phone number is required",
                            minLength: {
                              value: 10,
                              message: "Enter a valid phone number",
                            },
                          })}
                        />
                        {errors.phone && (
                          <p
                            className="text-xs text-red-400 mt-1.5"
                            data-ocid="contact.phone.field_error"
                            role="alert"
                          >
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        className="block text-sm font-medium text-foreground mb-2"
                        htmlFor="contact-email"
                      >
                        Email Address{" "}
                        <span className="text-cyan-400" aria-hidden>
                          *
                        </span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="rahul@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-smooth"
                        data-ocid="contact.email.input"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p
                          className="text-xs text-red-400 mt-1.5"
                          data-ocid="contact.email.field_error"
                          role="alert"
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Course dropdown */}
                    <div>
                      <label
                        className="block text-sm font-medium text-foreground mb-2"
                        htmlFor="contact-course"
                      >
                        Course of Interest
                      </label>
                      <select
                        id="contact-course"
                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-smooth appearance-none cursor-pointer"
                        data-ocid="contact.course.select"
                        {...register("course")}
                      >
                        <option
                          value=""
                          className="bg-card text-muted-foreground"
                        >
                          Select a course...
                        </option>
                        {courses.map((c) => (
                          <option key={c} value={c} className="bg-card">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        className="block text-sm font-medium text-foreground mb-2"
                        htmlFor="contact-message"
                      >
                        Your Message{" "}
                        <span className="text-cyan-400" aria-hidden>
                          *
                        </span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Tell us about your goals, questions, or anything you'd like to know..."
                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-smooth resize-none"
                        data-ocid="contact.message.textarea"
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters",
                          },
                        })}
                      />
                      {errors.message && (
                        <p
                          className="text-xs text-red-400 mt-1.5"
                          data-ocid="contact.message.field_error"
                          role="alert"
                        >
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Privacy note */}
                    <p className="text-xs text-muted-foreground">
                      By submitting, you agree to be contacted by our counseling
                      team. We respect your privacy and never share your data.
                    </p>

                    {/* Submit */}
                    <RippleButton
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-base shadow-lg hover:shadow-[0_0_30px_oklch(0.68_0.24_200/0.5)] transition-smooth flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                      data-ocid="contact.submit_button"
                    >
                      {isSubmitting ? (
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 1.2,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                          className="flex items-center gap-2"
                          data-ocid="contact.loading_state"
                        >
                          <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          Sending...
                        </motion.span>
                      ) : (
                        <>
                          Send Enquiry{" "}
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </RippleButton>
                  </form>
                </GlowCard>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ TEASER ── */}
      <section
        className="py-16 bg-muted/10 border-t border-white/5"
        data-ocid="contact.faq.section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-display text-3xl font-extrabold text-foreground mb-3">
              Quick <span className="gradient-text-cyan-violet">Answers</span>
            </h2>
            <p className="text-muted-foreground">
              Common questions before you reach out.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                q: "How do I enroll in a course?",
                a: "Fill out the enquiry form above or call us directly. Our counselor will guide you through the enrollment process.",
              },
              {
                q: "Do you offer online classes?",
                a: "Yes! We offer both offline classes in Bhopal and live online sessions accessible from anywhere in India.",
              },
              {
                q: "What courses are available?",
                a: "We cover Class 11 & 12 Commerce, CA Foundation, Accountancy, Business Studies, Economics, and more.",
              },
              {
                q: "Is there a free demo class?",
                a: "Absolutely. Register your interest and we'll schedule a complimentary demo class within 48 hours.",
              },
            ].map((faq, i) => (
              <AnimatedSection key={faq.q} delay={i * 0.08}>
                <GlowCard
                  glowColor={i % 2 === 0 ? "cyan" : "violet"}
                  className="p-6 h-full"
                  data-ocid={`contact.faq.item.${i + 1}`}
                >
                  <p className="font-display font-bold text-foreground text-sm mb-2">
                    {faq.q}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </GlowCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
