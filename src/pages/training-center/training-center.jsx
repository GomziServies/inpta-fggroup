import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../../assets/css/style.css";
import Header from "../../components/Header";
import axiosInstance, { inptaListingAxiosInstance } from "../../js/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IconButton } from "@mui/material";
import { TagInput } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Modal } from "react-bootstrap";
import Cropper from "react-easy-crop";
import Footer from "../../components/Footer";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProgressBar from "../../components/progress-bar/registration-progress-bar";
import { createTCPayment } from "../../assets/utils/tc_payment";

const TPRegistrationListing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address_line_1: "",
    address_line_2: "",
    area: "",
    landmark: "",
    city: "",
    country: "",
    state: "",
    pin_code: "",
    contactNumber: "",
    whatsappNumber: "",
    services: [],
    tags: [],
    website: "",
    email: "",
    branch: "",
  });

  const [personalDetailsData, setPersonalDetailsData] = useState({
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

  const [userUpdateData, setUserUpdateData] = useState({});
  const [isDetailsCorrect, setIsDetailsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingOne, setLoadingOne] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);

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

  const [inptaPhotos, setInptaPhotos] = useState({
    gym: null,
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

  const uploadLogo = async () => {
    let logoUrl = "";

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
        const logoFormData = new FormData();
        logoFormData.append("files", croppedBlob);

        const logoResponse = await axiosInstance.post(
          "/file-upload",
          logoFormData
        );

        const logoUrl = logoResponse.data.data.fileURLs[0];
        return logoUrl;
      }
    } catch (error) {
      console.error("Error uploading Logo file:", error);
      toast.error("Error uploading Logo file. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      throw error;
    }
  };

  const uploadFeatureImage = async () => {
    let uploadedUrls = [];
    try {
      const inptaPhotosArray = [
        { label: inptaPhotos.gym, value: "gym" },
        { label: inptaPhotos.washroom, value: "washroom" },
        { label: inptaPhotos.dustbin, value: "dustbin" },
        { label: inptaPhotos.medical_kit, value: "medical_kit" },
        { label: inptaPhotos.gym_area, value: "gym_area" },
        { label: inptaPhotos.reception, value: "reception" },
        { label: inptaPhotos.staff, value: "staff" },
      ];

      const photoUrls = await Promise.all(
        inptaPhotosArray.map(async (photo) => {
          let croppedBlobInpta = photo.label;

          if (typeof photo.label === "string") {
            const byteString = atob(photo.label.split(",")[1]);
            const mimeString = photo.label
              .split(",")[0]
              .split(":")[1]
              .split(";")[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
            croppedBlobInpta = new Blob([ab], { type: mimeString });
          } else if (!(photo.label instanceof Blob)) {
            throw new Error(
              "Invalid file type: Photo must be a Blob, File, or Base64 string."
            );
          }

          const photoFormData = new FormData();
          photoFormData.append("files", croppedBlobInpta);

          const photoResponse = await axiosInstance.post(
            "/file-upload",
            photoFormData
          );
          return { [photo.value]: photoResponse.data.data.fileURLs[0] };
        })
      );

      uploadedUrls = photoUrls;
    } catch (error) {
      console.error("Error uploading Feature files:", error);
      toast.error("Error uploading Feature files. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return uploadedUrls;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const uploadedUrls = await uploadFeatureImage();
      const logoUrl = await uploadLogo();

      const postData = {
        tc_status: "tc_list",
        logo: logoUrl,
        images: uploadedUrls.flat(),
        document: [
          {
            pan_card: personalDetailsData.pan_card,
            gst_certificate: personalDetailsData.gst_certificate,
            dpt_certificate: personalDetailsData.dpt_certificate,
            dnc_certificate: personalDetailsData.dnc_certificate,
          },
        ],
      };

      const result = await inptaListingAxiosInstance.post(
        "/create-tc-listing",
        postData
      );
      updateData();

      if (result) {
        toast.success("Listing created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
          handlePaymentSubmit(result?.data?.data?._id);
        }, 500);
      }

      setIsLoading(false);
      window.location.href = "/training-center/submit-certificate";
    } catch (error) {
      console.error("Error uploading files:", error);
      setIsLoading(false);
      toast.error(error?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
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

  const handlePaymentSubmit = async (listing_id) => {
    try {
      try {
        await createTCPayment(listing_id);
      } catch (error) {
        console.error("Error during order:", error);
      }
      window.Razorpay && window.Razorpay.close && window.Razorpay.close();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error in handlePaymentSubmit:", error);
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
        {(loading || isLoading) && (
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
                      <ProgressBar activeData="first" pendingData="second" />
                      <div className="col-12 mb-4 text-center">
                        <h2 className="mb-0 ft-medium fs-md">
                          TC Registration
                        </h2>
                      </div>
                      <div className="col-xl-12 col-md-12 col-sm-12">
                        <div className="submit-form">
                          {/* <div className="dashboard-list-wraps bg-white rounded mb-4">
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
                                    <label className="mb-1">OTP</label>
                                    <input
                                      type="text"
                                      className="form-control rounded"
                                      placeholder="Enter OTP"
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
                                  <button
                                    className="btn theme-bg rounded text-light add-listing-btn"
                                    onClick={handleSubmit}
                                  >
                                    Submit OTP
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div> */}
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
                                  <label className="mb-1">
                                    Upload Logo (Upload a high-resolution logo
                                    of your training center or academy.)
                                  </label>

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
                                    Gym/Training Center Image (Upload a clear
                                    image of your facility's interior &
                                    exterior.)
                                  </label>
                                  {inptaPhotos.gym ? (
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
                                        {inptaPhotos.gym && (
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
                                                src={inptaPhotos.gym}
                                                alt={`INPTA Photo gym`}
                                                style={{
                                                  maxWidth: "100%",
                                                  height: "auto",
                                                  marginBottom: "5px",
                                                }}
                                              />
                                              <IconButton
                                                onClick={() =>
                                                  handleRemoveInptaPhoto("gym")
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
                                                    "gym"
                                                  )
                                                }
                                                style={{ display: "none" }}
                                                id={`photoInput-gym`}
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="mt-2 text-center">
                                        <button
                                          className="btn btn-primary rounded-pill px-3 py-1"
                                          onClick={() =>
                                            handleSelectFeature("gym")
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
                                      onClick={() => handleSelectFeature("gym")}
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
                                    id="gym"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handleCropInptaPhoto(e, "gym")
                                    }
                                    sx={{ mt: 2, mb: 2 }}
                                  />
                                </div>
                                <div className="col-md-6 mt-4">
                                  <label className="mb-1">Washroom Image</label>
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
                                  <label className="mb-1">
                                    Dustbin Image (Upload an image of the
                                    dustbin placement as part of hygiene
                                    verification.){" "}
                                  </label>
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
                                    Medical Kit Image (Upload an image of the
                                    first aid or medical kit available at your
                                    center.)
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
                                    Reception Image (Show a professional
                                    reception setup with staff (if applicable).)
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
                                  <label className="mb-1">
                                    Staff Image (Provide group/staff photos to
                                    verify the presence of qualified personnel.){" "}
                                  </label>
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
                                  Personal Document
                                </h4>
                              </div>
                            </div>
                            <div className="dashboard-list-wraps-body bg-white py-3 px-3">
                              <div className="row">
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
                                  <i className="fa fa-file me-2 theme-cl fs-sm" />
                                  Certificates
                                </h4>
                              </div>
                            </div>
                            <div className="dashboard-list-wraps-body bg-white py-3 px-3">
                              <div className="row">
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
                                <div className="col-12">
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
