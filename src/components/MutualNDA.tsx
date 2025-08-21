import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, FileText, Download, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MutualNDAProps {
  onBack: () => void;
  onComplete: () => void;
}

const MutualNDA = ({ onBack, onComplete }: MutualNDAProps) => {
  const [formData, setFormData] = useState({
    entityName: '',
    registrationNumber: '',
    registrationCountry: '',
    registeredAddress: '',
    signatoryName: '',
    signatoryTitle: '',
    signatoryEmail: '',
    ndaReviewed: false,
    ndaAccepted: false
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDownloadNDA = () => {
    // Simulate NDA download
    toast({
      title: "NDA Downloaded",
      description: "The Mutual NDA document has been downloaded to your device.",
    });
    setFormData(prev => ({ ...prev, ndaReviewed: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.entityName || !formData.registrationNumber || !formData.registrationCountry || !formData.registeredAddress || !formData.signatoryName || !formData.signatoryTitle || !formData.signatoryEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.ndaReviewed) {
      toast({
        title: "NDA Requirements",
        description: "Please download and review the Mutual NDA to continue.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "NDA Completed",
      description: "Your entity details have been saved and NDA accepted.",
    });

    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="secondary" onClick={onBack} className="gap-2 bg-card text-card-foreground hover:bg-card/90">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-card rounded-full flex items-center justify-center shadow-lg">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-card">Mutual NDA</h1>
            <p className="text-card/80">Review agreement and provide entity details</p>
          </div>
        </div>
      </div>


      <div className="grid gap-8 lg:grid-cols-2">
        {/* NDA Document Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Mutual Non-Disclosure Agreement
            </CardTitle>
            <CardDescription>
              You can review the document and input your details below. Once complete, the executable version will be sent directly to the assigned signatory via DocuSign.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Mutual NDA Agreement</h3>
                    <p className="text-sm text-muted-foreground">PDF Document • 245 KB</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  This mutual non-disclosure agreement outlines the terms for confidential information sharing between RiskCherry and your organization.
                </p>
                <Button 
                  onClick={handleDownloadNDA}
                  className="w-full gap-2"
                  variant={formData.ndaReviewed ? "secondary" : "default"}
                >
                  <Download className="w-4 h-4" />
                  {formData.ndaReviewed ? "Downloaded" : "Download & Review NDA"}
                  {formData.ndaReviewed && <CheckCircle2 className="w-4 h-4 ml-auto" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Entity Details Form */}
        <Card>
          <CardHeader>
            <CardTitle>Entity & Signatory Details</CardTitle>
            <CardDescription>
              Please provide your organization and signatory information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Entity Information</h3>
                
                <div>
                  <Label htmlFor="entityName">Legal Entity Name *</Label>
                  <Input
                    id="entityName"
                    value={formData.entityName}
                    onChange={(e) => handleInputChange('entityName', e.target.value)}
                    placeholder="Enter your company's legal name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="registrationNumber">Company Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    placeholder="Enter registration number"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="registrationCountry">Country of Registration *</Label>
                  <Input
                    id="registrationCountry"
                    value={formData.registrationCountry}
                    onChange={(e) => handleInputChange('registrationCountry', e.target.value)}
                    placeholder="United Kingdom"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="registeredAddress">Registered Address *</Label>
                  <Textarea
                    id="registeredAddress"
                    value={formData.registeredAddress}
                    onChange={(e) => handleInputChange('registeredAddress', e.target.value)}
                    placeholder="Enter your company's registered address"
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authorized Signatory</h3>
                
                <div>
                  <Label htmlFor="signatoryName">Full Name *</Label>
                  <Input
                    id="signatoryName"
                    value={formData.signatoryName}
                    onChange={(e) => handleInputChange('signatoryName', e.target.value)}
                    placeholder="Enter signatory's full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signatoryTitle">Title/Position *</Label>
                  <Input
                    id="signatoryTitle"
                    value={formData.signatoryTitle}
                    onChange={(e) => handleInputChange('signatoryTitle', e.target.value)}
                    placeholder="e.g., CEO, Director, etc."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signatoryEmail">Email Address *</Label>
                  <Input
                    id="signatoryEmail"
                    type="email"
                    value={formData.signatoryEmail}
                    onChange={(e) => handleInputChange('signatoryEmail', e.target.value)}
                    placeholder="Enter signatory's email"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={!formData.ndaReviewed}
              >
                Send to DocuSign
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MutualNDA;