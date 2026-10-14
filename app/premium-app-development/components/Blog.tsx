import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatPostDate, posts, type BlogPost } from "@/app/lib/blog";
import { SectionHead, rv } from "./ui";

/** Newest first, by last substantive update. */
export const postsByDate = () => [...posts].sort((a, b) => (b.updated ?? b.date).localeCompare(a.updated ?? a.date));

const Go = ({ children }: { children: ReactNode }) => (
  <span className="svl-go">
    {children}
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  </span>
);

/** Category · date · read time, in the mono label style. */
export function PostMeta({ post, by }: { post: BlogPost; by?: string }) {
  return (
    <p className="bl-meta">
      <span className="cat">{post.category}</span>
      {by && <span>By {by}</span>}
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      {post.updated && (
        <span>
          Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
        </span>
      )}
      <span>{post.readTime}</span>
    </p>
  );
}

function Cover({ post, sizes, priority }: { post: BlogPost; sizes: string; priority?: boolean }) {
  return (
    <div className="bl-fig">
      <Image src={post.image} alt={post.imageAlt} fill unoptimized priority={priority} sizes={sizes} />
    </div>
  );
}

/** The lead article: large cover beside its title and excerpt. */
export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="bl-feat" {...rv()}>
      <Cover post={post} priority sizes="(min-width: 1024px) 60vw, 100vw" />
      <div className="bl-feat-body">
        <PostMeta post={post} />
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <Go>Read the guide</Go>
      </div>
    </Link>
  );
}

/**
 * Article cards in a three-column grid. With `askCard`, a gap left in the last
 * row is filled with an invitation to send the team a question.
 */
export function PostGrid({ items, askCard }: { items: BlogPost[]; askCard?: boolean }) {
  const showAsk = askCard && items.length % 3 === 2;
  return (
    <ul className="bl-grid">
      {items.map((post, i) => (
        <li key={post.slug} {...rv(i % 3 ? `${((i % 3) * 0.06).toFixed(2)}s` : undefined)}>
          <Link href={`/blog/${post.slug}`} className="bl-card">
            <Cover post={post} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            <div className="bl-card-body">
              <PostMeta post={post} />
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Go>Read the guide</Go>
            </div>
          </Link>
        </li>
      ))}
      {showAsk && (
        <li {...rv(".12s")}>
          <Link href="/contact" className="bl-card bl-ask">
            <div className="bl-card-body">
              <p className="bl-meta">
                <span className="cat">Ask the team</span>
              </p>
              <h3>Have a question we haven&apos;t covered?</h3>
              <p>Send it over — a senior member of the team replies within one working day.</p>
              <Go>Ask a question</Go>
            </div>
          </Link>
        </li>
      )}
    </ul>
  );
}

/** Three more articles: same category first, then the newest. */
export function RelatedPosts({ post }: { post: BlogPost }) {
  const others = postsByDate().filter((p) => p.slug !== post.slug);
  const items = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);
  return (
    <section className="section" id="more" aria-labelledby="more-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead
          eyebrow="Keep reading"
          titleId="more-title"
          title={
            <>
              More guides <em>from the team.</em>
            </>
          }
        />
        <PostGrid items={items} />
      </div>
    </section>
  );
}
