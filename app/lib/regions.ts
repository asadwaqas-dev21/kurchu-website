/** ──────────────────────────────────────────────
 *  Target markets.
 *
 *  Each market gets one landing page at /locations/<slug>. The four pages are
 *  regional variants of each other and are linked with hreflang
 *  (en-GB / en-US / en-CA / en-AE), with /locations as x-default.
 *
 *  Laws, time zones and payment providers below are general facts. Lines that
 *  describe how Kurchu works (call hours, invoicing currency) are business
 *  commitments — confirm them before publishing.
 * ──────────────────────────────────────────────*/

export type Region = {
  slug: string;
  /** Full country name, e.g. "United Kingdom". */
  name: string;
  /** Short form used in copy, e.g. "UK". */
  short: string;
  /** BCP 47 tag for hreflang and the page's lang attribute. */
  hreflang: string;
  ogLocale: string;
  /** ISO 3166-1 alpha-2, for structured data. */
  countryCode: string;
  currency: string;
  cities: string[];
  /** Headline privacy law and interface languages, for the comparison table. */
  privacyLaw: string;
  languages: string;
  seo: { title: string; description: string };
  hero: { eyebrow: string; lines: [string, string, string]; lede: string; meta: [string, string, string] };
  timeZone: { zone: string; difference: string; callWindow: string };
  compliance: string[];
  /** Official regulators / guidance, cited on the page. */
  sources: Array<{ label: string; url: string }>;
  payments: string[];
  localisation: string[];
  faqs: Array<{ q: string; a: string }>;
};

export const regions: Region[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    short: "UK",
    hreflang: "en-GB",
    ogLocale: "en_GB",
    countryCode: "GB",
    sources: [{ label: "Information Commissioner's Office (ICO)", url: "https://ico.org.uk/" }],
    currency: "GBP",
    privacyLaw: "UK GDPR & Data Protection Act 2018",
    languages: "English (British)",
    cities: ["London", "Manchester", "Birmingham", "Edinburgh"],
    seo: {
      title: "Mobile App Development Company for UK Businesses | Kurchu",
      description:
        "iOS and Android app development for UK businesses — UK GDPR-ready builds, UK payment integrations and calls inside UK business hours.",
    },
    hero: {
      eyebrow: "Mobile app development · United Kingdom",
      lines: ["Mobile apps", "designed and built", "for UK businesses."],
      lede: "A senior product team for founders and operators in London, Manchester and across the UK — building to UK GDPR from day one, integrating the payment rails your customers use, and meeting inside your working day.",
      meta: ["Calls inside UK business hours", "UK GDPR & PECR-ready builds", "Proposals priced in GBP"],
    },
    timeZone: {
      zone: "GMT / BST",
      difference: "Lahore is 5 hours ahead of the UK in winter and 4 hours ahead during British Summer Time.",
      callWindow: "Calls, demos and stand-ups are scheduled between 9:00 and 17:00 UK time.",
    },
    compliance: [
      "UK GDPR and the Data Protection Act 2018 — lawful basis, data minimisation and retention built into the data model",
      "PECR-compliant cookie consent and marketing permissions",
      "The ICO Children's Code for apps likely to be used by under-18s",
      "Consumer Duty-friendly journeys for FCA-regulated fintech products",
    ],
    payments: ["Stripe and Apple Pay / Google Pay", "GoCardless Direct Debit", "Open Banking payments and account data", "Xero and Sage accounting integrations"],
    localisation: ["British English copy, dates and currency formats", "WCAG 2.2 AA accessibility, in line with the Equality Act 2010", "VAT-aware pricing and receipts"],
    faqs: [
      {
        q: "Can you work during UK business hours?",
        a: "Yes. Lahore is five hours ahead of the UK in winter and four hours ahead during British Summer Time, so our afternoon and evening cover your entire working day. Calls, demos and stand-ups are booked in UK time, and work continues in our morning, so updates and fresh builds are often waiting for you before your own day even starts.",
      },
      {
        q: "Will my app comply with UK GDPR?",
        a: "We design the data model, consent flows and retention rules around UK GDPR and PECR from the first sprint, collect only the data the product genuinely needs, and document every data flow for your privacy notice and records. Final legal sign-off should still come from your own adviser, because we are engineers rather than lawyers, but they will receive clear documentation.",
      },
      {
        q: "Do you integrate UK payment providers?",
        a: "Yes. We integrate Stripe, Apple Pay and Google Pay for card payments, GoCardless for Direct Debit and subscriptions, and Open Banking for account-to-account payments and bank data. Accounting can sync automatically with Xero or Sage, so invoices and payments reconcile without manual work. We recommend the right combination during discovery, based on your customers, margins and how they prefer to pay.",
      },
      {
        q: "Can you build apps for FCA-regulated fintech products?",
        a: "Yes. We design fintech journeys with Consumer Duty in mind: clear pricing, plain-language disclosures, strong customer authentication and complete audit trails. We integrate regulated partners such as Open Banking providers or e-money institutions rather than holding customer funds ourselves. Regulatory approval and final sign-off stay with your firm and its compliance advisers, supported by the technical documentation we provide throughout the build.",
      },
      {
        q: "How do you make apps accessible for UK users?",
        a: "We design and test to WCAG 2.2 AA, which supports your duties under the Equality Act 2010. That means sufficient colour contrast, scalable text, clear focus states and every control labelled for VoiceOver and TalkBack. Accessibility is checked in design reviews and again on real devices before release, because fixing it at the end costs far more than building it in.",
      },
      {
        q: "Can you take over an app built by another UK agency?",
        a: "Yes. We start with a fixed-price, two-week audit of the code, architecture, infrastructure and user experience, then give you a prioritised report of what to keep, fix or rebuild. We favour incremental improvement over risky rewrites, so your app keeps serving customers throughout. Access to repositories, store accounts and cloud services is transferred into your own accounts as part of the handover.",
      },
    ],
  },
  {
    slug: "usa",
    name: "United States",
    short: "US",
    hreflang: "en-US",
    ogLocale: "en_US",
    countryCode: "US",
    sources: [
      { label: "California Privacy Protection Agency", url: "https://cppa.ca.gov/" },
      { label: "HHS — HIPAA", url: "https://www.hhs.gov/hipaa/" },
      { label: "Federal Trade Commission", url: "https://www.ftc.gov/" },
    ],
    currency: "USD",
    privacyLaw: "CCPA / CPRA and state privacy laws; HIPAA for health",
    languages: "English (American)",
    cities: ["New York", "San Francisco", "Austin", "Chicago"],
    seo: {
      title: "Mobile App Development Company for US Businesses | Kurchu",
      description:
        "iOS and Android app development for US startups and businesses — CCPA- and HIPAA-aware builds, US payment integrations and overlap with US hours.",
    },
    hero: {
      eyebrow: "Mobile app development · United States",
      lines: ["Mobile apps", "designed and built", "for US businesses."],
      lede: "A senior product team for founders and operators from New York to San Francisco — building with US privacy and accessibility law in mind, integrating the payment stack US customers expect, and meeting at the start of your day.",
      meta: ["Morning overlap with US time zones", "CCPA, HIPAA & COPPA-aware builds", "Proposals priced in USD"],
    },
    timeZone: {
      zone: "ET / CT / MT / PT",
      difference:
        "Lahore is 9–10 hours ahead of US Eastern time and 12–13 hours ahead of Pacific time, depending on daylight saving.",
      callWindow: "Calls and demos are scheduled in your morning, US time; progress is ready when your day starts.",
    },
    compliance: [
      "CCPA / CPRA and other state privacy laws — data inventories, opt-outs and deletion flows",
      "HIPAA-aware architecture for apps that handle protected health information",
      "COPPA consent flows for apps directed at children under 13",
      "ADA expectations met through WCAG 2.2 AA accessibility",
    ],
    payments: ["Stripe, Apple Pay and Google Pay", "ACH payments and bank linking via Plaid", "Subscriptions with App Store and Google Play billing", "QuickBooks accounting integration"],
    localisation: ["American English copy, date and number formats", "Sales-tax-aware pricing and receipts", "Accessibility tested with VoiceOver and TalkBack"],
    faqs: [
      {
        q: "How do you work with US time zones?",
        a: "Lahore is nine to ten hours ahead of US Eastern time and twelve to thirteen hours ahead of Pacific time, depending on daylight saving. We hold calls and demos in your morning, then keep working through your night. Most US clients find new progress, answered questions and a fresh build waiting for them when their working day begins, which keeps projects moving quickly.",
      },
      {
        q: "Can you build HIPAA-compliant apps?",
        a: "We build HIPAA-aware architecture: encryption in transit and at rest, audit logs, role-based access controls, and hosting on cloud providers that will sign a Business Associate Agreement. Protected health information is kept out of analytics and push notifications. Formal compliance sign-off remains with your compliance lead or counsel, and we provide the technical documentation they need to review it with confidence.",
      },
      {
        q: "Do you handle US payments and subscriptions?",
        a: "Yes. We integrate Stripe, Apple Pay and Google Pay for cards, ACH transfers and bank linking through Plaid, and in-app subscriptions through App Store and Google Play billing with server-side receipt validation. Sales-tax-aware pricing and receipts can be included, and accounting can sync with QuickBooks. We help you choose the mix that balances fees, conversion and how your customers prefer to pay.",
      },
      {
        q: "How do you reduce ADA accessibility risk in apps?",
        a: "We design and test to WCAG 2.2 AA, the standard most often referenced in US accessibility complaints and settlements. Every screen gets sufficient contrast, scalable text, logical focus order and labelled controls for VoiceOver and TalkBack. Accessibility is reviewed during design and verified on real devices before each release, and we document the results so your legal team can see what was tested.",
      },
      {
        q: "Can you build apps that are used by children?",
        a: "Yes. For apps directed at children under 13, we design around COPPA from the start: verifiable parental consent, collecting only the data the app genuinely needs, no behavioural advertising, and clear deletion on request. Third-party SDKs are reviewed for what they collect, because analytics and ad tools are a common source of violations. Final compliance sign-off should come from your counsel.",
      },
      {
        q: "Can you work alongside our in-house US engineering team?",
        a: "Yes. Through our dedicated team model we join your rituals, tools and code review process, working in your repositories under your engineering standards. Calls happen in your morning, and work continues through your night, so your team often starts the day with reviewed pull requests waiting. You can scale our involvement up or down monthly as your roadmap and hiring plans change.",
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    short: "Canada",
    hreflang: "en-CA",
    ogLocale: "en_CA",
    countryCode: "CA",
    sources: [
      { label: "Office of the Privacy Commissioner of Canada", url: "https://www.priv.gc.ca/" },
      { label: "Commission d'accès à l'information du Québec", url: "https://www.cai.gouv.qc.ca/" },
    ],
    currency: "CAD",
    privacyLaw: "PIPEDA; Quebec Law 25",
    languages: "English and French",
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary"],
    seo: {
      title: "Mobile App Development Company for Canadian Businesses | Kurchu",
      description:
        "iOS and Android app development for Canadian businesses — PIPEDA and Quebec Law 25-ready builds, English–French apps and Canadian payments.",
    },
    hero: {
      eyebrow: "Mobile app development · Canada",
      lines: ["Mobile apps", "designed and built", "for Canadian businesses."],
      lede: "A senior product team for founders and operators in Toronto, Vancouver, Montreal and beyond — building to Canadian privacy law, planning English and French from the first wireframe, and integrating Canadian payment rails.",
      meta: ["Overlap with Eastern & Pacific time", "PIPEDA & Quebec Law 25-ready", "English–French localisation"],
    },
    timeZone: {
      zone: "ET / PT",
      difference:
        "Lahore is 9–10 hours ahead of Toronto and Montreal, and 12–13 hours ahead of Vancouver, depending on daylight saving.",
      callWindow: "Calls and demos are scheduled in your morning; progress is ready when your day starts.",
    },
    compliance: [
      "PIPEDA — consent, purpose limitation and access requests designed into the product",
      "Quebec Law 25 — privacy impact assessments, consent and data-transfer records",
      "Provincial health privacy rules such as Ontario's PHIPA for health apps",
      "CASL-compliant consent for marketing email and SMS",
    ],
    payments: ["Interac and Moneris", "Stripe, Apple Pay and Google Pay", "Subscriptions with App Store and Google Play billing", "GST/HST-aware pricing and receipts"],
    localisation: ["English and French interfaces, with French ready for Quebec users", "Canadian English spelling, dates and currency formats", "Accessibility aligned with the AODA and WCAG 2.2 AA"],
    faqs: [
      {
        q: "Can you build bilingual English–French apps?",
        a: "Yes. We plan English and French from the first wireframe: layouts that accommodate longer French strings, translated app store listings, and a content workflow your team can maintain without developers. Quebec users get a complete French experience rather than a partial translation, which matters under Quebec's French-language rules. Both languages are tested on real devices before every release, not just checked in a spreadsheet.",
      },
      {
        q: "How do you handle PIPEDA and Quebec Law 25?",
        a: "Consent, data minimisation, access requests and deletion are designed into the product from the start rather than added just before launch. We document every data flow and third-party processor to support your privacy impact assessment, which Quebec's Law 25 requires in many cases. Legal sign-off should come from your own counsel, but they will receive clear documentation to review rather than guesswork.",
      },
      {
        q: "Which Canadian payment methods do you integrate?",
        a: "We integrate Interac and Moneris alongside Stripe, Apple Pay and Google Pay, so Canadian customers can pay the way they already prefer. Subscriptions can run through App Store and Google Play billing with receipt validation, and pricing and receipts are GST/HST-aware. During discovery we recommend the combination that best balances processing fees, checkout conversion and the reporting your finance team needs.",
      },
      {
        q: "Do your apps meet Canadian accessibility requirements?",
        a: "We design and test to WCAG 2.2 AA, which aligns with the AODA in Ontario and the Accessible Canada Act for federally regulated organisations. That covers colour contrast, scalable text, focus order and labelled controls for VoiceOver and TalkBack, in both English and French. Accessibility is checked during design and again on real devices before every release, then documented for your records.",
      },
      {
        q: "How do you handle CASL for marketing email and SMS?",
        a: "Marketing consent is captured explicitly, with a record of when and how each person agreed, and every commercial email or SMS identifies your business and includes a working unsubscribe. Transactional messages such as receipts and password resets are kept separate from marketing, so users never lose essential notifications by opting out. Your counsel should confirm the final consent wording before launch.",
      },
      {
        q: "How do you work across Toronto and Vancouver time zones?",
        a: "Lahore is nine to ten hours ahead of Eastern time and twelve to thirteen hours ahead of Pacific time, depending on daylight saving. For teams spread across both coasts, we schedule calls in the Pacific morning, which is midday in Toronto and our evening. Written updates and fresh builds arrive overnight, so both offices start their day with something new to review.",
      },
    ],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    short: "UAE",
    hreflang: "en-AE",
    ogLocale: "en_AE",
    countryCode: "AE",
    sources: [
      { label: "UAE Government portal", url: "https://u.ae/" },
      { label: "DIFC", url: "https://www.difc.ae/" },
      { label: "ADGM", url: "https://www.adgm.com/" },
    ],
    currency: "AED",
    privacyLaw: "UAE PDPL; DIFC and ADGM rules in free zones",
    languages: "Arabic and English (right-to-left)",
    cities: ["Dubai", "Abu Dhabi", "Sharjah"],
    seo: {
      title: "Mobile App Development Company in Dubai & the UAE | Kurchu",
      description:
        "iOS and Android app development for UAE businesses — Arabic and right-to-left apps, UAE PDPL-ready builds and local payment gateways.",
    },
    hero: {
      eyebrow: "Mobile app development · United Arab Emirates",
      lines: ["Mobile apps", "designed and built", "for UAE businesses."],
      lede: "A senior product team for founders and operators in Dubai, Abu Dhabi and across the Emirates — Arabic and right-to-left from day one, built for UAE data protection law, and just one hour ahead of your working day.",
      meta: ["Only 1 hour from UAE time", "Arabic & right-to-left built in", "Proposals priced in AED or USD"],
    },
    timeZone: {
      zone: "GST (UTC+4)",
      difference: "Lahore is just 1 hour ahead of the UAE, with no daylight-saving changes on either side.",
      callWindow: "Our working day overlaps almost all of yours, Monday to Friday.",
    },
    compliance: [
      "UAE PDPL (Federal Decree-Law No. 45 of 2021) — consent, data-subject rights and breach handling",
      "DIFC and ADGM data protection rules for free-zone companies",
      "UAE hosting for health data and other sectors with data-residency rules",
      "UAE PASS sign-in for products that need verified identity",
    ],
    payments: ["Network International, Telr and PayTabs", "Apple Pay and Google Pay", "Tabby and Tamara buy-now-pay-later", "VAT-aware pricing and receipts"],
    localisation: ["Arabic and English with full right-to-left layouts", "Arabic typography, numerals and date formats done properly", "App Store and Google Play listings in both languages"],
    faqs: [
      {
        q: "Do you build Arabic and right-to-left apps?",
        a: "Yes. Right-to-left layouts, Arabic typography and bilingual content are designed in from the first wireframe rather than bolted on at the end. Icons, navigation and animations are mirrored correctly, Arabic numerals and dates are handled properly, and store listings are prepared in both languages. Every release is tested in Arabic and English on real devices before it reaches your customers.",
      },
      {
        q: "Which UAE payment gateways do you integrate?",
        a: "We integrate local gateways such as Network International, Telr and PayTabs, alongside Apple Pay and Google Pay, which are widely used across the Emirates. Buy-now-pay-later options such as Tabby and Tamara can be added for higher-value purchases, and pricing and receipts are VAT-aware. During discovery we recommend the combination that best suits your customers, your average order value and your settlement needs.",
      },
      {
        q: "How do you handle UAE data protection?",
        a: "We design consent, data-subject rights and breach handling around the UAE Personal Data Protection Law, or around DIFC and ADGM rules if your company is registered in those free zones. Where sector rules require data to stay in the country, such as health information, we host it in the UAE. Legal sign-off should come from your adviser, supported by our documentation.",
      },
      {
        q: "Can you integrate UAE PASS sign-in?",
        a: "Yes. UAE PASS is the national digital identity, and integration requires your organisation to be onboarded with the UAE PASS programme first. Once you are approved, we implement the sign-in flow, map the verified identity attributes your product needs, and design a fallback for users without an account. The result is faster onboarding and stronger identity checks for regulated services.",
      },
      {
        q: "Can the app show Hijri dates and Arabic numerals?",
        a: "Yes. Dates, times and numbers are formatted through the platform's localisation libraries rather than hard-coded, so the app can show Hijri or Gregorian dates and Arabic-Indic or Western digits according to the user's settings and language. Currency, phone numbers and addresses follow UAE conventions too. Everything is tested in both Arabic and English before release, on real iOS and Android devices.",
      },
      {
        q: "Can you take over an app built by another UAE agency?",
        a: "Yes. We begin with a fixed-price, two-week audit of the code, architecture, hosting and user experience, including how well Arabic and right-to-left layouts actually work. You receive a prioritised plan of what to keep, fix or rebuild. We favour incremental improvement over risky rewrites, and all repositories, store listings and cloud accounts are moved into your own ownership during the handover.",
      },
    ],
  },
];

export function getRegion(slug: string) {
  return regions.find((region) => region.slug === slug);
}

export const regionPath = (region: Region) => `/locations/${region.slug}`;

/** The market as it reads mid-sentence: "the UK", "the US", "Canada", "the UAE". */
export const regionPhrase = (region: Region) => (region.slug === "canada" ? "Canada" : `the ${region.short}`);

/** "UK, USA, Canada and UAE" — for meta descriptions and copy. */
export const marketsSentence = "the UK, USA, Canada and UAE";

/**
 * hreflang map shared by every market page: each lists all four variants plus
 * x-default, which is required for Google to trust the annotations.
 */
export function regionLanguageAlternates(): Record<string, string> {
  return {
    ...Object.fromEntries(regions.map((region) => [region.hreflang, regionPath(region)])),
    "x-default": "/locations",
  };
}
