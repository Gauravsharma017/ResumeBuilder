import { memo } from 'react';

function ResumeCard1({ userData, componentRef }) {
  const initials = `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();

  return (
    <div className="resume-container" ref={componentRef} style={{ backgroundColor: '#2A4B5A' }}>
      <div className="resume-sidebar avoid-break" style={{ backgroundColor: '#2A4B5A', borderRight: '1px solid black', color: 'white' }}>
        <div className="avatar-circle">
          {userData.profileImage ? (
            <img src={userData.profileImage} alt="Profile" className="profile-image" />
          ) : (
            initials
          )}
        </div>

        {userData.email || userData.contact || userData.LinkedIn ? (
          <div className="contact-section" style={{ backgroundColor: '#2A4B5A' }}>
            <h3>Contact</h3>
            {userData.email && (
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span><a href={`mailto:${userData.email}`}>{userData.email}</a></span>
              </div>
            )}
            {userData.contact && (
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span><a href={`tel:+${userData.contact}`}>{userData.contact}</a></span>
              </div>
            )}
            {userData.LinkedIn && (
              <div className="contact-item">
                <i className="fab fa-linkedin"></i>
                <a href={userData.LinkedIn} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        ) : null}

        {userData.skills && userData.skills.length > 0 && userData.skills[0]&& (
          <div className="skills-section">
            <h3>Skills</h3>
            <div className="skills-grid">
              {userData.skills.map((skill, index) => (
                <div key={index} className="skill-tag">{skill}</div>
              ))}
            </div>
          </div>
        )}

        {userData.languages && userData.languages.length > 0 && userData.languages[0] && (
          <div className="languages-section">
            <h3>Languages</h3>
            <div className="languages-list">
              {userData.languages.map((lang, index) => (
                <div key={index} className="language-item">
                  <span className="language-name">{lang}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="resume-main">
        <div className="header-section avoid-break">
          <h1>{userData.firstName} {userData.lastName}</h1>
          <h2 className="position-title">{userData.title}</h2>
          <p className="summary-text">{userData.summary}</p>
        </div>

        {userData.workExperience && userData.workExperience.length > 0 && userData?.workExperience[0]?.company && (
          <div className="section avoid-break">
            <h3 className="section-title">Experience</h3>
            {userData.workExperience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <h4>{exp.role}</h4>
                  <div className="company">{exp.company}</div>
                </div>
                <p className="duration">{exp.duration} years</p>
                <p className="experience-description">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {userData.education && userData.education.length > 0 && userData?.education[0]?.institution && (
          <div className="section avoid-break">
            <h3 className="section-title">Education</h3>
            <table className='resumeCard2-table'>
              <thead>
                <tr>
                  <th>Degree</th>
                  <th>Institution</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {userData.education.map((item, index) => (
                  <tr key={index}>
                    <td>{item.degree}</td>
                    <td>{item.institution}</td>
                    <td>{item.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="page-break"></div>
        <div className="columns-container page-break">
          {userData.certifications && userData.certifications.length > 0 && userData?.certifications[0]?.name && (
            <div className="section avoid-break">
              <h3 className="section-title">Certifications</h3>
              {userData.certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                  <div className="certification-name">{cert.name}</div>
                  <div className="certification-authority">{cert.authority} • {cert.year}</div>
                </div>
              ))}
            </div>
          )}

          {userData.projects && userData.projects.length > 0 && userData?.projects[0]?.name && (
            <div className="section avoid-break">
              <h3 className="section-title">Projects</h3>
              {userData.projects.map((project, index) => (
                <div key={index} className="project-item">
                  <a href={project.link} className="project-link">
                    {project.name}
                  </a>
                  <p className="project-description">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ResumeCard1);