import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.css";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/rsuite.min.css";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ModalVideo from "react-modal-video";

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

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = "pdf/inpta.pdf";
    link.download = "inpta.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* <Helmet>
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
      </Helmet> */}
      <>
        <ModalVideo
          channel="youtube"
          isOpen={isVideoOpen}
          videoId={videoUrlPopUp}
          onClose={closeVideoModal}
        />
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
          {/* bg-registration */}
          <div className="container-fluid bg-white">
            <div className="container-md">
              <div className="goodup-dashboard-wrap gray px-4 pt-5 add-listing-page margintop">
                <div className="goodup-dashboard-content text-start">
                  <div className="dashboard-widg-bar d-block">
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex justify-content-center">
                          <div className="text-center">
                            <h6 className="section-title show-title text-center px-3">
                              <span
                                className="text-primary px-3 position-relative"
                                style={{
                                  zIndex: 1,
                                  // backgroundColor: "#f3f3f3",
                                  backgroundColor: "white",
                                }}
                              >
                                TP & TC
                              </span>
                            </h6>
                            <h1 className="mt-1 mb-5 home-title">
                              Registration
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-2">
                        <div className="row justify-content-center">
                          <div className="col-md-7 wow fadeInUp">
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
                            </div>
                            <div className="d-flex justify-content-center">
                              <button
                                className="btn theme-bg rounded text-light add-listing-btn"
                                onClick={downloadPDF}
                              >
                                Download PDF
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 my-5">
                <div className="row justify-content-center">
                  <div className="col-md-9 wow fadeInUp">
                    <div className="col-12 d-flex justify-content-center">
                      <div>
                        <h6 className="section-title show-title text-start text-primary pe-3">
                          <span
                            className="text-primary pe-2 position-relative"
                            style={{
                              zIndex: 1,
                              // backgroundColor: "#f3f3f3",
                              backgroundColor: "white",
                            }}
                          >
                            How to Registration
                          </span>
                        </h6>
                        <h1 className="mb-4 home-title">
                          Registration Flow Chart
                        </h1>
                      </div>
                    </div>
                    <div className="mb-4">
                      <img
                        width="100%"
                        style={{
                          borderRadius: "10px 10px 0px 0px",
                        }}
                        alt="client journey"
                        src="images/registration-chartflow.webp"
                      />
                    </div>
                    {/* <p className="mb-2">
                              INPTA is India's government-approved accreditation
                              body transforming the fitness industry. We empower
                              gyms with new revenue streams through professional
                              trainer certifications and structured education
                              programs. Our offerings include,
                            </p>
                            <div className="row justify-content-between">
                              <div className="col-md-3">
                                <p className="mb-2">
                                  <div className="mb-2">
                                    <b className="text-dark pb-3">
                                      (1) TP Registration
                                    </b>
                                  </div>
                                  <div>
                                    <i className="fa fa-arrow-right text-primary me-1"></i>{" "}
                                    feel personal details
                                  </div>
                                  <div>
                                    <i className="fa fa-arrow-right text-primary me-1"></i>{" "}
                                    10000 entry fees
                                  </div>
                                </p>
                              </div>
                              <div className="col-md-7">
                                <p className="mb-2">
                                  <div className="mb-2">
                                    <b className="text-dark pb-3">
                                      (2) TC Registration
                                    </b>
                                  </div>
                                  <div>1. Training Center details:</div>
                                  <div>
                                    <i className="fa fa-arrow-right text-primary me-1"></i>{" "}
                                    add gym photos
                                  </div>
                                  <div>
                                    <i className="fa fa-arrow-right text-primary me-1"></i>{" "}
                                    pan card and gst certificate
                                  </div>
                                  <div>
                                    <i className="fa fa-arrow-right text-primary me-1"></i>{" "}
                                    80000 fees
                                  </div>
                                </p>
                                <p className="mb-2">
                                  2. Submit Certificate
                                  <div>
                                    <i className="fa fa-arrow-right text-primary me-1"></i>{" "}
                                    add certificate
                                  </div>
                                  <div>
                                    <i className="fa fa-arrow-right text-primary me-1"></i>{" "}
                                    80000 fees
                                  </div>
                                </p>

                                <p className="mb-2">
                                  3. Auditor Verification
                                  <div>
                                    <i className="fa fa-arrow-right text-primary me-1"></i>{" "}
                                    80000 fees
                                  </div>
                                </p>
                              </div>
                            </div> */}
                    {/* <div className="row gy-2 gx-4 mb-4">
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
                            </div> */}
                    <div className="col-12 d-flex justify-content-center">
                      <Link
                        className="btn btn-primary py-3 px-5 mt-2"
                        to="/training-partner"
                      >
                        Start Listing
                      </Link>
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
