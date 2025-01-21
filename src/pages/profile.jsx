/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../assets/css/style.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import axiosInstance from "../js/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User_img from "../assets/user-profile.png";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingOne, setLoadingOne] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    address_line_1: " ",
    address_line_2: " ",
    city: "",
    state: "",
    pin_code: "",
    profilePhoto: null,
    profile_image: null,
  });

  const [isLogin, setIsLogin] = useState(false);

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get("/account/profile");
      const userData = response.data.data;
      if (userData) {
        const addressData = userData.user.address || {};

        setFormData((prevData) => ({
          ...prevData,
          first_name: userData.user.first_name || "",
          last_name: userData.user.last_name || "",
          mobile: userData.user.mobile || "",
          email: userData.user.email || "",
          address_line_1: addressData.address_line_1 || "Enter Address",
          address_line_2: addressData.address_line_2 || "",
          city: addressData.city || "",
          state: addressData.state || "",
          country: addressData.country || "",
          pin_code: addressData.pin_code || "",
          profilePhoto:
            "https://files.fggroup.in/" + (userData.user.profile_image || ""),
        }));
      }
    } catch (error) {
      console.error("Error in getUserData:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = async (e) => {
    setLoadingOne(true);
    const file = e.target.files[0];

    const formDataForUpload = new FormData();
    formDataForUpload.append("files", file);

    try {
      const response = await axiosInstance.post(
        "/file-upload",
        formDataForUpload
      );
      const photoUrl = response.data.data.fileURLs[0];

      setFormData((prevData) => ({
        ...prevData,
        profilePhoto: "https://files.fggroup.in/" + photoUrl,
        profile_image: photoUrl,
      }));

      await axiosInstance.post("/account/update-profile", {
        profile_image: photoUrl,
      });

      toast.success("Profile photo uploaded successfully");
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Error uploading profile photo");
    }
    setLoadingOne(false);
  };

  // const handleRemovePhoto = async () => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     profilePhoto: null,
  //     profile_image: null,
  //   }));

  //   try {
  //     await axiosInstance.post("/account/update-profile", {
  //       profile_image: null,
  //     });
  //     toast.success("Profile photo removed successfully");
  //   } catch (error) {
  //     console.error("Error removing photo:", error);
  //     toast.error("Error removing profile photo");
  //   }
  // };

  const updateData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/account/update-profile",
        formData
      );
      if (response.data.data) {
        getUserData();
        toast.success("User data updated successfully");
      } else {
        console.error("Failed to update user data");
        toast.error("Error updating user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Error updating user data");
    }
    setIsLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateData();
  };

  // const breadcrumbs = [
  //   <Link underline="hover" key="1" color="inherit" href="/">
  //     Home
  //   </Link>,
  //   <Link underline="hover" key="2" color="inherit">
  //     User Option
  //   </Link>,
  //   <Typography key="3" color="text.primary">
  //     Profile
  //   </Typography>,
  // ];

  const handleLogout = async () => {
    try {
      localStorage.removeItem("authorization");
      localStorage.removeItem("user_info");
      toast.success("Logout Successful!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error in handleAgreeAndConfirm:", error);

      toast.error("Logout Failed. Please try again.");
    }
  };

  useEffect(() => {
    const LoginToken = localStorage.getItem("authorization");
    if (LoginToken) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
      />
      <Helmet>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          User Profile Page - Manage Your Account & Personal Information
        </title>
        <meta
          name="description"
          content="Access your profile to update personal information, manage account settings, and customize your preferences for a seamless user experience."
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="images/favicon.ico"
        />
        <link href="css/styles.css" rel="stylesheet" />
      </Helmet>
      <>
        {loading && (
          <div className="loader-background">
            <div className="spinner-box">
              <div className="three-quarter-spinner"></div>
            </div>
          </div>
        )}
        <Header />
        <div id="main-wrapper-profile">
          <div className="clearfix" />
          <div className="goodup-dashboard-wrap px-4 py-5">
            <div className="goodup-dashboard-content text-start">
              {isLogin ? (
                <div className="dashboard-widg-bar d-block">
                  <div className="row">
                    <div className="col-xl-12 col-lg-9 col-md-8 col-sm-12">
                      <form className="submit-form">
                        <div className="dashboard-list-wraps bg-white rounded mb-4 shadow-sm">
                          <div className="dashboard-list-wraps-head br-bottom py-3 px-3">
                            <div className="dashboard-list-wraps-flx">
                              <h4 className="mb-0 ft-medium fs-md text-dark">
                                <i className="fa fa-user-check me-2 theme-cl fs-sm" />
                                My Profile
                              </h4>
                            </div>
                          </div>
                          <div className="dashboard-list-wraps-body py-3 px-3">
                            <div className="row">
                              <div className="d-flex">
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-12">
                                      <div className="form-group">
                                        <label className="mb-1">First Name</label>
                                        <input
                                          type="text"
                                          className="form-control rounded"
                                          placeholder="Enter First Name"
                                          name="first_name"
                                          value={formData.first_name}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12">
                                      <div className="form-group">
                                        <label className="mb-1">Last Name</label>
                                        <input
                                          type="text"
                                          className="form-control rounded"
                                          placeholder="Enter Last Name"
                                          name="last_name"
                                          value={formData.last_name}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12">
                                      <div className="form-group">
                                        <label className="mb-1">Email ID</label>
                                        <input
                                          type="text"
                                          className="form-control rounded"
                                          placeholder="Enter Email ID"
                                          name="email"
                                          value={formData.email}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12">
                                      <div className="form-group">
                                        <label className="mb-1">Mobile</label>
                                        <input
                                          type="text"
                                          className="form-control rounded"
                                          placeholder="Enter Mobile"
                                          name="mobile"
                                          value={formData.mobile}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="col-12 order-xl-last order-lg-last order-md-last">
                                    <div
                                      className="d-md-flex justify-content-center align-items-center"
                                      style={{ marginBottom: "20px" }}
                                    >
                                      <div className="d-flex flex-column align-items-center">
                                        <div className="dash-figure-thumb position-relative mb-3">
                                          <img
                                            src={formData.profilePhoto}
                                            className="img-fluid mx-auto rounded-circle"
                                            alt=""
                                            onError={(e) => {
                                              e.target.src = User_img;
                                            }}
                                          />
                                          {loadingOne && (
                                            <div className="w-100 d-flex justify-content-center position-absolute">
                                              <div className="spinner-box spinner-width">
                                                <div className="three-quarter-spinner three-quarter-spinner-width"></div>
                                              </div>
                                            </div>
                                          )}
                                        </div>

                                        <input
                                          accept="image/*"
                                          style={{ display: "none" }}
                                          id="profile-photo-upload"
                                          type="file"
                                          onChange={handlePhotoChange}
                                        />
                                        <label
                                          className="upload-photo-btn"
                                          htmlFor="profile-photo-upload"
                                        >
                                          <div className="Uploadphoto">
                                            <span>
                                              <i className="fas fa-upload" /> Upload Photo
                                            </span>
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group">
                                  <label className="mb-1">Block No/Building No</label>
                                  <input
                                    type="text"
                                    className="form-control rounded"
                                    placeholder="Enter Block No/Building No"
                                    name="address_line_1"
                                    value={formData.address_line_1}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>

                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group">
                                  <label className="mb-1">Street/Colony Name</label>
                                  <input
                                    type="text"
                                    className="form-control rounded"
                                    placeholder="Enter Street/Colony Name"
                                    name="address_line_2"
                                    value={formData.address_line_2}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>

                              <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
                                <div className="form-group">
                                  <label className="mb-1">City</label>
                                  <input
                                    type="text"
                                    className="form-control rounded"
                                    placeholder="Enter City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>

                              <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
                                <div className="form-group">
                                  <label className="mb-1">State</label>
                                  <input
                                    type="text"
                                    className="form-control rounded"
                                    placeholder="Enter State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>

                              <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
                                <div className="form-group">
                                  <label className="mb-1">Pin Code</label>
                                  <input
                                    type="text"
                                    className="form-control rounded"
                                    placeholder="Enter Pin Code"
                                    name="pin_code"
                                    value={formData.pin_code}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-4">
                                <div
                                  className="upload-photo-btn"
                                  onClick={handleSubmit}
                                >
                                  <div className="Uploadphoto">
                                  <i class="fa fa-check mr-2" aria-hidden="true"></i>
                                    <span>
                                    Update
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="dashboard-widg-bar d-block">
                  <div className="row">
                    <div className="col-12 d-flex flex-column align-items-center">
                      <h4>You need to log in first.</h4>
                      <Link to="/login" className="add-list-btn mt-3">
                        <i className="lni lni-power-switch me-2" />
                        Log In
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <a id="tops-button" className="top-scroll" title="Back to top" href="#">
            <i className="ti-arrow-up" />
          </a>
        </div>

        <Footer />
      </>
      <ToastContainer />

      {isLoading && (
        <div className="loader-background">
          <div className="spinner-box">
            <div className="three-quarter-spinner"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
