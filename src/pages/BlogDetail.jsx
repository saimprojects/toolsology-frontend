import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getBlogPost } from "../api/api";
import Seo from "../components/layout/Seo";
import GearLoader from "../components/layout/GearLoader";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getBlogPost(slug).then(setPost).finally(() => setLoading(false)); }, [slug]);
  const schema = useMemo(() => post ? ({ "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.meta_description || post.excerpt, image: post.featured_image, author: { "@type": "Organization", name: post.author_name }, datePublished: post.published_at, dateModified: post.updated_at, mainEntityOfPage: `https://www.toolsology.shop/blog/${post.slug}` }) : null, [post]);
  if (loading) return <div className="min-h-screen bg-black text-white flex justify-center pt-32"><GearLoader size="lg" /></div>;
  if (!post) return <div className="min-h-screen bg-black text-white p-20">Article not found.</div>;
  return <article className="bg-black text-white min-h-screen pb-24">
    <Seo title={post.seo_title || post.title} description={post.meta_description || post.excerpt} path={`/blog/${post.slug}`} image={post.featured_image} type="article" schema={schema} />
    <header className="max-w-4xl mx-auto px-5 pt-16 pb-10"><Link to="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white"><ArrowLeft className="w-4 h-4" /> All guides</Link><div className="text-xs uppercase tracking-[.2em] text-zinc-500 mt-12">{post.focus_keyword || "Toolsology guide"}</div><h1 className="text-4xl sm:text-7xl font-black tracking-[-0.05em] leading-[0.98] mt-4">{post.title}</h1><p className="text-xl text-zinc-400 mt-6">{post.excerpt}</p></header>
    {post.featured_image && <img src={post.featured_image} alt={post.title} className="w-full max-w-6xl mx-auto max-h-[620px] object-cover grayscale" />}
    <div className="max-w-3xl mx-auto px-5 mt-14 bg-white text-black rounded-3xl p-7 sm:p-12 prose prose-zinc prose-lg max-w-3xl" dangerouslySetInnerHTML={{ __html: post.content }} />
  </article>;
}
