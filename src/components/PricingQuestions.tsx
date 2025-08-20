import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PricingQuestionsProps {
  onBack: () => void;
  onComplete: () => void;
}

const PricingQuestions = ({ onBack, onComplete }: PricingQuestionsProps) => {
  const [formData, setFormData] = useState({
    expectedVolume: '',
    businessModel: '',
    integrationTimeline: '',
    budgetRange: '',
    specificRequirements: '',
    complianceNeeds: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.expectedVolume || !formData.businessModel || !formData.integrationTimeline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pricing Questions Completed",
      description: "Your pricing requirements have been saved.",
    });

    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Pricing Questions</h1>
            <p className="text-muted-foreground">Help us understand your requirements and needs</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commercial Requirements</CardTitle>
          <CardDescription>
            Please provide information about your expected usage and requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="expectedVolume">Expected Monthly Volume *</Label>
              <Input
                id="expectedVolume"
                value={formData.expectedVolume}
                onChange={(e) => handleInputChange('expectedVolume', e.target.value)}
                placeholder="e.g., 1000 tests per month"
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                Approximate number of tests/transactions expected per month
              </p>
            </div>

            <div>
              <Label>Business Model *</Label>
              <RadioGroup
                value={formData.businessModel}
                onValueChange={(value) => handleInputChange('businessModel', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="b2b" id="b2b" />
                  <Label htmlFor="b2b">B2B (Business to Business)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="b2c" id="b2c" />
                  <Label htmlFor="b2c">B2C (Business to Consumer)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="b2b2c" id="b2b2c" />
                  <Label htmlFor="b2b2c">B2B2C (Business to Business to Consumer)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Expected Integration Timeline *</Label>
              <RadioGroup
                value={formData.integrationTimeline}
                onValueChange={(value) => handleInputChange('integrationTimeline', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="immediate" id="immediate" />
                  <Label htmlFor="immediate">Immediate (within 1 month)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="short" />
                  <Label htmlFor="short">Short-term (1-3 months)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium-term (3-6 months)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long" id="long" />
                  <Label htmlFor="long">Long-term (6+ months)</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Budget Range</Label>
              <RadioGroup
                value={formData.budgetRange}
                onValueChange={(value) => handleInputChange('budgetRange', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="under-10k" id="under-10k" />
                  <Label htmlFor="under-10k">Under $10,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="10k-50k" id="10k-50k" />
                  <Label htmlFor="10k-50k">$10,000 - $50,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="50k-100k" id="50k-100k" />
                  <Label htmlFor="50k-100k">$50,000 - $100,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="over-100k" id="over-100k" />
                  <Label htmlFor="over-100k">Over $100,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="discuss" id="discuss" />
                  <Label htmlFor="discuss">To be discussed</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="complianceNeeds">Compliance Requirements</Label>
              <Textarea
                id="complianceNeeds"
                value={formData.complianceNeeds}
                onChange={(e) => handleInputChange('complianceNeeds', e.target.value)}
                placeholder="e.g., UKGC, MGA, Curacao, etc."
                rows={3}
              />
              <p className="text-sm text-muted-foreground mt-1">
                List any specific regulatory compliance requirements
              </p>
            </div>

            <div>
              <Label htmlFor="specificRequirements">Additional Requirements</Label>
              <Textarea
                id="specificRequirements"
                value={formData.specificRequirements}
                onChange={(e) => handleInputChange('specificRequirements', e.target.value)}
                placeholder="Any specific features, customizations, or requirements..."
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full">
              Complete Pricing Questions
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingQuestions;