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
      </Routes>
      <ScrollRestoration />
    </div>
  );
}

export default App;
