import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

  // Pricing table structure
  const serviceTypes = ["New Game", "TOA", "Clone", "Recertification"];
  const marketColumns = ["Base Market", "TOA 1", "TOA 2", "TOA 3"];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="secondary" onClick={onBack} className="gap-2 bg-card text-card-foreground hover:bg-card/90">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-card rounded-full flex items-center justify-center shadow-lg">
            <Scale className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-card">Master Service Agreement</h1>
            <p className="text-card/80">Review service agreement and pricing schedule</p>
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
              Review our service pricing structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <div className="relative">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr>
                        <th className="border border-border p-3 bg-muted text-left font-semibold">
                          Service Type
                        </th>
                        {marketColumns.map((column, index) => (
                          <th key={index} className="border border-border p-3 bg-muted text-left font-semibold">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {serviceTypes.map((service, rowIndex) => (
                        <tr key={rowIndex}>
                          <td className="border border-border p-3 font-medium bg-muted/30">
                            {service}
                          </td>
                          {marketColumns.map((_, colIndex) => (
                            <td key={colIndex} className="border border-border p-3 text-center text-muted-foreground">
                              -
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Draft overlay */}
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <div className="bg-card border-2 border-dashed border-primary/50 p-6 rounded-lg text-center">
                      <p className="text-lg font-semibold text-primary mb-2">DRAFT</p>
                      <p className="text-sm text-muted-foreground">
                        POPULATED AFTER PRICING QUESTIONS ARE COMPLETE
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Pricing Notes:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• All prices are in EUR and exclude applicable taxes</li>
                  <li>• Pricing varies by service type and target market</li>
                </ul>
              </div>

              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="pricing-definitions">
                  <AccordionTrigger className="text-left font-medium">
                    Pricing Definitions & Terms
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground space-y-4">
                    <div className="space-y-4">
                      <p className="text-sm">
                        The following terms shall have the following definitions and shall be applied as follows for the purposes of this Schedule. For the avoidance of doubt, all deliverables, whether they are certificates, reports, evidences or similar, are included in the pricing (with the exception of Branded Certificate):
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-foreground">New Game – Base Market:</p>
                          <p>A single game version that uses a new math engine or new mechanic with one (1) included base RTP level/math model. If the game is built multiple times for different device types or operating systems, each build will be classified as a New Game. If there is more than one (1) base mechanic or RTP level, an additional RTP/mechanic fee will be applied per level/mechanic.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">Additional RTP:</p>
                          <p>The charge applied for each additional RTP level beyond the first within the New Game.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">Clone/Skin/Version:</p>
                          <p>A game where the front-end assets/theme are different from a game previously certified by RiskCherry, but the server-side code/math engine is identical to the prior game.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">Additional Mechanics/Versions of Game Within the Order:</p>
                          <p>Depending on how the game is coded and following binary and architecture review, additional mechanics may be priced as Additional RTP or as Clone/Skin. This will be agreed upon when the order is analysed on a case-by-case basis.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">Entirely New Game Type:</p>
                          <p>When an order is placed for a new game type other than a slot (or any other pre-agreed game type category), the Supplier will analyse and provide a new price/pricing category upon application if the game type is not deemed to fall into a pre-agreed category.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">ToA (Transfer of Approval):</p>
                          <p>A transfer from the base market to another market or markets.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">Recert:</p>
                          <p>Required when a game previously certified by RiskCherry has had changes made to critical files or any element which would trigger the need for a new test certificate and/or conformity report to be issued.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">Renewal:</p>
                          <p>Required for markets that stipulate annual or other periodic renewal of the certificate. This rate applies only if there have been no changes to critical files or any elements which would trigger the need for a Recert. This cost applies per market. For avoidance of doubt, this only applies for the renewal of certificates previously issued by RiskCherry.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">Retest Fee:</p>
                          <p>Applicable in the following scenarios for any jurisdiction:</p>
                          <ul className="ml-4 mt-2 space-y-1">
                            <li>• If there is one (1) unsuccessful attempt to certify a game or RNG, which necessitates the Customer to perform an update to the math, backend, or server code.</li>
                            <li>• If there are two (2) unsuccessful attempts to certify the game, which require the Customer to carry out front-end code deployments.</li>
                          </ul>
                          <p className="mt-2">Note that for each math/backend/server deployment made after the Order has been placed, and for each subsequent front-end deployment following the completion of one (1) front-end deployment allowed after the Order has been placed, the Retest Fee will be added to the Invoice to avoid any ambiguity.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">Additional Simulation Fee:</p>
                          <p>Applicable when the Provisions Package (logs, seeds, and related materials) necessary for validating RTP or Max Win is not fully provided at the time the Order is placed, or if the number of spins/game rounds required exceeds the standard limit, or if the provided data is insufficient for validation.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">Included Simulation Runs:</p>
                          <p>Up to 3 simulation runs of 100 million spins per RTP variant or Max Win scenario are included in the base price:</p>
                          <ul className="ml-4 mt-2 space-y-1">
                            <li><strong>Exceeding Simulation Runs/Game Rounds:</strong></li>
                            <li className="ml-4">• If more than 3 simulation runs or 100 million spins per simulation run are required, additional simulation runs will incur a fee.</li>
                            <li><strong>Highest Simulation Result:</strong></li>
                            <li className="ml-4">• The highest result from RiskCherry's simulation runs will be used to amend the game help documentation if further provisions are not provided.</li>
                            <li><strong>Incomplete Provisions:</strong></li>
                            <li className="ml-4">• If the Provisions Package is incomplete or not supplied as required, additional simulation runs will be charged as outlined above.</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">Branded Report:</p>
                          <p>Each report required for each operator ID listing every game or games certified by the Supplier for Italy & Brazil (which includes the Customer's details & details of their Client (typically Casino Operator/ Platform)). Charged once per operator ID needed and for every update to the report thereafter.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">RNG Certification:</p>
                          <p>The base certification of the Random Number Generator (as such term is widely understood in the online gambling industry). Future jurisdiction-specific Terms of Agreement (TOA) for RNG Certification will be handled with pricing determined upon application.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">UK Annual Game Testing Audit (AGTA):</p>
                          <p>The yearly review and testing of all certified games to ensure ongoing compliance with UK regulatory standards. The audit involves a thorough examination of game mechanics, RTP levels, and any updates or changes to the game since the previous certification. Price includes the conformity report. The Supplier can conduct the audit on products previously certified by any other ITL designated an approved test house by the UK Gambling Commission.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-foreground">Lithuania Platform Audit:</p>
                          <p>The audit & certification of the RGS to certify against the update (to the standard stated in Schedule 2) dated February 2024.</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

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