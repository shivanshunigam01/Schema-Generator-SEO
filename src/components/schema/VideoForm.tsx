
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface VideoFormProps {
  onSchemaGenerated: (schema: any) => void;
}

const VideoForm = ({ onSchemaGenerated }: VideoFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    uploadDate: "",
    minutes: "",
    seconds: "",
    description: "",
    contentUrl: "",
    embedUrl: "",
    seekToActionUrl: "",
  });

  const [thumbnails, setThumbnails] = useState<string[]>([""]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addThumbnail = () => {
    setThumbnails(prev => [...prev, ""]);
  };

  const removeThumbnail = (index: number) => {
    if (thumbnails.length > 1) {
      setThumbnails(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateThumbnail = (index: number, value: string) => {
    setThumbnails(prev => prev.map((thumb, i) => i === index ? value : thumb));
  };

  const generateSchema = () => {
    const validThumbnails = thumbnails.filter(thumb => thumb.trim() !== "");
    const totalSeconds = parseInt(formData.minutes || "0") * 60 + parseInt(formData.seconds || "0");
    const duration = `PT${Math.floor(totalSeconds / 60)}M${totalSeconds % 60}S`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": formData.name,
      "uploadDate": formData.uploadDate,
      "duration": duration,
      "description": formData.description,
      "thumbnailUrl": validThumbnails,
      "contentUrl": formData.contentUrl,
      "embedUrl": formData.embedUrl,
      "potentialAction": {
        "@type": "SeekToAction",
        "target": formData.seekToActionUrl
      }
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Video Schema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Video title"
          />
        </div>

        <div>
          <Label htmlFor="uploadDate">Upload date</Label>
          <Input
            id="uploadDate"
            type="date"
            value={formData.uploadDate}
            onChange={(e) => handleInputChange("uploadDate", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="minutes">Minutes</Label>
            <Input
              id="minutes"
              type="number"
              min="0"
              value={formData.minutes}
              onChange={(e) => handleInputChange("minutes", e.target.value)}
              placeholder="5"
            />
          </div>
          <div>
            <Label htmlFor="seconds">Seconds</Label>
            <Input
              id="seconds"
              type="number"
              min="0"
              max="59"
              value={formData.seconds}
              onChange={(e) => handleInputChange("seconds", e.target.value)}
              placeholder="30"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Video's description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Detailed video description"
          />
        </div>

        <div>
          <Label>Thumbnail URLs</Label>
          {thumbnails.map((thumbnail, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                value={thumbnail}
                onChange={(e) => updateThumbnail(index, e.target.value)}
                placeholder={`Thumbnail URL #${index + 1}`}
              />
              {thumbnails.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeThumbnail(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addThumbnail}>
            <Plus className="h-4 w-4 mr-2" />
            Add Thumbnail
          </Button>
        </div>

        <div>
          <Label htmlFor="contentUrl">Content URL</Label>
          <Input
            id="contentUrl"
            value={formData.contentUrl}
            onChange={(e) => handleInputChange("contentUrl", e.target.value)}
            placeholder="https://example.com/video.mp4"
          />
        </div>

        <div>
          <Label htmlFor="embedUrl">Embed URL</Label>
          <Input
            id="embedUrl"
            value={formData.embedUrl}
            onChange={(e) => handleInputChange("embedUrl", e.target.value)}
            placeholder="https://youtube.com/embed/..."
          />
        </div>

        <div>
          <Label htmlFor="seekToActionUrl">SeekToAction Target URL</Label>
          <Input
            id="seekToActionUrl"
            value={formData.seekToActionUrl}
            onChange={(e) => handleInputChange("seekToActionUrl", e.target.value)}
            placeholder="https://example.com/video?t={seek_to_second_number}"
          />
        </div>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate Video Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default VideoForm;
