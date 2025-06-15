
import { useState, useMemo } from 'react';

export const useAppSearch = (apps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Get unique categories dynamically
  const categories = useMemo(() => {
    return [...new Set(apps.map(app => app.category).filter(Boolean))];
  }, [apps]);

  // Filter and sort apps dynamically
  const filteredApps = useMemo(() => {
    return apps
      .filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             app.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             app.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === "all" || app.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "downloads":
            return (b.download_count || 0) - (a.download_count || 0);
          case "updated":
            return new Date(b.updated_at) - new Date(a.updated_at);
          default:
            return 0;
        }
      });
  }, [apps, searchTerm, selectedCategory, sortBy]);

  // Calculate dynamic stats
  const stats = useMemo(() => {
    const totalDownloads = apps.reduce((sum, app) => sum + (app.download_count || 0), 0);
    return {
      totalApps: apps.length,
      totalDownloads,
      totalCategories: categories.length,
      filteredCount: filteredApps.length
    };
  }, [apps, categories.length, filteredApps.length]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
    filteredApps,
    stats
  };
};
