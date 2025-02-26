import React from "react";
import "../utils/Welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome">
      <header className="header-main">
        <img src={"./resumeBuilder.png"} width={150} alt="ResumeBuilder" />
      </header>
      <div className="hero-section">
        <div className="hero-text">
          <h1>Create a Professional Resume in Minutes!</h1>
          <p>
            Choose from beautiful templates, customize easily, and land your
            dream job!
          </p>

          <button onClick={() => navigate("/resumeform")}>Get Start</button>
        </div>
        <img src="./welcome1.jpg" alt="welcome" />
      </div>
    </div>
  );
};

export default Welcome;
