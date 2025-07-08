
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JobPostingFormProps {
  onSchemaGenerated: (schema: any) => void;
}

const JobPostingForm = ({ onSchemaGenerated }: JobPostingFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    identifier: "",
    description: "",
    hiringOrganization: "",
    hiringOrganizationUrl: "",
    hiringOrganizationLogo: "",
    industry: "",
    employmentType: "",
    workHours: "",
    datePosted: "",
    validThrough: "",
    remoteJob: false,
    addressCountry: "",
    addressRegion: "",
    streetAddress: "",
    addressLocality: "",
    postalCode: "",
    baseSalary: "",
    maxSalary: "",
    salaryCurrency: "USD",
    salaryUnit: "YEAR",
    responsibilities: "",
    skills: "",
    qualifications: "",
    educationRequirements: "",
    experienceRequirements: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": formData.title,
      "identifier": formData.identifier,
      "description": formData.description,
      "hiringOrganization": {
        "@type": "Organization",
        "name": formData.hiringOrganization,
        "sameAs": formData.hiringOrganizationUrl,
        "logo": formData.hiringOrganizationLogo
      },
      "industry": formData.industry,
      "employmentType": formData.employmentType,
      "workHours": formData.workHours,
      "datePosted": formData.datePosted,
      "validThrough": formData.validThrough,
      "jobLocation": formData.remoteJob ? {
        "@type": "Place",
        "applicantLocationRequirements": {
          "@type": "Country",
          "name": "Anywhere"
        }
      } : {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": formData.streetAddress,
          "addressLocality": formData.addressLocality,
          "addressRegion": formData.addressRegion,
          "postalCode": formData.postalCode,
          "addressCountry": formData.addressCountry
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": formData.salaryCurrency,
        "value": {
          "@type": "QuantitativeValue",
          "minValue": formData.baseSalary,
          "maxValue": formData.maxSalary || formData.baseSalary,
          "unitText": formData.salaryUnit
        }
      },
      "responsibilities": formData.responsibilities,
      "skills": formData.skills,
      "qualifications": formData.qualifications,
      "educationRequirements": formData.educationRequirements,
      "experienceRequirements": formData.experienceRequirements
    };

    onSchemaGenerated(schema);
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Job Posting Schema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Job's title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Software Engineer"
          />
        </div>

        <div>
          <Label htmlFor="identifier">Identifier</Label>
          <Input
            id="identifier"
            value={formData.identifier}
            onChange={(e) => handleInputChange("identifier", e.target.value)}
            placeholder="JOB-123456"
          />
        </div>

        <div>
          <Label htmlFor="description">Job's description (in HTML)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="<p>We are looking for a skilled Software Engineer...</p>"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="hiringOrganization">Company</Label>
          <Input
            id="hiringOrganization"
            value={formData.hiringOrganization}
            onChange={(e) => handleInputChange("hiringOrganization", e.target.value)}
            placeholder="Company name"
          />
        </div>

        <div>
          <Label htmlFor="hiringOrganizationUrl">Company URL</Label>
          <Input
            id="hiringOrganizationUrl"
            value={formData.hiringOrganizationUrl}
            onChange={(e) => handleInputChange("hiringOrganizationUrl", e.target.value)}
            placeholder="https://company.com"
          />
        </div>

        <div>
          <Label htmlFor="hiringOrganizationLogo">Company logo</Label>
          <Input
            id="hiringOrganizationLogo"
            value={formData.hiringOrganizationLogo}
            onChange={(e) => handleInputChange("hiringOrganizationLogo", e.target.value)}
            placeholder="https://company.com/logo.png"
          />
        </div>

        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={formData.industry}
            onChange={(e) => handleInputChange("industry", e.target.value)}
            placeholder="Technology"
          />
        </div>

        <div>
          <Label htmlFor="employmentType">Employment type</Label>
          <Select value={formData.employmentType} onValueChange={(value) => handleInputChange("employmentType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FULL_TIME">Full Time</SelectItem>
              <SelectItem value="PART_TIME">Part Time</SelectItem>
              <SelectItem value="CONTRACTOR">Contractor</SelectItem>
              <SelectItem value="TEMPORARY">Temporary</SelectItem>
              <SelectItem value="INTERN">Intern</SelectItem>
              <SelectItem value="VOLUNTEER">Volunteer</SelectItem>
              <SelectItem value="PER_DIEM">Per Diem</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="workHours">Work hours (e.g. 8am-5pm, shift)</Label>
          <Input
            id="workHours"
            value={formData.workHours}
            onChange={(e) => handleInputChange("workHours", e.target.value)}
            placeholder="9am-5pm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="datePosted">Date posted</Label>
            <Input
              id="datePosted"
              type="date"
              value={formData.datePosted}
              onChange={(e) => handleInputChange("datePosted", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="validThrough">Expire date</Label>
            <Input
              id="validThrough"
              type="date"
              value={formData.validThrough}
              onChange={(e) => handleInputChange("validThrough", e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remoteJob"
            checked={formData.remoteJob}
            onCheckedChange={(checked) => handleInputChange("remoteJob", checked as boolean)}
          />
          <Label htmlFor="remoteJob">Remote job</Label>
        </div>

        {!formData.remoteJob && (
          <>
            <div>
              <Label htmlFor="addressCountry">Country</Label>
              <Input
                id="addressCountry"
                value={formData.addressCountry}
                onChange={(e) => handleInputChange("addressCountry", e.target.value)}
                placeholder="United States"
              />
            </div>

            <div>
              <Label htmlFor="addressRegion">State/Province/Region</Label>
              <Input
                id="addressRegion"
                value={formData.addressRegion}
                onChange={(e) => handleInputChange("addressRegion", e.target.value)}
                placeholder="California"
              />
            </div>

            <div>
              <Label htmlFor="streetAddress">Street</Label>
              <Input
                id="streetAddress"
                value={formData.streetAddress}
                onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                placeholder="123 Main St"
              />
            </div>

            <div>
              <Label htmlFor="addressLocality">City</Label>
              <Input
                id="addressLocality"
                value={formData.addressLocality}
                onChange={(e) => handleInputChange("addressLocality", e.target.value)}
                placeholder="San Francisco"
              />
            </div>

            <div>
              <Label htmlFor="postalCode">Zip code</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                placeholder="94105"
              />
            </div>
          </>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="baseSalary">Salary (or min. salary)</Label>
            <Input
              id="baseSalary"
              type="number"
              value={formData.baseSalary}
              onChange={(e) => handleInputChange("baseSalary", e.target.value)}
              placeholder="50000"
            />
          </div>
          <div>
            <Label htmlFor="maxSalary">Max. salary</Label>
            <Input
              id="maxSalary"
              type="number"
              value={formData.maxSalary}
              onChange={(e) => handleInputChange("maxSalary", e.target.value)}
              placeholder="80000"
            />
          </div>
          <div>
            <Label htmlFor="salaryCurrency">Currency</Label>
            <Select value={formData.salaryCurrency} onValueChange={(value) => handleInputChange("salaryCurrency", value)}>
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
        </div>

        <div>
          <Label htmlFor="salaryUnit">Per...</Label>
          <Select value={formData.salaryUnit} onValueChange={(value) => handleInputChange("salaryUnit", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HOUR">Hour</SelectItem>
              <SelectItem value="DAY">Day</SelectItem>
              <SelectItem value="WEEK">Week</SelectItem>
              <SelectItem value="MONTH">Month</SelectItem>
              <SelectItem value="YEAR">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="responsibilities">Responsibilities</Label>
          <Textarea
            id="responsibilities"
            value={formData.responsibilities}
            onChange={(e) => handleInputChange("responsibilities", e.target.value)}
            placeholder="List of job responsibilities"
          />
        </div>

        <div>
          <Label htmlFor="skills">Skills</Label>
          <Textarea
            id="skills"
            value={formData.skills}
            onChange={(e) => handleInputChange("skills", e.target.value)}
            placeholder="Required skills"
          />
        </div>

        <div>
          <Label htmlFor="qualifications">Qualifications</Label>
          <Textarea
            id="qualifications"
            value={formData.qualifications}
            onChange={(e) => handleInputChange("qualifications", e.target.value)}
            placeholder="Required qualifications"
          />
        </div>

        <div>
          <Label htmlFor="educationRequirements">Education requirements</Label>
          <Textarea
            id="educationRequirements"
            value={formData.educationRequirements}
            onChange={(e) => handleInputChange("educationRequirements", e.target.value)}
            placeholder="Education requirements"
          />
        </div>

        <div>
          <Label htmlFor="experienceRequirements">Experience requirements</Label>
          <Textarea
            id="experienceRequirements"
            value={formData.experienceRequirements}
            onChange={(e) => handleInputChange("experienceRequirements", e.target.value)}
            placeholder="Experience requirements"
          />
        </div>

        <Button onClick={generateSchema} className="w-full bg-yellow-500 hover:bg-yellow-600">
          Generate Job Posting Schema
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobPostingForm;
