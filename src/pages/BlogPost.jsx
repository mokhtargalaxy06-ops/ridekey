import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "../components/JsonLd";
import { useCatalog } from "../catalogContext";

export default function BlogPost() {
  const { id } = useParams();
  const { blogs } = useCatalog();
  const post = blogs.find((item) => item.id === id);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        <SEO
          title="RideKey Blog Article Not Found"
          description="The RideKey Morocco motorcycle rental guide you requested could not be found."
          path={`/blog/${id || ""}`}
          noindex
        />
        <h1 className="text-2xl font-semibold text-white">Article not found</h1>
        <Link to="/blog" className="mt-4 inline-flex text-accent">
          Back to RideKey guides
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-28">
      <SEO
        title={post.seoTitle}
        description={post.excerpt}
        path={`/blog/${post.id}`}
        image={post.image}
        keywords={post.keywords}
        type="article"
      />
      <BlogPostingJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.id}` },
        ]}
      />
      <Link to="/blog" className="text-sm font-semibold text-accent">
        RideKey guides
      </Link>
      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-accent">
        {post.tag}
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-base text-slate-300">{post.excerpt}</p>
      <p className="mt-4 text-xs text-slate-500">
        Updated {post.date} by RideKey Morocco
      </p>
      <img
        src={post.image}
        alt={`${post.title} - RideKey Morocco motorcycle guide`}
        loading="eager"
        decoding="async"
        width="1200"
        height="800"
        className="mt-8 h-[360px] w-full rounded-2xl object-cover"
      />
      <div className="mt-10 space-y-8">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold text-white">
              {section.heading}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {section.body}
            </p>
          </section>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-white/10 bg-night p-6">
        <h2 className="text-xl font-semibold text-white">
          Book a Morocco motorcycle rental with RideKey
        </h2>
        <p className="mt-3 text-sm text-slate-300">
          Ready to ride from Marrakech? Compare adventure motorcycles, choose
          your dates and send a booking request directly to the RideKey team.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/bikes"
            className="inline-flex justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
          >
            View rental motorcycles
          </Link>
          <Link
            to="/rides"
            className="inline-flex justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white"
          >
            Explore Morocco tours
          </Link>
        </div>
      </div>
    </article>
  );
}
