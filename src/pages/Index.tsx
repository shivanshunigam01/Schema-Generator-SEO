
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Copy, Download, RotateCcw, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SchemaData {
  website: {
    url: string;
    name: string;
    description: string;
    keywords: string;
    language: string;
    copyrightYear: string;
    copyrightHolder: string;
    author: string;
    publisher: string;
  };
  organization: {
    businessName: string;
    website: string;
    legalName: string;
    description: string;
    logoUrl: string;
    areaServed: string;
    expertise: string;
    brandMentions: string;
    foundingDate: string;
    foundingLocation: string;
    founders: string;
    employeeCount: string;
    email: string;
    phone: string;
    fax: string;
    vatId: string;
    taxId: string;
    naics: string;
    isicV4: string;
    slogan: string;
    awards: string;
  };
  localBusiness: {
    businessType: string;
    imageUrl: string;
    locationUrl: string;
    email: string;
    phone: string;
    offers: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    latitude: string;
    longitude: string;
    ratingValue: string;
    reviewCount: string;
    openingHours: string;
    paymentMethods: string;
    priceRange: string;
    currency: string;
    capacity: string;
    amenities: string;
    mapUrl: string;
    smokingAllowed: string;
  };
  service: {
    serviceName: string;
    description: string;
    type: string;
    provider: string;
    areaServed: string;
    price: string;
    url: string;
    channels: string;
    termsOfService: string;
  };
  event: {
    name: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    venue: string;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    performers: string;
    organizer: string;
    status: string;
    attendanceMode: string;
    ticketPrice: string;
    currency: string;
    availability: string;
    validFrom: string;
  };
  faq: {
    questions: Array<{ question: string; answer: string }>;
  };
  review: {
    title: string;
    content: string;
    authorName: string;
    date: string;
    rating: string;
    itemType: string;
    itemName: string;
    publisher: string;
    reviewUrl: string;
  };
}

const Index = () => {
  const { toast } = useToast();
  const [selectedSchemas, setSelectedSchemas] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [schemaData, setSchemaData] = useState<SchemaData>({
    website: {
      url: '', name: '', description: '', keywords: '', language: '',
      copyrightYear: '', copyrightHolder: '', author: '', publisher: ''
    },
    organization: {
      businessName: '', website: '', legalName: '', description: '', logoUrl: '',
      areaServed: '', expertise: '', brandMentions: '', foundingDate: '', foundingLocation: '',
      founders: '', employeeCount: '', email: '', phone: '', fax: '', vatId: '', taxId: '',
      naics: '', isicV4: '', slogan: '', awards: ''
    },
    localBusiness: {
      businessType: '', imageUrl: '', locationUrl: '', email: '', phone: '', offers: '',
      streetAddress: '', city: '', state: '', postalCode: '', country: '', latitude: '',
      longitude: '', ratingValue: '', reviewCount: '', openingHours: '', paymentMethods: '',
      priceRange: '', currency: '', capacity: '', amenities: '', mapUrl: '', smokingAllowed: ''
    },
    service: {
      serviceName: '', description: '', type: '', provider: '', areaServed: '',
      price: '', url: '', channels: '', termsOfService: ''
    },
    event: {
      name: '', description: '', startDateTime: '', endDateTime: '', venue: '',
      streetAddress: '', city: '', state: '', postalCode: '', country: '', performers: '',
      organizer: '', status: '', attendanceMode: '', ticketPrice: '', currency: '',
      availability: '', validFrom: ''
    },
    faq: {
      questions: [{ question: '', answer: '' }]
    },
    review: {
      title: '', content: '', authorName: '', date: '', rating: '', itemType: '',
      itemName: '', publisher: '', reviewUrl: ''
    }
  });

  const schemaTypes = [
    { id: 'website', label: 'Website Schema', icon: '🌐' },
    { id: 'organization', label: 'Organization Schema', icon: '🏢' },
    { id: 'localBusiness', label: 'Local Business Schema', icon: '🏪' },
    { id: 'service', label: 'Service Schema', icon: '🔧' },
    { id: 'event', label: 'Event Schema', icon: '📅' },
    { id: 'faq', label: 'FAQ Page Schema', icon: '❓' },
    { id: 'review', label: 'Review Schema', icon: '⭐' }
  ];

  const toggleSchema = (schemaId: string) => {
    setSelectedSchemas(prev => 
      prev.includes(schemaId) 
        ? prev.filter(id => id !== schemaId)
        : [...prev, schemaId]
    );
    if (!openSections.includes(schemaId)) {
      setOpenSections(prev => [...prev, schemaId]);
    }
  };

  const toggleSection = (schemaId: string) => {
    setOpenSections(prev => 
      prev.includes(schemaId) 
        ? prev.filter(id => id !== schemaId)
        : [...prev, schemaId]
    );
  };

  const updateSchemaData = (schemaType: keyof SchemaData, field: string, value: string) => {
    setSchemaData(prev => ({
      ...prev,
      [schemaType]: {
        ...prev[schemaType],
        [field]: value
      }
    }));
  };

  const getFieldCount = (schemaType: keyof SchemaData) => {
    if (schemaType === 'faq') {
      const validQuestions = schemaData.faq.questions.filter(q => q.question.trim() && q.answer.trim());
      return { filled: validQuestions.length, total: schemaData.faq.questions.length };
    }
    const fields = Object.values(schemaData[schemaType] as Record<string, string>);
    const filled = fields.filter(field => field.trim() !== '').length;
    return { filled, total: fields.length };
  };

  const getCompletionPercentage = (schemaType: keyof SchemaData) => {
    const { filled, total } = getFieldCount(schemaType);
    return Math.round((filled / total) * 100);
  };

  const generateSchema = () => {
    const schemas: any[] = [];

    selectedSchemas.forEach(schemaType => {
      switch (schemaType) {
        case 'website':
          if (schemaData.website.url || schemaData.website.name) {
            schemas.push({
              "@type": "WebSite",
              "url": schemaData.website.url,
              "name": schemaData.website.name,
              "description": schemaData.website.description,
              "keywords": schemaData.website.keywords,
              "inLanguage": schemaData.website.language,
              "copyrightYear": schemaData.website.copyrightYear,
              "copyrightHolder": schemaData.website.copyrightHolder,
              "author": schemaData.website.author,
              "publisher": schemaData.website.publisher
            });
          }
          break;
        case 'organization':
          if (schemaData.organization.businessName) {
            schemas.push({
              "@type": "Organization",
              "name": schemaData.organization.businessName,
              "url": schemaData.organization.website,
              "legalName": schemaData.organization.legalName,
              "description": schemaData.organization.description,
              "logo": schemaData.organization.logoUrl,
              "areaServed": schemaData.organization.areaServed,
              "expertise": schemaData.organization.expertise,
              "brand": schemaData.organization.brandMentions,
              "foundingDate": schemaData.organization.foundingDate,
              "foundingLocation": schemaData.organization.foundingLocation,
              "founder": schemaData.organization.founders,
              "numberOfEmployees": schemaData.organization.employeeCount,
              "email": schemaData.organization.email,
              "telephone": schemaData.organization.phone,
              "faxNumber": schemaData.organization.fax,
              "vatID": schemaData.organization.vatId,
              "taxID": schemaData.organization.taxId,
              "naics": schemaData.organization.naics,
              "isicV4": schemaData.organization.isicV4,
              "slogan": schemaData.organization.slogan,
              "award": schemaData.organization.awards
            });
          }
          break;
        // Add other schema cases here...
      }
    });

    return {
      "@context": "https://schema.org",
      "@graph": schemas
    };
  };

  const resetForm = () => {
    setSchemaData({
      website: {
        url: '', name: '', description: '', keywords: '', language: '',
        copyrightYear: '', copyrightHolder: '', author: '', publisher: ''
      },
      organization: {
        businessName: '', website: '', legalName: '', description: '', logoUrl: '',
        areaServed: '', expertise: '', brandMentions: '', foundingDate: '', foundingLocation: '',
        founders: '', employeeCount: '', email: '', phone: '', fax: '', vatId: '', taxId: '',
        naics: '', isicV4: '', slogan: '', awards: ''
      },
      localBusiness: {
        businessType: '', imageUrl: '', locationUrl: '', email: '', phone: '', offers: '',
        streetAddress: '', city: '', state: '', postalCode: '', country: '', latitude: '',
        longitude: '', ratingValue: '', reviewCount: '', openingHours: '', paymentMethods: '',
        priceRange: '', currency: '', capacity: '', amenities: '', mapUrl: '', smokingAllowed: ''
      },
      service: {
        serviceName: '', description: '', type: '', provider: '', areaServed: '',
        price: '', url: '', channels: '', termsOfService: ''
      },
      event: {
        name: '', description: '', startDateTime: '', endDateTime: '', venue: '',
        streetAddress: '', city: '', state: '', postalCode: '', country: '', performers: '',
        organizer: '', status: '', attendanceMode: '', ticketPrice: '', currency: '',
        availability: '', validFrom: ''
      },
      faq: {
        questions: [{ question: '', answer: '' }]
      },
      review: {
        title: '', content: '', authorName: '', date: '', rating: '', itemType: '',
        itemName: '', publisher: '', reviewUrl: ''
      }
    });
    setSelectedSchemas([]);
    setOpenSections([]);
    toast({
      title: "Form Reset",
      description: "All form data has been cleared."
    });
  };

  const copySchema = () => {
    const schema = JSON.stringify(generateSchema(), null, 2);
    navigator.clipboard.writeText(schema);
    toast({
      title: "Schema Copied",
      description: "Schema markup has been copied to clipboard."
    });
  };

  const downloadJSON = () => {
    const schema = JSON.stringify(generateSchema(), null, 2);
    const blob = new Blob([schema], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema-markup.json';
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Schema Downloaded",
      description: "Schema markup JSON file has been downloaded."
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFB100' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Free Schema Markup Generator
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Create custom JSON-LD structured data markup for your website. No coding required.
          </p>
        </div>

        {/* Schema Selection */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Select Schema Types</CardTitle>
            <p className="text-gray-600">Choose the schema types you want to generate</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schemaTypes.map((schema) => (
                <div
                  key={schema.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedSchemas.includes(schema.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleSchema(schema.id)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{schema.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold">{schema.label}</h3>
                      {selectedSchemas.includes(schema.id) && (
                        <div className="mt-2">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Completion</span>
                            <span>{getCompletionPercentage(schema.id as keyof SchemaData)}%</span>
                          </div>
                          <Progress value={getCompletionPercentage(schema.id as keyof SchemaData)} className="h-2" />
                          <div className="text-xs text-gray-500 mt-1">
                            {getFieldCount(schema.id as keyof SchemaData).filled} / {getFieldCount(schema.id as keyof SchemaData).total} fields
                          </div>
                        </div>
                      )}
                    </div>
                    {selectedSchemas.includes(schema.id) && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Sections */}
        {selectedSchemas.map((schemaId) => (
          <Card key={schemaId} className="mb-6 shadow-lg">
            <Collapsible open={openSections.includes(schemaId)} onOpenChange={() => toggleSection(schemaId)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        {schemaTypes.find(s => s.id === schemaId)?.icon}
                        {schemaTypes.find(s => s.id === schemaId)?.label}
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="text-sm text-gray-600">
                          {getFieldCount(schemaId as keyof SchemaData).filled} / {getFieldCount(schemaId as keyof SchemaData).total} fields completed
                        </div>
                        <div className="text-sm font-semibold text-green-600">
                          {getCompletionPercentage(schemaId as keyof SchemaData)}%
                        </div>
                      </div>
                      <Progress value={getCompletionPercentage(schemaId as keyof SchemaData)} className="h-2 mt-2" />
                    </div>
                    {openSections.includes(schemaId) ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  {schemaId === 'website' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="website-url">Website URL *</Label>
                        <Input
                          id="website-url"
                          value={schemaData.website.url}
                          onChange={(e) => updateSchemaData('website', 'url', e.target.value)}
                          placeholder="https://example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-name">Website Name *</Label>
                        <Input
                          id="website-name"
                          value={schemaData.website.name}
                          onChange={(e) => updateSchemaData('website', 'name', e.target.value)}
                          placeholder="My Website"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="website-description">Description</Label>
                        <Textarea
                          id="website-description"
                          value={schemaData.website.description}
                          onChange={(e) => updateSchemaData('website', 'description', e.target.value)}
                          placeholder="Website description"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-keywords">Keywords</Label>
                        <Input
                          id="website-keywords"
                          value={schemaData.website.keywords}
                          onChange={(e) => updateSchemaData('website', 'keywords', e.target.value)}
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-language">Language</Label>
                        <Input
                          id="website-language"
                          value={schemaData.website.language}
                          onChange={(e) => updateSchemaData('website', 'language', e.target.value)}
                          placeholder="en-US"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-copyright-year">Copyright Year</Label>
                        <Input
                          id="website-copyright-year"
                          value={schemaData.website.copyrightYear}
                          onChange={(e) => updateSchemaData('website', 'copyrightYear', e.target.value)}
                          placeholder="2024"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-copyright-holder">Copyright Holder</Label>
                        <Input
                          id="website-copyright-holder"
                          value={schemaData.website.copyrightHolder}
                          onChange={(e) => updateSchemaData('website', 'copyrightHolder', e.target.value)}
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-author">Author</Label>
                        <Input
                          id="website-author"
                          value={schemaData.website.author}
                          onChange={(e) => updateSchemaData('website', 'author', e.target.value)}
                          placeholder="Author Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-publisher">Publisher</Label>
                        <Input
                          id="website-publisher"
                          value={schemaData.website.publisher}
                          onChange={(e) => updateSchemaData('website', 'publisher', e.target.value)}
                          placeholder="Publisher Name"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Add other schema form sections here - Organization, LocalBusiness, etc. */}
                  {schemaId === 'organization' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="org-business-name">Business Name *</Label>
                        <Input
                          id="org-business-name"
                          value={schemaData.organization.businessName}
                          onChange={(e) => updateSchemaData('organization', 'businessName', e.target.value)}
                          placeholder="Your Business Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-website">Website</Label>
                        <Input
                          id="org-website"
                          value={schemaData.organization.website}
                          onChange={(e) => updateSchemaData('organization', 'website', e.target.value)}
                          placeholder="https://yourbusiness.com"
                        />
                      </div>
                      {/* Add more organization fields */}
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}

        {/* Actions */}
        {selectedSchemas.length > 0 && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button onClick={resetForm} variant="outline" className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reset Form
                </Button>
                <Button onClick={copySchema} className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  Copy Schema
                </Button>
                <Button onClick={downloadJSON} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download JSON
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generated Schema Output */}
        {selectedSchemas.length > 0 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Generated Schema Markup</CardTitle>
              <p className="text-gray-600">Copy this JSON-LD code and add it to your website's &lt;head&gt; section</p>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{JSON.stringify(generateSchema(), null, 2)}</code>
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Footer with FAQs */}
        <div className="mt-12 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">About Schema Markup</h3>
          <p className="max-w-2xl mx-auto mb-8">
            Schema markup helps search engines understand your content better, leading to enhanced search results 
            with rich snippets, improved click-through rates, and better SEO performance.
          </p>
          <p className="text-sm opacity-75">
            © 2024 Free Schema Markup Generator. Built with ❤️ for better SEO.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
