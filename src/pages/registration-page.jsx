import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../assets/css/style.css";
import Header from "../components/Header";
import axiosInstance, { inptaListingAxiosInstance } from "../js/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "rsuite/dist/rsuite.min.css";
import { Modal } from "react-bootstrap";
import Cropper from "react-easy-crop";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeData, setActiveData] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrlPopUp, setVideoUrlPopUp] = useState("");

  const openVideoModal = (url) => {
    setIsVideoOpen(true);
    setVideoUrlPopUp(url);
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrlPopUp("");
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
              <div className="goodup-dashboard-wrap gray px-4 py-5 add-listing-page margintop">
                <div className="goodup-dashboard-content text-start">
                  <div className="dashboard-widg-bar d-block">
                    <div className="row">
                      <div className="col-12">
                        <div className="col-12 p-0 mt-4 meal">
                          <p className="mt-5 mb-3 text-center fs-20">
                            Registration :-
                          </p>
                        </div>
                        <div className="row meal">
                          <div
                            className={`order-tracking ${
                              activeData === "document" ||
                              activeData === "final" ||
                              activeData === "checkOut"
                                ? "completed"
                                : ""
                            }`}
                          >
                            <span className="is-complete"></span>
                            <p>Training & Placement</p>
                          </div>
                          <div
                            className={`order-tracking ${
                              activeData === "final" ||
                              activeData === "checkOut"
                                ? "completed"
                                : ""
                            }`}
                          >
                            <span className="is-complete"></span>
                            <p>Training Center</p>
                          </div>
                          <div
                            className={`order-tracking ${
                              activeData === "checkOut" ? "completed" : ""
                            }`}
                          >
                            <span className="is-complete"></span>
                            <p>Check Out</p>
                          </div>
                          <div
                            className={`order-tracking ${
                              activeData === "checkOut" ? "completed" : ""
                            }`}
                          >
                            <span className="is-complete"></span>
                            <p>Check Out</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-5">
                        <div className="row justify-content-center">
                          <div className="col-7 wow fadeInUp container-min-height d-md-block d-none">
                            <div className="position-relative mb-3">
                              <div className="video-img">
                                <div className="ply1 black-before">
                                  <img
                                    width="100%"
                                    style={{
                                      borderRadius: "10px 10px 0px 0px",
                                    }}
                                    alt="client journey"
                                    src="images/about-banner.webp"
                                  />
                                  <div className="video-btn">
                                    <a
                                      onClick={() =>
                                        openVideoModal("L8OFnO8llJw")
                                      }
                                      data-flashy-type="video"
                                      className="custom"
                                    >
                                      <span className="newthing">
                                        <i className="fas fa-play"></i>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-center">
                              <button
                                className="btn theme-bg rounded text-light add-listing-btn"
                                // onClick={handleSubmit}
                              >
                                Download PDF
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-5">
                        <div className="row justify-content-center">
                          <div className="col-7 wow fadeInUp">
                            <h6 className="section-title text-start text-primary pe-3">
                              About INPTA
                            </h6>
                            <h1 className="mb-4 home-title">What is INPTA?</h1>
                            <div className="d-md-none d-block mb-3">
                              <div className="video-img">
                                <div className="ply1 black-before">
                                  <img
                                    width="100%"
                                    style={{
                                      borderRadius: "10px 10px 0px 0px",
                                    }}
                                    alt="client journey"
                                    src="images/about-banner.webp"
                                  />
                                  <div className="video-btn">
                                    <a
                                      onClick={() =>
                                        openVideoModal("iXfDpfwURBQ")
                                      }
                                      data-flashy-type="video"
                                      className="custom"
                                    >
                                      <span className="newthing">
                                        <i className="fas fa-play"></i>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              {/* <img
                                              className="img-fluid w-100 "
                                              src="images/about-banner.webp"
                                              alt=""
                                            /> */}
                            </div>
                            <p className="mb-2">
                              INPTA is India's government-approved accreditation
                              body transforming the fitness industry. We empower
                              gyms with new revenue streams through professional
                              trainer certifications and structured education
                              programs. Our offerings include,
                            </p>
                            <p className="mb-2">
                              INPTA is India's government-approved accreditation
                              body transforming the fitness industry. We empower
                              gyms with new revenue streams through professional
                              trainer certifications and structured education
                              programs. Our offerings include,
                            </p>
                            <p className="mb-2">
                              INPTA is India's government-approved accreditation
                              body transforming the fitness industry. We empower
                              gyms with new revenue streams through professional
                              trainer certifications and structured education
                              programs. Our offerings include,
                            </p>
                            <p className="mb-4">
                              INPTA is India's government-approved accreditation
                              body transforming the fitness industry. We empower
                              gyms with new revenue streams through professional
                              trainer certifications and structured education
                              programs. Our offerings include,
                            </p>
                            <div className="row gy-2 gx-4 mb-4">
                              <div className="col-sm-6">
                                <p className="mb-0">
                                  <i className="fa fa-arrow-right text-primary me-2"></i>
                                  Government-Approved Accreditation
                                </p>
                              </div>
                              <div className="col-sm-6">
                                <p className="mb-0">
                                  <i className="fa fa-arrow-right text-primary me-2"></i>
                                  Revenue Growth for Gyms/Academy
                                </p>
                              </div>
                            </div>
                            <Link
                              className="btn btn-primary py-3 px-5 mt-2"
                              to="/training-and-placement"
                            >
                              Next
                            </Link>
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
export default RegistrationPage;
