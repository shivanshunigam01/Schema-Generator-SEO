
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface BreadcrumbFormProps {
  onSchemaGenerated: (schema: any) => void;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

const BreadcrumbForm = ({ onSchemaGenerated }: BreadcrumbFormProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { name: "", url: "" },
    { name: "", url: "" }
  ]);

  const addBreadcrumb = () => {
    setBreadcrumbs(prev => [...prev, { name: "", url: "" }]);
  };

  const removeBreadcrumb = (index: number) => {
    if (breadcrumbs.length > 1) {
      setBreadcrumbs(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateBreadcrumb = (index: number, field: keyof BreadcrumbItem, value: string) => {
    setBreadcrumbs(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const generateSchema = () => {
    const itemListElements = breadcrumbs
      .filter(item => item.name.trim() !== "" && item.url.trim() !== "")
      .map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }));

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElements
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Breadcrumb Schema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <Label>Page #{index + 1}</Label>
              {breadcrumbs.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeBreadcrumb(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div>
              <Label htmlFor={`name-${index}`}>Page #{index + 1}'s name</Label>
              <Input
                id={`name-${index}`}
                value={breadcrumb.name}
                onChange={(e) => updateBreadcrumb(index, "name", e.target.value)}
                placeholder="Page name"
              />
            </div>

            <div>
              <Label htmlFor={`url-${index}`}>URL #{index + 1}</Label>
              <Input
                id={`url-${index}`}
                value={breadcrumb.url}
                onChange={(e) => updateBreadcrumb(index, "url", e.target.value)}
                placeholder="https://example.com/page"
              />
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addBreadcrumb}>
          <Plus className="h-4 w-4 mr-2" />
          Add more links
        </Button>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate Breadcrumb Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default BreadcrumbForm;
