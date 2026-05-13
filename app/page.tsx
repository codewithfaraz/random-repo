import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] px-4 py-20 font-sans text-white">
      {/* Glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 opacity-[0.06] blur-3xl" />

      <div className="relative z-10 space-y-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          Powered by Hermes Agent
        </div>

        {/* Title */}
        <h1 className="text-5xl font-black tracking-tighter text-white sm:text-6xl">
          E-Commerce
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>

        <p className="max-w-lg text-lg text-white/50 sm:text-xl">
          A modern, real-time admin dashboard built with Next.js 16, React 19,
          and Tailwind CSS 4. Monitor orders, revenue, and customers at a
          glance.
        </p>

        {/* CTA */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5"
        >
          Launch Dashboard →
        </Link>

        {/* Tech stack */}
        <div className="flex justify-center gap-6 pt-8">
          {[
            "Next.js 16",
            "React 19",
            "TypeScript",
            "Tailwind CSS 4",
            "Recharts",
            "Lucide Icons",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/40"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
