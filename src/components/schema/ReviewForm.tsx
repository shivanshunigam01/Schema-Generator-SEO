
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ReviewFormProps {
  onSchemaGenerated: (schema: any) => void;
}

const ReviewForm = ({ onSchemaGenerated }: ReviewFormProps) => {
  const [formData, setFormData] = useState({
    itemName: "",
    reviewBody: "",
    ratingValue: "",
    bestRating: "5",
    worstRating: "1",
    author: "",
    datePublished: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "Thing",
        "name": formData.itemName,
      },
      "reviewBody": formData.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": formData.ratingValue,
        "bestRating": formData.bestRating,
        "worstRating": formData.worstRating,
      },
      "author": {
        "@type": "Person",
        "name": formData.author,
      },
      "datePublished": formData.datePublished,
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Review Schema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="itemName">Item Being Reviewed</Label>
          <Input
            id="itemName"
            value={formData.itemName}
            onChange={(e) => handleInputChange("itemName", e.target.value)}
            placeholder="Product, service, or business name"
          />
        </div>

        <div>
          <Label htmlFor="reviewBody">Review Text</Label>
          <Textarea
            id="reviewBody"
            value={formData.reviewBody}
            onChange={(e) => handleInputChange("reviewBody", e.target.value)}
            placeholder="Write your review here"
          />
        </div>

        <div>
          <Label htmlFor="ratingValue">Rating Value</Label>
          <Input
            id="ratingValue"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.ratingValue}
            onChange={(e) => handleInputChange("ratingValue", e.target.value)}
            placeholder="4.5"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bestRating">Best Rating</Label>
            <Input
              id="bestRating"
              type="number"
              value={formData.bestRating}
              onChange={(e) => handleInputChange("bestRating", e.target.value)}
              placeholder="5"
            />
          </div>
          <div>
            <Label htmlFor="worstRating">Worst Rating</Label>
            <Input
              id="worstRating"
              type="number"
              value={formData.worstRating}
              onChange={(e) => handleInputChange("worstRating", e.target.value)}
              placeholder="1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="author">Review Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => handleInputChange("author", e.target.value)}
            placeholder="Reviewer name"
          />
        </div>

        <div>
          <Label htmlFor="datePublished">Date Published</Label>
          <Input
            id="datePublished"
            type="date"
            value={formData.datePublished}
            onChange={(e) => handleInputChange("datePublished", e.target.value)}
          />
        </div>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate Review Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
