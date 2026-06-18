"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ResumeData, ResumePersonalInfo } from "@/types";

interface PersonalInfoStepProps {
  data: ResumeData;
  onChange: (updater: (prev: ResumeData) => ResumeData) => void;
  visibleFields?: (keyof ResumePersonalInfo)[];
  requiredFields?: (keyof ResumePersonalInfo)[];
}

// Default: show all fields
const ALL_FIELDS: (keyof ResumePersonalInfo)[] = [
  "fullName",
  "address",
  "phone",
  "email",
  "linkedIn",
  "github",
  "currentRole",
];

interface FieldDef {
  key: keyof ResumePersonalInfo;
  label: string;
  placeholder: string;
  type?: string;
}

const FIELD_DEFS: FieldDef[] = [
  { key: "fullName", label: "Full Name", placeholder: "John Doe" },
  { key: "address", label: "Address", placeholder: "123 Street Name, Town, State 12345" },
  { key: "phone", label: "Phone", placeholder: "123-456-7890", type: "tel" },
  { key: "email", label: "Email", placeholder: "email@gmail.com", type: "email" },
  { key: "linkedIn", label: "LinkedIn", placeholder: "linkedin.com/in/username" },
  { key: "github", label: "GitHub", placeholder: "github.com/username" },
  { key: "currentRole", label: "Current Role", placeholder: "Software Engineer" },
];

export function PersonalInfoStep({
  data,
  onChange,
  visibleFields,
  requiredFields,
}: PersonalInfoStepProps) {
  const fieldsToShow = visibleFields ?? ALL_FIELDS;
  const required = new Set(requiredFields ?? []);

  const update = (field: keyof ResumePersonalInfo, value: string) => {
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
        {FIELD_DEFS.filter((f) => fieldsToShow.includes(f.key)).map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>
              {field.label}
              {required.has(field.key) ? " *" : ""}
            </Label>
            <Input
              id={field.key}
              type={field.type}
              placeholder={field.placeholder}
              value={data.personalInfo[field.key]}
              onChange={(e) => update(field.key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
