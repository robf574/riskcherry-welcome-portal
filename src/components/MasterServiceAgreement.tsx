import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Scale, Download, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MasterServiceAgreementProps {
  onBack: () => void;
  onComplete: () => void;
}

const MasterServiceAgreement = ({ onBack, onComplete }: MasterServiceAgreementProps) => {
  const [msaReviewed, setMsaReviewed] = useState(false);
  const [msaAccepted, setMsaAccepted] = useState(false);
  const [pricingAccepted, setPricingAccepted] = useState(false);
  const { toast } = useToast();

  const handleDownloadMSA = () => {
    toast({
      title: "MSA Downloaded",
      description: "The Master Service Agreement has been downloaded to your device.",
    });
    setMsaReviewed(true);
  };

  const handleSubmit = () => {
    if (!msaReviewed || !msaAccepted || !pricingAccepted) {
      toast({
        title: "Agreement Required",
        description: "Please review and accept all agreements to continue.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Master Service Agreement Completed",
      description: "All agreements have been reviewed and accepted.",
    });

    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  // Sample pricing data - this would come from your backend/API
  const pricingSchedule = [
    {
      tier: "Starter",
      volume: "Up to 1,000 tests/month",
      pricePerTest: "$0.50",
      monthlyMinimum: "$250",
      features: ["Basic RNG Testing", "Email Support", "Standard Reporting"]
    },
    {
      tier: "Professional", 
      volume: "1,001 - 10,000 tests/month",
      pricePerTest: "$0.35",
      monthlyMinimum: "$1,000",
      features: ["Advanced RNG Testing", "Priority Support", "Custom Reporting", "API Access"]
    },
    {
      tier: "Enterprise",
      volume: "10,001+ tests/month",
      pricePerTest: "Custom pricing",
      monthlyMinimum: "Contact us",
      features: ["Full Test Suite", "Dedicated Support", "Custom Integration", "White-label Options"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Scale className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Master Service Agreement</h1>
            <p className="text-muted-foreground">Review service agreement and pricing schedule</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* MSA Document Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Master Service Agreement
            </CardTitle>
            <CardDescription>
              Please review and download the Master Service Agreement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3 mb-3">
                  <Scale className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Master Service Agreement</h3>
                    <p className="text-sm text-muted-foreground">PDF Document • 1.2 MB</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  This agreement outlines the terms and conditions for RiskCherry's testing and certification services.
                </p>
                <Button 
                  onClick={handleDownloadMSA}
                  className="w-full gap-2"
                  variant={msaReviewed ? "secondary" : "default"}
                >
                  <Download className="w-4 h-4" />
                  {msaReviewed ? "Downloaded" : "Download & Review MSA"}
                  {msaReviewed && <CheckCircle2 className="w-4 h-4 ml-auto" />}
                </Button>
              </div>

              {msaReviewed && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="msa-accepted"
                      checked={msaAccepted}
                      onChange={(e) => setMsaAccepted(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="msa-accepted" className="text-sm">
                      I have reviewed and accept the Master Service Agreement
                    </label>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pricing Schedule Section */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Schedule</CardTitle>
            <CardDescription>
              Review our service tiers and pricing structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {pricingSchedule.map((tier, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">{tier.tier}</h3>
                    <Badge variant={index === 1 ? "default" : "secondary"}>
                      {index === 1 ? "Popular" : tier.tier}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume:</span>
                      <span className="font-medium">{tier.volume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price per test:</span>
                      <span className="font-medium">{tier.pricePerTest}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly minimum:</span>
                      <span className="font-medium">{tier.monthlyMinimum}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2">Included features:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Additional Notes:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• All prices are in USD and exclude applicable taxes</li>
                  <li>• Volume discounts available for enterprise customers</li>
                  <li>• Setup fees may apply for custom integrations</li>
                  <li>• Billing is monthly in advance</li>
                </ul>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="checkbox"
                  id="pricing-accepted"
                  checked={pricingAccepted}
                  onChange={(e) => setPricingAccepted(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="pricing-accepted" className="text-sm">
                  I have reviewed and accept the pricing schedule
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button 
          onClick={handleSubmit} 
          className="w-full"
          disabled={!msaReviewed || !msaAccepted || !pricingAccepted}
          size="lg"
        >
          Complete Master Service Agreement
        </Button>
      </div>
    </div>
  );
};

export default MasterServiceAgreement;