import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../assets/css/style.css";
import Header from "../components/Header";
import axiosInstance, { inptaListingAxiosInstance } from "../js/api";
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
import Footer from "../components/Footer";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
    description: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  });
  const [userUpdateData, setUserUpdateData] = useState({});
  const [inptaHours, setInptaHours] = useState([
    { day: "Mon", open: "10:00 AM", close: "07:00 PM" },
  ]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { platform: "Instagram", link: "Instagram.com" },
    { platform: "Facebook", link: "Facebook.com" },
    { platform: "YouTube", link: "YouTube.com" },
  ]);
  const [selectedType, setSelectedType] = useState("");
  const [isDetailsCorrect, setIsDetailsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingOne, setLoadingOne] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [selectedCourseOffered, setSelectedCourseOffered] = useState("");

  const handleSelectChange = (selectedOptions) => {
    setSelectedCourseOffered(selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prevState) => ({
      ...prevState,
      course_offered: selectedValues,
    }));
  };

  const courseOfferedOption = [
    { value: "Nutri Trainer Course", label: "Nutri Trainer Course" },
    {
      value: "Diploma In Personal Training Course",
      label: "Diploma In Personal Training Course",
    },
    {
      value: "Diploma In Nutrition Course",
      label: "Diploma In Nutrition Course",
    },
    {
      value: "Anabolic Androgenic Steroids",
      label: "Anabolic Androgenic Steroids",
    },
    {
      value: "Group Instructor Master Class",
      label: "Group Instructor Master Class",
    },
    {
      value: "Powerlifting Coach Workshop",
      label: "Powerlifting Coach Workshop",
    },
    {
      value: "Injury Rehabilitation Workshop",
      label: "Injury Rehabilitation Workshop",
    },
  ];

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

  const [inptaPhotos, setInptaPhotos] = useState([]);
  const [featurePreview, setFeaturePreview] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(null);
  const [currentInptaPhotoIndex, setCurrentInptaPhotoIndex] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
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
        setLogoImage(file);
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
          setFeaturePreview(croppedImg);
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

  const handleRemoveInptaPhoto = (index) => {
    const newPhotos = [...inptaPhotos];
    newPhotos.splice(index, 1);
    setInptaPhotos([...newPhotos]);
  };

  const handleSelectFeature = () => {
    const fileInput = document.getElementById("featureInput");
    fileInput.click();
  };

  const handleCropInptaPhoto = (event, index) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInptaImageSrc(reader.result);
        setCurrentInptaPhotoIndex(index);
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
        const updatedPhotos = [...inptaPhotos];
        if (currentPhotoIndex !== null) {
          updatedPhotos[currentPhotoIndex] = {
            file: null,
            preview: croppedImg,
          };
        } else {
          updatedPhotos.push({ file: null, preview: croppedImg });
        }
        setInptaPhotos(updatedPhotos);
        setFeaturePreview(croppedImg);
        setInptaShow(false);
      } catch (error) {
        console.error("Error cropping the photos:", error);
      }
    }
    setLoadingTwo(false);
  };

  // ----------------------------------------------------------------------------------

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index) => {
    const updatedFaqs = [...faqs];
    updatedFaqs.splice(index, 1);
    setFaqs(updatedFaqs);
  };

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };

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
      const photoUrls = await Promise.all(
        inptaPhotos.map(async (photo) => {
          let croppedBlobInpta = photo.preview;

          if (typeof photo.preview === "string") {
            const byteString = atob(photo.preview.split(",")[1]);
            const mimeString = photo.preview
              .split(",")[0]
              .split(":")[1]
              .split(";")[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
            croppedBlobInpta = new Blob([ab], { type: mimeString });
          } else if (!(photo.preview instanceof Blob)) {
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
          return photoResponse.data.data.fileURLs;
        })
      );

      uploadedUrls = photoUrls.flat();
    } catch (error) {
      console.error("Error uploading Feature files:", error);
      toast.error("Error uploading Feature files. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return uploadedUrls;
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
      const uploadedUrls = await uploadFeatureImage();
      const logoUrl = await uploadLogo();

      const postData = {
        type: selectedType,
        title: formData.title,
        description: formData.description,
        course_offered: formData.course_offered,
        logo: logoUrl,
        images: uploadedUrls.flat(),
        tags: formData.tags,
        listing_category: ["listing"],
        personal_details: {
          description: personalDetailsData.description,
          question1: personalDetailsData.question1,
          question2: personalDetailsData.question2,
          question3: personalDetailsData.question3,
          question4: personalDetailsData.question4,
          question5: personalDetailsData.question5,
        },
        social_media: socialMediaLinks.map((link) => ({
          social_media_type: link.platform.toLowerCase(),
          link: link.link,
        })),
        locations: [
          {
            location_name: formData.branch,
            address_line_1: formData.address_line_1,
            address_line_2: formData.address_line_2,
            city: formData.city,
            state: formData.state,
            country: "india",
            pin_code: formData.pin_code,
            landmark: formData.landmark,
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
        faqs: faqs.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        })),
        timings: inptaHours.map((timeSlot) => ({
          title: timeSlot.day,
          timings: [
            {
              from_time: timeSlot.open,
              to_time: timeSlot.close,
            },
          ],
        })),
      };

      await inptaListingAxiosInstance.post("/create-listing", postData);
      updateData();

      setIsLoading(false);
      toast.success("Listing created successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      setIsLoading(false);
      toast.error(error?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const [times, setTimes] = useState({
    Monday: { opening: "Opening Time", closing: "Closing Time" },
    Tuesday: { opening: "Opening Time", closing: "Closing Time" },
    Wednesday: { opening: "Opening Time", closing: "Closing Time" },
    Thursday: { opening: "Opening Time", closing: "Closing Time" },
    Friday: { opening: "Opening Time", closing: "Closing Time" },
    Saturday: { opening: "Opening Time", closing: "Closing Time" },
    Sunday: { opening: "Opening Time", closing: "Closing Time" },
  });

  const [sameForAll, setSameForAll] = useState(false);

  const timeOptions = [
    "01:00 AM",
    "02:00 AM",
    "03:00 AM",
    "04:00 AM",
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 PM",
    "Closed",
  ];

  const handleTimeChange = (day, field, value) => {
    const updatedTimes = { ...times };
    updatedTimes[day][field] = value;

    if (sameForAll) {
      Object.keys(updatedTimes).forEach((key) => {
        updatedTimes[key] = { ...updatedTimes[day] };
      });
    }
    setTimes(updatedTimes);
  };

  const handleCheckboxChange = (checked) => {
    setSameForAll(checked);
    if (checked) {
      const mondayTimes = times.Monday;
      const updatedTimes = { ...times };
      Object.keys(updatedTimes).forEach((day) => {
        updatedTimes[day] = { ...mondayTimes };
      });
      setTimes(updatedTimes);
    }
  };

  const getInptaHours = () => {
    const allDaysTime = Object.keys(times).map((day) => ({
      day,
      open: times[day].opening,
      close: times[day].closing,
    }));
    setInptaHours(allDaysTime);
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
          <div className="goodup-dashboard-wrap gray px-4 py-5 add-listing-page margintop">
            <div className="goodup-dashboard-content text-start">
              <div className="dashboard-widg-bar d-block">
                <div className="row">
                  <div className="col-xl-12 col-md-12 col-sm-12">
                    <div className="submit-form">
                      <div className="dashboard-list-wraps bg-white rounded mb-4">
                        <div className="dashboard-list-wraps-head br-bottom py-3 px-3">
                          <div className="dashboard-list-wraps-flx">
                            <h4 className="mb-0 ft-medium fs-md">
                              <i className="fa fa-file me-2 theme-cl fs-sm" />
                              Personal Info
                            </h4>
                          </div>
                        </div>
                        <div className="dashboard-list-wraps-body py-3 px-3">
                          <div className="row">
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
                                <label className="mb-1">Email</label>
                                <input
                                  type="text"
                                  className="form-control rounded"
                                  placeholder="Enter Email"
                                  value={formData.email}
                                  onChange={(e) =>
                                    handleInputChange("email", e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            {/* <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label className="mb-1">Email</label>
                                <input
                                  type="text"
                                  className="form-control rounded"
                                  placeholder="Enter Email"
                                  value={userUpdateData.email || userData.email}
                                  onChange={(e) =>
                                    handleUserInputChange(
                                      "email",
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
                                  value={
                                    userUpdateData.city ||
                                    userData?.address?.city
                                  }
                                  onChange={(e) =>
                                    handleUserInputChange(
                                      "city",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div> */}
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
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
                                <label className="mb-1">Website</label>
                                <input
                                  type="text"
                                  className="form-control rounded"
                                  placeholder="Enter Website"
                                  value={formData.website}
                                  onChange={(e) =>
                                    handleInputChange("website", e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label className="mb-1">
                                  Current Job Specification
                                </label>
                                <input
                                  type="text"
                                  className="form-control rounded"
                                  placeholder="Enter Job Specification"
                                  value={personalDetailsData.question1}
                                  onChange={(e) =>
                                    handlePersonalInputChange(
                                      "question1",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label className="mb-1">
                                  Education Qaulification
                                </label>
                                <input
                                  type="text"
                                  className="form-control rounded"
                                  placeholder="Enter Qaulification"
                                  value={personalDetailsData.question2}
                                  onChange={(e) =>
                                    handlePersonalInputChange(
                                      "question2",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label className="mb-1">
                                  What do you want to start your own academy in
                                  health and fitness industry?
                                </label>
                                <textarea
                                  rows={4}
                                  className="form-control rounded height-line"
                                  placeholder="Answer..."
                                  defaultValue={""}
                                  value={personalDetailsData.question3}
                                  onChange={(e) =>
                                    handlePersonalInputChange(
                                      "question3",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label className="mb-1">
                                  What experties you carried currently?
                                </label>
                                <textarea
                                  rows={4}
                                  className="form-control rounded height-line"
                                  placeholder="Answer..."
                                  defaultValue={""}
                                  value={personalDetailsData.question4}
                                  onChange={(e) =>
                                    handlePersonalInputChange(
                                      "question4",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label className="mb-1">
                                  What certification you have did earlier?
                                </label>
                                <textarea
                                  rows={4}
                                  className="form-control rounded height-line"
                                  placeholder="Answer..."
                                  defaultValue={""}
                                  value={personalDetailsData.question5}
                                  onChange={(e) =>
                                    handlePersonalInputChange(
                                      "question5",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="dashboard-list-wraps bg-white rounded mb-4">
                        <div className="dashboard-list-wraps-head br-bottom py-3 px-3">
                          <div className="dashboard-list-wraps-flx">
                            <h4 className="mb-0 ft-medium fs-md">
                              <i className="fa fa-file me-2 theme-cl fs-sm" />
                              Listing Info
                            </h4>
                          </div>
                        </div>
                        <div className="dashboard-list-wraps-body py-3 px-3">
                          <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label className="mb-1">Listing Title</label>
                                <input
                                  type="text"
                                  className="form-control rounded"
                                  placeholder="Enter Listing Title"
                                  value={formData.title}
                                  onChange={(e) =>
                                    handleInputChange("title", e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label className="mb-1">About Listing</label>
                                <textarea
                                  className="form-control rounded ht-150"
                                  placeholder="Describe..."
                                  defaultValue={""}
                                  value={formData.description}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "description",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label className="mb-1">Type</label>
                                <select
                                  className="form-control"
                                  value={selectedType}
                                  onChange={(e) =>
                                    setSelectedType(e.target.value)
                                  }
                                >
                                  <option>Select Type</option>
                                  <option value="Gym">Gym</option>
                                  <option value="Institute">Institute</option>
                                  <option value="Fitness Studio">
                                    Fitness Studio
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label className="mb-1">Tags</label>
                                <TagInput
                                  type="text"
                                  className="form-control type rounded"
                                  placeholder="Add Tags"
                                  value={formData.tags}
                                  onChange={(value) =>
                                    handleInputChange("tags", value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12 col-sm-12">
                              <div className="form-group">
                                <label className="mb-1">Course Offered</label>
                                <Select
                                  isMulti
                                  options={courseOfferedOption}
                                  value={selectedCourseOffered}
                                  onChange={handleSelectChange}
                                  placeholder="Select Course Offered"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}

                      <div className="dashboard-list-wraps bg-white rounded mb-4">
                        <div className="dashboard-list-wraps-head br-bottom py-3 px-3">
                          <div className="dashboard-list-wraps-flx">
                            <h4 className="mb-0 ft-medium fs-md">
                              <i className="fas fa-map-marker-alt me-2 theme-cl fs-sm" />
                              Location Info
                            </h4>
                          </div>
                        </div>
                        <div className="dashboard-list-wraps-body py-3 px-3">
                          <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                              <div className="form-group">
                                <label className="mb-1">
                                  Block Number / Building Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control rounded"
                                  placeholder="Enter Block Number / Building Name"
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
                                  Street / Colony Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control rounded"
                                  placeholder="Enter Street / Colony Name"
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
                                    handleInputChange("city", e.target.value)
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
                                    handleInputChange("state", e.target.value)
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
                                    handleInputChange("country", e.target.value)
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
                        <div className="dashboard-list-wraps-body py-3 px-3">
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
                                  Submit &amp; Preview
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
