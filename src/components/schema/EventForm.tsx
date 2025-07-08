
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface EventFormProps {
  onSchemaGenerated: (schema: any) => void;
}

const EventForm = ({ onSchemaGenerated }: EventFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    organizer: "",
    image: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": formData.name,
      "description": formData.description,
      "startDate": formData.startDate,
      "endDate": formData.endDate,
      "location": {
        "@type": "Place",
        "name": formData.location,
      },
      "organizer": {
        "@type": "Organization",
        "name": formData.organizer,
      },
      "image": formData.image,
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Event Schema (Legacy)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Event Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Event Name"
          />
        </div>

        <div>
          <Label htmlFor="description">Event Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Brief description of the event"
          />
        </div>

        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="datetime-local"
            value={formData.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="datetime-local"
            value={formData.endDate}
            onChange={(e) => handleInputChange("endDate", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="Event venue or location"
          />
        </div>

        <div>
          <Label htmlFor="organizer">Organizer</Label>
          <Input
            id="organizer"
            value={formData.organizer}
            onChange={(e) => handleInputChange("organizer", e.target.value)}
            placeholder="Event organizer name"
          />
        </div>

        <div>
          <Label htmlFor="image">Event Image URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
            placeholder="https://example.com/event-image.jpg"
          />
        </div>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate Event Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventForm;
