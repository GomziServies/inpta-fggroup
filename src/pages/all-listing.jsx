import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../assets/css/style.css";
import Header from "../components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
import WhatsappBtn from "../components/WhatsappBtn";
import { inptaListingAxiosInstance } from "../js/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllListing = () => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const openVideoModal = (url) => {
    setIsVideoOpen(true);
    setVideoUrl(url);
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrl("");
  };

  const [educationData, setEducationData] = useState([]);
  const [loadingOne, setLoadingOne] = useState(false);

  const fetchInptaData = async () => {
    setLoadingOne(true);

    try {
      const response = await inptaListingAxiosInstance.get("/get-listing");
      const fetchedBusinessData = response.data.data;
      setEducationData(fetchedBusinessData);
    } catch (error) {
      console.error("Error in Getting Business Data:", error);
    }
    setLoadingOne(false);
  };

  useEffect(() => {
    fetchInptaData();
  }, []);

  const handleDeleteListing = async (listingId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this inpta!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await inptaListingAxiosInstance.delete(
          `/delete-listing?listing_id=${listingId}`
        );

        if (response.status === 200) {
          fetchInptaData();
        } else {
          Swal.fire("Error!", "Failed to delete the inpta.", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting inpta listing:", error);
      Swal.fire(
        "Error!",
        "An error occurred while deleting the inpta listing.",
        "error"
      );
    }
  };

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
        <title>Gym Listing</title>
        <meta
          name="description"
          content="Discover top business listings and services. Add your business, connect with customers, and explore opportunities to grow your brand on our platform!"
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
        <div id="main-wrapper">
          <div className="clearfix" />
          <section className="container-fluid p-0 text-start d-none d-md-block section-margin">
            <img
              src="images/main-page-banner.webp"
              className="img"
              alt=""
              width="100%"
            />
          </section>
          <section className="container-fluid p-0 text-start d-block d-md-none section-margin">
            <img
              src="images/main-page-banner-mobile.webp"
              className="img"
              alt=""
              width="100%"
            />
          </section>
          <section>
            <div className="container-xxl py-5 text-start mt-5">
              <div className="container">
                <div className="row g-5">
                  <div
                    className="col-lg-6 wow fadeInUp container-min-height d-md-block d-none"
                    data-wow-delay="0.1s"
                  >
                    <div className="position-relative h-100">
                      <img
                        className="img-fluid position-absolute w-100 h-100 object-fit-cover"
                        src="images/about.webp"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                    <h6 className="section-title bg-white text-start text-primary pe-3">
                      About INPTA
                    </h6>
                    <h1 className="mb-4 home-title">
                      Welcome to INPTA Accreditation
                    </h1>
                    <div className="d-md-none d-block mb-3">
                      <img
                        className="img-fluid w-100 "
                        src="images/about.webp"
                        alt=""
                      />
                    </div>
                    <p className="mb-4">
                      The International Network of Professional Training
                      Academies (INPTA) is a globally recognized organization
                      dedicated to enhancing the quality of fitness and health
                      education. With our accreditation, academies gain access
                      to
                    </p>
                    <div className="row gy-2 gx-4 mb-4">
                      <div className="col-sm-6">
                        <p className="mb-0">
                          <i className="fa fa-arrow-right text-primary me-2"></i>
                          Internationally Certified Programs
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p className="mb-0">
                          <i className="fa fa-arrow-right text-primary me-2"></i>
                          Global Networking Opportunities
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p className="mb-0">
                          <i className="fa fa-arrow-right text-primary me-2"></i>
                          Expert Guidance and Resources
                        </p>
                      </div>
                    </div>
                    <Link
                      className="btn btn-primary py-3 px-5 mt-2"
                      to="https://fggroup.in/inpta/home-inpta"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="space min gray py-5">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div class="sec_title position-relative text-center mb-5">
                    <h6 class="theme-cl mb-0">Recent Listings</h6>
                    <h2 class="ft-bold">Browse Recent Listings</h2>
                  </div>
                </div>
              </div>
              <div className="row g-4 justify-content-center">
                {educationData.map((education) => {
                  return (
                    <div
                      className="col-lg-4 col-md-6 wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <div className="course-item bg-light">
                        <Link
                          to={`/view-listing?listing_id=${education._id}`}
                          className="text-dark"
                        >
                          <div className="position-relative overflow-hidden">
                            <img
                              className="img-fluid"
                              src={`https://files.fggroup.in/${education?.images?.[0]}`}
                              alt={education.title}
                            />
                            <div className="accepted-btn">
                              {/* <a
                                href="#"
                                className="flex-shrink-0 btn btn-sm btn-success px-3 border-end"
                              >
                                Accepted
                              </a> */}
                              {education.approval_status.status ===
                              "APPROVED" ? (
                                <div className="Goodup-status open me-2">
                                  APPROVED
                                </div>
                              ) : education.approval_status.status ===
                                "REJECTED" ? (
                                <div className="Goodup-status bg-danger">
                                  REJECTED
                                </div>
                              ) : education.approval_status.status ===
                                "PENDING" ? (
                                <div className="Goodup-status pending">
                                  PENDING
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </Link>
                        <div className="text-center p-4 pb-0">
                          <h3 className="mb-0">
                            <Link
                              to={`/view-listing?listing_id=${education._id}`}
                              className="text-dark"
                            >
                              {education.title}
                            </Link>{" "}
                          </h3>
                          <div className="mb-3">
                            {/* {[...Array(5)].map((_, index) => (
                                <i
                                  className="fas fa-star"
                                  key={index}
                                  style={{
                                    color:
                                      index <
                                      education.review_stats.average_rating
                                        ? "#F09000"
                                        : "#ccc",
                                  }}
                                />
                              ))} */}
                            {/* <small className="fa fa-star text-primary"></small>
                              <small className="fa fa-star text-primary"></small>
                              <small className="fa fa-star text-primary"></small>
                              <small className="fa fa-star text-primary"></small>
                              <small className="fa fa-star text-primary"></small> */}
                          </div>
                          <p className="mb-4">{education.description}</p>
                        </div>
                        <div className="d-flex border-top">
                          <div class="w-100 d-flex justify-content-center mt-3 mb-3">
                            <Link
                              to={`/update-listing?listing_id=${education._id}`}
                              class="flex-shrink-0 btn btn-sm btn-warning px-3 border-end m-1"
                            >
                              <i className="fas fa-edit mr-2" />
                              Edit
                            </Link>
                            <button
                              class="flex-shrink-0 btn btn-sm btn-danger px-3 m-1"
                              onClick={() => handleDeleteListing(education._id)}
                            >
                              <i className="fas fa-trash mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <a
            id="tops-button"
            className="top-scroll"
            title="Back to top"
            href="#"
          >
            <i className="ti-arrow-up" />
          </a>
        </div>
        <Footer />
      </>
    </div>
  );
};

export default AllListing;
