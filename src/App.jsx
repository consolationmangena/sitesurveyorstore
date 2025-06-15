import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import RequestSolutionPage from "./pages/RequestSolution";
import AppStore from "./pages/AppStore";
import AppDetailPage from "./pages/AppDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/sitesurveyor">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/appstore" element={<AppStore />} />
          <Route path="/about" element={<About />} />
          <Route path="/request-solution" element={<RequestSolutionPage />} />
          <Route path="/app/:id" element={<AppDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;