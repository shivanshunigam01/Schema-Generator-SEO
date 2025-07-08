
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface WebsiteFormProps {
  onSchemaGenerated: (schema: any) => void;
}

const WebsiteForm = ({ onSchemaGenerated }: WebsiteFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    image: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": formData.name,
      "url": formData.url,
      "description": formData.description,
      "image": formData.image,
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Website Schema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Website Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="My Website"
          />
        </div>

        <div>
          <Label htmlFor="url">Website URL</Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) => handleInputChange("url", e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Brief description of your website"
          />
        </div>

        <div>
          <Label htmlFor="image">Website Image URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
            placeholder="https://example.com/logo.png"
          />
        </div>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate Website Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default WebsiteForm;
