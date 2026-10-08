/** ──────────────────────────────────────────────
 *  Privacy policy and website terms.
 *
 *  Written to match what this site actually does today: no cookies, no
 *  analytics, enquiries sent through the visitor's own email app or WhatsApp,
 *  and an AI chat assistant powered by Google's Gemini API. Update this file
 *  whenever that changes (e.g. adding analytics or a form backend), and have
 *  the text reviewed by a legal adviser before relying on it.
 * ──────────────────────────────────────────────*/
import { siteConfig } from "./site-config";

export type LegalSection = { id: string; heading: string; paragraphs?: string[]; bullets?: string[] };
export type LegalDoc = { path: string; title: string; intro: string; updated: string; sections: LegalSection[] };

const LEGAL_UPDATED = "2026-10-08";
const { name } = siteConfig;
const { email } = siteConfig.contact;

export const privacyPolicy: LegalDoc = {
  path: "/privacy",
  title: "Privacy Policy",
  updated: LEGAL_UPDATED,
  intro: `This policy explains what personal information ${name} collects through this website, why, how long we keep it and the rights you have — including under UK GDPR, US state privacy laws, Canada's PIPEDA and the UAE's Personal Data Protection Law.`,
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      paragraphs: [
        `${name} is a mobile app development company based in ${siteConfig.location}, working with clients in the United Kingdom, the United States, Canada and the United Arab Emirates. We are responsible for the personal information described in this policy.`,
        `For any privacy question or request, email ${email}.`,
      ],
    },
    {
      id: "information-we-collect",
      heading: "Information we collect",
      paragraphs: ["We only collect what we need to answer enquiries and run this website:"],
      bullets: [
        "Enquiries you send us — your name, email address, company, phone number and anything you tell us about your project, budget or timeline. Our project-brief forms do not send this data to our servers: they open your own email app or WhatsApp with the message prepared, and the information reaches us when you choose to send it.",
        "Conversations with our AI assistant — the messages you type and any images you attach are sent to Google's Gemini API to generate a reply. We do not keep a stored history of these chats on our servers. Please do not share sensitive personal information in the chat.",
        "Technical data — like most websites, our hosting provider records basic server logs (such as IP address, browser type and the pages requested) to keep the site secure and working.",
      ],
    },
    {
      id: "cookies",
      heading: "Cookies and tracking",
      paragraphs: [
        "This website does not use cookies, analytics tools, advertising trackers or similar technologies, and fonts are served from our own domain rather than third-party services.",
        "If we add analytics or other tracking in future, we will update this policy first and ask for your consent wherever the law requires it.",
      ],
    },
    {
      id: "how-we-use",
      heading: "How we use your information",
      bullets: [
        "To reply to your enquiry, arrange calls and prepare proposals.",
        "To deliver and manage projects if you become a client.",
        "To keep this website secure and working properly.",
        "To meet our legal, tax and accounting obligations.",
      ],
      paragraphs: [
        "We do not sell your personal information, and we do not share it for cross-context behavioural advertising.",
      ],
    },
    {
      id: "legal-bases",
      heading: "Legal bases (UK GDPR)",
      paragraphs: [
        "Where UK GDPR applies, we rely on: steps taken at your request before entering a contract (answering your enquiry and preparing a proposal); performance of a contract (delivering a project); our legitimate interests (running and securing our business and website); and legal obligation (keeping records the law requires).",
      ],
    },
    {
      id: "sharing",
      heading: "Who we share it with",
      paragraphs: ["We share personal information only with:"],
      bullets: [
        "Service providers that help us operate — our email and messaging providers, our hosting provider and Google (for the AI assistant).",
        "Professional advisers such as lawyers and accountants, where needed.",
        "Authorities, where the law requires it.",
        "A successor business, if our business is ever reorganised or sold, under the same protections.",
      ],
    },
    {
      id: "international-transfers",
      heading: "International transfers",
      paragraphs: [
        `We are based in Pakistan, so information you send us is processed there, and some of our service providers process data in other countries. Where the law of your country requires it, we use appropriate safeguards for these transfers, such as contractual protections.`,
      ],
    },
    {
      id: "retention",
      heading: "How long we keep it",
      paragraphs: [
        "Enquiries that do not lead to a project are kept for up to two years after our last contact, then deleted. Client records are kept for the length of the engagement and afterwards for as long as legal, tax and accounting rules require.",
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      paragraphs: [
        `Depending on where you live, you may have the right to access, correct or delete your personal information, to object to or restrict how we use it, to receive a copy in a portable format, and to withdraw consent. To make a request, email ${email}. We will respond within one month, and we will not treat you differently for exercising your rights.`,
      ],
      bullets: [
        "United Kingdom — you can also complain to the Information Commissioner's Office (ICO).",
        "United States — residents of California and other states with privacy laws can request access, correction and deletion; we do not sell or share personal information for targeted advertising.",
        "Canada — under PIPEDA you can request access to and correction of your information, and complain to the Office of the Privacy Commissioner of Canada.",
        "United Arab Emirates — under the Personal Data Protection Law you can request access, correction and erasure, and object to certain processing.",
      ],
    },
    {
      id: "children",
      heading: "Children",
      paragraphs: [
        "This website is intended for businesses and is not directed at children. We do not knowingly collect personal information from children under 16; if you believe a child has contacted us, email us and we will delete their information.",
      ],
    },
    {
      id: "security",
      heading: "Security",
      paragraphs: [
        "We use appropriate technical and organisational measures to protect personal information, including encrypted connections (HTTPS) and limiting access to the people who need it. No method of transmission or storage is completely secure, but we work to protect your information and will act promptly if a problem occurs.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      paragraphs: ["We will update this page when our practices change and show the date of the latest version at the top."],
    },
  ],
};

export const termsOfUse: LegalDoc = {
  path: "/terms",
  title: "Terms of Use",
  updated: LEGAL_UPDATED,
  intro: `These terms govern your use of this website, operated by ${name}. By using the site you agree to them. Project work for clients is covered separately by a written agreement.`,
  sections: [
    {
      id: "about-the-site",
      heading: "About this website",
      paragraphs: [
        "This website describes our services and how we work. Its content is general information, not professional advice, and it does not form an offer or a contract.",
        "Case studies marked as concept work are illustrative and do not represent named clients. Outputs of the scope estimator are indicative only and are not a quote.",
      ],
    },
    {
      id: "project-work",
      heading: "Project work",
      paragraphs: [
        "Any project we carry out is governed by a written proposal or agreement that sets out the scope, price, timeline and ownership of the work. If those documents conflict with anything on this website, they take priority.",
      ],
    },
    {
      id: "ai-assistant",
      heading: "Our AI assistant",
      paragraphs: [
        "The chat assistant on this site generates answers automatically. Its replies may be incomplete or inaccurate and are not commitments from us — please confirm anything important, including prices and timelines, directly with our team.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      paragraphs: [
        `The content of this website — including its text, design, graphics, interface mockups and code — belongs to ${name} or is used with permission. You may view and share pages for personal or internal business use, but you may not copy, republish or reuse the content commercially without our written permission.`,
      ],
    },
    {
      id: "acceptable-use",
      heading: "Acceptable use",
      paragraphs: ["When using this website, you agree not to:"],
      bullets: [
        "attempt to gain unauthorised access to the site, its servers or related systems;",
        "disrupt the site, for example by overloading it or introducing malicious code;",
        "use the AI assistant to generate unlawful, abusive or misleading content;",
        "use the site in any way that breaks applicable law.",
      ],
    },
    {
      id: "third-party-links",
      heading: "Links to other websites",
      paragraphs: [
        "This website links to third-party sites, such as regulators and messaging services. We are not responsible for their content or how they handle your information.",
      ],
    },
    {
      id: "disclaimer",
      heading: "No warranties",
      paragraphs: [
        "We work to keep this website accurate and available, but we provide it as it is and cannot guarantee that it will always be complete, current or free of errors or interruptions.",
      ],
    },
    {
      id: "liability",
      heading: "Limitation of liability",
      paragraphs: [
        "To the extent the law allows, we are not liable for any indirect or consequential loss arising from your use of this website. Nothing in these terms limits liability that cannot legally be limited, or affects rights you have as a consumer under the law of your country.",
      ],
    },
    {
      id: "governing-law",
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of Pakistan, and the courts of Lahore have jurisdiction over any dispute about them, without affecting any mandatory protections given to you by the law of the country where you live.",
      ],
    },
    {
      id: "changes",
      heading: "Changes and contact",
      paragraphs: [
        `We may update these terms from time to time; the latest version is always on this page. Questions about these terms can be sent to ${email}.`,
      ],
    },
  ],
};
