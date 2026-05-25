import Link from "next/link";
import { Metadata } from "next";

import { Navbar } from "@/app/components/Navbar";

const lastUpdated = new Date("2026-05-20").toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const metadata: Metadata = {
  title: "Privacy Policy | LinkID",
  description:
    "Privacy Policy for LinkID platform - Learn how we collect, use, and protect your data",

  openGraph: {
    title: "Privacy Policy | LinkID",
    description:
      "Learn how LinkID collects, uses, and protects your personal data.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <section className="relative border-b border-violet-200/60 px-4 pb-12 pt-32 dark:border-white/10 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(124,58,237,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]" />

          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-black tracking-tight text-zinc-950 dark:text-white sm:text-5xl md:text-6xl">
              Privacy Policy
            </h1>

            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
              Last updated: {lastUpdated}
            </p>

            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600" />
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/70 bg-white/70 p-6 shadow-xl shadow-violet-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-black/20 sm:p-8 md:p-10">
            <div className="prose prose-zinc max-w-none prose-p:text-muted-foreground prose-li:text-muted-foreground dark:prose-invert prose-headings:text-zinc-950 dark:prose-headings:text-white">
              <section className="mb-8">
                <h2 className="mb-3 text-2xl font-semibold">1. Introduction</h2>

                <p className="leading-relaxed">
                  Welcome to <strong>LinkID</strong>. Your privacy is important
                  to us. This Privacy Policy explains how we collect, use, and
                  safeguard your information while using our platform and
                  services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-3 text-2xl font-semibold">
                  2. Information We Collect
                </h2>

                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Account Information:</strong> Username, email
                    address, and securely hashed password (bcrypt)
                  </li>

                  <li>
                    <strong>Profile Information:</strong> Bio, avatar image, and
                    social media links
                  </li>

                  <li>
                    <strong>Authentication Data:</strong> When using
                    Google/GitHub OAuth, we receive your name, email, and
                    profile picture
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-3 text-2xl font-semibold">
                  3. How We Use Your Information
                </h2>

                <ul className="list-disc space-y-2 pl-6">
                  <li>Create and manage your account</li>

                  <li>Display your profile and links publicly</li>

                  <li>Redirect visitors to your selected platforms</li>

                  <li>Improve and optimize our platform</li>

                  <li>Protect against unauthorized activity</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-3 text-2xl font-semibold">
                  4. Authentication &amp; OAuth
                </h2>

                <p className="mb-3 leading-relaxed">
                  LinkID uses NextAuth.js for secure authentication. We support:
                </p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>Email/Password:</strong> Your passwords are{" "}
                    <strong>hashed</strong> using bcrypt
                  </li>

                  <li>
                    <strong>Google OAuth:</strong> We receive your name, email,
                    and profile picture after your consent
                  </li>

                  <li>
                    <strong>GitHub OAuth:</strong> We receive your GitHub
                    username, email, and profile information
                  </li>
                </ul>

                <p className="mt-3 leading-relaxed">
                  We do NOT store OAuth tokens beyond what&apos;s necessary for
                  session management.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-3 text-2xl font-semibold">
                  5. Cookies and Tracking
                </h2>

                <p className="leading-relaxed">
                  We use cookies to maintain login sessions, remember theme
                  preferences (light/dark mode), and understand how users
                  interact with our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-3 text-2xl font-semibold">
                  6. Data Storage and Security
                </h2>

                <p className="leading-relaxed">
                  Your data is stored in a secure PostgreSQL database with
                  industry-standard security measures including password
                  hashing, HTTPS encryption, and regular security updates.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-3 text-2xl font-semibold">
                  7. Third-Party Services
                </h2>

                <p className="mb-3 leading-relaxed">LinkID integrates with:</p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong>GitHub/Google OAuth</strong> — For authentication
                  </li>

                  <li>
                    <strong>Cloudinary</strong> — For avatar image storage
                  </li>

                  <li>
                    <strong>Vercel</strong> — For hosting
                  </li>

                  <li>
                    <strong>PostgreSQL</strong> — For database management
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-3 text-2xl font-semibold">8. Your Rights</h2>

                <p className="mb-3 leading-relaxed">You have the right to:</p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>Access your personal data</li>

                  <li>Request correction of inaccurate data</li>

                  <li>Request account deletion</li>

                  <li>Object to data processing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-3 text-2xl font-semibold">
                  9. Children&apos;s Privacy
                </h2>

                <p className="leading-relaxed">
                  LinkID is not intended for children under 13 years of age. We
                  do not knowingly collect personal information from children.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-3 text-2xl font-semibold">10. Contact Us</h2>

                <p className="leading-relaxed">
                  Questions? Contact us at{" "}
                  <a
                    href="mailto:support@linkid.qzz.io"
                    rel="noopener noreferrer"
                    className="text-violet-600 transition-colors hover:text-violet-700"
                  >
                    support@linkid.qzz.io
                  </a>
                </p>
              </section>
            </div>

            <div className="mt-12 border-t border-violet-200/60 pt-8 text-center dark:border-white/10">
              <Link
                href="/"
                aria-label="Back to home page"
                className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
