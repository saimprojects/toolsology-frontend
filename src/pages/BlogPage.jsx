import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { getBlogPosts } from "../api/api";
import Seo from "../components/layout/Seo";
import GearLoader from "../components/layout/GearLoader";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getBlogPosts().then(setPosts).finally(() => setLoading(false)); }, []);
  return (
    <div className="bg-black text-white min-h-screen">
      <Seo title="Digital Tools Guides, Comparisons & Tutorials" description="Expert guides on premium digital tools, AI subscriptions, software and reseller opportunities in Pakistan and worldwide." path="/blog" />
      <section className="max-w-7xl mx-auto px-5 py-20 sm:py-28">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-sm text-zinc-400 mb-5"><BookOpen className="w-4 h-4" /> Toolsology Intelligence</div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-[-0.05em] leading-[0.95]">Buy smarter.<br/><span className="text-zinc-500">Work better.</span></h1>
          <p className="text-lg text-zinc-400 mt-7 max-w-2xl">Practical answers, honest comparisons and expert workflows for premium digital tools.</p>
        </div>
        {loading ? <GearLoader size="lg" /> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => <Link key={post.id} to={`/blog/${post.slug}`} className="group bg-white text-black rounded-3xl overflow-hidden border border-zinc-800">
              {post.featured_image ? <img src={post.featured_image} alt="" className="h-52 w-full object-cover grayscale group-hover:grayscale-0 transition duration-500" /> : <div className="h-52 bg-zinc-100" />}
              <div className="p-6"><div className="text-xs uppercase tracking-widest text-zinc-500 mb-3">{post.focus_keyword || "Digital tools"}</div><h2 className="text-2xl font-bold tracking-tight">{post.title}</h2><p className="text-zinc-600 mt-3 line-clamp-3">{post.excerpt}</p><span className="inline-flex items-center gap-1 mt-6 font-semibold">Read guide <ArrowUpRight className="w-4 h-4" /></span></div>
            </Link>)}
            {!posts.length && <p className="text-zinc-400">New expert guides are being prepared.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
