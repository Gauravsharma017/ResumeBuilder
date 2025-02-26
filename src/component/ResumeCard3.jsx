import React, { memo } from "react";

function ResumeCard3({ userData, componentRef }) {
  return (
    <div
      ref={componentRef}
      style={{
        width: "210mm",
        minHeight:"200mm",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ddd",
        padding: "20px",
        background: "#fff",
        borderRadius: "5px",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #000",
          paddingBottom: "10px",
        }}
      >
        <div style={{textAlign: "left"}}>
          <h2 style={{ margin: "0", fontSize: "24px" }}>
            {userData.firstName} {userData.lastName}
          </h2>
          {userData.title && (
            <h3 style={{ margin: "5px 0", fontSize: "18px", color: "gray" }}>
              {userData.title}
            </h3>
          )}
        </div>
        <div style={{ textAlign: "left", fontSize: "14px", color: "#666" }}>
          {userData.email && <div><a href={`mailto:${userData.email}`}>{userData.email}</a></div>}
          {userData.contact && <div>{userData.contact}</div>}
          {userData.LinkedIn && (
            <div>
              <a
                href={userData.LinkedIn}
                style={{ textDecoration: "none", color: "#0073b1" }}
              >
                LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {userData.summary && (
        <p style={{ textAlign:"left", margin: "20px 0", fontSize: "14px", lineHeight: "1.6" }}>
          {userData.summary}
        </p>
      )}

      {/* Work Experience */}
      {userData.workExperience && userData.workExperience.length > 0 && (
        <div>
          <h3 style={{textAlign:"left", borderBottom: "2px solid #000", paddingBottom: "5px" }}>
            Work Experience
          </h3>
          {userData.workExperience.map((exp, index) => (
            <div key={index} style={{textAlign:"left", marginBottom: "35px" }}>
              <h4 style={{ margin: "0", fontSize: "16px" }}>
                {exp.role} at {exp.company}
              </h4>
              <p style={{ margin: "2px 10px", fontSize: "14px", color: "gray" }}>
                {exp.duration} 
              </p>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {userData.education && userData.education.length > 0 && (
        <div>
          <h3 style={{ textAlign:"left",borderBottom: "2px solid #000", paddingBottom: "5px" }}>
            Education
          </h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f4a4a8" ,textAlign:"left",}}>
                <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  Degree
                </th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  Institution
                </th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  Year
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.education.map((edu, index) => (
                <tr key={index} style={{textAlign:"left",}}>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {edu.degree}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {edu.institution}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {edu.year}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Skills */}
      {userData.skills && userData.skills.length > 0 && (
        <div>
          <h3 style={{textAlign:"left", borderBottom: "2px solid #000", paddingBottom: "5px" }}>
            Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {userData.skills.map((skill, index) => (
              <span
                key={index}
                style={{
                  background: "#0073b1",
                  color: "#fff",
                  padding: "5px 10px",
                  margin: "5px",
                  borderRadius: "3px",
                  fontSize: "14px",
                }}
              >
                # {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ResumeCard3);
