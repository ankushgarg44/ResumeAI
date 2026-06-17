import { forwardRef } from "react";
import type { ResumeData } from "@/types";

interface ATSTemplateProps {
  data: ResumeData;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  if (!year || !month) return dateStr;
  const months = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
    "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec.",
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export const ATSTemplate = forwardRef<HTMLDivElement, ATSTemplateProps>(
  function ATSTemplate({ data }, ref) {
    const { personalInfo, education, coursework, experience, projects, technicalSkills, leadership } = data;

    return (
      <div
        ref={ref}
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "12mm 14mm",
          fontFamily: "'Times New Roman', 'Georgia', serif",
          fontSize: "10.5pt",
          lineHeight: "1.3",
          color: "#000",
          background: "#fff",
          boxSizing: "border-box",
        }}
      >
        {/* ======== HEADER ======== */}
        <div style={{ textAlign: "center", marginBottom: "2mm" }}>
          <h1
            style={{
              fontSize: "22pt",
              fontWeight: 700,
              fontVariant: "small-caps",
              letterSpacing: "2px",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {personalInfo.fullName || "Your Name"}
          </h1>
          {personalInfo.address && (
            <div style={{ fontSize: "9.5pt", marginTop: "1mm" }}>
              {personalInfo.address}
            </div>
          )}
          <div
            style={{
              fontSize: "9.5pt",
              marginTop: "1mm",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "4mm",
            }}
          >
            {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
            {personalInfo.email && <span>✉ {personalInfo.email}</span>}
            {personalInfo.linkedIn && <span>🔗 {personalInfo.linkedIn}</span>}
            {personalInfo.github && <span>💻 {personalInfo.github}</span>}
          </div>
        </div>

        {/* ======== EDUCATION ======== */}
        {education.length > 0 && (
          <Section title="Education">
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "2mm" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{edu.university}</strong>
                  <span>
                    {formatDate(edu.startDate)}
                    {edu.endDate ? ` – ${formatDate(edu.endDate)}` : ""}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <em>{edu.degree}</em>
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* ======== RELEVANT COURSEWORK ======== */}
        {coursework.length > 0 && (
          <Section title="Relevant Coursework">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0 4mm",
                paddingLeft: "4mm",
              }}
            >
              {coursework.map((course) => (
                <div key={course} style={{ fontSize: "10pt" }}>
                  • {course}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ======== EXPERIENCE ======== */}
        {experience.length > 0 && (
          <Section title="Experience">
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "3mm" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{exp.company}</strong>
                  <span>
                    {formatDate(exp.startDate)}
                    {exp.endDate ? ` – ${formatDate(exp.endDate)}` : ""}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <em>{exp.role}</em>
                  <span>{exp.location}</span>
                </div>
                <BulletList items={exp.bullets} />
              </div>
            ))}
          </Section>
        )}

        {/* ======== PROJECTS ======== */}
        {projects.length > 0 && (
          <Section title="Projects">
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: "3mm" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>
                    <strong>{proj.title}</strong>
                    {proj.technologies && (
                      <span> | <em>{proj.technologies}</em></span>
                    )}
                  </span>
                  <span>{proj.date}</span>
                </div>
                <BulletList items={proj.bullets} />
              </div>
            ))}
          </Section>
        )}

        {/* ======== TECHNICAL SKILLS ======== */}
        {(technicalSkills.languages.length > 0 ||
          technicalSkills.developerTools.length > 0 ||
          technicalSkills.frameworks.length > 0) && (
          <Section title="Technical Skills">
            {technicalSkills.languages.length > 0 && (
              <div>
                <strong>Languages</strong>: {technicalSkills.languages.join(", ")}
              </div>
            )}
            {technicalSkills.developerTools.length > 0 && (
              <div>
                <strong>Developer Tools</strong>: {technicalSkills.developerTools.join(", ")}
              </div>
            )}
            {technicalSkills.frameworks.length > 0 && (
              <div>
                <strong>Technologies/Frameworks</strong>: {technicalSkills.frameworks.join(", ")}
              </div>
            )}
          </Section>
        )}

        {/* ======== LEADERSHIP ======== */}
        {leadership.length > 0 && (
          <Section title="Leadership / Extracurricular">
            {leadership.map((lead) => (
              <div key={lead.id} style={{ marginBottom: "3mm" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{lead.organization}</strong>
                  <span>{lead.duration}</span>
                </div>
                <em>{lead.role}</em>
                <BulletList items={lead.bullets} />
              </div>
            ))}
          </Section>
        )}
      </div>
    );
  }
);

/* ======== Sub-components ======== */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "3mm" }}>
      <div
        style={{
          fontSize: "12pt",
          fontWeight: 700,
          borderBottom: "1px solid #000",
          paddingBottom: "0.5mm",
          marginBottom: "1.5mm",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  const filtered = items.filter((b) => b.trim());
  if (filtered.length === 0) return null;
  return (
    <ul
      style={{
        margin: "0.5mm 0 0 0",
        paddingLeft: "5mm",
        listStyleType: "disc",
      }}
    >
      {filtered.map((bullet, i) => (
        <li key={i} style={{ fontSize: "10pt", marginBottom: "0.3mm" }}>
          {bullet}
        </li>
      ))}
    </ul>
  );
}
