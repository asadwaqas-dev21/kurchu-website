import type { BlogPost } from "../blog";

export const ukGdprChecklist: BlogPost = {
  slug: "uk-gdpr-checklist-for-mobile-apps",
  title: "UK GDPR checklist for mobile apps: 12 things to get right",
  excerpt:
    "A practical UK GDPR and PECR checklist for founders building a mobile app — from lawful basis and consent to third-party SDKs, retention and user rights.",
  category: "Compliance",
  date: "2026-10-08",
  readTime: "9 min read",
  image: "/blog/uk-gdpr-checklist.svg",
  imageAlt: "Illustration of a mobile app protected by a shield and a checklist",
  keywords: ["UK GDPR mobile app", "GDPR app checklist", "PECR app consent", "app privacy UK", "ICO Children's Code"],
  summary:
    "To make a mobile app UK GDPR-compliant, map the personal data it collects, choose a lawful basis for each purpose, collect only what you need, get valid consent for non-essential tracking under PECR, vet every third-party SDK, set retention periods, secure data in transit and at rest, and make access, correction and deletion requests easy to fulfil.",
  takeaways: [
    "UK GDPR applies if you offer an app to people in the UK, wherever you are based.",
    "Most analytics and advertising SDKs need consent before they run.",
    "Apple and Google both expect users to be able to delete their account.",
    "Health data and children's apps carry extra obligations.",
    "Design privacy in from the first sprint — retrofitting it is slow and costly.",
  ],
  sections: [
    {
      heading: "Does UK GDPR apply to my app?",
      paragraphs: [
        "If your app processes personal data about people in the United Kingdom — names, emails, location, device identifiers, health information — UK GDPR and the Data Protection Act 2018 almost certainly apply, even if your company is based elsewhere and you are offering the app to UK users.",
        "Alongside them, the Privacy and Electronic Communications Regulations (PECR) govern storing or reading information on a user's device, which covers most analytics and advertising SDKs, and the rules for marketing by email, text and push. This article is practical guidance, not legal advice; your final sign-off should come from a qualified adviser.",
      ],
    },
    {
      heading: "What is on the 12-point UK GDPR checklist for apps?",
      paragraphs: ["Work through these before launch, and revisit them whenever you add a feature or SDK:"],
      table: {
        caption: "UK GDPR checklist for mobile apps",
        headers: ["#", "Checkpoint", "What good looks like"],
        rows: [
          ["1", "Map your data", "A list of every piece of personal data, where it comes from, where it goes and why"],
          ["2", "Lawful basis", "A documented lawful basis for each purpose, such as contract, consent or legitimate interests"],
          ["3", "Data minimisation", "No fields or permissions collected 'just in case'"],
          ["4", "Consent for tracking", "Analytics and ad SDKs wait for an opt-in, with no pre-ticked boxes"],
          ["5", "Privacy information", "A clear privacy notice in the app and store listing, written in plain English"],
          ["6", "Third-party SDKs", "Each SDK reviewed for what it collects and who receives it"],
          ["7", "Permissions in context", "Location, camera and contacts requested only when the feature needs them"],
          ["8", "Retention", "Defined retention periods, with automatic deletion when they expire"],
          ["9", "Security", "Encryption in transit and at rest, plus role-based access to production data"],
          ["10", "User rights", "Simple ways to access, correct, export and delete data, including in-app account deletion"],
          ["11", "International transfers", "Safeguards in place for processors outside the UK"],
          ["12", "DPIA", "A data protection impact assessment for high-risk processing"],
        ],
      },
    },
    {
      heading: "Do I need consent for analytics in my app?",
      paragraphs: [
        "In most cases, yes. Under PECR, reading or storing information on a device needs consent unless it is strictly necessary to provide the service the user asked for. Crash reporting may qualify in some setups, but behavioural analytics and advertising SDKs generally do not. Recent UK reforms have introduced limited exemptions for some low-risk analytics, so check the ICO's current guidance before relying on one.",
        "In practice, that means your app should initialise those SDKs only after the user opts in, remember their choice, and make it easy to change later.",
      ],
    },
    {
      heading: "What extra rules apply to children's apps?",
      paragraphs: [
        "If your app is likely to be used by under-18s, the ICO's Age Appropriate Design Code — often called the Children's Code — applies. It expects high-privacy settings by default, geolocation switched off unless essential, no nudging children to share more data, and age-appropriate explanations. It applies to services likely to be accessed by children, not only apps designed for them.",
      ],
    },
    {
      heading: "How should apps handle health and financial data?",
      paragraphs: [
        "Health data is special category data, which needs both a lawful basis and an additional condition under UK GDPR, plus stronger security and usually a DPIA. Financial apps face overlapping obligations from the FCA. For both, keep sensitive data out of analytics, push notification text and logs, restrict who can access it, and record every access to it.",
      ],
    },
    {
      heading: "How do App Store and Google Play rules fit in?",
      bullets: [
        "Apple's privacy labels and Google Play's Data safety section must match what your app and its SDKs actually collect.",
        "Apps that let users create an account must also let them delete it — Apple requires this in the app, and Google Play requires an in-app route and a web link.",
        "Apple requires apps to ask permission before tracking users across other companies' apps and websites.",
      ],
      paragraphs: ["Store requirements overlap with UK GDPR and are enforced at review time:"],
    },
    {
      heading: "What are the most common UK GDPR mistakes in apps?",
      bullets: [
        "Analytics or ad SDKs that start collecting data before consent is given.",
        "Location or contact permissions requested at first launch, with no clear reason.",
        "No way to delete an account without emailing support.",
        "A privacy policy copied from another business that does not match what the app does.",
        "Personal data in logs, crash reports or push notification text.",
      ],
      paragraphs: ["The issues we most often find when auditing existing apps are:"],
    },
    {
      heading: "How does Kurchu build for UK GDPR?",
      paragraphs: [
        "We design the data model, consent flows and retention rules around UK GDPR and PECR from the first sprint, review every SDK before it is added, and document data flows for your privacy notice and DPIA. Your legal adviser makes the final call; we make sure they have accurate, complete technical information to do it.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does UK GDPR apply if my company is outside the UK?",
      a: "Usually yes, if you offer your app to people in the United Kingdom or monitor their behaviour, for example through analytics. UK GDPR follows the people whose data you process, not where your company is registered. Businesses outside the UK may also need to appoint a UK representative in some circumstances, so check the ICO's guidance or ask a qualified adviser.",
    },
    {
      q: "Is UK GDPR the same as EU GDPR?",
      a: "They are very similar, because UK GDPR was based on the EU regulation, but they are now separate laws with separate regulators and they can diverge over time. If your app serves users in both the UK and the European Union, you may need to comply with both. In practice, a well-designed privacy approach usually satisfies the core requirements of each.",
    },
    {
      q: "Do I need a Data Protection Impact Assessment for my app?",
      a: "You need one when processing is likely to result in high risk to people, which often applies to apps handling health data, precise location, children's data, large-scale tracking or innovative technology. A DPIA records what data you process, the risks and how you reduce them. Even when it is not mandatory, it is a useful exercise during discovery and design.",
    },
    {
      q: "Must my app let users delete their account?",
      a: "If users can create an account in your app, both Apple and Google expect them to be able to delete it. Apple requires account deletion to be available inside the app, and Google Play requires an in-app route plus a web link. Deletion should remove the associated personal data, except records you must keep for legal reasons, and the process should be clear.",
    },
    {
      q: "How long can my app keep personal data?",
      a: "UK GDPR does not set fixed periods; it requires you to keep personal data no longer than necessary for the purpose you collected it for. Decide a retention period for each type of data, record why, and delete or anonymise it automatically when the period ends. Legal and tax rules may require you to keep some records, such as invoices, for longer.",
    },
  ],
  relatedLinks: [
    { href: "/locations/uk", label: "App development for UK businesses" },
    { href: "/privacy", label: "How Kurchu handles your data" },
    { href: "/technology", label: "Our engineering and security standards" },
  ],
};
