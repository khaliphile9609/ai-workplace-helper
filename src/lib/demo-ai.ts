/**
 * Simulated AI engine — frontend only.
 * Produces realistic, structured demo output with a small artificial delay.
 */

export const AI_DISCLAIMER =
  "AI-generated content may contain errors or inaccurate information. Always review and verify AI outputs before using them for important workplace communications, decisions, or research.";

export function delay(ms = 1100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type Tone = "formal" | "friendly" | "persuasive";
export type Length = "short" | "medium" | "detailed";

export interface EmailInput {
  recipient: string;
  subject: string;
  prompt: string;
  tone: Tone;
  length: Length;
}

const greetings: Record<Tone, string> = {
  formal: "Dear",
  friendly: "Hi",
  persuasive: "Hello",
};

const openers: Record<Tone, string> = {
  formal: "I hope this message finds you well.",
  friendly: "Hope you're having a good week so far!",
  persuasive: "I wanted to reach out about something I believe will make a real difference for the team.",
};

const closers: Record<Tone, string> = {
  formal: "Thank you for your time and consideration.\n\nKind regards,\nAlex Morgan",
  friendly: "Thanks so much — shout if anything's unclear.\n\nBest,\nAlex",
  persuasive: "I'd welcome the chance to talk this through and agree the next step.\n\nBest regards,\nAlex Morgan",
};

export async function generateEmail(input: EmailInput): Promise<string> {
  await delay(1200);
  const name = input.recipient.trim() || "Team";
  const topic = input.prompt.trim() || "the item discussed";
  const subject = input.subject.trim() || "Quick update";

  const body: string[] = [
    `${greetings[input.tone]} ${name},`,
    "",
    openers[input.tone],
    "",
    `I'm writing regarding ${topic}.`,
  ];

  if (input.length !== "short") {
    body.push(
      "",
      "To give some context: this follows on from our recent discussions and the priorities we agreed for this quarter. I've summarised the current position below so we're all working from the same picture.",
      "",
      "• Current status — work is progressing and the main deliverables are on track.",
      "• What I need from you — a short review and confirmation that the approach works on your side.",
      "• Timeline — I'd aim to close this out within the next five working days.",
    );
  }

  if (input.length === "detailed") {
    body.push(
      "",
      "If it's easier, I'm happy to set up a 20-minute call to walk through the detail and answer any questions. I can share supporting notes beforehand so the conversation stays focused on decisions rather than background.",
      "",
      `Should anything about ${topic} need to change, please let me know as early as possible so I can adjust the plan without affecting other commitments.`,
    );
  }

  body.push("", closers[input.tone]);

  return `Subject: ${subject}\n\n${body.join("\n")}`;
}

export type ResearchFocus = "overview" | "business-impact" | "risks" | "implementation";

export interface ResearchInput {
  topic: string;
  context: string;
  focus: ResearchFocus;
}

export interface ResearchResult {
  summary: string;
  insights: string[];
  recommendations: string[];
  actions: string[];
}

const focusLabels: Record<ResearchFocus, string> = {
  overview: "a balanced general overview",
  "business-impact": "business impact and value",
  risks: "risks, limitations and compliance",
  implementation: "practical implementation",
};

export async function generateResearch(input: ResearchInput): Promise<ResearchResult> {
  await delay(1400);
  const topic = input.topic.trim() || "the requested topic";
  const contextLine = input.context.trim()
    ? " The supplied source material was analysed and its main arguments were folded into the points below."
    : "";

  return {
    summary:
      `${topic.charAt(0).toUpperCase()}${topic.slice(1)} is best understood as a set of practices and tools that ` +
      `change how work gets planned, executed and reviewed. This analysis was produced with a focus on ` +
      `${focusLabels[input.focus]}.${contextLine} In short: adoption is accelerating, the measurable gains come from ` +
      `removing repetitive coordination work rather than replacing expertise, and organisations that succeed pair ` +
      `the change with clear guidelines and training.`,
    insights: [
      "The largest, fastest returns come from routine, high-volume tasks — drafting, summarising and triage — rather than from complex judgement work.",
      "Teams that define clear usage guidelines up front report noticeably higher trust and adoption than teams that roll out tooling first.",
      "Quality depends heavily on the quality of the input: structured prompts with purpose, context and desired output consistently outperform vague requests.",
      "Human review remains the decisive quality control step; unchecked output is the single most common source of avoidable errors.",
    ],
    recommendations: [
      "Start with two or three well-defined, low-risk use cases and measure time saved before broadening scope.",
      "Publish a one-page internal guideline covering acceptable use, confidentiality and mandatory review.",
      "Run a short enablement session so colleagues learn how to structure requests effectively.",
      "Review outputs against a simple quality checklist for the first 30 days and log recurring issues.",
    ],
    actions: [
      "Nominate an owner and a small pilot group this week.",
      "Draft the internal usage guideline and circulate for comment.",
      "Agree three success metrics (time saved, quality score, adoption rate).",
      "Schedule a 30-day review to decide whether to expand, adjust or stop.",
    ],
  };
}

export const CHAT_SUGGESTIONS = [
  "Help me write a professional email.",
  "Summarise this information.",
  "Help me prepare for a meeting.",
  "Improve this piece of writing.",
  "Create a project plan.",
];

export async function generateChatReply(message: string): Promise<string> {
  await delay(900);
  const m = message.toLowerCase();

  if (m.includes("email")) {
    return [
      "Happy to help with that. A strong workplace email usually follows four beats:",
      "",
      "1. Purpose — say why you're writing in the first line.",
      "2. Context — one short paragraph of background only.",
      "3. The ask — make the requested action explicit.",
      "4. Timeline — give a clear, realistic date.",
      "",
      "Tell me the recipient, the goal and the tone you want, and I'll draft it.",
      "",
      "Suggested next step: open the Smart Email Generator for a full editable draft.",
    ].join("\n");
  }

  if (m.includes("summar")) {
    return [
      "Send me the text and I'll return a structured summary containing:",
      "",
      "• A three-sentence overview",
      "• Key points worth remembering",
      "• Decisions or commitments mentioned",
      "• Open questions that still need answers",
      "",
      "Suggested next step: the AI Research Assistant handles longer documents with insights and recommendations.",
    ].join("\n");
  }

  if (m.includes("meeting")) {
    return [
      "Here's a simple preparation framework you can reuse:",
      "",
      "• Outcome — what must be true when the meeting ends?",
      "• Agenda — three items maximum, timeboxed.",
      "• Materials — share anything to read beforehand.",
      "• Roles — who decides, who informs, who takes notes.",
      "• Follow-up — owners and dates captured before people leave.",
      "",
      "Suggested next step: tell me the meeting topic and I'll draft the agenda.",
    ].join("\n");
  }

  if (m.includes("improve") || m.includes("rewrite") || m.includes("writing")) {
    return [
      "Paste the text and I'll tighten it. I typically:",
      "",
      "• Cut filler phrases and repetition",
      "• Lead with the most important sentence",
      "• Replace passive constructions with direct ones",
      "• Keep terminology consistent throughout",
      "",
      "Suggested next step: let me know the audience and desired tone so the edit fits the context.",
    ].join("\n");
  }

  if (m.includes("plan") || m.includes("project")) {
    return [
      "A lightweight project plan that works for most workplace initiatives:",
      "",
      "1. Objective and success measures",
      "2. Scope — explicitly in and out",
      "3. Milestones with dates and owners",
      "4. Dependencies and risks with mitigations",
      "5. Communication rhythm (weekly update, monthly review)",
      "",
      "Suggested next step: share the objective and deadline and I'll populate the milestones.",
    ].join("\n");
  }

  return [
    `Thanks — here's how I'd approach "${message.trim()}".`,
    "",
    "• Clarify the outcome you need and who it's for.",
    "• Gather the two or three facts that actually drive the decision.",
    "• Draft quickly, then edit for clarity rather than length.",
    "• Confirm owners and dates so nothing stalls after the discussion.",
    "",
    "Suggested next step: give me a little more context and I'll produce a ready-to-use draft.",
  ].join("\n");
}
