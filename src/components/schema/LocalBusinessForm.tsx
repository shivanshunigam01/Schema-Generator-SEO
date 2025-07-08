
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface LocalBusinessFormProps {
  onSchemaGenerated: (schema: any) => void;
}

const LocalBusinessForm = ({ onSchemaGenerated }: LocalBusinessFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    telephone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    url: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": formData.name,
      "description": formData.description,
      "image": formData.image,
      "telephone": formData.telephone,
      "url": formData.url,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": formData.address,
        "addressLocality": formData.city,
        "addressRegion": formData.state,
        "postalCode": formData.postalCode,
        "addressCountry": formData.country,
      },
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Local Business Schema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Business Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Business Name"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Brief description of your business"
          />
        </div>

        <div>
          <Label htmlFor="image">Business Image URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
            placeholder="https://business.com/photo.jpg"
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

        <div>
          <Label htmlFor="url">Website URL</Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) => handleInputChange("url", e.target.value)}
            placeholder="https://business.com"
          />
        </div>

        <div>
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="123 Main St"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="City"
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              placeholder="State"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              placeholder="12345"
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              placeholder="US"
            />
          </div>
        </div>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate Local Business Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default LocalBusinessForm;
