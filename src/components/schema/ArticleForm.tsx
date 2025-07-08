
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface ArticleFormProps {
  onSchemaGenerated: (schema: any) => void;
}

const ArticleForm = ({ onSchemaGenerated }: ArticleFormProps) => {
  const [formData, setFormData] = useState({
    url: "",
    headline: "",
    description: "",
    authorType: "Person",
    author: "",
    authorUrl: "",
    publisher: "",
    publisherLogo: "",
    datePublished: "",
    dateModified: "",
  });
  
  const [images, setImages] = useState<string[]>([""]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addImage = () => {
    setImages(prev => [...prev, ""]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const updateImage = (index: number, value: string) => {
    setImages(prev => prev.map((img, i) => i === index ? value : img));
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "url": formData.url,
      "headline": formData.headline,
      "description": formData.description,
      "image": images.filter(img => img.trim() !== ""),
      "author": {
        "@type": formData.authorType,
        "name": formData.author,
        "url": formData.authorUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": formData.publisher,
        "logo": {
          "@type": "ImageObject",
          "url": formData.publisherLogo
        }
      },
      "datePublished": formData.datePublished,
      "dateModified": formData.dateModified
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Article Schema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) => handleInputChange("url", e.target.value)}
            placeholder="https://example.com/article"
          />
        </div>

        <div>
          <Label htmlFor="headline">Headline</Label>
          <Input
            id="headline"
            value={formData.headline}
            onChange={(e) => handleInputChange("headline", e.target.value)}
            placeholder="Article headline"
            maxLength={110}
          />
          <p className="text-sm text-gray-500 mt-1">{formData.headline.length} / 110</p>
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
          <Label htmlFor="description">Short description of the article</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Brief description of the article"
          />
        </div>

        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => handleInputChange("author", e.target.value)}
            placeholder="Author name"
          />
        </div>

        <div>
          <Label htmlFor="authorUrl">Author URL</Label>
          <Input
            id="authorUrl"
            value={formData.authorUrl}
            onChange={(e) => handleInputChange("authorUrl", e.target.value)}
            placeholder="https://example.com/author"
          />
        </div>

        <div>
          <Label htmlFor="publisher">Publisher</Label>
          <Input
            id="publisher"
            value={formData.publisher}
            onChange={(e) => handleInputChange("publisher", e.target.value)}
            placeholder="Publisher name"
          />
        </div>

        <div>
          <Label htmlFor="publisherLogo">Publisher logo URL</Label>
          <Input
            id="publisherLogo"
            value={formData.publisherLogo}
            onChange={(e) => handleInputChange("publisherLogo", e.target.value)}
            placeholder="https://example.com/logo.png"
          />
        </div>

        <div>
          <Label htmlFor="datePublished">Date published</Label>
          <Input
            id="datePublished"
            type="date"
            value={formData.datePublished}
            onChange={(e) => handleInputChange("datePublished", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="dateModified">Date modified</Label>
          <Input
            id="dateModified"
            type="date"
            value={formData.dateModified}
            onChange={(e) => handleInputChange("dateModified", e.target.value)}
          />
        </div>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate Article Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArticleForm;
