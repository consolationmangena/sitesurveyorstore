import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, User, Clock, ArrowLeft, Tag, Heart, Share2, Eye, MessageSquare, BookOpen, ChevronRight, ThumbsUp, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useBlogPost } from "@/hooks/useDatabase";

const RELATED_POSTS = [
  {
    id: 3,
    title: "Blockchain Technology in Land Management",
    excerpt: "Exploring how blockchain technology is being used to create transparent, tamper-proof land registry systems.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop",
    readTime: "10 min read",
    category: "Innovation"
  },
  {
    id: 4,
    title: "Mobile GIS in the Field",
    excerpt: "Essential tips and techniques for effective mobile GIS data collection in challenging terrain.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop",
    readTime: "7 min read",
    category: "Field Work"
  },
  {
    id: 5,
    title: "Drone Photogrammetry for Infrastructure",
    excerpt: "Learn how to use drone technology for effective infrastructure monitoring and maintenance.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=200&fit=crop",
    readTime: "12 min read",
    category: "Remote Sensing"
  }
];

export default function BlogPost() {
  const { slug } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  // Use the slug to get the blog post
  const { post, loading, error } = useBlogPost(slug);

  useEffect(() => {
    if (post) {
      setLikes(post.like_count || 0);
    }
  }, [post]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-black text-slate-800 mb-4">Article Not Found</h1>
          <p className="text-lg text-slate-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/blog">
            <Button className="btn-professional-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link to="/blog">
            <Button variant="outline" className="btn-professional-outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden mb-8">
            {/* Hero Image */}
            {post.featured_image && (
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={post.featured_image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="mb-4 bg-white/90 text-slate-800 font-bold">
                    {post.category}
                  </Badge>
                  <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
                    {post.title}
                  </h1>
                </div>
              </div>
            )}

            {/* Article Meta */}
            <div className="p-8 border-b border-slate-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img 
                    src={post.author_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author_name)}&background=random`} 
                    alt={post.author_name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{post.author_name}</h3>
                    <p className="text-slate-600 font-medium">{post.author_role}</p>
                    {post.author_bio && (
                      <p className="text-sm text-slate-500">{post.author_bio}</p>
                    )}
                  </div>
                </div>

                {/* Article Stats */}
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.published_at || post.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.read_time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.view_count?.toLocaleString() || 0} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comment_count || 0} comments</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-semibold">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                {/* Excerpt */}
                <div className="text-xl text-slate-700 font-medium mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                  {post.excerpt}
                </div>
                
                {/* Content */}
                <div 
                  className="text-slate-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>

            {/* Article Footer */}
            <div className="p-8 border-t border-slate-200 bg-slate-50/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Like Button */}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleLike}
                    variant={isLiked ? "default" : "outline"}
                    className={`rounded-full px-6 py-3 font-bold transition-all hover:scale-105 ${
                      isLiked 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'border-red-300 text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    {likes} Likes
                  </Button>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-600 mr-2">Share:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="rounded-full hover:bg-blue-50 hover:border-blue-300"
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                    className="rounded-full hover:bg-blue-50 hover:border-blue-300"
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('linkedin')}
                    className="rounded-full hover:bg-blue-50 hover:border-blue-300"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-800 mb-4">Related Articles</h2>
            <p className="text-lg text-slate-600 font-medium">Continue exploring geomatics insights</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {RELATED_POSTS.map((relatedPost) => (
              <Card key={relatedPost.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-2 border-slate-200 hover:border-blue-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90 backdrop-blur-sm font-bold text-xs">
                      {relatedPost.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  
                  <p className="text-slate-600 font-medium mb-4 line-clamp-3 leading-relaxed">
                    {relatedPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                  
                  <Link to={`/blog/${relatedPost.id}`}>
                    <Button variant="outline" className="w-full rounded-xl border-2 hover:bg-blue-50 hover:border-blue-300 font-bold transition-all group-hover:scale-105">
                      Read Article
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.blue.500/20),transparent_50%)]"></div>
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4">Enjoyed This Article?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for more insights on geomatics technology and industry trends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}