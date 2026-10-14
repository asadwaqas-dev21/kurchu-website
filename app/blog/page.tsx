import type { Viewport } from "next";
import JsonLd from "@/app/components/shared/JsonLd";
import { buildMetadata } from "@/app/lib/metadata";
import { siteConfig } from "@/app/lib/site-config";
import { FeaturedPost, PostGrid, postsByDate } from "@/app/premium-app-development/components/Blog";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { PageHero } from "@/app/premium-app-development/components/PageHero";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { SectionHead } from "@/app/premium-app-development/components/ui";

export const metadata = buildMetadata({
  title: "App Development Guides & Insights | Kurchu",
  description:
    "Practical guides on planning, costing and building mobile apps — MVP timelines, Flutter vs React Native, UK GDPR, Arabic apps and choosing a developer.",
  path: "/blog",
});

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export default function BlogPage() {
  const [featured, ...rest] = postsByDate();

  // The article list as structured data, so answer engines can see the whole collection at once.
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} guides`,
    itemListElement: [featured, ...rest].map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <PremiumShell current="blog">
      <JsonLd data={listJsonLd} />
      <PageHero
        path="/blog"
        eyebrow="Guides & insights"
        lines={["Practical guides", "for building apps", <em key="em">worth keeping.</em>]}
        lede="Plain-language advice on planning, costing and building mobile apps — written by the team that designs and ships them, not by a content agency."
        meta={[`${rest.length + 1} in-depth guides`, "Written by the people who build", "No sign-up, no gated content"]}
        cta={{ label: "Start a Project" }}
        secondary={{ href: "#articles", label: "Read the guides" }}
        pageType="CollectionPage"
      />
      <section className="section" id="articles" aria-labelledby="articles-title">
        <div className="wrap">
          <SectionHead
            eyebrow="Latest"
            titleId="articles-title"
            title={
              <>
                Start with <em>the newest.</em>
              </>
            }
            lede="Each guide answers the question in its title first, then shows the detail — tables, checklists and the trade-offs we weigh on real projects."
          />
          <FeaturedPost post={featured} />
          <PostGrid items={rest} askCard />
        </div>
      </section>
      <FinalCta />
    </PremiumShell>
  );
}
