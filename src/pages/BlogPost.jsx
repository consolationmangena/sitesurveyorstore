import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, User, Clock, ArrowLeft, Tag, Heart, Share2, Eye, MessageSquare, BookOpen, ChevronRight, ThumbsUp, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// This would normally come from an API or database
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of AI in African Geomatics: Transforming Surveying with Machine Learning",
    excerpt: "Discover how artificial intelligence is revolutionizing geomatics workflows across Africa, from automated feature detection to predictive terrain modeling.",
    content: `
      <h2>Introduction</h2>
      <p>Artificial Intelligence is reshaping the geomatics landscape across Africa, offering unprecedented opportunities to automate complex surveying tasks and improve accuracy. In this comprehensive guide, we explore how machine learning algorithms are being integrated into modern surveying workflows.</p>
      
      <h2>The Current State of AI in Geomatics</h2>
      <p>The integration of AI in geomatics has accelerated dramatically over the past five years. From automated feature detection in satellite imagery to predictive modeling for terrain analysis, AI is transforming how we collect, process, and analyze spatial data.</p>
      
      <h3>Key Applications</h3>
      <ul>
        <li><strong>Automated Feature Detection:</strong> Machine learning algorithms can now identify roads, buildings, and vegetation with 95%+ accuracy</li>
        <li><strong>Predictive Terrain Modeling:</strong> AI models can predict erosion patterns and land use changes</li>
        <li><strong>Quality Control:</strong> Automated error detection in survey data reduces manual review time by 70%</li>
        <li><strong>Data Processing:</strong> AI-powered workflows can process drone imagery 10x faster than traditional methods</li>
      </ul>
      
      <h2>African Context and Challenges</h2>
      <p>Africa presents unique challenges and opportunities for AI implementation in geomatics. Limited internet connectivity, diverse terrain, and varying levels of technological infrastructure require tailored solutions.</p>
      
      <h3>Opportunities</h3>
      <p>Despite challenges, Africa offers immense opportunities for AI-driven geomatics solutions:</p>
      <ul>
        <li>Vast unmapped territories requiring efficient surveying methods</li>
        <li>Growing mobile technology adoption enabling field data collection</li>
        <li>Increasing investment in infrastructure development</li>
        <li>Strong academic institutions developing local expertise</li>
      </ul>
      
      <h2>Case Studies</h2>
      
      <h3>Case Study 1: Automated Road Mapping in Kenya</h3>
      <p>A recent project in Kenya used AI to automatically map rural roads from satellite imagery, reducing mapping time from 6 months to 2 weeks while achieving 92% accuracy.</p>
      
      <h3>Case Study 2: Land Use Classification in Zimbabwe</h3>
      <p>Machine learning models trained on local data successfully classified land use patterns across 50,000 hectares, supporting agricultural planning and conservation efforts.</p>
      
      <h2>Implementation Strategies</h2>
      <p>Successfully implementing AI in African geomatics requires careful planning and consideration of local conditions:</p>
      
      <h3>1. Start Small and Scale</h3>
      <p>Begin with pilot projects in controlled environments before expanding to larger areas. This allows for model refinement and team training.</p>
      
      <h3>2. Invest in Local Capacity</h3>
      <p>Training local professionals in AI technologies ensures sustainable implementation and reduces dependency on external expertise.</p>
      
      <h3>3. Leverage Open Source Tools</h3>
      <p>Open source AI frameworks like TensorFlow and PyTorch provide cost-effective solutions for resource-constrained environments.</p>
      
      <h2>Future Outlook</h2>
      <p>The future of AI in African geomatics looks promising. Emerging technologies like edge computing will enable real-time AI processing in remote areas, while improved satellite coverage will provide better training data for machine learning models.</p>
      
      <h3>Emerging Trends</h3>
      <ul>
        <li><strong>Edge AI:</strong> Processing AI models directly on field devices</li>
        <li><strong>Federated Learning:</strong> Training models across distributed datasets while preserving privacy</li>
        <li><strong>Explainable AI:</strong> Making AI decisions transparent and understandable</li>
        <li><strong>Multi-modal Learning:</strong> Combining satellite, drone, and ground-based data</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>AI represents a transformative opportunity for African geomatics. By addressing local challenges and building on existing strengths, the continent can leapfrog traditional surveying limitations and establish itself as a leader in AI-driven spatial technology.</p>
      
      <p>The key to success lies in collaborative efforts between academia, industry, and government, ensuring that AI solutions are developed with African contexts in mind and benefit local communities.</p>
    `,
    author: "Consolation Mangena",
    authorRole: "Founder & Lead Developer",
    authorBio: "Consolation is a geomatics student at Midlands State University and the founder of SiteSurveyor. He specializes in AI applications for surveying and has published research on machine learning in geomatics.",
    authorAvatar: "/profile.jpg",
    publishedAt: "2024-03-15",
    readTime: "8 min read",
    category: "Technology",
    tags: ["AI", "Machine Learning", "Surveying", "Innovation"],
    featured: true,
    views: 2847,
    likes: 156,
    comments: 23,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop"
  },
  {
    id: 2,
    title: "Open Source vs Premium: Choosing the Right Geomatics Tools for Your Project",
    excerpt: "A comprehensive comparison of open-source and premium geomatics solutions, helping you make informed decisions for your surveying projects.",
    content: `
      <h2>Introduction</h2>
      <p>The choice between open-source and premium geomatics tools can significantly impact your project's success and budget. This detailed analysis examines the pros and cons of each approach, helping you make informed decisions for your surveying projects.</p>
      
      <h2>Understanding the Landscape</h2>
      <p>The geomatics software landscape has evolved dramatically over the past decade. Traditional proprietary solutions now compete with sophisticated open-source alternatives, while new hybrid models offer the best of both worlds.</p>
      
      <h3>Open Source Solutions</h3>
      <p>Open source geomatics tools have matured significantly, offering professional-grade capabilities at no licensing cost. Popular solutions include:</p>
      <ul>
        <li><strong>QGIS:</strong> Comprehensive desktop GIS with extensive plugin ecosystem</li>
        <li><strong>PostGIS:</strong> Spatial database extension for PostgreSQL</li>
        <li><strong>GDAL/OGR:</strong> Geospatial data abstraction library</li>
        <li><strong>OpenDroneMap:</strong> Drone imagery processing toolkit</li>
      </ul>
      
      <h3>Premium Solutions</h3>
      <p>Commercial software continues to offer advanced features and professional support:</p>
      <ul>
        <li><strong>Esri ArcGIS:</strong> Industry-leading GIS platform</li>
        <li><strong>Bentley MicroStation:</strong> CAD and engineering design</li>
        <li><strong>Trimble Business Center:</strong> Survey data processing</li>
        <li><strong>Pix4D:</strong> Professional photogrammetry software</li>
      </ul>
      
      <h2>Detailed Comparison</h2>
      
      <h3>Cost Analysis</h3>
      <p>The most obvious difference is cost, but the total cost of ownership includes more than just licensing fees:</p>
      
      <h4>Open Source Costs:</h4>
      <ul>
        <li>Software: $0</li>
        <li>Training: $2,000-5,000 per user</li>
        <li>Support: $1,000-3,000 annually</li>
        <li>Customization: $5,000-20,000</li>
      </ul>
      
      <h4>Premium Costs:</h4>
      <ul>
        <li>Software: $1,500-15,000 per license annually</li>
        <li>Training: $1,000-3,000 per user</li>
        <li>Support: Included in license</li>
        <li>Customization: $10,000-50,000</li>
      </ul>
      
      <h3>Feature Comparison</h3>
      <p>Both open source and premium solutions offer comprehensive feature sets, but with different strengths:</p>
      
      <table>
        <tr>
          <th>Feature</th>
          <th>Open Source</th>
          <th>Premium</th>
        </tr>
        <tr>
          <td>Basic GIS Operations</td>
          <td>Excellent</td>
          <td>Excellent</td>
        </tr>
        <tr>
          <td>Advanced Analytics</td>
          <td>Good</td>
          <td>Excellent</td>
        </tr>
        <tr>
          <td>User Interface</td>
          <td>Good</td>
          <td>Excellent</td>
        </tr>
        <tr>
          <td>Documentation</td>
          <td>Variable</td>
          <td>Excellent</td>
        </tr>
        <tr>
          <td>Integration</td>
          <td>Excellent</td>
          <td>Good</td>
        </tr>
      </table>
      
      <h2>Decision Framework</h2>
      <p>Use this framework to evaluate which approach is best for your organization:</p>
      
      <h3>Choose Open Source If:</h3>
      <ul>
        <li>Budget constraints are significant</li>
        <li>You have technical expertise in-house</li>
        <li>Customization and flexibility are priorities</li>
        <li>You want to avoid vendor lock-in</li>
        <li>Your workflows are relatively standard</li>
      </ul>
      
      <h3>Choose Premium If:</h3>
      <ul>
        <li>You need comprehensive support</li>
        <li>Advanced features are critical</li>
        <li>User experience is a priority</li>
        <li>Integration with existing systems is complex</li>
        <li>Compliance and certification are required</li>
      </ul>
      
      <h2>Hybrid Approaches</h2>
      <p>Many organizations find success with hybrid approaches that combine open source and premium tools:</p>
      
      <h3>Strategy 1: Core Open Source + Premium Plugins</h3>
      <p>Use open source tools for core functionality and premium plugins for specialized features.</p>
      
      <h3>Strategy 2: Open Source Development + Premium Production</h3>
      <p>Develop and test with open source tools, then deploy on premium platforms for production.</p>
      
      <h3>Strategy 3: Mixed Environment</h3>
      <p>Use different tools for different teams based on their specific needs and expertise levels.</p>
      
      <h2>Implementation Best Practices</h2>
      
      <h3>For Open Source Implementation:</h3>
      <ol>
        <li>Start with pilot projects to assess capabilities</li>
        <li>Invest in training and documentation</li>
        <li>Establish community connections for support</li>
        <li>Plan for ongoing maintenance and updates</li>
        <li>Consider commercial support options</li>
      </ol>
      
      <h3>For Premium Implementation:</h3>
      <ol>
        <li>Negotiate comprehensive licensing agreements</li>
        <li>Leverage vendor training and support</li>
        <li>Plan for regular software updates</li>
        <li>Establish clear upgrade paths</li>
        <li>Consider total cost of ownership</li>
      </ol>
      
      <h2>Future Considerations</h2>
      <p>The geomatics software landscape continues to evolve rapidly. Consider these trends when making long-term decisions:</p>
      
      <ul>
        <li><strong>Cloud-first architectures:</strong> Both open source and premium solutions are moving to cloud-based deployments</li>
        <li><strong>AI integration:</strong> Machine learning capabilities are becoming standard features</li>
        <li><strong>Mobile-first design:</strong> Field data collection is increasingly mobile-centric</li>
        <li><strong>API-driven development:</strong> Integration capabilities are becoming more important</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The choice between open source and premium geomatics tools isn't binary. The best approach depends on your specific needs, resources, and constraints. Many successful organizations use a combination of both, leveraging the strengths of each approach.</p>
      
      <p>Key factors to consider include budget, technical expertise, support requirements, and long-term strategic goals. Whatever you choose, ensure that your decision aligns with your organization's capabilities and objectives.</p>
    `,
    author: "Dr. Sarah Mukamuri",
    authorRole: "GIS Specialist",
    authorBio: "Dr. Mukamuri is a GIS specialist with over 15 years of experience in both open source and commercial geomatics solutions. She has led digital transformation projects across multiple African countries.",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    publishedAt: "2024-03-12",
    readTime: "6 min read",
    category: "Guide",
    tags: ["Open Source", "Premium", "Tools", "Decision Making"],
    featured: false,
    views: 1923,
    likes: 89,
    comments: 15,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop"
  }
  // Add more blog posts as needed
];

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
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const foundPost = BLOG_POSTS.find(p => p.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);
      setLikes(foundPost.likes);
    }
  }, [id]);

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

  if (!post) {
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
            <div className="relative h-96 overflow-hidden">
              <img 
                src={post.image} 
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

            {/* Article Meta */}
            <div className="p-8 border-b border-slate-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img 
                    src={post.authorAvatar} 
                    alt={post.author}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{post.author}</h3>
                    <p className="text-slate-600 font-medium">{post.authorRole}</p>
                    <p className="text-sm text-slate-500">{post.authorBio}</p>
                  </div>
                </div>

                {/* Article Stats */}
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments} comments</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-semibold">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
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