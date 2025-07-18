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
import { createTCSubmitCertificatePayment } from "../../assets/utils/tc_payment";
import { useNavigate } from "react-router-dom";

const TPRegistrationSubmitCertificate = () => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsCorrect, setIsDetailsCorrect] = useState(false);
  const [personalDetailsData, setPersonalDetailsData] = useState({
    train_the_trainer: null,
  });
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [listingId, setListingId] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    checkCertificateStatus();
  }, []);
  
  const checkCertificateStatus = async () => {
    setCheckingStatus(true);
    try {
      const storedListingId = localStorage.getItem("tc_listing_id");
      
      if (!storedListingId) {
        const response = await inptaListingAxiosInstance.get("/get-tc-listing");
        
        if (response?.data?.data?.length > 0) {
          const listing = response.data.data[0];
          setListingId(listing._id);
          localStorage.setItem("tc_listing_id", listing._id);
          
          if (listing.certificateSubmitted === true) {
            toast.info("Certificate already submitted. Redirecting to auditor verification...");
            localStorage.setItem("tc_listing_certificate_submitted", "true");
            setTimeout(() => {
              navigate("/training-center/auditor-verification");
            }, 2000);
            return;
          }
          
          if (!listing.tcForm) {
            toast.error("Please complete training center registration first");
            setTimeout(() => {
              navigate("/training-center");
            }, 2000);
            return;
          }
          
          if (!listing.tcPayment) {
            toast.error("Please complete payment first");
            setTimeout(() => {
              navigate("/training-center/payment");
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
          
          if (listing.certificateSubmitted === true) {
            toast.info("Certificate already submitted. Redirecting to auditor verification...");
            localStorage.setItem("tc_listing_certificate_submitted", "true");
            setTimeout(() => {
              navigate("/training-center/auditor-verification");
            }, 2000);
            return;
          }
          
          if (!listing.tcForm) {
            toast.error("Please complete training center registration first");
            setTimeout(() => {
              navigate("/training-center");
            }, 2000);
            return;
          }
          
          if (!listing.tcPayment) {
            toast.error("Please complete payment first");
            setTimeout(() => {
              navigate("/training-center/payment");
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
      console.error("Error checking certificate status:", error);
      toast.error("Error checking status. Please try again.");
    } finally {
      setCheckingStatus(false);
    }
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Upload certificate file
      let certificateUrl = "";
      
      if (personalDetailsData.train_the_trainer) {
        // Convert base64 to blob
        const certBlob = await base64ToBlob(personalDetailsData.train_the_trainer);
        
        if (certBlob) {
          const certFormData = new FormData();
          certFormData.append("files", certBlob);
          
          const certResponse = await axiosInstance.post(
            "/file-upload",
            certFormData
          );
          
          certificateUrl = certResponse.data.data.fileURLs[0];
        }
      }

      const postData = {
        listing_id: listingId,
        certificates: certificateUrl,
        certificateSubmitted: false,
        tc_status: "tc_certificate",
      };

      const result = await inptaListingAxiosInstance.patch(
        "/update-tc-listing",
        postData
      );

      if (result) {
        toast.success("Certificate uploaded successfully!", {
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
      toast.error(error?.message || "Error uploading certificate", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  
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

  const handlePaymentSubmit = async (listing_id) => {
    try {
      try {
        await createTCSubmitCertificatePayment(listing_id);
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
                      <ProgressBar activeData="second" pendingData="third" />
                      <div className="col-12 mb-4 text-center">
                        <h2 className="mb-0 ft-medium fs-md">
                          TC Submit Certificate
                        </h2>
                      </div>
                      <div className="col-xl-12 col-md-12 col-sm-12">
                        <div className="submit-form">
                          <div className="dashboard-list-wraps bg-white rounded mb-4">
                            <div className="dashboard-list-wraps-head br-bottom py-3 px-3">
                              <div className="dashboard-list-wraps-flx">
                                <h4 className="mb-0 ft-medium fs-md">
                                  <i className="fa fa-file me-2 theme-cl fs-sm" />
                                  Submit Certificate
                                </h4>
                              </div>
                            </div>
                            <div className="dashboard-list-wraps-body bg-white py-3 px-3">
                              <div className="row">
                                <div className="col-md-12 mt-4">
                                  <label className="mb-1">
                                    Upload Train the Trainer Certificate
                                  </label>
                                  {personalDetailsData.train_the_trainer ? (
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
                                              personalDetailsData.train_the_trainer
                                            }
                                            alt="Certificate"
                                            style={{
                                              maxWidth: "100%",
                                              height: "auto",
                                              marginBottom: "5px",
                                            }}
                                          />
                                          <IconButton
                                            onClick={() =>
                                              handleRemovePersonalDetails(
                                                "train_the_trainer"
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
                                              .getElementById("certificate")
                                              .click()
                                          }
                                        >
                                          Change Certificate
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="dropzone"
                                      onClick={() =>
                                        document
                                          .getElementById("certificate")
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
                                      <p>Click to Upload Certificate</p>
                                    </div>
                                  )}
                                  <input
                                    id="certificate"
                                    type="file"
                                    accept="image/*"
                                    className="d-none"
                                    onChange={(e) =>
                                      handlePersonalInputChange(
                                        e,
                                        "train_the_trainer"
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
    </div>
  );
};
export default TPRegistrationSubmitCertificate;
