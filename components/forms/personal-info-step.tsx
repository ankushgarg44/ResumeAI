"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ResumeData } from "@/types";

interface PersonalInfoStepProps {
  data: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
}

export function PersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
  const update = (field: keyof ResumeData["personalInfo"], value: string) => {
    onChange((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h3 className="text-2xl font-bold mb-1">Personal Information</h3>
        <p className="text-muted-foreground">
          Start with the basics. This is how employers will contact you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={data.personalInfo.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="123 Street Name, Town, State 12345"
            value={data.personalInfo.address}
            onChange={(e) => update("address", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="123-456-7890"
            value={data.personalInfo.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@gmail.com"
            value={data.personalInfo.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/username"
            value={data.personalInfo.linkedIn}
            onChange={(e) => update("linkedIn", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            placeholder="github.com/username"
            value={data.personalInfo.github}
            onChange={(e) => update("github", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
