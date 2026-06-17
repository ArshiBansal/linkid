// app/privacy/page.tsx
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/app/components/Navbar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | LinkID",
  description:
    "Privacy Policy for LinkID - How we collect, use, and protect your personal data.",
};

const sections = [
  { id: "information-we-collect", label: "1. Information We Collect" },
  { id: "how-we-use", label: "2. How We Use Your Information" },
  { id: "data-storage", label: "3. Data Storage & Security" },
  { id: "data-sharing", label: "4. Data Sharing" },
  { id: "cookies", label: "5. Cookies & Tracking" },
  { id: "your-rights", label: "6. Your Rights" },
  { id: "changes", label: "7. Changes to This Policy" },
];

const sectionClass =
  "space-y-6 border-b border-zinc-200/70 pb-12 last:border-none last:pb-0 dark:border-white/10";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("information-we-collect");
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll spy + progress bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -20% 0px", threshold: 0.4 },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

      setProgress(Math.min(Math.max(scrolled, 0), 100));
      setShowBackToTop(winScroll > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const estimatedReadingTime = "6 min read";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden border-b border-violet-200/60 px-4 pb-14 pt-28 dark:border-white/10 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8"
          aria-labelledby="privacy-heading"
        >
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(124,58,237,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]" />

          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex rounded-full border border-violet-200/60 bg-violet-100/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
              Legal
            </p>
            <h1
              id="privacy-heading"
              className="text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl md:text-6xl"
            >
              Privacy Policy
            </h1>
            <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">
              Last updated: June 2026 • {estimatedReadingTime}
            </p>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600" />
          </div>
        </section>

        {/* Reading Progress Bar */}
        <div className="sticky top-0 z-50 h-0.5 w-full bg-zinc-200 dark:bg-white/10">
          <div
            className="h-0.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 lg:grid lg:grid-cols-12 lg:gap-12 sm:px-6 lg:px-8">
          {/* Sticky Table of Contents - Desktop */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-20 space-y-2">
              <div className="mb-6 text-sm font-semibold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                ON THIS PAGE
              </div>
              <nav className="space-y-1 text-sm" aria-label="Table of Contents">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "block w-full text-left rounded-xl px-4 py-3 transition-all hover:bg-zinc-100 dark:hover:bg-white/5",
                      activeSection === section.id
                        ? "bg-violet-100 font-medium text-violet-700 dark:bg-violet-950/70 dark:text-violet-300"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200",
                    )}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="rounded-3xl border border-white/70 bg-white/80 shadow-xl shadow-violet-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/20">
              <div className="px-6 py-10 sm:px-10 md:px-14 md:py-12">
                <div
                  className={cn(
                    "prose prose-zinc max-w-none dark:prose-invert prose-lg",
                    "prose-headings:scroll-mt-24 prose-headings:font-semibold",
                    "prose-h2:text-3xl prose-h2:tracking-tight prose-h2:text-zinc-900 dark:prose-h2:text-white",
                    "prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed",
                    "prose-li:text-zinc-600 dark:prose-li:text-zinc-300 prose-li:leading-relaxed",
                    "prose-strong:text-zinc-900 dark:prose-strong:text-white",
                    "prose-a:text-violet-600 hover:prose-a:text-violet-700 dark:prose-a:text-violet-400 dark:hover:prose-a:text-violet-300",
                  )}
                >
                  <section id="information-we-collect" className={sectionClass}>
                    <h2>1. Information We Collect</h2>
                    <p>
                      When you create a LinkID account, we collect the following
                      information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Your name and email address</li>
                      <li>
                        Profile picture (if signed in via Google or GitHub)
                      </li>
                      <li>
                        The social and platform links you voluntarily add to
                        your profile
                      </li>
                      <li>
                        Aggregated, anonymized usage data to improve the service
                      </li>
                    </ul>
                  </section>

                  <section id="how-we-use" className={sectionClass}>
                    <h2>2. How We Use Your Information</h2>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>To create and display your public profile page</li>
                      <li>To authenticate you securely via NextAuth.js</li>
                      <li>
                        To send transactional emails (e.g., password resets)
                      </li>
                      <li>
                        To analyze aggregate usage patterns and improve LinkID
                      </li>
                    </ul>
                  </section>

                  <section id="data-storage" className={sectionClass}>
                    <h2>3. Data Storage &amp; Security</h2>

                    <div className="my-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-7 dark:border-emerald-900/50 dark:bg-emerald-950/40">
                      <p className="font-medium text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
                        🔒 Security First
                      </p>
                      <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
                        <li>
                          Passwords are hashed with <strong>bcrypt</strong>
                        </li>
                        <li>
                          All data is stored in a secure PostgreSQL database
                        </li>
                        <li>
                          OAuth tokens are managed by NextAuth.js and not
                          persisted beyond sessions
                        </li>
                      </ul>
                    </div>

                    <p>
                      We take reasonable measures to protect your personal
                      information. However, no method of transmission over the
                      internet is 100% secure.
                    </p>
                  </section>

                  <section id="data-sharing" className={sectionClass}>
                    <h2>4. Data Sharing</h2>
                    <p>
                      We do not sell, rent, or share your personal data with
                      third parties for marketing purposes. Your public profile
                      (username and links) is visible to anyone who visits your
                      LinkID URL — this is the core function of the service.
                    </p>
                  </section>

                  <section id="cookies" className={sectionClass}>
                    <h2>5. Cookies &amp; Tracking</h2>
                    <p>
                      LinkID uses only essential session cookies managed by
                      NextAuth.js for authentication. We do not use advertising
                      or tracking cookies.
                    </p>
                  </section>

                  <section id="your-rights" className={sectionClass}>
                    <h2>6. Your Rights</h2>
                    <p>You have full control over your personal data:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Delete your account and all associated data from your
                        dashboard at any time
                      </li>
                      <li>Request access to or a copy of your personal data</li>
                      <li>Request correction of inaccurate information</li>
                    </ul>
                    <p className="mt-6">
                      For any additional requests, please open an issue on our{" "}
                      <Link
                        href="https://github.com/vishnukothakapu/linkid/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline"
                      >
                        GitHub repository
                      </Link>
                      .
                    </p>
                  </section>

                  <section id="changes" className="space-y-6">
                    <h2>7. Changes to This Policy</h2>
                    <p>
                      We may update this Privacy Policy from time to time.
                      Significant changes will be announced via the repository
                      changelog or platform notices. Your continued use of
                      LinkID after updates constitutes acceptance of the revised
                      policy.
                    </p>
                  </section>
                </div>

                {/* Footer Navigation */}
                <div className="mt-16 border-t border-violet-200/60 pt-8 dark:border-white/10 flex items-center justify-between">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:text-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:text-zinc-400 dark:hover:text-violet-400"
                  >
                    ← Back to Home
                  </Link>

                  <button
                    onClick={scrollToTop}
                    className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 flex items-center gap-1 transition-colors"
                  >
                    ↑ Back to Top
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Back to Top Button (Mobile) */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 bg-white/95 shadow-xl shadow-zinc-950/10 backdrop-blur-2xl transition-all hover:scale-105 hover:border-violet-200 dark:border-white/10 dark:bg-zinc-950/95 lg:hidden"
            aria-label="Back to top"
          >
            <span className="text-2xl">↑</span>
          </button>
        )}
      </main>
    </>
  );
}
