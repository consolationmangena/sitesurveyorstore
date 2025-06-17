import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, Clock, ArrowRight, Tag, TrendingUp, BookOpen, MessageSquare, Heart, Share2, Eye, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of AI in African Geomatics: Transforming Surveying with Machine Learning",
    excerpt: "Discover how artificial intelligence is revolutionizing geomatics workflows across Africa, from automated feature detection to predictive terrain modeling.",
    content: "Artificial Intelligence is reshaping the geomatics landscape across Africa, offering unprecedented opportunities to automate complex surveying tasks and improve accuracy. In this comprehensive guide, we explore how machine learning algorithms are being integrated into modern surveying workflows...",
    author: "Consolation Mangena",
    authorRole: "Founder & Lead Developer",
    authorAvatar: "/profile.jpg",
    publishedAt: "2024-03-15",
    readTime: "8 min read",
    category: "Technology",
    tags: ["AI", "Machine Learning", "Surveying", "Innovation"],
    featured: true,
    views: 2847,
    likes: 156,
    comments: 23,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Open Source vs Premium: Choosing the Right Geomatics Tools for Your Project",
    excerpt: "A comprehensive comparison of open-source and premium geomatics solutions, helping you make informed decisions for your surveying projects.",
    content: "The choice between open-source and premium geomatics tools can significantly impact your project's success and budget. This detailed analysis examines the pros and cons of each approach...",
    author: "Dr. Sarah Mukamuri",
    authorRole: "GIS Specialist",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    publishedAt: "2024-03-12",
    readTime: "6 min read",
    category: "Guide",
    tags: ["Open Source", "Premium", "Tools", "Decision Making"],
    featured: false,
    views: 1923,
    likes: 89,
    comments: 15,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Blockchain Technology in Land Management: Securing Property Rights in Zimbabwe",
    excerpt: "Exploring how blockchain technology is being used to create transparent, tamper-proof land registry systems across Zimbabwe and Africa.",
    content: "Blockchain technology offers a revolutionary approach to land management, providing immutable records and transparent transactions. In Zimbabwe, where land rights have been a complex issue...",
    author: "James Chikwanha",
    authorRole: "Blockchain Developer",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    publishedAt: "2024-03-10",
    readTime: "10 min read",
    category: "Innovation",
    tags: ["Blockchain", "Land Management", "Security", "Zimbabwe"],
    featured: true,
    views: 3156,
    likes: 201,
    comments: 34,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Mobile GIS in the Field: Best Practices for Data Collection in Remote Areas",
    excerpt: "Essential tips and techniques for effective mobile GIS data collection in challenging African terrain and remote locations.",
    content: "Mobile GIS has transformed field data collection, especially in remote African locations where traditional methods face significant challenges. This guide covers best practices...",
    author: "Tendai Moyo",
    authorRole: "Field Survey Specialist",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    publishedAt: "2024-03-08",
    readTime: "7 min read",
    category: "Field Work",
    tags: ["Mobile GIS", "Field Work", "Data Collection", "Remote Areas"],
    featured: false,
    views: 1654,
    likes: 78,
    comments: 12,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Drone Photogrammetry for Infrastructure Monitoring: A Complete Guide",
    excerpt: "Learn how to use drone technology and photogrammetry for effective infrastructure monitoring and maintenance planning.",
    content: "Drone photogrammetry has become an essential tool for infrastructure monitoring, offering cost-effective solutions for regular inspections and maintenance planning...",
    author: "Dr. Chipo Ndebele",
    authorRole: "Remote Sensing Expert",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    publishedAt: "2024-03-05",
    readTime: "12 min read",
    category: "Remote Sensing",
    tags: ["Drones", "Photogrammetry", "Infrastructure", "Monitoring"],
    featured: false,
    views: 2234,
    likes: 134,
    comments: 28,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Building Sustainable Geomatics Communities in Africa",
    excerpt: "Strategies for developing strong, sustainable geomatics communities that drive innovation and knowledge sharing across the continent.",
    content: "Building sustainable geomatics communities requires a combination of education, collaboration, and technological innovation. Across Africa, we're seeing the emergence of vibrant communities...",
    author: "Prof. Nomsa Sibanda",
    authorRole: "Academic Researcher",
    authorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    publishedAt: "2024-03-02",
    readTime: "9 min read",
    category: "Community",
    tags: ["Community", "Education", "Sustainability", "Africa"],
    featured: false,
    views: 1876,
    likes: 92,
    comments: 19,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop"
  }
];

const CATEGORIES = [
  { name: "All", count: BLOG_POSTS.length, color: "bg-blue-100 text-blue-800" },
  { name: "Technology", count: 2, color: "bg-purple-100 text-purple-800" },
  { name: "Guide", count: 1, color: "bg-green-100 text-green-800" },
  { name: "Innovation", count: 1, color: "bg-orange-100 text-orange-800" },
  { name: "Field Work", count: 1, color: "bg-indigo-100 text-indigo-800" },
  { name: "Remote Sensing", count: 1, color: "bg-pink-100 text-pink-800" },
  { name: "Community", count: 1, color: "bg-yellow-100 text-yellow-800" }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = BLOG_POSTS.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header title="Blog" subtitle="Insights & Innovation" />

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
            
            <div className="flex items-center justify-center gap-8 text-lg flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-800">{BLOG_POSTS.length}</span>
                <span className="text-blue-600 font-medium">Articles</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                <Eye className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-800">{BLOG_POSTS.reduce((sum, post) => sum + post.views, 0).toLocaleString()}</span>
                <span className="text-green-600 font-medium">Total Views</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200">
                <Heart className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-purple-800">{BLOG_POSTS.reduce((sum, post) => sum + post.likes, 0)}</span>
                <span className="text-purple-600 font-medium">Likes</span>
              </div>
            </div>
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
                {CATEGORIES.map((category) => (
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

        {/* Featured Posts Section */}
        {selectedCategory === "All" && (
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
                      src={post.image} 
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
                        src={post.authorAvatar} 
                        alt={post.author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                      />
                      <div>
                        <h4 className="font-bold text-slate-800">{post.author}</h4>
                        <p className="text-slate-600 text-sm">{post.authorRole}</p>
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
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-semibold">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
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
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(selectedCategory === "All" ? regularPosts : filteredPosts).map((post) => (
              <Card key={post.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-2 border-slate-200 hover:border-blue-300 overflow-hidden h-full flex flex-col">
                <div className="relative">
                  <img 
                    src={post.image} 
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
                      src={post.authorAvatar} 
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-lg"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{post.author}</h4>
                      <p className="text-slate-600 text-xs">{post.authorRole}</p>
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
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-semibold">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <Button variant="outline" className="w-full rounded-xl border-2 hover:bg-blue-50 hover:border-blue-300 font-bold transition-all group-hover:scale-105">
                    Read More
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

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

        {/* Popular Tags */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-800 mb-4">Popular Topics</h2>
            <p className="text-lg text-slate-600 font-medium">Explore articles by topic</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {Array.from(new Set(BLOG_POSTS.flatMap(post => post.tags))).map((tag) => (
              <button
                key={tag}
                className="px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 font-semibold transition-all hover:scale-105 hover:shadow-lg"
              >
                <Tag className="w-4 h-4 inline mr-2" />
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h2 className="text-4xl font-black mb-4">Have a Story to Share?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join our community of geomatics professionals and share your insights, experiences, and innovations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-slate-900 hover:bg-gray-100 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  <Share2 className="w-5 h-5 mr-2" />
                  Submit Article
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold px-8 py-4 rounded-full">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}