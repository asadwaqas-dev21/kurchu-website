import type { Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import JsonLd from "@/app/components/shared/JsonLd";
import { getPost, posts } from "@/app/lib/blog";
import { ORGANIZATION_ID, WEBSITE_ID, breadcrumbJsonLd, faqPageJsonLd } from "@/app/lib/jsonld";
import { buildMetadata } from "@/app/lib/metadata";
import { breadcrumbTrail } from "@/app/lib/routes";
import { serviceLines } from "@/app/lib/services";
import { siteConfig } from "@/app/lib/site-config";
import { PostMeta, RelatedPosts } from "@/app/premium-app-development/components/Blog";
import { Faq } from "@/app/premium-app-development/components/Faq";
import { FinalCta } from "@/app/premium-app-development/components/FinalCta";
import { PremiumShell } from "@/app/premium-app-development/components/PremiumShell";
import { Arr, inquiry } from "@/app/premium-app-development/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const viewport: Viewport = { themeColor: "#09090A", viewportFit: "cover" };

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle ?? (post.title.length > 51 ? post.title : `${post.title} | Kurchu`),
    description: post.metaDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    article: { publishedTime: post.date, modifiedTime: post.updated ?? post.date },
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${siteConfig.url}/blog/${post.slug}`;
  // Kurchu has one service line, so every article links to it unless another category matches.
  const relatedService = serviceLines.find((service) => service.blogCategory === post.category) ?? serviceLines[0];
  const wordCount = [
    post.summary ?? "",
    ...post.sections.flatMap((section) => [...section.paragraphs, ...(section.bullets ?? [])]),
    ...(post.faqs ?? []).map((faq) => faq.a),
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    wordCount,
    ...(post.keywords && { keywords: post.keywords.join(", ") }),
    image: `${siteConfig.url}${post.image}`,
    url,
    mainEntityOfPage: url,
    articleSection: post.category,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    // The Service node lives on its own page; type, name and url let this page's graph stand alone.
    ...(relatedService && {
      about: {
        "@type": "Service",
        "@id": `${siteConfig.url}${relatedService.path}#service`,
        name: relatedService.name,
        url: `${siteConfig.url}${relatedService.path}`,
      },
    }),
  };

  const trail = breadcrumbTrail(`/blog/${post.slug}`);

  return (
    <PremiumShell current="blog">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd(`/blog/${post.slug}`)} />
      {post.faqs && <JsonLd data={faqPageJsonLd(post.faqs)} />}
      <article className="art" aria-labelledby="art-title">
        <div className="wrap">
          <header className="art-head">
            <nav className="ph-crumb" aria-label="Breadcrumb">
              {trail.map((crumb, i) =>
                i === trail.length - 1 ? (
                  <span aria-current="page" key={crumb.path}>
                    {crumb.name}
                  </span>
                ) : (
                  <Fragment key={crumb.path}>
                    <Link href={crumb.path}>{crumb.name}</Link>
                    <span aria-hidden="true">/</span>
                  </Fragment>
                ),
              )}
            </nav>
            <span className="pill-tag">
              <span className="dot"></span>
              {post.category}
            </span>
            <h1 id="art-title">{post.title}</h1>
            <p className="art-intro">{post.excerpt}</p>
            <PostMeta post={post} by={siteConfig.name} />
          </header>

          {(post.summary || post.takeaways) && (
            <div className="art-sum">
              {post.summary && (
                <div>
                  <span className="label">In short</span>
                  <p className="art-sum-answer">{post.summary}</p>
                </div>
              )}
              {post.takeaways && (
                <div>
                  <span className="label">Key takeaways</span>
                  <ul>
                    {post.takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {post.cta && (
            <Link href={post.cta.href} className="art-next">
              <span>
                <b>{post.cta.title}</b>
                {post.cta.body}
              </span>
              <span className="btn btn-primary btn-sm">
                {post.cta.label} <Arr />
              </span>
            </Link>
          )}

          <div className="legal-body">
            <aside className="art-side">
              <nav className="legal-toc art-toc" aria-label="In this article">
                <span className="label">In this article</span>
                <ol>
                  {post.sections.map((section, i) => (
                    <li key={section.heading}>
                      <a href={`#section-${i + 1}`}>
                        <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                  {post.faqs && (
                    <li>
                      <a href="#faq">
                        <span className="mono">FAQ</span>
                        Frequently asked questions
                      </a>
                    </li>
                  )}
                </ol>
              </nav>
              <div className="art-cta">
                <h2>Planning an app?</h2>
                <p>Tell us what you want to build. A senior member of the team replies within one working day.</p>
                <a href="/contact" className="btn btn-primary btn-sm btn-full" {...inquiry()}>
                  Get a free quote <Arr />
                </a>
                <a
                  className="btn btn-ghost btn-sm btn-full has-arr"
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp <Arr />
                </a>
              </div>
            </aside>

            <div className="art-content">
              <figure className="art-cover">
                <Image src={post.image} alt={post.imageAlt} fill unoptimized priority sizes="(min-width: 1024px) 760px, 100vw" />
              </figure>
              {post.sections.map((section, i) => (
                <section key={section.heading} id={`section-${i + 1}`} aria-labelledby={`section-${i + 1}-h`}>
                  <h2 id={`section-${i + 1}-h`}>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {section.table && (
                    <div className="tbl-wrap">
                      <table className="tbl">
                        <caption className="sr-only">{section.table.caption}</caption>
                        <thead>
                          <tr>
                            {section.table.headers.map((header) => (
                              <th key={header} scope="col">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row[0]}>
                              {row.map((cell, c) =>
                                c === 0 ? (
                                  <th key={c} scope="row">
                                    {cell}
                                  </th>
                                ) : (
                                  <td key={c}>{cell}</td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}

              <nav className="art-links" aria-label="Related reading">
                <span className="label">Related reading</span>
                <ul>
                  {post.relatedLinks?.map((link) => (
                    <li key={link.href}>
                      <Link className="tlink" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {relatedService && !post.relatedLinks?.some((link) => link.href === relatedService.path) && (
                    <li>
                      <Link className="tlink" href={relatedService.path}>
                        {relatedService.name}
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="tlink" href="/blog">
                      All guides
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </article>
      {post.faqs && (
        <Faq
          items={post.faqs}
          eyebrow="FAQ"
          title={
            <>
              Questions, <em>answered.</em>
            </>
          }
        />
      )}
      <RelatedPosts post={post} />
      <FinalCta />
    </PremiumShell>
  );
}
