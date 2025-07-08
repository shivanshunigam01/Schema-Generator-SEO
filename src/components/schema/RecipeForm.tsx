
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface RecipeFormProps {
  onSchemaGenerated: (schema: any) => void;
}

const RecipeForm = ({ onSchemaGenerated }: RecipeFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    keywords: "",
    description: "",
    videoContentUrl: "",
    videoEmbedUrl: "",
    creator: "",
    datePublished: "",
    prepTime: "",
    cookTime: "",
    category: "",
    cuisine: "",
    recipeYield: "",
    servingSize: "",
    calories: "",
    fatContent: "",
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
      "@type": "Recipe",
      "name": formData.name,
      "keywords": formData.keywords,
      "description": formData.description,
      "image": validImages,
      "video": {
        "@type": "VideoObject",
        "contentUrl": formData.videoContentUrl,
        "embedUrl": formData.videoEmbedUrl
      },
      "author": {
        "@type": "Person",
        "name": formData.creator
      },
      "datePublished": formData.datePublished,
      "prepTime": `PT${formData.prepTime}M`,
      "cookTime": `PT${formData.cookTime}M`,
      "totalTime": `PT${parseInt(formData.prepTime || "0") + parseInt(formData.cookTime || "0")}M`,
      "recipeCategory": formData.category,
      "recipeCuisine": formData.cuisine,
      "recipeYield": formData.recipeYield,
      "nutrition": {
        "@type": "NutritionInformation",
        "servingSize": formData.servingSize,
        "calories": formData.calories,
        "fatContent": formData.fatContent
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
        <CardTitle>Recipe Schema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Recipe name"
          />
        </div>

        <div>
          <Label htmlFor="keywords">Keywords</Label>
          <Input
            id="keywords"
            value={formData.keywords}
            onChange={(e) => handleInputChange("keywords", e.target.value)}
            placeholder="dessert, chocolate, easy"
          />
        </div>

        <div>
          <Label htmlFor="description">Recipe's description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Detailed recipe description"
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
          <Label htmlFor="videoContentUrl">Video: Content URL</Label>
          <Input
            id="videoContentUrl"
            value={formData.videoContentUrl}
            onChange={(e) => handleInputChange("videoContentUrl", e.target.value)}
            placeholder="https://example.com/video.mp4"
          />
        </div>

        <div>
          <Label htmlFor="videoEmbedUrl">Video: Embed URL</Label>
          <Input
            id="videoEmbedUrl"
            value={formData.videoEmbedUrl}
            onChange={(e) => handleInputChange("videoEmbedUrl", e.target.value)}
            placeholder="https://youtube.com/embed/..."
          />
        </div>

        <div>
          <Label htmlFor="creator">Creator</Label>
          <Input
            id="creator"
            value={formData.creator}
            onChange={(e) => handleInputChange("creator", e.target.value)}
            placeholder="Chef name"
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="prepTime">Preparation (min)</Label>
            <Input
              id="prepTime"
              type="number"
              value={formData.prepTime}
              onChange={(e) => handleInputChange("prepTime", e.target.value)}
              placeholder="15"
            />
          </div>
          <div>
            <Label htmlFor="cookTime">Cooking (min)</Label>
            <Input
              id="cookTime"
              type="number"
              value={formData.cookTime}
              onChange={(e) => handleInputChange("cookTime", e.target.value)}
              placeholder="30"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              placeholder="Dessert"
            />
          </div>
          <div>
            <Label htmlFor="cuisine">Cuisine</Label>
            <Input
              id="cuisine"
              value={formData.cuisine}
              onChange={(e) => handleInputChange("cuisine", e.target.value)}
              placeholder="Italian"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="recipeYield">Servings</Label>
          <Input
            id="recipeYield"
            value={formData.recipeYield}
            onChange={(e) => handleInputChange("recipeYield", e.target.value)}
            placeholder="4 servings"
          />
        </div>

        <div>
          <Label htmlFor="servingSize">Nutrition: Serving size</Label>
          <Input
            id="servingSize"
            value={formData.servingSize}
            onChange={(e) => handleInputChange("servingSize", e.target.value)}
            placeholder="1 cup"
          />
        </div>

        <div>
          <Label htmlFor="calories">Nutrition: Calories</Label>
          <Input
            id="calories"
            type="number"
            value={formData.calories}
            onChange={(e) => handleInputChange("calories", e.target.value)}
            placeholder="250"
          />
        </div>

        <div>
          <Label htmlFor="fatContent">Nutrition: Fat (grams)</Label>
          <Input
            id="fatContent"
            type="number"
            step="0.1"
            value={formData.fatContent}
            onChange={(e) => handleInputChange("fatContent", e.target.value)}
            placeholder="5.5"
          />
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
          Generate Recipe Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeForm;
