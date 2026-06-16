// app/terms/page.tsx
"use client";

import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/app/components/Navbar";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | LinkID",
  description:
    "Terms of Service for LinkID platform - Usage guidelines, user responsibilities, and legal terms for our professional link management service",
};

const sectionClass =
  "space-y-6 border-b border-zinc-200/70 pb-12 last:border-none last:pb-0 dark:border-white/10";

const tocItems = [
  { id: "introduction", label: "1. Introduction" },
  { id: "account-terms", label: "2. Account Terms" },
  { id: "acceptable-use", label: "3. Acceptable Use Policy" },
  { id: "user-content", label: "4. User Content & Responsibilities" },
  { id: "redirects", label: "5. Platform Links & Redirects" },
  { id: "intellectual-property", label: "6. Intellectual Property" },
  { id: "termination", label: "7. Termination" },
  { id: "liability", label: "8. Limitation of Liability" },
  { id: "changes", label: "9. Changes to Terms" },
  { id: "contact", label: "10. Contact Us" },
];

function InfoCard({
  title,
  children,
  variant = "default",
}: {
  title: string;
  children: React.ReactNode;
  variant?: "default" | "warning" | "danger" | "neutral";
}) {
  const variants = {
    default:
      "border-violet-200/60 bg-violet-50/70 dark:border-violet-400/20 dark:bg-violet-400/5",
    warning:
      "border-amber-200 bg-amber-50/80 dark:border-amber-800 dark:bg-amber-950/20",
    danger:
      "border-red-200 bg-red-50/80 dark:border-red-800 dark:bg-red-950/20",
    neutral:
      "border-zinc-200 bg-zinc-50/80 dark:border-zinc-700 dark:bg-zinc-900/50",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 shadow-sm backdrop-blur-sm",
        variants[variant],
      )}
    >
      <h3 className="mb-3 text-base font-semibold text-zinc-900 dark:text-white">
        {title}
      </h3>
      <div className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
        {children}
      </div>
    </div>
  );
}

export default function TermsOfServicePage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("introduction");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progressPercentage = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(Math.max(progressPercentage, 0), 100));
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active Section in TOC
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -50% 0px", threshold: 0.3 },
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-violet-600 z-50 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden border-b border-violet-200/60 px-4 pb-14 pt-28 dark:border-white/10 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8"
          aria-labelledby="terms-heading"
        >
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(124,58,237,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]" />

          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex rounded-full border border-violet-200/60 bg-violet-100/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
              Legal
            </p>
            <h1
              id="terms-heading"
              className="text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl md:text-6xl"
            >
              Terms of Service
            </h1>
            <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">
              Please read these terms carefully before using LinkID. They
              outline your rights, responsibilities, and acceptable use of the
              platform.
            </p>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              Last updated: May 20, 2026
            </p>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600" />
          </div>
        </section>

        {/* Main Content + TOC */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex gap-10 lg:gap-16">
            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <div className="rounded-3xl border border-white/70 bg-white/80 shadow-xl shadow-violet-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/20">
                <div className="px-6 py-10 sm:px-10 md:px-14 md:py-14">
                  <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-p:leading-8 prose-li:leading-7">
                    {/* Section 1 */}
                    <section id="introduction" className={sectionClass}>
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        1. Introduction
                      </h2>
                      <p>
                        Welcome to <strong>LinkID</strong> (<em>we</em>, <em>our</em>, or
                        <em>us</em>). By accessing or using our platform at{" "}
                        <Link
                          href="/"
                          className="text-violet-600 hover:underline dark:text-violet-400"
                        >
                          linkid.qzz.io
                        </Link>
                        , you agree to comply with and be bound by these Terms
                        of Service.
                      </p>
                      <p>
                        These terms apply to all users of the platform,
                        including visitors, registered users, and contributors.
                        If you do not agree with any part of these terms, you
                        may not access or use the platform.
                      </p>
                    </section>

                    {/* Section 2 */}
                    <section id="account-terms" className={sectionClass}>
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        2. Account Terms
                      </h2>
                      <p>To use LinkID, you agree that:</p>
                      <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
                        <li>
                          You must be at least 13 years old to create an account
                        </li>
                        <li>
                          You are responsible for maintaining the security of
                          your account and password
                        </li>
                        <li>
                          You must provide accurate, current, and complete
                          registration information
                        </li>
                        <li>
                          You may not share your account credentials with any
                          third party
                        </li>
                        <li>
                          You are solely responsible for all activities under
                          your account
                        </li>
                        <li>
                          You must notify us immediately of any unauthorized
                          account use
                        </li>
                        <li>
                          You may not use the service for illegal or
                          unauthorized purposes
                        </li>
                      </ul>
                    </section>

                    {/* Section 3 */}
                    <section id="acceptable-use" className={sectionClass}>
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        3. Acceptable Use Policy
                      </h2>
                      <p>You agree not to use LinkID to:</p>
                      <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
                        <li>
                          Post, share, or promote illegal content or activities
                        </li>
                        <li>
                          Harass, abuse, intimidate, threaten, or defame others
                        </li>
                        <li>
                          Impersonate any person or entity or misrepresent your
                          affiliation
                        </li>
                        <li>
                          Distribute malware, viruses, or harmful software
                        </li>
                        <li>
                          Circumvent security measures or access restrictions
                        </li>
                        <li>
                          Interfere with or disrupt platform functionality
                        </li>
                        <li>
                          Use bots or automated scripts to collect user data
                          without consent
                        </li>
                        <li>
                          Share phishing links, malicious content, or adult
                          material
                        </li>
                        <li>Violate applicable laws or regulations</li>
                      </ul>
                    </section>

                    {/* Section 4 */}
                    <section id="user-content" className={sectionClass}>
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        4. User Content &amp; Responsibilities
                      </h2>
                      <div className="grid gap-5 md:grid-cols-2 my-8">
                        <InfoCard title="Ownership">
                          <p className="m-0">
                            You retain ownership rights to the content you
                            submit, including profile information, links, and
                            associated data.
                          </p>
                        </InfoCard>
                        <InfoCard title="License to Use">
                          <p className="m-0">
                            By submitting content, you grant LinkID a worldwide,
                            non-exclusive, royalty-free license to host, store,
                            display, and distribute your content as necessary to
                            operate the platform.
                          </p>
                        </InfoCard>
                      </div>
                      <p>You are solely responsible for:</p>
                      <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
                        <li>
                          The accuracy, legality, and appropriateness of shared
                          links
                        </li>
                        <li>
                          Ensuring your content does not violate third-party
                          rights
                        </li>
                        <li>
                          Complying with all applicable laws and regulations
                        </li>
                      </ul>
                    </section>

                    {/* Section 5 */}
                    <section id="redirects" className={sectionClass}>
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        5. Platform Links &amp; Redirects
                      </h2>
                      <p>
                        LinkID may provide redirects to third-party platforms
                        and websites. We do not control or assume responsibility
                        for the content, policies, or practices of external
                        services.
                      </p>
                      <InfoCard
                        title="⚠️ Important Disclaimer"
                        variant="warning"
                      >
                        <p className="m-0">
                          By using our redirect service, you acknowledge that
                          external websites are accessed at your own risk and
                          may be modified or removed without notice.
                        </p>
                      </InfoCard>
                    </section>

                    {/* Section 6 */}
                    <section
                      id="intellectual-property"
                      className={sectionClass}
                    >
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        6. Intellectual Property
                      </h2>
                      <p>
                        The LinkID platform, including its design, branding,
                        source code, graphics, and interface elements, is
                        protected by intellectual property laws.
                      </p>
                      <p>
                        You may not copy, modify, reverse engineer, distribute,
                        or reproduce any part of the platform without written
                        permission.
                      </p>
                      <p>
                        LinkID and related branding assets are trademarks of the
                        LinkID project. Unauthorized use is prohibited.
                      </p>
                    </section>

                    {/* Section 7 */}
                    <section id="termination" className={sectionClass}>
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        7. Termination
                      </h2>
                      <p>
                        We reserve the right to suspend or terminate accounts
                        that violate these terms, harm users, or disrupt the
                        platform.
                      </p>
                      <InfoCard title="Upon Termination" variant="danger">
                        <ul className="mb-0 mt-0 space-y-2">
                          <li>
                            Your access to the platform may immediately cease
                          </li>
                          <li>
                            We may delete or deactivate associated account data
                          </li>
                          <li>
                            You may request permanent account deletion through
                            account settings
                          </li>
                        </ul>
                      </InfoCard>
                    </section>

                    {/* Section 8 */}
                    <section id="liability" className={sectionClass}>
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        8. Limitation of Liability
                      </h2>
                      <InfoCard
                        title="Limitation of Liability"
                        variant="neutral"
                      >
                        <p className="m-0">
                          To the maximum extent permitted by law, LinkID and its
                          contributors shall not be liable for indirect,
                          incidental, special, consequential, or punitive
                          damages resulting from platform use.
                        </p>
                      </InfoCard>
                      <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/70 px-5 py-5 text-sm leading-7 italic dark:border-zinc-700 dark:bg-zinc-900/40">
                        <strong>Disclaimer of Warranties:</strong> LinkID is
                        provided <em>AS IS</em> and <em>AS AVAILABLE</em> without warranties
                        of any kind, express or implied.
                      </div>
                    </section>

                    {/* Section 9 */}
                    <section id="changes" className={sectionClass}>
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        9. Changes to Terms
                      </h2>
                      <p>
                        We may update these terms periodically. Significant
                        updates may be communicated through platform notices or
                        email notifications.
                      </p>
                      <p>
                        Continued use of LinkID after updates constitutes
                        acceptance of the revised terms.
                      </p>
                    </section>

                    {/* Section 10 */}
                    <section id="contact" className="space-y-6">
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        10. Contact Us
                      </h2>
                      <p>
                        If you have questions about these Terms of Service,
                        contact us through any of the following channels:
                      </p>
                      <ul className="space-y-4 text-sm">
                        <li>
                          GitHub Issues:{" "}
                          <Link
                            href="https://github.com/vishnukothakapu/linkid/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-600 hover:underline"
                          >
                            github.com/vishnukothakapu/linkid/issues
                          </Link>
                        </li>
                        <li>
                          Email:{" "}
                          <a
                            href="mailto:support@linkid.qzz.io"
                            className="text-violet-600 hover:underline"
                          >
                            support@linkid.qzz.io
                          </a>
                        </li>
                        <li>
                          GitHub Discussions:{" "}
                          <Link
                            href="https://github.com/vishnukothakapu/linkid/discussions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-600 hover:underline"
                          >
                            GitHub Discussions
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </div>

                  {/* Footer Navigation */}
                  <div className="mt-16 border-t border-violet-200/60 pt-8 dark:border-white/10">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-zinc-600 transition-colors hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
                    >
                      ← Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Table of Contents */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  On this page
                </div>
                <nav className="space-y-1 text-sm">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={cn(
                        "block rounded-lg px-3 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
                        activeSection === item.id
                          ? "bg-violet-100 font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                          : "text-zinc-600 dark:text-zinc-400",
                      )}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-lg transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        </button>
      )}
    </>
  );
}
