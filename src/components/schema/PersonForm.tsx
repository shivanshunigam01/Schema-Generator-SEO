
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface PersonFormProps {
  onSchemaGenerated: (schema: any) => void;
}

const PersonForm = ({ onSchemaGenerated }: PersonFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    image: "",
    jobTitle: "",
    worksFor: "",
  });

  const [socialProfiles, setSocialProfiles] = useState<string[]>([""]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSocialProfile = () => {
    setSocialProfiles(prev => [...prev, ""]);
  };

  const removeSocialProfile = (index: number) => {
    if (socialProfiles.length > 1) {
      setSocialProfiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateSocialProfile = (index: number, value: string) => {
    setSocialProfiles(prev => prev.map((profile, i) => i === index ? value : profile));
  };

  const generateSchema = () => {
    const validSocialProfiles = socialProfiles.filter(profile => profile.trim() !== "");

    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": formData.name,
      "url": formData.url,
      "image": formData.image,
      "sameAs": validSocialProfiles,
      "jobTitle": formData.jobTitle,
      "worksFor": {
        "@type": "Organization",
        "name": formData.worksFor
      }
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Person Schema - Social Profile, Job Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) => handleInputChange("url", e.target.value)}
            placeholder="https://johndoe.com"
          />
        </div>

        <div>
          <Label htmlFor="image">Picture URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
            placeholder="https://example.com/profile-picture.jpg"
          />
        </div>

        <div>
          <Label>Social profiles</Label>
          {socialProfiles.map((profile, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                value={profile}
                onChange={(e) => updateSocialProfile(index, e.target.value)}
                placeholder={`Social profile URL #${index + 1} (e.g., https://twitter.com/johndoe)`}
              />
              {socialProfiles.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeSocialProfile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addSocialProfile}>
            <Plus className="h-4 w-4 mr-2" />
            Add Social Profile
          </Button>
        </div>

        <div>
          <Label htmlFor="jobTitle">Job title</Label>
          <Input
            id="jobTitle"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
            placeholder="Software Engineer"
          />
        </div>

        <div>
          <Label htmlFor="worksFor">Company</Label>
          <Input
            id="worksFor"
            value={formData.worksFor}
            onChange={(e) => handleInputChange("worksFor", e.target.value)}
            placeholder="Company name"
          />
        </div>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate Person Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default PersonForm;
