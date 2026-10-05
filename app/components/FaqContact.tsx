import FAQSection from "./shared/FAQSection";

const faqs = [
  {
    q: "How long does a website take?",
    a: "The timeline for building a website varies based on the scope and complexity of your project. A standard business website typically takes between 4 to 8 weeks from initial design to launch. However, more complex e-commerce platforms or custom applications will require additional time. We always provide a detailed, week-by-week timeline in your initial proposal so you know exactly what to expect.",
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: "Yes, absolutely! We successfully partner with businesses and organizations worldwide. Our team is highly experienced in managing projects remotely. We ensure smooth communication by scheduling calls, delivering proposals, and providing regular progress reports at times that are convenient for your specific timezone. Distance is never a barrier to delivering exceptional software and SEO results for our international clients.",
  },
  {
    q: "Will I own the website and code?",
    a: "Yes, you will have complete ownership. Once the project is completed and paid in full, we transfer all intellectual property rights to you. This includes the source code, design files, graphics, and all written content. We believe in total transparency and do not use vendor lock-in tactics. You are entirely free to host the site wherever you choose and modify it as you see fit.",
  },
  {
    q: "When will SEO show results?",
    a: "Search engine optimization is a long-term strategy. While some early technical fixes and on-page optimizations can produce noticeable improvements within just a few weeks, meaningful and sustained ranking movement for competitive keywords typically requires 3 to 6 months of consistent effort. We focus on building a strong foundation and earning quality authority to ensure your results are durable rather than just a temporary spike.",
  },
  {
    q: "Can you take over an existing site or app?",
    a: "Yes, we frequently take over existing websites and applications. Our process begins with a comprehensive technical audit of your current codebase and infrastructure. We will honestly evaluate what is working, flag any underlying issues that are worth rebuilding, and then smoothly transition the hosting, content management, and ongoing development to our team. We ensure your digital assets continue to operate flawlessly during the handover.",
  },
];

export default function FaqContact() {
  return (
    <FAQSection
      id="faq"
      heading="Questions before you start"
      description="Everything you need to know about timelines, ownership, SEO results and working with Kurchu Software Solutions."
      items={faqs}
      className="pt-14 pb-14 sm:pt-16 sm:pb-16"
    />
  );
}
