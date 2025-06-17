import { Search, Database, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
    { to: "/appstore", label: "App Store" },
    { to: "/about", label: "About" },
    { to: "/request-solution", label: "Request" }
  ];

  const searchInput = (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="text-slate-400 w-5 h-5" aria-hidden="true" />
      </div>
      <input
        className="block w-full rounded-full border-0 py-3 pl-12 pr-4 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 bg-white/80 backdrop-blur-sm sm:text-sm"
        type="search"
        placeholder="Search apps and tools..."
        aria-label="Search for apps"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/80 supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
              <div className="relative group-hover:scale-105 transition-transform duration-300">
                <SiteSurveyorIcon size={48} className="drop-shadow-lg" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] group-hover:bg-right transition-all duration-500 ease-in-out">
                {title}
              </h1>
              <p className="text-sm text-slate-600 font-medium group-hover:text-blue-600 transition-colors">
                {subtitle}
              </p>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 mx-8 max-w-lg">
            {showSearch && (
              <div className="w-full animate-in fade-in-0 zoom-in-95 duration-200">
                {searchInput}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <NavigationMenu className="hidden sm:flex">
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.to}>
                    <Link
                      to={link.to}
                      className={`${navigationMenuTriggerStyle()} group relative overflow-hidden ${
                        isActive(link.to) ? "text-blue-600" : ""
                      }`}
                    >
                      {link.label}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all ${
                        isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
                      }`}></span>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="sm:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-center mb-6">
                      <span className="text-lg font-semibold">Navigation</span>
                    </div>
                    <nav className="flex flex-col space-y-3">
                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.to}>
                          <Link
                            to={link.to}
                            className={`group flex items-center py-2 text-base font-medium ${
                              isActive(link.to)
                                ? "text-blue-600"
                                : "text-slate-700 hover:text-blue-600"
                            } transition-colors`}
                          >
                            <span className="relative">
                              {link.label}
                              <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-blue-600 transition-all ${
                                isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
                              }`}></span>
                            </span>
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <span className="inline-flex items-center gap-x-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-200 bg-blue-50">
                      <Database className="h-4 w-4" aria-hidden="true" />
                      Open Source • Apache 2.0 Licensed
                    </span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="hidden lg:flex items-center">
              <span className="inline-flex items-center gap-x-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-200 bg-blue-50">
                <Database className="h-4 w-4" aria-hidden="true" />
                Open Source • Apache 2.0 Licensed
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden -mx-4 px-4 pb-4 border-b border-slate-200/80">
          {showSearch && (
            <div className="animate-in slide-in-from-top duration-300">
              {searchInput}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}