import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Mail,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  ArrowUpRight,
  ArrowRight,
  Send,
} from "lucide-react";
import { profile } from "../data/profile";
import { supabase } from "../supabase";

const socialLinks = [
  {
    icon: Github,
    platform: "GitHub",
    handle: "@vaibhavpandey0002",
    href: profile.socials?.github || "https://github.com/vaibhavpandey0002",
  },
  {
    icon: Linkedin,
    platform: "LinkedIn",
    handle: "@vaibhav-kumar",
    href: profile.socials?.linkedin || "https://www.linkedin.com/in/vaibhav-kumar-314001331",
  },
  {
    icon: Instagram,
    platform: "Instagram",
    handle: "@vaibhavpandey000_2",
    href: profile.socials?.instagram || "https://www.instagram.com/vaibhavpandey000_2/",
  },
  {
    icon: Facebook,
    platform: "Facebook",
    handle: "Vaibhav Kumar",
    href: profile.socials?.facebook || "https://www.facebook.com/profile.php?id=100057732473231",
  },
  {
    icon: Mail,
    platform: "Email",
    handle: profile.email || "vaibhavpandey3103@gmail.com",
    href: `mailto:${profile.email || "vaibhavpandey3103@gmail.com"}`,
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease-out-cubic" });
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { error } = await supabase.from("messages").insert([
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email || "vaibhavpandey3103@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass =
    "w-full block mt-1 bg-[#121622] border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue/40 transition-all duration-150";

  return (
    <section
      id="Contact"
      className="bg-[#0A0C12] dot-grid text-white min-h-screen py-24 px-6 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16" data-aos="fade-up">
          <span className="font-mono text-[11px] tracking-[0.25em] text-vivid-orange uppercase">
            07 /
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2 mb-3">
            CONTACT
          </h2>
          <p className="font-body text-gray-400 text-base">
            Let&apos;s build something together
          </p>
          <div className="mt-6 h-px w-16 bg-electric-blue" />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
          {/* ── LEFT: Contact form ── */}
          <div data-aos="fade-right" data-aos-delay="100">
            <h3 className="font-display text-xl font-semibold text-white mb-6">
              Send a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="font-body text-sm font-medium text-gray-300 mb-1 block">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-body text-sm font-medium text-gray-300 mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              {/* Subject */}
              <div>
                <label className="font-body text-sm font-medium text-gray-300 mb-1 block">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div>
                <label className="font-body text-sm font-medium text-gray-300 mb-1 block">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell me about your project or opportunity..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 bg-electric-blue hover:bg-electric-blue-light text-white font-body font-medium text-sm py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-electric-blue/20 hover:shadow-electric-blue/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>

              {/* Status feedback */}
              {status === "success" && (
                <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm font-body text-green-400">
                  Message sent successfully! I will get back to you shortly.
                </div>
              )}
              {status === "error" && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-body text-red-400">
                  Something went wrong. Please reach out directly via{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="underline font-mono"
                  >
                    {profile.email}
                  </a>
                  .
                </div>
              )}
            </form>
          </div>

          {/* ── RIGHT: Contact info ── */}
          <div
            className="flex flex-col justify-between gap-8"
            data-aos="fade-left"
            data-aos-delay="150"
          >
            {/* Contact info cards */}
            <div className="space-y-3">
              {/* Email card */}
              <div
                className="group flex items-center gap-4 rounded-xl border border-white/10 p-5 cursor-pointer transition-all duration-150 hover:border-electric-blue/40 bg-[#121622]"
                onClick={handleCopyEmail}
                title="Click to copy email"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-electric-blue/10 border border-electric-blue/20">
                  <Mail size={18} className="text-electric-blue" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-0.5">
                    Email
                  </p>
                  <p className="font-body text-sm text-white truncate">
                    {profile.email || "vaibhavpandey3103@gmail.com"}
                  </p>
                </div>
                <span className="font-mono text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {copied ? "Copied!" : "Click to copy"}
                </span>
              </div>

              {/* Location card */}
              <div
                className="flex items-center gap-4 rounded-xl border border-white/10 p-5 bg-[#121622]"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-electric-blue/10 border border-electric-blue/20">
                  <MapPin size={18} className="text-electric-blue" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-0.5">
                    Location
                  </p>
                  <p className="font-body text-sm text-white">
                    {profile.location || "Bhopal, MP, India"}
                  </p>
                </div>
              </div>

              {/* Availability card */}
              <div
                className="flex items-center gap-4 rounded-xl border border-white/10 p-5 bg-[#121622]"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-electric-blue/10 border border-electric-blue/20">
                  <Calendar size={18} className="text-electric-blue" strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-0.5">
                    Availability
                  </p>
                  <p className="font-body text-sm text-white">
                    Open to internships &amp; entry-level roles
                  </p>
                </div>
                <span
                  className="flex-shrink-0 font-mono text-[10px] px-2.5 py-1 rounded-full text-vivid-orange bg-vivid-orange/10 border border-vivid-orange/20"
                >
                  Available
                </span>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h4 className="font-display font-semibold text-white text-lg mb-4">
                Find me online
              </h4>
              <div className="space-y-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.platform}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group rounded-xl px-3 py-2.5 transition-all duration-150 hover:bg-white/5"
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.8}
                        className="text-gray-400 group-hover:text-electric-blue transition-colors flex-shrink-0"
                      />
                      <span className="font-body text-sm font-medium text-gray-300 group-hover:text-white transition-colors flex-1">
                        {social.platform}
                      </span>
                      <span className="font-mono text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                        {social.handle}
                      </span>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={2}
                        className="text-gray-500 group-hover:text-electric-blue opacity-0 group-hover:opacity-100 transition-all"
                      />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Engineering philosophy box */}
            <div className="bg-[#121622] border border-white/10 rounded-2xl p-6 mt-auto">
              <span
                className="font-display text-3xl font-bold leading-none"
                style={{ color: "#0057FF" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="font-body text-sm text-gray-300 italic leading-relaxed mt-1">
                {profile.philosophy}
              </p>
              <div className="mt-5 pt-4 border-t border-white/8 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-electric-blue/20 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-electric-blue font-bold">
                    VK
                  </span>
                </div>
                <div>
                  <p className="font-display text-white text-xs font-semibold">
                    {profile.name}
                  </p>
                  <p className="font-mono text-[10px] text-gray-400">
                    {profile.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
