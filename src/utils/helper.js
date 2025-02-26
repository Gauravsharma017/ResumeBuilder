import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const FILE_SIZE = 2 * 1024 * 1024; // 2MB

const educationSchema = Yup.object().shape({
  degree: Yup.string().test(
    "degree-required",
    "Degree is required if any education field is filled",
    function (value) {
      const { institution, year } = this.parent;
      return !institution && !year ? true : !!value.trim();
    }
  ),
  institution: Yup.string().test(
    "institution-required",
    "Institution is required if any education field is filled",
    function (value) {
      const { degree, year } = this.parent;
      return !degree && !year ? true : !!value.trim();
    }
  ),
  year: Yup.string().test(
    "year-required",
    "Year is required if any education field is filled",
    function (value) {
      const { degree, institution } = this.parent;
      return !degree && !institution ? true : !!value.trim();
    }
  ),
});

const workExperienceSchema = Yup.object().shape({
  company: Yup.string().test(
    "company-required",
    "Company is required if any work experience field is filled",
    function (value) {
      const { role, duration, description } = this.parent;
      return !role && !duration && !description ? true : !!value.trim();
    }
  ),
  role: Yup.string().test(
    "role-required",
    "Role is required if any work experience field is filled",
    function (value) {
      const { company, duration, description } = this.parent;
      return !company && !duration && !description ? true : !!value.trim();
    }
  ),
  duration: Yup.string().test(
    "duration-required",
    "Duration is required if any work experience field is filled",
    function (value) {
      const { company, role, description } = this.parent;
      return !company && !role && !description ? true : !!value.trim();
    }
  ),
  description: Yup.string().test(
    "description-required",
    "Description is required if any work experience field is filled",
    function (value) {
      const { company, role, duration } = this.parent;
      return !company && !role && !duration ? true : !!value.trim();
    }
  ),
});

const certificationSchema = Yup.object().shape({
  name: Yup.string().test(
    "name-required",
    "Certification name is required if any certification field is filled",
    function (value) {
      const { authority, year } = this.parent;
      return !authority && !year ? true : !!value.trim();
    }
  ),
  authority: Yup.string().test(
    "authority-required",
    "Authority is required if any certification field is filled",
    function (value) {
      const { name, year } = this.parent;
      return !name && !year ? true : !!value.trim();
    }
  ),
  year: Yup.string().test(
    "year-required",
    "Year is required if any certification field is filled",
    function (value) {
      const { name, authority } = this.parent;
      return !name && !authority ? true : !!value.trim();
    }
  ),
});

const projectSchema = Yup.object().shape({
  name: Yup.string().test(
    "name-required",
    "Project name is required if any project field is filled",
    function (value) {
      const { description, link } = this.parent;
      return !description && !link ? true : !!value.trim();
    }
  ),
  description: Yup.string().test(
    "description-required",
    "Description is required if any project field is filled",
    function (value) {
      const { name, link } = this.parent;
      return !name && !link ? true : !!value.trim();
    }
  ),
  link: Yup.string().test(
    "link-required",
    "Link is required if any project field is filled",
    function (value) {
      const { name, description } = this.parent;
      return !name && !description ? true : !!value.trim();
    }
  ),
});

export const schema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .max(20, "First Name must be at most 20 characters")
    .test(
      "is-not-empty",
      "First Name cannot be empty",
      (value) => value.trim() !== ""
    ),
  lastName: Yup.string()
    .required("Last Name is required")
    .max(20, "Last Name must be at most 20 characters")
    .test(
      "is-not-empty",
      "Last Name cannot be empty",
      (value) => value.trim() !== ""
    ),
  email: Yup.string()
    .required("Email is required")
    .max(35, "Email must be at most 35 characters")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email"
    )
    .test(
      "is-not-empty",
      "Email cannot be empty",
      (value) => value.trim() !== ""
    ),
  contact: Yup.string()
    .required("Contact is required")
    .min(10, "Contact must be at least 10 digits")
    .max(16, "Contact must be at most 16 digits")
    .matches(/^\d+$/, "Only numbers are allowed")
    .test(
      "is-not-empty",
      "Contact cannot be empty",
      (value) => value.trim() !== ""
    ),
  LinkedIn: Yup.string()
    .required("LinkedIn is required")
    .matches(
      /linkedin\.com/,
      "Invalid LinkedIn profile URL"
    )
    .test(
      "is-not-empty",
      "LinkedIn cannot be empty",
      (value) => value.trim() !== ""
    ),
  summary: Yup.string()
    .required("Summary is required")
    .min(60, "Summary must be at most 60 words")
    .max(500, "Summary must be at most 500 words")
    .test(
      "is-not-empty",
      "Summary cannot be empty",
      (value) => value.trim() !== ""
    ),
  title: Yup.string()
    .required("Title is required")
    .test(
      "is-not-empty",
      "Title cannot be empty",
      (value) => value.trim() !== ""
    ),
  profileImage: Yup.string()
    .required("Profile image is required")
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return true;
      const base64Length = value.length - (value.indexOf(",") + 1);
      const padding =
        value.charAt(value.length - 2) === "="
          ? 2
          : value.charAt(value.length - 1) === "="
          ? 1
          : 0;
      const fileSize = (base64Length * 3) / 4 - padding;
      return fileSize <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported file format", (value) => {
      if (!value) return true;
      const format = value.substring(
        "data:image/".length,
        value.indexOf(";base64")
      );
      return SUPPORTED_FORMATS.includes(`image/${format}`);
    }),
  education: Yup.array().of(educationSchema),
  workExperience: Yup.array().of(workExperienceSchema),
  certifications: Yup.array().of(certificationSchema),
  projects: Yup.array().of(projectSchema),
});
