import { useState, useEffect } from "react";
import TokenAccess from "@/components/TokenAccess";
import OnboardingSelector from "@/components/OnboardingSelector";

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
          <img 
            src="/riskcherry-logo.png" 
            alt="RiskCherry Logo" 
            className="h-12 w-auto mx-auto mb-4 animate-pulse"
          />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <TokenAccess onTokenValidated={handleTokenValidated} />;
  }

  return <OnboardingSelector />;
};

export default Index;
