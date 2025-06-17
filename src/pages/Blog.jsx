import { Calendar, User, Clock, ArrowRight, Tag, TrendingUp, BookOpen, MessageSquare, Heart, Share2, Eye, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlogPosts, useBlogStats } from "@/hooks/useDatabase";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Database hooks
  const { stats } = useBlogStats();
  
  // Build filters for blog posts
  const filters = {
    ...(searchTerm && { search: searchTerm }),
    ...(selectedCategory !== "All" && { category: selectedCategory })
  };
  
  const { posts, loading, error } = useBlogPosts(filters);

  const featuredPosts = posts?.filter(post => post.is_featured) || [];
  const regularPosts = posts?.filter(post => !post.is_featured) || [];

  // Get unique categories from posts
  const categories = [
    { name: "All", count: posts?.length || 0, color: "bg-blue-100 text-blue-800" },
    ...Array.from(new Set(posts?.map(post => post.category) || [])).map(category => ({
      name: category,
      count: posts?.filter(post => post.category === category).length || 0,
      color: "bg-indigo-100 text-indigo-800"
    }))
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-black text-slate-800 mb-4">Error Loading Blog Posts</h1>
          <p className="text-lg text-slate-600 mb-8">There was a problem loading the blog posts. Please try again later.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          </div>
          
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50 mx-auto max-w-5xl">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              Geomatics Insights
            </h1>
            <p className="text-xl text-slate-600 font-medium max-w-4xl mx-auto leading-relaxed mb-8">
              Discover the latest trends, innovations, and best practices in geomatics technology. 
              From AI-powered surveying to blockchain land management, explore the future of spatial technology.
            </p>
            
            {stats && (
              <div className="flex items-center justify-center gap-8 text-lg flex-wrap">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-blue-800">{stats.totalPosts}</span>
                  <span className="text-blue-600 font-medium">Articles</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                  <Eye className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-800">{stats.totalViews?.toLocaleString()}</span>
                  <span className="text-green-600 font-medium">Total Views</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-800">{stats.totalLikes}</span>
                  <span className="text-purple-600 font-medium">Likes</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search Input */}
              <div className="relative flex-1 w-full lg:w-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all bg-white/90 backdrop-blur-sm shadow-lg"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105 ${
                      selectedCategory === category.name
                        ? 'bg-blue-600 text-white shadow-lg'
                        : `${category.color} hover:shadow-md`
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur opacity-20 animate-pulse"></div>
              <div className="relative inline-block animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600 shadow-lg"></div>
            </div>
            <p className="mt-6 text-xl text-slate-600 animate-pulse font-medium">Loading articles...</p>
          </div>
        )}

        {/* Featured Posts Section */}
        {!loading && selectedCategory === "All" && featuredPosts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-800">Featured Articles</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-2 border-slate-200 hover:border-blue-300 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500 text-white font-bold">
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/90 backdrop-blur-sm font-bold">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={post.author_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author_name)}&background=random`}
                        alt={post.author_name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                      />
                      <div>
                        <h4 className="font-bold text-slate-800">{post.author_name}</h4>
                        <p className="text-slate-600 text-sm">{post.author_role}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 font-medium mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.read_time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.view_count?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.like_count}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-semibold">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Link to={`/blog/${post.id}`}>
                      <Button className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        {!loading && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl font-black text-slate-800">
                  {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
                </h2>
              </div>
              <div className="text-slate-600 font-medium">
                {posts?.length || 0} article{posts?.length !== 1 ? 's' : ''} found
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === "All" ? regularPosts : posts || []).map((post) => (
                <Card key={post.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-2 border-slate-200 hover:border-blue-300 overflow-hidden h-full flex flex-col">
                  <div className="relative">
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/90 backdrop-blur-sm font-bold text-xs">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={post.author_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author_name)}&background=random`}
                        alt={post.author_name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-lg"
                      />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{post.author_name}</h4>
                        <p className="text-slate-600 text-xs">{post.author_role}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 flex-shrink-0">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 font-medium mb-4 line-clamp-3 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.read_time}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{post.view_count?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{post.like_count}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-semibold">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags?.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="outline" className="w-full rounded-xl border-2 hover:bg-blue-50 hover:border-blue-300 font-bold transition-all group-hover:scale-105">
                        Read More
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && posts?.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <BookOpen className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3">No articles found</h3>
            <p className="text-slate-600 font-medium mb-8 leading-relaxed">
              We couldn't find any articles matching your criteria. Try adjusting your search or filter settings.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.blue.500/20),transparent_50%)]"></div>
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-black text-white mb-4">Stay Updated</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get the latest insights on geomatics technology, industry trends, and SiteSurveyor updates delivered to your inbox.
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
              <p className="text-gray-400 text-sm mt-4">
                Join 2,500+ geomatics professionals. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}