import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import AccountsCoursesCards from "../AccountsCourses/AccountsCourses";
import CompetitiveCoachingCards from "../CompetitiveCoaching/CompetitiveCoaching";
import CoachingClassesCards from "../CoachingClasses/CoachingClasses";
import CookingClassesCards from "../CookingClasses/CookingClasses";
import HospitalistCoursesCards from "../HospitalistCourses/HospitalistCourses";
import MonographCoursesCards from "../MonographCourses/MonographCourses";
import LanguagesCoursesCards from "../LanguagesCourses/LanguagesCourses";
import SignUpBanner from "../Signin/Signin";
import WebTechCoursesCards from "./WebDevelp";

const Courses = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 p-6">
        <div
          data-aos="fade-up"
          className="p-4 bg-yellow-100 rounded-lg shadow-md"
        >
          <WebTechCoursesCards />
        </div>
        <div
          data-aos="fade-up"
          className="p-4 bg-blue-100 rounded-lg shadow-md"
        >
          <AccountsCoursesCards />
        </div>
        <div
          data-aos="fade-up"
          className="p-4 bg-green-100 rounded-lg shadow-md"
        >
          <CompetitiveCoachingCards />
        </div>
        <div
          data-aos="fade-up"
          className="p-4 bg-yellow-100 rounded-lg shadow-md"
        >
          <CoachingClassesCards />
        </div>
        <div
          data-aos="fade-up"
          className="p-4 bg-pink-100 rounded-lg shadow-md"
        >
          <CookingClassesCards />
        </div>
        <div
          data-aos="fade-up"
          className="p-4 bg-purple-100 rounded-lg shadow-md"
        >
          <HospitalistCoursesCards />
        </div>
        <div
          data-aos="fade-up"
          className="p-4 bg-teal-100 rounded-lg shadow-md"
        >
          <LanguagesCoursesCards />
        </div>
        <div
          data-aos="fade-up"
          className="p-4 bg-orange-100 rounded-lg shadow-md"
        >
          <MonographCoursesCards />
        </div>
      </div>
      <SignUpBanner />
    </>
  );
};

export default Courses;
