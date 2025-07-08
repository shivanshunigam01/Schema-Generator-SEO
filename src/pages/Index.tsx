import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  RotateCcw,
  CheckCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    locationProfiles: string;
    openingHours: string;
    paymentMethods: string;
    priceRange: string;
    currency: string;
    serviceArea: string;
    areaServed: string;
    capacity: string;
    amenities: string;
    mapUrl: string;
    publicAccess: string;
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
  article: {
    url: string;
    headline: string;
    imageUrl: string;
    description: string;
    authorType: string;
    author: string;
    authorUrl: string;
    publisher: string;
    publisherLogo: string;
    datePublished: string;
    dateModified: string;
  };
  breadcrumb: {
    items: Array<{ name: string; url: string }>;
  };
  howTo: {
    name: string;
    totalTime: string;
    estimatedCost: string;
    currency: string;
    description: string;
    imageUrl: string;
    steps: Array<{
      text: string;
      imageUrl: string;
      name: string;
      url: string;
    }>;
    supplies: Array<{ name: string }>;
    tools: Array<{ name: string }>;
  };
  jobPosting: {
    title: string;
    identifier: string;
    description: string;
    company: string;
    companyUrl: string;
    companyLogo: string;
    industry: string;
    employmentType: string;
    workHours: string;
    datePosted: string;
    validThrough: string;
    remoteJob: boolean;
    country: string;
    state: string;
    street: string;
    city: string;
    postalCode: string;
    salaryMin: string;
    salaryMax: string;
    currency: string;
    salaryUnit: string;
    responsibilities: string;
    skills: string;
    qualifications: string;
    education: string;
    experience: string;
  };
  person: {
    name: string;
    url: string;
    image: string;
    sameAs: string[];
    jobTitle: string;
    worksFor: string;
  };

  product: {
    name: string;
    image: string;
    brand: string;
    sku: string;
    description: string;
    offerType: string;
    url: string;
    priceCurrency: string;
    price: string;
    aggregateRating: string;
    ratingCount: string;
    ratingHigh: string;
    ratingLow: string;
  };

  recipe: {
    name: string;
    keywords: string;
    description: string;
    image: string;
    videoContentUrl: string;
    videoEmbedUrl: string;
    creator: string;
    datePublished: string;
    prepTime: string;
    cookTime: string;
    category: string;
    cuisine: string;
    servings: string;
    nutritionServingSize: string;
    nutritionCalories: string;
    nutritionFat: string;
    ratingValue: string;
    ratingCount: string;
    ratingHigh: string;
    ratingLow: string;
  };

  video: {
    name: string;
    uploadDate: string;
    durationMinutes: string;
    durationSeconds: string;
    description: string;
    thumbnailUrls: string[];
    contentUrl: string;
    embedUrl: string;
    seekToAction: string;
  };
}

const Index = () => {
  const { toast } = useToast();
  const [selectedSchemas, setSelectedSchemas] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [schemaData, setSchemaData] = useState<SchemaData>({
    website: {
      url: "",
      name: "",
      description: "",
      keywords: "",
      language: "",
      copyrightYear: "",
      copyrightHolder: "",
      author: "",
      publisher: "",
    },
    organization: {
      businessName: "",
      website: "",
      legalName: "",
      description: "",
      logoUrl: "",
      areaServed: "",
      expertise: "",
      brandMentions: "",
      foundingDate: "",
      foundingLocation: "",
      founders: "",
      employeeCount: "",
      email: "",
      phone: "",
      fax: "",
      vatId: "",
      taxId: "",
      naics: "",
      isicV4: "",
      slogan: "",
      awards: "",
    },
    localBusiness: {
      businessType: "Local Business (Default)",
      imageUrl: "",
      locationUrl: "",
      email: "",
      phone: "",
      offers: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      latitude: "",
      longitude: "",
      ratingValue: "",
      reviewCount: "",
      locationProfiles: "",
      openingHours: "",
      paymentMethods: "",
      priceRange: "",
      currency: "",
      serviceArea: "",
      areaServed: "",
      capacity: "",
      amenities: "",
      mapUrl: "",
      publicAccess: "",
      smokingAllowed: "",
    },
    service: {
      serviceName: "",
      description: "",
      type: "",
      provider: "",
      areaServed: "",
      price: "",
      url: "",
      channels: "",
      termsOfService: "",
    },
    event: {
      name: "",
      description: "",
      startDateTime: "",
      endDateTime: "",
      venue: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      performers: "",
      organizer: "",
      status: "",
      attendanceMode: "",
      ticketPrice: "",
      currency: "",
      availability: "",
      validFrom: "",
    },
    faq: {
      questions: [
        { question: "", answer: "" },
        { question: "", answer: "" },
        { question: "", answer: "" },
        { question: "", answer: "" },
        { question: "", answer: "" },
      ],
    },
    review: {
      title: "",
      content: "",
      authorName: "",
      date: "",
      rating: "",
      itemType: "Product",
      itemName: "",
      publisher: "",
      reviewUrl: "",
    },
    article: {
      url: "",
      headline: "",
      imageUrl: "",
      description: "",
      authorType: "",
      author: "",
      authorUrl: "",
      publisher: "",
      publisherLogo: "",
      datePublished: "",
      dateModified: "",
    },
    breadcrumb: {
      items: [
        { name: "", url: "" },
        { name: "", url: "" },
      ],
    },
    howTo: {
      name: "",
      totalTime: "",
      estimatedCost: "",
      currency: "",
      description: "",
      imageUrl: "",
      steps: [{ text: "", imageUrl: "", name: "", url: "" }],
      supplies: [],
      tools: [],
    },
    jobPosting: {
      title: "",
      identifier: "",
      description: "",
      company: "",
      companyUrl: "",
      companyLogo: "",
      industry: "",
      employmentType: "",
      workHours: "",
      datePosted: "",
      validThrough: "",
      remoteJob: false,
      country: "",
      state: "",
      street: "",
      city: "",
      postalCode: "",
      salaryMin: "",
      salaryMax: "",
      currency: "",
      salaryUnit: "",
      responsibilities: "",
      skills: "",
      qualifications: "",
      education: "",
      experience: "",
    },
    person: {
      name: "",
      url: "",
      image: "",
      sameAs: [""],
      jobTitle: "",
      worksFor: "",
    },

    product: {
      name: "",
      image: "",
      brand: "",
      sku: "",
      description: "",
      offerType: "",
      url: "",
      priceCurrency: "",
      price: "",
      aggregateRating: "",
      ratingCount: "",
      ratingHigh: "",
      ratingLow: "",
    },

    recipe: {
      name: "",
      keywords: "",
      description: "",
      image: "",
      videoContentUrl: "",
      videoEmbedUrl: "",
      creator: "",
      datePublished: "",
      prepTime: "",
      cookTime: "",
      category: "",
      cuisine: "",
      servings: "",
      nutritionServingSize: "",
      nutritionCalories: "",
      nutritionFat: "",
      ratingValue: "",
      ratingCount: "",
      ratingHigh: "",
      ratingLow: "",
    },

    video: {
      name: "",
      uploadDate: "",
      durationMinutes: "",
      durationSeconds: "",
      description: "",
      thumbnailUrls: [""],
      contentUrl: "",
      embedUrl: "",
      seekToAction: "",
    },
  });

  const schemaTypes = [
    { id: "website", label: "Website Schema", icon: "🌐" },
    { id: "organization", label: "Organization Schema", icon: "🏢" },
    { id: "localBusiness", label: "Local Business Schema", icon: "🏪" },
    { id: "service", label: "Service Schema", icon: "🔧" },
    { id: "event", label: "Event Schema", icon: "📅" },
    { id: "faq", label: "FAQ Page Schema", icon: "❓" },
    { id: "review", label: "Review Schema", icon: "⭐" },
    { id: "article", label: "Article Schema", icon: "📰" },
    { id: "breadcrumb", label: "Breadcrumb Schema", icon: "🧭" },
    { id: "howTo", label: "How-to Schema", icon: "🛠️" },
    { id: "jobPosting", label: "Job Posting Schema", icon: "💼" },
    { id: "person", label: "Person Schema", icon: "🧑" },
    { id: "product", label: "Product Schema", icon: "📦" },
    { id: "recipe", label: "Recipe Schema", icon: "🍽️" },
    { id: "video", label: "Video Schema", icon: "🎥" },
  ];

  const toggleSchema = (schemaId: string) => {
    setSelectedSchemas((prev) =>
      prev.includes(schemaId)
        ? prev.filter((id) => id !== schemaId)
        : [...prev, schemaId]
    );
    if (!openSections.includes(schemaId)) {
      setOpenSections((prev) => [...prev, schemaId]);
    }
  };

  const toggleSection = (schemaId: string) => {
    setOpenSections((prev) =>
      prev.includes(schemaId)
        ? prev.filter((id) => id !== schemaId)
        : [...prev, schemaId]
    );
  };
  const updateBreadcrumbItem = (
    index: number,
    field: "name" | "url",
    value: string
  ) => {
    setSchemaData((prev) => ({
      ...prev,
      breadcrumb: {
        items: prev.breadcrumb.items.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const addBreadcrumbItem = () => {
    setSchemaData((prev) => ({
      ...prev,
      breadcrumb: {
        items: [...prev.breadcrumb.items, { name: "", url: "" }],
      },
    }));
  };

  const removeBreadcrumbItem = (index: number) => {
    setSchemaData((prev) => ({
      ...prev,
      breadcrumb: {
        items: prev.breadcrumb.items.filter((_, i) => i !== index),
      },
    }));
  };

  const updateSchemaData = <
    K extends keyof SchemaData,
    F extends keyof SchemaData[K]
  >(
    schemaKey: K,
    field: F,
    value: SchemaData[K][F]
  ) => {
    setSchemaData((prev) => ({
      ...prev,
      [schemaKey]: {
        ...prev[schemaKey],
        [field]: value,
      },
    }));
  };

  const updateFAQQuestion = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setSchemaData((prev) => ({
      ...prev,
      faq: {
        questions: prev.faq.questions.map((q, i) =>
          i === index ? { ...q, [field]: value } : q
        ),
      },
    }));
  };

  const getFieldCount = (schemaType: keyof SchemaData) => {
    if (schemaType === "faq") {
      const validQuestions = schemaData.faq.questions.filter(
        (q) => q.question.trim() && q.answer.trim()
      );
      return {
        filled: validQuestions.length,
        total: schemaData.faq.questions.length,
      };
    }

    if (schemaType === "breadcrumb") {
      const validItems = schemaData.breadcrumb.items.filter(
        (item) => item.name.trim() && item.url.trim()
      );
      return {
        filled: validItems.length,
        total: schemaData.breadcrumb.items.length,
      };
    }

    const fields = Object.values(
      schemaData[schemaType] as Record<string, string>
    );
    const filled = fields.filter(
      (field) => typeof field === "string" && field.trim() !== ""
    ).length;
    return { filled, total: fields.length };
  };

  const getCompletionPercentage = (schemaType: keyof SchemaData) => {
    const { filled, total } = getFieldCount(schemaType);
    return Math.round((filled / total) * 100);
  };

  const generateSchema = () => {
    const schemas: any[] = [];

    selectedSchemas.forEach((schemaType) => {
      switch (schemaType) {
        case "website":
          if (schemaData.website.url || schemaData.website.name) {
            schemas.push({
              "@type": "WebSite",
              url: schemaData.website.url,
              name: schemaData.website.name,
              description: schemaData.website.description,
              keywords: schemaData.website.keywords,
              inLanguage: schemaData.website.language,
              copyrightYear: schemaData.website.copyrightYear,
              copyrightHolder: schemaData.website.copyrightHolder,
              author: schemaData.website.author,
              publisher: schemaData.website.publisher,
            });
          }
          break;
        case "person":
          schemas.push({
            "@type": "Person",
            name: schemaData.person.name,
            url: schemaData.person.url,
            image: schemaData.person.image,
            jobTitle: schemaData.person.jobTitle,
            worksFor: {
              "@type": "Organization",
              name: schemaData.person.worksFor,
            },
            sameAs: schemaData.person.sameAs.filter(
              (link) => link.trim() !== ""
            ),
          });
          break;

        case "product":
          schemas.push({
            "@type": "Product",
            name: schemaData.product.name,
            image: schemaData.product.image,
            brand: {
              "@type": "Brand",
              name: schemaData.product.brand,
            },
            sku: schemaData.product.sku,
            description: schemaData.product.description,
            offers: {
              "@type": schemaData.product.offerType,
              url: schemaData.product.url,
              priceCurrency: schemaData.product.priceCurrency,
              price: schemaData.product.price,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: schemaData.product.aggregateRating,
              ratingCount: schemaData.product.ratingCount,
              bestRating: schemaData.product.ratingHigh,
              worstRating: schemaData.product.ratingLow,
            },
          });
          break;

        case "recipe":
          schemas.push({
            "@type": "Recipe",
            name: schemaData.recipe.name,
            keywords: schemaData.recipe.keywords,
            description: schemaData.recipe.description,
            image: schemaData.recipe.image,
            video: {
              "@type": "VideoObject",
              contentUrl: schemaData.recipe.videoContentUrl,
              embedUrl: schemaData.recipe.videoEmbedUrl,
            },
            author: {
              "@type": "Person",
              name: schemaData.recipe.creator,
            },
            datePublished: schemaData.recipe.datePublished,
            prepTime: schemaData.recipe.prepTime,
            cookTime: schemaData.recipe.cookTime,
            recipeCategory: schemaData.recipe.category,
            recipeCuisine: schemaData.recipe.cuisine,
            recipeYield: schemaData.recipe.servings,
            nutrition: {
              "@type": "NutritionInformation",
              servingSize: schemaData.recipe.nutritionServingSize,
              calories: schemaData.recipe.nutritionCalories,
              fatContent: schemaData.recipe.nutritionFat,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: schemaData.recipe.ratingValue,
              ratingCount: schemaData.recipe.ratingCount,
              bestRating: schemaData.recipe.ratingHigh,
              worstRating: schemaData.recipe.ratingLow,
            },
          });
          break;

        case "video":
          schemas.push({
            "@type": "VideoObject",
            name: schemaData.video.name,
            uploadDate: schemaData.video.uploadDate,
            description: schemaData.video.description,
            thumbnailUrl: schemaData.video.thumbnailUrls.filter(
              (t) => t.trim() !== ""
            ),
            contentUrl: schemaData.video.contentUrl,
            embedUrl: schemaData.video.embedUrl,
            duration: `PT${schemaData.video.durationMinutes}M${schemaData.video.durationSeconds}S`,
            potentialAction: {
              "@type": "SeekToAction",
              target: schemaData.video.seekToAction,
              "startOffset-input": "required name=startOffset",
            },
          });
          break;

        case "jobPosting":
          if (schemaData.jobPosting.title) {
            schemas.push({
              "@type": "JobPosting",
              title: schemaData.jobPosting.title,
              identifier: schemaData.jobPosting.identifier,
              description: schemaData.jobPosting.description,
              hiringOrganization: {
                "@type": "Organization",
                name: schemaData.jobPosting.company,
                sameAs: schemaData.jobPosting.companyUrl,
                logo: schemaData.jobPosting.companyLogo,
              },
              industry: schemaData.jobPosting.industry,
              employmentType: schemaData.jobPosting.employmentType,
              workHours: schemaData.jobPosting.workHours,
              datePosted: schemaData.jobPosting.datePosted,
              validThrough: schemaData.jobPosting.validThrough,
              jobLocation: schemaData.jobPosting.remoteJob
                ? {
                    "@type": "Place",
                    address: {
                      "@type": "PostalAddress",
                      addressCountry: schemaData.jobPosting.country,
                    },
                  }
                : {
                    "@type": "Place",
                    address: {
                      "@type": "PostalAddress",
                      addressCountry: schemaData.jobPosting.country,
                      addressRegion: schemaData.jobPosting.state,
                      streetAddress: schemaData.jobPosting.street,
                      addressLocality: schemaData.jobPosting.city,
                      postalCode: schemaData.jobPosting.postalCode,
                    },
                  },
              baseSalary: {
                "@type": "MonetaryAmount",
                currency: schemaData.jobPosting.currency,
                value: {
                  "@type": "QuantitativeValue",
                  minValue: schemaData.jobPosting.salaryMin,
                  maxValue: schemaData.jobPosting.salaryMax,
                  unitText: schemaData.jobPosting.salaryUnit,
                },
              },
              responsibilities: schemaData.jobPosting.responsibilities,
              skills: schemaData.jobPosting.skills,
              qualifications: schemaData.jobPosting.qualifications,
              educationRequirements: schemaData.jobPosting.education,
              experienceRequirements: schemaData.jobPosting.experience,
            });
          }
          break;

        case "howTo":
          if (schemaData.howTo.name && schemaData.howTo.steps.length > 0) {
            schemas.push({
              "@type": "HowTo",
              name: schemaData.howTo.name,
              totalTime: schemaData.howTo.totalTime,
              estimatedCost: {
                "@type": "MonetaryAmount",
                currency: schemaData.howTo.currency,
                value: schemaData.howTo.estimatedCost,
              },
              description: schemaData.howTo.description,
              image: schemaData.howTo.imageUrl,
              supply: schemaData.howTo.supplies.map((s) => ({
                "@type": "HowToSupply",
                name: s.name,
              })),
              tool: schemaData.howTo.tools.map((t) => ({
                "@type": "HowToTool",
                name: t.name,
              })),
              step: schemaData.howTo.steps.map((s) => ({
                "@type": "HowToStep",
                text: s.text,
                image: s.imageUrl,
                name: s.name,
                url: s.url,
              })),
            });
          }
          break;

        case "organization":
          if (schemaData.organization.businessName) {
            schemas.push({
              "@type": "Organization",
              name: schemaData.organization.businessName,
              url: schemaData.organization.website,
              legalName: schemaData.organization.legalName,
              description: schemaData.organization.description,
              logo: schemaData.organization.logoUrl,
              areaServed: schemaData.organization.areaServed,
              expertise: schemaData.organization.expertise,
              brand: schemaData.organization.brandMentions,
              foundingDate: schemaData.organization.foundingDate,
              foundingLocation: schemaData.organization.foundingLocation,
              founder: schemaData.organization.founders,
              numberOfEmployees: schemaData.organization.employeeCount,
              email: schemaData.organization.email,
              telephone: schemaData.organization.phone,
              faxNumber: schemaData.organization.fax,
              vatID: schemaData.organization.vatId,
              taxID: schemaData.organization.taxId,
              naics: schemaData.organization.naics,
              isicV4: schemaData.organization.isicV4,
              slogan: schemaData.organization.slogan,
              award: schemaData.organization.awards,
            });
          }
          break;
        case "localBusiness":
          if (schemaData.localBusiness.phone) {
            schemas.push({
              "@type": "LocalBusiness",
              name: schemaData.localBusiness.businessType,
              image: schemaData.localBusiness.imageUrl,
              url: schemaData.localBusiness.locationUrl,
              email: schemaData.localBusiness.email,
              telephone: schemaData.localBusiness.phone,
              hasOfferCatalog: schemaData.localBusiness.offers,
              address: {
                "@type": "PostalAddress",
                streetAddress: schemaData.localBusiness.streetAddress,
                addressLocality: schemaData.localBusiness.city,
                addressRegion: schemaData.localBusiness.state,
                postalCode: schemaData.localBusiness.postalCode,
                addressCountry: schemaData.localBusiness.country,
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: schemaData.localBusiness.latitude,
                longitude: schemaData.localBusiness.longitude,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: schemaData.localBusiness.ratingValue,
                reviewCount: schemaData.localBusiness.reviewCount,
              },
              openingHours: schemaData.localBusiness.openingHours,
              paymentAccepted: schemaData.localBusiness.paymentMethods,
              priceRange: schemaData.localBusiness.priceRange,
              currenciesAccepted: schemaData.localBusiness.currency,
              areaServed: schemaData.localBusiness.areaServed,
              maximumAttendeeCapacity: schemaData.localBusiness.capacity,
              amenityFeature: schemaData.localBusiness.amenities,
              hasMap: schemaData.localBusiness.mapUrl,
              publicAccess: schemaData.localBusiness.publicAccess,
              smokingAllowed: schemaData.localBusiness.smokingAllowed,
            });
          }
          break;
        case "service":
          if (schemaData.service.serviceName) {
            schemas.push({
              "@type": "Service",
              name: schemaData.service.serviceName,
              description: schemaData.service.description,
              serviceType: schemaData.service.type,
              provider: schemaData.service.provider,
              areaServed: schemaData.service.areaServed,
              offers: {
                "@type": "Offer",
                price: schemaData.service.price,
                url: schemaData.service.url,
              },
              availableChannel: schemaData.service.channels,
              termsOfService: schemaData.service.termsOfService,
            });
          }
          break;
        case "breadcrumb":
          const validItems = schemaData.breadcrumb.items.filter(
            (item) => item.name.trim() && item.url.trim()
          );
          if (validItems.length > 0) {
            schemas.push({
              "@type": "BreadcrumbList",
              itemListElement: validItems.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: item.url,
              })),
            });
          }
          break;

        case "event":
          if (schemaData.event.name) {
            schemas.push({
              "@type": "Event",
              name: schemaData.event.name,
              description: schemaData.event.description,
              startDate: schemaData.event.startDateTime,
              endDate: schemaData.event.endDateTime,
              location: {
                "@type": "Place",
                name: schemaData.event.venue,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: schemaData.event.streetAddress,
                  addressLocality: schemaData.event.city,
                  addressRegion: schemaData.event.state,
                  postalCode: schemaData.event.postalCode,
                  addressCountry: schemaData.event.country,
                },
              },
              performer: schemaData.event.performers,
              organizer: schemaData.event.organizer,
              eventStatus: schemaData.event.status,
              eventAttendanceMode: schemaData.event.attendanceMode,
              offers: {
                "@type": "Offer",
                price: schemaData.event.ticketPrice,
                priceCurrency: schemaData.event.currency,
                availability: schemaData.event.availability,
                validFrom: schemaData.event.validFrom,
              },
            });
          }
          break;
        case "faq":
          const validQuestions = schemaData.faq.questions.filter(
            (q) => q.question.trim() && q.answer.trim()
          );
          if (validQuestions.length > 0) {
            schemas.push({
              "@type": "FAQPage",
              mainEntity: validQuestions.map((q) => ({
                "@type": "Question",
                name: q.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: q.answer,
                },
              })),
            });
          }
          break;
        case "review":
          if (schemaData.review.title && schemaData.review.content) {
            schemas.push({
              "@type": "Review",
              name: schemaData.review.title,
              reviewBody: schemaData.review.content,
              author: {
                "@type": "Person",
                name: schemaData.review.authorName,
              },
              datePublished: schemaData.review.date,
              reviewRating: {
                "@type": "Rating",
                ratingValue: schemaData.review.rating,
              },
              itemReviewed: {
                "@type": schemaData.review.itemType,
                name: schemaData.review.itemName,
              },
              publisher: schemaData.review.publisher,
              url: schemaData.review.reviewUrl,
            });
          }
          break;
      }
    });

    return {
      "@context": "https://schema.org",
      "@graph": schemas,
    };
  };

  const resetForm = () => {
    setSchemaData({
      website: {
        url: "",
        name: "",
        description: "",
        keywords: "",
        language: "",
        copyrightYear: "",
        copyrightHolder: "",
        author: "",
        publisher: "",
      },
      organization: {
        businessName: "",
        website: "",
        legalName: "",
        description: "",
        logoUrl: "",
        areaServed: "",
        expertise: "",
        brandMentions: "",
        foundingDate: "",
        foundingLocation: "",
        founders: "",
        employeeCount: "",
        email: "",
        phone: "",
        fax: "",
        vatId: "",
        taxId: "",
        naics: "",
        isicV4: "",
        slogan: "",
        awards: "",
      },
      localBusiness: {
        businessType: "Local Business (Default)",
        imageUrl: "",
        locationUrl: "",
        email: "",
        phone: "",
        offers: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        latitude: "",
        longitude: "",
        ratingValue: "",
        reviewCount: "",
        locationProfiles: "",
        openingHours: "",
        paymentMethods: "",
        priceRange: "",
        currency: "",
        serviceArea: "",
        areaServed: "",
        capacity: "",
        amenities: "",
        mapUrl: "",
        publicAccess: "",
        smokingAllowed: "",
      },
      service: {
        serviceName: "",
        description: "",
        type: "",
        provider: "",
        areaServed: "",
        price: "",
        url: "",
        channels: "",
        termsOfService: "",
      },
      event: {
        name: "",
        description: "",
        startDateTime: "",
        endDateTime: "",
        venue: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        performers: "",
        organizer: "",
        status: "",
        attendanceMode: "",
        ticketPrice: "",
        currency: "",
        availability: "",
        validFrom: "",
      },
      faq: {
        questions: [
          { question: "", answer: "" },
          { question: "", answer: "" },
          { question: "", answer: "" },
          { question: "", answer: "" },
          { question: "", answer: "" },
        ],
      },
      review: {
        title: "",
        content: "",
        authorName: "",
        date: "",
        rating: "",
        itemType: "Product",
        itemName: "",
        publisher: "",
        reviewUrl: "",
      },
      article: {
        url: "",
        headline: "",
        imageUrl: "",
        description: "",
        authorType: "",
        author: "",
        authorUrl: "",
        publisher: "",
        publisherLogo: "",
        datePublished: "",
        dateModified: "",
      },
      breadcrumb: {
        items: [
          { name: "", url: "" },
          { name: "", url: "" },
        ],
      },
      howTo: {
        name: "",
        totalTime: "",
        estimatedCost: "",
        currency: "",
        description: "",
        imageUrl: "",
        steps: [{ text: "", imageUrl: "", name: "", url: "" }],
        supplies: [],
        tools: [],
      },
      jobPosting: {
        title: "",
        identifier: "",
        description: "",
        company: "",
        companyUrl: "",
        companyLogo: "",
        industry: "",
        employmentType: "",
        workHours: "",
        datePosted: "",
        validThrough: "",
        remoteJob: false,
        country: "",
        state: "",
        street: "",
        city: "",
        postalCode: "",
        salaryMin: "",
        salaryMax: "",
        currency: "",
        salaryUnit: "",
        responsibilities: "",
        skills: "",
        qualifications: "",
        education: "",
        experience: "",
      },
      person: {
        name: "",
        url: "",
        image: "",
        sameAs: [""],
        jobTitle: "",
        worksFor: "",
      },
      product: {
        name: "",
        image: "",
        brand: "",
        sku: "",
        description: "",
        offerType: "",
        url: "",
        priceCurrency: "",
        price: "",
        aggregateRating: "",
        ratingCount: "",
        ratingHigh: "",
        ratingLow: "",
      },
      recipe: {
        name: "",
        keywords: "",
        description: "",
        image: "",
        videoContentUrl: "",
        videoEmbedUrl: "",
        creator: "",
        datePublished: "",
        prepTime: "",
        cookTime: "",
        category: "",
        cuisine: "",
        servings: "",
        nutritionServingSize: "",
        nutritionCalories: "",
        nutritionFat: "",
        ratingValue: "",
        ratingCount: "",
        ratingHigh: "",
        ratingLow: "",
      },
      video: {
        name: "",
        uploadDate: "",
        durationMinutes: "",
        durationSeconds: "",
        description: "",
        thumbnailUrls: [""],
        contentUrl: "",
        embedUrl: "",
        seekToAction: "",
      },
    });

    setSelectedSchemas([]);
    setOpenSections([]);
    toast({
      title: "Form Reset",
      description: "All form data has been cleared.",
    });
  };

  const copySchema = () => {
    const schema = JSON.stringify(generateSchema(), null, 2);
    navigator.clipboard.writeText(schema);
    toast({
      title: "Schema Copied",
      description: "Schema markup has been copied to clipboard.",
    });
  };

  const downloadJSON = () => {
    const schema = JSON.stringify(generateSchema(), null, 2);
    const blob = new Blob([schema], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema-markup.json";
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Schema Downloaded",
      description: "Schema markup JSON file has been downloaded.",
    });
  };
  const updateHowToStep = (index: number, field: string, value: string) => {
    setSchemaData((prev) => {
      const updatedSteps = [...prev.howTo.steps];
      updatedSteps[index][field] = value;
      return {
        ...prev,
        howTo: {
          ...prev.howTo,
          steps: updatedSteps,
        },
      };
    });
  };

  const addHowToStep = () => {
    setSchemaData((prev) => ({
      ...prev,
      howTo: {
        ...prev.howTo,
        steps: [
          ...prev.howTo.steps,
          { text: "", imageUrl: "", name: "", url: "" },
        ],
      },
    }));
  };

  const removeHowToStep = (index: number) => {
    setSchemaData((prev) => ({
      ...prev,
      howTo: {
        ...prev.howTo,
        steps: prev.howTo.steps.filter((_, i) => i !== index),
      },
    }));
  };

  const addSupply = () => {
    setSchemaData((prev) => ({
      ...prev,
      howTo: {
        ...prev.howTo,
        supplies: [...prev.howTo.supplies, { name: "" }],
      },
    }));
  };

  const addTool = () => {
    setSchemaData((prev) => ({
      ...prev,
      howTo: {
        ...prev.howTo,
        tools: [...prev.howTo.tools, { name: "" }],
      },
    }));
  };

  const updateSupply = (index: number, value: string) => {
    setSchemaData((prev) => {
      const updated = [...prev.howTo.supplies];
      updated[index].name = value;
      return {
        ...prev,
        howTo: { ...prev.howTo, supplies: updated },
      };
    });
  };

  const updateTool = (index: number, value: string) => {
    setSchemaData((prev) => {
      const updated = [...prev.howTo.tools];
      updated[index].name = value;
      return {
        ...prev,
        howTo: { ...prev.howTo, tools: updated },
      };
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFB100" }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {/* Free Schema Markup Generator */}
          </h1>

          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {/* Create custom JSON-LD structured data markup for your website. No
            coding required. */}
          </p>
        </div>

        {/* Schema Selection */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Select Schema Types
            </CardTitle>
            <p className="text-gray-600">
              Choose the schema types you want to generate
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schemaTypes.map((schema) => (
                <div
                  key={schema.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedSchemas.includes(schema.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
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
                            <span>
                              {getCompletionPercentage(
                                schema.id as keyof SchemaData
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={getCompletionPercentage(
                              schema.id as keyof SchemaData
                            )}
                            className="h-2"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            {
                              getFieldCount(schema.id as keyof SchemaData)
                                .filled
                            }{" "}
                            /{" "}
                            {getFieldCount(schema.id as keyof SchemaData).total}{" "}
                            fields
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
            <Collapsible
              open={openSections.includes(schemaId)}
              onOpenChange={() => toggleSection(schemaId)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        {schemaTypes.find((s) => s.id === schemaId)?.icon}
                        {schemaTypes.find((s) => s.id === schemaId)?.label}
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="text-sm text-gray-600">
                          {getFieldCount(schemaId as keyof SchemaData).filled} /{" "}
                          {getFieldCount(schemaId as keyof SchemaData).total}{" "}
                          fields completed
                        </div>
                        <div className="text-sm font-semibold text-green-600">
                          {getCompletionPercentage(
                            schemaId as keyof SchemaData
                          )}
                          %
                        </div>
                      </div>
                      <Progress
                        value={getCompletionPercentage(
                          schemaId as keyof SchemaData
                        )}
                        className="h-2 mt-2"
                      />
                    </div>
                    {openSections.includes(schemaId) ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  {/* Website Schema Form */}
                  {schemaId === "website" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="website-url">Website URL *</Label>
                        <Input
                          id="website-url"
                          value={schemaData.website.url}
                          onChange={(e) =>
                            updateSchemaData("website", "url", e.target.value)
                          }
                          placeholder="Enter website url"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-name">Website Name *</Label>
                        <Input
                          id="website-name"
                          value={schemaData.website.name}
                          onChange={(e) =>
                            updateSchemaData("website", "name", e.target.value)
                          }
                          placeholder="Enter website name"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="website-description">
                          Website Description
                        </Label>
                        <Textarea
                          id="website-description"
                          value={schemaData.website.description}
                          onChange={(e) =>
                            updateSchemaData(
                              "website",
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Enter website description"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-keywords">Keywords</Label>
                        <Input
                          id="website-keywords"
                          value={schemaData.website.keywords}
                          onChange={(e) =>
                            updateSchemaData(
                              "website",
                              "keywords",
                              e.target.value
                            )
                          }
                          placeholder="Enter keywords"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-language">Language</Label>
                        <Input
                          id="website-language"
                          value={schemaData.website.language}
                          onChange={(e) =>
                            updateSchemaData(
                              "website",
                              "language",
                              e.target.value
                            )
                          }
                          placeholder="Enter language"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-copyright-year">
                          Copyright Year
                        </Label>
                        <Input
                          id="website-copyright-year"
                          value={schemaData.website.copyrightYear}
                          onChange={(e) =>
                            updateSchemaData(
                              "website",
                              "copyrightYear",
                              e.target.value
                            )
                          }
                          placeholder="Enter copyright year"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-copyright-holder">
                          Copyright Holder
                        </Label>
                        <Input
                          id="website-copyright-holder"
                          value={schemaData.website.copyrightHolder}
                          onChange={(e) =>
                            updateSchemaData(
                              "website",
                              "copyrightHolder",
                              e.target.value
                            )
                          }
                          placeholder="Enter copyright holder"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-author">Author</Label>
                        <Input
                          id="website-author"
                          value={schemaData.website.author}
                          onChange={(e) =>
                            updateSchemaData(
                              "website",
                              "author",
                              e.target.value
                            )
                          }
                          placeholder="Enter author"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website-publisher">Publisher</Label>
                        <Input
                          id="website-publisher"
                          value={schemaData.website.publisher}
                          onChange={(e) =>
                            updateSchemaData(
                              "website",
                              "publisher",
                              e.target.value
                            )
                          }
                          placeholder="Enter publisher"
                        />
                      </div>
                    </div>
                  )}

                  {/* Organization Schema Form */}
                  {schemaId === "organization" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="org-business-name">
                          Business Name *
                        </Label>
                        <Input
                          id="org-business-name"
                          value={schemaData.organization.businessName}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "businessName",
                              e.target.value
                            )
                          }
                          placeholder="Enter business name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-website">
                          Organization Website *
                        </Label>
                        <Input
                          id="org-website"
                          value={schemaData.organization.website}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "website",
                              e.target.value
                            )
                          }
                          placeholder="Enter organization website"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-legal-name">
                          Legal Business Name
                        </Label>
                        <Input
                          id="org-legal-name"
                          value={schemaData.organization.legalName}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "legalName",
                              e.target.value
                            )
                          }
                          placeholder="Enter legal business name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-logo-url">
                          Business Logo URL *
                        </Label>
                        <Input
                          id="org-logo-url"
                          value={schemaData.organization.logoUrl}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "logoUrl",
                              e.target.value
                            )
                          }
                          placeholder="Enter business logo url"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="org-description">
                          Business Description *
                        </Label>
                        <Textarea
                          id="org-description"
                          value={schemaData.organization.description}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Enter business description"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-area-served">Area Served</Label>
                        <Input
                          id="org-area-served"
                          value={schemaData.organization.areaServed}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "areaServed",
                              e.target.value
                            )
                          }
                          placeholder="Enter area served"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-expertise">
                          Areas of Expertise
                        </Label>
                        <Input
                          id="org-expertise"
                          value={schemaData.organization.expertise}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "expertise",
                              e.target.value
                            )
                          }
                          placeholder="Enter areas of expertise"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-brand-mentions">
                          Brand Profiles & Mentions
                        </Label>
                        <Input
                          id="org-brand-mentions"
                          value={schemaData.organization.brandMentions}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "brandMentions",
                              e.target.value
                            )
                          }
                          placeholder="Enter brand profiles & mentions"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-founding-date">Founding Date</Label>
                        <Input
                          id="org-founding-date"
                          type="date"
                          value={schemaData.organization.foundingDate}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "foundingDate",
                              e.target.value
                            )
                          }
                          placeholder="dd-mm-yyyy"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-founding-location">
                          Founding Location
                        </Label>
                        <Input
                          id="org-founding-location"
                          value={schemaData.organization.foundingLocation}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "foundingLocation",
                              e.target.value
                            )
                          }
                          placeholder="Enter founding location"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-founders">Founders</Label>
                        <Input
                          id="org-founders"
                          value={schemaData.organization.founders}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "founders",
                              e.target.value
                            )
                          }
                          placeholder="Enter founders"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-employee-count">
                          Number of Employees
                        </Label>
                        <Input
                          id="org-employee-count"
                          value={schemaData.organization.employeeCount}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "employeeCount",
                              e.target.value
                            )
                          }
                          placeholder="Enter number of employees"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-email">Email</Label>
                        <Input
                          id="org-email"
                          type="email"
                          value={schemaData.organization.email}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "email",
                              e.target.value
                            )
                          }
                          placeholder="Enter email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-phone">Phone</Label>
                        <Input
                          id="org-phone"
                          value={schemaData.organization.phone}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "phone",
                              e.target.value
                            )
                          }
                          placeholder="Enter phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-fax">Fax</Label>
                        <Input
                          id="org-fax"
                          value={schemaData.organization.fax}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "fax",
                              e.target.value
                            )
                          }
                          placeholder="Enter fax"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-vat-id">VAT ID</Label>
                        <Input
                          id="org-vat-id"
                          value={schemaData.organization.vatId}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "vatId",
                              e.target.value
                            )
                          }
                          placeholder="Enter vat id"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-tax-id">Tax ID</Label>
                        <Input
                          id="org-tax-id"
                          value={schemaData.organization.taxId}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "taxId",
                              e.target.value
                            )
                          }
                          placeholder="Enter tax id"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-naics">NAICS Code</Label>
                        <Input
                          id="org-naics"
                          value={schemaData.organization.naics}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "naics",
                              e.target.value
                            )
                          }
                          placeholder="Enter naics code"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-isic">ISIC V4 Code</Label>
                        <Input
                          id="org-isic"
                          value={schemaData.organization.isicV4}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "isicV4",
                              e.target.value
                            )
                          }
                          placeholder="Enter isic v4 code"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-slogan">Slogan</Label>
                        <Input
                          id="org-slogan"
                          value={schemaData.organization.slogan}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "slogan",
                              e.target.value
                            )
                          }
                          placeholder="Enter slogan"
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-awards">Awards</Label>
                        <Input
                          id="org-awards"
                          value={schemaData.organization.awards}
                          onChange={(e) =>
                            updateSchemaData(
                              "organization",
                              "awards",
                              e.target.value
                            )
                          }
                          placeholder="Enter awards"
                        />
                      </div>
                    </div>
                  )}

                  {/* Local Business Schema Form */}
                  {schemaId === "localBusiness" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="local-business-type">
                          Business Type *
                        </Label>
                        <Select
                          value={schemaData.localBusiness.businessType}
                          onValueChange={(value) =>
                            updateSchemaData(
                              "localBusiness",
                              "businessType",
                              value
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Local Business (Default)">
                              Local Business (Default)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="local-image-url">
                          Business Image URL *
                        </Label>
                        <Input
                          id="local-image-url"
                          value={schemaData.localBusiness.imageUrl}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "imageUrl",
                              e.target.value
                            )
                          }
                          placeholder="Enter business image url"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-location-url">
                          Location Page URL
                        </Label>
                        <Input
                          id="local-location-url"
                          value={schemaData.localBusiness.locationUrl}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "locationUrl",
                              e.target.value
                            )
                          }
                          placeholder="Enter location page url"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-email">Business Email</Label>
                        <Input
                          id="local-email"
                          type="email"
                          value={schemaData.localBusiness.email}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "email",
                              e.target.value
                            )
                          }
                          placeholder="Enter business email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-phone">Business Phone *</Label>
                        <Input
                          id="local-phone"
                          value={schemaData.localBusiness.phone}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "phone",
                              e.target.value
                            )
                          }
                          placeholder="Enter business phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-offers">Special Offers</Label>
                        <Input
                          id="local-offers"
                          value={schemaData.localBusiness.offers}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "offers",
                              e.target.value
                            )
                          }
                          placeholder="Enter special offers"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-street-address">
                          Street Address *
                        </Label>
                        <Input
                          id="local-street-address"
                          value={schemaData.localBusiness.streetAddress}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "streetAddress",
                              e.target.value
                            )
                          }
                          placeholder="Enter street address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-city">City *</Label>
                        <Input
                          id="local-city"
                          value={schemaData.localBusiness.city}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "city",
                              e.target.value
                            )
                          }
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-state">State/Region *</Label>
                        <Input
                          id="local-state"
                          value={schemaData.localBusiness.state}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "state",
                              e.target.value
                            )
                          }
                          placeholder="Enter state/region"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-postal-code">Postal Code *</Label>
                        <Input
                          id="local-postal-code"
                          value={schemaData.localBusiness.postalCode}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "postalCode",
                              e.target.value
                            )
                          }
                          placeholder="Enter postal code"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-country">Country *</Label>
                        <Input
                          id="local-country"
                          value={schemaData.localBusiness.country}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "country",
                              e.target.value
                            )
                          }
                          placeholder="Enter country"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-latitude">Latitude *</Label>
                        <Input
                          id="local-latitude"
                          value={schemaData.localBusiness.latitude}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "latitude",
                              e.target.value
                            )
                          }
                          placeholder="Enter latitude"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-longitude">Longitude *</Label>
                        <Input
                          id="local-longitude"
                          value={schemaData.localBusiness.longitude}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "longitude",
                              e.target.value
                            )
                          }
                          placeholder="Enter longitude"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-rating-value">Rating Value</Label>
                        <Input
                          id="local-rating-value"
                          value={schemaData.localBusiness.ratingValue}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "ratingValue",
                              e.target.value
                            )
                          }
                          placeholder="Enter rating value"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-review-count">Review Count</Label>
                        <Input
                          id="local-review-count"
                          value={schemaData.localBusiness.reviewCount}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "reviewCount",
                              e.target.value
                            )
                          }
                          placeholder="Enter review count"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-location-profiles">
                          Location Profiles
                        </Label>
                        <Input
                          id="local-location-profiles"
                          value={schemaData.localBusiness.locationProfiles}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "locationProfiles",
                              e.target.value
                            )
                          }
                          placeholder="Enter location profiles"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-opening-hours">
                          Opening Hours
                        </Label>
                        <Input
                          id="local-opening-hours"
                          value={schemaData.localBusiness.openingHours}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "openingHours",
                              e.target.value
                            )
                          }
                          placeholder="Enter opening hours"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-payment-methods">
                          Payment Methods
                        </Label>
                        <Input
                          id="local-payment-methods"
                          value={schemaData.localBusiness.paymentMethods}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "paymentMethods",
                              e.target.value
                            )
                          }
                          placeholder="Enter payment methods"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-price-range">Price Range</Label>
                        <Input
                          id="local-price-range"
                          value={schemaData.localBusiness.priceRange}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "priceRange",
                              e.target.value
                            )
                          }
                          placeholder="Enter price range"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-currency">
                          Currencies Accepted
                        </Label>
                        <Input
                          id="local-currency"
                          value={schemaData.localBusiness.currency}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "currency",
                              e.target.value
                            )
                          }
                          placeholder="Enter currencies accepted"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-service-area">Service Area</Label>
                        <Input
                          id="local-service-area"
                          value={schemaData.localBusiness.serviceArea}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "serviceArea",
                              e.target.value
                            )
                          }
                          placeholder="Enter service area"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-area-served">Area Served</Label>
                        <Input
                          id="local-area-served"
                          value={schemaData.localBusiness.areaServed}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "areaServed",
                              e.target.value
                            )
                          }
                          placeholder="Enter area served"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-capacity">Maximum Capacity</Label>
                        <Input
                          id="local-capacity"
                          value={schemaData.localBusiness.capacity}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "capacity",
                              e.target.value
                            )
                          }
                          placeholder="Enter maximum capacity"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-amenities">Amenities</Label>
                        <Input
                          id="local-amenities"
                          value={schemaData.localBusiness.amenities}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "amenities",
                              e.target.value
                            )
                          }
                          placeholder="Enter amenities"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-map-url">Map URL</Label>
                        <Input
                          id="local-map-url"
                          value={schemaData.localBusiness.mapUrl}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "mapUrl",
                              e.target.value
                            )
                          }
                          placeholder="Enter map url"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-public-access">
                          Public Access
                        </Label>
                        <Input
                          id="local-public-access"
                          value={schemaData.localBusiness.publicAccess}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "publicAccess",
                              e.target.value
                            )
                          }
                          placeholder="Enter public access"
                        />
                      </div>
                      <div>
                        <Label htmlFor="local-smoking-allowed">
                          Smoking Allowed
                        </Label>
                        <Input
                          id="local-smoking-allowed"
                          value={schemaData.localBusiness.smokingAllowed}
                          onChange={(e) =>
                            updateSchemaData(
                              "localBusiness",
                              "smokingAllowed",
                              e.target.value
                            )
                          }
                          placeholder="Enter smoking allowed"
                        />
                      </div>
                    </div>
                  )}

                  {/* Service Schema Form */}
                  {schemaId === "service" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="service-name">Service Name *</Label>
                        <Input
                          id="service-name"
                          value={schemaData.service.serviceName}
                          onChange={(e) =>
                            updateSchemaData(
                              "service",
                              "serviceName",
                              e.target.value
                            )
                          }
                          placeholder="Enter service name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service-type">Service Type</Label>
                        <Input
                          id="service-type"
                          value={schemaData.service.type}
                          onChange={(e) =>
                            updateSchemaData("service", "type", e.target.value)
                          }
                          placeholder="Enter service type"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="service-description">
                          Service Description *
                        </Label>
                        <Textarea
                          id="service-description"
                          value={schemaData.service.description}
                          onChange={(e) =>
                            updateSchemaData(
                              "service",
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Enter service description"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service-provider">
                          Service Provider
                        </Label>
                        <Input
                          id="service-provider"
                          value={schemaData.service.provider}
                          onChange={(e) =>
                            updateSchemaData(
                              "service",
                              "provider",
                              e.target.value
                            )
                          }
                          placeholder="Enter service provider"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service-area-served">Area Served</Label>
                        <Input
                          id="service-area-served"
                          value={schemaData.service.areaServed}
                          onChange={(e) =>
                            updateSchemaData(
                              "service",
                              "areaServed",
                              e.target.value
                            )
                          }
                          placeholder="Enter area served"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service-price">Price Offer</Label>
                        <Input
                          id="service-price"
                          value={schemaData.service.price}
                          onChange={(e) =>
                            updateSchemaData("service", "price", e.target.value)
                          }
                          placeholder="Enter price offer"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service-url">Service URL</Label>
                        <Input
                          id="service-url"
                          value={schemaData.service.url}
                          onChange={(e) =>
                            updateSchemaData("service", "url", e.target.value)
                          }
                          placeholder="Enter service url"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service-channels">
                          Available Channels
                        </Label>
                        <Input
                          id="service-channels"
                          value={schemaData.service.channels}
                          onChange={(e) =>
                            updateSchemaData(
                              "service",
                              "channels",
                              e.target.value
                            )
                          }
                          placeholder="Enter available channels"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service-terms">
                          Terms of Service URL
                        </Label>
                        <Input
                          id="service-terms"
                          value={schemaData.service.termsOfService}
                          onChange={(e) =>
                            updateSchemaData(
                              "service",
                              "termsOfService",
                              e.target.value
                            )
                          }
                          placeholder="Enter terms of service url"
                        />
                      </div>
                    </div>
                  )}

                  {/* Event Schema Form */}
                  {schemaId === "event" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="event-name">Event Name *</Label>
                        <Input
                          id="event-name"
                          value={schemaData.event.name}
                          onChange={(e) =>
                            updateSchemaData("event", "name", e.target.value)
                          }
                          placeholder="Enter event name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-venue">Venue Name *</Label>
                        <Input
                          id="event-venue"
                          value={schemaData.event.venue}
                          onChange={(e) =>
                            updateSchemaData("event", "venue", e.target.value)
                          }
                          placeholder="Enter venue name"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="event-description">
                          Event Description *
                        </Label>
                        <Textarea
                          id="event-description"
                          value={schemaData.event.description}
                          onChange={(e) =>
                            updateSchemaData(
                              "event",
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Enter event description"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-start-date">
                          Start Date & Time *
                        </Label>
                        <Input
                          id="event-start-date"
                          type="datetime-local"
                          value={schemaData.event.startDateTime}
                          onChange={(e) =>
                            updateSchemaData(
                              "event",
                              "startDateTime",
                              e.target.value
                            )
                          }
                          placeholder="Enter start date & time"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-end-date">
                          End Date & Time *
                        </Label>
                        <Input
                          id="event-end-date"
                          type="datetime-local"
                          value={schemaData.event.endDateTime}
                          onChange={(e) =>
                            updateSchemaData(
                              "event",
                              "endDateTime",
                              e.target.value
                            )
                          }
                          placeholder="Enter end date & time"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-street-address">
                          Street Address *
                        </Label>
                        <Input
                          id="event-street-address"
                          value={schemaData.event.streetAddress}
                          onChange={(e) =>
                            updateSchemaData(
                              "event",
                              "streetAddress",
                              e.target.value
                            )
                          }
                          placeholder="Enter street address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-city">City *</Label>
                        <Input
                          id="event-city"
                          value={schemaData.event.city}
                          onChange={(e) =>
                            updateSchemaData("event", "city", e.target.value)
                          }
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-state">State/Region *</Label>
                        <Input
                          id="event-state"
                          value={schemaData.event.state}
                          onChange={(e) =>
                            updateSchemaData("event", "state", e.target.value)
                          }
                          placeholder="Enter state/region"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-postal-code">Postal Code *</Label>
                        <Input
                          id="event-postal-code"
                          value={schemaData.event.postalCode}
                          onChange={(e) =>
                            updateSchemaData(
                              "event",
                              "postalCode",
                              e.target.value
                            )
                          }
                          placeholder="Enter postal code"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-country">Country *</Label>
                        <Input
                          id="event-country"
                          value={schemaData.event.country}
                          onChange={(e) =>
                            updateSchemaData("event", "country", e.target.value)
                          }
                          placeholder="Enter country"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-performers">Performer(s)</Label>
                        <Input
                          id="event-performers"
                          value={schemaData.event.performers}
                          onChange={(e) =>
                            updateSchemaData(
                              "event",
                              "performers",
                              e.target.value
                            )
                          }
                          placeholder="Enter performer(s)"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-organizer">Organizer</Label>
                        <Input
                          id="event-organizer"
                          value={schemaData.event.organizer}
                          onChange={(e) =>
                            updateSchemaData(
                              "event",
                              "organizer",
                              e.target.value
                            )
                          }
                          placeholder="Enter organizer"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-status">Event Status</Label>
                        <Input
                          id="event-status"
                          value={schemaData.event.status}
                          onChange={(e) =>
                            updateSchemaData("event", "status", e.target.value)
                          }
                          placeholder="Enter event status"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-attendance-mode">
                          Attendance Mode
                        </Label>
                        <Input
                          id="event-attendance-mode"
                          value={schemaData.event.attendanceMode}
                          onChange={(e) =>
                            updateSchemaData(
                              "event",
                              "attendanceMode",
                              e.target.value
                            )
                          }
                          placeholder="Enter attendance mode"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-ticket-price">Ticket Price</Label>
                        <Input
                          id="event-ticket-price"
                          value={schemaData.event.ticketPrice}
                          onChange={(e) =>
                            updateSchemaData(
                              "event",
                              "ticketPrice",
                              e.target.value
                            )
                          }
                          placeholder="Enter ticket price"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-currency">Price Currency</Label>
                        <Input
                          id="event-currency"
                          value={schemaData.event.currency}
                          onChange={(e) =>
                            updateSchemaData(
                              "event",
                              "currency",
                              e.target.value
                            )
                          }
                          placeholder="Enter price currency"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-availability">
                          Ticket Availability
                        </Label>
                        <Input
                          id="event-availability"
                          value={schemaData.event.availability}
                          onChange={(e) =>
                            updateSchemaData(
                              "event",
                              "availability",
                              e.target.value
                            )
                          }
                          placeholder="Enter ticket availability"
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-valid-from">
                          Tickets Valid From
                        </Label>
                        <Input
                          id="event-valid-from"
                          type="date"
                          value={schemaData.event.validFrom}
                          onChange={(e) =>
                            updateSchemaData(
                              "event",
                              "validFrom",
                              e.target.value
                            )
                          }
                          placeholder="Enter tickets valid from"
                        />
                      </div>
                    </div>
                  )}

                  {/* FAQ Schema Form */}
                  {schemaId === "faq" && (
                    <div className="space-y-4">
                      {schemaData.faq.questions.map((faq, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <Label htmlFor={`faq-question-${index}`}>
                                Question {index + 1}
                                {index === 0 ? " *" : ""}
                              </Label>
                              <Input
                                id={`faq-question-${index}`}
                                value={faq.question}
                                onChange={(e) =>
                                  updateFAQQuestion(
                                    index,
                                    "question",
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  index === 0
                                    ? "Enter question 1"
                                    : index === 1
                                    ? "Enter question 2"
                                    : index === 2
                                    ? "Enter question 3"
                                    : index === 3
                                    ? "Enter question 4"
                                    : "Enter question 5"
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor={`faq-answer-${index}`}>
                                Answer {index + 1}
                                {index === 0 ? " *" : ""}
                              </Label>
                              <Textarea
                                id={`faq-answer-${index}`}
                                value={faq.answer}
                                onChange={(e) =>
                                  updateFAQQuestion(
                                    index,
                                    "answer",
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  index === 0
                                    ? "Enter answer 1"
                                    : index === 1
                                    ? "Enter answer to second question"
                                    : index === 2
                                    ? "Enter answer to third question"
                                    : index === 3
                                    ? "Enter answer to fourth question"
                                    : "Enter answer to fifth question"
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Review Schema Form */}
                  {schemaId === "review" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="review-title">Review Title *</Label>
                        <Input
                          id="review-title"
                          value={schemaData.review.title}
                          onChange={(e) =>
                            updateSchemaData("review", "title", e.target.value)
                          }
                          placeholder="Enter review title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="review-author">Author Name *</Label>
                        <Input
                          id="review-author"
                          value={schemaData.review.authorName}
                          onChange={(e) =>
                            updateSchemaData(
                              "review",
                              "authorName",
                              e.target.value
                            )
                          }
                          placeholder="Enter author name"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="review-content">Review Content *</Label>
                        <Textarea
                          id="review-content"
                          value={schemaData.review.content}
                          onChange={(e) =>
                            updateSchemaData(
                              "review",
                              "content",
                              e.target.value
                            )
                          }
                          placeholder="Enter review content"
                        />
                      </div>
                      <div>
                        <Label htmlFor="review-date">Publication Date *</Label>
                        <Input
                          id="review-date"
                          type="date"
                          value={schemaData.review.date}
                          onChange={(e) =>
                            updateSchemaData("review", "date", e.target.value)
                          }
                          placeholder="dd-mm-yyyy"
                        />
                      </div>
                      <div>
                        <Label htmlFor="review-rating">Rating Value *</Label>
                        <Input
                          id="review-rating"
                          value={schemaData.review.rating}
                          onChange={(e) =>
                            updateSchemaData("review", "rating", e.target.value)
                          }
                          placeholder="Enter rating value"
                        />
                      </div>
                      <div>
                        <Label htmlFor="review-item-type">
                          Type of Item Being Reviewed *
                        </Label>
                        <Select
                          value={schemaData.review.itemType}
                          onValueChange={(value) =>
                            updateSchemaData("review", "itemType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select item type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Product">Product</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="review-item-name">
                          Item Being Reviewed *
                        </Label>
                        <Input
                          id="review-item-name"
                          value={schemaData.review.itemName}
                          onChange={(e) =>
                            updateSchemaData(
                              "review",
                              "itemName",
                              e.target.value
                            )
                          }
                          placeholder="Enter item being reviewed"
                        />
                      </div>
                      <div>
                        <Label htmlFor="review-publisher">Publisher Name</Label>
                        <Input
                          id="review-publisher"
                          value={schemaData.review.publisher}
                          onChange={(e) =>
                            updateSchemaData(
                              "review",
                              "publisher",
                              e.target.value
                            )
                          }
                          placeholder="Enter publisher name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="review-url">Review URL</Label>
                        <Input
                          id="review-url"
                          value={schemaData.review.reviewUrl}
                          onChange={(e) =>
                            updateSchemaData(
                              "review",
                              "reviewUrl",
                              e.target.value
                            )
                          }
                          placeholder="Enter review url"
                        />
                      </div>
                    </div>
                  )}
                  {schemaId === "article" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="article-url">Article URL *</Label>
                        <Input
                          id="article-url"
                          value={schemaData.article.url}
                          onChange={(e) =>
                            updateSchemaData("article", "url", e.target.value)
                          }
                          placeholder="Enter article URL"
                        />
                      </div>
                      <div>
                        <Label htmlFor="article-headline">Headline *</Label>
                        <Input
                          id="article-headline"
                          value={schemaData.article.headline}
                          onChange={(e) =>
                            updateSchemaData(
                              "article",
                              "headline",
                              e.target.value
                            )
                          }
                          placeholder="Enter headline (max 110 chars)"
                        />
                      </div>
                      <div>
                        <Label htmlFor="article-image-url">Image URL</Label>
                        <Input
                          id="article-image-url"
                          value={schemaData.article.imageUrl}
                          onChange={(e) =>
                            updateSchemaData(
                              "article",
                              "imageUrl",
                              e.target.value
                            )
                          }
                          placeholder="Enter image URL"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="article-description">
                          Short Description
                        </Label>
                        <Textarea
                          id="article-description"
                          value={schemaData.article.description}
                          onChange={(e) =>
                            updateSchemaData(
                              "article",
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Enter short description"
                        />
                      </div>
                      <div>
                        <Label htmlFor="article-author-type">
                          Author @type
                        </Label>
                        <Input
                          id="article-author-type"
                          value={schemaData.article.authorType}
                          onChange={(e) =>
                            updateSchemaData(
                              "article",
                              "authorType",
                              e.target.value
                            )
                          }
                          placeholder="e.g. Person or Organization"
                        />
                      </div>
                      <div>
                        <Label htmlFor="article-author">Author Name</Label>
                        <Input
                          id="article-author"
                          value={schemaData.article.author}
                          onChange={(e) =>
                            updateSchemaData(
                              "article",
                              "author",
                              e.target.value
                            )
                          }
                          placeholder="Enter author name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="article-author-url">Author URL</Label>
                        <Input
                          id="article-author-url"
                          value={schemaData.article.authorUrl}
                          onChange={(e) =>
                            updateSchemaData(
                              "article",
                              "authorUrl",
                              e.target.value
                            )
                          }
                          placeholder="Enter author URL"
                        />
                      </div>
                      <div>
                        <Label htmlFor="article-publisher">Publisher</Label>
                        <Input
                          id="article-publisher"
                          value={schemaData.article.publisher}
                          onChange={(e) =>
                            updateSchemaData(
                              "article",
                              "publisher",
                              e.target.value
                            )
                          }
                          placeholder="Enter publisher"
                        />
                      </div>
                      <div>
                        <Label htmlFor="article-publisher-logo">
                          Publisher Logo URL
                        </Label>
                        <Input
                          id="article-publisher-logo"
                          value={schemaData.article.publisherLogo}
                          onChange={(e) =>
                            updateSchemaData(
                              "article",
                              "publisherLogo",
                              e.target.value
                            )
                          }
                          placeholder="Enter publisher logo URL"
                        />
                      </div>
                      <div>
                        <Label htmlFor="article-date-published">
                          Date Published
                        </Label>
                        <Input
                          type="date"
                          id="article-date-published"
                          value={schemaData.article.datePublished}
                          onChange={(e) =>
                            updateSchemaData(
                              "article",
                              "datePublished",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="article-date-modified">
                          Date Modified
                        </Label>
                        <Input
                          type="date"
                          id="article-date-modified"
                          value={schemaData.article.dateModified}
                          onChange={(e) =>
                            updateSchemaData(
                              "article",
                              "dateModified",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                  {schemaId === "breadcrumb" && (
                    <div className="space-y-4">
                      {schemaData.breadcrumb.items.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end border rounded-lg p-4"
                        >
                          <div>
                            <Label htmlFor={`breadcrumb-name-${index}`}>
                              Page {index + 1}'s Name
                            </Label>
                            <Input
                              id={`breadcrumb-name-${index}`}
                              value={item.name}
                              onChange={(e) =>
                                updateBreadcrumbItem(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder={`Enter Page ${index + 1} Name`}
                            />
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <Label htmlFor={`breadcrumb-url-${index}`}>
                                URL #{index + 1}
                              </Label>
                              <Input
                                id={`breadcrumb-url-${index}`}
                                value={item.url}
                                onChange={(e) =>
                                  updateBreadcrumbItem(
                                    index,
                                    "url",
                                    e.target.value
                                  )
                                }
                                placeholder={`Enter URL for Page ${index + 1}`}
                              />
                            </div>
                            {index > 1 && (
                              <Button
                                variant="ghost"
                                onClick={() => removeBreadcrumbItem(index)}
                                className="text-red-600"
                                title="Remove"
                              >
                                <Trash2 />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      <Button
                        onClick={addBreadcrumbItem}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" /> Add More Links
                      </Button>
                    </div>
                  )}
                  {schemaId === "howTo" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="howto-name">Name *</Label>
                          <Input
                            id="howto-name"
                            value={schemaData.howTo.name}
                            onChange={(e) =>
                              updateSchemaData("howTo", "name", e.target.value)
                            }
                            placeholder="Enter name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="howto-totalTime">Total Time *</Label>
                          <Input
                            id="howto-totalTime"
                            value={schemaData.howTo.totalTime}
                            onChange={(e) =>
                              updateSchemaData(
                                "howTo",
                                "totalTime",
                                e.target.value
                              )
                            }
                            placeholder="e.g. PT1H30M"
                          />
                        </div>
                        <div>
                          <Label htmlFor="howto-cost">Estimated Cost</Label>
                          <Input
                            id="howto-cost"
                            value={schemaData.howTo.estimatedCost}
                            onChange={(e) =>
                              updateSchemaData(
                                "howTo",
                                "estimatedCost",
                                e.target.value
                              )
                            }
                            placeholder="Enter cost"
                          />
                        </div>
                        <div>
                          <Label htmlFor="howto-currency">Currency</Label>
                          <Input
                            id="howto-currency"
                            value={schemaData.howTo.currency}
                            onChange={(e) =>
                              updateSchemaData(
                                "howTo",
                                "currency",
                                e.target.value
                              )
                            }
                            placeholder="e.g. USD"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="howto-description">Description</Label>
                          <Textarea
                            id="howto-description"
                            value={schemaData.howTo.description}
                            onChange={(e) =>
                              updateSchemaData(
                                "howTo",
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Describe the how-to process"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="howto-image">Image URL</Label>
                          <Input
                            id="howto-image"
                            value={schemaData.howTo.imageUrl}
                            onChange={(e) =>
                              updateSchemaData(
                                "howTo",
                                "imageUrl",
                                e.target.value
                              )
                            }
                            placeholder="Main image for how-to"
                          />
                        </div>
                      </div>

                      {/* SUPPLIES & TOOLS */}
                      <div className="flex gap-4">
                        <Button onClick={addSupply}>+ Add Supply</Button>
                        <Button onClick={addTool}>+ Add Tool</Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {schemaData.howTo.supplies.map((s, i) => (
                          <Input
                            key={i}
                            placeholder={`Supply ${i + 1}`}
                            value={s.name}
                            onChange={(e) => updateSupply(i, e.target.value)}
                          />
                        ))}
                        {schemaData.howTo.tools.map((t, i) => (
                          <Input
                            key={i}
                            placeholder={`Tool ${i + 1}`}
                            value={t.name}
                            onChange={(e) => updateTool(i, e.target.value)}
                          />
                        ))}
                      </div>

                      {/* STEPS */}
                      <div className="space-y-4">
                        {schemaData.howTo.steps.map((step, index) => (
                          <div
                            key={index}
                            className="border p-4 rounded-md space-y-2"
                          >
                            <Label>Step #{index + 1}: Instructions</Label>
                            <Textarea
                              value={step.text}
                              onChange={(e) =>
                                updateHowToStep(index, "text", e.target.value)
                              }
                              placeholder="Instruction text"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Input
                                placeholder="Image URL"
                                value={step.imageUrl}
                                onChange={(e) =>
                                  updateHowToStep(
                                    index,
                                    "imageUrl",
                                    e.target.value
                                  )
                                }
                              />
                              <Input
                                placeholder="Name"
                                value={step.name}
                                onChange={(e) =>
                                  updateHowToStep(index, "name", e.target.value)
                                }
                              />
                              <Input
                                placeholder="URL"
                                value={step.url}
                                onChange={(e) =>
                                  updateHowToStep(index, "url", e.target.value)
                                }
                              />
                            </div>
                            {index > 0 && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeHowToStep(index)}
                              >
                                Remove Step
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button onClick={addHowToStep}>+ Add Step</Button>
                      </div>
                    </div>
                  )}
                  {schemaId === "jobPosting" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Job's Title"
                        value={schemaData.jobPosting.title}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "title",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Identifier"
                        value={schemaData.jobPosting.identifier}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "identifier",
                            e.target.value
                          )
                        }
                      />
                      <Textarea
                        placeholder="Job Description (HTML supported)"
                        className="md:col-span-2"
                        value={schemaData.jobPosting.description}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "description",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Company Name"
                        value={schemaData.jobPosting.company}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "company",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Company URL"
                        value={schemaData.jobPosting.companyUrl}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "companyUrl",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Company Logo URL"
                        value={schemaData.jobPosting.companyLogo}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "companyLogo",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Industry"
                        value={schemaData.jobPosting.industry}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "industry",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Employment Type"
                        value={schemaData.jobPosting.employmentType}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "employmentType",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Work Hours"
                        value={schemaData.jobPosting.workHours}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "workHours",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        type="date"
                        placeholder="Date Posted"
                        value={schemaData.jobPosting.datePosted}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "datePosted",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        type="date"
                        placeholder="Expire Date"
                        value={schemaData.jobPosting.validThrough}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "validThrough",
                            e.target.value
                          )
                        }
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="remoteJob"
                          checked={schemaData.jobPosting.remoteJob}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateSchemaData(
                              "jobPosting",
                              "remoteJob",
                              e.target.checked
                            )
                          }
                        />
                        <Label htmlFor="remoteJob">Remote Job</Label>
                      </div>
                      <Input
                        placeholder="Country"
                        value={schemaData.jobPosting.country}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "country",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="State/Province/Region"
                        value={schemaData.jobPosting.state}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "state",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Street"
                        value={schemaData.jobPosting.street}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "street",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="City"
                        value={schemaData.jobPosting.city}
                        onChange={(e) =>
                          updateSchemaData("jobPosting", "city", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Zip Code"
                        value={schemaData.jobPosting.postalCode}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "postalCode",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Salary Min"
                        value={schemaData.jobPosting.salaryMin}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "salaryMin",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Salary Max"
                        value={schemaData.jobPosting.salaryMax}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "salaryMax",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Currency"
                        value={schemaData.jobPosting.currency}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "currency",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Per... (e.g. hour, month)"
                        value={schemaData.jobPosting.salaryUnit}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "salaryUnit",
                            e.target.value
                          )
                        }
                      />
                      <Textarea
                        placeholder="Responsibilities"
                        className="md:col-span-2"
                        value={schemaData.jobPosting.responsibilities}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "responsibilities",
                            e.target.value
                          )
                        }
                      />
                      <Textarea
                        placeholder="Skills"
                        className="md:col-span-2"
                        value={schemaData.jobPosting.skills}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "skills",
                            e.target.value
                          )
                        }
                      />
                      <Textarea
                        placeholder="Qualifications"
                        className="md:col-span-2"
                        value={schemaData.jobPosting.qualifications}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "qualifications",
                            e.target.value
                          )
                        }
                      />
                      <Textarea
                        placeholder="Education Requirements"
                        className="md:col-span-2"
                        value={schemaData.jobPosting.education}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "education",
                            e.target.value
                          )
                        }
                      />
                      <Textarea
                        placeholder="Experience Requirements"
                        className="md:col-span-2"
                        value={schemaData.jobPosting.experience}
                        onChange={(e) =>
                          updateSchemaData(
                            "jobPosting",
                            "experience",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                  {/* PERSON SCHEMA */}
                  {schemaId === "person" && (
                    <div className="space-y-4">
                      <Input
                        placeholder="Name"
                        value={schemaData.person.name}
                        onChange={(e) =>
                          updateSchemaData("person", "name", e.target.value)
                        }
                      />
                      <Input
                        placeholder="URL"
                        value={schemaData.person.url}
                        onChange={(e) =>
                          updateSchemaData("person", "url", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Image URL"
                        value={schemaData.person.image}
                        onChange={(e) =>
                          updateSchemaData("person", "image", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Job Title"
                        value={schemaData.person.jobTitle}
                        onChange={(e) =>
                          updateSchemaData("person", "jobTitle", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Company"
                        value={schemaData.person.worksFor}
                        onChange={(e) =>
                          updateSchemaData("person", "worksFor", e.target.value)
                        }
                      />
                      <Label>Social Profiles</Label>
                      {schemaData.person.sameAs.map((url, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder={`Social URL #${index + 1}`}
                            value={url}
                            onChange={(e) => {
                              const updated = [...schemaData.person.sameAs];
                              updated[index] = e.target.value;
                              updateSchemaData("person", "sameAs", updated);
                            }}
                          />
                          {index > 0 && (
                            <Button
                              variant="ghost"
                              onClick={() => {
                                const updated = schemaData.person.sameAs.filter(
                                  (_, i) => i !== index
                                );
                                updateSchemaData("person", "sameAs", updated);
                              }}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        onClick={() =>
                          updateSchemaData("person", "sameAs", [
                            ...schemaData.person.sameAs,
                            "",
                          ])
                        }
                      >
                        + Add Social Profile
                      </Button>
                    </div>
                  )}

                  {/* PRODUCT SCHEMA */}
                  {schemaId === "product" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Product Name"
                        value={schemaData.product.name}
                        onChange={(e) =>
                          updateSchemaData("product", "name", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Image URL"
                        value={schemaData.product.image}
                        onChange={(e) =>
                          updateSchemaData("product", "image", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Brand"
                        value={schemaData.product.brand}
                        onChange={(e) =>
                          updateSchemaData("product", "brand", e.target.value)
                        }
                      />
                      <Input
                        placeholder="SKU"
                        value={schemaData.product.sku}
                        onChange={(e) =>
                          updateSchemaData("product", "sku", e.target.value)
                        }
                      />
                      <Textarea
                        placeholder="Product Description"
                        className="md:col-span-2"
                        value={schemaData.product.description}
                        onChange={(e) =>
                          updateSchemaData(
                            "product",
                            "description",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Offer Type (e.g. Offer)"
                        value={schemaData.product.offerType}
                        onChange={(e) =>
                          updateSchemaData(
                            "product",
                            "offerType",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Offer URL"
                        value={schemaData.product.url}
                        onChange={(e) =>
                          updateSchemaData("product", "url", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Currency (e.g. USD)"
                        value={schemaData.product.priceCurrency}
                        onChange={(e) =>
                          updateSchemaData(
                            "product",
                            "priceCurrency",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Price"
                        value={schemaData.product.price}
                        onChange={(e) =>
                          updateSchemaData("product", "price", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Rating Value"
                        value={schemaData.product.aggregateRating}
                        onChange={(e) =>
                          updateSchemaData(
                            "product",
                            "aggregateRating",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Rating Count"
                        value={schemaData.product.ratingCount}
                        onChange={(e) =>
                          updateSchemaData(
                            "product",
                            "ratingCount",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Highest Rating"
                        value={schemaData.product.ratingHigh}
                        onChange={(e) =>
                          updateSchemaData(
                            "product",
                            "ratingHigh",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Lowest Rating"
                        value={schemaData.product.ratingLow}
                        onChange={(e) =>
                          updateSchemaData(
                            "product",
                            "ratingLow",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}

                  {/* RECIPE SCHEMA */}
                  {schemaId === "recipe" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Name"
                        value={schemaData.recipe.name}
                        onChange={(e) =>
                          updateSchemaData("recipe", "name", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Keywords"
                        value={schemaData.recipe.keywords}
                        onChange={(e) =>
                          updateSchemaData("recipe", "keywords", e.target.value)
                        }
                      />
                      <Textarea
                        placeholder="Description"
                        className="md:col-span-2"
                        value={schemaData.recipe.description}
                        onChange={(e) =>
                          updateSchemaData(
                            "recipe",
                            "description",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Image URL"
                        value={schemaData.recipe.image}
                        onChange={(e) =>
                          updateSchemaData("recipe", "image", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Video Content URL"
                        value={schemaData.recipe.videoContentUrl}
                        onChange={(e) =>
                          updateSchemaData(
                            "recipe",
                            "videoContentUrl",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Video Embed URL"
                        value={schemaData.recipe.videoEmbedUrl}
                        onChange={(e) =>
                          updateSchemaData(
                            "recipe",
                            "videoEmbedUrl",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Creator"
                        value={schemaData.recipe.creator}
                        onChange={(e) =>
                          updateSchemaData("recipe", "creator", e.target.value)
                        }
                      />
                      <Input
                        type="date"
                        placeholder="Date Published"
                        value={schemaData.recipe.datePublished}
                        onChange={(e) =>
                          updateSchemaData(
                            "recipe",
                            "datePublished",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Preparation Time (e.g. PT20M)"
                        value={schemaData.recipe.prepTime}
                        onChange={(e) =>
                          updateSchemaData("recipe", "prepTime", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Cooking Time (e.g. PT1H)"
                        value={schemaData.recipe.cookTime}
                        onChange={(e) =>
                          updateSchemaData("recipe", "cookTime", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Category"
                        value={schemaData.recipe.category}
                        onChange={(e) =>
                          updateSchemaData("recipe", "category", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Cuisine"
                        value={schemaData.recipe.cuisine}
                        onChange={(e) =>
                          updateSchemaData("recipe", "cuisine", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Servings"
                        value={schemaData.recipe.servings}
                        onChange={(e) =>
                          updateSchemaData("recipe", "servings", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Nutrition: Serving Size"
                        value={schemaData.recipe.nutritionServingSize}
                        onChange={(e) =>
                          updateSchemaData(
                            "recipe",
                            "nutritionServingSize",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Nutrition: Calories"
                        value={schemaData.recipe.nutritionCalories}
                        onChange={(e) =>
                          updateSchemaData(
                            "recipe",
                            "nutritionCalories",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Nutrition: Fat (grams)"
                        value={schemaData.recipe.nutritionFat}
                        onChange={(e) =>
                          updateSchemaData(
                            "recipe",
                            "nutritionFat",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Rating Value"
                        value={schemaData.recipe.ratingValue}
                        onChange={(e) =>
                          updateSchemaData(
                            "recipe",
                            "ratingValue",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Rating Count"
                        value={schemaData.recipe.ratingCount}
                        onChange={(e) =>
                          updateSchemaData(
                            "recipe",
                            "ratingCount",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Best Rating"
                        value={schemaData.recipe.ratingHigh}
                        onChange={(e) =>
                          updateSchemaData(
                            "recipe",
                            "ratingHigh",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Worst Rating"
                        value={schemaData.recipe.ratingLow}
                        onChange={(e) =>
                          updateSchemaData(
                            "recipe",
                            "ratingLow",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}

                  {/* VIDEO SCHEMA */}
                  {schemaId === "video" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Name"
                        value={schemaData.video.name}
                        onChange={(e) =>
                          updateSchemaData("video", "name", e.target.value)
                        }
                      />
                      <Input
                        type="date"
                        placeholder="Upload Date"
                        value={schemaData.video.uploadDate}
                        onChange={(e) =>
                          updateSchemaData(
                            "video",
                            "uploadDate",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Duration Minutes"
                        value={schemaData.video.durationMinutes}
                        onChange={(e) =>
                          updateSchemaData(
                            "video",
                            "durationMinutes",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Duration Seconds"
                        value={schemaData.video.durationSeconds}
                        onChange={(e) =>
                          updateSchemaData(
                            "video",
                            "durationSeconds",
                            e.target.value
                          )
                        }
                      />
                      <Textarea
                        placeholder="Description"
                        className="md:col-span-2"
                        value={schemaData.video.description}
                        onChange={(e) =>
                          updateSchemaData(
                            "video",
                            "description",
                            e.target.value
                          )
                        }
                      />
                      <Label>Thumbnail URLs</Label>
                      {schemaData.video.thumbnailUrls.map((url, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder={`Thumbnail URL #${index + 1}`}
                            value={url}
                            onChange={(e) => {
                              const updated = [
                                ...schemaData.video.thumbnailUrls,
                              ];
                              updated[index] = e.target.value;
                              updateSchemaData(
                                "video",
                                "thumbnailUrls",
                                updated
                              );
                            }}
                          />
                          {index > 0 && (
                            <Button
                              variant="ghost"
                              onClick={() => {
                                const updated =
                                  schemaData.video.thumbnailUrls.filter(
                                    (_, i) => i !== index
                                  );
                                updateSchemaData(
                                  "video",
                                  "thumbnailUrls",
                                  updated
                                );
                              }}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        onClick={() =>
                          updateSchemaData("video", "thumbnailUrls", [
                            ...schemaData.video.thumbnailUrls,
                            "",
                          ])
                        }
                      >
                        + Add Thumbnail
                      </Button>
                      <Input
                        placeholder="Content URL"
                        value={schemaData.video.contentUrl}
                        onChange={(e) =>
                          updateSchemaData(
                            "video",
                            "contentUrl",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Embed URL"
                        value={schemaData.video.embedUrl}
                        onChange={(e) =>
                          updateSchemaData("video", "embedUrl", e.target.value)
                        }
                      />
                      <Input
                        placeholder="SeekToAction Target URL"
                        value={schemaData.video.seekToAction}
                        onChange={(e) =>
                          updateSchemaData(
                            "video",
                            "seekToAction",
                            e.target.value
                          )
                        }
                      />
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
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="bg-white text-slate-800 border border-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Form
                </Button>
                <Button
                  onClick={copySchema}
                  className="bg-white text-slate-800 border border-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy Schema
                </Button>
                <Button
                  onClick={downloadJSON}
                  className="bg-white text-slate-800 border border-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                >
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
              <p className="text-gray-600">
                Copy this JSON-LD code and add it to your website's &lt;head&gt;
                section
              </p>
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
          {/* <h3 className="text-2xl font-bold mb-4">About Schema Markup</h3> */}
          {/* <p className="max-w-2xl mx-auto mb-8">
            Schema markup helps search engines understand your content better,
            leading to enhanced search results with rich snippets, improved
            click-through rates, and better SEO performance.
          </p> */}
          <p className="text-sm opacity-75">
            {/* © 2024 Free Schema Markup Generator. Built with ❤️ for better SEO. */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
