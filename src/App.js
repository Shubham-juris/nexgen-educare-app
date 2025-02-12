import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Sidebar from './Components/Admin/Deshboard/Sidebar';
import Login from './Components/Login&Signup/Login';
import StudentDeshboard from './Components/Student/StudentDeshboard/StudentDeshboard';
import Adminlogin from './Components/Login&Signup/Adminlogin';
import Library from './Components/Admin/Library/Library';
import StudentData from './Components/Admin/Student-data/StudentData';
import TeacherData from './Components/Admin/Teacher-data/TeacherData';
import RegistrationForm from './Components/Admin/RegistrationForm/RegistrationForm';
import About from './Components/About-Us/About';
import Courses from './Components/Courses/WebTech/Courses';
import HeroSection from './Components/Hero/HeroSection';
import ContactUs from './Components/Contact-Us/Contact';
import Notice from './Components/Admin/Notification/Notice';
import CreateNotice from './Components/Admin/Create-notice/CreateNotice';
import MockTestCards from './Components/Student/MockTest/MockTest';
import MidTerm from './Components/Student/MidTermExam/MidTerm';
import FinalExam from './Components/Student/FinalExam/FinalExam';
import Result from './Components/Student/Marks/Result';
import CoursesCards from './Components/Student/Courses/Courses';
import FeeDetails from './Components/Student/Fee/Fee';
import StudentList from './Components/Admin/RegistrationForm/StudentList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path='/'
          element={
            <>
              <Navbar />
              <HeroSection /> <Footer />
            </>
          }
        />
        <Route
          path='/Aboutus'
          element={
            <>
              <Navbar />
              <About /> <Footer />
            </>
          }
        />
        <Route
          path='/Courses'
          element={
            <>
              <Navbar />
              <Courses /> <Footer />
            </>
          }
        />
        <Route
          path='/contactus'
          element={
            <>
              <Navbar />
              <ContactUs /> <Footer />
            </>
          }
        />

        {/* Auth Routes */}
        <Route
          path='/login'
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path='/Adminlogin' element={<Adminlogin />} />

        {/* Protected Student Dashboard Routes */}
        <Route
          path='/Sdashboard'
          element={
            isLoggedIn ? <StudentDeshboard /> : <Navigate to='/login' replace />
          }
        >
          <Route path='mocktest' element={<MockTestCards />} />
          <Route path='MidTerm' element={<MidTerm />} />
          <Route path='FinalExam' element={<FinalExam />} />
          <Route path='Result' element={<Result />} />
          <Route path='CoursesCards' element={<CoursesCards />} />
          <Route path='fee' element={<FeeDetails />} />
          <Route path='Notice' element={<Notice />} />
        </Route>

        {/* Admin Dashboard Routes with Sidebar */}
        <Route path='/Sidebar' element={<Sidebar />}>
          <Route path='StudentData' element={<StudentData />} />
          <Route path='TeacherData' element={<TeacherData />} />
          <Route path='Library' element={<Library />} />
          <Route path='RegistrationForm' element={<RegistrationForm />} />
          <Route path='Notice' element={<Notice />} />
          <Route path='CreateNotice' element={<CreateNotice />} />
          <Route path='StudentList' element={<StudentList />} />
        </Route>

        {/* Fallback Route for 404 */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
}

export default App;
