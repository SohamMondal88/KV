import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Clock, Calendar, ArrowLeft, ExternalLink } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return { title: "Blog Post — Hidden Gems" };
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const placeholderParagraphs = [
    "The Eastern Himalayas hold countless secrets for those willing to wander off the beaten path. From mist-laden valleys to ancient monasteries perched on cliff edges, every turn reveals a story waiting to be told.",
    "Local communities here have preserved traditions that span centuries. You will find warmth in the simplest of interactions — a shared cup of butter tea, a smile from a homestay host, or the rhythmic chanting at dawn in a distant gompa.",
    "For photographers, the region offers dramatic light shifts throughout the day. The golden hour here is not just a time; it is an experience that paints the snow-capped peaks in hues of amber and rose.",
    "Sustainable tourism is more than a buzzword in these villages. It is a way of life. By choosing homestays and local guides, travelers directly contribute to preserving the fragile ecosystem and empowering indigenous communities.",
  ];

  const articleContent =
    post.content.length > 120
      ? post.content
      : `${post.content}\n\n${placeholderParagraphs.join("\n\n")}`;

  return (
    <div className="flex flex-col">
      {/* Cover Image */}
      <section className="relative h-72 sm:h-96 lg:h-[28rem]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <Container className="relative z-10 flex h-full flex-col justify-end pb-8 text-white">
          <Link
            href="/blog"
            className="mb-4 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Stories
          </Link>
          <Badge variant="accent" className="mb-3 w-fit">
            {post.category}
          </Badge>
          <h1 className="max-w-3xl text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="font-medium text-white">{post.author.name}</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:inline" />
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {post.publishedAt}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:inline" />
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
        </Container>
      </section>

      {/* Article */}
      <section className="py-12">
        <Container className="max-w-3xl">
          <article className="prose prose-lg max-w-none text-foreground">
            {articleContent.split("\n\n").map((para, i) => (
              <p key={i} className="mb-6 leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
          </article>

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Share */}
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-8">
            <span className="text-sm font-medium text-muted-foreground">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-transparent px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              <ExternalLink className="h-4 w-4" />
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://hiddengems.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-transparent px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              <ExternalLink className="h-4 w-4" />
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://hiddengems.com/blog/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-transparent px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              <ExternalLink className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-muted/40 py-16">
          <Container>
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
              Related Posts
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                    <Image
                      src={rp.coverImage}
                      alt={rp.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="mt-3">
                    <Badge variant="primary" className="mb-2">
                      {rp.category}
                    </Badge>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary">
                      {rp.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
