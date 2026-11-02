import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Brain,
  Server,
  Database,
  Monitor,
  Cloud,
  Microscope,
  Award,
} from "lucide-react";
import { profile } from "../data/profile";

const categoryIcons = {
  "AI & Machine Learning": Brain,
  "Backend & APIs": Server,
  "Data & Databases": Database,
  "Frontend & UI": Monitor,
  "Tools & Platforms": Cloud,
  "Certifications": Award,
};

const statBoxes = [
  { value: "5+", label: "Skill Categories", accent: true },
  { value: "25+", label: "Technologies & Frameworks", accent: false },
  { value: "1 Paper", label: "Published Research (JNRID)", accent: true },
];

const learningNext = [
  "Agentic AI Orchestration",
  "Multimodal VLMs (GeoChat)",
  "Remote Sensing with Copernicus",
  "Advanced ATS Semantic Matching",
];

export default function Skills() {
  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease-out-cubic" });
  }, []);

  const skillCategories = profile.skills
    ? Object.entries(profile.skills)
    : [];

  return (
    <section
      id="Skills"
      className="bg-[#0A0C12] dot-grid py-24 px-6 md:px-12 lg:px-20 min-h-screen border-t border-white/5"
    >
      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto mb-16">
        <p
          className="font-mono text-xs text-vivid-orange tracking-widest uppercase mb-3"
          data-aos="fade-up"
        >
          04 /
        </p>
        <h2
          className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
          data-aos="fade-up"
          data-aos-delay="60"
        >
          SKILLS &amp; TOOLS
        </h2>
        <p
          className="font-body text-gray-400 text-lg"
          data-aos="fade-up"
          data-aos-delay="120"
        >
          Technologies, frameworks and competencies I leverage daily
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* ── Top row: 3 stat boxes ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          {statBoxes.map((stat, idx) => (
            <div
              key={idx}
              className="border border-white/10 rounded-xl p-5 bg-[#121622] hover:border-electric-blue/40 transition-colors"
            >
              <p
                className={`font-display text-4xl font-bold mb-1 ${
                  stat.accent ? "text-electric-blue" : "text-white"
                }`}
              >
                {stat.value}
              </p>
              <p className="font-body text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Main grid: skill category cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {skillCategories.map(([category, skills], idx) => {
            const Icon = categoryIcons[category] ?? Brain;
            return (
              <div
                key={category}
                data-aos="fade-up"
                data-aos-delay={idx * 70}
                className="
                  bg-[#121622]
                  border border-white/10
                  rounded-2xl
                  p-6
                  hover:border-electric-blue/40
                  hover:shadow-xl hover:shadow-electric-blue/5
                  transition-all duration-300
                  cursor-default
                "
              >
                {/* Icon + category name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-electric-blue" />
                  </div>
                  <span className="font-display font-semibold text-white text-base leading-tight">
                    {category}
                  </span>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(skills) &&
                    skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="
                          font-mono text-[11px]
                          px-2.5 py-1
                          rounded-full
                          bg-white/[0.04]
                          border border-white/10
                          text-gray-300
                          hover:border-electric-blue/40
                          hover:text-white
                          hover:bg-electric-blue/10
                          transition-colors duration-200
                          cursor-default
                        "
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom: "What I'm learning next" bar ── */}
        <div
          className="bg-[#121622] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          data-aos="fade-up"
          data-aos-delay="60"
        >
          <p className="font-mono text-xs tracking-widest text-gray-400 uppercase flex-shrink-0">
            Currently Levelling Up
          </p>
          <div className="flex flex-wrap gap-2">
            {learningNext.map((item, idx) => (
              <span
                key={idx}
                className="
                  font-mono text-xs
                  px-3 py-1.5
                  rounded-full
                  bg-electric-blue/10
                  border border-electric-blue/20
                  text-electric-blue
                  cursor-default
                "
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
