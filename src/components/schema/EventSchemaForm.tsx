
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface EventSchemaFormProps {
  onSchemaGenerated: (schema: any) => void;
}

interface TicketOffer {
  name: string;
  price: string;
  currency: string;
  url: string;
}

const EventSchemaForm = ({ onSchemaGenerated }: EventSchemaFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    eventStatus: "",
    eventAttendanceMode: "",
    performerType: "Person",
    performerName: "",
    locationName: "",
    locationAddress: "",
  });

  const [offers, setOffers] = useState<TicketOffer[]>([
    { name: "", price: "", currency: "USD", url: "" }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addOffer = () => {
    setOffers(prev => [...prev, { name: "", price: "", currency: "USD", url: "" }]);
  };

  const removeOffer = (index: number) => {
    if (offers.length > 1) {
      setOffers(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateOffer = (index: number, field: keyof TicketOffer, value: string) => {
    setOffers(prev => prev.map((offer, i) => 
      i === index ? { ...offer, [field]: value } : offer
    ));
  };

  const generateSchema = () => {
    const validOffers = offers.filter(offer => 
      offer.name.trim() !== "" && offer.price.trim() !== ""
    ).map(offer => ({
      "@type": "Offer",
      "name": offer.name,
      "price": offer.price,
      "priceCurrency": offer.currency,
      "url": offer.url,
      "availability": "https://schema.org/InStock"
    }));

    const schema = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": formData.name,
      "image": formData.image,
      "description": formData.description,
      "startDate": `${formData.startDate}T${formData.startTime}`,
      "endDate": `${formData.endDate}T${formData.endTime}`,
      "eventStatus": formData.eventStatus,
      "eventAttendanceMode": formData.eventAttendanceMode,
      "location": {
        "@type": "Place",
        "name": formData.locationName,
        "address": formData.locationAddress
      },
      "performer": {
        "@type": formData.performerType,
        "name": formData.performerName
      },
      "offers": validOffers
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Event Schema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Event name"
          />
        </div>

        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
            placeholder="https://example.com/event-image.jpg"
          />
        </div>

        <div>
          <Label htmlFor="description">Event's description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe the event"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="startTime">Start time (e.g. 08:00)</Label>
            <Input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) => handleInputChange("startTime", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="endDate">End date</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="endTime">End time (e.g. 17:30)</Label>
            <Input
              id="endTime"
              type="time"
              value={formData.endTime}
              onChange={(e) => handleInputChange("endTime", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="eventStatus">Event Status</Label>
          <Select value={formData.eventStatus} onValueChange={(value) => handleInputChange("eventStatus", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select event status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="https://schema.org/EventScheduled">Scheduled</SelectItem>
              <SelectItem value="https://schema.org/EventCancelled">Cancelled</SelectItem>
              <SelectItem value="https://schema.org/EventPostponed">Postponed</SelectItem>
              <SelectItem value="https://schema.org/EventRescheduled">Rescheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="eventAttendanceMode">Attendance Mode</Label>
          <Select value={formData.eventAttendanceMode} onValueChange={(value) => handleInputChange("eventAttendanceMode", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select attendance mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="https://schema.org/OfflineEventAttendanceMode">Offline</SelectItem>
              <SelectItem value="https://schema.org/OnlineEventAttendanceMode">Online</SelectItem>
              <SelectItem value="https://schema.org/MixedEventAttendanceMode">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="performerName">Performer's name</Label>
          <Input
            id="performerName"
            value={formData.performerName}
            onChange={(e) => handleInputChange("performerName", e.target.value)}
            placeholder="Performer name"
          />
        </div>

        <div>
          <Label htmlFor="locationName">Location Name</Label>
          <Input
            id="locationName"
            value={formData.locationName}
            onChange={(e) => handleInputChange("locationName", e.target.value)}
            placeholder="Venue name"
          />
        </div>

        <div>
          <Label htmlFor="locationAddress">Location Address</Label>
          <Input
            id="locationAddress"
            value={formData.locationAddress}
            onChange={(e) => handleInputChange("locationAddress", e.target.value)}
            placeholder="Full address"
          />
        </div>

        <div className="space-y-4">
          <Label>Ticket Offers</Label>
          {offers.map((offer, index) => (
            <div key={index} className="space-y-2 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <Label>Ticket Type #{index + 1}</Label>
                {offers.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeOffer(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <Input
                value={offer.name}
                onChange={(e) => updateOffer(index, "name", e.target.value)}
                placeholder="Ticket type name (e.g. General admission)"
              />
              
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={offer.price}
                  onChange={(e) => updateOffer(index, "price", e.target.value)}
                  placeholder="Price"
                  type="number"
                  step="0.01"
                />
                <Select value={offer.currency} onValueChange={(value) => updateOffer(index, "currency", value)}>
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
              
              <Input
                value={offer.url}
                onChange={(e) => updateOffer(index, "url", e.target.value)}
                placeholder="Ticket purchase URL"
              />
            </div>
          ))}
          
          <Button type="button" variant="outline" onClick={addOffer}>
            <Plus className="h-4 w-4 mr-2" />
            Add ticket type
          </Button>
        </div>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate Event Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventSchemaForm;
