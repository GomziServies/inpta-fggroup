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
import { Link } from "react-router-dom";
import Dummy_img from "../assets/dummy-image-square.jpg";
import User_img from "../assets/user-profile.png";
import { toast } from "react-toastify";

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

  const [businessData, setBusinessData] = useState([]);
  const [loadingOne, setLoadingOne] = useState(false);

  const fetchBusinessData = async () => {
    setLoadingOne(true);

    try {
      const requestData = {
        filter: {
          business_type: ["personal", "business"],
        },
        sort: {
          business_name: "desc",
          rating: "desc",
        },
        page: 1,
        limit: 6,
      };

      const response = await inptaListingAxiosInstance.post(
        "/get-businesses",
        requestData
      );
      const fetchedBusinessData = response.data.data;
      setBusinessData(fetchedBusinessData);
    } catch (error) {
      console.error("Error in Getting Business Data:", error);
    }
    setLoadingOne(false);
  };

  useEffect(() => {
    fetchBusinessData();
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
            <div className="container-xxl py-5 text-start">
              <div className="container">
                <div className="row g-5">
                  <div
                    className="col-lg-6 wow fadeInUp container-min-height"
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
                      About Us
                    </h6>
                    <h1 className="mb-4">Welcome to eLEARNING</h1>
                    <p className="mb-4">
                      Tempor erat elitr rebum at clita. Diam dolor diam ipsum
                      sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                      lorem et sit.
                    </p>
                    <p className="mb-4">
                      Tempor erat elitr rebum at clita. Diam dolor diam ipsum
                      sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                      lorem et sit, sed stet lorem sit clita duo justo magna
                      dolore erat amet
                    </p>
                    <div className="row gy-2 gx-4 mb-4">
                      <div className="col-sm-6">
                        <p className="mb-0">
                          <i className="fa fa-arrow-right text-primary me-2"></i>
                          Skilled Instructors
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p className="mb-0">
                          <i className="fa fa-arrow-right text-primary me-2"></i>
                          Online Classes
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p className="mb-0">
                          <i className="fa fa-arrow-right text-primary me-2"></i>
                          International Certificate
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p className="mb-0">
                          <i className="fa fa-arrow-right text-primary me-2"></i>
                          Skilled Instructors
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p className="mb-0">
                          <i className="fa fa-arrow-right text-primary me-2"></i>
                          Online Classes
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p className="mb-0">
                          <i className="fa fa-arrow-right text-primary me-2"></i>
                          International Certificate
                        </p>
                      </div>
                    </div>
                    <a className="btn btn-primary py-3 px-5 mt-2" href="">
                      Read More
                    </a>
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
                <div
                  className="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <Link to="/view-listing">
                    <div className="course-item bg-light">
                      <div className="position-relative overflow-hidden">
                        <img
                          className="img-fluid"
                          src="images/course-1.jpg"
                          alt=""
                        />
                        <div className="accepted-btn">
                          <a
                            href="#"
                            className="flex-shrink-0 btn btn-sm btn-success px-3 border-end"
                          >
                            Accepted
                          </a>
                        </div>
                      </div>
                      <div className="text-center p-4 pb-0">
                        <h3 className="mb-0">Fitness With Gomzi</h3>
                        <div className="mb-3">
                          <small className="fa fa-star text-primary"></small>
                          <small className="fa fa-star text-primary"></small>
                          <small className="fa fa-star text-primary"></small>
                          <small className="fa fa-star text-primary"></small>
                          <small className="fa fa-star text-primary"></small>
                        </div>
                        <p className="mb-4">
                          You can expect a detailed assessment of your current
                          eating habits, health goals, and any specific dietary
                          needs. A customized plan will be created based on your
                          preferences and lifestyle.
                        </p>
                      </div>
                      <div className="d-flex border-top">
                        <div class="w-100 d-flex justify-content-center mt-3 mb-3">
                          <a
                            href="/update-listing"
                            class="flex-shrink-0 btn btn-sm btn-warning px-3 border-end m-1"
                          >
                            <i className="fas fa-edit mr-2" />
                            Edit
                          </a>
                          <a
                            href="#"
                            class="flex-shrink-0 btn btn-sm btn-danger px-3 m-1"
                          >
                            <i className="fas fa-trash mr-2" />
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div
                  className="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <Link to="/view-listing">
                    <div className="course-item bg-light">
                      <div className="position-relative overflow-hidden">
                        <img
                          className="img-fluid"
                          src="images/course-2.jpg"
                          alt=""
                        />
                        <div className="accepted-btn">
                          <a
                            href="#"
                            className="flex-shrink-0 btn btn-sm btn-success px-3 border-end"
                          >
                            Accepted
                          </a>
                        </div>
                      </div>
                      <div className="text-center p-4 pb-0">
                        <h3 className="mb-0">Stallon Gym</h3>
                        <div className="mb-3">
                          <small className="fa fa-star text-primary"></small>
                          <small className="fa fa-star text-primary"></small>
                          <small className="fa fa-star text-primary"></small>
                          <small className="fa fa-star text-primary"></small>
                          <small className="fa fa-star text-primary"></small>
                        </div>
                        <p className="mb-4">
                          You can expect a detailed assessment of your current
                          eating habits, health goals, and any specific dietary
                          needs. A customized plan will be created based on your
                          preferences and lifestyle.
                        </p>
                      </div>
                      <div className="d-flex border-top">
                        <div class="w-100 d-flex justify-content-center mt-3 mb-3">
                          <a
                            href="/update-listing"
                            class="flex-shrink-0 btn btn-sm btn-warning px-3 border-end m-1"
                          >
                            <i className="fas fa-edit mr-2" />
                            Edit
                          </a>
                          <a
                            href="#"
                            class="flex-shrink-0 btn btn-sm btn-danger px-3 m-1"
                          >
                            <i className="fas fa-trash mr-2" />
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div
                  className="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <Link to="/view-listing">
                    <div className="course-item bg-light">
                      <div className="position-relative overflow-hidden">
                        <img
                          className="img-fluid"
                          src="images/course-3.jpg"
                          alt=""
                        />
                        <div className="accepted-btn">
                          <a
                            href="#"
                            className="flex-shrink-0 btn btn-sm btn-success px-3 border-end"
                          >
                            Accepted
                          </a>
                        </div>
                      </div>
                      <div className="text-center p-4 pb-0">
                        <h3 className="mb-0">SlimFit Gym</h3>
                        <div className="mb-3">
                          <small className="fa fa-star text-primary"></small>
                          <small className="fa fa-star text-primary"></small>
                          <small className="fa fa-star text-primary"></small>
                          <small className="fa fa-star text-primary"></small>
                          <small className="fa fa-star text-primary"></small>
                        </div>
                        <p className="mb-4">
                          You can expect a detailed assessment of your current
                          eating habits, health goals, and any specific dietary
                          needs. A customized plan will be created based on your
                          preferences and lifestyle.
                        </p>
                      </div>
                      <div className="d-flex border-top">
                        <div class="w-100 d-flex justify-content-center mt-3 mb-3">
                          <a
                            href="/update-listing"
                            class="flex-shrink-0 btn btn-sm btn-warning px-3 border-end m-1"
                          >
                            <i className="fas fa-edit mr-2" />
                            Edit
                          </a>
                          <a
                            href="#"
                            class="flex-shrink-0 btn btn-sm btn-danger px-3 m-1"
                          >
                            <i className="fas fa-trash mr-2" />
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section
            className="space bg-cover text-start"
            style={{
              background: "#03343b url(images/landing-bg.png) no-repeat",
            }}
          >
            <div className="container py-5">
              <div className="row justify-content-center">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="sec_title position-relative text-center mb-5">
                    <h2 className="ft-bold text-light whastapp-title">
                      Join GOMZI Today and Discover Exclusive Deals - Connect
                      with Us Instantly!
                    </h2>
                    <h6 className="text-light mb-0 d-md-block d-none">
                      Unlock Success with GOMZI - Connect Now over whatsapp for
                      Advance Perks!
                    </h6>
                    <p className="ft-bold text-light mt-4"></p>
                  </div>
                </div>
              </div>
              <div className="row align-items-center justify-content-center">
                <div className="col-xl-7 col-lg-10 col-md-12 col-sm-12 col-12">
                  <form className="rounded p-1">
                    <div className="d-flex justify-content-center">
                      <div className="form-group mb-0">
                        <WhatsappBtn
                          message={
                            "Hello, I wanted to know more about Gym Listing."
                          }
                          options={{ pageRef: true }}
                        />
                      </div>
                    </div>
                  </form>
                </div>
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
