import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import ScrollRestoration from "./components/ScrollRestoration";
import MotionEffects from "./components/MotionEffects";
import Contact from "./pages/contact";
import AddListing from "./pages/listing/add-listing";
import AllListing from "./pages/listing/all-listing";
import ListingView from "./pages/listing/view-listing";
import UpdateListing from "./pages/listing/update-listing";
import ViewAllListing from "./pages/listing/view-all-listing";
import TPRegistrationListing from "./pages/training-partner/training-partner";
import TCRegistrationListing from "./pages/training-center/training-center";
import TrainingPartnerPage from "./pages/training-partner/TrainingPartnerPage";
import TrainingCenterPage from "./pages/training-center/TrainingCenterPage";
import RegistrationPage from "./pages/registration-page";
import TPRegistrationPayment from "./pages/training-partner/training-partner-payment";
import TCPaymentPage from "./pages/training-center/training-center-payment";
import AuditorVerification from "./pages/training-center/auditor-verification";
import ThankYouPage from "./pages/thank-you";

function App() {
  const location = useLocation();

  return (
    <div className="text-center font-bold">
      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/all-listing" element={<AllListing />} />
          <Route path="/view-listing" element={<ListingView />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-listing" element={<AddListing />} />
          <Route path="/update-listing" element={<UpdateListing />} />
          <Route path="/view-all-listing" element={<ViewAllListing />} />
          {/* Informational TP & TC Pages */}
          <Route path="/training-partner-program" element={<TrainingPartnerPage />} />
          <Route path="/training-partner-details" element={<TrainingPartnerPage />} />
          <Route path="/training-partner-info" element={<TrainingPartnerPage />} />
          <Route path="/training-center-program" element={<TrainingCenterPage />} />
          <Route path="/training-center-details" element={<TrainingCenterPage />} />
          <Route path="/training-center-info" element={<TrainingCenterPage />} />
          {/* Tp & Tc Form & Registration Funnel */}
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/training-partner" element={<TPRegistrationListing />} />
          <Route path="/training-partner/payment" element={<TPRegistrationPayment />} />
          <Route path="/training-center" element={<TCRegistrationListing />} />
          <Route path="/training-center/payment" element={<TCPaymentPage />} />
          <Route path="/training-center/auditor-verification" element={<AuditorVerification />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </div>
      <ScrollRestoration />
      <MotionEffects />
    </div>
  );
}

export default App;
