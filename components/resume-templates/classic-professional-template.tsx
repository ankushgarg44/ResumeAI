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

export const ClassicProfessionalTemplate = forwardRef<HTMLDivElement, { data: ResumeData }>(
  function ClassicProfessionalTemplate({ data }, ref) {
    const {
      personalInfo,
      objective,
      education,
      technicalSkills,
      experience,
      leadership,
      references,
    } = data;

    const contactParts = [];
    if (personalInfo?.phone) contactParts.push(personalInfo.phone);
    if (personalInfo?.email) contactParts.push(personalInfo.email);
    if (personalInfo?.address) contactParts.push(personalInfo.address);
    if (personalInfo?.linkedIn) contactParts.push(personalInfo.linkedIn);

    return (
      <div
        ref={ref}
        style={{
          width: "210mm",
          minHeight: "297mm",
          boxSizing: "border-box",
          background: "#fff",
          padding: "40mm 20mm",
          fontFamily: "Georgia, serif",
          color: "#333",
          lineHeight: 1.6,
          fontSize: "11px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "normal",
              margin: "0 0 5px 0",
              color: "#000",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {personalInfo?.fullName || "Your Name"}
          </h1>
          {personalInfo?.currentRole && (
            <div style={{ fontSize: "14px", color: "#555", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
              {personalInfo.currentRole}
            </div>
          )}
          {contactParts.length > 0 && (
            <div style={{ fontSize: "10px", color: "#666" }}>
              {contactParts.join(" • ")}
            </div>
          )}
        </div>

        {/* Objective */}
        {objective && (
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "uppercase",
                borderBottom: "1px solid #000",
                paddingBottom: "4px",
                marginBottom: "8px",
                letterSpacing: "1px",
                color: "#000"
              }}
            >
              Objective
            </h2>
            <div style={{ textAlign: "justify" }}>{objective}</div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "uppercase",
                borderBottom: "1px solid #000",
                paddingBottom: "4px",
                marginBottom: "12px",
                letterSpacing: "1px",
                color: "#000"
              }}
            >
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "70%" }}>
                  <div style={{ fontWeight: "bold", color: "#000", fontSize: "12px" }}>
                    {edu.university}
                  </div>
                  <div style={{ fontStyle: "italic", color: "#444" }}>
                    {edu.degree}
                  </div>
                  {edu.cgpa && (
                    <div style={{ color: "#666", marginTop: "2px" }}>
                      GPA: {edu.cgpa}
                    </div>
                  )}
                </div>
                <div style={{ width: "28%", textAlign: "right", color: "#666" }}>
                  {edu.location && <div>{edu.location}</div>}
                  {edu.endDate && <div>{formatDate(edu.endDate)}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Key Skills */}
        {technicalSkills &&
          (technicalSkills.languages?.length > 0 ||
            technicalSkills.frameworks?.length > 0 ||
            technicalSkills.developerTools?.length > 0) && (
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #000",
                  paddingBottom: "4px",
                  marginBottom: "8px",
                  letterSpacing: "1px",
                  color: "#000"
                }}
              >
                Key Skills
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {technicalSkills.languages && technicalSkills.languages.length > 0 && (
                  <div style={{ flex: "1 1 30%" }}>
                    <strong style={{ color: "#000" }}>Languages:</strong> {technicalSkills.languages.join(", ")}
                  </div>
                )}
                {technicalSkills.frameworks && technicalSkills.frameworks.length > 0 && (
                  <div style={{ flex: "1 1 30%" }}>
                    <strong style={{ color: "#000" }}>Frameworks:</strong> {technicalSkills.frameworks.join(", ")}
                  </div>
                )}
                {technicalSkills.developerTools && technicalSkills.developerTools.length > 0 && (
                  <div style={{ flex: "1 1 30%" }}>
                    <strong style={{ color: "#000" }}>Tools:</strong> {technicalSkills.developerTools.join(", ")}
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "uppercase",
                borderBottom: "1px solid #000",
                paddingBottom: "4px",
                marginBottom: "12px",
                letterSpacing: "1px",
                color: "#000"
              }}
            >
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <div style={{ width: "70%" }}>
                    <span style={{ fontWeight: "bold", fontSize: "12px", color: "#000" }}>
                      {exp.role}
                    </span>
                    {exp.company && (
                      <span style={{ fontStyle: "italic", marginLeft: "6px", color: "#444" }}>
                        {exp.company}
                      </span>
                    )}
                  </div>
                  <div style={{ width: "28%", textAlign: "right", color: "#666" }}>
                    {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </div>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul style={{ margin: "4px 0 0 0", paddingLeft: "20px", color: "#333", textAlign: "justify" }}>
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} style={{ marginBottom: "3px" }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Leadership */}
        {leadership && leadership.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "uppercase",
                borderBottom: "1px solid #000",
                paddingBottom: "4px",
                marginBottom: "12px",
                letterSpacing: "1px",
                color: "#000"
              }}
            >
              Leadership
            </h2>
            {leadership.map((item) => (
              <div key={item.id} style={{ marginBottom: "12px" }}>
                <div style={{ fontWeight: "bold", color: "#000", fontSize: "12px", marginBottom: "4px" }}>
                  {item.role} {item.organization && `| ${item.organization}`}
                </div>
                {item.bullets && item.bullets.length > 0 && (
                  <ul style={{ margin: "4px 0 0 0", paddingLeft: "20px", color: "#333", textAlign: "justify" }}>
                    {item.bullets.map((bullet, i) => (
                      <li key={i} style={{ marginBottom: "3px" }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {references && references.trim().length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "uppercase",
                borderBottom: "1px solid #000",
                paddingBottom: "4px",
                marginBottom: "8px",
                letterSpacing: "1px",
                color: "#000"
              }}
            >
              References
            </h2>
            <div style={{ textAlign: "justify" }}>{references}</div>
          </div>
        )}
      </div>
    );
  }
);
