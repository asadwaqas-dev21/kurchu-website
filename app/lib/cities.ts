/** ──────────────────────────────────────────────
 *  City pages — one per city inside each target market, at
 *  /locations/<region>/<city>.
 *
 *  Every city carries its own local context, laws, integrations and FAQs, so
 *  each page answers questions specific to that city instead of repeating the
 *  market page with the name swapped (which Google treats as doorway pages).
 *
 *  Kurchu is based in Lahore and works with these cities remotely — the copy
 *  says so plainly. Laws, regulators and time differences are general facts;
 *  lines about how Kurchu works are business commitments to confirm.
 * ──────────────────────────────────────────────*/
import { getRegion, type Region } from "./regions";

export type City = {
  slug: string;
  name: string;
  /** Slug of the parent market in lib/regions.ts. */
  region: string;
  /** Search phrases the page is written to answer; also emitted as meta keywords. */
  keywords: string[];
  seo: { title: string; description: string };
  hero: { lede: string; meta: [string, string, string] };
  timeZone: { zone: string; difference: string; callWindow: string };
  /** One or two sentences on what makes building apps here different. */
  context: string;
  /** Answer-first summary: a self-contained paragraph answer engines can quote. */
  answer: string;
  /** App types typical for the city's sectors — unique, long-tail content per page. */
  appIdeas: Array<{ title: string; desc: string }>;
  sectors: string[];
  rules: string[];
  integrations: string[];
  /** Official regulators / guidance, cited on the page. */
  sources: Array<{ label: string; url: string }>;
  faqs: Array<{ q: string; a: string }>;
};

/** The usual search phrasings for app development in a city. */
const searchTerms = (city: string) => [
  `app development company in ${city}`,
  `mobile app development ${city}`,
  `app developers in ${city}`,
  `iOS app development ${city}`,
  `Android app development ${city}`,
  `Flutter app development ${city}`,
  `app development cost in ${city}`,
];

const MID_FIVE_FIGURES =
  "focused MVPs typically start in the mid five figures, while full platforms with several apps and an admin panel run into six";

export const cities: City[] = [
  // ── United Kingdom ──────────────────────────────
  {
    slug: "london",
    name: "London",
    region: "uk",
    keywords: [...searchTerms("London"), "fintech app developers London"],
    seo: {
      title: "App Development Company in London | iOS & Android | Kurchu",
      description:
        "Mobile app developers for London startups and businesses — iOS, Android and Flutter apps built to UK GDPR and FCA expectations, with calls in London hours.",
    },
    hero: {
      lede: "A senior remote product team for London founders and operators — fintech, retail and professional-services apps built to UK GDPR, with calls and demos inside London working hours.",
      meta: ["Calls in London business hours", "UK GDPR & FCA-aware builds", "Proposals priced in GBP"],
    },
    timeZone: {
      zone: "GMT / BST",
      difference: "Lahore is 5 hours ahead of London in winter and 4 hours ahead during British Summer Time.",
      callWindow: "Calls, demos and stand-ups are booked between 9:00 and 17:00 London time.",
    },
    context:
      "London is Europe's largest fintech hub and home to the UK's banks, insurers and retail headquarters, so apps built here are often regulated, payment-heavy and judged against polished consumer products from launch day.",
    answer:
      "Kurchu Software Solutions builds iOS, Android and Flutter apps for London businesses from Lahore, Pakistan, four to five hours ahead of the UK. Most London products are fintech, retail or professional-services apps, so UK GDPR, FCA Consumer Duty and Open Banking are planned in from the first sprint, proposals are priced in GBP, and the client owns every line of code.",
    appIdeas: [
      { title: "Open Banking money app", desc: "Account aggregation, budgeting and account-to-account payments through an FCA-authorised provider, with strong customer authentication built in." },
      { title: "Restaurant ordering and loyalty", desc: "Order-ahead, table booking and points for multi-site hospitality groups, with Apple Pay checkout in a couple of taps." },
      { title: "Tenant and lettings app", desc: "Viewings, maintenance requests with photos, rent reminders and documents in one place for agents and their tenants." },
    ],
    sectors: ["Fintech, banking and insurtech", "Retail, e-commerce and hospitality", "Property and proptech", "Professional and B2B services"],
    rules: [
      "UK GDPR and the Data Protection Act 2018",
      "FCA Consumer Duty for regulated financial products",
      "PECR for cookies, push and marketing consent",
      "The ICO Children's Code for apps likely to be used by under-18s",
    ],
    integrations: ["Open Banking payments and account data", "Stripe, Apple Pay and Google Pay", "GoCardless Direct Debit", "Xero accounting sync"],
    sources: [
      { label: "Information Commissioner's Office (ICO)", url: "https://ico.org.uk/" },
      { label: "Financial Conduct Authority (FCA)", url: "https://www.fca.org.uk/" },
    ],
    faqs: [
      {
        q: "Are you an app development company in London?",
        a: "Not physically — the team works from Lahore, Pakistan. In winter, 9:00–17:00 in London is 14:00–22:00 in Lahore; during British Summer Time it is 13:00–21:00. Your whole office day sits inside ours, so stand-ups, design reviews and quick questions happen live, and overnight testing means a checked build is often waiting at 9am. Proposals and invoices are in GBP.",
      },
      {
        q: "How much does app development cost in London?",
        a: `Central-London agencies charge some of the highest day rates in the UK. With us, ${MID_FIVE_FIGURES}. For London fintech, the biggest cost drivers are Open Banking integration, strong customer authentication and the audit trail regulators expect, so we price those as separate line items. You get a fixed GBP price for the first phase after a short discovery call.`,
      },
      {
        q: "Can you build an Open Banking app for a London fintech?",
        a: "Yes. We integrate FCA-authorised Open Banking providers for account data and account-to-account payments rather than connecting to banks directly, which keeps your regulatory scope smaller. Journeys are designed with Consumer Duty in mind: clear pricing, plain-language disclosures, strong customer authentication and full audit trails. Regulatory approval stays with your firm and its compliance advisers.",
      },
    ],
  },
  {
    slug: "manchester",
    name: "Manchester",
    region: "uk",
    keywords: [...searchTerms("Manchester"), "e-commerce app developers Manchester"],
    seo: {
      title: "Mobile App Development Manchester | E-commerce Apps | Kurchu",
      description:
        "Mobile app developers for Manchester businesses — e-commerce, media and health apps for iOS and Android, built to UK GDPR with calls in UK hours.",
    },
    hero: {
      lede: "A senior remote product team for Manchester's e-commerce brands, media companies and health-tech startups — iOS and Android apps built to UK GDPR, with calls inside your working day.",
      meta: ["Calls in UK business hours", "E-commerce & retail apps", "Proposals priced in GBP"],
    },
    timeZone: {
      zone: "GMT / BST",
      difference: "Lahore is 5 hours ahead of Manchester in winter and 4 hours ahead during British Summer Time.",
      callWindow: "Calls, demos and stand-ups are booked between 9:00 and 17:00 UK time.",
    },
    context:
      "Manchester has the UK's largest digital and tech cluster outside London, anchored by MediaCityUK in Salford, with major online fashion and e-commerce brands and a growing health and life-sciences sector.",
    answer:
      "Kurchu Software Solutions designs and builds mobile apps for Manchester's online retailers, media companies and health-tech teams, working remotely from Lahore, Pakistan. Apps connect to the commerce and content systems you already run, such as Shopify, are built to UK GDPR and PECR, and ship with buy-now-pay-later and courier tracking where customers expect them.",
    appIdeas: [
      { title: "Fashion drop and wishlist app", desc: "Early access to drops, size-aware wishlists and push alerts when stock returns, synced with your Shopify catalogue." },
      { title: "Subscription content app", desc: "Video, audio or articles behind an in-app subscription, with offline downloads and App Store and Google Play billing." },
      { title: "Patient self-management app", desc: "Symptom diaries, appointment reminders and secure messaging, built to the areas NHS organisations assess under DTAC." },
    ],
    sectors: ["E-commerce and online fashion retail", "Media, broadcasting and digital content", "Health and life sciences", "Logistics and B2B operations"],
    rules: [
      "UK GDPR and the Data Protection Act 2018",
      "PECR for cookies, push and marketing consent",
      "Consumer Contracts Regulations for online sales and cancellation rights",
      "NHS DTAC assessment for apps used by NHS organisations in England",
    ],
    integrations: ["Shopify and headless commerce back ends", "Klarna and Clearpay buy-now-pay-later", "Stripe, Apple Pay and Google Pay", "Courier tracking from Royal Mail, DPD and Evri"],
    sources: [
      { label: "Information Commissioner's Office (ICO)", url: "https://ico.org.uk/" },
      { label: "NHS Digital Technology Assessment Criteria (DTAC)", url: "https://transform.england.nhs.uk/key-tools-and-info/digital-technology-assessment-criteria-dtac/" },
    ],
    faqs: [
      {
        q: "Do you have developers in Manchester?",
        a: "No — our developers are in Lahore, Pakistan, and work with Manchester remotely. A typical rhythm is a fifteen-minute stand-up at 10:00 UK time, which is mid-afternoon in Lahore, a shared Slack or Teams channel through the day, and a demo of the latest build every Friday. You always talk to the senior people building your app, never a go-between.",
      },
      {
        q: "How much does a retail app cost to build in Manchester?",
        a: `With us, ${MID_FIVE_FIGURES}. For a retail app, cost depends mostly on how much it shares with your existing store: reading products and orders from Shopify is quick, while custom loyalty rules, returns flows or a headless rebuild add weeks. We price each of those separately, in GBP, so you can launch lean and add the rest later.`,
      },
      {
        q: "We already sell on Shopify. Do we need a mobile app?",
        a: "Not always. An app pays off when customers buy repeatedly — fashion drops, subscriptions, loyalty programmes — because push notifications, saved payment details and faster checkout lift repeat orders. If most customers buy once a year, your mobile website is usually the better investment. We connect the app to your existing Shopify catalogue, so stock, prices and orders stay in one place either way.",
      },
      {
        q: "Can you build a health app that NHS organisations can use?",
        a: "Yes. NHS organisations in England assess digital tools against the Digital Technology Assessment Criteria (DTAC), which covers clinical safety, data protection, technical security, interoperability and accessibility. We build to those areas and produce the technical documentation the assessment asks for. Clinical safety sign-off under DCB0129 needs a qualified clinical safety officer on your side.",
      },
    ],
  },
  {
    slug: "birmingham",
    name: "Birmingham",
    region: "uk",
    keywords: [...searchTerms("Birmingham"), "field service app development Birmingham"],
    seo: {
      title: "App Developers in Birmingham | Field & ERP Apps | Kurchu",
      description:
        "Mobile app developers for Birmingham and West Midlands businesses — field-service, operations and customer apps for iOS and Android, built to UK GDPR.",
    },
    hero: {
      lede: "A senior remote product team for Birmingham and West Midlands businesses — operations and field-service apps that work offline, connect to your existing systems and meet UK GDPR.",
      meta: ["Calls in UK business hours", "Offline-first field apps", "Proposals priced in GBP"],
    },
    timeZone: {
      zone: "GMT / BST",
      difference: "Lahore is 5 hours ahead of Birmingham in winter and 4 hours ahead during British Summer Time.",
      callWindow: "Calls, demos and stand-ups are booked between 9:00 and 17:00 UK time.",
    },
    context:
      "Birmingham is the UK's second-largest city and the centre of the West Midlands' manufacturing and automotive supply chain, with a large professional and financial services sector and one of Europe's youngest populations.",
    answer:
      "Kurchu Software Solutions builds operations, field-service and customer apps for Birmingham and West Midlands businesses, working remotely from Lahore, Pakistan. Field apps are offline-first, connect to ERPs such as SAP Business One or Microsoft Dynamics and to Xero or Sage, and are built to UK GDPR — with proposals in GBP and full code ownership.",
    appIdeas: [
      { title: "Field-service job app", desc: "Job sheets, checklists, photos and customer signatures that work without signal and sync back to the office automatically." },
      { title: "Warehouse and stock app", desc: "Barcode and QR scanning for goods-in, picking and stock counts on ordinary phones or rugged scanners." },
      { title: "Apprentice training app", desc: "Course modules, sign-offs and evidence uploads for apprentices and assessors, with progress dashboards for managers." },
    ],
    sectors: ["Manufacturing and automotive supply chain", "Professional and financial services", "Logistics, construction and field service", "Education and training"],
    rules: [
      "UK GDPR and the Data Protection Act 2018",
      "PECR for cookies, push and marketing consent",
      "Making Tax Digital-compatible accounting integrations",
      "WCAG 2.2 AA accessibility, in line with the Equality Act 2010",
    ],
    integrations: ["Offline-first sync for field and warehouse teams", "ERP links to SAP Business One and Microsoft Dynamics", "Xero and Sage accounting", "Barcode, QR and photo capture"],
    sources: [
      { label: "Information Commissioner's Office (ICO)", url: "https://ico.org.uk/" },
      { label: "HMRC — Making Tax Digital", url: "https://www.gov.uk/government/collections/making-tax-digital" },
    ],
    faqs: [
      {
        q: "Are you a Birmingham app development company?",
        a: "We are a Lahore-based team working remotely with Birmingham and the West Midlands. For field and warehouse apps we keep in sync with recorded walkthroughs on real devices and a weekly test build your own staff can try on the shop floor or on site. Lahore is four to five hours ahead, so feedback sent in the morning is usually fixed the same day.",
      },
      {
        q: "What does a field-service app cost in Birmingham?",
        a: `With us, ${MID_FIVE_FIGURES}. For field and warehouse apps, the cost is driven less by screens than by integration: two-way sync with your ERP, offline conflict handling and the number of user roles. We confirm what your systems support during discovery and give you a fixed GBP price for the first phase.`,
      },
      {
        q: "Can you build an app for field engineers that works without signal?",
        a: "Yes. Field apps are built offline-first: job sheets, checklists, photos and signatures are saved on the device and sync automatically when a connection returns, with conflict handling so two people editing the same job never overwrite each other. That suits factories, construction sites and rural visits where coverage is patchy, and engineers never lose work because of a dropped signal.",
      },
      {
        q: "Can the app connect to our ERP or accounting system?",
        a: "Usually, yes. We have patterns for SAP Business One, Microsoft Dynamics, Xero and Sage, and can work with most systems that offer an API or a reliable export. The app talks to a small back end of ours that handles the integration, so a change in your ERP never breaks the app on people's phones. We confirm what your system supports during discovery, before quoting.",
      },
    ],
  },
  {
    slug: "edinburgh",
    name: "Edinburgh",
    region: "uk",
    keywords: [...searchTerms("Edinburgh"), "app developers Scotland"],
    seo: {
      title: "App Development Company in Edinburgh & Scotland | Kurchu",
      description:
        "Mobile app developers for Edinburgh and Scottish businesses — iOS and Android apps for financial services, tourism and university spin-outs, built to UK GDPR.",
    },
    hero: {
      lede: "A senior remote product team for Edinburgh's financial firms, tourism businesses and university spin-outs — iOS and Android apps built to UK GDPR and ready for festival-season traffic.",
      meta: ["Calls in UK business hours", "Financial-services grade security", "Proposals priced in GBP"],
    },
    timeZone: {
      zone: "GMT / BST",
      difference: "Lahore is 5 hours ahead of Edinburgh in winter and 4 hours ahead during British Summer Time.",
      callWindow: "Calls, demos and stand-ups are booked between 9:00 and 17:00 UK time.",
    },
    context:
      "Edinburgh is one of the UK's largest financial centres outside London, home to asset managers, insurers and banks, alongside a strong university-led data and software scene and a tourism economy that peaks every August.",
    answer:
      "Kurchu Software Solutions builds iOS and Android apps for Edinburgh's financial firms, tourism businesses and university spin-outs, working remotely from Lahore, Pakistan. Scotland follows the same UK GDPR as the rest of the UK, so apps are built to it, to FCA expectations where relevant, and on hosting that scales for the August festival peak.",
    appIdeas: [
      { title: "Investor and client portal app", desc: "Holdings, statements and secure messaging for asset managers, with multi-factor sign-in and full audit logs." },
      { title: "Festival and events app", desc: "Programmes, tickets and venue maps that still open on overloaded networks, with favourites and live changes." },
      { title: "Research data-collection app", desc: "Structured surveys, photos and sensor readings for university projects, with consent records and secure export." },
    ],
    sectors: ["Asset management, insurance and banking", "Fintech, data and AI spin-outs", "Tourism, festivals and hospitality", "Universities and research"],
    rules: [
      "UK GDPR — Scotland follows the same data protection law as the rest of the UK",
      "FCA Consumer Duty for regulated financial products",
      "PECR for cookies, push and marketing consent",
      "Public Sector Bodies Accessibility Regulations for apps used by public bodies",
    ],
    integrations: ["Open Banking payments and account data", "Ticketing and booking integrations", "Stripe, Apple Pay and Google Pay", "Auto-scaling hosting for seasonal traffic peaks"],
    sources: [
      { label: "Information Commissioner's Office (ICO)", url: "https://ico.org.uk/" },
      { label: "Financial Conduct Authority (FCA)", url: "https://www.fca.org.uk/" },
    ],
    faqs: [
      {
        q: "Do you work with businesses in Edinburgh and Scotland?",
        a: "Yes, from Lahore, Pakistan. For financial-services clients in Edinburgh, the practical question is usually governance rather than distance: we work in your repositories and cloud accounts, under your access controls, so you can revoke access at any time and audit every change. Lahore is four to five hours ahead, so calls fall comfortably inside your working day.",
      },
      {
        q: "How much does an app cost for an Edinburgh financial firm?",
        a: `With us, ${MID_FIVE_FIGURES}. Financial-services apps cost more than consumer apps of the same size because of security work: multi-factor sign-in, encryption, penetration-test fixes and audit logging. We list those items separately in the GBP proposal so your risk team can see exactly what is included.`,
      },
      {
        q: "Does Scottish law change how my app handles personal data?",
        a: "Not for data protection: it is reserved to Westminster, so UK GDPR and the Data Protection Act 2018 apply in Scotland exactly as in England. Contract and consumer law can differ under Scots law, so your terms of use and any subscription wording should be reviewed by a Scottish solicitor. We build the consent, privacy and cancellation flows; they confirm the legal text.",
      },
      {
        q: "Can the app cope with festival-season traffic?",
        a: "Yes. Ticketing, booking and visitor apps are built on hosting that scales automatically, with caching and load tests run at several times your expected August peak before launch. Busy screens such as listings and timetables are cached on the device, so they still open on overloaded mobile networks around venues. You pay for the extra capacity only while it is used.",
      },
    ],
  },

  // ── United States ───────────────────────────────
  {
    slug: "new-york",
    name: "New York",
    region: "usa",
    keywords: [...searchTerms("New York"), "app development company NYC", "fintech app developers New York"],
    seo: {
      title: "App Development Company in New York (NYC) | Kurchu",
      description:
        "Mobile app developers for New York startups and businesses — iOS, Android and Flutter apps for fintech, media and retail, with calls in your morning.",
    },
    hero: {
      lede: "A senior remote product team for New York founders and operators — fintech, media and retail apps built with the SHIELD Act and US accessibility law in mind, with calls at the start of your day.",
      meta: ["Calls in your morning, ET", "SHIELD Act & NYDFS-aware", "Proposals priced in USD"],
    },
    timeZone: {
      zone: "ET",
      difference: "Lahore is 10 hours ahead of New York in winter and 9 hours ahead during daylight saving time.",
      callWindow: "Calls and demos are held in your morning, New York time; work continues through your night.",
    },
    context:
      "New York is the US centre of finance, media, retail and fashion, so apps here are often payment-heavy, handle sensitive financial data and launch to some of the most demanding consumer audiences in the world.",
    answer:
      "Kurchu Software Solutions builds iOS, Android and Flutter apps for New York startups and companies, working remotely from Lahore, Pakistan, nine to ten hours ahead of Eastern time. New York products are often fintech, media or retail, so apps are built with the SHIELD Act, NYDFS cybersecurity rules and WCAG 2.2 AA accessibility in mind, priced in USD.",
    appIdeas: [
      { title: "Investing and wealth app", desc: "Portfolio views, transfers through Plaid and ACH, and disclosures written to be read, for brokerages and advisers." },
      { title: "Direct-to-consumer shopping app", desc: "Product drops, Apple Pay checkout and personalised recommendations for New York fashion and beauty brands." },
      { title: "Residential building app", desc: "Amenity booking, package alerts, guest passes and maintenance requests for property managers and residents." },
    ],
    sectors: ["Fintech, banking and insurance", "Media and publishing", "Retail, fashion and direct-to-consumer brands", "Real estate and proptech"],
    rules: [
      "New York SHIELD Act — reasonable security safeguards and breach notification",
      "NYDFS Cybersecurity Regulation (23 NYCRR 500) for licensed financial firms",
      "Other state privacy laws for users outside New York, such as California's CCPA / CPRA",
      "ADA expectations met through WCAG 2.2 AA accessibility",
    ],
    integrations: ["Plaid bank linking and ACH payments", "Stripe, Apple Pay and Google Pay", "Shopify and headless commerce", "QuickBooks accounting sync"],
    sources: [
      { label: "New York Attorney General — data security", url: "https://ag.ny.gov/" },
      { label: "NY Department of Financial Services", url: "https://www.dfs.ny.gov/" },
    ],
    faqs: [
      {
        q: "Are you an app development company in New York?",
        a: "We are a Lahore-based team working remotely with New York. A call from 9:00 to 12:00 in New York is 19:00 to 22:00 in Lahore in winter and 18:00 to 21:00 in summer, so we meet at the start of your day and build through your night. Most mornings you find answered questions and a fresh build waiting. Proposals are in USD.",
      },
      {
        q: "How much does it cost to build an app in New York?",
        a: `New York agency rates are among the highest in the US. With us, ${MID_FIVE_FIGURES}. For regulated New York companies, budget separately for the evidence compliance teams ask for — access reviews, encryption details and secure-development records — which we list as its own line in the USD proposal.`,
      },
      {
        q: "Can you build apps for NYDFS-regulated companies?",
        a: "Yes. For banks, insurers and other firms licensed by the New York Department of Financial Services, we build to the controls 23 NYCRR 500 expects: multi-factor authentication, encryption, access controls, audit logging and documented secure development. Your CISO and compliance team own the cybersecurity programme and certification; we supply the technical evidence for the parts we build.",
      },
    ],
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    region: "usa",
    keywords: [...searchTerms("San Francisco"), "app developers Bay Area", "AI app development San Francisco"],
    seo: {
      title: "San Francisco App Development | Bay Area Startups | Kurchu",
      description:
        "Mobile app developers for San Francisco and Bay Area startups — iOS, Android and AI-powered apps built to CCPA, with overnight progress on your roadmap.",
    },
    hero: {
      lede: "A senior remote product team for San Francisco and Bay Area startups — MVPs and AI-powered apps built to CCPA / CPRA, with work moving forward while you sleep.",
      meta: ["Calls in your morning, PT", "CCPA / CPRA-ready builds", "Proposals priced in USD"],
    },
    timeZone: {
      zone: "PT",
      difference: "Lahore is 13 hours ahead of San Francisco in winter and 12 hours ahead during daylight saving time.",
      callWindow: "Calls are held in your morning, Pacific time; the next build arrives overnight.",
    },
    context:
      "San Francisco and the Bay Area are the centre of US venture-backed software and AI, so founders here usually need to ship quickly, learn from real users and show investors a working product rather than slides.",
    answer:
      "Kurchu Software Solutions builds MVPs and AI-powered mobile apps for San Francisco and Bay Area startups, working remotely from Lahore, Pakistan, twelve to thirteen hours ahead of Pacific time — so work moves forward overnight. Apps are built to CCPA / CPRA and CalOPPA, typically reach the stores in 12–16 weeks, and all code belongs to the founders.",
    appIdeas: [
      { title: "AI assistant MVP", desc: "A chat or voice assistant grounded in your own content, with cost caps, fallbacks and evaluation tests from the first release." },
      { title: "Two-sided marketplace MVP", desc: "Listings, search, booking and payouts with Stripe Connect, scoped to prove one core metric before your raise." },
      { title: "Digital health app", desc: "Symptom tracking, care plans and clinician messaging on HIPAA-aware architecture with a signed BAA from the host." },
    ],
    sectors: ["AI and SaaS startups", "Consumer and marketplace apps", "Digital health", "Climate and mobility"],
    rules: [
      "CCPA / CPRA — notices, opt-outs, deletion and sensitive-data limits",
      "CalOPPA — a conspicuous privacy policy for apps used by Californians",
      "HIPAA-aware architecture for apps handling protected health information",
      "COPPA consent flows for apps directed at children under 13",
    ],
    integrations: ["LLM features with OpenAI, Anthropic or on-device models", "Stripe, Apple Pay and Google Pay", "Plaid bank linking", "Product analytics and A/B testing"],
    sources: [
      { label: "California Privacy Protection Agency", url: "https://cppa.ca.gov/" },
      { label: "California Attorney General — privacy", url: "https://oag.ca.gov/privacy" },
    ],
    faqs: [
      {
        q: "Do you work with San Francisco startups?",
        a: "Yes, remotely from Lahore, Pakistan. An 8:00–10:00 call in San Francisco is 21:00–23:00 in Lahore in winter and 20:00–22:00 in summer, after which we keep building while you sleep. For a startup that turns a 24-hour clock into a feature: you review in the morning, we ship overnight, and the loop runs every day.",
      },
      {
        q: "How much does an MVP cost for a San Francisco startup?",
        a: `With us, ${MID_FIVE_FIGURES}. If your MVP includes AI features, budget for ongoing model usage as well as the build — we set per-user cost caps and choose between hosted and on-device models so usage costs stay predictable. The first phase is a fixed USD price, agreed after a short discovery call.`,
      },
      {
        q: "Can you add AI features to our app?",
        a: "Yes. We build features such as chat assistants, search over your own content, summarisation and image understanding, using hosted models from OpenAI or Anthropic, or on-device models when privacy or cost matters. We design for failure too: rate limits, fallbacks, cost caps and evaluation tests, so the feature behaves predictably for real users, not just in a demo.",
      },
      {
        q: "Can you get an MVP ready before our next fundraise?",
        a: "Most MVPs take 12–16 weeks from discovery to store launch. If a raise is planned, we work back from the date: the first installable build arrives early, analytics are in from the first release, and the scope is cut to what proves your core metric. Investors see a live product with real usage data, not a prototype.",
      },
    ],
  },
  {
    slug: "austin",
    name: "Austin",
    region: "usa",
    keywords: [...searchTerms("Austin"), "app developers Texas"],
    seo: {
      title: "App Development Company in Austin, Texas | Kurchu",
      description:
        "Mobile app developers for Austin and Texas businesses — iOS, Android and Flutter apps built to the Texas Data Privacy and Security Act, with morning calls.",
    },
    hero: {
      lede: "A senior remote product team for Austin startups and Texas businesses — iOS and Android apps built to Texas privacy and biometric law, with calls at the start of your day.",
      meta: ["Calls in your morning, CT", "Texas TDPSA-ready builds", "Proposals priced in USD"],
    },
    timeZone: {
      zone: "CT",
      difference: "Lahore is 11 hours ahead of Austin in winter and 10 hours ahead during daylight saving time.",
      callWindow: "Calls and demos are held in your morning, Central time; work continues through your night.",
    },
    context:
      "Austin is one of the fastest-growing US tech hubs, with a large startup community and major tech employers, set inside a Texas economy that is strong in consumer brands, health care and energy.",
    answer:
      "Kurchu Software Solutions builds iOS and Android apps for Austin startups and Texas businesses, working remotely from Lahore, Pakistan, ten to eleven hours ahead of Central time. Apps are built to the Texas Data Privacy and Security Act and Texas's biometric law (CUBI), use on-device biometrics wherever possible, and are priced in USD.",
    appIdeas: [
      { title: "Fitness and lifestyle subscription app", desc: "Workouts, habit tracking and community features with App Store and Google Play subscriptions and Apple Health or Health Connect sync." },
      { title: "Home-services booking app", desc: "Instant quotes, scheduling, live technician tracking and card-on-file payments for cleaning, repair and outdoor services." },
      { title: "Energy site inspection app", desc: "Offline inspection forms, GPS-tagged photos and defect reports for crews working across rural Texas." },
    ],
    sectors: ["Startups and SaaS", "Consumer and lifestyle apps", "Health tech", "Energy and field services"],
    rules: [
      "Texas Data Privacy and Security Act (TDPSA), in force since July 2024",
      "Texas biometric law (CUBI) for face, fingerprint or voice features",
      "CCPA / CPRA and other state laws for users outside Texas",
      "ADA expectations met through WCAG 2.2 AA accessibility",
    ],
    integrations: ["Stripe, Apple Pay and Google Pay", "Plaid bank linking", "Maps, GPS and route tracking", "QuickBooks accounting sync"],
    sources: [{ label: "Texas Attorney General — privacy", url: "https://www.texasattorneygeneral.gov/consumer-protection" }],
    faqs: [
      {
        q: "Are you an Austin app development company?",
        a: "No — we are based in Lahore, Pakistan, and work with Austin remotely. An 8:00–11:00 call in Austin is 19:00–22:00 in Lahore in winter and 18:00–21:00 in summer. We meet early in your day, then keep building through your night, so feedback you give on Monday morning is usually in a test build by Tuesday morning.",
      },
      {
        q: "How much does app development cost in Austin?",
        a: `With us, ${MID_FIVE_FIGURES}. In Texas, two features often change the budget: subscriptions, which need server-side receipt checks and a paywall you can test, and any biometric feature beyond the phone's own Face ID, which needs consent and retention flows under CUBI. We price both separately in USD.`,
      },
      {
        q: "What does the Texas Data Privacy and Security Act mean for my app?",
        a: "Since July 2024, the TDPSA gives Texans rights to access, correct, delete and opt out of the sale of their data, and requires consent before processing sensitive data such as health or precise location. We build the privacy notice links, rights-request flows and consent screens into the app, and keep a record of what data goes where. Your counsel confirms the final wording.",
      },
      {
        q: "Our app uses face or fingerprint login. Is that a problem in Texas?",
        a: "Using the phone's built-in Face ID, Touch ID or Android biometrics is low risk: the biometric stays on the device and the app only receives a yes or no. Capturing faces, fingerprints or voiceprints yourself is different — Texas's CUBI law requires informing users and getting consent first, and limits how long the data is kept. We design for the on-device approach wherever it works.",
      },
    ],
  },
  {
    slug: "chicago",
    name: "Chicago",
    region: "usa",
    keywords: [...searchTerms("Chicago"), "app developers Illinois"],
    seo: {
      title: "App Development Company in Chicago | iOS & Android | Kurchu",
      description:
        "Mobile app developers for Chicago businesses — logistics, healthcare and financial apps for iOS and Android, built with Illinois BIPA in mind.",
    },
    hero: {
      lede: "A senior remote product team for Chicago businesses — logistics, healthcare and financial apps that connect to your enterprise systems and respect Illinois's strict biometric privacy law.",
      meta: ["Calls in your morning, CT", "BIPA-aware builds", "Proposals priced in USD"],
    },
    timeZone: {
      zone: "CT",
      difference: "Lahore is 11 hours ahead of Chicago in winter and 10 hours ahead during daylight saving time.",
      callWindow: "Calls and demos are held in your morning, Central time; work continues through your night.",
    },
    context:
      "Chicago is a centre for trading, insurance, logistics and healthcare, and headquarters city for many large US companies, so apps here often need to plug into existing enterprise systems rather than stand alone.",
    answer:
      "Kurchu Software Solutions builds logistics, healthcare and financial apps for Chicago companies, working remotely from Lahore, Pakistan. Chicago apps usually plug into enterprise systems — Okta or Microsoft Entra ID sign-in, Salesforce, ERPs, telematics — and are designed around Illinois's BIPA, one of the strictest biometric privacy laws in the US.",
    appIdeas: [
      { title: "Driver and dispatch app", desc: "Route assignment, proof of delivery with photos and signatures, and live ETAs fed from your telematics platform." },
      { title: "Employee app with single sign-on", desc: "Shift schedules, policies, approvals and announcements behind Okta or Microsoft Entra ID, with no extra passwords." },
      { title: "Multi-location restaurant app", desc: "Ordering, loyalty and catering requests for restaurant groups, connected to your point-of-sale system." },
    ],
    sectors: ["Trading and financial services", "Logistics and transport", "Healthcare and insurance", "Food, hospitality and retail"],
    rules: [
      "Illinois Biometric Information Privacy Act (BIPA) — written consent before collecting biometrics",
      "Illinois Personal Information Protection Act — breach notification",
      "HIPAA-aware architecture for apps handling protected health information",
      "ADA expectations met through WCAG 2.2 AA accessibility",
    ],
    integrations: ["Single sign-on with Okta or Microsoft Entra ID", "Salesforce and ERP integrations", "Fleet, telematics and shipment tracking APIs", "Stripe, Apple Pay and Plaid"],
    sources: [{ label: "Illinois Attorney General — privacy", url: "https://illinoisattorneygeneral.gov/" }],
    faqs: [
      {
        q: "Do you have a team in Chicago?",
        a: "No — our team is in Lahore, Pakistan, and works with Chicago remotely. An 8:00–11:00 call in Chicago is 19:00–22:00 in Lahore in winter and 18:00–21:00 in summer. For enterprise clients we join your existing tools — Jira, Teams or Slack, your Git host — and work under your single sign-on, so access is controlled and audited by your IT team.",
      },
      {
        q: "How much does an enterprise app cost in Chicago?",
        a: `With us, ${MID_FIVE_FIGURES}. Enterprise apps cost more because of what sits behind them: single sign-on, role-based access, and integrations with Salesforce, an ERP or a telematics platform. Each integration is scoped and priced on its own in the USD proposal after we have seen your systems' documentation.`,
      },
      {
        q: "How do you handle BIPA if our app uses biometrics?",
        a: "Illinois's BIPA is one of the strictest biometric laws in the US, with private lawsuits allowed. Where possible we use the phone's built-in Face ID or fingerprint unlock, where the biometric never leaves the device. If your product must capture faces, fingerprints or voiceprints itself, we build written consent, a published retention policy and deletion into the flow — reviewed by your counsel before launch.",
      },
      {
        q: "Can the app connect to our existing enterprise systems?",
        a: "Yes. Most Chicago clients need the app to work with what they already run: single sign-on through Okta or Microsoft Entra ID, Salesforce, an ERP, or a fleet and telematics platform. The app talks to a small integration layer we build and host in your cloud, so changes in back-office systems never break the app in people's hands.",
      },
    ],
  },

  // ── Canada ──────────────────────────────────────
  {
    slug: "toronto",
    name: "Toronto",
    region: "canada",
    keywords: [...searchTerms("Toronto"), "app developers Ontario", "fintech app developers Toronto"],
    seo: {
      title: "App Development Company in Toronto | iOS & Android | Kurchu",
      description:
        "Mobile app developers for Toronto and Ontario businesses — fintech, health and retail apps for iOS and Android, built to PIPEDA, PHIPA and the AODA.",
    },
    hero: {
      lede: "A senior remote product team for Toronto founders and operators — fintech, health and retail apps built to PIPEDA, Ontario's PHIPA and the AODA, with calls in your morning.",
      meta: ["Calls in your morning, ET", "PIPEDA, PHIPA & AODA-ready", "Proposals priced in CAD"],
    },
    timeZone: {
      zone: "ET",
      difference: "Lahore is 10 hours ahead of Toronto in winter and 9 hours ahead during daylight saving time.",
      callWindow: "Calls and demos are held in your morning, Toronto time; work continues through your night.",
    },
    context:
      "Toronto is Canada's financial and technology centre, home to the big banks, a large fintech and AI ecosystem and one of the most multilingual populations in North America.",
    answer:
      "Kurchu Software Solutions builds fintech, health and retail apps for Toronto and Ontario businesses, working remotely from Lahore, Pakistan, nine to ten hours ahead of Eastern time. Apps follow PIPEDA, Ontario's PHIPA for health information and the AODA, integrate Interac and Moneris, and can be hosted in Canada — with proposals in CAD.",
    appIdeas: [
      { title: "Fintech onboarding app", desc: "Identity verification, bank-account linking through Flinks or Plaid and e-signature, built for Canadian KYC requirements." },
      { title: "Clinic booking app", desc: "Appointments, intake forms and reminders for Ontario clinics, with health data hosted in Canada under PHIPA." },
      { title: "Condo and real estate app", desc: "Listings, viewing requests, amenity booking and building notices for brokerages and condo managers." },
    ],
    sectors: ["Banking and fintech", "AI and SaaS", "Health tech", "Retail and real estate"],
    rules: [
      "PIPEDA — consent, purpose limitation and access requests",
      "Ontario's PHIPA for apps handling personal health information",
      "AODA accessibility, met through WCAG 2.2 AA",
      "CASL-compliant consent for marketing email and SMS",
    ],
    integrations: ["Interac and Moneris", "Bank-account linking through Flinks or Plaid", "Stripe, Apple Pay and Google Pay", "HST-aware pricing and receipts"],
    sources: [
      { label: "Office of the Privacy Commissioner of Canada", url: "https://www.priv.gc.ca/" },
      { label: "Information and Privacy Commissioner of Ontario", url: "https://www.ipc.on.ca/" },
    ],
    faqs: [
      {
        q: "Are you an app development company in Toronto?",
        a: "We are a Lahore-based team working with Toronto remotely. A 9:00–12:00 call in Toronto is 19:00–22:00 in Lahore in winter and 18:00–21:00 in summer. Canadian clients often ask where data lives: we deploy to Canadian cloud regions in your own account, while our team works on the code, not on copies of your customers' data.",
      },
      {
        q: "How much does it cost to build an app in Toronto?",
        a: `With us, ${MID_FIVE_FIGURES}. Toronto projects often add two cost items: Canadian data hosting with the access logging PHIPA expects for health apps, and Interac or Moneris alongside card payments. Both are priced separately in the CAD proposal, so you can see what compliance adds to the build.`,
      },
      {
        q: "Does my health app need to follow PHIPA?",
        a: "If your app collects, uses or discloses personal health information on behalf of Ontario health custodians such as clinics, hospitals or pharmacies, PHIPA applies, often alongside PIPEDA. We build encryption, access logs, consent records and Canadian data hosting into the architecture, and document data flows for your privacy assessment. Your privacy officer or counsel confirms how PHIPA applies to you.",
      },
      {
        q: "Does a Toronto app need to be available in French?",
        a: "Ontario has no general rule requiring private-sector apps to be in French. If you sell to customers in Quebec, though, Quebec's Charter of the French Language does require French, so many Toronto companies plan for it early. We build every app ready for a second language, so adding French later is a translation job rather than a redesign.",
      },
    ],
  },
  {
    slug: "vancouver",
    name: "Vancouver",
    region: "canada",
    keywords: [...searchTerms("Vancouver"), "app developers British Columbia"],
    seo: {
      title: "App Development Company in Vancouver, BC | Kurchu",
      description:
        "Mobile app developers for Vancouver and BC businesses — iOS and Android apps built to BC PIPA, with multilingual interfaces and overnight progress.",
    },
    hero: {
      lede: "A senior remote product team for Vancouver and British Columbia businesses — iOS and Android apps built to BC's privacy law, with multilingual interfaces and work moving forward while you sleep.",
      meta: ["Calls in your morning, PT", "BC PIPA-ready builds", "Proposals priced in CAD"],
    },
    timeZone: {
      zone: "PT",
      difference: "Lahore is 13 hours ahead of Vancouver in winter and 12 hours ahead during daylight saving time.",
      callWindow: "Calls are held in your morning, Pacific time; the next build arrives overnight.",
    },
    context:
      "Vancouver has one of Canada's strongest tech clusters, known for video games, visual effects and clean tech, with a large Asia-Pacific trade connection and big Chinese- and Punjabi-speaking communities.",
    answer:
      "Kurchu Software Solutions builds iOS and Android apps for Vancouver and British Columbia businesses, working remotely from Lahore, Pakistan, twelve to thirteen hours ahead of Pacific time. Apps are built to BC's Personal Information Protection Act, support multilingual interfaces including Chinese and Punjabi, and integrate Interac and Moneris, priced in CAD.",
    appIdeas: [
      { title: "Tour and outdoor booking app", desc: "Bookings, waivers and downloadable trail or tour maps that keep working in the mountains with no signal." },
      { title: "Sustainability tracking app", desc: "Carbon, energy or waste tracking for clean-tech companies and their customers, with clear charts and exportable reports." },
      { title: "Multilingual retail app", desc: "English, Chinese and Punjabi interfaces with matching store listings, push messages and customer support content." },
    ],
    sectors: ["Gaming and interactive media", "Clean tech and sustainability", "Tourism and outdoor recreation", "Retail and e-commerce"],
    rules: [
      "BC's Personal Information Protection Act (PIPA) for private-sector organisations in British Columbia",
      "PIPEDA when personal data crosses provincial or national borders",
      "CASL-compliant consent for marketing email and SMS",
      "WCAG 2.2 AA accessibility on every screen",
    ],
    integrations: ["Interac and Moneris", "Stripe, Apple Pay and Google Pay", "Multilingual interfaces, including Chinese and Punjabi", "Bookings, maps and location features"],
    sources: [
      { label: "Office of the Information and Privacy Commissioner for BC", url: "https://www.oipc.bc.ca/" },
      { label: "Office of the Privacy Commissioner of Canada", url: "https://www.priv.gc.ca/" },
    ],
    faqs: [
      {
        q: "Do you work with businesses in Vancouver?",
        a: "Yes, from Lahore, Pakistan. An 8:00–10:00 call in Vancouver is 21:00–23:00 in Lahore in winter and 20:00–22:00 in summer. That near-opposite clock means our full working day happens during your night, so a bug reported at the end of your day is often fixed and in a test build when you start the next morning.",
      },
      {
        q: "How much does a multilingual app cost in Vancouver?",
        a: `With us, ${MID_FIVE_FIGURES}. Each extra language adds translation, longer-string layout checks and testing on every release — non-Latin scripts such as Chinese or Gurmukhi need the most care. We price languages individually in CAD, so you can launch in English and add others as your audience grows.`,
      },
      {
        q: "Which privacy law applies to a BC business: PIPA or PIPEDA?",
        a: "For a private company handling customer data within British Columbia, BC's PIPA generally applies instead of PIPEDA. Once personal data crosses provincial or national borders in the course of business, PIPEDA applies to that part. Many apps are covered by both, so we design consent, access and deletion flows that satisfy each. Your counsel confirms which law governs your situation.",
      },
      {
        q: "Can the app support Chinese, Punjabi or other languages?",
        a: "Yes. Apps are built with every piece of text in translation files from day one, with layouts that handle longer strings and non-Latin scripts, including Simplified and Traditional Chinese and Punjabi in Gurmukhi script. Store listings can be localised too. We arrange professional translation or work with your own translators, and test each language on real devices.",
      },
    ],
  },
  {
    slug: "montreal",
    name: "Montreal",
    region: "canada",
    keywords: [...searchTerms("Montreal"), "app developers Quebec", "bilingual app development Montreal"],
    seo: {
      title: "App Development Company in Montreal, Quebec | Kurchu",
      description:
        "Mobile app developers for Montreal and Quebec businesses — French-first iOS and Android apps built to Quebec Law 25 and the Charter of the French Language.",
    },
    hero: {
      lede: "A senior remote product team for Montreal and Quebec businesses — French-first, bilingual apps built to Law 25 and the Charter of the French Language from the first wireframe.",
      meta: ["Calls in your morning, ET", "Quebec Law 25-ready", "French-first interfaces"],
    },
    timeZone: {
      zone: "ET",
      difference: "Lahore is 10 hours ahead of Montreal in winter and 9 hours ahead during daylight saving time.",
      callWindow: "Calls and demos are held in your morning, Montreal time; work continues through your night.",
    },
    context:
      "Montreal is a world centre for AI research and video games with a large startup community, and as Quebec's largest city it is where French-language rules and Quebec's Law 25 privacy requirements matter most.",
    answer:
      "Kurchu Software Solutions builds French-first, bilingual iOS and Android apps for Montreal and Quebec businesses, working remotely from Lahore, Pakistan. Apps are designed around Quebec's Law 25 and the Charter of the French Language as amended by Bill 96, with privacy-protective defaults, French at least as prominent as English, and Interac and Moneris payments.",
    appIdeas: [
      { title: "French-first ordering app", desc: "Ordering, loyalty and reservations for Montreal restaurants and cafés, with French as the default language and English one tap away." },
      { title: "AI feature for a SaaS product", desc: "A mobile companion to your SaaS with search, summaries or predictions, built to Law 25's transparency rules for automated decisions." },
      { title: "Quality inspection app", desc: "Checklists, photos and defect tracking for aerospace and manufacturing floors, with offline mode and audit trails." },
    ],
    sectors: ["AI and machine learning", "Gaming and creative tech", "Aerospace and manufacturing", "Retail and hospitality"],
    rules: [
      "Quebec Law 25 — privacy by default, consent and privacy impact assessments",
      "Charter of the French Language, as amended by Bill 96",
      "PIPEDA when personal data leaves Quebec in the course of business",
      "CASL-compliant consent for marketing email and SMS",
    ],
    integrations: ["Interac and Moneris", "Stripe, Apple Pay and Google Pay", "French-first app store listings", "QST/GST-aware pricing and receipts"],
    sources: [
      { label: "Commission d'accès à l'information du Québec", url: "https://www.cai.gouv.qc.ca/" },
      { label: "Office québécois de la langue française", url: "https://www.oqlf.gouv.qc.ca/" },
    ],
    faqs: [
      {
        q: "Are you a Montreal app development company?",
        a: "No — we are based in Lahore, Pakistan, and work with Montreal remotely. A 9:00–12:00 call in Montreal is 19:00–22:00 in Lahore in winter and 18:00–21:00 in summer. Project communication is in English; the app is planned French-first, and your team reviews the French copy in each test build before it reaches the stores.",
      },
      {
        q: "How much does a bilingual app cost in Montreal?",
        a: `With us, ${MID_FIVE_FIGURES}. A French-first app adds professional translation, layouts that fit longer French strings and a second round of testing per release, and Law 25 adds a privacy impact assessment before data leaves Quebec. We list both in the CAD proposal so nothing arrives as a surprise.`,
      },
      {
        q: "What does Quebec's Law 25 require from my app?",
        a: "Law 25 requires the most privacy-protective settings by default, clear consent for each purpose, a named person responsible for personal information, and a privacy impact assessment before personal data is transferred outside Quebec — which includes using cloud hosting or service providers elsewhere. We design the defaults and consent flows, and document data flows for your assessment. Legal sign-off stays with your counsel.",
      },
      {
        q: "Does my app have to be in French?",
        a: "If you offer it to consumers in Quebec, yes: the Charter of the French Language, strengthened by Bill 96, requires French to be available and at least as prominent as any other language, including in the interface, contracts and customer communications. We design French-first layouts that fit longer French strings, then add English, and test both on real devices.",
      },
    ],
  },
  {
    slug: "calgary",
    name: "Calgary",
    region: "canada",
    keywords: [...searchTerms("Calgary"), "app developers Alberta"],
    seo: {
      title: "App Development Company in Calgary, Alberta | Kurchu",
      description:
        "Mobile app developers for Calgary and Alberta businesses — field-service, energy and agtech apps for iOS and Android that work offline, built to Alberta PIPA.",
    },
    hero: {
      lede: "A senior remote product team for Calgary and Alberta businesses — energy, agtech and field-service apps that keep working on remote sites, built to Alberta's privacy law.",
      meta: ["Calls in your morning, MT", "Offline-first field apps", "Proposals priced in CAD"],
    },
    timeZone: {
      zone: "MT",
      difference: "Lahore is 12 hours ahead of Calgary in winter and 11 hours ahead during daylight saving time.",
      callWindow: "Calls and demos are held in your morning, Mountain time; the next build arrives overnight.",
    },
    context:
      "Calgary is the centre of Canada's energy industry and a fast-growing tech hub, with strengths in agriculture technology, logistics and field operations spread across rural Alberta.",
    answer:
      "Kurchu Software Solutions builds energy, agtech and field-service apps for Calgary and Alberta businesses, working remotely from Lahore, Pakistan, eleven to twelve hours ahead of Mountain time. Field apps are offline-first with downloadable maps, connect to asset-management and ERP systems, and follow Alberta's Personal Information Protection Act, priced in CAD.",
    appIdeas: [
      { title: "Well-site inspection app", desc: "Inspection forms, GPS-tagged photos and corrective-action tracking that work with no coverage and sync when back in range." },
      { title: "Farm management app", desc: "Field records, equipment logs and input tracking for Alberta farms, usable offline in the cab or the field." },
      { title: "Construction safety app", desc: "Hazard assessments, toolbox talks and incident reports with photo evidence and supervisor sign-off." },
    ],
    sectors: ["Energy and utilities", "Agtech and agriculture", "Logistics and field services", "Real estate and construction"],
    rules: [
      "Alberta's Personal Information Protection Act (PIPA) for private-sector organisations",
      "Alberta's Health Information Act for apps used by health custodians",
      "PIPEDA when personal data crosses provincial or national borders",
      "CASL-compliant consent for marketing email and SMS",
    ],
    integrations: ["Offline-first sync for remote and rural sites", "Maps, GPS and asset tracking", "Asset-management and ERP integrations", "Interac, Moneris and Stripe"],
    sources: [
      { label: "Office of the Information and Privacy Commissioner of Alberta", url: "https://oipc.ab.ca/" },
      { label: "Office of the Privacy Commissioner of Canada", url: "https://www.priv.gc.ca/" },
    ],
    faqs: [
      {
        q: "Do you work with businesses in Calgary?",
        a: "Yes, from Lahore, Pakistan. An 8:00–10:00 call in Calgary is 20:00–22:00 in Lahore in winter and 19:00–21:00 in summer. For field apps we test in conditions like yours — airplane mode, weak signal, gloves-on tap targets — and send short screen recordings of each build, so your crews can give feedback without joining calls.",
      },
      {
        q: "How much does a field app cost in Calgary?",
        a: `With us, ${MID_FIVE_FIGURES}. For field apps, offline sync with conflict handling, downloadable maps and integration with your asset-management system are the main cost drivers — the screens themselves are usually the smaller part. Each is scoped separately in the CAD proposal after discovery.`,
      },
      {
        q: "Can the app work on remote sites with no signal?",
        a: "Yes. Field apps are built offline-first: inspections, forms, photos, GPS points and signatures are stored on the device and sync automatically when the phone reconnects, with conflict handling so nobody overwrites anyone else's work. Maps can be downloaded in advance for areas with no coverage at all, which matters on well sites, farms and pipeline routes.",
      },
      {
        q: "Which privacy law applies to an Alberta business?",
        a: "For private companies handling personal information within Alberta, Alberta's PIPA generally applies instead of PIPEDA; PIPEDA covers data that crosses provincial or national borders in the course of business. Health information held by custodians such as clinics falls under Alberta's Health Information Act. We design consent, access and deletion flows that work under each, and your counsel confirms which applies.",
      },
    ],
  },

  // ── United Arab Emirates ────────────────────────
  {
    slug: "dubai",
    name: "Dubai",
    region: "uae",
    keywords: [...searchTerms("Dubai"), "Arabic app development Dubai", "real estate app development Dubai"],
    seo: {
      title: "App Development Company in Dubai | iOS & Android | Kurchu",
      description:
        "Mobile app developers for Dubai businesses — Arabic and English iOS, Android and Flutter apps, built to UAE PDPL and DIFC rules, just 1 hour from Dubai time.",
    },
    hero: {
      lede: "A senior remote product team for Dubai founders and operators — Arabic and English apps for real estate, retail, hospitality and fintech, only one hour ahead of your working day.",
      meta: ["Only 1 hour from Dubai time", "Arabic & right-to-left built in", "Proposals priced in AED or USD"],
    },
    timeZone: {
      zone: "GST (UTC+4)",
      difference: "Lahore is just 1 hour ahead of Dubai, with no daylight-saving changes on either side.",
      callWindow: "Our working day overlaps almost all of yours, Monday to Friday.",
    },
    context:
      "Dubai is the Middle East's main hub for real estate, retail, tourism, logistics and financial services, and most of its residents are expatriates — so apps here usually need Arabic and English from launch, and often more languages.",
    answer:
      "Kurchu Software Solutions builds Arabic and English iOS, Android and Flutter apps for Dubai businesses, working remotely from Lahore, Pakistan, just one hour ahead of Dubai. Dubai apps are usually real estate, retail, hospitality or fintech, so they are built right-to-left from day one, integrate local gateways and Tabby or Tamara, and follow the UAE PDPL or DIFC rules.",
    appIdeas: [
      { title: "Off-plan property app", desc: "Unit availability, payment-plan schedules, construction-progress updates and document storage for developers and their buyers." },
      { title: "E-commerce and delivery app", desc: "Arabic and English catalogue, Tabby or Tamara instalments, Apple Pay and live order tracking." },
      { title: "Holiday-home guest app", desc: "Digital check-in, house guides, upsells and messaging for holiday-home operators and boutique hotels." },
    ],
    sectors: ["Real estate and proptech", "Retail, e-commerce and delivery", "Hospitality and tourism", "Fintech and DIFC-registered firms"],
    rules: [
      "UAE PDPL (Federal Decree-Law No. 45 of 2021)",
      "DIFC Data Protection Law No. 5 of 2020 for DIFC-registered companies",
      "VARA rules for virtual-asset businesses in Dubai",
      "UAE health data law — health data hosted in the UAE",
    ],
    integrations: ["Network International, Telr and PayTabs", "Tabby and Tamara buy-now-pay-later", "Apple Pay and Google Pay", "UAE PASS sign-in"],
    sources: [
      { label: "DIFC — Data Protection", url: "https://www.difc.ae/" },
      { label: "Virtual Assets Regulatory Authority (VARA)", url: "https://www.vara.ae/" },
      { label: "UAE Government portal", url: "https://u.ae/" },
    ],
    faqs: [
      {
        q: "Are you an app development company in Dubai?",
        a: "Our team is in Lahore, Pakistan, and works with Dubai remotely. 9:00–18:00 in Dubai is 10:00–19:00 in Lahore all year round, because neither country changes its clocks, so our working days overlap almost completely. Calls, reviews and quick questions happen in real time, with proposals in AED or USD and full ownership of the code.",
      },
      {
        q: "How much does app development cost in Dubai?",
        a: `Dubai agency quotes vary widely with team size and overheads. With us, ${MID_FIVE_FIGURES}. A bilingual Arabic–English app costs more than an English-only one because every screen is designed, written and tested in both directions, so we show that as its own line in the AED or USD proposal.`,
      },
      {
        q: "Can you build an app for a DIFC-registered company?",
        a: "Yes. Companies registered in the DIFC follow the DIFC Data Protection Law No. 5 of 2020 rather than the federal PDPL, with its own rules on lawful processing, data-subject rights, breach notification and transfers outside the DIFC. We design consent, rights requests and audit logging around it and document data flows for your data protection officer. Legal sign-off stays with your adviser.",
      },
      {
        q: "Do you build crypto and virtual-asset apps in Dubai?",
        a: "We build the app and its integrations — wallets, custody partners, KYC providers and transaction screens — for businesses licensed by Dubai's Virtual Assets Regulatory Authority. VARA licensing and compliance stay with your company; we build to the controls your licence requires, such as strong authentication, audit trails and clear risk disclosures, and supply technical documentation for your compliance team.",
      },
    ],
  },
  {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    region: "uae",
    keywords: [...searchTerms("Abu Dhabi"), "Arabic app development Abu Dhabi"],
    seo: {
      title: "App Development Company in Abu Dhabi | Arabic Apps | Kurchu",
      description:
        "Mobile app developers for Abu Dhabi businesses — Arabic-first iOS and Android apps with UAE PASS, built to UAE PDPL and ADGM rules, 1 hour from UAE time.",
    },
    hero: {
      lede: "A senior remote product team for Abu Dhabi companies and startups — Arabic-first apps with UAE PASS sign-in and UAE hosting, built to the PDPL and ADGM's data rules.",
      meta: ["Only 1 hour from UAE time", "UAE PASS & Arabic-first", "Proposals priced in AED or USD"],
    },
    timeZone: {
      zone: "GST (UTC+4)",
      difference: "Lahore is just 1 hour ahead of Abu Dhabi, with no daylight-saving changes on either side.",
      callWindow: "Our working day overlaps almost all of yours, Monday to Friday.",
    },
    context:
      "Abu Dhabi is the UAE's capital, with a large government and semi-government sector, energy and industry, and a fast-growing startup scene around Hub71 and ADGM, its international financial centre.",
    answer:
      "Kurchu Software Solutions builds Arabic-first iOS and Android apps for Abu Dhabi companies, startups and health providers, working remotely from Lahore, Pakistan, one hour ahead of the UAE. Apps can use UAE PASS for verified sign-in, are hosted in UAE cloud regions where data must stay in the country, and follow the PDPL or ADGM's Data Protection Regulations.",
    appIdeas: [
      { title: "Verified-identity service app", desc: "UAE PASS sign-in, digital forms, document upload and application tracking for semi-government and regulated services." },
      { title: "Patient app with UAE hosting", desc: "Appointments, results and messaging for clinics, hosted in the UAE and built to Department of Health – Abu Dhabi standards." },
      { title: "Industrial maintenance app", desc: "Work orders, inspections and parts tracking for energy and industrial sites, with offline mode and audit logs." },
    ],
    sectors: ["Government and semi-government services", "Energy and industry", "Fintech and ADGM-registered firms", "Healthcare"],
    rules: [
      "UAE PDPL (Federal Decree-Law No. 45 of 2021)",
      "ADGM Data Protection Regulations 2021 for ADGM-registered companies",
      "Department of Health – Abu Dhabi standards for health data",
      "UAE health data law — health data hosted in the UAE",
    ],
    integrations: ["UAE PASS sign-in and verified identity", "Network International and Magnati", "Apple Pay and Google Pay", "UAE-region cloud hosting"],
    sources: [
      { label: "ADGM — Data Protection", url: "https://www.adgm.com/" },
      { label: "Department of Health – Abu Dhabi", url: "https://www.doh.gov.ae/" },
      { label: "UAE Government portal", url: "https://u.ae/" },
    ],
    faqs: [
      {
        q: "Do you work with companies in Abu Dhabi?",
        a: "Yes, remotely from Lahore, Pakistan. 9:00–17:00 in Abu Dhabi is 10:00–18:00 in Lahore, every day of the year. For organisations with procurement or security requirements, we work inside your own cloud tenancy and repositories, under your access policies, and provide the technical documentation your security and compliance teams ask for.",
      },
      {
        q: "How much does app development cost in Abu Dhabi?",
        a: `With us, ${MID_FIVE_FIGURES}. In Abu Dhabi, UAE PASS integration and UAE-hosted infrastructure are the usual extra items, and UAE PASS onboarding with the programme also affects the timeline, so we plan around its approval. Each is priced separately in AED or USD.`,
      },
      {
        q: "Can you build an app for an ADGM-registered company?",
        a: "Yes. Companies registered in ADGM follow the ADGM Data Protection Regulations 2021 rather than the federal PDPL, closely modelled on the EU GDPR. We design lawful-basis records, consent, data-subject requests, breach handling and transfer safeguards into the product, and document data flows for your data protection officer. Final legal sign-off should come from your adviser.",
      },
      {
        q: "Can you build apps for Abu Dhabi health providers?",
        a: "Yes. Health apps in Abu Dhabi must meet the Department of Health's data and cybersecurity standards, and UAE law generally requires health data to be stored inside the country. We host on UAE-region cloud infrastructure, encrypt data in transit and at rest, keep full access logs, and can integrate UAE PASS for verified patient sign-in. Your compliance team handles DoH approvals.",
      },
    ],
  },
  {
    slug: "sharjah",
    name: "Sharjah",
    region: "uae",
    keywords: [...searchTerms("Sharjah"), "app developers Northern Emirates"],
    seo: {
      title: "App Development Company in Sharjah | iOS & Android | Kurchu",
      description:
        "Mobile app developers for Sharjah businesses, schools and SMEs — Arabic and English iOS and Android apps built to UAE PDPL, 1 hour from UAE time.",
    },
    hero: {
      lede: "A senior remote product team for Sharjah's family businesses, schools and growing SMEs — Arabic and English apps built to UAE data law, sized to what your business actually needs.",
      meta: ["Only 1 hour from UAE time", "Arabic & English apps", "Proposals priced in AED or USD"],
    },
    timeZone: {
      zone: "GST (UTC+4)",
      difference: "Lahore is just 1 hour ahead of Sharjah, with no daylight-saving changes on either side.",
      callWindow: "Our working day overlaps almost all of yours, Monday to Friday.",
    },
    context:
      "Sharjah is the UAE's third-largest emirate, with a strong manufacturing and education sector, a large community of family businesses and SMEs, and many residents who commute to Dubai.",
    answer:
      "Kurchu Software Solutions builds Arabic and English apps for Sharjah's family businesses, schools and SMEs, working remotely from Lahore, Pakistan, one hour ahead of the UAE. Apps follow the UAE PDPL and consumer protection law, integrate local gateways, Tabby or Tamara and WhatsApp Business, and are scoped to what the business actually needs.",
    appIdeas: [
      { title: "School parent app", desc: "Timetables, attendance, fee payments and parent–teacher messaging in Arabic and English, with student data hosted in the UAE." },
      { title: "B2B ordering app for traders", desc: "Price lists, repeat orders, credit limits and delivery tracking for Sharjah trading and distribution companies." },
      { title: "Home-services booking app", desc: "Bookings, technician assignment and payment for cleaning, AC and maintenance services, with WhatsApp updates." },
    ],
    sectors: ["SMEs and family businesses", "Schools, universities and training", "Manufacturing and trading", "Retail and home services"],
    rules: [
      "UAE PDPL (Federal Decree-Law No. 45 of 2021)",
      "UAE consumer protection law for online sales and refunds",
      "Parental consent and data minimisation for apps used by children",
      "VAT-aware pricing, invoices and receipts",
    ],
    integrations: ["Network International, Telr and PayTabs", "Tabby and Tamara buy-now-pay-later", "WhatsApp Business notifications", "Apple Pay and Google Pay"],
    sources: [{ label: "UAE Government portal", url: "https://u.ae/" }],
    faqs: [
      {
        q: "Are you an app development company in Sharjah?",
        a: "We are a Lahore-based team working with Sharjah remotely. 9:00–17:00 in Sharjah is 10:00–18:00 in Lahore, so you can reach the people building your app during your own office hours. For owner-run businesses we keep it simple: one weekly call, a WhatsApp group for quick questions, and a test build on your phone every week.",
      },
      {
        q: "How much does an app cost for a Sharjah SME?",
        a: `With us, ${MID_FIVE_FIGURES}. Many Sharjah SMEs start smaller: one core flow such as ordering or booking, in Arabic and English, launched first and extended once customers use it. We give a fixed AED or USD price for that first phase, and tell you honestly if an existing platform would serve you better.`,
      },
      {
        q: "Is a custom app worth it for a small Sharjah business?",
        a: "Sometimes not, and we will say so. If you mainly need bookings, a catalogue or WhatsApp ordering, a good website or an existing platform is cheaper. A custom app pays off when customers come back often — loyalty, repeat orders, subscriptions — or when your team needs a tool shaped around how you actually work. We tell you which side you are on in the first call.",
      },
      {
        q: "Can you build an app for a school or university in Sharjah?",
        a: "Yes. School and university apps typically cover timetables, attendance, fees, announcements and parent–teacher messaging, in Arabic and English. Because students' data is involved, we keep collection to what is genuinely needed, put access controls on every role, and host data in the UAE. Payments can run through local gateways, and notifications through push, SMS or WhatsApp.",
      },
    ],
  },
];

export function citiesIn(region: Region) {
  return cities.filter((city) => city.region === region.slug);
}

export function getCity(regionSlug: string, citySlug: string) {
  const city = cities.find((c) => c.region === regionSlug && c.slug === citySlug);
  const region = city && getRegion(city.region);
  return city && region ? { city, region } : undefined;
}

export const cityPath = (city: City) => `/locations/${city.region}/${city.slug}`;

