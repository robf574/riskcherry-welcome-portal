import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TokenAccessProps {
  onTokenValidated: () => void;
}

const TokenAccess = ({ onTokenValidated }: TokenAccessProps) => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Demo token for testing - in production this would validate against your system
  const VALID_TOKEN = "RC-ONBOARD-2024";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (token.toUpperCase() === VALID_TOKEN) {
      localStorage.setItem('riskcherry-onboard-token', token);
      onTokenValidated();
    } else {
      setError("Invalid access token. Please check with your RiskCherry representative.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">🍒</span>
            </div>
            <span className="text-xl font-semibold">RiskCherry</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Client Onboarding</h1>
          <p className="text-muted-foreground">
            Enter your secure access token to begin the onboarding process
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <CardTitle>Secure Access Required</CardTitle>
            <CardDescription>
              This onboarding portal is protected by a secure token provided by your RiskCherry representative.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token">Access Token</Label>
                <Input
                  id="token"
                  type="text"
                  placeholder="Enter your access token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                  className="font-mono"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full gradient-cherry" 
                disabled={isLoading || !token.trim()}
              >
                {isLoading ? "Verifying..." : "Access Onboarding Portal"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>Need help? Contact your RiskCherry representative</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TokenAccess;