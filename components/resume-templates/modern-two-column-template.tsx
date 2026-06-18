import { forwardRef } from "react";
import type { ResumeData } from "@/types";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  if (!year || !month) return dateStr;
  const months = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
    "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export const ModernTwoColumnTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(
  function ModernTwoColumnTemplate({ data }, ref) {
    const {
      personalInfo,
      education,
      coursework,
      experience,
      projects,
      technicalSkills,
    } = data;

    // Contact string parts
    const contactParts = [];
    if (personalInfo?.email) contactParts.push(personalInfo.email);
    if (personalInfo?.phone) contactParts.push(personalInfo.phone);
    if (personalInfo?.address) contactParts.push(personalInfo.address);
    const contactString = contactParts.join(" | ");

    return (
      <div
        ref={ref}
        style={{
          width: "210mm",
          minHeight: "297mm",
          boxSizing: "border-box",
          background: "#fff",
          padding: "40px",
          fontFamily: "Helvetica, Arial, sans-serif",
          color: "#333",
          fontSize: "12px",
          lineHeight: 1.5,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: "46px",
              fontWeight: 300,
              margin: "0 0 10px 0",
              color: "#111",
            }}
          >
            {personalInfo?.fullName || "Your Name"}
          </h1>
          {contactString && (
            <div style={{ fontSize: "13px", color: "#666" }}>
              {contactString}
            </div>
          )}
        </div>

        <div style={{ borderBottom: "1px solid #ccc", marginBottom: "20px" }} />

        {/* Two-Column Layout */}
        <div style={{ display: "flex", gap: "30px" }}>
          {/* Left Column */}
          <div style={{ flex: "0 0 32%" }}>
            {education && education.length > 0 && (
              <div style={{ marginBottom: "25px" }}>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 300,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#888",
                    margin: "0 0 10px 0",
                  }}
                >
                  Education
                </h2>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: "15px" }}>
                    <div style={{ fontWeight: 600, fontSize: "14px", color: "#111", textTransform: "uppercase" }}>
                      {edu.university}
                    </div>
                    <div style={{ fontWeight: 600, marginTop: "2px" }}>
                      {edu.degree}
                    </div>
                    <div style={{ color: "#666", marginTop: "2px" }}>
                      {edu.endDate && `Grad. ${formatDate(edu.endDate)} `}
                      {edu.location && `| ${edu.location}`}
                    </div>
                    {edu.cgpa && (
                      <div style={{ color: "#666", marginTop: "2px" }}>
                        Cum. GPA: {edu.cgpa}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {(personalInfo?.linkedIn || personalInfo?.github) && (
              <div style={{ marginBottom: "25px" }}>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 300,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#888",
                    margin: "0 0 10px 0",
                  }}
                >
                  Links
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {personalInfo.linkedIn && (
                    <div>
                      <span style={{ color: "#888" }}>LinkedIn://</span> {personalInfo.linkedIn}
                    </div>
                  )}
                  {personalInfo.github && (
                    <div>
                      <span style={{ color: "#888" }}>GitHub://</span> {personalInfo.github}
                    </div>
                  )}
                </div>
              </div>
            )}

            {coursework && coursework.length > 0 && (
              <div style={{ marginBottom: "25px" }}>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 300,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#888",
                    margin: "0 0 10px 0",
                  }}
                >
                  Coursework
                </h2>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", color: "#444" }}>
                  {coursework.map((course, i) => (
                    <li key={i} style={{ marginBottom: "2px" }}>
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {technicalSkills && (technicalSkills.languages?.length > 0 || technicalSkills.frameworks?.length > 0 || technicalSkills.developerTools?.length > 0) && (
              <div style={{ marginBottom: "25px" }}>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 300,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#888",
                    margin: "0 0 10px 0",
                  }}
                >
                  Skills
                </h2>
                {technicalSkills.languages && technicalSkills.languages.length > 0 && (
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ fontWeight: 600, marginBottom: "4px", textTransform: "uppercase" }}>Languages</div>
                    <div style={{ color: "#444" }}>{technicalSkills.languages.join(" • ")}</div>
                  </div>
                )}
                {technicalSkills.frameworks && technicalSkills.frameworks.length > 0 && (
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ fontWeight: 600, marginBottom: "4px", textTransform: "uppercase" }}>Frameworks</div>
                    <div style={{ color: "#444" }}>{technicalSkills.frameworks.join(" • ")}</div>
                  </div>
                )}
                {technicalSkills.developerTools && technicalSkills.developerTools.length > 0 && (
                  <div style={{ marginBottom: "10px" }}>
                    <div style={{ fontWeight: 600, marginBottom: "4px", textTransform: "uppercase" }}>Tools</div>
                    <div style={{ color: "#444" }}>{technicalSkills.developerTools.join(" • ")}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div style={{ flex: "1" }}>
            {experience && experience.length > 0 && (
              <div style={{ marginBottom: "25px" }}>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 300,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#888",
                    margin: "0 0 10px 0",
                  }}
                >
                  Experience
                </h2>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: "15px" }}>
                    <div style={{ fontSize: "14px", textTransform: "uppercase" }}>
                      <span style={{ fontWeight: 600, color: "#111" }}>{exp.company}</span>
                      {exp.role && <span style={{ color: "#555" }}> | {exp.role}</span>}
                    </div>
                    <div style={{ color: "#666", marginTop: "2px", marginBottom: "6px" }}>
                      {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      {exp.location && ` | ${exp.location}`}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul style={{ margin: 0, paddingLeft: "20px", color: "#444" }}>
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} style={{ marginBottom: "4px" }}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {projects && projects.length > 0 && (
              <div style={{ marginBottom: "25px" }}>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 300,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "#888",
                    margin: "0 0 10px 0",
                  }}
                >
                  Projects
                </h2>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: "15px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#111", textTransform: "uppercase" }}>
                      {proj.title}
                    </div>
                    <div style={{ color: "#666", marginTop: "2px", marginBottom: "4px" }}>
                      {formatDate(proj.date)} {proj.technologies && `| ${proj.technologies}`}
                    </div>
                    {proj.bullets && proj.bullets.length > 0 && (
                      <div style={{ color: "#444" }}>
                        {proj.bullets.map((bullet, i) => (
                          <div key={i} style={{ marginBottom: "4px" }}>{bullet}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
