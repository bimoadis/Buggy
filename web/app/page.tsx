import type { Metadata } from "next";
import "./mcptrade.css";
import { PromoBar } from "@/components/home/PromoBar";
import { MCNav } from "@/components/home/MCNav";
import { HunterTicker } from "@/components/home/HunterTicker";
import { MCHero } from "@/components/home/MCHero";
import { InstallBar } from "@/components/home/InstallBar";
import { MCStatsRow } from "@/components/home/MCStatsRow";
import { MCDomainsGrid } from "@/components/home/MCDomainsGrid";
import { MCSplitDocs } from "@/components/home/MCSplitDocs";
import { MCSkillsTable } from "@/components/home/MCSkillsTable";
import { MCFooter } from "@/components/home/MCFooter";

export const metadata: Metadata = {
  title: "buggy — Bug Hunting Skills & Security Toolkit",
  description:
    "51 specialized skills for bug hunting, web security, and external red-team workflows. Auto-load by context. 7-Question Gate before every submission.",
};

export default function HomePage() {
  return (
    <div className="mc-page">
      {/* 1. Top Promo Bar */}
      <PromoBar />

      {/* 2. Technical Header Nav */}
      <MCNav />

      {/* 3. Live Hunter Terminal Action Ticker */}
      <HunterTicker />

      {/* 4. Hero Section with Node Diagram */}
      <MCHero />

      {/* 5. Quick Install Bar */}
      <InstallBar />

      {/* 6. Metrics & Quality Gate Progress Strip */}
      <MCStatsRow />

      {/* 7. Attack Domains Feature Grid */}
      <MCDomainsGrid />

      {/* 8. Precision Tools & Docs Split */}
      <MCSplitDocs />

      {/* 9. Interactive Skill Repository Table */}
      <MCSkillsTable />

      {/* 10. Technical Footer */}
      <MCFooter />
    </div>
  );
}
