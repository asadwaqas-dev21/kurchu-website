import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/app/lib/metadata";
import { formatPostDate, getPost, posts } from "@/app/lib/blog";
import { siteConfig } from "@/app/lib/site-config";
import InnerLayout from "@/app/components/shared/InnerLayout";
import Breadcrumbs from "@/app/components/shared/Breadcrumbs";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const recent = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: `${siteConfig.url}${post.image}`,
    url: `${siteConfig.url}/blog/${post.slug}`,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <InnerLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.category, href: `/blog/${post.slug}` },
        ]}
      />

      <article className="bg-white pt-14 pb-20 sm:pt-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <header className="max-w-3xl">
            <span className="inline-flex rounded-full bg-[#dcf0ff] px-3 py-1 text-[12.5px] font-semibold text-[#1470c4]">
              {post.category}
            </span>
            <h1 className="mt-5 text-[2.25rem] leading-[1.1] font-semibold tracking-[-0.03em] text-[#0b1220] sm:text-[3rem]">
              {post.title}
            </h1>
            <p className="mt-5 text-[17px] leading-8 text-black/60">{post.excerpt}</p>
            <p className="mt-6 text-[13.5px] font-medium text-black/45">
              By {siteConfig.name} · <time dateTime={post.date}>{formatPostDate(post.date)}</time> ·{" "}
              {post.readTime}
            </p>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
            {/* Main column */}
            <div>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-[#eef4fb]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  unoptimized
                  priority
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-12 max-w-3xl">
                {post.sections.map((section, i) => (
                  <section
                    key={section.heading}
                    id={`section-${i + 1}`}
                    className="mt-10 scroll-mt-24 first:mt-0"
                  >
                    <h2 className="text-[1.5rem] leading-tight font-semibold tracking-tight text-[#0b1220] sm:text-[1.75rem]">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-[16.5px] leading-8 text-black/70">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="mt-4 flex flex-col gap-3">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-[16.5px] leading-7 text-black/70">
                            <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1e8fe0]" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}

                <Link
                  href="/blog"
                  className="mt-14 inline-flex items-center gap-2 text-[14.5px] font-semibold text-[#1470c4] hover:text-[#0b1220]"
                >
                  ← Back to all articles
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-black/[0.07] bg-[#f5f7fa] p-6">
                <p className="text-[12px] font-semibold tracking-[0.08em] text-black/45 uppercase">
                  In this article
                </p>
                <ol className="mt-4 flex flex-col gap-1">
                  {post.sections.map((section, i) => (
                    <li key={section.heading}>
                      <a
                        href={`#section-${i + 1}`}
                        className="flex gap-3 rounded-xl px-2 py-2 text-[14px] leading-snug text-black/65 transition-colors hover:bg-white hover:text-[#0b1220]"
                      >
                        <span className="font-semibold text-[#1e8fe0]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl border border-black/[0.07] bg-white p-6">
                <p className="text-[12px] font-semibold tracking-[0.08em] text-black/45 uppercase">
                  Recent articles
                </p>
                <ul className="mt-4 flex flex-col gap-4">
                  {recent.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="group flex items-center gap-4">
                        <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-[#eef4fb]">
                          <Image
                            src={p.image}
                            alt={p.imageAlt}
                            fill
                            unoptimized
                            sizes="80px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </span>
                        <span>
                          <span className="line-clamp-2 text-[14px] leading-snug font-semibold text-[#0b1220] transition-colors group-hover:text-[#1470c4]">
                            {p.title}
                          </span>
                          <span className="mt-1 block text-[12px] text-black/45">
                            {formatPostDate(p.date)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-[#0b1220] p-6 text-white">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#1e8fe0]/30 blur-3xl"
                />
                <p className="relative text-[19px] leading-snug font-semibold">
                  Need help with your {post.category.toLowerCase()} project?
                </p>
                <p className="relative mt-2 text-[14px] leading-6 text-white/60">
                  Tell us what you want to build or grow. We reply within one business day.
                </p>
                <div className="relative mt-5 flex flex-col gap-2.5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-[#0b1220] transition-colors hover:bg-white/90"
                  >
                    Get a free quote
                  </Link>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </InnerLayout>
  );
}
