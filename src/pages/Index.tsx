import { useState, useEffect } from "react";
import TokenAccess from "@/components/TokenAccess";
import OnboardingDashboard from "@/components/OnboardingDashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has valid token on page load
    const token = localStorage.getItem('riskcherry-onboard-token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleTokenValidated = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-primary-foreground font-bold text-sm">🍒</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <TokenAccess onTokenValidated={handleTokenValidated} />;
  }

  return <OnboardingDashboard />;
};

export default Index;
