import React, { memo } from "react";

function ResumeCard2({ userData, componentRef }) {
  const initials = `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();

  return (
    <div className="rc-container" ref={componentRef}>
      {/* Header Section */}
      <div className="rc-header">
        <div className="rc-avatarWrapper">
          <div className="rc-avatarCircle">
            {userData.profileImage ? (
              <img src={userData.profileImage} alt="Profile" className="profile-image" />
            ) : (
              initials
            )}
          </div>
        </div>
        <div className="rc-userDetails">
          <h2 className="rc-fullName">
            {userData.firstName} {userData.lastName}
          </h2>
          {userData.title && <h3 className="rc-role">{userData.title}</h3>}
          {userData.summary && <p className="rc-summary">{userData.summary}</p>}
        </div>
      </div>

      {/* Contact Information */}
      {(userData.email || userData.contact || userData.LinkedIn) && (
        <div className="rc-contact">
          <h3 className="rc-sectionHeading">Contact Information</h3>
          <div className="rc-contactList">
            {userData.email && (
              <div className="rc-contactItem">
                <span className="rc-icon">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="rc-contactValue">{userData.email}</span>
              </div>
            )}
            {userData.contact && (
              <div className="rc-contactItem">
                <span className="rc-icon">
                  <i className="fas fa-phone"></i>
                </span>
                <span className="rc-contactValue">{userData.contact}</span>
              </div>
            )}
            {userData.LinkedIn && (
              <div className="rc-contactItem">
                <span className="rc-icon">
                  <i className="fab fa-linkedin"></i>
                </span>
                <span className="rc-contactValue">
                  <a href={userData.LinkedIn} target="_blank" rel="noopener noreferrer">
                    LinkedIn Profile
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Education Section */}
      {userData.education && userData.education.length > 0 && userData?.education[0]?.institution && (
        <div className="rc-education">
          <h3 className="rc-sectionHeading">Education</h3>
          <table className="rc-table">
            <thead>
              <tr>
                <th>Degree</th>
                <th>Institution</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {userData.education.map((edu, index) => (
                <tr key={index}>
                  {edu.degree && <td>{edu.degree}</td>}
                  {edu.institution && <td>{edu.institution}</td>}
                  {edu.year && <td>{edu.year}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Work Experience Section */}
      {userData.workExperience && userData.workExperience.length > 0 && userData?.workExperience[0]?.company && (
        <div className="rc-work">
          <h3 className="rc-sectionHeading">Work Experience</h3>
          {userData.workExperience.map((exp, index) => (
            <div key={index} className="rc-workItem">
              {exp.role && exp.company && (
                <h4 className="rc-workTitle">
                  {exp.role} at {exp.company}
                </h4>
              )}
              {exp.duration && <p className="rc-duration">{exp.duration} years</p>}
              {exp.description && <p className="rc-description">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {userData.skills && userData.skills.length > 0 && userData.skills[0] && (
        <div className="rc-skills">
          <h3 className="rc-sectionHeading">Skills</h3>
          <div className="rc-skillTags">
            {userData.skills.map((skill, index) => (
              <span key={index} className="rc-skillTag">
                # {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {userData.certifications && userData.certifications.length > 0 && userData?.certifications[0]?.name && (
        <div className="rc-certifications">
          <h3 className="rc-sectionHeading">Certifications</h3>
          {userData.certifications.map((cert, index) => (
            <div key={index} className="rc-certItem">
              {cert.name && <strong className="rc-certName">{cert.name}</strong>}
              {cert.authority && cert.year && (
                <span className="rc-certInfo">
                  {" "}
                  - {cert.authority} ({cert.year})
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Languages Section */}
      {userData.languages && userData.languages.length > 0 && userData.languages[0] && (
        <div className="rc-languages">
          <h3 className="rc-sectionHeading">Languages</h3>
          <ul className="rc-langList">
            {userData.languages.map((lang, index) => (
              <li key={index} className="rc-langItem">
                {lang}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Projects Section */}
      {userData.projects && userData.projects.length > 0 && userData?.projects[0]?.name && (
        <div className="rc-projects">
          <h3 className="rc-sectionHeading">Projects</h3>
          {userData.projects.map((project, index) => (
            <div key={index} className="rc-projectItem">
              {project.name && <h4 className="rc-projectTitle">{project.name}</h4>}
              {project.description && <p className="rc-projectDesc">{project.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(ResumeCard2);