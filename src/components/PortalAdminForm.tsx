import { useState, FormEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, User, Mail, Globe, Plus, X, Save, Building } from "lucide-react";
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
    studioName: '',
    accountType: '', // 'single' or 'master'
    subStudios: [''],
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

  const handleSubStudioChange = (index: number, value: string) => {
    const newSubStudios = [...formData.subStudios];
    newSubStudios[index] = value;
    setFormData(prev => ({ ...prev, subStudios: newSubStudios }));
  };

  const addSubStudioField = () => {
    if (formData.subStudios.length < 10) {
      setFormData(prev => ({ 
        ...prev, 
        subStudios: [...prev.subStudios, ''] 
      }));
    }
  };

  const removeSubStudioField = (index: number) => {
    if (formData.subStudios.length > 1) {
      const newSubStudios = formData.subStudios.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, subStudios: newSubStudios }));
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

    if (!formData.studioName.trim()) {
      toast({
        title: "Validation Error",
        description: "Studio name is required",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.accountType) {
      toast({
        title: "Validation Error",
        description: "Please select an account type",
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

    if (formData.accountType === 'master') {
      const validSubStudios = formData.subStudios.filter(studio => studio.trim());
      if (validSubStudios.length === 0) {
        toast({
          title: "Validation Error",
          description: "Please add at least one sub-studio for master accounts",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
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
    const dataToStore = {
      ...formData,
      ipAddresses: validIps,
      subStudios: formData.accountType === 'master' ? formData.subStudios.filter(studio => studio.trim()) : [],
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('riskcherry-portal-admin', JSON.stringify(dataToStore));

    toast({
      title: "Success!",
      description: "Portal admin configuration has been saved successfully.",
    });

    setIsSubmitting(false);
    onComplete();
  };

  const nonEmptyIps = formData.ipAddresses.filter(ip => ip.trim()).length;
  const nonEmptySubStudios = formData.subStudios.filter(studio => studio.trim()).length;

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
              {/* Studio Information */}
              <div className="space-y-2">
                <Label htmlFor="studioName" className="text-base font-medium">
                  Studio Name *
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="studioName"
                    type="text"
                    placeholder="Your Game Studio"
                    value={formData.studioName}
                    onChange={(e) => handleInputChange('studioName', e.target.value)}
                    required
                    className="h-12 pl-10"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  The main studio or company name for this account
                </p>
              </div>

              {/* Account Type */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Account Type *</Label>
                <RadioGroup 
                  value={formData.accountType} 
                  onValueChange={(value) => handleInputChange('accountType', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="single" id="single" />
                    <div className="flex-1">
                      <Label htmlFor="single" className="cursor-pointer font-medium">
                        Single Studio Account
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        This studio name is your only studio
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="master" id="master" />
                    <div className="flex-1">
                      <Label htmlFor="master" className="cursor-pointer font-medium">
                        Master Account with Sub-Studios
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        This is a master account that manages multiple sub-studios
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Sub-Studios (only shown if Master Account selected) */}
              {formData.accountType === 'master' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Sub-Studio Names *</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Add the names of studios under this master account
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {nonEmptySubStudios} sub-studio{nonEmptySubStudios !== 1 ? 's' : ''} added
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {formData.subStudios.map((studio, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="relative flex-1">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            type="text"
                            placeholder={`Sub-studio ${index + 1} name`}
                            value={studio}
                            onChange={(e) => handleSubStudioChange(index, e.target.value)}
                            className="h-12 pl-10"
                          />
                        </div>
                        {formData.subStudios.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeSubStudioField(index)}
                            className="h-12 px-3"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {formData.subStudios.length < 10 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addSubStudioField}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Another Sub-Studio
                    </Button>
                  )}
                </div>
              )}

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
                      Add IP addresses that should have access to our Portal
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