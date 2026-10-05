import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "iconsax-react";
import { formatPostDate, type BlogPost } from "@/app/lib/blog";

/**
 * Article card — cover image, meta, title and excerpt.
 * Used on the homepage "Latest news & insights" section and /blog.
 */
export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-black/[0.07] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(11,18,32,0.25)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#eef4fb]">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[12px] font-semibold text-[#0b1220] shadow-sm">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[12.5px] font-medium text-black/45">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readTime}
        </p>
        <h3 className="mt-3 text-[19px] leading-snug font-semibold tracking-tight text-[#0b1220] transition-colors group-hover:text-[#1470c4]">
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-[14.5px] leading-6 text-black/55">{post.excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0b1220]">
          Read article
          <ArrowRight
            size={16}
            color="currentColor"
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
