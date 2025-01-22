import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../assets/css/style.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { inptaListingAxiosInstance } from "../js/api";
import Dummy_img from "../assets/dummy-image-square.jpg";
import User_img from "../assets/user-profile.png";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import "yet-another-react-lightbox/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/animation.css";
import validator from "validator";
import Slider from "react-slick";
import StarIcon from "@mui/icons-material/Star";
import WhatsappBtn from "../components/WhatsappBtn";

const ListingView = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const business_id = searchParams.get("business_id");
  const [businessData, setBusinessData] = useState([]);
  // const [listNumber, setListNumber] = useState("");
  // const [lightboxOpen, setLightboxOpen] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [contactData, setContactData] = useState([]);
  // const [reviewData, setReviewData] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [timings, setTimings] = useState([]);
  const [services, setServices] = useState([]);
  const [tags, setTags] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [businessImages, setBusinessImages] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [userReviewsData, setUserReviewData] = useState([]);
  // const [isFavorite, setIsFavorite] = useState(false);
  // const [favoriteList, setFavoriteList] = useState([]);
  // const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [allBusinessData, setAllBusinessData] = useState([]);

  const fetchAllBusinessData = async () => {
    try {
      const requestData = {
        filter: {
          business_type: ["personal", "business"],
        },
        sort: {
          business_name: "asc",
          rating: "desc",
        },
        page: 1,
        limit: 10,
      };

      const response = await inptaListingAxiosInstance.post(
        "/get-businesses",
        requestData
      );
      const fetchedBusinessData = response.data.data;
      setAllBusinessData(fetchedBusinessData);
    } catch (error) {
      console.error("Error in Getting Business Data:", error);
    }
  };

  useEffect(() => {
    fetchAllBusinessData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const isValidWebsite = (website) => {
    return validator.isURL(website, { require_protocol: true });
  };

  const settings = {
    dots: false,
    nav: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetchBusinessData = async () => {
    try {
      setIsLoading(true);
      const requestData = {
        listing_id: [business_id],
      };

      const response = await inptaListingAxiosInstance.post(
        "/get-businesses",
        requestData
      );
      const data = response.data.metadata;
      const fetchedBusinessData = response.data.data[0];
      const fetchedLocationData = fetchedBusinessData.locations[0];

      const contacts = fetchedBusinessData.contacts || [];
      setContacts(contacts);
      const timing = fetchedBusinessData.timings || [];
      setTimings(timing);
      const services = fetchedBusinessData.services || [];
      setServices(services);
      const tags = fetchedBusinessData.tags || [];
      setTags(tags);
      const faqs = fetchedBusinessData.faqs || [];
      setFaqs(faqs);
      const business_img = fetchedBusinessData.business_images || [];
      setBusinessImages(business_img);

      setBusinessData(fetchedBusinessData);
      setLocationData(fetchedLocationData);
      setContactData(fetchedLocationData.contact);
      // setReviewData(fetchedBusinessData.review_stats);
      // setListNumber(data.pagination.total);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error in Getting Business Data:", error);
    }
  };

  const fetchReviewsData = async () => {
    try {
      const response = await inptaListingAxiosInstance.get(
        `/get-reviews?business_listing_id=${business_id}`
      );
      const fetchedReviewsData = response.data.data;
      setUserReviewData(fetchedReviewsData);
    } catch (error) {
      console.error("Error in Getting Reviews Data:", error);
    }
  };

  useEffect(() => {
    // getUserData();
    fetchBusinessData();
    fetchReviewsData();
    // fetchFavData();
  }, []);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const slides = businessImages.map((image, index) => ({
    src: "https://files.fggroup.in/" + image,
    caption: `Image ${index + 1}`,
  }));

  const openLightbox = (index) => {
    // setSelectedImage(index);
    // setLightboxOpen(true);
  };

  const handleSubmitReview = async () => {
    try {
      const authData = localStorage.getItem("authorization");
      if (!authData) {
        const confirmResult = await Swal.fire({
          icon: "info",
          title:
            "You need to log in first! click on login Button you see on top Right Side",
          text: "Login to submit a review.",
          showCancelButton: true,
        });
        return;
      }

      if (!review || rating === 0) {
        toast.error("Please provide both review and rating.");
        return;
      }

      const requestData = {
        business_listing_id: business_id,
        comment: review,
        rating,
      };

      const response = await inptaListingAxiosInstance.post(
        "/create-review",
        requestData
      );
      fetchBusinessData();
      fetchReviewsData();
      toast.success("Review submitted successfully");
      setReview("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review. Please try again.");
    }
  };

  return (
    <div>
      <Helmet>
        <title>FG Group Business Listing</title>
        <meta name="description" content="Your meta description" />
      </Helmet>
      <>
        {/* Meta Data */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          Business Listing View - Explore Details &amp; Connect with Brands
        </title>
        <meta
          name="description"
          content="View detailed business listings to learn more about products, services, and offers. Connect with brands and discover opportunities to grow your business."
        />
        {/* Favicon */}
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="images/favicon.ico"
        />
        {/* Custom CSS */}
        <link href="css/styles.css" rel="stylesheet" />
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

          <section className="py-5 position-relative text-start view-listing-page">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 p-3">
                  <div className="featured-slick mb-4">
                    <div className="featured-gallery-slide p-2">
                      <Slider {...settings}>
                        <div style={{ cursor: "pointer" }}>
                          <div className="mx-2">
                            <img
                              src="/images/co-1.webp"
                              alt=""
                              style={{ width: "100%", borderRadius: "5px" }}
                            />
                          </div>
                        </div>
                        <div style={{ cursor: "pointer" }}>
                          <div className="mx-2">
                            <img
                              src="/images/co-2.webp"
                              alt=""
                              style={{ width: "100%", borderRadius: "5px" }}
                            />
                          </div>
                        </div>
                        <div style={{ cursor: "pointer" }}>
                          <div className="mx-2">
                            <img
                              src="/images/co-2.webp"
                              alt=""
                              style={{ width: "100%", borderRadius: "5px" }}
                            />
                          </div>
                        </div>
                        <div style={{ cursor: "pointer" }}>
                          <div className="mx-2">
                            <img
                              src="/images/co-2.webp"
                              alt=""
                              style={{ width: "100%", borderRadius: "5px" }}
                            />
                          </div>
                        </div>
                        <div style={{ cursor: "pointer" }}>
                          <div className="mx-2">
                            <img
                              src="/images/co-2.webp"
                              alt=""
                              style={{ width: "100%", borderRadius: "5px" }}
                            />
                          </div>
                        </div>
                      </Slider>
                    </div>
                  </div>
                  {/* About The Business */}

                  <div className="d-block">
                    <div>
                      <div className="jbd-details">
                        <h5 className="ft-bold fs-lg">Description</h5>
                        <div className="d-block mt-3">
                          <p>
                            You can expect a detailed assessment of your current
                            eating habits, health goals, and any specific
                            dietary needs. A customized plan will be created
                            based on your preferences and lifestyle.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="sep-devider" />
                  <div>
                    <div className="d-block mt-3">
                      <div className="list-lioe">
                        <div className="list-lioe-single">
                          <span className="ft-medium fw-bold">Category</span>
                        </div>
                        <div className="list-lioe-single ms-2 ps-3 seperate">
                          <a
                            href="javascript:void(0);"
                            className="text-dark ft-medium"
                          >
                            Affordable
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-block mt-1">
                      <div className="list-lioe">
                        <div className="list-lioe-single">
                          <span className="ft-medium fw-bold">Type</span>
                        </div>
                        <div className="list-lioe-single ms-2 ps-3 seperate">
                          <a
                            href="javascript:void(0);"
                            className="text-dark ft-medium"
                          >
                            business
                          </a>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="d-block">
                    <div className="mt-3">
                      <div className="jbd-details">
                        <h5 className="ft-bold fs-lg mb-3">Timings</h5>
                        <div className="Goodup-lot-wrap d-block">
                          <div className="row g-4">
                            <div className="col-xl-6 col-lg-6 col-md-12">
                              <table className="table table-borderless">
                                <tbody>
                                  <tr>
                                    <th scope="row">Monday</th>
                                    <td>08:00 AM - 10:00 PM</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Tuesday</th>
                                    <td>08:00 AM - 10:00 PM</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Tuesday</th>
                                    <td>08:00 AM - 10:00 PM</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Tuesday</th>
                                    <td>08:00 AM - 10:00 PM</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Tuesday</th>
                                    <td>08:00 AM - 10:00 PM</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Tuesday</th>
                                    <td>08:00 AM - 10:00 PM</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sep-devider" />
                  {/* Recommended Reviews */}
                  <div className="d-block">
                    <div className="mt-3">
                      <div className="jbd-details mb-4">
                        <h5 className="ft-bold fs-lg">Recommended Reviews</h5>
                        <div className="reviews-comments-wrap w-100">
                          <div className="reviews-comments-item mt-4">
                            <div className="review-comments-avatar mt-2">
                              <img
                                src="/images/team-4.webp"
                                className="img-fluid"
                                onError={(e) => {
                                  e.target.src = User_img;
                                }}
                                alt=""
                              />
                            </div>
                            <div className="reviews-comments-item-text">
                              <h4>
                                <a href="#">chirag pandey</a>
                                <span className="reviews-comments-item-date">
                                  <i className="ti-calendar theme-cl me-1" />
                                </span>
                              </h4>
                              <div className="listing-rating high">
                                <StarIcon
                                  sx={{
                                    fontSize: "16px",
                                    color: "#FFAE11",
                                  }}
                                />
                                <StarIcon
                                  sx={{
                                    fontSize: "16px",
                                    color: "#FFAE11",
                                  }}
                                />
                                <StarIcon
                                  sx={{
                                    fontSize: "16px",
                                    color: "#FFAE11",
                                  }}
                                />
                                <StarIcon
                                  sx={{
                                    fontSize: "16px",
                                    color: "#FFAE11",
                                  }}
                                />
                                <StarIcon
                                  sx={{
                                    fontSize: "16px",
                                    color: "#FFAE11",
                                  }}
                                />
                              </div>
                              <div className="clearfix" />
                              <p>i really happy to work with fgiit..</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Drop Your Review */}
                  <div className="d-block">
                    <div className="mt-3">
                      <div className="jbd-details">
                        <h5 className="ft-bold fs-lg">Drop Your Review</h5>
                        <div className="review-form-box form-submit mt-3">
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="form-group mb-3">
                                <textarea
                                  className="form-control rounded ht-140"
                                  placeholder="Review"
                                  defaultValue={""}
                                  value={review}
                                  onChange={(e) => setReview(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="form-group mb-3">
                                <label className="ft-medium small mb-1">
                                  Select Rating
                                </label>
                                <div className="d-flex mb-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                      key={star}
                                      sx={{
                                        fontSize: "25px",
                                        color:
                                          rating >= star ? "#FFAE11" : "#000",
                                      }}
                                      onClick={() => handleRatingChange(star)}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="form-group">
                                <button
                                  onClick={handleSubmitReview}
                                  className="btn theme-bg text-light rounded"
                                >
                                  Submit Review
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-block">
                    <div className="mt-3">
                      <div className="jbd-details">
                        <h5 className="ft-bold fs-lg">
                          Frequently Asked Questions
                        </h5>
                        <div className="d-block mt-3">
                          <div className="accordion">
                            <div className="card">
                              <div className="card-header">
                                <h5 className="mb-0">
                                  <button> 1. FWG full form kya hai ?</button>
                                </h5>
                              </div>
                              <div>
                                <div className="card-body">
                                  Fitness With Gomzi
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="d-block mt-3">
                          <div className="accordion">
                            <div className="card">
                              <div className="card-header">
                                <h5 className="mb-0">
                                  <button> 1. FWG full form kya hai ?</button>
                                </h5>
                              </div>
                              <div>
                                <div className="card-body">
                                  Fitness With Gomzi
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="d-block mt-3">
                          <div className="accordion">
                            <div className="card">
                              <div className="card-header">
                                <h5 className="mb-0">
                                  <button> 1. FWG full form kya hai ?</button>
                                </h5>
                              </div>
                              <div>
                                <div className="card-body">
                                  Fitness With Gomzi
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="d-block mt-3">
                          <div className="accordion">
                            <div className="card">
                              <div className="card-header">
                                <h5 className="mb-0">
                                  <button> 1. FWG full form kya hai ?</button>
                                </h5>
                              </div>
                              <div>
                                <div className="card-body">
                                  Fitness With Gomzi
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text-start">
                  <div className="jb-apply-form bg-white rounded py-4 px-4 border mb-4">
                    <h4 className="ft-bold mb-1">Information</h4>
                    <div className="uli-list-info">
                      <ul>
                        <li>
                          <div className="list-uiyt d-flex">
                            <div className="list-iobk p-2">
                              <i className="fas fa-globe" />
                            </div>
                            <div className="list-uiyt-capt p-2">
                              <h5>Live Site</h5>

                              <div className="d-flex align-items-center">
                                <Link
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  underline="none"
                                  sx={{ cursor: "pointer" }}
                                >
                                  <p className="text-dark text-underline">
                                    fggroup.in
                                  </p>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="list-uiyt d-flex">
                            <div className="list-iobk p-2">
                              <i className="fas fa-envelope" />
                            </div>
                            <div className="list-uiyt-capt p-2">
                              <h5>Drop a Mail</h5>

                              <p>fgiit@gmail.com</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="list-uiyt d-flex">
                            <div className="list-iobk p-2">
                              <i className="fas fa-phone" />
                            </div>
                            <div className="list-uiyt-capt p-2">
                              <h5>Call Us</h5>
                              <p>+91 8866554477</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="list-uiyt d-flex">
                            <div className="list-iobk p-2">
                              <i className="fas fa-map-marker-alt" />
                            </div>
                            <div className="list-uiyt-capt p-2">
                              <h5>Get Directions</h5>
                              <a
                                href={locationData.direction_link}
                                className="text-dark"
                              >
                                <p className="text-underline">
                                  G 805, Monsoon breeze Sec 78 Gurgaon Haryana,
                                  , Gurugram, Haryana - 122051
                                </p>
                              </a>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="jb-apply-form bg-white rounded py-4 px-4 border mb-4">
                    <h4 className="ft-bold mb-1">Tags</h4>
                    <div className="row mt-2">
                      <div
                        className="btn w-auto m-1 px-3 py-2"
                        style={{
                          backgroundColor: "#fff",
                          color: "#000",
                          border: "1.5px solid #ccc",
                          borderRadius: "5px",
                        }}
                      >
                        health
                      </div>
                      <div
                        className="btn w-auto m-1 px-3 py-2"
                        style={{
                          backgroundColor: "#fff",
                          color: "#000",
                          border: "1.5px solid #ccc",
                          borderRadius: "5px",
                        }}
                      >
                        Inpta
                      </div>
                    </div>
                  </div>

                  <div className="jb-apply-form bg-white rounded py-4 px-4 border mb-4">
                    <h4 className="ft-bold mb-1">Services</h4>
                    <div className="row mt-2">
                      <div
                        className="btn w-auto m-1 px-3 py-2"
                        style={{
                          backgroundColor: "#fff",
                          color: "#000",
                          border: "1.5px solid #ccc",
                          borderRadius: "5px",
                        }}
                      >
                        Air Conditioner
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </>
    </div>
  );
};

export default ListingView;
