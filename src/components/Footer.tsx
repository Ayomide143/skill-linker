"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200 pt-10 pb-6 px-4 rounded-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
        {/* Logo & About */}
        <div className="flex-1 mb-8 md:mb-0">
          <div className="flex items-center gap-3 mb-3">
            <img src="/whitelogo.png" alt="Skill Linker Logo" className="h-8 color-white" />
          </div>
          <p className="text-gray-400 text-sm max-w-xs">
            Connecting skilled freelancers with top organizations. Find work,
            manage projects, and grow your career with Skill Linker.
          </p>
        </div>
        {/* Navigation Links */}
        <div className="flex-1 mb-8 md:mb-0">
          <h3 className="text-white font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/home/freelancers/find-work"
                className="hover:text-indigo-400 transition"
              >
                Find Work
              </Link>
            </li>
            <li>
              <Link
                href="/home/freelancers/applications"
                className="hover:text-indigo-400 transition"
              >
                Applications
              </Link>
            </li>
            <li>
              <Link
                href="/home/freelancers/messages"
                className="hover:text-indigo-400 transition"
              >
                Messages
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-indigo-400 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Social Icons */}
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-3">Connect with us</h3>
          <div className="flex gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-indigo-400 transition"
            >
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                <path
                  d="M22 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.964-2.47 8.93 8.93 0 0 1-2.828 1.082A4.48 4.48 0 0 0 12 9.48c0 .352.04.695.116 1.022C8.728 10.36 5.8 8.797 3.797 6.36a4.48 4.48 0 0 0-.607 2.255c0 1.556.792 2.93 2.002 3.736a4.48 4.48 0 0 1-2.03-.56v.057a4.48 4.48 0 0 0 3.6 4.393c-.193.053-.397.082-.607.082-.148 0-.292-.014-.432-.04a4.48 4.48 0 0 0 4.18 3.11A8.98 8.98 0 0 1 2 19.07a12.68 12.68 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.13 9.13 0 0 0 24 4.59a8.93 8.93 0 0 1-2.54.698z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-indigo-400 transition"
            >
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                <path
                  d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-indigo-400 transition"
            >
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                <path
                  d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-9 19H5v-9h5v9zm-2.5-10.268c-1.656 0-3-1.343-3-3s1.344-3 3-3 3 1.343 3 3-1.344 3-3 3zm15.5 10.268h-5v-4.5c0-1.104-.896-2-2-2s-2 .896-2 2v4.5h-5v-9h5v1.268c.879-1.268 2.5-2.268 4-2.268 2.209 0 4 1.791 4 4v6z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="mailto:info@skilllinker.com"
              aria-label="Email"
              className="hover:text-indigo-400 transition"
            >
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                <path
                  d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11zm1.5 0v.217l8.5 5.666 8.5-5.666V6.5a1 1 0 0 0-1-1h-15a1 1 0 0 0-1 1zm17 1.566-7.72 5.15a1.5 1.5 0 0 1-1.56 0L3.5 8.066V17.5a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1V8.066z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Skill Linker. All rights reserved.
      </div>
    </footer>
  );
}
