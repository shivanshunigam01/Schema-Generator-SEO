
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ServiceFormProps {
  onSchemaGenerated: (schema: any) => void;
}

const ServiceForm = ({ onSchemaGenerated }: ServiceFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    provider: "",
    areaServed: "",
    serviceType: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": formData.name,
      "description": formData.description,
      "provider": {
        "@type": "Organization",
        "name": formData.provider,
      },
      "areaServed": formData.areaServed,
      "serviceType": formData.serviceType,
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Service Schema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Service Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Service Name"
          />
        </div>

        <div>
          <Label htmlFor="description">Service Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Detailed description of the service"
          />
        </div>

        <div>
          <Label htmlFor="provider">Service Provider</Label>
          <Input
            id="provider"
            value={formData.provider}
            onChange={(e) => handleInputChange("provider", e.target.value)}
            placeholder="Company or Organization Name"
          />
        </div>

        <div>
          <Label htmlFor="areaServed">Area Served</Label>
          <Input
            id="areaServed"
            value={formData.areaServed}
            onChange={(e) => handleInputChange("areaServed", e.target.value)}
            placeholder="Geographic area where service is available"
          />
        </div>

        <div>
          <Label htmlFor="serviceType">Service Type</Label>
          <Input
            id="serviceType"
            value={formData.serviceType}
            onChange={(e) => handleInputChange("serviceType", e.target.value)}
            placeholder="Type or category of service"
          />
        </div>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate Service Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceForm;
