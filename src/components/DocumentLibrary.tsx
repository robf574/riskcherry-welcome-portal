import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Shield, 
  BookOpen, 
  Zap,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'doc' | 'guide';
  size: string;
  category: 'technical' | 'compliance' | 'integration';
  downloadUrl?: string;
  isRequired: boolean;
}

interface DocumentLibraryProps {
  onBack: () => void;
  onComplete: () => void;
}

const DocumentLibrary = ({ onBack, onComplete }: DocumentLibraryProps) => {
  const [downloadedDocs, setDownloadedDocs] = useState<Set<string>>(new Set());

  const documents: Document[] = [
    {
      id: 'riskcherry-policy',
      title: 'RiskCherry Policy : Client Testing & Order Submission Disclaimer',
      description: 'Important policy document regarding client testing procedures and order submission requirements',
      type: 'pdf',
      size: '850 KB',
      category: 'compliance',
      isRequired: true
    },
    {
      id: 'portal-user-guide',
      title: 'Portal User Guide',
      description: 'Complete guide for using the RiskCherry certification portal',
      type: 'pdf',
      size: '2.1 MB',
      category: 'technical',
      isRequired: false
    },
    {
      id: 'game-provisions-guide',
      title: 'Game Provisions Guide',
      description: 'Game certification requirements and provisions for compliance',
      type: 'pdf',
      size: '1.8 MB',
      category: 'compliance',
      isRequired: false
    },
    {
      id: 'rng-provisions-guide',
      title: 'RNG Provisions Guide',
      description: 'Random Number Generator testing and certification provisions',
      type: 'pdf',
      size: '1.5 MB',
      category: 'technical',
      isRequired: false
    },
    {
      id: 'ukgc-agta-guide',
      title: 'UKGC AGTA Guide',
      description: 'UK Gambling Commission Automated Gaming Technical Approval guidelines',
      type: 'pdf',
      size: '2.4 MB',
      category: 'compliance',
      isRequired: false
    }
  ];

  const handleDownload = (docId: string) => {
    // In a real app, this would trigger actual file download
    setDownloadedDocs(prev => new Set(prev).add(docId));
    
    // Simulate download delay
    setTimeout(() => {
      console.log(`Downloaded document: ${docId}`);
    }, 500);
  };

  const requiredDocs = documents.filter(doc => doc.isRequired);
  const downloadedRequiredDocs = requiredDocs.filter(doc => downloadedDocs.has(doc.id));
  const canComplete = downloadedRequiredDocs.length === requiredDocs.length;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Zap className="w-4 h-4" />;
      case 'compliance': return <Shield className="w-4 h-4" />;
      case 'integration': return <BookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'compliance': return 'bg-accent/20 text-accent-foreground';
      case 'integration': return 'bg-primary/20 text-primary';
      default: return 'bg-muted text-muted-foreground';
    }
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
          <h1 className="text-3xl font-bold">Document Library</h1>
          <p className="text-muted-foreground">
            Download and review the following documents to proceed with onboarding
          </p>
        </div>
      </div>

      {/* Progress */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Required Documents Progress</p>
              <p className="text-sm text-muted-foreground">
                {downloadedRequiredDocs.length} of {requiredDocs.length} required documents downloaded
              </p>
            </div>
            <Badge variant={canComplete ? "default" : "secondary"} className="gap-2">
              {canComplete ? <CheckCircle2 className="w-4 h-4" /> : `${downloadedRequiredDocs.length}/${requiredDocs.length}`}
              {canComplete ? 'Ready to Continue' : 'In Progress'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid gap-4 mb-8">
        {documents.map((doc, index) => (
          <Card 
            key={doc.id} 
            className={`transition-all duration-200 hover:shadow-md animate-slide-up ${
              downloadedDocs.has(doc.id) ? 'ring-2 ring-accent' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      {doc.isRequired && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <CardDescription className="mb-2">{doc.description}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {getCategoryIcon(doc.category)}
                        {doc.category}
                      </span>
                      <span>{doc.size}</span>
                      <Badge className={getCategoryColor(doc.category)}>
                        {doc.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
                {downloadedDocs.has(doc.id) && (
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleDownload(doc.id)}
                  disabled={downloadedDocs.has(doc.id)}
                  className="gap-2 flex-1"
                  variant={downloadedDocs.has(doc.id) ? "secondary" : "default"}
                >
                  <Download className="w-4 h-4" />
                  {downloadedDocs.has(doc.id) ? 'Downloaded' : 'Download'}
                </Button>
                {doc.downloadUrl && (
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Preview
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Complete Button */}
      <div className="flex justify-end">
        <Button 
          onClick={onComplete}
          disabled={!canComplete}
          className="gap-2 gradient-cherry"
          size="lg"
        >
          <CheckCircle2 className="w-5 h-5" />
          Complete Document Review
        </Button>
      </div>
    </div>
  );
};

export default DocumentLibrary;