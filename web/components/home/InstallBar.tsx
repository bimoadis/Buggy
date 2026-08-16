"use client";
import { useState } from "react";

export function InstallBar() {
  const [copied, setCopied] = useState(false);
  const command = "H78G5BJyidnNmGtunBmmzi4bPbQafwYCC6M2fZ2Ypump";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="install-bar">
      <span className="install-tag">[ CA ]</span>
      <span className="install-cmd">{command}</span>
      <button
        onClick={handleCopy}
        className="install-copy-btn"
        style={{
          background: copied ? "var(--green)" : "var(--white)",
          color: copied ? "#fff" : "var(--text2)",
          borderColor: copied ? "var(--green)" : "var(--border2)",
          transform: copied ? "scale(1.04)" : "scale(1)",
          transition: "all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontWeight: 700,
        }}
      >
        {copied ? (
          <>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            COPIED!
          </>
        ) : (
          "COPY"
        )}
      </button>
      <span className="install-live">
        <span className="install-live-dot" />
        LIVE
      </span>
    </div>
  );
}
