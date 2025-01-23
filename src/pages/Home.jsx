import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../assets/css/style.css";
import Header from "../components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "../components/Footer";
import { inptaListingAxiosInstance } from "../js/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const [educationData, setEducationData] = useState([]);
  const [loadingOne, setLoadingOne] = useState(false);

  const fetchInptaData = async () => {
    setLoadingOne(true);

    try {
      const response = await inptaListingAxiosInstance.post("/get-educations");
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
        <div className="welcome-sec container-fluid p-0 mb-5 text-start">
          <div className="position-relative">
            <img
              className="img-fluid d-md-block d-none"
              src="images/home-banner.webp"
              alt="Carousel 1"
              width="100%"
            />
            <img
              className="img-fluid d-md-none d-block"
              src="images/home-banner-mobile.webp"
              alt="Carousel 1"
              width="100%"
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center welcome-sub-sec first-secttion-bg">
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-sm-10 col-lg-8">
                    <h5 className="text-white text-uppercase mb-3 animated slideInDown">
                      Welcome to INPTA
                    </h5>
                    <h1 className="display-3 text-white animated slideInDown">
                      Elevate Your Institution with INPTA Accreditation
                    </h1>
                    <p className="fs-5 text-white mb-4 pb-2">
                      Join a globally recognized network of academies shaping
                      the future of fitness and health education.
                    </p>
                    <a
                      href="https://fggroup.in/inpta/home-inpta"
                      className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                      target="_blank"
                    >
                      Learn More
                    </a>
                    <a
                      href="/add-listing"
                      className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                    >
                      Apply for Accreditation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-xxl py-5 text-start">
          <div className="container">
            <div className="row g-4">
              <div
                className="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="service-item text-center pt-3">
                  <div className="p-4">
                    <i className="fa fa-3x fa-graduation-cap text-primary mb-4"></i>
                    <h5 className="mb-3">Skilled Instructors</h5>
                    <p>
                      Learn from highly qualified and experienced instructors
                      dedicated to your success.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="service-item text-center pt-3">
                  <div className="p-4">
                    <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                    <h5 className="mb-3">Online Classes</h5>
                    <p className="pb-4">
                      Access interactive, engaging classes from anywhere in the
                      world.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="service-item text-center pt-3">
                  <div className="p-4">
                    <i className="fa fa-3x fa-home text-primary mb-4"></i>
                    <h5 className="mb-3">Home Projects</h5>
                    <p className="pb-4">
                      Apply your knowledge with practical projects designed for
                      real-world impact.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 wow fadeInUp"
                data-wow-delay="0.7s"
              >
                <div className="service-item text-center pt-3">
                  <div className="p-4">
                    <i className="fa fa-3x fa-book-open text-primary mb-4"></i>
                    <h5 className="mb-3">Book Library</h5>
                    <p className="pb-4">
                      Explore a vast library of resources to deepen your
                      understanding and skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-xxl py-5 text-start">
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
                  The International Network of Professional Training Academies
                  (INPTA) is a globally recognized organization dedicated to
                  enhancing the quality of fitness and health education. With
                  our accreditation, academies gain access to
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
        {/* <div className="container-xxl py-5 category text-start">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Categories
              </h6>
              <h1 className="mb-5">Courses Categories</h1>
            </div>
            <div className="row g-3">
              <div className="col-lg-7 col-md-6">
                <div className="row g-3">
                  <div
                    className="col-lg-12 col-md-12 wow zoomIn"
                    data-wow-delay="0.1s"
                  >
                    <a
                      className="position-relative d-block overflow-hidden"
                      href=""
                    >
                      <img
                        className="img-fluid"
                        src="images/cat-1.webp"
                        alt=""
                      />
                      <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3 m-1">
                        <h5 className="m-0">Web Design</h5>
                        <small className="text-primary">49 Courses</small>
                      </div>
                    </a>
                  </div>
                  <div
                    className="col-lg-6 col-md-12 wow zoomIn"
                    data-wow-delay="0.3s"
                  >
                    <a
                      className="position-relative d-block overflow-hidden"
                      href=""
                    >
                      <img
                        className="img-fluid"
                        src="images/cat-2.webp"
                        alt=""
                      />
                      <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3">
                        <h5 className="m-0">Graphic Design</h5>
                        <small className="text-primary">49 Courses</small>
                      </div>
                    </a>
                  </div>
                  <div
                    className="col-lg-6 col-md-12 wow zoomIn"
                    data-wow-delay="0.5s"
                  >
                    <a
                      className="position-relative d-block overflow-hidden"
                      href=""
                    >
                      <img
                        className="img-fluid"
                        src="images/cat-3.webp"
                        alt=""
                      />
                      <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3 m-1">
                        <h5 className="m-0">Video Editing</h5>
                        <small className="text-primary">49 Courses</small>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-5 col-md-6 wow zoomIn container-min-height"
                data-wow-delay="0.7s"
              >
                <a
                  className="position-relative d-block h-100 overflow-hidden"
                  href=""
                >
                  <img
                    className="img-fluid position-absolute w-100 h-100 object-fit-cover"
                    src="images/cat-4.webp"
                    alt=""
                  />
                  <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3 m-1">
                    <h5 className="m-0">Online Marketing</h5>
                    <small className="text-primary">49 Courses</small>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div> */}
        <div className="container-xxl py-5 text-start">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Popular Courses
              </h6>
              <h1 className="mb-5 home-title">
                INPTA's Most Popular Certification Programs
              </h1>
            </div>
            <div className="row g-4 justify-content-center">
              {educationData.map((education) => {
                const description = education?.description;
                const truncatedDescription =
                  description?.length > 110
                    ? description?.substring(0, 110) + "..."
                    : description;
                return (
                  <div
                    className="col-lg-4 col-md-6 wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    <div className="Goodup-grid-wrap course-item">
                      <Link
                        to={`/view-listing?listing_id=${education._id}`}
                        className="text-dark Goodup-grid-upper"
                      >
                        <div className="Goodup-grid-thumb overflow-hidden">
                          <img
                            className="img-fluid"
                            src={`https://files.fggroup.in/${education?.images?.[0]}`}
                            alt={education.title}
                          />
                        </div>

                        <div className="Goodup-rating overlay">
                          <div className="Goodup-pr-average high">
                            {(education.review_stats.average_rating &&
                              education.review_stats.average_rating.toFixed(
                                1
                              )) ||
                              "0"}
                          </div>
                          <div className="Goodup-aldeio">
                            <div className="Goodup-rates">
                              {[...Array(5)].map((_, index) => (
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
                              ))}
                            </div>
                            <div className="Goodup-all-review">
                              <span>
                                {education.review_stats.total_ratings} Rating
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="Goodup-grid-fl-wrap text-start py-3 px-0 pb-0">
                        <h5 className="mb-2 ps-2">{education.title}</h5>
                        <div className="ps-2 pb-1">
                          <small className="text-center pt-2">
                            {truncatedDescription}
                          </small>
                        </div>
                        <div className="Goodup-grid-footer py-2 pb-2 ps-2 mt-2">
                          <div className="Goodup-ft-first">
                            <div className="Goodup-location">
                              <i className="fas fa-map-marker-alt me-2 theme-cl text-primary" />
                              {education.locations[0].city +
                                ", " +
                                education.locations[0].state}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="course-item bg-light">
                  <div className="position-relative overflow-hidden">
                    <img
                      className="img-fluid"
                      src="images/course-1.jpg"
                      alt=""
                    />
                    <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                      <a
                        href="#"
                        className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end read-more"
                      >
                        Read More
                      </a>
                      <a
                        href="#"
                        className="flex-shrink-0 btn btn-sm btn-primary px-3 read-more"
                      >
                        Join Now
                      </a>
                    </div>
                  </div>
                  <div className="text-center p-4 pb-0">
                    <h3 className="mb-0">$149.00</h3>
                    <div className="mb-3">
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small>(123)</small>
                    </div>
                    <h5 className="mb-4">Certified Personal Trainer Course </h5>
                  </div>
                  <div className="d-flex border-top">
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-user-tie text-primary me-2"></i>Become
                      a globally certified personal trainer
                    </small>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="course-item bg-light">
                  <div className="position-relative overflow-hidden">
                    <img
                      className="img-fluid"
                      src="images/course-2.jpg"
                      alt=""
                    />
                    <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                      <a
                        href="#"
                        className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end read-more"
                      >
                        Read More
                      </a>
                      <a
                        href="#"
                        className="flex-shrink-0 btn btn-sm btn-primary px-3 read-more"
                      >
                        Join Now
                      </a>
                    </div>
                  </div>
                  <div className="text-center p-4 pb-0">
                    <h3 className="mb-0">$149.00</h3>
                    <div className="mb-3">
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small>(123)</small>
                    </div>
                    <h5 className="mb-4">Diploma in Nutrition Coaching</h5>
                  </div>
                  <div className="d-flex border-top">
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-user-tie text-primary me-2"></i>Gain
                      expertise in crafting science-based nutrition plans.
                    </small>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="course-item bg-light">
                  <div className="position-relative overflow-hidden">
                    <img
                      className="img-fluid"
                      src="images/course-3.jpg"
                      alt=""
                    />
                    <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                      <a
                        href="#"
                        className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end read-more"
                      >
                        Read More
                      </a>
                      <a
                        href="#"
                        className="flex-shrink-0 btn btn-sm btn-primary px-3 read-more"
                      >
                        Join Now
                      </a>
                    </div>
                  </div>
                  <div className="text-center p-4 pb-0">
                    <h3 className="mb-0">$149.00</h3>
                    <div className="mb-3">
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small className="fa fa-star text-primary"></small>
                      <small>(123)</small>
                    </div>
                    <h5 className="mb-4">Master's in Fitness Marketing </h5>
                  </div>
                  <div className="d-flex border-top">
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-user-tie text-primary me-2"></i>Learn
                      strategies to grow your fitness business.
                    </small>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className="container-xxl py-5 text-start">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Expert Instructors
              </h6>
              <h1 className="mb-5 home-title">Meet Our Expert Instructor</h1>
            </div>
            <div className="row g-4">
              <div
                className="col-lg-3 col-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="team-item bg-light">
                  <div className="overflow-hidden">
                    <img
                      className="img-fluid"
                      src="images/team-1.webp"
                      alt=""
                    />
                  </div>
                  <div className="text-center p-4">
                    <h5 className="mb-0">Dr. Gautam Jani</h5>
                    <small>Designation</small>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <div className="team-item bg-light">
                  <div className="overflow-hidden">
                    <img
                      className="img-fluid"
                      src="images/team-2.webp"
                      alt=""
                    />
                  </div>
                  <div className="text-center p-4">
                    <h5 className="mb-0">Foram Desai</h5>
                    <small>Designation</small>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-6 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="team-item bg-light">
                  <div className="overflow-hidden">
                    <img
                      className="img-fluid"
                      src="images/team-3.webp"
                      alt=""
                    />
                  </div>
                  <div className="text-center p-4">
                    <h5 className="mb-0">Waqaar qureshi</h5>
                    <small>Designation</small>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-6 wow fadeInUp"
                data-wow-delay="0.7s"
              >
                <div className="team-item bg-light">
                  <div className="overflow-hidden">
                    <img
                      className="img-fluid"
                      src="images/team-4.webp"
                      alt=""
                    />
                  </div>
                  <div className="text-center p-4">
                    <h5 className="mb-0">Chirag Pandey</h5>
                    <small>Designation</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div
          className="container-xxl py-5 wow fadeInUp text-start"
          data-wow-delay="0.1s"
        >
          <div className="container">
            <div className="text-center">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Testimonials
              </h6>
              <h1 className="mb-5 home-title">What Our Partners Say</h1>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-4 testimonial-item text-center mb-md-0 mb-3">
                <img
                  className="border rounded-circle p-2 mx-auto mb-3 img-width-height"
                  src="images/team-1.webp"
                />
                <h5 className="mb-0">Gautam Jani</h5>
                <p>Founder</p>
                <span>FGIIT</span>
                <div className="testimonial-text bg-light text-center p-4">
                  <p className="mb-0">
                    INPTA transformed our academy's reputation. Students now
                    trust our courses more than ever!
                  </p>
                </div>
              </div>
              <div className="col-md-4 testimonial-item text-center mb-md-0 mb-3">
                <img
                  className="border rounded-circle p-2 mx-auto mb-3 img-width-height"
                  src="images/team-4.webp"
                />
                <h5 className="mb-0">chirag Pandey</h5>
                <p>Manager (Faculty)</p>
                <span>FGIIT</span>
                <div className="testimonial-text bg-light text-center p-4">
                  <p className="mb-0">
                    The accreditation process was seamless and helped us align
                    with global standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    </div>
  );
};

export default Home;
