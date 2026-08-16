"use client";
import { useState } from "react";

export function InstallBar() {
  const [copied, setCopied] = useState(false);
  const command = "git clone https://github.com/x-cookie/cbughunter-k1";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="install-bar">
      <span className="install-tag">[ REPO ]</span>
      <span className="install-cmd">{command}</span>
      <button
        onClick={handleCopy}
        className="install-copy-btn"
      >
        {copied ? "COPIED ✓" : "COPY"}
      </button>
      <span className="install-live">
        <span className="install-live-dot" />
        LIVE
      </span>
    </div>
  );
}
