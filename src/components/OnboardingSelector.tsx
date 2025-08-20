import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  FlaskConical, 
  CheckCircle2, 
  Lock,
  LogOut
} from "lucide-react";
import LegalCommercialOnboarding from "./LegalCommercialOnboarding";
import OnboardingDashboard from "./OnboardingDashboard";

const OnboardingSelector = () => {
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [legalCommercialCompleted, setLegalCommercialCompleted] = useState(false);

  useEffect(() => {
    // Check if Legal & Commercial onboarding is completed
    const completed = localStorage.getItem('riskcherry-legal-commercial-completed');
    if (completed === 'true') {
      setLegalCommercialCompleted(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('riskcherry-onboard-token');
    window.location.reload();
  };

  const handleLegalCommercialComplete = () => {
    setLegalCommercialCompleted(true);
    localStorage.setItem('riskcherry-legal-commercial-completed', 'true');
    setCurrentSection(null);
  };

  if (currentSection === 'legal-commercial') {
    return (
      <LegalCommercialOnboarding 
        onBack={() => setCurrentSection(null)}
        onComplete={handleLegalCommercialComplete}
      />
    );
  }

  if (currentSection === 'lab-onboarding') {
    return <OnboardingDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">🍒</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">RiskCherry Onboarding</h1>
              <p className="text-muted-foreground">Choose your onboarding path</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Onboarding Sections */}
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {/* Legal & Commercial Onboarding */}
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg animate-slide-up ${
              legalCommercialCompleted ? 'ring-2 ring-accent' : ''
            }`}
            onClick={() => setCurrentSection('legal-commercial')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    legalCommercialCompleted ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'
                  }`}>
                    {legalCommercialCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Scale className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl">Legal & Commercial Onboarding</CardTitle>
                    <CardDescription className="mt-1">
                      Complete legal agreements and commercial setup
                    </CardDescription>
                  </div>
                </div>
                <Badge className={legalCommercialCompleted ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}>
                  {legalCommercialCompleted ? 'Completed' : 'Required'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                  <span>Mutual NDA review and entity details</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                  <span>Pricing questions and requirements</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                  <span>Master Service Agreement and pricing schedule</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lab Onboarding */}
          <Card 
            className={`transition-all duration-200 animate-slide-up ${
              legalCommercialCompleted 
                ? 'cursor-pointer hover:shadow-lg' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ animationDelay: '150ms' }}
            onClick={() => legalCommercialCompleted && setCurrentSection('lab-onboarding')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    legalCommercialCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {legalCommercialCompleted ? (
                      <FlaskConical className="w-6 h-6" />
                    ) : (
                      <Lock className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl">Lab Onboarding</CardTitle>
                    <CardDescription className="mt-1">
                      Technical setup and certification process
                    </CardDescription>
                  </div>
                </div>
                <Badge className={legalCommercialCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}>
                  {legalCommercialCompleted ? 'Available' : 'Locked'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                  <span>Review technical documentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                  <span>Portal administrator setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div>
                  <span>Demo and introduction call booking</span>
                </div>
              </div>
              {!legalCommercialCompleted && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Complete Legal & Commercial Onboarding first
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Assistance?</CardTitle>
            <CardDescription>
              Contact TAM@riskcherry.com for any help through the process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <a href="mailto:TAM@riskcherry.com">
                Contact TAM@riskcherry.com
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingSelector;