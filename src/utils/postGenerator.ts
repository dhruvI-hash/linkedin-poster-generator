import { EventConfig, ToneType } from '../types';

export interface GeneratedPostOutput {
  intro: string;
  leadParagraph: string;
  takeawaysTitle?: string;
  takeaways?: string[];
  closing: string;
  hashtags: string[];
  mentions: string[];
}

export function generatePostContent(
  config: EventConfig,
  tone: ToneType,
  customHighlights: string,
  tagSpeakers: boolean,
  variationSeed: number = 0
): GeneratedPostOutput {
  const primaryTag = config.hashtags[0] || `#${config.eventName.replace(/\s+/g, '')}`;
  const companyMention = `@${config.companyName.replace(/\s+Inc\.?|\s+LLC/gi, '').trim()}`;
  const speakerTag = tagSpeakers ? ' Dr. Aris Thorne & Elena Chen' : '';

  // Use custom highlights if provided
  const cleanedHighlights = customHighlights.trim();

  switch (tone) {
    case 'executive':
      return {
        intro: `Strategic reflection from ${config.eventName}:`,
        leadParagraph: cleanedHighlights.length > 30
          ? cleanedHighlights
          : `The enterprise conversation has shifted decisively from AI experimentation to autonomous execution at scale. As organizations operationalize intelligent systems, governance and architecture take center stage.`,
        takeawaysTitle: 'Executive imperatives:',
        takeaways: [
          'Enterprise latency thresholds demand edge-native agent deployment across distributed nodes.',
          'Auditability and verifiable guardrails are now non-negotiable board-level requirements.',
          'The winning organizations are empowering human talent through seamless orchestration tools.'
        ],
        closing: `Kudos to the leadership at ${companyMention}${speakerTag ? ` and keynote speakers${speakerTag}` : ''} for orchestrating an insightful executive forum. Looking forward to tomorrow's strategy roundtables.`,
        hashtags: config.hashtags,
        mentions: [companyMention]
      };

    case 'takeaways':
      return {
        intro: `Key Takeaways from ${config.eventName} (Day 1) 📌`,
        leadParagraph: cleanedHighlights.length > 30
          ? cleanedHighlights
          : `After 8 hours of deep dives with world-class engineers, architects, and founders, here is what actually matters in production AI today:`,
        takeawaysTitle: 'Actionable Insights:',
        takeaways: [
          'Autonomous Workflows > Single Prompts: Multi-agent coordination is delivering measurable 4x efficiency gains.',
          'Multimodal context windows are unlocking real-world UX agility at sub-second speeds.',
          'Domain-verified grounding outperforms generalized models on high-stakes enterprise workflows.'
        ],
        closing: `Fascinating sessions and world-class networking hosted by ${companyMention}${speakerTag ? ` featuring${speakerTag}` : ''}. What has been your top takeaway so far?`,
        hashtags: config.hashtags,
        mentions: [companyMention]
      };

    case 'visionary':
      return {
        intro: `We are witnessing the most significant paradigm shift in computing since the graphical user interface. 🌐`,
        leadParagraph: cleanedHighlights.length > 30
          ? cleanedHighlights
          : `Sitting in the keynote auditorium at ${config.eventName}, one realization is unmistakable: software isn't just being built differently—it's thinking dynamically.`,
        takeawaysTitle: 'What the future demands:',
        takeaways: [
          'Next-gen interfaces will feel like live collaboration, not static input forms.',
          'The barrier between ideation and production execution is dropping to near zero.'
        ],
        closing: `The next decade belongs to builders who pair fearless imagination with uncompromising engineering rigor. Thrilled to be here at ${config.location} connecting with pioneers redefining our industry. Huge gratitude to ${companyMention}!`,
        hashtags: config.hashtags,
        mentions: [companyMention]
      };

    case 'technical':
      return {
        intro: `Deep-dive session analysis: Architectural patterns from ${config.eventName} 🛠️`,
        leadParagraph: cleanedHighlights.length > 30
          ? cleanedHighlights
          : `Key technical considerations and systems architecture takeaways from today's keynote sessions:`,
        takeawaysTitle: 'Architecture Breakdown:',
        takeaways: [
          'State Persistence: Migrating from transient context windows to unified vector/relational schemas.',
          'Latency Budgets: Sub-200ms response targets achieved via speculative caching and streaming pipelines.',
          'Resilience Engineering: Recursive evaluation loops prevent hallucination cascade in multi-step workflows.'
        ],
        closing: `Exceptional engineering benchmarks presented by ${companyMention}${speakerTag ? ` and${speakerTag}` : ''}. Excited to test these patterns in production.`,
        hashtags: config.hashtags,
        mentions: [companyMention]
      };

    case 'grateful':
    default:
      return {
        intro: `Still buzzing from day 1 at ${primaryTag}! 🚀`,
        leadParagraph: cleanedHighlights.length > 30
          ? cleanedHighlights
          : `Mind blown by the morning keynote on agentic AI workflows—the speed at which autonomous agents are evolving from prototypes to enterprise production is astonishing.`,
        takeawaysTitle: 'Key takeaways:',
        takeaways: [
          'Multimodal context windows are unlocking real-world UX agility.',
          'Seamless collaboration between human designers and agent systems is the true enterprise differentiator.'
        ],
        closing: `Incredible conversations with fellow builders and engineering leaders today. A huge thank you to ${companyMention}${speakerTag ? ` and speaker${speakerTag}` : ''} and the whole organizing crew for hosting such a high-caliber summit!`,
        hashtags: config.hashtags,
        mentions: [companyMention]
      };
  }
}
