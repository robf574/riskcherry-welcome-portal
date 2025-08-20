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
    gamesPerMonth: '',
    rtpsPerGame: '',
    gameTypes: '',
    codingLanguages: '',
    regulatedMarkets: ''
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
    
    if (!formData.gamesPerMonth || !formData.rtpsPerGame || !formData.gameTypes) {
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
              <Label htmlFor="gamesPerMonth">Games per month *</Label>
              <Input
                id="gamesPerMonth"
                value={formData.gamesPerMonth}
                onChange={(e) => handleInputChange('gamesPerMonth', e.target.value)}
                placeholder="e.g., 10"
                required
              />
            </div>

            <div>
              <Label htmlFor="rtpsPerGame">RTPs per game *</Label>
              <Input
                id="rtpsPerGame"
                value={formData.rtpsPerGame}
                onChange={(e) => handleInputChange('rtpsPerGame', e.target.value)}
                placeholder="e.g., 5"
                required
              />
            </div>

            <div>
              <Label htmlFor="gameTypes">Types of game *</Label>
              <Input
                id="gameTypes"
                value={formData.gameTypes}
                onChange={(e) => handleInputChange('gameTypes', e.target.value)}
                placeholder="Slot, Crash, Mine, Plinko, etc"
                required
              />
            </div>

            <div>
              <Label htmlFor="codingLanguages">Coding languages</Label>
              <Input
                id="codingLanguages"
                value={formData.codingLanguages}
                onChange={(e) => handleInputChange('codingLanguages', e.target.value)}
                placeholder="JavaScript, Python, C#, etc"
              />
            </div>

            <div>
              <Label htmlFor="regulatedMarkets">Regulated Markets</Label>
              <Textarea
                id="regulatedMarkets"
                value={formData.regulatedMarkets}
                onChange={(e) => handleInputChange('regulatedMarkets', e.target.value)}
                placeholder="UK, Malta, Curacao, etc"
                rows={3}
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