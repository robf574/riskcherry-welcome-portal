import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  User, 
  Building, 
  CheckCircle2, 
  Clock,
  Download,
  LogOut
} from "lucide-react";
import PortalAdminForm from "./PortalAdminForm";
import DocumentLibrary from "./DocumentLibrary";
import BookingCalendar from "./BookingCalendar";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'in-progress' | 'completed';
}

const OnboardingDashboard = () => {
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'documents',
      title: 'Review Documentation',
      description: 'Download and review important onboarding documents',
      icon: <FileText className="w-5 h-5" />,
      status: 'pending'
    },
    {
      id: 'portal-admin',
      title: 'Portal Admin Setup',
      description: 'Configure your portal administrator account details',
      icon: <User className="w-5 h-5" />,
      status: 'pending'
    },
    {
      id: 'book-demo',
      title: 'Book Demo & Intro Call',
      description: 'Schedule a demo session and introduction call with our team',
      icon: <Building className="w-5 h-5" />,
      status: 'pending'
    }
  ]);

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const progress = (completedSteps / steps.length) * 100;

  const updateStepStatus = (stepId: string, status: 'pending' | 'in-progress' | 'completed') => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status } : step
    ));
  };

  const handleStepClick = (stepId: string) => {
    setCurrentStep(currentStep === stepId ? null : stepId);
    updateStepStatus(stepId, 'in-progress');
  };

  const handleStepComplete = (stepId: string) => {
    updateStepStatus(stepId, 'completed');
    setCurrentStep(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('riskcherry-onboard-token');
    window.location.reload();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-accent text-accent-foreground';
      case 'in-progress': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (currentStep) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4 py-8">
          {currentStep === 'documents' && (
            <DocumentLibrary 
              onBack={() => setCurrentStep(null)} 
              onComplete={() => handleStepComplete('documents')}
            />
          )}
          {currentStep === 'portal-admin' && (
            <PortalAdminForm 
              onBack={() => setCurrentStep(null)} 
              onComplete={() => handleStepComplete('portal-admin')}
            />
          )}
          {currentStep === 'book-demo' && (
            <BookingCalendar 
              onBack={() => setCurrentStep(null)} 
              onComplete={() => handleStepComplete('book-demo')}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-lg">
              <span className="text-primary font-bold text-xl">🍒</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-card">RiskCherry Client Onboarding - Lab</h1>
              <p className="text-card/80">Welcome to your certification journey</p>
            </div>
          </div>
          <Button variant="secondary" onClick={handleLogout} className="gap-2 bg-card text-card-foreground hover:bg-card/90">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Onboarding Progress</CardTitle>
                <CardDescription>
                  Complete all steps to finish your onboarding process
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {completedSteps} / {steps.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="mb-4" />
            <p className="text-sm text-muted-foreground">
              {progress === 100 
                ? "🎉 Congratulations! You've completed the onboarding process." 
                : `${Math.round(progress)}% complete - ${steps.length - completedSteps} steps remaining`
              }
            </p>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Card 
              key={step.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg animate-slide-up ${
                step.status === 'completed' ? 'ring-2 ring-accent' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => handleStepClick(step.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-accent text-accent-foreground' :
                      step.status === 'in-progress' ? 'bg-primary text-primary-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : step.status === 'in-progress' ? (
                        <Clock className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        Step {index + 1}/{steps.length}: {step.title}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge className={getStatusColor(step.status)}>
                    {step.status === 'completed' ? 'Completed' : 
                     step.status === 'in-progress' ? 'In Progress' : 'Pending'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Assistance?</CardTitle>
            <CardDescription>
              Contact TAM@riskcherry.com for any more help through the process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" asChild>
                <a href="mailto:TAM@riskcherry.com">
                  Contact TAM@riskcherry.com
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingDashboard;