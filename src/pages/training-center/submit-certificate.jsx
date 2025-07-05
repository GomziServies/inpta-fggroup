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

const TPRegistrationSubmitCertificate = () => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsCorrect, setIsDetailsCorrect] = useState(false);
  const [personalDetailsData, setPersonalDetailsData] = useState({
    train_the_trainer: null,
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
      const postData = {
        tc_status: "tc_certificate",
        certificates: personalDetailsData.train_the_trainer,
      };

      const result = await inptaListingAxiosInstance.post(
        "/create-tc-listing",
        postData
      );

      if (result) {
        toast.success("Listing created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
          handlePaymentSubmit(result?.data?.data?._id);
        }, 500);
      }

      setIsLoading(false);
      // window.location.href = "/training-center/auditor-verification";
    } catch (error) {
      console.error("Error uploading files:", error);
      setIsLoading(false);
      toast.error(error?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
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
                                              ₹ {80000 || 0} /-
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
                                                ₹ {80000 || 0} /-
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
                                          ₹ {80000 || 0} /-
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
