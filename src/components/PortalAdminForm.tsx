import { useState, FormEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, User, Mail, Globe, Plus, X, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface PortalAdminFormProps {
  onBack: () => void;
  onComplete: () => void;
}

const PortalAdminForm = ({ onBack, onComplete }: PortalAdminFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    ipAddresses: [''],
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleIpChange = (index: number, value: string) => {
    const newIps = [...formData.ipAddresses];
    newIps[index] = value;
    setFormData(prev => ({ ...prev, ipAddresses: newIps }));
  };

  const addIpField = () => {
    if (formData.ipAddresses.length < 5) {
      setFormData(prev => ({ 
        ...prev, 
        ipAddresses: [...prev.ipAddresses, ''] 
      }));
    }
  };

  const removeIpField = (index: number) => {
    if (formData.ipAddresses.length > 1) {
      const newIps = formData.ipAddresses.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, ipAddresses: newIps }));
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateIpAddress = (ip: string) => {
    if (!ip.trim()) return true; // Empty is allowed
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) return false;
    
    const parts = ip.split('.');
    return parts.every(part => {
      const num = parseInt(part);
      return num >= 0 && num <= 255;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.fullName.trim()) {
      toast({
        title: "Validation Error",
        description: "Full name is required",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }


    const validIps = formData.ipAddresses.filter(ip => ip.trim());
    if (validIps.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one IP address is required",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    for (const ip of validIps) {
      if (!validateIpAddress(ip)) {
        toast({
          title: "Validation Error",
          description: `Invalid IP address format: ${ip}`,
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store data (in real app, this would go to your backend)
    localStorage.setItem('riskcherry-portal-admin', JSON.stringify({
      ...formData,
      ipAddresses: validIps,
      timestamp: new Date().toISOString()
    }));

    toast({
      title: "Success!",
      description: "Portal admin configuration has been saved successfully.",
    });

    setIsSubmitting(false);
    onComplete();
  };

  const nonEmptyIps = formData.ipAddresses.filter(ip => ip.trim()).length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Portal Admin Setup</h1>
          <p className="text-muted-foreground">
            Configure your portal administrator account and security settings
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Administrator Account Details</CardTitle>
                <CardDescription>
                  This information will be used to create your portal administrator account
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base font-medium">
                  First Name / Last Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                  className="h-12"
                />
                <p className="text-sm text-muted-foreground">
                  This will be used for your portal administrator profile
                </p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@yourstudio.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              {/* IP Addresses */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">IP Address Whitelist *</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add IP addresses that should have access to your portal
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {nonEmptyIps} IP{nonEmptyIps !== 1 ? 's' : ''} configured
                  </Badge>
                </div>

                <div className="space-y-3">
                  {formData.ipAddresses.map((ip, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="relative flex-1">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          type="text"
                          placeholder="192.168.1.100"
                          value={ip}
                          onChange={(e) => handleIpChange(index, e.target.value)}
                          className="h-12 pl-10"
                        />
                      </div>
                      {formData.ipAddresses.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeIpField(index)}
                          className="h-12 px-3"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {formData.ipAddresses.length < 5 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addIpField}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another IP Address
                  </Button>
                )}
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base font-medium">
                  Additional Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information or special requirements..."
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  rows={4}
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="gap-2 gradient-cherry"
                  size="lg"
                >
                  <Save className="w-5 h-5" />
                  {isSubmitting ? 'Saving Configuration...' : 'Save Portal Admin Setup'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortalAdminForm;