import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Announcements from "./pages/Announcements";
import Events from "./pages/Events";
import Faq from "./pages/Faq";
import Services from "./pages/Services";
import Feedback from "./pages/Feedback";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageFeedback from "./pages/admin/ManageFeedback";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* MAIN WEBSITE */}
        <Route path="/" element={<MainLayout />}>

          <Route index element={<Home />} />

          <Route path="announcements" element={<Announcements />} />
          <Route path="events" element={<Events />} />
          <Route path="faq" element={<Faq />} />
          <Route path="services" element={<Services />} />
          <Route path="feedback" element={<Feedback />} />

          {/* ADMIN PAGES INSIDE MAIN SITE */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/events" element={<ManageEvents />} />
          <Route path="admin/users" element={<ManageUsers />} />
          <Route path="admin/feedback" element={<ManageFeedback />} />

        </Route>

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
}