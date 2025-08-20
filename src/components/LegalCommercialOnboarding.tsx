import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  DollarSign, 
  Scale,
  CheckCircle2, 
  Clock,
  ArrowLeft
} from "lucide-react";
import MutualNDA from "./MutualNDA";
import PricingQuestions from "./PricingQuestions";
import MasterServiceAgreement from "./MasterServiceAgreement";

interface LegalCommercialStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'in-progress' | 'completed';
}

interface LegalCommercialOnboardingProps {
  onBack: () => void;
  onComplete: () => void;
}

const LegalCommercialOnboarding = ({ onBack, onComplete }: LegalCommercialOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [steps, setSteps] = useState<LegalCommercialStep[]>([
    {
      id: 'mutual-nda',
      title: 'Mutual NDA',
      description: 'Review and complete mutual non-disclosure agreement with entity details',
      icon: <FileText className="w-5 h-5" />,
      status: 'pending'
    },
    {
      id: 'pricing-questions',
      title: 'Pricing Questions',
      description: 'Complete pricing requirements and questionnaire',
      icon: <DollarSign className="w-5 h-5" />,
      status: 'pending'
    },
    {
      id: 'master-service-agreement',
      title: 'Master Service Agreement',
      description: 'Review master service agreement and pricing schedule',
      icon: <Scale className="w-5 h-5" />,
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
    
    // Check if all steps are completed
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, status: 'completed' as const } : step
    );
    const allCompleted = updatedSteps.every(step => step.status === 'completed');
    
    if (allCompleted) {
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
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
          {currentStep === 'mutual-nda' && (
            <MutualNDA 
              onBack={() => setCurrentStep(null)} 
              onComplete={() => handleStepComplete('mutual-nda')}
            />
          )}
          {currentStep === 'pricing-questions' && (
            <PricingQuestions 
              onBack={() => setCurrentStep(null)} 
              onComplete={() => handleStepComplete('pricing-questions')}
            />
          )}
          {currentStep === 'master-service-agreement' && (
            <MasterServiceAgreement 
              onBack={() => setCurrentStep(null)} 
              onComplete={() => handleStepComplete('master-service-agreement')}
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
            <Button variant="secondary" onClick={onBack} className="gap-2 bg-card text-card-foreground hover:bg-card/90">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-lg">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-card">RiskCherry Client Onboarding - Legal & Commercial</h1>
              <p className="text-card/80">Complete legal agreements and commercial setup</p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Legal & Commercial Progress</CardTitle>
                <CardDescription>
                  Complete all legal and commercial requirements
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
                ? "🎉 Legal & Commercial onboarding completed! You can now access Lab Onboarding." 
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
              Contact onboarding@riskcherry.com for any help with legal and commercial requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <a href="mailto:onboarding@riskcherry.com">
                Contact Us
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LegalCommercialOnboarding;