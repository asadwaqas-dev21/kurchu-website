import Link from "next/link";
import { ArrowRight } from "iconsax-react";
import BlogCard from "./shared/BlogCard";
import { posts } from "../lib/blog";

export default function LatestInsights() {
  return (
    <section id="insights" className="bg-[#f5f7fa] pt-14 pb-20 sm:pt-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-block border-b border-black/15 pb-2 text-[13px] font-semibold tracking-[0.08em] text-black/55 uppercase">
              Blog
            </span>
            <h2 className="mt-6 text-[2.25rem] leading-[1.08] font-semibold tracking-[-0.03em] text-[#0b1220] sm:text-[2.75rem]">
              Latest news &amp; insights
            </h2>
            <p className="mt-4 max-w-lg text-[15.5px] leading-7 text-black/60">
              Practical advice on websites, apps and SEO to help your business grow online.
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#0b1220] px-6 py-3 text-[14px] font-semibold text-[#0b1220] transition-colors hover:bg-[#0b1220] hover:text-white sm:self-auto"
          >
            View all articles
            <ArrowRight
              size={16}
              color="currentColor"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
