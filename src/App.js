import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import ScrollRestoration from "./components/ScrollRestoration";
import Contact from "./pages/contact";
import AddListing from "./pages/listing/add-listing";
import AllListing from "./pages/listing/all-listing";
import ListingView from "./pages/listing/view-listing";
import UpdateListing from "./pages/listing/update-listing";
import ViewAllListing from "./pages/listing/view-all-listing";
import TPRegistrationListing from "./pages/training-partner/training-partner";
import TCRegistrationListing from "./pages/training-center/training-center";
import TPRegistrationSubmitCertificate from "./pages/training-center/submit-certificate";
import TPRegistrationPayment from "./pages/training-partner/training-partner-payment";
import RegistrationPage from "./pages/registration-page";
import AuditorVerification from "./pages/training-center/auditor-verification";
import ThankYouPage from "./pages/thank-you";

function App() {
  return (
    <div className="text-center font-bold">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-listing" element={<AllListing />} />
        <Route path="/view-listing" element={<ListingView />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/update-listing" element={<UpdateListing />} />
        <Route path="/view-all-listing" element={<ViewAllListing />} />
        {/* Tp & Tc Form */}
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/training-partner" element={<TPRegistrationListing />} />
        <Route path="/training-partner/payment" element={<TPRegistrationPayment />} />
        <Route path="/training-center" element={<TCRegistrationListing />} />
        <Route path="/training-center/submit-certificate" element={<TPRegistrationSubmitCertificate />} />
        <Route path="/training-center/auditor-verification" element={<AuditorVerification />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
      <ScrollRestoration />
    </div>
  );
}

export default App;
