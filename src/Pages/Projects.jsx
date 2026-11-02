import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { projects } from "../data/profile";
import { generateSlug } from "../utils/slug";

/* ─────────────────────────────────────────────
   Helper: status badge
───────────────────────────────────────────── */
function StatusBadge({ status }) {
  if (!status) return null;
  const isActive =
    typeof status === "string" && status.toLowerCase() === "active";
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-mono">
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-green-400 animate-pulse" : "bg-gray-500"
        }`}
      />
      <span className={isActive ? "text-green-400" : "text-gray-500"}>
        {status}
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   Helper: tech pill
───────────────────────────────────────────── */
function TechPill({ tech }) {
  return (
    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono border border-white/10 text-gray-400 bg-white/[0.03] group-hover:border-white/20 transition-colors">
      {tech}
    </span>
  );
}

/* ─────────────────────────────────────────────
   FEATURED card  (projects[0])
───────────────────────────────────────────── */
function FeaturedCard({ project, index, onClick }) {
  const slug = generateSlug(project.Title);
  const techList = (project.TechStack || project.Technologies || project.Tech || []).slice(0, 5);
  const desc =
    project.Description || project.Tagline || project.Subtitle || "";
  const descLines = desc.split(". ").slice(0, 2).join(". ");

  return (
    <div
      data-aos="fade-right"
      data-aos-delay="100"
      onClick={() => onClick(slug)}
      className="bg-[#121622] border border-white/10 rounded-2xl p-8 hover:border-electric-blue/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[380px] hover:shadow-2xl hover:shadow-electric-blue/5"
    >
      {/* top row */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gray-500">
            0{index + 1}
          </span>
          <span className="inline-block px-2.5 py-0.5 text-xs font-mono font-semibold text-vivid-orange bg-vivid-orange/10 border border-vivid-orange/30 rounded-full">
            FEATURED
          </span>
        </div>
        <span className="font-mono text-xs text-gray-500">
          {project.Year || ""}
        </span>
      </div>

      {/* title */}
      <div className="mb-4">
        <h2 className="font-display text-white text-3xl lg:text-4xl font-bold leading-tight mb-2 group-hover:text-electric-blue transition-colors duration-200">
          {project.Title}
        </h2>
        {project.Subtitle && (
          <p className="text-gray-400 text-sm font-body">{project.Subtitle}</p>
        )}
      </div>

      {/* description excerpt */}
      {descLines && (
        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 font-body">
          {descLines}
        </p>
      )}

      {/* tech pills */}
      {techList.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {techList.map((t) => (
            <TechPill key={t} tech={t} />
          ))}
        </div>
      )}

      {/* footer row */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <StatusBadge status={project.Status} />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(slug);
          }}
          className="text-sm text-electric-blue font-mono hover:underline flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
        >
          View Case Study →
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Medium dark card  (projects[1], projects[4])
───────────────────────────────────────────── */
function DarkCard({ project, index, onClick, aosDelay = 0 }) {
  const slug = generateSlug(project.Title);
  const techList = (project.TechStack || project.Technologies || project.Tech || []).slice(0, 4);
  const desc =
    project.Description || project.Tagline || project.Subtitle || "";

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={aosDelay}
      onClick={() => onClick(slug)}
      className="bg-[#121622] border border-white/10 rounded-2xl p-6 hover:border-electric-blue/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full hover:shadow-xl hover:shadow-electric-blue/5"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-gray-500">
            0{index + 1}
          </span>
          <span className="font-mono text-xs text-gray-500">
            {project.Year || ""}
          </span>
        </div>
        <h3 className="font-display text-white text-xl font-bold mb-2 group-hover:text-electric-blue transition-colors duration-200">
          {project.Title}
        </h3>
        {desc && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4 font-body">
            {desc}
          </p>
        )}
        {techList.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techList.map((t) => (
              <TechPill key={t} tech={t} />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-electric-blue text-sm font-mono">→</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Medium card  (projects[2], projects[3])
───────────────────────────────────────────── */
function LightCard({ project, index, onClick, aosDelay = 0 }) {
  const slug = generateSlug(project.Title);
  const techList = (project.TechStack || project.Technologies || project.Tech || []).slice(0, 4);
  const desc =
    project.Description || project.Tagline || project.Subtitle || "";

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={aosDelay}
      onClick={() => onClick(slug)}
      className="bg-[#121622] border border-white/10 rounded-2xl p-6 hover:border-electric-blue/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full hover:shadow-xl hover:shadow-electric-blue/5"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-gray-500">
            0{index + 1}
          </span>
          <span className="font-mono text-xs text-gray-500">
            {project.Year || ""}
          </span>
        </div>
        <h3 className="font-display text-white text-xl font-bold mb-2 group-hover:text-electric-blue transition-colors duration-200">
          {project.Title}
        </h3>
        {desc && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4 font-body">
            {desc}
          </p>
        )}
        {techList.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techList.map((t) => (
              <TechPill key={t} tech={t} />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-electric-blue text-sm font-mono">→</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Wide thin card  (projects[5])
───────────────────────────────────────────── */
function WideCard({ project, index, onClick }) {
  const slug = generateSlug(project.Title);
  const techList = (project.TechStack || project.Technologies || project.Tech || []).slice(0, 4);
  const desc =
    project.Description || project.Tagline || project.Subtitle || "";

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="500"
      onClick={() => onClick(slug)}
      className="bg-[#121622] border border-white/10 rounded-2xl p-6 hover:border-electric-blue/40 transition-all duration-300 group cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* left */}
        <div className="flex items-center gap-4 min-w-0">
          <span className="font-mono text-xs text-gray-500 shrink-0">
            0{index + 1}
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-white text-lg font-bold truncate group-hover:text-electric-blue transition-colors duration-200">
              {project.Title}
            </h3>
            {desc && (
              <p className="text-gray-400 text-sm truncate font-body">{desc}</p>
            )}
          </div>
        </div>

        {/* center — tech pills */}
        {techList.length > 0 && (
          <div className="hidden md:flex flex-wrap gap-1.5 shrink-0">
            {techList.map((t) => (
              <TechPill key={t} tech={t} />
            ))}
          </div>
        )}

        {/* right */}
        <div className="flex items-center gap-4 shrink-0">
          {project.Year && (
            <span className="font-mono text-xs text-gray-500">
              {project.Year}
            </span>
          )}
          <span className="text-electric-blue text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Projects page
───────────────────────────────────────────── */
export default function Projects() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease-out-cubic" });
  }, []);

  const handleNavigate = (slug) => {
    navigate(`/project/${slug}`);
  };

  /* safe guards — ensure we always have enough items */
  const p = projects || [];

  return (
    <section
      id="Projects"
      className="bg-[#0A0C12] dot-grid min-h-screen py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <div className="mb-16" data-aos="fade-up" data-aos-delay="0">
          <p className="font-mono text-xs text-vivid-orange tracking-widest uppercase mb-3">
            02 /
          </p>
          <h1 className="font-display text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-4">
            PROJECTS
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl font-body">
            Selected work in AI, ML &amp; full-stack engineering
          </p>
        </div>

        {/* ── Asymmetric 12-column grid ── */}
        <div className="grid grid-cols-12 gap-5">

          {/* ── ROW 1 ── */}

          {/* projects[0] — Featured large card */}
          {p[0] && (
            <div className="col-span-12 lg:col-span-8">
              <FeaturedCard
                project={p[0]}
                index={0}
                onClick={handleNavigate}
              />
            </div>
          )}

          {/* projects[1] — Medium dark card */}
          {p[1] && (
            <div className="col-span-12 lg:col-span-4">
              <DarkCard
                project={p[1]}
                index={1}
                onClick={handleNavigate}
                aosDelay={150}
              />
            </div>
          )}

          {/* ── ROW 2 ── */}

          {/* projects[2] — Medium card */}
          {p[2] && (
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <LightCard
                project={p[2]}
                index={2}
                onClick={handleNavigate}
                aosDelay={200}
              />
            </div>
          )}

          {/* projects[3] — Medium card */}
          {p[3] && (
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <LightCard
                project={p[3]}
                index={3}
                onClick={handleNavigate}
                aosDelay={300}
              />
            </div>
          )}

          {/* projects[4] — Medium dark card */}
          {p[4] && (
            <div className="col-span-12 lg:col-span-4">
              <DarkCard
                project={p[4]}
                index={4}
                onClick={handleNavigate}
                aosDelay={400}
              />
            </div>
          )}

          {/* ── ROW 3 ── */}

          {/* projects[5] — Wide thin card */}
          {p[5] && (
            <div className="col-span-12">
              <WideCard
                project={p[5]}
                index={5}
                onClick={handleNavigate}
              />
            </div>
          )}
        </div>

        {/* ── Section footer ── */}
        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/5"
        >
          <p className="font-mono text-xs text-gray-500">
            Crafted with Python, PyTorch, React &amp; FastAPI
          </p>
          <div className="inline-flex items-center gap-2 text-sm font-mono text-electric-blue">
            All {p.length} engineering projects
          </div>
        </div>
      </div>
    </section>
  );
}
