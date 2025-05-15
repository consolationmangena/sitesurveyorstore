import { Search, Database, Menu, User, LogOut, Upload } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SiteSurveyorIcon from "./SiteSurveyorIcon";
import AuthModal from "./auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/auth";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function Header({ title, subtitle, showSearch = false, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, loading, updateProfile } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Only accept images under 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image too large', { description: 'Please choose an image under 5MB' });
      return;
    }

    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `profiles/${user.id}/${fileName}`;

      // Upload to storage bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      await updateProfile({ avatar_url: publicUrl });

      toast.success('Profile picture updated!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to update profile picture');
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/appstore", label: "Applications" },
    { to: "/blog", label: "Insights" },
    { to: "/about", label: "About" },
    { to: "/request-solution", label: "Solutions" }
  ];

  const searchInput = (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="text-muted-foreground w-4 h-4" aria-hidden="true" />
      </div>
      <input
        className="block w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        type="search"
        placeholder="Search applications and resources..."
        aria-label="Search for applications"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (profile?.username) {
      return profile.username.slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const ProfileAvatar = ({ size = "default" }) => (
    <Button 
      variant="ghost" 
      className={`relative rounded-full ${size === "small" ? "h-8 w-8" : "h-10 w-10"}`}
      onClick={() => user ? navigate('/profile') : setShowAuthModal(true)}
    >
      <Avatar className={size === "small" ? "h-8 w-8" : "h-10 w-10"}>
        <AvatarImage src={profile?.avatar_url} alt={profile?.username || user?.email || 'User'} />
        <AvatarFallback>{user ? getUserInitials() : 'G'}</AvatarFallback>
      </Avatar>
    </Button>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container-professional">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <SiteSurveyorIcon size={40} className="transition-transform duration-200 group-hover:scale-105" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {title}
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  {subtitle}
                </p>
              </div>
            </Link>

            <div className="hidden md:flex flex-1 mx-8 max-w-md">
              {showSearch && (
                <div className="w-full animate-fade-in">
                  {searchInput}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden sm:flex">
                <div className="flex items-center space-x-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md ${
                        isActive(link.to) ? "text-primary bg-accent" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                      {isActive(link.to) && (
                        <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 bg-primary rounded-full"></span>
                      )}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Profile Section - Always Visible */}
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <ProfileAvatar size="small" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    {user ? (
                      <>
                        <div className="flex items-center justify-start gap-2 p-2">
                          <div className="flex flex-col space-y-1 leading-none">
                            {profile?.full_name && (
                              <p className="font-medium">{profile.full_name}</p>
                            )}
                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate('/profile')}>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="relative">
                          <Upload className="mr-2 h-4 w-4" />
                          <span>Update Picture</span>
                          <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleProfilePictureUpload}
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSignOut}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign out</span>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <DropdownMenuItem onClick={() => setShowAuthModal(true)}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Sign In</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="sm:hidden">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <div className="flex flex-col h-full">
                    <div className="flex-1 py-6">
                      <nav className="flex flex-col space-y-1">
                        {navLinks.map((link) => (
                          <SheetClose asChild key={link.to}>
                            <Link
                              to={link.to}
                              className={`flex items-center py-3 px-3 text-sm font-medium rounded-lg transition-colors ${
                                isActive(link.to)
                                  ? "bg-accent text-accent-foreground"
                                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                              }`}
                            >
                              {link.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </nav>
                      
                      {/* Mobile Auth */}
                      {!loading && (
                        <div className="mt-6 pt-6 border-t border-border">
                          {user ? (
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 px-3 py-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={profile?.avatar_url} alt={profile?.username || user.email} />
                                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  {profile?.full_name && (
                                    <p className="font-medium text-sm">{profile.full_name}</p>
                                  )}
                                  <p className="text-xs text-muted-foreground truncate">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                              <Button 
                                variant="outline" 
                                className="w-full justify-start" 
                                onClick={handleSignOut}
                              >
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign out
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              onClick={() => setShowAuthModal(true)} 
                              className="w-full"
                            >
                              Sign In
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center space-x-2 px-3 py-2 text-xs text-muted-foreground">
                        <Database className="h-3 w-3" />
                        <span>Apache 2.0 Licensed • Open Source</span>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <div className="hidden lg:flex items-center">
                <div className="flex items-center space-x-2 px-3 py-1.5 text-xs text-muted-foreground bg-muted/50 rounded-full border">
                  <Database className="h-3 w-3" />
                  <span>Apache 2.0 Licensed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4 border-b border-border/40">
            {showSearch && (
              <div className="animate-slide-up">
                {searchInput}
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}