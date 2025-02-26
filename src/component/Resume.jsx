import React, { useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import ResumeCard1 from "./ResumeCard1";
import ResumeCard2 from "./ResumeCard2";
import ResumeCard3 from "./ResumeCard3";
import { useNavigate } from "react-router-dom";
import {
  IoMdDownload,
  IoMdHome,
  IoMdCreate,
  IoMdArrowBack,
} from "react-icons/io";

function Resume() {
  const userData = useSelector((state) => state.user.userData);
  const componentRef = useRef();
  const navigate = useNavigate();

  if (userData === null) {
    window.location.href = "/";
  }

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const downloadPDF = useCallback(() => {
    window.print();
  }, []);

  const handleEditDetails = () => {
    navigate("/resumeform");
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleBackClick = () => {
    setSelectedTemplate(null);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <header className="header-main">
        {selectedTemplate && (
          <>
            <button onClick={handleBackClick}>
              <IoMdArrowBack /> Back
            </button>
            <button onClick={downloadPDF}>
              <IoMdDownload /> Download
            </button>
          </>
        )}
            <button onClick={() => navigate("/")}>
              <IoMdHome /> Home
            </button>
        <button onClick={handleEditDetails}>
          <IoMdCreate /> Edit Details
        </button>
      </header>

      {selectedTemplate && userData ? (
        <div className="preview" ref={componentRef}>
          {selectedTemplate === 1 && <ResumeCard1 userData={userData} />}
          {selectedTemplate === 2 && <ResumeCard2 userData={userData} />}
          {selectedTemplate === 3 && <ResumeCard3 userData={userData} />}
        </div>
      ) : userData ? (
        <div className="template-previews">
          <div
            className="template-preview"
            onClick={() => handleTemplateClick(1)}
          >
            <ResumeCard1 userData={userData} />
          </div>
          <div
            className="template-preview"
            onClick={() => handleTemplateClick(2)}
          >
            <ResumeCard2 userData={userData} />
          </div>
          <div
            className="template-preview"
            onClick={() => handleTemplateClick(3)}
          >
            <ResumeCard3 userData={userData} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Resume;
