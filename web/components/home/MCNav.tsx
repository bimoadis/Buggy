"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MCNav() {
  const pathname = usePathname();

  return (
    <header className="main-nav">
      <Link href="/" className="brand">
        <img
          src="/logo.png"
          alt="buggy"
          style={{ width: 28, height: 28, borderRadius: 6, objectFit: "cover" }}
        />
        <span>
          <span className="accent">buggy </span>Hunter
        </span>
      </Link>

      <nav className="mainnav">
        <Link
          href="/"
          className={pathname === "/" ? "active" : ""}
        >
          Dashboard
        </Link>
        <Link
          href="/skills"
          className={pathname.startsWith("/skills") ? "active" : ""}
        >
          Buggy Skills
        </Link>
        <Link
          href="/docs"
          className={pathname.startsWith("/docs") ? "active" : ""}
        >
          Docs
        </Link>
      </nav>

      <div className="header-right">
        {/* X (Twitter) icon */}
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="social-icon"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* GitHub icon */}
        <a
          href="https://github.com/bimoadis/Buggy"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          title="GitHub Repository"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>

        {/* Status indicator */}
        <div className="status-pill">
          <div className="status-dot" />
          51 Skills Active
        </div>
      </div>
    </header>
  );
}
