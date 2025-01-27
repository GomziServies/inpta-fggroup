import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../assets/css/style.css";
import Header from "../components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
import { inptaListingAxiosInstance } from "../js/api";
import { Link } from "react-router-dom";

const ViewAllListing = () => {
  const [loading, setLoading] = useState(true);
  const [educationData, setEducationData] = useState();
  const [loadingOne, setLoadingOne] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const fetchInptaData = async () => {
    setLoadingOne(true);
    try {
      const response = await inptaListingAxiosInstance.post("/get-educations");
      let fetchedEducationData = response.data.data;

      fetchedEducationData = fetchedEducationData.filter(
        (business) =>
          business.review_stats?.total_ratings !== undefined &&
          business.review_stats.total_ratings >= 0
      );

      fetchedEducationData.sort(
        (a, b) => b.review_stats.total_ratings - a.review_stats.total_ratings
      );
      setEducationData(fetchedEducationData);
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
        <div className="container-xxl py-4 text-start mt-5 pt-5">
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
              {educationData && educationData?.map((education) => {
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
        <Footer />
      </>
    </div>
  );
};

export default ViewAllListing;
