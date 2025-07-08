
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WebsiteForm from "@/components/schema/WebsiteForm";
import OrganizationForm from "@/components/schema/OrganizationForm";
import LocalBusinessForm from "@/components/schema/LocalBusinessForm";
import ServiceForm from "@/components/schema/ServiceForm";
import EventForm from "@/components/schema/EventForm";
import FAQForm from "@/components/schema/FAQForm";
import ReviewForm from "@/components/schema/ReviewForm";
import ArticleForm from "@/components/schema/ArticleForm";
import BreadcrumbForm from "@/components/schema/BreadcrumbForm";
import EventSchemaForm from "@/components/schema/EventSchemaForm";
import JobPostingForm from "@/components/schema/JobPostingForm";
import PersonForm from "@/components/schema/PersonForm";
import ProductForm from "@/components/schema/ProductForm";
import RecipeForm from "@/components/schema/RecipeForm";
import VideoForm from "@/components/schema/VideoForm";

const Index = () => {
  const [selectedSchema, setSelectedSchema] = useState("");
  const [generatedSchema, setGeneratedSchema] = useState("");
  const { toast } = useToast();

  const schemaTypes = [
    { value: "website", label: "Website" },
    { value: "organization", label: "Organization" },
    { value: "localbusiness", label: "Local Business" },
    { value: "service", label: "Service" },
    { value: "event", label: "Event (Legacy)" },
    { value: "faq", label: "FAQ" },
    { value: "review", label: "Review" },
    { value: "article", label: "Article" },
    { value: "breadcrumb", label: "Breadcrumb" },
    { value: "eventschema", label: "Event" },
    { value: "jobposting", label: "Job Posting" },
    { value: "person", label: "Person" },
    { value: "product", label: "Product" },
    { value: "recipe", label: "Recipe" },
    { value: "video", label: "Video" },
  ];

  const handleSchemaGenerated = (schema: any) => {
    const jsonSchema = JSON.stringify(schema, null, 2);
    setGeneratedSchema(jsonSchema);
    toast({
      title: "Schema Generated Successfully!",
      description: "Your schema markup has been generated and is ready to use.",
      variant: "success",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSchema);
    toast({
      title: "Copied to Clipboard!",
      description: "Schema markup has been copied to your clipboard.",
      variant: "success",
    });
  };

  const downloadSchema = () => {
    const blob = new Blob([generatedSchema], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedSchema}-schema.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Schema Downloaded!",
      description: "Your schema file has been downloaded.",
      variant: "success",
    });
  };

  const renderSchemaForm = () => {
    switch (selectedSchema) {
      case "website":
        return <WebsiteForm onSchemaGenerated={handleSchemaGenerated} />;
      case "organization":
        return <OrganizationForm onSchemaGenerated={handleSchemaGenerated} />;
      case "localbusiness":
        return <LocalBusinessForm onSchemaGenerated={handleSchemaGenerated} />;
      case "service":
        return <ServiceForm onSchemaGenerated={handleSchemaGenerated} />;
      case "event":
        return <EventForm onSchemaGenerated={handleSchemaGenerated} />;
      case "faq":
        return <FAQForm onSchemaGenerated={handleSchemaGenerated} />;
      case "review":
        return <ReviewForm onSchemaGenerated={handleSchemaGenerated} />;
      case "article":
        return <ArticleForm onSchemaGenerated={handleSchemaGenerated} />;
      case "breadcrumb":
        return <BreadcrumbForm onSchemaGenerated={handleSchemaGenerated} />;
      case "eventschema":
        return <EventSchemaForm onSchemaGenerated={handleSchemaGenerated} />;
      case "jobposting":
        return <JobPostingForm onSchemaGenerated={handleSchemaGenerated} />;
      case "person":
        return <PersonForm onSchemaGenerated={handleSchemaGenerated} />;
      case "product":
        return <ProductForm onSchemaGenerated={handleSchemaGenerated} />;
      case "recipe":
        return <RecipeForm onSchemaGenerated={handleSchemaGenerated} />;
      case "video":
        return <VideoForm onSchemaGenerated={handleSchemaGenerated} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">Free Schema Markup Generator</h1>
          <p className="text-lg text-gray-600">Generate structured data for better SEO</p>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Select Schema Type</CardTitle>
            <CardDescription>Choose the type of schema markup you want to generate</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedSchema} onValueChange={setSelectedSchema}>
              <SelectTrigger>
                <SelectValue placeholder="Select a schema type" />
              </SelectTrigger>
              <SelectContent>
                {schemaTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedSchema && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              {renderSchemaForm()}
            </div>

            {generatedSchema && (
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Generated Schema
                    <div className="flex gap-2">
                      <Button onClick={copyToClipboard} size="sm" variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button onClick={downloadSchema} size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm max-h-96">
                    <code>{generatedSchema}</code>
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
