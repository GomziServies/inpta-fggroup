import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../../assets/css/style.css";
import Header from "../../components/Header";
import axiosInstance, { inptaListingAxiosInstance } from "../../js/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "rsuite/dist/rsuite.min.css";
import { Modal } from "react-bootstrap";
import Cropper from "react-easy-crop";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProgressBar from "../../components/progress-bar/registration-progress-bar";

const TPRegistrationListing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [mobileNumber, setMobileNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [showOtp, setShowOtp] = React.useState(false);

  const handleLoginSubmit = async () => {
    try {
      const response = await axiosInstance.post("/account/authorization", {
        mobile: mobileNumber,
        service: "INPTA-LISTING",
      });

      if (response.data && response.data.data && response.data.data.OTP) {
        setShowOtp(true);
        setOtpCode(response.data.data.OTP);
        toast.success("OTP Sent! You will receive an OTP shortly.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error in handleLoginSubmit:", error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        "/account/authorization/verify",
        {
          mobile: mobileNumber,
          otp: otpCode,
        }
      );

      const auth = response.data.data.authorization;

      if (response.status === 200) {
        localStorage.setItem("authorization", auth);
        getUserData();
        toast.success("OTP Verified!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error in handleOtpSubmit:", error);
    }
  };

  const [formData, setFormData] = useState({
    description: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    country: "",
    state: "",
    pin_code: "",
    contactNumber: "",
    whatsappNumber: "",
    direction_link: "",
    website: "",
    email: "",
  });
  const [personalDetailsData, setPersonalDetailsData] = useState({
    work_experience: "",
    qualification: "",
  });
  const [userUpdateData, setUserUpdateData] = useState({});
  const [isDetailsCorrect, setIsDetailsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingOne, setLoadingOne] = useState(false);
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/account/profile");
      const userData = response.data.data;
      if (userData) {
        setUserData(userData.user);
      }
    } catch (error) {
      console.error("Error in getUserData:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  // ----------------------------------------------------------------------------------

  const [aadhaarPreview, setAadhaarPreview] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [profileImageSrc, setProfileImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [profileCrop, setProfileCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [profileZoom, setProfileZoom] = useState(1);
  const [show, setShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);
  const [aadhaarPhoto, setAadhaarPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const onCropComplete = useCallback((croppedArea, aadhaarPhoto, context) => {
    if (context === "aadhaar") {
      setAadhaarPhoto(aadhaarPhoto);
      handleAadhaarChange(aadhaarPhoto);
    } else if (context === "profile") {
      setProfilePhoto(aadhaarPhoto);
      handleProfileChange(aadhaarPhoto);
    }
  }, []);

  const handleSelectAadhaar = () => {
    const fileInput = document.getElementById("aadhaarInput");
    fileInput.click();
  };

  const handleSelectProfile = () => {
    const fileInput = document.getElementById("profileInput");
    fileInput.click();
  };

  const handleAadhaarChange = (event) => {
    const file = aadhaarPhoto;

    if (file instanceof File) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2 MB!");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setAadhaarPreview(previewUrl);
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          aadhaar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileChange = (event) => {
    const file = profilePhoto;

    if (file instanceof File) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2 MB!");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setProfilePreview(previewUrl);
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profile: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (context) => {
    if (imageSrc && aadhaarPhoto) {
      try {
        const croppedImg = await getCroppedImg(imageSrc, aadhaarPhoto);
        if (context === "aadhaar") {
          setAadhaarPreview(croppedImg);
          setAadhaarPhoto(croppedImg);
          setShow(false);
        }
      } catch (error) {
        console.error("Error cropping the image:", error);
      }
    }
  };

  const handleProfileCropComplete = async (context) => {
    if (profileImageSrc && profilePhoto) {
      try {
        const croppedImg = await getCroppedImg(profileImageSrc, profilePhoto);
        if (context === "profile") {
          setProfilePreview(croppedImg);
          setProfilePhoto(croppedImg);
          setProfileShow(false);
        }
      } catch (error) {
        console.error("Error cropping the image:", error);
      }
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleProfileClose = () => {
    setProfileShow(false);
  };

  const handleCropAadhaarChange = (event) => {
    setLoadingOne(true);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShow(true);
      };
      reader.readAsDataURL(file);
    }
    setLoadingOne(false);
  };

  const handleCropProfileChange = (event) => {
    setLoadingOne(true);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImageSrc(reader.result);
        setProfileShow(true);
      };
      reader.readAsDataURL(file);
    }
    setLoadingOne(false);
  };

  // ----------------------------------------------------------------------------------

  const handleInputChange = (field, value) => {
    if (field === "services" || field === "tags") {
      setFormData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };

  const handlePersonalInputChange = (field, value) => {
    setPersonalDetailsData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleUserInputChange = (field, value) => {
    setUserUpdateData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const uploadAadhaar = async () => {
    try {
      let croppedBlob = aadhaarPhoto;
      if (typeof aadhaarPhoto === "string") {
        const byteString = atob(aadhaarPhoto.split(",")[1]);
        const mimeString = aadhaarPhoto
          .split(",")[0]
          .split(":")[1]
          .split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        croppedBlob = new Blob([ab], { type: mimeString });
      }

      if (croppedBlob) {
        const aadhaarFormData = new FormData();
        aadhaarFormData.append("files", croppedBlob);

        const aadhaarResponse = await axiosInstance.post(
          "/file-upload",
          aadhaarFormData
        );

        const aadhaarUrl = aadhaarResponse.data.data.fileURLs[0];
        return aadhaarUrl;
      }
    } catch (error) {
      console.error("Error uploading Aadhaar file:", error);
      toast.error("Error uploading Aadhaar file. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      throw error;
    }
  };

  const uploadProfile = async () => {
    try {
      let croppedBlob = profilePhoto;
      if (typeof profilePhoto === "string") {
        const byteString = atob(profilePhoto.split(",")[1]);
        const mimeString = profilePhoto
          .split(",")[0]
          .split(":")[1]
          .split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        croppedBlob = new Blob([ab], { type: mimeString });
      }

      if (croppedBlob) {
        const profileFormData = new FormData();
        profileFormData.append("files", croppedBlob);

        const aadhaarResponse = await axiosInstance.post(
          "/file-upload",
          profileFormData
        );

        const aadhaarUrl = aadhaarResponse.data.data.fileURLs[0];
        return aadhaarUrl;
      }
    } catch (error) {
      console.error("Error uploading Aadhaar file:", error);
      toast.error("Error uploading Aadhaar file. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      throw error;
    }
  };

  const updateData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/account/update-profile",
        userUpdateData
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
    setIsLoading(true);
    try {
      const aadhaarUrl = await uploadAadhaar();
      const profileUrl = await uploadProfile();

      const postData = {
        description: formData.description,
        profile_photo: profileUrl,
        aadhaar_card: aadhaarUrl,
        personal_details: {
          work_experience: personalDetailsData.work_experience,
          qualification: personalDetailsData.qualification,
        },
        locations: [
          {
            location_name: formData.branch,
            address_line_1: formData.address_line_1,
            address_line_2: formData.address_line_2,
            city: formData.city,
            state: formData.state,
            country: "india",
            pin_code: formData.pin_code,
            direction_link: formData.direction_link,
            contact: {
              contact_type: "mobile",
              value: formData.contactNumber,
            },
          },
        ],
        contacts: [
          {
            contact_type: "email",
            value: formData.email,
          },
          {
            contact_type: "website",
            value: formData.website,
          },
          {
            contact_type: "whatsapp",
            value: formData.whatsappNumber,
          },
        ],
      };

      const result = await inptaListingAxiosInstance.post(
        "/create-tp-listing",
        postData
      );
      updateData();

      if (result?.data?.data) {
        toast.success("Listing created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        localStorage.setItem("tp_listing_id", result?.data?.data?._id);

        // setTimeout(() => {
        //   window.location.href = "/training-partner/payment";
        // }, 1500);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading files:", error);
      setIsLoading(false);
      toast.error(error?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Add Your Listing - Get Featured on Our Platform</title>
        <meta
          name="description"
          content="Add your inpta to our platform and boost visibility. Showcase your services, attract customers, and grow your brand with our easy listing process!"
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
        <div id="main-wrapper">
          <Header />
          <div className="clearfix" />
          <div className="container-fluid bg-registration">
            <div className="container">
              <div className="goodup-dashboard-wrap gray px-md-4 px-0 py-5 add-listing-page margintop">
                <div className="goodup-dashboard-content text-start">
                  <div className="dashboard-widg-bar d-block">
                    <div className="row">
                      <ProgressBar pendingData="first" />
                      <div className="col-12 mb-4 text-center">
                        <h2 className="mb-0 ft-medium fs-md">
                          TP Registration
                        </h2>
                      </div>
                      <div className="col-xl-12 col-md-12 col-sm-12">
                        <div className="submit-form">
                          <div className="dashboard-list-wraps bg-white rounded mb-4">
                            <div className="dashboard-list-wraps-head br-bottom py-3 px-3">
                              <div className="dashboard-list-wraps-flx">
                                <h4 className="mb-0 ft-medium fs-md">
                                  <i className="fa fa-file me-2 theme-cl fs-sm" />
                                  Mobile Verification
                                </h4>
                              </div>
                            </div>
                            <div className="dashboard-list-wraps-body bg-white py-3 px-3">
                              <div className="row align-items-end">
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">Mobile No.</label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter Mobile No."
                                      onChange={(e) =>
                                        setMobileNumber(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>

                                {showOtp ? (
                                  <>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                      <div className="form-group">
                                        <label className="mb-1">OTP</label>
                                        <input
                                          type="text"
                                          className="form-control rounded"
                                          placeholder="Enter OTP"
                                          value={otpCode}
                                          onChange={(e) =>
                                            setOtpCode(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                      <button
                                        className="btn theme-bg rounded text-light add-listing-btn"
                                        onClick={handleOtpSubmit}
                                      >
                                        Submit OTP
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                    <button
                                      className="btn theme-bg rounded text-light add-listing-btn"
                                      onClick={handleLoginSubmit}
                                    >
                                      Send OTP
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="dashboard-list-wraps bg-white rounded mb-4">
                            <div className="dashboard-list-wraps-head br-bottom py-3 px-3">
                              <div className="dashboard-list-wraps-flx">
                                <h4 className="mb-0 ft-medium fs-md">
                                  <i className="fa fa-file me-2 theme-cl fs-sm" />
                                  Personal Info
                                </h4>
                              </div>
                            </div>
                            <div className="dashboard-list-wraps-body bg-white py-3 px-3">
                              <div className="row">
                                <div className="col-12">
                                  <label className="mb-1">
                                    Upload Profile photo
                                  </label>

                                  {profilePreview ? (
                                    <div className="position-relative">
                                      {loadingOne && (
                                        <div className="w-100 d-flex justify-content-center position-absolute">
                                          <div class="spinner-box spinner-width">
                                            <div class="three-quarter-spinner three-quarter-spinner-width"></div>
                                          </div>
                                        </div>
                                      )}
                                      <img
                                        src={profilePreview}
                                        alt="Profile Preview"
                                        id="single-profile"
                                        style={{
                                          width: "100%",
                                          maxHeight: "150px",
                                          objectFit: "contain",
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      />
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={handleSelectProfile}
                                        >
                                          Change Profile
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      id="single-profile"
                                      onClick={handleSelectProfile}
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to upload profile</p>
                                    </div>
                                  )}

                                  <label className="smart-text">
                                    Maximum file size: 2 MB.
                                  </label>
                                  <input
                                    id="profileInput"
                                    type="file"
                                    className="d-none"
                                    accept="image/*"
                                    onChange={handleCropProfileChange}
                                  />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">First Name</label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter First Name"
                                      value={
                                        userUpdateData.first_name ||
                                        userData.first_name
                                      }
                                      onChange={(e) =>
                                        handleUserInputChange(
                                          "first_name",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">Last Name</label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter Last Name"
                                      value={
                                        userUpdateData.last_name ||
                                        userData.last_name
                                      }
                                      onChange={(e) =>
                                        handleUserInputChange(
                                          "last_name",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">Contact No.</label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter Contact No."
                                      value={formData.contactNumber}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "contactNumber",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">WhatsApp No.</label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter WhatsApp No."
                                      value={formData.whatsappNumber}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "whatsappNumber",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">Email</label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter Email"
                                      value={formData.email}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "email",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">Website</label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter Website"
                                      value={formData.website}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "website",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">
                                      Current Work Experience
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter Work Experience"
                                      value={
                                        personalDetailsData.work_experience
                                      }
                                      onChange={(e) =>
                                        handlePersonalInputChange(
                                          "work_experience",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">
                                      Education Qualification
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter Qualification"
                                      value={personalDetailsData.qualification}
                                      onChange={(e) =>
                                        handlePersonalInputChange(
                                          "qualification",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                {/* <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">
                                      Upload Aadhaar Card
                                    </label>
                                    <input
                                      type="file"
                                      className="form-control rounded"
                                      placeholder="Enter Qualification"
                                      value={showAadhaar}
                                      onChange={handleCropAadhaarChange}
                                      // onChange={(e) =>
                                      //   handlePersonalInputChange(
                                      //     "qualification",
                                      //     e.target.value
                                      //   )
                                      // }
                                    />
                                  </div>
                                </div> */}
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
                                  <div className="form-group">
                                    <label className="mb-1">Objective</label>
                                    <textarea
                                      className="form-control rounded ht-150"
                                      placeholder="Describe..."
                                      defaultValue={""}
                                      value={personalDetailsData.description}
                                      onChange={(e) =>
                                        handlePersonalInputChange(
                                          "description",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-12">
                                  <label className="mb-1">
                                    Upload Aadhaar Card
                                  </label>

                                  {aadhaarPreview ? (
                                    <div className="position-relative">
                                      {loadingOne && (
                                        <div className="w-100 d-flex justify-content-center position-absolute">
                                          <div class="spinner-box spinner-width">
                                            <div class="three-quarter-spinner three-quarter-spinner-width"></div>
                                          </div>
                                        </div>
                                      )}
                                      <img
                                        src={aadhaarPreview}
                                        alt="Aadhaar Preview"
                                        id="single-aadhaar"
                                        style={{
                                          width: "100%",
                                          maxHeight: "150px",
                                          objectFit: "contain",
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      />
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={handleSelectAadhaar}
                                        >
                                          Change Aadhaar
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      id="single-aadhaar"
                                      onClick={handleSelectAadhaar}
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to upload aadhaar</p>
                                    </div>
                                  )}

                                  <label className="smart-text">
                                    Maximum file size: 2 MB.
                                  </label>
                                  <input
                                    id="aadhaarInput"
                                    type="file"
                                    className="d-none"
                                    accept="image/*"
                                    onChange={handleCropAadhaarChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="dashboard-list-wraps bg-white rounded mb-4">
                            <div className="dashboard-list-wraps-head br-bottom py-3 px-3">
                              <div className="dashboard-list-wraps-flx">
                                <h4 className="mb-0 ft-medium fs-md">
                                  <i className="fas fa-map-marker-alt me-2 theme-cl fs-sm" />
                                  Location Info
                                </h4>
                              </div>
                            </div>
                            <div className="dashboard-list-wraps-body bg-white py-3 px-3">
                              <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">
                                      Office No/Building Name/Office Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter Office No/Building Name/Office Name"
                                      value={formData.address_line_1}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "address_line_1",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">
                                      Road Name/Area/Colony
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter Road Name/Area/Colony"
                                      value={formData.address_line_2}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "address_line_2",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">City</label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter city"
                                      value={formData.city}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "city",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">State</label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter state"
                                      value={formData.state}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "state",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">Country</label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter Country"
                                      value={formData.country}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "country",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">Pin Code</label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter Pin Code"
                                      value={formData.pin_code}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "pin_code",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <label className="mb-1">Address Link</label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter Address Link"
                                      value={formData.direction_link}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "direction_link",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="dashboard-list-wraps bg-white rounded mb-4">
                            <div className="dashboard-list-wraps-body bg-white py-3 px-3">
                              <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={isDetailsCorrect}
                                        onChange={() =>
                                          setIsDetailsCorrect(!isDetailsCorrect)
                                        }
                                        color="primary"
                                      />
                                    }
                                    label="I hereby declare that the above-provided details are all correct"
                                    sx={{ mt: 2 }}
                                  />
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                  <div className="form-group">
                                    <button
                                      className="btn theme-bg rounded text-light add-listing-btn"
                                      onClick={handleSubmit}
                                      disabled={!isDetailsCorrect}
                                    >
                                      Submit &amp; Continue
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <a
            id="tops-button"
            className="top-scroll"
            title="Back to top"
            href="#"
          >
            <i className="ti-arrow-up" />
          </a>
        </div>
      </>
      <ToastContainer />
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Crop Aadhaar Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ position: "relative", width: "100%", height: 400 }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={12 / 8}
              onCropChange={setCrop}
              onCropComplete={(croppedArea, aadhaarPhoto) =>
                onCropComplete(croppedArea, aadhaarPhoto, "aadhaar")
              }
              onZoomChange={setZoom}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleCropComplete("aadhaar")}
            style={{
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              color: "white",
            }}
          >
            Crop Image
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={profileShow} onHide={handleProfileClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Crop Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ position: "relative", width: "100%", height: 400 }}>
            <Cropper
              image={profileImageSrc}
              crop={profileCrop}
              zoom={profileZoom}
              aspect={8 / 11}
              onCropChange={setProfileCrop}
              onCropComplete={(croppedArea, aadhaarPhoto) =>
                onCropComplete(croppedArea, aadhaarPhoto, "profile")
              }
              onZoomChange={setProfileZoom}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleProfileClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleProfileCropComplete("profile")}
            style={{
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              color: "white",
            }}
          >
            Crop Image
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default TPRegistrationListing;
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL("image/jpeg");
}
