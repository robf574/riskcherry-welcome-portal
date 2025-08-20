import { useState, FormEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Building, Globe, Users, Target, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface GameStudioFormProps {
  onBack: () => void;
  onComplete: () => void;
}

const GameStudioForm = ({ onBack, onComplete }: GameStudioFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    studioName: '',
    website: '',
    companySize: '',
    foundedYear: '',
    primaryContact: '',
    contactEmail: '',
    businessType: '',
    targetMarkets: [] as string[],
    gameTypes: [] as string[],
    monthlyVolume: '',
    complianceRequirements: [] as string[],
    currentCertifications: '',
    projectTimeline: '',
    technicalRequirements: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const marketOptions = [
    'Europe', 'North America', 'Asia Pacific', 'Latin America', 
    'Africa', 'Middle East', 'Australia/Oceania'
  ];

  const gameTypeOptions = [
    'Slot Games', 'Table Games', 'Live Casino', 'Sports Betting',
    'Poker', 'Bingo', 'Lottery', 'Virtual Sports', 'Skill Games'
  ];

  const complianceOptions = [
    'MGA (Malta)', 'UKGC (UK)', 'Curacao eGaming', 'Gibraltar',
    'ISO 27001', 'eCOGRA', 'iTech Labs', 'GLI', 'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.studioName.trim()) {
      toast({
        title: "Validation Error",
        description: "Studio name is required",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid contact email",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.targetMarkets.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one target market",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.gameTypes.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one game type",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store data
    localStorage.setItem('riskcherry-game-studio', JSON.stringify({
      ...formData,
      timestamp: new Date().toISOString()
    }));

    toast({
      title: "Success!",
      description: "Game studio information has been saved successfully.",
    });

    setIsSubmitting(false);
    onComplete();
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Game Studio Information</h1>
          <p className="text-muted-foreground">
            Tell us about your game studio and certification requirements
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>General details about your game studio</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studioName" className="text-base font-medium">
                    Studio Name *
                  </Label>
                  <Input
                    id="studioName"
                    placeholder="Your Game Studio Ltd."
                    value={formData.studioName}
                    onChange={(e) => handleInputChange('studioName', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-base font-medium">
                    Website
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="website"
                      placeholder="https://yourstudio.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-base font-medium">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foundedYear" className="text-base font-medium">
                    Founded Year
                  </Label>
                  <Input
                    id="foundedYear"
                    type="number"
                    placeholder="2020"
                    min="1990"
                    max={new Date().getFullYear()}
                    value={formData.foundedYear}
                    onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-medium">Business Type</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operator">Game Operator</SelectItem>
                      <SelectItem value="developer">Game Developer</SelectItem>
                      <SelectItem value="provider">Software Provider</SelectItem>
                      <SelectItem value="platform">Platform Provider</SelectItem>
                      <SelectItem value="aggregator">Content Aggregator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryContact" className="text-base font-medium">
                    Primary Contact Name
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="primaryContact"
                      placeholder="John Doe"
                      value={formData.primaryContact}
                      onChange={(e) => handleInputChange('primaryContact', e.target.value)}
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-base font-medium">
                    Contact Email *
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="contact@yourstudio.com"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market & Products */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <CardTitle>Market & Products</CardTitle>
                  <CardDescription>Your target markets and game offerings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Target Markets */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Target Markets *</Label>
                  <Badge variant="secondary">
                    {formData.targetMarkets.length} selected
                  </Badge>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {marketOptions.map((market) => (
                    <div key={market} className="flex items-center space-x-2">
                      <Checkbox
                        id={`market-${market}`}
                        checked={formData.targetMarkets.includes(market)}
                        onCheckedChange={(checked) => handleArrayChange('targetMarkets', market, checked as boolean)}
                      />
                      <Label htmlFor={`market-${market}`} className="text-sm">
                        {market}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Game Types */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Game Types *</Label>
                  <Badge variant="secondary">
                    {formData.gameTypes.length} selected
                  </Badge>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {gameTypeOptions.map((gameType) => (
                    <div key={gameType} className="flex items-center space-x-2">
                      <Checkbox
                        id={`game-${gameType}`}
                        checked={formData.gameTypes.includes(gameType)}
                        onCheckedChange={(checked) => handleArrayChange('gameTypes', gameType, checked as boolean)}
                      />
                      <Label htmlFor={`game-${gameType}`} className="text-sm">
                        {gameType}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium">Expected Monthly Volume</Label>
                <Select value={formData.monthlyVolume} onValueChange={(value) => handleInputChange('monthlyVolume', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select volume range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-100k">Under €100K</SelectItem>
                    <SelectItem value="100k-500k">€100K - €500K</SelectItem>
                    <SelectItem value="500k-1m">€500K - €1M</SelectItem>
                    <SelectItem value="1m-5m">€1M - €5M</SelectItem>
                    <SelectItem value="5m-10m">€5M - €10M</SelectItem>
                    <SelectItem value="over-10m">Over €10M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Compliance & Technical */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance & Technical Requirements</CardTitle>
              <CardDescription>Certification needs and technical specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Compliance Requirements */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Required Compliance Certifications</Label>
                  <Badge variant="secondary">
                    {formData.complianceRequirements.length} selected
                  </Badge>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {complianceOptions.map((compliance) => (
                    <div key={compliance} className="flex items-center space-x-2">
                      <Checkbox
                        id={`compliance-${compliance}`}
                        checked={formData.complianceRequirements.includes(compliance)}
                        onCheckedChange={(checked) => handleArrayChange('complianceRequirements', compliance, checked as boolean)}
                      />
                      <Label htmlFor={`compliance-${compliance}`} className="text-sm">
                        {compliance}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentCertifications" className="text-base font-medium">
                  Current Certifications
                </Label>
                <Textarea
                  id="currentCertifications"
                  placeholder="List any existing certifications or compliance standards you currently hold..."
                  value={formData.currentCertifications}
                  onChange={(e) => handleInputChange('currentCertifications', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium">Project Timeline</Label>
                <Select value={formData.projectTimeline} onValueChange={(value) => handleInputChange('projectTimeline', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="When do you need certification?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP (Within 1 month)</SelectItem>
                    <SelectItem value="1-3months">1-3 months</SelectItem>
                    <SelectItem value="3-6months">3-6 months</SelectItem>
                    <SelectItem value="6-12months">6-12 months</SelectItem>
                    <SelectItem value="planning">Planning phase</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="technicalRequirements" className="text-base font-medium">
                  Technical Requirements
                </Label>
                <Textarea
                  id="technicalRequirements"
                  placeholder="Describe any specific technical requirements, integrations, or constraints..."
                  value={formData.technicalRequirements}
                  onChange={(e) => handleInputChange('technicalRequirements', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="text-base font-medium">
                  Additional Information
                </Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any additional information that would help us serve you better..."
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="gap-2 gradient-cherry"
              size="lg"
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? 'Saving Information...' : 'Complete Game Studio Setup'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameStudioForm;