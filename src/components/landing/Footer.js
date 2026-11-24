
import Link from "next/link";

const footerSections = [
    {
        title: "Platform",
        links: [
            { label: "How It Works", href: "/how-it-works" },
            { label: "Verification Protocol", href: "/verification" },
            { label: "About InternCheck", href: "/about" },
            { label: "FAQs", href: "/faq" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Student Guide", href: "/student-guide" },
            { label: "Recruiter Guide", href: "/recruiter-guide" },
            { label: "Technical Support", href: "/support" },
            { label: "Contact Us", href: "/contact" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Terms & Conditions", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Cookie Policy", href: "/cookies" },
            { label: "Community Guidelines", href: "/guidelines" },
        ],
    },
    {
        title: "Trust & Safety",
        links: [
            { label: "Report a Listing", href: "/report-listing" },
            { label: "Report an Issue", href: "/report-issue" },
            { label: "Verification Standards", href: "/verification" },
            { label: "Feedback Policy", href: "/feedback-policy" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-border bg-surface/80 px-4 py-14 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Main Footer */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
                                IC
                            </div>

                            <span className="font-ui text-base font-extrabold text-text">
                                Intern
                                <span className="text-primary">Check</span>
                            </span>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-text-muted">
                            Internship discovery, verification and
                            experience intelligence. Making internship
                            opportunities more transparent and trustworthy.
                        </p>

                        <div className="mt-5">
                            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-rose-soft/40 px-3 py-1.5 text-xs font-medium text-primary">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                Built for career transparency
                            </span>
                        </div>
                    </div>

                    {/* Footer Links */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="mb-4 font-ui text-xs font-bold uppercase tracking-wider text-text">
                                {section.title}
                            </h3>

                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.href + link.label}>
                                        <Link
                                            href={link.href}
                                            className="font-ui text-sm text-text-muted transition-colors duration-200 hover:text-primary"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                {/* Bottom Footer */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center sm:flex-row sm:text-left">

                    <p className="font-ui text-xs text-text-muted">
                        © {new Date().getFullYear()} InternCheck.
                        All rights reserved.
                    </p>

                    <p className="font-ui text-xs text-text-muted">
                        Making internship experiences count.
                    </p>

                </div>
            </div>
        </footer>
    );
}
