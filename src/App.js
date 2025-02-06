import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import ScrollRestoration from "./components/ScrollRestoration";
import Contact from "./pages/contact";
import AddListing from "./pages/add-listing";
import AllListing from "./pages/all-listing";
import ListingView from "./pages/view-listing";
import UpdateListing from "./pages/update-listing";
import ViewAllListing from "./pages/view-all-listing";
import TPRegistrationListing from "./pages/training-and-placement";
import TCRegistrationListing from "./pages/training-center";

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
        <Route path="/training-and-placement" element={<TPRegistrationListing />} />
        <Route path="/training-center" element={<TCRegistrationListing />} />
        <Route path="/update-listing" element={<UpdateListing />} />
        <Route path="/view-all-listing" element={<ViewAllListing />} />
      </Routes>
      <ScrollRestoration />
    </div>
  );
}

export default App;
