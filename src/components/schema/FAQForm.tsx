
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface FAQFormProps {
  onSchemaGenerated: (schema: any) => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQForm = ({ onSchemaGenerated }: FAQFormProps) => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    { question: "", answer: "" },
  ]);

  const addFAQ = () => {
    setFaqs(prev => [...prev, { question: "", answer: "" }]);
  };

  const removeFAQ = (index: number) => {
    if (faqs.length > 1) {
      setFaqs(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateFAQ = (index: number, field: keyof FAQItem, value: string) => {
    setFaqs(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const generateSchema = () => {
    const validFaqs = faqs.filter(faq => faq.question.trim() !== "" && faq.answer.trim() !== "");
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": validFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>FAQ Schema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <Label>FAQ #{index + 1}</Label>
              {faqs.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeFAQ(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div>
              <Label htmlFor={`question-${index}`}>Question</Label>
              <Input
                id={`question-${index}`}
                value={faq.question}
                onChange={(e) => updateFAQ(index, "question", e.target.value)}
                placeholder="Frequently asked question"
              />
            </div>

            <div>
              <Label htmlFor={`answer-${index}`}>Answer</Label>
              <Textarea
                id={`answer-${index}`}
                value={faq.answer}
                onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                placeholder="Answer to the question"
              />
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addFAQ}>
          <Plus className="h-4 w-4 mr-2" />
          Add FAQ
        </Button>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate FAQ Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default FAQForm;
