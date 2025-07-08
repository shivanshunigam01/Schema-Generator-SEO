
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface OrganizationFormProps {
  onSchemaGenerated: (schema: any) => void;
}

const OrganizationForm = ({ onSchemaGenerated }: OrganizationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    logo: "",
    email: "",
    telephone: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": formData.name,
      "url": formData.url,
      "description": formData.description,
      "logo": formData.logo,
      "email": formData.email,
      "telephone": formData.telephone,
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Organization Schema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Organization Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Company Name"
          />
        </div>

        <div>
          <Label htmlFor="url">Website URL</Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) => handleInputChange("url", e.target.value)}
            placeholder="https://company.com"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Brief description of your organization"
          />
        </div>

        <div>
          <Label htmlFor="logo">Logo URL</Label>
          <Input
            id="logo"
            value={formData.logo}
            onChange={(e) => handleInputChange("logo", e.target.value)}
            placeholder="https://company.com/logo.png"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="contact@company.com"
          />
        </div>

        <div>
          <Label htmlFor="telephone">Phone Number</Label>
          <Input
            id="telephone"
            value={formData.telephone}
            onChange={(e) => handleInputChange("telephone", e.target.value)}
            placeholder="+1-555-123-4567"
          />
        </div>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate Organization Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrganizationForm;
