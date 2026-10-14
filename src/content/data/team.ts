import type { TeamMember } from "../schema";

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "alexander-wright",
    name: "Alexander Wright",
    role: "Managing Partner & Head of Systems Architecture",
    bio: "Directs foundational systems engineering, React 19 compiler strategy, and enterprise technical governance across London and New York.",
    locationCode: "LON",
    linkedIn: "https://linkedin.com/in/avorria-leadership",
    sameAs: ["https://linkedin.com/in/avorria-leadership", "https://github.com/avorria"],
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Partner, AI Orchestration & Evaluation",
    bio: "Leads deterministic multi-agent engineering, formal schema verification, and latency-budgeted LLM inference pipelines.",
    locationCode: "NYC",
    linkedIn: "https://linkedin.com/in/avorria-ai",
    sameAs: ["https://linkedin.com/in/avorria-ai", "https://github.com/avorria"],
  },
];
