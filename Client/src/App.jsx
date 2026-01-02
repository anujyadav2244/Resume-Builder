import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Padding from "./components/Padding";
import LowerPadding from "./components/LowerPadding";
import Templates from "./pages/Templates";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Resume1 from "./Resume/Resume1";
import Resume2 from "./Resume/Resume2.jsx";
import Resume3 from "./Resume/Resume3.jsx";
import Resume4 from "./Resume/Resume4.jsx";
import Resume5 from "./Resume/Resume5.jsx";
import Resume6 from "./Resume/Resume6.jsx";
import Resume7 from "./Resume/Resume7.jsx";
import Resume8 from "./Resume/Resume8.jsx";
import Resume9 from "./Resume/Resume9.jsx";
import Resume10 from "./Resume/Resume10.jsx";
import AddExpTemplate from "./Resume/AddExpTemplate.jsx";
import OwnerDashboard from "./pages/Owner/OwnerDashboard.jsx";
import ResumeForm from './Resume/AddBeginner.jsx';
import InternResume from "./Resume/InternResume.jsx";
import InternResumeForm from "./Resume/InternResumeForm.jsx";
import { InternResumeProvider } from "./context/InternResumeContext.jsx";

function App() {
  return (
    <InternResumeProvider> {/* ✅ Wrap the entire app */}
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </InternResumeProvider>
  );
}

function Main() {
  const location = useLocation();
  const noNavbarPaths = ['/resume1', '/resume2', '/resume3', '/resume6', '/resume7', '/resume5', '/resume4', '/resume10', '/resume8', '/resume9', '/owner-dashboard', '/owner-login', '/intern-resume'];

  return (
    <>
      {!noNavbarPaths.includes(location.pathname) && (
        <>
          <Navbar />
          <Padding />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/template/add-experienced" element={<AddExpTemplate />} />
        <Route path="/form" element={<ResumeForm />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/resume1" element={<Resume1 />} />
        <Route path="/resume2" element={<Resume2 />} />
        <Route path="/resume3" element={<Resume3 />} />
        <Route path="/resume4" element={<Resume4 />} />
        <Route path="/resume5" element={<Resume5 />} />
        <Route path="/resume6" element={<Resume6 />} />
        <Route path="/resume7" element={<Resume7 />} />
        <Route path="/resume10" element={<Resume10 />} />
        <Route path="/resume8" element={<Resume8 />} />
        <Route path="/resume9" element={<Resume9 />} />
        <Route path="/template/add-fresher" element={<ResumeForm />} />
        <Route path="/owner-login" element={<Login />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/intern-resume" element={<InternResume />} />
        <Route path="/intern-resume-form" element={<InternResumeForm />} /> {/* ✅ Context will be accessible here */}
      </Routes>
      {!noNavbarPaths.includes(location.pathname) && <LowerPadding />}
    </>
  );
}

export default App;
