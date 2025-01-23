import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../assets/css/style.css";
import Header from "../components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "../components/Footer";

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
        <div className="container-fluid p-0 mb-5 text-start">
          <div className="position-relative">
            <img
              className="img-fluid"
              src="images/co-1.webp"
              alt="Carousel 1"
              width="100%"
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center first-secttion-bg">
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
                      Diam elitr kasd sed at elitr sed ipsum justo dolor sed
                      clita amet diam
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
                    <p>
                      Diam elitr kasd sed at elitr sed ipsum justo dolor sed
                      clita amet diam
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
                    <p>
                      Diam elitr kasd sed at elitr sed ipsum justo dolor sed
                      clita amet diam
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
                    <p>
                      Diam elitr kasd sed at elitr sed ipsum justo dolor sed
                      clita amet diam
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
                  About INPTA
                </h6>
                <h1 className="mb-4">Welcome to INPTA Accreditation</h1>
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
                <a className="btn btn-primary py-3 px-5 mt-2" href="">
                  Read More
                </a>
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
              <h1 className="mb-5">
                Most Popular INPTA-Certified Courses
              </h1>
            </div>
            <div className="row g-4 justify-content-center">
              <div
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
                    {/* <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-clock text-primary me-2"></i>1.49 Hrs
                    </small>
                    <small className="flex-fill text-center py-2">
                      <i className="fa fa-user text-primary me-2"></i>30
                      Students
                    </small> */}
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
              </div>
            </div>
          </div>
        </div>
        <div className="container-xxl py-5 text-start">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Expert Instructors
              </h6>
              <h1 className="mb-5">Meet Our Expert Instructor</h1>
            </div>
            <div className="row g-4">
              <div
                className="col-lg-3 col-md-6 wow fadeInUp"
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
                className="col-lg-3 col-md-6 wow fadeInUp"
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
                className="col-lg-3 col-md-6 wow fadeInUp"
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
                className="col-lg-3 col-md-6 wow fadeInUp"
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
        </div>
        <div
          className="container-xxl py-5 wow fadeInUp text-start"
          data-wow-delay="0.1s"
        >
          <div className="container">
            <div className="text-center">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Testimonials
              </h6>
              <h1 className="mb-5">What Our Partners Say</h1>
            </div>
            <div className="row">
              <div className="col-md-3 testimonial-item text-center">
                <img
                  className="border rounded-circle p-2 mx-auto mb-3 img-width-height"
                  src="images/testimonial-1.jpg"
                />
                <h5 className="mb-0">Client Name</h5>
                <p>Profession</p>
                <div className="testimonial-text bg-light text-center p-4">
                  <p className="mb-0">
                    INPTA transformed our academy's reputation. Students now
                    trust our courses more than ever!
                  </p>
                </div>
              </div>
              <div className="col-md-3 testimonial-item text-center">
                <img
                  className="border rounded-circle p-2 mx-auto mb-3 img-width-height"
                  src="images/testimonial-2.jpg"
                />
                <h5 className="mb-0">Client Name</h5>
                <p>Profession</p>
                <div className="testimonial-text bg-light text-center p-4">
                  <p className="mb-0">
                    The accreditation process was seamless and helped us align
                    with global standards.
                  </p>
                </div>
              </div>
              <div className="col-md-3 testimonial-item text-center">
                <img
                  className="border rounded-circle p-2 mx-auto mb-3 img-width-height"
                  src="images/testimonial-3.jpg"
                />
                <h5 className="mb-0">Client Name</h5>
                <p>Profession</p>
                <div className="testimonial-text bg-light text-center p-4">
                  <p className="mb-0">
                    Thanks to INPTA, our graduates are now placed in top
                    international organizations.
                  </p>
                </div>
              </div>
              <div className="col-md-3 testimonial-item text-center">
                <img
                  className="border rounded-circle p-2 mx-auto mb-3 img-width-height"
                  src="images/testimonial-4.jpg"
                />
                <h5 className="mb-0">Client Name</h5>
                <p>Profession</p>
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
