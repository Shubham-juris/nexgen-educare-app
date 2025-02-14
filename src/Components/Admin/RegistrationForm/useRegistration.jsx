import { useState, useEffect } from "react";
import axios from "axios";

const useRegistration = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
    sameAsCurrentAddress: false,
    permanentAddress: "",
    courses: [],
    preferredTiming: "",
    reason: "",
    paymentMethod: "",
    transactionId: "",
    declaration: false,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (type === "checkbox") {
        if (name === "courses") {
          return { ...prev, courses: checked ? [...prev.courses, value] : prev.courses.filter((c) => c !== value) };
        } else if (name === "sameAsCurrentAddress") {
          return { ...prev, sameAsCurrentAddress: checked, permanentAddress: checked ? prev.address : "" };
        } else {
          return { ...prev, [name]: checked };
        }
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const isFormCompleted = () => {
    const transactionIdValid = formData.paymentMethod === "Cash" || formData.transactionId;
    return formData.firstName && formData.fatherName && formData.motherName && formData.dob && formData.gender &&
      formData.contactNumber && formData.email && formData.address && formData.courses.length > 0 &&
      formData.preferredTiming && formData.reason && formData.paymentMethod && transactionIdValid && formData.declaration;
  };

  const handleSubmit = async () => {
    if (!isFormCompleted()) return alert("Please fill all required fields.");

    try {
      await axios.post("http://localhost:3000/save-registration", formData);
      alert("Registration Successful!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form.");
    }
  };

  return { formData, handleChange, handleSubmit, isFormCompleted, courses };
};

export default useRegistration;
