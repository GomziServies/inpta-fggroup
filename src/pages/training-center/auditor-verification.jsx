import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../../assets/css/style.css";
import Header from "../../components/Header";
import { inptaListingAxiosInstance } from "../../js/api";
import axiosInstance from "../../js/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import "rsuite/dist/rsuite.min.css";
import { Modal } from "react-bootstrap";
import Cropper from "react-easy-crop";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProgressBar from "../../components/progress-bar/registration-progress-bar";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { createTCAuditorVerificationPayment } from "../../assets/utils/tc_payment";
import { useNavigate } from "react-router-dom";

const AuditorVerification = () => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingOne, setLoadingOne] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [listingId, setListingId] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    checkAuditorStatus();
  }, []);

  const checkAuditorStatus = async () => {
    setCheckingStatus(true);
    try {
      const storedListingId = localStorage.getItem("tc_listing_id");
      
      if (!storedListingId) {
        const response = await inptaListingAxiosInstance.get("/get-tc-listing");
        
        if (response?.data?.data?.length > 0) {
          const listing = response.data.data[0];
          setListingId(listing._id);
          localStorage.setItem("tc_listing_id", listing._id);
          
          if (listing.auditorVerified === true) {
            toast.info("Auditor verification already completed.");
            setTimeout(() => {
              navigate("/thank-you");
            }, 2000);
            return;
          }
          
          if (!listing.certificateSubmitted) {
            toast.error("Please complete certificate submission first");
            setTimeout(() => {
              navigate("/training-center/submit-certificate");
            }, 2000);
            return;
          }
          
          setShowContent(true);
        } else {
          toast.error("No training center listing found. Please create one first.");
          setTimeout(() => {
            navigate("/training-center");
          }, 2000);
          return;
        }
      } else {
        setListingId(storedListingId);
        
        const response = await inptaListingAxiosInstance.get(`/get-tc-listing?listing_id=${storedListingId}`);
        
        if (response?.data?.data?.length > 0) {
          const listing = response.data.data[0];
          
          if (listing.auditorVerified === true) {
            toast.info("Auditor verification already completed.");
            localStorage.setItem("tc_listing_auditor_submitted", "true");
            setTimeout(() => {
              navigate("/thank-you");
            }, 2000);
            return;
          }
          
          if (!listing.certificateSubmitted) {
            toast.error("Please complete certificate submission first");
            setTimeout(() => {
              navigate("/training-center/submit-certificate");
            }, 2000);
            return;
          }
          
          setShowContent(true);
        } else {
          toast.error("Training center listing not found. Please create one first.");
          localStorage.removeItem("tc_listing_id");
          setTimeout(() => {
            navigate("/training-center");
          }, 2000);
          return;
        }
      }
    } catch (error) {
      console.error("Error checking auditor status:", error);
      toast.error("Error checking status. Please try again.");
    } finally {
      setCheckingStatus(false);
      setIsLoading(false);
    }
  };

  const [formData, setFormData] = useState({});

  const [personalDetailsData, setPersonalDetailsData] = useState({
    profile_photo: null,
    aadhaar_card: null,
    pan_card: null,
    gst_certificate: null,
    dpt_certificate: null,
    dnc_certificate: null,
  });

  const handlePersonalInputChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalDetailsData((prev) => ({
          ...prev,
          [type]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePersonalDetails = (type) => {
    setPersonalDetailsData((prev) => ({
      ...prev,
      [type]: null,
    }));
  };

  // ----------------------------------------------------------------------------------

  const [inptaPhotos, setInptaPhotos] = useState({
    washroom: null,
    dustbin: null,
    medical_kit: null,
    gym_area: null,
    reception: null,
    staff: null,
  });
  const [currentInptaPhotoIndex, setCurrentInptaPhotoIndex] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [inptaImageSrc, setInptaImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [inptaCrop, setInptaCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [inptaZoom, setInptaZoom] = useState(1);
  const [show, setShow] = useState(false);
  const [inptaShow, setInptaShow] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [inptaPhoto, setInptaPhoto] = useState(null);

  const onCropComplete = useCallback((croppedArea, profilePhoto, context) => {
    if (context === "logo") {
      setProfilePhoto(profilePhoto);
      handleLogoChange(profilePhoto);
    } else if (context === "feature") {
      setInptaPhoto(profilePhoto);
    }
  }, []);

  const handleLogoChange = (event) => {
    const file = profilePhoto;

    if (file instanceof File) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2 MB!");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          logo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (context) => {
    if (imageSrc && (profilePhoto || inptaPhoto)) {
      try {
        const croppedImg = await getCroppedImg(imageSrc, profilePhoto);
        if (context === "logo") {
          setLogoPreview(croppedImg);
          setProfilePhoto(croppedImg);
          setShow(false);
        } else if (context === "feature") {
          setInptaShow(false);
        }
      } catch (error) {
        console.error("Error cropping the image:", error);
      }
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleInptaClose = () => {
    setInptaShow(false);
  };

  const handleCropLogoChange = (event) => {
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

  const handleSelectLogo = () => {
    const fileInput = document.getElementById("logoInput");
    fileInput.click();
  };

  const handleRemoveInptaPhoto = (category) => {
    const newPhotos = { ...inptaPhotos };
    newPhotos[category] = null;
    setInptaPhotos([...newPhotos]);
  };

  const handleSelectFeature = (category) => {
    const fileInput = document.getElementById(category);
    fileInput.click();
  };

  const handleCropInptaPhoto = (event, category) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInptaImageSrc(reader.result);
        setCurrentInptaPhotoIndex(category);
        setInptaShow(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInptaCropComplete = async () => {
    setLoadingTwo(true);
    if (inptaImageSrc && inptaPhoto) {
      try {
        const croppedImg = await getCroppedImg(inptaImageSrc, inptaPhoto);
        const updatedPhotos = { ...inptaPhotos };
        if (currentInptaPhotoIndex !== null) {
          updatedPhotos[currentInptaPhotoIndex] = croppedImg;
          setInptaPhotos((prevPhotos) => ({
            ...prevPhotos,
            [currentInptaPhotoIndex]: croppedImg,
          }));
        } else {
          updatedPhotos.push({ file: null, preview: croppedImg });
          setInptaPhotos(updatedPhotos);
        }
        setInptaShow(false);
      } catch (error) {
        console.error("Error cropping the photos:", error);
      }
    }
    setLoadingTwo(false);
  };

  // ----------------------------------------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const documentData = {};
      const imagesData = {};
      
      if (personalDetailsData.profile_photo) {
        const profilePhotoBlob = await base64ToBlob(personalDetailsData.profile_photo);
        const profileFormData = new FormData();
        profileFormData.append("files", profilePhotoBlob);
        const profileResponse = await axiosInstance.post("/file-upload", profileFormData);
        documentData.profile_photo = profileResponse.data.data.fileURLs[0];
      }
      
      if (personalDetailsData.aadhaar_card) {
        const aadhaarBlob = await base64ToBlob(personalDetailsData.aadhaar_card);
        const aadhaarFormData = new FormData();
        aadhaarFormData.append("files", aadhaarBlob);
        const aadhaarResponse = await axiosInstance.post("/file-upload", aadhaarFormData);
        documentData.aadhaar_card = aadhaarResponse.data.data.fileURLs[0];
      }
      
      if (personalDetailsData.pan_card) {
        const panBlob = await base64ToBlob(personalDetailsData.pan_card);
        const panFormData = new FormData();
        panFormData.append("files", panBlob);
        const panResponse = await axiosInstance.post("/file-upload", panFormData);
        documentData.pan_card = panResponse.data.data.fileURLs[0];
      }
      
      if (personalDetailsData.gst_certificate) {
        const gstBlob = await base64ToBlob(personalDetailsData.gst_certificate);
        const gstFormData = new FormData();
        gstFormData.append("files", gstBlob);
        const gstResponse = await axiosInstance.post("/file-upload", gstFormData);
        documentData.gst_certificate = gstResponse.data.data.fileURLs[0];
      }
      
      if (personalDetailsData.dpt_certificate) {
        const dptBlob = await base64ToBlob(personalDetailsData.dpt_certificate);
        const dptFormData = new FormData();
        dptFormData.append("files", dptBlob);
        const dptResponse = await axiosInstance.post("/file-upload", dptFormData);
        documentData.dpt_certificate = dptResponse.data.data.fileURLs[0];
      }
      
      if (personalDetailsData.dnc_certificate) {
        const dncBlob = await base64ToBlob(personalDetailsData.dnc_certificate);
        const dncFormData = new FormData();
        dncFormData.append("files", dncBlob);
        const dncResponse = await axiosInstance.post("/file-upload", dncFormData);
        documentData.dnc_certificate = dncResponse.data.data.fileURLs[0];
      }
      
      // Process INPTA Photos (images)
      if (inptaPhotos.washroom) {
        const washroomBlob = await base64ToBlob(inptaPhotos.washroom);
        const washroomFormData = new FormData();
        washroomFormData.append("files", washroomBlob);
        const washroomResponse = await axiosInstance.post("/file-upload", washroomFormData);
        imagesData.washroom = washroomResponse.data.data.fileURLs[0];
      }
      
      if (inptaPhotos.dustbin) {
        const dustbinBlob = await base64ToBlob(inptaPhotos.dustbin);
        const dustbinFormData = new FormData();
        dustbinFormData.append("files", dustbinBlob);
        const dustbinResponse = await axiosInstance.post("/file-upload", dustbinFormData);
        imagesData.dustbin = dustbinResponse.data.data.fileURLs[0];
      }
      
      if (inptaPhotos.medical_kit) {
        const medicalKitBlob = await base64ToBlob(inptaPhotos.medical_kit);
        const medicalKitFormData = new FormData();
        medicalKitFormData.append("files", medicalKitBlob);
        const medicalKitResponse = await axiosInstance.post("/file-upload", medicalKitFormData);
        imagesData.medical_kit = medicalKitResponse.data.data.fileURLs[0];
      }
      
      if (inptaPhotos.gym_area) {
        const gymAreaBlob = await base64ToBlob(inptaPhotos.gym_area);
        const gymAreaFormData = new FormData();
        gymAreaFormData.append("files", gymAreaBlob);
        const gymAreaResponse = await axiosInstance.post("/file-upload", gymAreaFormData);
        imagesData.gym_area = gymAreaResponse.data.data.fileURLs[0];
      }
      
      if (inptaPhotos.reception) {
        const receptionBlob = await base64ToBlob(inptaPhotos.reception);
        const receptionFormData = new FormData();
        receptionFormData.append("files", receptionBlob);
        const receptionResponse = await axiosInstance.post("/file-upload", receptionFormData);
        imagesData.reception = receptionResponse.data.data.fileURLs[0];
      }
      
      if (inptaPhotos.staff) {
        const staffBlob = await base64ToBlob(inptaPhotos.staff);
        const staffFormData = new FormData();
        staffFormData.append("files", staffBlob);
        const staffResponse = await axiosInstance.post("/file-upload", staffFormData);
        imagesData.staff = staffResponse.data.data.fileURLs[0];
      }
      
      let logoUrl = "";
      if (logoPreview) {
        const logoBlob = await base64ToBlob(logoPreview);
        const logoFormData = new FormData();
        logoFormData.append("files", logoBlob);
        const logoResponse = await axiosInstance.post("/file-upload", logoFormData);
        logoUrl = logoResponse.data.data.fileURLs[0];
      }

      const postData = {
        listing_id: listingId,
        tc_status: "tc_auditor",
        images: [imagesData],
        document: [documentData]
      };
      
      if (logoUrl) {
        postData.logo = logoUrl;
      }

      const result = await inptaListingAxiosInstance.patch(
        "/update-tc-listing",
        postData
      );

      if (result) {
        toast.success("Auditor verification initiated!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
          handlePaymentSubmit(listingId);
        }, 500);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading files:", error);
      setIsLoading(false);
      toast.error(error?.message || "Error processing auditor verification", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handlePaymentSubmit = async (listing_id) => {
    try {
      try {
        await createTCAuditorVerificationPayment(listing_id);
      } catch (error) {
        console.error("Error during order:", error);
      }
      window.Razorpay && window.Razorpay.close && window.Razorpay.close();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error in handlePaymentSubmit:", error);
    }
  };

  if (!showContent || loading || checkingStatus) {
    return (
      <div className="loader-background">
        <div className="spinner-box">
          <div className="three-quarter-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Submit Certificate</title>
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
        {isLoading && (
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
              <div className="goodup-dashboard-wrap gray px-4 py-5 add-listing-page margintop">
                <div className="goodup-dashboard-content text-start">
                  <div className="dashboard-widg-bar d-block">
                    <div className="row">
                      <ProgressBar activeData="third" pendingData="fourth" />
                      <div className="col-12 mb-4 text-center">
                        <h2 className="mb-0 ft-medium fs-md">
                          TC Auditor Verification
                        </h2>
                      </div>
                      <div className="col-xl-12 col-md-12 col-sm-12">
                        <div className="submit-form">
                          <div className="dashboard-list-wraps bg-white rounded mb-4">
                            <div className="dashboard-list-wraps-head br-bottom py-3 px-3">
                              <div className="dashboard-list-wraps-flx">
                                <h4 className="mb-0 ft-medium fs-md">
                                  <i className="fa fa-file me-2 theme-cl fs-sm" />
                                  Personal Document
                                </h4>
                              </div>
                            </div>
                            <div className="dashboard-list-wraps-body bg-white py-3 px-3">
                              <div className="row">
                                <div className="col-md-6 mt-4">
                                  <label className="mb-1">
                                    Upload Profile Photo
                                  </label>
                                  {personalDetailsData.profile_photo ? (
                                    <div>
                                      <div
                                        className="row position-relative"
                                        style={{
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          margin: "0px 0px 0px 0px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "200px",
                                            position: "relative",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <img
                                            src={
                                              personalDetailsData.profile_photo
                                            }
                                            alt="Profile_Photo"
                                            style={{
                                              maxWidth: "100%",
                                              height: "auto",
                                              marginBottom: "5px",
                                            }}
                                          />
                                          <IconButton
                                            onClick={() =>
                                              handleRemovePersonalDetails(
                                                "profile_photo"
                                              )
                                            }
                                            className="px-1 py-1"
                                            style={{
                                              position: "absolute",
                                              top: 4,
                                              right: 15,
                                              backgroundColor:
                                                "rgba(255, 255, 255, 0.8)",
                                            }}
                                          >
                                            <DeleteIcon
                                              style={{ color: "#ff3838" }}
                                            />
                                          </IconButton>
                                        </div>
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            document
                                              .getElementById("profile_photo")
                                              .click()
                                          }
                                        >
                                          Change Profile Photo
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      onClick={() =>
                                        document
                                          .getElementById("profile_photo")
                                          .click()
                                      }
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to Upload Profile Photo</p>
                                    </div>
                                  )}
                                  <input
                                    id="profile_photo"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handlePersonalInputChange(
                                        e,
                                        "profile_photo"
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-md-6 mt-4">
                                  <label className="mb-1">
                                    Upload Aadhaar Card
                                  </label>
                                  {personalDetailsData.aadhaar_card ? (
                                    <div>
                                      <div
                                        className="row position-relative"
                                        style={{
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          margin: "0px 0px 0px 0px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "200px",
                                            position: "relative",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <img
                                            src={
                                              personalDetailsData.aadhaar_card
                                            }
                                            alt="Aadhaar Card"
                                            style={{
                                              maxWidth: "100%",
                                              height: "auto",
                                              marginBottom: "5px",
                                            }}
                                          />
                                          <IconButton
                                            onClick={() =>
                                              handleRemovePersonalDetails(
                                                "aadhaar_card"
                                              )
                                            }
                                            className="px-1 py-1"
                                            style={{
                                              position: "absolute",
                                              top: 4,
                                              right: 15,
                                              backgroundColor:
                                                "rgba(255, 255, 255, 0.8)",
                                            }}
                                          >
                                            <DeleteIcon
                                              style={{ color: "#ff3838" }}
                                            />
                                          </IconButton>
                                        </div>
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            document
                                              .getElementById("aadhaar_card")
                                              .click()
                                          }
                                        >
                                          Change Aadhaar Card
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      onClick={() =>
                                        document
                                          .getElementById("aadhaar_card")
                                          .click()
                                      }
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to Upload Aadhaar Card</p>
                                    </div>
                                  )}
                                  <input
                                    id="aadhaar_card"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handlePersonalInputChange(
                                        e,
                                        "aadhaar_card"
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-md-6 mt-4">
                                  <label className="mb-1">
                                    Upload Pan Card
                                  </label>
                                  {personalDetailsData.pan_card ? (
                                    <div>
                                      <div
                                        className="row position-relative"
                                        style={{
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          margin: "0px 0px 0px 0px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "200px",
                                            position: "relative",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <img
                                            src={personalDetailsData.pan_card}
                                            alt="Pan Card"
                                            style={{
                                              maxWidth: "100%",
                                              height: "auto",
                                              marginBottom: "5px",
                                            }}
                                          />
                                          <IconButton
                                            onClick={() =>
                                              handleRemovePersonalDetails(
                                                "pan_card"
                                              )
                                            }
                                            className="px-1 py-1"
                                            style={{
                                              position: "absolute",
                                              top: 4,
                                              right: 15,
                                              backgroundColor:
                                                "rgba(255, 255, 255, 0.8)",
                                            }}
                                          >
                                            <DeleteIcon
                                              style={{ color: "#ff3838" }}
                                            />
                                          </IconButton>
                                        </div>
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            document
                                              .getElementById("pan_card")
                                              .click()
                                          }
                                        >
                                          Change Pan Card
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      onClick={() =>
                                        document
                                          .getElementById("pan_card")
                                          .click()
                                      }
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to Upload Pan Card</p>
                                    </div>
                                  )}
                                  <input
                                    id="pan_card"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handlePersonalInputChange(e, "pan_card")
                                    }
                                  />
                                </div>
                                <div className="col-md-6 mt-4">
                                  <label className="mb-1">
                                    Upload GST Certificate
                                  </label>
                                  {personalDetailsData.gst_certificate ? (
                                    <div>
                                      <div
                                        className="row position-relative"
                                        style={{
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          margin: "0px 0px 0pc 0px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "200px",
                                            position: "relative",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <img
                                            src={
                                              personalDetailsData.gst_certificate
                                            }
                                            alt="GST Certificate"
                                            style={{
                                              maxWidth: "100%",
                                              height: "auto",
                                              marginBottom: "5px",
                                            }}
                                          />
                                          <IconButton
                                            onClick={() =>
                                              handleRemovePersonalDetails(
                                                "gst_certificate"
                                              )
                                            }
                                            className="px-1 py-1"
                                            style={{
                                              position: "absolute",
                                              top: 4,
                                              right: 15,
                                              backgroundColor:
                                                "rgba(255, 255, 255, 0.8)",
                                            }}
                                          >
                                            <DeleteIcon
                                              style={{ color: "#ff3838" }}
                                            />
                                          </IconButton>
                                        </div>
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            document
                                              .getElementById("gst_certificate")
                                              .click()
                                          }
                                        >
                                          Change GST Certificate
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      onClick={() =>
                                        document
                                          .getElementById("gst_certificate")
                                          .click()
                                      }
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to Upload GST Certificate</p>
                                    </div>
                                  )}
                                  <input
                                    id="gst_certificate"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handlePersonalInputChange(
                                        e,
                                        "gst_certificate"
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="dashboard-list-wraps bg-white rounded mb-4">
                            <div className="dashboard-list-wraps-head br-bottom py-3 px-3">
                              <div className="dashboard-list-wraps-flx">
                                <h4 className="mb-0 ft-medium fs-md">
                                  <i className="fa fa-camera me-2 theme-cl fs-sm" />
                                  Image &amp; Gallery Option
                                </h4>
                              </div>
                            </div>
                            <div className="dashboard-list-wraps-body py-3 px-3">
                              <div className="row">
                                <div className="col-12">
                                  <label className="mb-1">Upload Logo</label>

                                  {logoPreview ? (
                                    <div className="position-relative">
                                      {loadingOne && (
                                        <div className="w-100 d-flex justify-content-center position-absolute">
                                          <div class="spinner-box spinner-width">
                                            <div class="three-quarter-spinner three-quarter-spinner-width"></div>
                                          </div>
                                        </div>
                                      )}
                                      <img
                                        src={logoPreview}
                                        alt="Logo Preview"
                                        id="single-logo"
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
                                          onClick={handleSelectLogo}
                                        >
                                          Change Logo
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      id="single-logo"
                                      onClick={handleSelectLogo}
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to upload logo</p>
                                    </div>
                                  )}

                                  <label className="smart-text">
                                    Maximum file size: 2 MB.
                                  </label>
                                  <input
                                    id="logoInput"
                                    type="file"
                                    className="d-none"
                                    accept="image/*"
                                    onChange={handleCropLogoChange}
                                  />
                                </div>
                                <div className="col-md-6 mt-4">
                                  <label className="mb-1">
                                    Washroom Image{" "}
                                  </label>
                                  {inptaPhotos.washroom ? (
                                    <div>
                                      <div
                                        className="row position-relative"
                                        style={{
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {loadingTwo && (
                                          <div className="loader-background-image position-absolute">
                                            <div className="spinner-box-image">
                                              <div className="three-quarter-spinner-image"></div>
                                            </div>
                                          </div>
                                        )}
                                        {inptaPhotos.washroom && (
                                          <div
                                            style={{
                                              width: "200px",
                                              position: "relative",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: "100%",
                                                height: "auto",
                                              }}
                                            >
                                              <img
                                                src={inptaPhotos.washroom}
                                                alt={`INPTA Photo washroom`}
                                                style={{
                                                  maxWidth: "100%",
                                                  height: "auto",
                                                  marginBottom: "5px",
                                                }}
                                              />
                                              <IconButton
                                                onClick={() =>
                                                  handleRemoveInptaPhoto(
                                                    "washroom"
                                                  )
                                                }
                                                className="px-1 py-1"
                                                style={{
                                                  position: "absolute",
                                                  top: 4,
                                                  right: 15,
                                                  backgroundColor:
                                                    "rgba(255, 255, 255, 0.8)",
                                                }}
                                              >
                                                <DeleteIcon
                                                  style={{ color: "#ff3838" }}
                                                />
                                              </IconButton>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) =>
                                                  handleCropInptaPhoto(
                                                    event,
                                                    "washroom"
                                                  )
                                                }
                                                style={{ display: "none" }}
                                                id={`photoInput-washroom`}
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            handleSelectFeature("washroom")
                                          }
                                        >
                                          Add Feature Image
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      id="featured-image"
                                      onClick={() =>
                                        handleSelectFeature("washroom")
                                      }
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to Featured Image</p>
                                    </div>
                                  )}
                                  <label className="smart-text">
                                    Maximum file size: 2 MB.
                                  </label>
                                  <input
                                    id="washroom"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handleCropInptaPhoto(e, "washroom")
                                    }
                                    sx={{ mt: 2, mb: 2 }}
                                  />
                                </div>
                                <div className="col-md-6 mt-4">
                                  <label className="mb-1">Dustbin Image </label>
                                  {inptaPhotos.dustbin ? (
                                    <div>
                                      <div
                                        className="row position-relative"
                                        style={{
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {loadingTwo && (
                                          <div className="loader-background-image position-absolute">
                                            <div className="spinner-box-image">
                                              <div className="three-quarter-spinner-image"></div>
                                            </div>
                                          </div>
                                        )}
                                        {inptaPhotos.dustbin && (
                                          <div
                                            style={{
                                              width: "200px",
                                              position: "relative",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: "100%",
                                                height: "auto",
                                              }}
                                            >
                                              <img
                                                src={inptaPhotos.dustbin}
                                                alt={`INPTA Photo dustbin`}
                                                style={{
                                                  maxWidth: "100%",
                                                  height: "auto",
                                                  marginBottom: "5px",
                                                }}
                                              />
                                              <IconButton
                                                onClick={() =>
                                                  handleRemoveInptaPhoto(
                                                    "dustbin"
                                                  )
                                                }
                                                className="px-1 py-1"
                                                style={{
                                                  position: "absolute",
                                                  top: 4,
                                                  right: 15,
                                                  backgroundColor:
                                                    "rgba(255, 255, 255, 0.8)",
                                                }}
                                              >
                                                <DeleteIcon
                                                  style={{ color: "#ff3838" }}
                                                />
                                              </IconButton>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) =>
                                                  handleCropInptaPhoto(
                                                    event,
                                                    "dustbin"
                                                  )
                                                }
                                                style={{ display: "none" }}
                                                id={`photoInput-dustbin`}
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            handleSelectFeature("dustbin")
                                          }
                                        >
                                          Add Feature Image
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      id="featured-image"
                                      onClick={() =>
                                        handleSelectFeature("dustbin")
                                      }
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to Featured Image</p>
                                    </div>
                                  )}
                                  <label className="smart-text">
                                    Maximum file size: 2 MB.
                                  </label>
                                  <input
                                    id="dustbin"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handleCropInptaPhoto(e, "dustbin")
                                    }
                                    sx={{ mt: 2, mb: 2 }}
                                  />
                                </div>
                                <div className="col-md-6 mt-4">
                                  <label className="mb-1">
                                    Medical Kit Image{" "}
                                  </label>
                                  {inptaPhotos.medical_kit ? (
                                    <div>
                                      <div
                                        className="row position-relative"
                                        style={{
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {loadingTwo && (
                                          <div className="loader-background-image position-absolute">
                                            <div className="spinner-box-image">
                                              <div className="three-quarter-spinner-image"></div>
                                            </div>
                                          </div>
                                        )}
                                        {inptaPhotos.medical_kit && (
                                          <div
                                            style={{
                                              width: "200px",
                                              position: "relative",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: "100%",
                                                height: "auto",
                                              }}
                                            >
                                              <img
                                                src={inptaPhotos.medical_kit}
                                                alt={`INPTA Photo medical_kit`}
                                                style={{
                                                  maxWidth: "100%",
                                                  height: "auto",
                                                  marginBottom: "5px",
                                                }}
                                              />
                                              <IconButton
                                                onClick={() =>
                                                  handleRemoveInptaPhoto(
                                                    "medical_kit"
                                                  )
                                                }
                                                className="px-1 py-1"
                                                style={{
                                                  position: "absolute",
                                                  top: 4,
                                                  right: 15,
                                                  backgroundColor:
                                                    "rgba(255, 255, 255, 0.8)",
                                                }}
                                              >
                                                <DeleteIcon
                                                  style={{ color: "#ff3838" }}
                                                />
                                              </IconButton>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) =>
                                                  handleCropInptaPhoto(
                                                    event,
                                                    "medical_kit"
                                                  )
                                                }
                                                style={{ display: "none" }}
                                                id={`photoInput-medical_kit`}
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            handleSelectFeature("medical_kit")
                                          }
                                        >
                                          Add Feature Image
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      id="featured-image"
                                      onClick={() =>
                                        handleSelectFeature("medical_kit")
                                      }
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to Featured Image</p>
                                    </div>
                                  )}
                                  <label className="smart-text">
                                    Maximum file size: 2 MB.
                                  </label>
                                  <input
                                    id="medical_kit"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handleCropInptaPhoto(e, "medical_kit")
                                    }
                                    sx={{ mt: 2, mb: 2 }}
                                  />
                                </div>
                                <div className="col-md-6 mt-4">
                                  <label className="mb-1">
                                    Gym Area Image (More then 500 square feet){" "}
                                  </label>
                                  {inptaPhotos.gym_area ? (
                                    <div>
                                      <div
                                        className="row position-relative"
                                        style={{
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {loadingTwo && (
                                          <div className="loader-background-image position-absolute">
                                            <div className="spinner-box-image">
                                              <div className="three-quarter-spinner-image"></div>
                                            </div>
                                          </div>
                                        )}
                                        {inptaPhotos.gym_area && (
                                          <div
                                            style={{
                                              width: "200px",
                                              position: "relative",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: "100%",
                                                height: "auto",
                                              }}
                                            >
                                              <img
                                                src={inptaPhotos.gym_area}
                                                alt={`INPTA Photo gym_area`}
                                                style={{
                                                  maxWidth: "100%",
                                                  height: "auto",
                                                  marginBottom: "5px",
                                                }}
                                              />
                                              <IconButton
                                                onClick={() =>
                                                  handleRemoveInptaPhoto(
                                                    "gym_area"
                                                  )
                                                }
                                                className="px-1 py-1"
                                                style={{
                                                  position: "absolute",
                                                  top: 4,
                                                  right: 15,
                                                  backgroundColor:
                                                    "rgba(255, 255, 255, 0.8)",
                                                }}
                                              >
                                                <DeleteIcon
                                                  style={{ color: "#ff3838" }}
                                                />
                                              </IconButton>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) =>
                                                  handleCropInptaPhoto(
                                                    event,
                                                    "gym_area"
                                                  )
                                                }
                                                style={{ display: "none" }}
                                                id={`photoInput-gym_area`}
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            handleSelectFeature("gym_area")
                                          }
                                        >
                                          Add Feature Image
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      id="featured-image"
                                      onClick={() =>
                                        handleSelectFeature("gym_area")
                                      }
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to Featured Image</p>
                                    </div>
                                  )}
                                  <label className="smart-text">
                                    Maximum file size: 2 MB.
                                  </label>
                                  <input
                                    id="gym_area"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handleCropInptaPhoto(e, "gym_area")
                                    }
                                    sx={{ mt: 2, mb: 2 }}
                                  />
                                </div>
                                <div className="col-md-6 mt-4">
                                  <label className="mb-1">
                                    Reception Image{" "}
                                  </label>
                                  {inptaPhotos.reception ? (
                                    <div>
                                      <div
                                        className="row position-relative"
                                        style={{
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {loadingTwo && (
                                          <div className="loader-background-image position-absolute">
                                            <div className="spinner-box-image">
                                              <div className="three-quarter-spinner-image"></div>
                                            </div>
                                          </div>
                                        )}
                                        {inptaPhotos.reception && (
                                          <div
                                            style={{
                                              width: "200px",
                                              position: "relative",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: "100%",
                                                height: "auto",
                                              }}
                                            >
                                              <img
                                                src={inptaPhotos.reception}
                                                alt={`INPTA Photo reception`}
                                                style={{
                                                  maxWidth: "100%",
                                                  height: "auto",
                                                  marginBottom: "5px",
                                                }}
                                              />
                                              <IconButton
                                                onClick={() =>
                                                  handleRemoveInptaPhoto(
                                                    "reception"
                                                  )
                                                }
                                                className="px-1 py-1"
                                                style={{
                                                  position: "absolute",
                                                  top: 4,
                                                  right: 15,
                                                  backgroundColor:
                                                    "rgba(255, 255, 255, 0.8)",
                                                }}
                                              >
                                                <DeleteIcon
                                                  style={{ color: "#ff3838" }}
                                                />
                                              </IconButton>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) =>
                                                  handleCropInptaPhoto(
                                                    event,
                                                    "reception"
                                                  )
                                                }
                                                style={{ display: "none" }}
                                                id={`photoInput-reception`}
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            handleSelectFeature("reception")
                                          }
                                        >
                                          Add Feature Image
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      id="featured-image"
                                      onClick={() =>
                                        handleSelectFeature("reception")
                                      }
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to Featured Image</p>
                                    </div>
                                  )}
                                  <label className="smart-text">
                                    Maximum file size: 2 MB.
                                  </label>
                                  <input
                                    id="reception"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handleCropInptaPhoto(e, "reception")
                                    }
                                    sx={{ mt: 2, mb: 2 }}
                                  />
                                </div>
                                <div className="col-md-6 mt-4">
                                  <label className="mb-1">Staff Image </label>
                                  {inptaPhotos.staff ? (
                                    <div>
                                      <div
                                        className="row position-relative"
                                        style={{
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {loadingTwo && (
                                          <div className="loader-background-image position-absolute">
                                            <div className="spinner-box-image">
                                              <div className="three-quarter-spinner-image"></div>
                                            </div>
                                          </div>
                                        )}
                                        {inptaPhotos.staff && (
                                          <div
                                            style={{
                                              width: "200px",
                                              position: "relative",
                                              marginBottom: "10px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: "100%",
                                                height: "auto",
                                              }}
                                            >
                                              <img
                                                src={inptaPhotos.staff}
                                                alt={`INPTA Photo staff`}
                                                style={{
                                                  maxWidth: "100%",
                                                  height: "auto",
                                                  marginBottom: "5px",
                                                }}
                                              />
                                              <IconButton
                                                onClick={() =>
                                                  handleRemoveInptaPhoto(
                                                    "staff"
                                                  )
                                                }
                                                className="px-1 py-1"
                                                style={{
                                                  position: "absolute",
                                                  top: 4,
                                                  right: 15,
                                                  backgroundColor:
                                                    "rgba(255, 255, 255, 0.8)",
                                                }}
                                              >
                                                <DeleteIcon
                                                  style={{ color: "#ff3838" }}
                                                />
                                              </IconButton>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(event) =>
                                                  handleCropInptaPhoto(
                                                    event,
                                                    "staff"
                                                  )
                                                }
                                                style={{ display: "none" }}
                                                id={`photoInput-staff`}
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            handleSelectFeature("staff")
                                          }
                                        >
                                          Add Feature Image
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      id="featured-image"
                                      onClick={() =>
                                        handleSelectFeature("staff")
                                      }
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to Featured Image</p>
                                    </div>
                                  )}
                                  <label className="smart-text">
                                    Maximum file size: 2 MB.
                                  </label>
                                  <input
                                    id="staff"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handleCropInptaPhoto(e, "staff")
                                    }
                                    sx={{ mt: 2, mb: 2 }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="dashboard-list-wraps bg-white rounded mb-4">
                            <div className="dashboard-list-wraps-head br-bottom py-3 px-3">
                              <div className="dashboard-list-wraps-flx">
                                <h4 className="mb-0 ft-medium fs-md">
                                  <i className="fa fa-file me-2 theme-cl fs-sm" />
                                  Course Certificates
                                </h4>
                              </div>
                            </div>
                            <div className="dashboard-list-wraps-body bg-white py-3 px-3">
                              <div className="row">
                                <div className="col-md-12 mt-4">
                                  <label className="mb-1">
                                    Upload Train the Trainer Certificate
                                  </label>
                                  {personalDetailsData.dpt_certificate ? (
                                    <div>
                                      <div
                                        className="row position-relative"
                                        style={{
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          margin: "0px 0px 0px 0px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "200px",
                                            position: "relative",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <img
                                            src={
                                              personalDetailsData.dpt_certificate
                                            }
                                            alt="Pan Card"
                                            style={{
                                              maxWidth: "100%",
                                              height: "auto",
                                              marginBottom: "5px",
                                            }}
                                          />
                                          <IconButton
                                            onClick={() =>
                                              handleRemovePersonalDetails(
                                                "dpt_certificate"
                                              )
                                            }
                                            className="px-1 py-1"
                                            style={{
                                              position: "absolute",
                                              top: 4,
                                              right: 15,
                                              backgroundColor:
                                                "rgba(255, 255, 255, 0.8)",
                                            }}
                                          >
                                            <DeleteIcon
                                              style={{ color: "#ff3838" }}
                                            />
                                          </IconButton>
                                        </div>
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            document
                                              .getElementById("dpt_certificate")
                                              .click()
                                          }
                                        >
                                          Change Train the Trainer Certificate
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      onClick={() =>
                                        document
                                          .getElementById("dpt_certificate")
                                          .click()
                                      }
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to Train the Trainer</p>
                                    </div>
                                  )}
                                  <input
                                    id="dpt_certificate"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handlePersonalInputChange(
                                        e,
                                        "dpt_certificate"
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-md-6 mt-4">
                                  <label className="mb-1">
                                    Upload Diploma In Personal Training
                                    Certificate
                                  </label>
                                  {personalDetailsData.dpt_certificate ? (
                                    <div>
                                      <div
                                        className="row position-relative"
                                        style={{
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          margin: "0px 0px 0px 0px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "200px",
                                            position: "relative",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <img
                                            src={
                                              personalDetailsData.dpt_certificate
                                            }
                                            alt="Pan Card"
                                            style={{
                                              maxWidth: "100%",
                                              height: "auto",
                                              marginBottom: "5px",
                                            }}
                                          />
                                          <IconButton
                                            onClick={() =>
                                              handleRemovePersonalDetails(
                                                "dpt_certificate"
                                              )
                                            }
                                            className="px-1 py-1"
                                            style={{
                                              position: "absolute",
                                              top: 4,
                                              right: 15,
                                              backgroundColor:
                                                "rgba(255, 255, 255, 0.8)",
                                            }}
                                          >
                                            <DeleteIcon
                                              style={{ color: "#ff3838" }}
                                            />
                                          </IconButton>
                                        </div>
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            document
                                              .getElementById("dpt_certificate")
                                              .click()
                                          }
                                        >
                                          Change DPT Certificate
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      onClick={() =>
                                        document
                                          .getElementById("dpt_certificate")
                                          .click()
                                      }
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to DPT Certificate</p>
                                    </div>
                                  )}
                                  <input
                                    id="dpt_certificate"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handlePersonalInputChange(
                                        e,
                                        "dpt_certificate"
                                      )
                                    }
                                  />
                                </div>
                                <div className="col-md-6 mt-4">
                                  <label className="mb-1">
                                    Upload Diploma In Nutrition Course
                                    Certificate
                                  </label>
                                  {personalDetailsData.dnc_certificate ? (
                                    <div>
                                      <div
                                        className="row position-relative"
                                        style={{
                                          border: "2px dashed #ccc",
                                          padding: "20px",
                                          margin: "0px 0px 0pc 0px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "200px",
                                            position: "relative",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          <img
                                            src={
                                              personalDetailsData.dnc_certificate
                                            }
                                            alt="GST Certificate"
                                            style={{
                                              maxWidth: "100%",
                                              height: "auto",
                                              marginBottom: "5px",
                                            }}
                                          />
                                          <IconButton
                                            onClick={() =>
                                              handleRemovePersonalDetails(
                                                "dnc_certificate"
                                              )
                                            }
                                            className="px-1 py-1"
                                            style={{
                                              position: "absolute",
                                              top: 4,
                                              right: 15,
                                              backgroundColor:
                                                "rgba(255, 255, 255, 0.8)",
                                            }}
                                          >
                                            <DeleteIcon
                                              style={{ color: "#ff3838" }}
                                            />
                                          </IconButton>
                                        </div>
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            document
                                              .getElementById("dnc_certificate")
                                              .click()
                                          }
                                        >
                                          Change DNC Certificate
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      onClick={() =>
                                        document
                                          .getElementById("dnc_certificate")
                                          .click()
                                      }
                                      style={{
                                        border: "2px dashed #ccc",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <i className="fas fa-upload" />
                                      <p>Click to Upload DNC Certificate</p>
                                    </div>
                                  )}
                                  <input
                                    id="dnc_certificate"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handlePersonalInputChange(
                                        e,
                                        "dnc_certificate"
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="dashboard-list-wraps bg-white rounded mb-4">
                            <div className="dashboard-list-wraps-head br-bottom py-3 px-3">
                              <div className="dashboard-list-wraps-flx">
                                <h4 className="mb-0 ft-medium fs-md">
                                  <i class="fa fa-file-invoice me-2 theme-cl fs-sm"></i>
                                  Payment Info
                                </h4>
                              </div>
                            </div>
                            <div className="dashboard-list-wraps-body bg-white py-3 px-3">
                              <div className="row justify-content-center">
                                <div className="col-12 mb-3 border bg-white p-3 br-15 d-none d-md-block">
                                  <div className="col-12 p-0 mt-2">
                                    <ul className="list-unstyled border-bottom">
                                      <li className="d-block mb-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-inline-block p-0 text-left">
                                            <p className="m-0 f-rob-reg f-16 text-secondary">
                                              Fees
                                            </p>
                                          </div>
                                          <div className="d-inline-block p-0 text-right">
                                            <p className="m-0 f-rob-med f-16">
                                              ₹ {50000 || 0} /-
                                            </p>
                                          </div>
                                        </div>
                                      </li>

                                      {/* {totalDiscount !== 0 && ( */}
                                      <li className="d-block mb-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-inline-block p-0 text-left">
                                            <p className="m-0 f-rob-reg f-16 text-secondary">
                                              GCS (0%)
                                            </p>
                                          </div>
                                          <div className="d-inline-block p-0 text-success text-right">
                                            <p className="m-0 f-rob-med f-16 text-red">
                                              ₹ 0 /-
                                            </p>
                                          </div>
                                        </div>
                                      </li>
                                      {/* )} */}
                                      <li className="d-block mb-3">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-inline-block p-0 text-left">
                                            <p className="m-0 f-rob-reg f-16 text-secondary">
                                              Payable Amount
                                            </p>
                                          </div>
                                          <div className="d-inline-block p-0 text-right">
                                            <p className="m-0 f-rob-med f-16">
                                              <span className="f-rob-med f-16 text-green text-uppercase ml-1">
                                                ₹ {50000 || 0} /-
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-12 p-0">
                                    <div className="d-flex align-items-center justify-content-between">
                                      <div className="d-inline-block">
                                        <p className="m-0 f-rob-med f-16">
                                          Total Amount
                                        </p>
                                      </div>
                                      <div className="d-inline-block">
                                        <p className="m-0 f-rob-med f-16">
                                          ₹ {50000 || 0} /-
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 d-flex justify-content-center">
                                  <div className="form-group">
                                    <button
                                      className="btn theme-bg rounded text-light add-listing-btn"
                                      onClick={handleSubmit}
                                    >
                                      Pay &amp; Continue
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
          <Modal.Title>Crop Logo Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ position: "relative", width: "100%", height: 400 }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={8 / 8}
              onCropChange={setCrop}
              onCropComplete={(croppedArea, profilePhoto) =>
                onCropComplete(croppedArea, profilePhoto, "logo")
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
            onClick={() => handleCropComplete("logo")}
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
      <Modal show={inptaShow} onHide={handleInptaClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Crop Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ position: "relative", width: "100%", height: 400 }}>
            <Cropper
              image={inptaImageSrc}
              crop={inptaCrop}
              zoom={inptaZoom}
              aspect={12 / 8}
              onCropChange={setInptaCrop}
              onCropComplete={(croppedArea, profilePhoto) =>
                onCropComplete(croppedArea, profilePhoto, "feature")
              }
              onZoomChange={setInptaZoom}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleInptaClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleInptaCropComplete("feature")}
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
export default AuditorVerification;

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

// Helper function to convert base64 to Blob
const base64ToBlob = async (base64String) => {
  if (!base64String || typeof base64String !== "string") return null;
  
  try {
    const byteString = atob(base64String.split(",")[1]);
    const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    return new Blob([ab], { type: mimeString });
  } catch (error) {
    console.error("Error converting base64 to blob:", error);
    return null;
  }
};
