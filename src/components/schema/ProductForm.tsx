
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface ProductFormProps {
  onSchemaGenerated: (schema: any) => void;
}

const ProductForm = ({ onSchemaGenerated }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    sku: "",
    gtin: "",
    mpn: "",
    description: "",
    offerType: "Offer",
    url: "",
    priceCurrency: "USD",
    price: "",
    aggregateRating: "",
    ratingCount: "",
    bestRating: "5",
    worstRating: "1",
  });

  const [images, setImages] = useState<string[]>([""]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addImage = () => {
    setImages(prev => [...prev, ""]);
  };

  const removeImage = (index: number) => {
    if (images.length > 1) {
      setImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateImage = (index: number, value: string) => {
    setImages(prev => prev.map((img, i) => i === index ? value : img));
  };

  const generateSchema = () => {
    const validImages = images.filter(img => img.trim() !== "");

    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": formData.name,
      "image": validImages,
      "brand": {
        "@type": "Brand",
        "name": formData.brand
      },
      "sku": formData.sku,
      "gtin": formData.gtin,
      "mpn": formData.mpn,
      "description": formData.description,
      "offers": {
        "@type": formData.offerType,
        "url": formData.url,
        "priceCurrency": formData.priceCurrency,
        "price": formData.price,
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": formData.aggregateRating,
        "ratingCount": formData.ratingCount,
        "bestRating": formData.bestRating,
        "worstRating": formData.worstRating
      }
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Product Schema - Offer, AggregateRating, Reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Product name"
          />
        </div>

        <div>
          <Label>Images</Label>
          {images.map((image, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                value={image}
                onChange={(e) => updateImage(index, e.target.value)}
                placeholder={`Image URL #${index + 1}`}
              />
              {images.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addImage}>
            <Plus className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        </div>

        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={formData.brand}
            onChange={(e) => handleInputChange("brand", e.target.value)}
            placeholder="Brand name"
          />
        </div>

        <div className="space-y-2">
          <Label>Identification properties</Label>
          <Input
            value={formData.sku}
            onChange={(e) => handleInputChange("sku", e.target.value)}
            placeholder="SKU"
          />
          <Input
            value={formData.gtin}
            onChange={(e) => handleInputChange("gtin", e.target.value)}
            placeholder="GTIN"
          />
          <Input
            value={formData.mpn}
            onChange={(e) => handleInputChange("mpn", e.target.value)}
            placeholder="MPN"
          />
        </div>

        <div>
          <Label htmlFor="description">Product's description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Detailed product description"
          />
        </div>

        <div>
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) => handleInputChange("url", e.target.value)}
            placeholder="https://example.com/product"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="priceCurrency">Price currency</Label>
            <Select value={formData.priceCurrency} onValueChange={(value) => handleInputChange("priceCurrency", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="CAD">CAD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="29.99"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="aggregateRating">Aggregate rating value</Label>
          <Input
            id="aggregateRating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.aggregateRating}
            onChange={(e) => handleInputChange("aggregateRating", e.target.value)}
            placeholder="4.5"
          />
        </div>

        <div>
          <Label htmlFor="ratingCount">Number of ratings</Label>
          <Input
            id="ratingCount"
            type="number"
            value={formData.ratingCount}
            onChange={(e) => handleInputChange("ratingCount", e.target.value)}
            placeholder="100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bestRating">Highest value allowed</Label>
            <Input
              id="bestRating"
              type="number"
              value={formData.bestRating}
              onChange={(e) => handleInputChange("bestRating", e.target.value)}
              placeholder="5"
            />
          </div>
          <div>
            <Label htmlFor="worstRating">Lowest value allowed</Label>
            <Input
              id="worstRating"
              type="number"
              value={formData.worstRating}
              onChange={(e) => handleInputChange("worstRating", e.target.value)}
              placeholder="1"
            />
          </div>
        </div>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate Product Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
