import { Search, Database, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import SiteSurveyorIcon from "./SiteSurveyorIcon";

export default function Header({ title, subtitle, showSearch = false, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
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

  return (
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
  );
}