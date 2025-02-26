import React, { memo, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, clearUserData } from "../store/userSlice";

const DataForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    LinkedIn: "",
    contact: "",
    summary: "",
    title: "",
    education: [{ degree: "", institution: "", year: "" }],
    workExperience: [{ company: "", role: "", duration: "", description: "" }],
    skills: [""],
    certifications: [{ name: "", authority: "", year: "" }],
    projects: [{ name: "", description: "", link: "" }],
    languages: [""],
    profileImage: null,
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: userData || initialValue,
  });

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: "education" });
  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({ control, name: "workExperience" });
  const {
    fields: skillsFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: "skills" });
  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({ control, name: "certifications" });
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control, name: "projects" });
  const {
    fields: langFields,
    append: appendLang,
    remove: removeLang,
  } = useFieldArray({ control, name: "languages" });

  const onSubmit = (data) => {
    console.log("Form Data:>>>>>>", data);
    dispatch(setUserData(data));
    navigate("/userCard");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    reset(initialValue);
    dispatch(clearUserData());
  };

  return (
    <>
      <header className="header-main">
        <img
          src={"./resumeBuilder.png"}
          width={150}
          alt="ResumeBuilder"
          onClick={() => navigate("/resumeform")}
        />
      </header>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-section">
          <div className="form-item">
            <label>First Name</label>
            <input
              maxLength={20}
              placeholder="First Name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="error">{errors.firstName.message}</p>
            )}
          </div>
          <div className="form-item">
            <label>Last Name</label>
            <input
              maxLength={20}
              placeholder="Last Name"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="error">{errors.lastName.message}</p>
            )}
          </div>
          <div className="form-item">
            <label>Title</label>
            <input placeholder="Title" {...register("title")} />
            {errors.title && <p className="error">{errors.title.message}</p>}
          </div>
          <div className="form-item">
            <label>Summary</label>
            <textarea placeholder="Summary" {...register("summary")} />
            {errors.summary && (
              <p className="error">{errors.summary.message}</p>
            )}
          </div>
          <div className="form-item">
            <label>Email</label>
            <input placeholder="Email" type="email" {...register("email")} />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="form-item">
            <label>LinkedIn URL</label>
            <input
              placeholder="LinkedIn Profile URL"
              {...register("LinkedIn")}
            />
            {errors.LinkedIn && (
              <p className="error">{errors.LinkedIn.message}</p>
            )}
          </div>
          <div className="form-item">
            <label>Contact</label>
            <input
              maxLength={13}
              placeholder="Contact"
              {...register("contact")}
            />
            {errors.contact && (
              <p className="error">{errors.contact.message}</p>
            )}
          </div>
          <div className="form-item">
            <label>Profile Image</label>
            <input type="file" onChange={handleFileChange} />
            {errors.profileImage && (
              <p className="error">{errors.profileImage.message}</p>
            )}
          </div>
        </div>

        <div className="form-section">
          <div className="form-item">
            <label>Education</label>
            {educationFields.map((field, index) => (
              <div key={field.id} className="education-item">
                <input
                  placeholder="Degree"
                  {...register(`education.${index}.degree`)}
                />
                <input
                  placeholder="Institution"
                  {...register(`education.${index}.institution`)}
                />
                <input
                  placeholder="Year of Graduation"
                  {...register(`education.${index}.year`)}
                />
                <span
                  className="remove-icon"
                  onClick={() => removeEducation(index)}
                >
                  <IoMdRemoveCircleOutline size={20} color="red" />
                </span>
              </div>
            ))}
            <div className="add-btn-container">
              <button
                type="button"
                onClick={() =>
                  appendEducation({ degree: "", institution: "", year: "" })
                }
                className="add-btn"
              >
                Add <IoMdAddCircleOutline size={20} color="white" />
              </button>
            </div>
          </div>

          <div className="form-item">
            <label>Work Experience</label>
            {workFields.map((field, index) => (
              <div key={field.id} className="education-item">
                <input
                  placeholder="Company"
                  {...register(`workExperience.${index}.company`)}
                />
                <input
                  placeholder="Role"
                  {...register(`workExperience.${index}.role`)}
                />
                <input
                  placeholder="Duration"
                  {...register(`workExperience.${index}.duration`)}
                />
                <input
                  placeholder="Description"
                  {...register(`workExperience.${index}.description`)}
                />
                <span className="remove-icon" onClick={() => removeWork(index)}>
                  <IoMdRemoveCircleOutline size={20} color="red" />
                </span>
              </div>
            ))}
            <div className="add-btn-container">
              <button
                type="button"
                onClick={() =>
                  appendWork({
                    company: "",
                    role: "",
                    duration: "",
                    description: "",
                  })
                }
                className="add-btn"
              >
                Add <IoMdAddCircleOutline size={20} color="white" />
              </button>
            </div>
          </div>

          <div className="form-item">
            <label>Skills</label>
            {skillsFields.map((field, index) => (
              <div key={field.id} className="education-item">
                <input placeholder="Skill" {...register(`skills.${index}`)} />
                <span
                  className="remove-icon"
                  onClick={() => removeSkill(index)}
                >
                  <IoMdRemoveCircleOutline size={20} color="red" />
                </span>
              </div>
            ))}
            <div className="add-btn-container">
              <button
                type="button"
                onClick={() => appendSkill("")}
                className="add-btn"
              >
                Add <IoMdAddCircleOutline size={20} color="white" />
              </button>
            </div>
          </div>

          <div className="form-item">
            <label>Certifications</label>
            {certFields.map((field, index) => (
              <div key={field.id} className="education-item">
                <input
                  placeholder="Certification Name"
                  {...register(`certifications.${index}.name`)}
                />
                <input
                  placeholder="Authority"
                  {...register(`certifications.${index}.authority`)}
                />
                <input
                  placeholder="Year"
                  {...register(`certifications.${index}.year`)}
                />
                <span className="remove-icon" onClick={() => removeCert(index)}>
                  <IoMdRemoveCircleOutline size={20} color="red" />
                </span>
              </div>
            ))}
            <div className="add-btn-container">
              <button
                type="button"
                onClick={() =>
                  appendCert({ name: "", authority: "", year: "" })
                }
                className="add-btn"
              >
                Add <IoMdAddCircleOutline size={20} color="white" />
              </button>
            </div>
          </div>

          <div className="form-item">
            <label>Projects</label>
            {projectFields.map((field, index) => (
              <div key={field.id} className="education-item">
                <input
                  placeholder="Project Name"
                  {...register(`projects.${index}.name`)}
                />
                <input
                  placeholder="Description"
                  {...register(`projects.${index}.description`)}
                />
                <input
                  placeholder="Link"
                  {...register(`projects.${index}.link`)}
                />
                <span
                  className="remove-icon"
                  onClick={() => removeProject(index)}
                >
                  <IoMdRemoveCircleOutline size={20} color="red" />
                </span>
              </div>
            ))}
            <div className="add-btn-container">
              <button
                type="button"
                onClick={() =>
                  appendProject({ name: "", description: "", link: "" })
                }
                className="add-btn"
              >
                Add <IoMdAddCircleOutline size={20} color="white" />
              </button>
            </div>
          </div>

          <div className="form-item">
            <label>Languages</label>
            {langFields.map((field, index) => (
              <div key={field.id} className="education-item">
                <input
                  placeholder="Language"
                  {...register(`languages.${index}`)}
                />
                <span className="remove-icon" onClick={() => removeLang(index)}>
                  <IoMdRemoveCircleOutline size={20} color="red" />
                </span>
              </div>
            ))}
            <div className="add-btn-container">
              <button
                type="button"
                onClick={() => appendLang("")}
                className="add-btn"
              >
                Add <IoMdAddCircleOutline size={20} color="white" />
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="reset-btn">
            Reset
          </button>
        </div>
      </form>{" "}
    </>
  );
};

export default memo(DataForm);
