import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// GitHub Pages redirect handling
const GitHubPagesRedirect = () => {
  useEffect(() => {
    // Check if we're on GitHub Pages and need to redirect
    if (window.location.pathname.includes('/?/')) {
      const path = window.location.pathname.split('/?/')[1];
      if (path) {
        // Corrected to include basename in the history replacement
        window.history.replaceState(null, '', '/riskcherry-welcome-portal/' + path);
      }
    }
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GitHubPagesRedirect />
      <BrowserRouter basename="/riskcherry-welcome-portal">
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
