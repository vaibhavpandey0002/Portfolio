import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { GraduationCap, Trophy, Code2 } from "lucide-react";
import { profile } from "../data/profile";

const typeConfig = {
  education: {
    icon: GraduationCap,
    label: "Education",
  },
  hackathon: {
    icon: Trophy,
    label: "Hackathon",
  },
  project: {
    icon: Code2,
    label: "Project",
  },
};

export default function Experience() {
  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease-out-cubic" });
  }, []);

  const experiences = profile.experience || [];

  return (
    <section
      id="Experience"
      className="bg-charcoal text-white min-h-screen py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="mb-16" data-aos="fade-up">
          <span className="font-mono text-[11px] tracking-[0.25em] text-gray-500 uppercase">
            05 /
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2 mb-3">
            EXPERIENCE
          </h2>
          <p className="font-body text-gray-400 text-base">
            Education, projects &amp; milestones
          </p>
          {/* Decorative line */}
          <div className="mt-6 h-px w-16 bg-electric-blue" />
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-0">
          {experiences.map((item, index) => {
            const isLast = index === experiences.length - 1;
            const config = typeConfig[item.type] || typeConfig.project;
            const Icon = config.icon;

            return (
              <div
                key={index}
                className="flex gap-0"
                data-aos="fade-right"
                data-aos-delay={index * 100}
              >
                {/* Left: Timeline indicator */}
                <div className="flex flex-col items-center" style={{ width: 56 }}>
                  {/* Icon box */}
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-charcoal-2 border border-white/10 rounded-lg p-2.5 text-electric-blue">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  {/* Vertical connector */}
                  {!isLast && (
                    <div className="flex-1 w-px bg-white/8 mt-2 mb-2 min-h-8" />
                  )}
                </div>

                {/* Right: Content card */}
                <div
                  className={`ml-6 bg-charcoal-2 border border-white/8 rounded-2xl p-6 flex-1 transition-all duration-200 hover:border-white/15 hover:-translate-y-px ${
                    isLast ? "mb-0" : "mb-6"
                  }`}
                >
                  {/* Period */}
                  <p className="font-mono text-[11px] tracking-widest text-gray-600 uppercase mb-2">
                    {item.period}
                  </p>

                  {/* Title */}
                  <h3 className="font-display text-white text-lg font-semibold leading-snug">
                    {item.title}
                  </h3>

                  {/* Org */}
                  {item.org && (
                    <p className="font-mono text-electric-blue text-sm mt-1">
                      {item.org}
                    </p>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="font-body text-gray-400 text-sm leading-relaxed mt-3">
                      {item.description}
                    </p>
                  )}

                  {/* Highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.highlights.map((tag, ti) => (
                        <span
                          key={ti}
                          className="text-xs font-mono px-2.5 py-1 rounded-full border text-vivid-orange"
                          style={{
                            backgroundColor: "rgba(255,85,0,0.08)",
                            borderColor: "rgba(255,85,0,0.15)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* What's Next card */}
        <div
          className="mt-16 bg-charcoal-2 rounded-2xl p-8"
          style={{ border: "1px solid rgba(0,87,255,0.2)" }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <p className="font-mono text-[11px] tracking-widest text-electric-blue uppercase mb-4">
            What&apos;s next /
          </p>
          <p className="font-display text-white text-xl md:text-2xl font-semibold leading-snug mb-8">
            Currently seeking internships and entry-level AI/ML engineering
            roles.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={profile.resumeUrl || profile.resume || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-electric-blue text-white font-body font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
            >
              View Resume
            </a>
            <a
              href="#Contact"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-body font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:border-white/40 hover:-translate-y-px"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
