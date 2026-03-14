import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAdmin, RequireAdminOnly } from "./context/AuthContext";
import { useEffect } from "react";
import { initMockData } from "./data/mockData";

import MainLayout from "./layout/MainLayout";


import Home          from "./pages/Home";
import Announcements from "./pages/Announcements";
import Events        from "./pages/Events";
import Faq           from "./pages/Faq";
import Services      from "./pages/Services";
import Feedback      from "./pages/Feedback";


import Login          from "./pages/Login";
import Signup         from "./pages/Signup";
import Contact        from "./pages/Contact";
import Profile        from "./pages/Profile";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy  from "./pages/PrivacyPolicy";
import Accessibility  from "./pages/Accessibility";

// ── ADMIN PAGES ───────────────────────────────────────────────────────────────
import AdminDashboard      from "./pages/admin/AdminDashboard";
import ManageEvents        from "./pages/admin/ManageEvents";
import ManageUsers         from "./pages/admin/ManageUsers";
import ManageFeedback      from "./pages/admin/ManageFeedback";
import ManageAnnouncements from "./pages/admin/ManageAnnouncements";
import ManageBookings      from "./pages/admin/ManageBookings";

export default function App() {
  useEffect(() => {
    // Clear seed flag so initMockData always re-syncs from server
    localStorage.removeItem("citylink_seeded");
    initMockData();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* MAIN WEBSITE */}
          <Route path="/" element={<MainLayout />}>
            <Route index                  element={<Home />} />
            <Route path="announcements"   element={<Announcements />} />
            <Route path="events"          element={<Events />} />
            <Route path="faq"             element={<Faq />} />
            <Route path="services"        element={<Services />} />
            <Route path="feedback"        element={<Feedback />} />
            <Route path="contact"         element={<Contact />} />
            <Route path="profile"         element={<Profile />} />
            <Route path="terms"           element={<TermsOfService />} />
            <Route path="privacy"         element={<PrivacyPolicy />} />
            <Route path="accessibility"   element={<Accessibility />} />
          </Route>

          {/* AUTH */}
          <Route path="/login"  element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ADMIN (protected) */}
          <Route path="/admin"               element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
          <Route path="/admin/events"        element={<RequireAdmin><ManageEvents /></RequireAdmin>} />
          <Route path="/admin/users"         element={<RequireAdminOnly><ManageUsers /></RequireAdminOnly>} />
          <Route path="/admin/feedback"      element={<RequireAdmin><ManageFeedback /></RequireAdmin>} />
          <Route path="/admin/announcements" element={<RequireAdmin><ManageAnnouncements /></RequireAdmin>} />
          <Route path="/admin/bookings"      element={<RequireAdmin><ManageBookings /></RequireAdmin>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}