import type { BlogPost } from "../blog";

export const chooseAppDevelopmentCompany: BlogPost = {
  slug: "how-to-choose-an-app-development-company",
  title: "How to choose an app development company: 15 questions to ask",
  excerpt:
    "Hiring an app agency is a big decision. These questions separate a reliable partner from an expensive mistake — with the answers you should listen for.",
  category: "Hiring",
  date: "2026-10-08",
  readTime: "9 min read",
  image: "/blog/choose-app-company.svg",
  imageAlt: "Illustration of a checklist being reviewed next to a mobile app design",
  keywords: ["how to choose an app development company", "hire app developers", "app development agency questions", "app agency checklist", "outsource app development"],
  summary:
    "To choose an app development company, look beyond the portfolio. Ask who will actually work on your project, how scope and price are fixed, how often you will see working builds, who owns the code and store accounts, how the app is tested and released, and what support looks like after launch. Then speak to real references.",
  takeaways: [
    "Judge the team who will build your app, not the agency's sales pitch.",
    "Insist on owning the code, designs and store accounts from day one.",
    "Prefer fixed-price phases over one large, vague fixed quote.",
    "Expect a working build you can install every week or two.",
    "Compare proposals by scope and assumptions, not just price.",
  ],
  sections: [
    {
      heading: "What should you decide before talking to agencies?",
      paragraphs: [
        "Agencies give better answers when you are clear about three things: where the project stands (an idea, designs or a live app), what a successful first version must achieve, and a realistic budget range and timeline. You do not need a technical specification — a good partner will help you shape one — but knowing your goals stops you being sold someone else's.",
      ],
    },
    {
      heading: "Which 15 questions should you ask an app development company?",
      paragraphs: ["Use these in every conversation, and compare the answers side by side:"],
      table: {
        caption: "Questions to ask an app development company and good answers",
        headers: ["Question", "A good answer sounds like"],
        rows: [
          ["Who exactly will work on my project?", "Named people and roles, including the senior lead"],
          ["How do you run discovery?", "A short, fixed-price phase before full commitment"],
          ["How is the price fixed?", "Fixed scope and price per phase, with change control"],
          ["Native or cross-platform — and why?", "A recommendation in writing, with trade-offs"],
          ["How often will I see progress?", "Installable builds every one to two weeks"],
          ["Who owns the code and accounts?", "You, from day one, in your own repositories and store accounts"],
          ["How do you test?", "Automated tests plus real-device testing before release"],
          ["How do you handle security and privacy?", "Specific practices, such as encryption, access control and data minimisation"],
          ["What happens when requirements change?", "A clear change process with its impact on cost and time"],
          ["Who designs the user experience?", "In-house designers working with the engineers"],
          ["How do you release to the stores?", "They handle submission and phased rollouts"],
          ["What support do you offer after launch?", "A defined plan for monitoring, updates and fixes"],
          ["Can I speak to past clients?", "Yes, with real references you can contact"],
          ["What documentation will I receive?", "Enough for a new developer to set up the project quickly"],
          ["What happens if we part ways?", "A clean handover, with nothing kept back"],
        ],
      },
    },
    {
      heading: "What are the red flags when hiring an app agency?",
      bullets: [
        "A detailed fixed price before anyone has asked about your users or goals.",
        "They cannot tell you who will actually build the app.",
        "Repositories, cloud services or store listings stay in their accounts.",
        "No testing plan beyond 'we test as we go'.",
        "Pressure to sign quickly with a limited-time discount.",
        "No references, or only screenshots without real apps in the stores.",
      ],
      paragraphs: ["Walk away, or at least slow down, if you notice any of these:"],
    },
    {
      heading: "Should you hire an agency, a freelancer or an in-house team?",
      paragraphs: ["Each option suits a different stage and budget:"],
      table: {
        caption: "Agency, freelancer and in-house team compared",
        headers: ["Option", "Best for", "Watch out for"],
        rows: [
          ["Agency", "Complete products needing strategy, design, engineering and QA together", "Junior hand-offs and unclear ownership"],
          ["Freelancer", "Small, well-defined tasks or prototypes", "Single point of failure and limited QA"],
          ["In-house team", "Long-term products with steady, funded roadmaps", "Hiring time, cost and management overhead"],
        ],
      },
    },
    {
      heading: "How should you compare proposals fairly?",
      paragraphs: [
        "A cheaper quote often reflects a smaller scope or missing work, such as testing, backend, admin tools or store submission. Ask every agency for an itemised scope with their assumptions listed, then compare like with like. The best value usually comes from a partner who challenges unnecessary features, because every feature you avoid building is time and money saved.",
      ],
    },
    {
      heading: "How does Kurchu answer these questions?",
      paragraphs: [
        "Our work is senior-led, with no junior hand-offs. Projects start with a short discovery phase and continue in fixed-price phases. You install a real build at every fortnightly demo, own all code, designs and accounts from day one, and get a QA report before every release. For existing apps, we begin with a fixed-price two-week audit.",
      ],
    },
  ],
  faqs: [
    {
      q: "How much should I budget for building an app?",
      a: "It depends on the number of screens, user roles, integrations and platforms, so be wary of anyone who quotes without asking about them. Ask for an itemised proposal with a fixed price for the first phase, and keep a contingency of around fifteen to twenty percent for changes. Phased delivery lets you launch a focused version first and invest more once it proves itself.",
    },
    {
      q: "Is it safe to hire an offshore app development company?",
      a: "It can be, provided you protect yourself the same way you would with any agency: a written contract, intellectual property assigned to you, code and accounts in your name, regular installable builds and real references. Time-zone differences work well when calls are scheduled inside your working hours and progress is shared in writing, so you are never left guessing about progress.",
    },
    {
      q: "Should I ask for an NDA before sharing my app idea?",
      a: "It is reasonable to ask for one, and many agencies will sign a mutual NDA before detailed discussions. Keep in mind that ideas are rarely the main risk; execution, speed and distribution matter far more. Share enough in early conversations to judge whether the agency understands your goals, then go into sensitive detail once an agreement and trust are in place.",
    },
    {
      q: "Is a fixed price or time and materials better for an app project?",
      a: "Fixed price works well for clearly scoped phases, giving you budget certainty, while time and materials suits ongoing work where priorities change frequently. Many projects combine both: a fixed-price discovery and first release, followed by a monthly arrangement for continued development. Avoid a single fixed price for a large, vaguely defined product, because it usually leads to disputes about scope later.",
    },
    {
      q: "What should an app development contract include?",
      a: "At minimum: the scope and deliverables for each phase, price and payment schedule, timeline, a change-control process, assignment of intellectual property to you, ownership of accounts and repositories, confidentiality, acceptance testing, warranty or bug-fix period, support terms and how either side can end the agreement. Have a lawyer review it carefully, especially the ownership and liability clauses, before you sign.",
    },
  ],
  relatedLinks: [
    { href: "/process", label: "How we run projects, stage by stage" },
    { href: "/services", label: "Ways to work with Kurchu" },
    { href: "/contact", label: "Talk to us about your app" },
  ],
};
