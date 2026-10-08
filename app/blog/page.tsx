import { buildMetadata } from "@/app/lib/metadata";
import { posts } from "@/app/lib/blog";
import InnerLayout from "@/app/components/shared/InnerLayout";
import Breadcrumbs from "@/app/components/shared/Breadcrumbs";
import PageHero from "@/app/components/shared/PageHero";
import BlogCard from "@/app/components/shared/BlogCard";
import CTASection from "@/app/components/shared/CTASection";

export const metadata = buildMetadata({
  title: "Blog — News & Insights | Kurchu Software Solutions",
  description:
    "Practical advice on website development, mobile apps and SEO from the team at Kurchu Software Solutions.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <InnerLayout>
      <Breadcrumbs path="/blog" />

      <PageHero
        badge="News & insights"
        heading="Ideas to help your business grow online."
        description="Practical, jargon-free advice on websites, mobile apps and SEO — written by the team that builds them."
      />

      <section className="bg-[#f5f7fa] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:px-14">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <CTASection
        heading="Have a project in mind?"
        description="Tell us what you want to build or grow. We reply within one business day."
        ctaLabel="Start a project"
        dark
      />
    </InnerLayout>
  );
}
