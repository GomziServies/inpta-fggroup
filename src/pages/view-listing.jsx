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
  const listing_id = searchParams.get("listing_id");
  const [educationData, setEducationData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [timings, setTimings] = useState([]);
  const [services, setServices] = useState([]);
  const [tags, setTags] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [inptaImages, setInptaImages] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [userReviewsData, setUserReviewData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);

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
        listing_id: [listing_id],
      };

      const response = await inptaListingAxiosInstance.post(
        "/get-educations",
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
      const inpta_img = fetchedBusinessData.images || [];
      setInptaImages(inpta_img);

      setEducationData(fetchedBusinessData);
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
        `/get-reviews?inpta_listing_id=${listing_id}`
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

  const slides = inptaImages.map((image, index) => ({
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
        inpta_listing_id: listing_id,
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

          <section className="py-5 position-relative text-start view-listing-page mt-5">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 p-3">
                  <div className="featured-slick mb-4">
                    <div className="featured-gallery-slide p-2">
                      <Slider {...settings}>
                        {slides.map((slide, index) => (
                          <div style={{ cursor: "pointer" }} key={index}>
                            <div className="mx-2">
                              <img
                                src={slide.src}
                                alt={slide.caption}
                                style={{ width: "100%", borderRadius: "5px" }}
                              />
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                  {/* About The Business */}

                  <div className="mb-3">
                    <div className="d-flex align-items-start justify-content-start">
                      <div className="">
                        <img
                          src={`https://files.fggroup.in/${educationData.logo}`}
                          className="img-fluid rounded-circle"
                          width={80}
                          alt=""
                        />
                      </div>
                      <div className=" ps-3">
                        <div>
                          <div className="">
                            <h3 className="ft-bold text-dark">
                              {educationData.title}
                            </h3>
                          </div>
                          <div className="">
                            <div className="">
                              <div className="">
                                {Array.from({
                                  length:
                                    educationData.review_stats &&
                                    educationData.review_stats.average_rating,
                                }).map((_, starIndex) => (
                                  <StarIcon
                                    key={starIndex}
                                    sx={{
                                      fontSize: "16px",
                                      color: "#FFAE11",
                                    }}
                                  />
                                ))}
                                {Array.from({
                                  length:
                                    5 - educationData.review_stats &&
                                    educationData.review_stats.average_rating,
                                }).map((_, starIndex) => (
                                  <StarIcon
                                    key={starIndex}
                                    sx={{ fontSize: "16px", color: "#000" }}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="">
                              <span className="ft-medium">
                                {(educationData.review_stats &&
                                  educationData.review_stats.average_rating &&
                                  educationData.review_stats &&
                                  educationData.review_stats.average_rating.toFixed(
                                    1
                                  )) ||
                                  "0"}{" "}
                                Reviews
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-block">
                    <div>
                      <div className="jbd-details">
                        <h5 className="ft-bold fs-lg">Description</h5>
                        <div className="d-block mt-3">
                          <p>{educationData.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sep-devider" />
                  <div className="d-block">
                    <div className="jbd-01">
                      <div className="jbd-details">
                        <h5 className="ft-bold fs-lg mb-3">Timings</h5>
                        <div className="Goodup-lot-wrap d-block">
                          <div className="row g-4">
                            <div className="col-xl-6 col-lg-6 col-md-12">
                              <table className="table table-borderless">
                                <tbody>
                                  {timings.map((day, index) => (
                                    <tr>
                                      <th scope="row">{day.title}</th>
                                      <td>
                                        {day.timings.length > 0
                                          ? day.timings[0].from_time !==
                                              "00:00" &&
                                            day.timings[0].to_time !== "00:00"
                                            ? `${day.timings[0].from_time} - ${day.timings[0].to_time}`
                                            : "Closed"
                                          : "Closed"}
                                      </td>
                                    </tr>
                                  ))}
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
                    <div className="jbd-01">
                      <div className="jbd-details mb-4">
                        <h5 className="ft-bold fs-lg">Recommended Reviews</h5>
                        <div className="reviews-comments-wrap w-100">
                          {userReviewsData.map((review, index) => {
                            return (
                              <div className="reviews-comments-item">
                                <div className="review-comments-avatar">
                                  <img
                                    src={`https://files.fggroup.in/${review.createdBy_user.profile_image}`}
                                    className="img-fluid"
                                    onError={(e) => {
                                      e.target.src = User_img;
                                    }}
                                    alt=""
                                  />
                                </div>
                                <div className="reviews-comments-item-text">
                                  <h4>
                                    <a href="#">
                                      {review.createdBy_user.user_name}
                                    </a>
                                    <span className="reviews-comments-item-date">
                                      <i class="fa fa-calendar me-1"></i>
                                      {new Date(
                                        review.createdAt
                                      ).toLocaleDateString()}
                                    </span>
                                  </h4>
                                  <div className="listing-rating high">
                                    {[...Array(5)].map((_, index) => (
                                      <i
                                        className="fas fa-star"
                                        key={index}
                                        style={{
                                          color:
                                            index < review.rating
                                              ? "#F09000"
                                              : "#ccc",
                                        }}
                                      />
                                    ))}
                                  </div>
                                  <div className="clearfix" />
                                  <p>{review.comment}</p>
                                </div>
                              </div>
                            );
                          })}
                          {userReviewsData?.length === 0 && (
                            <h5>No Review Found</h5>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Drop Your Review */}
                  <div className="d-block">
                    <div className="jbd-01">
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
                  <div className="sep-devider" />
                  {/* Frequently Asked Questions */}
                  {faqs.length > 0 && (
                    <div className="d-block">
                      <div className="jbd-01">
                        <div className="jbd-details">
                          <h5 className="ft-bold fs-lg">
                            Frequently Asked Questions
                          </h5>
                          <div className="d-block mt-3">
                            <div className="accordion">
                              {faqs.map((faq, index) => (
                                <div className="card" key={index}>
                                  <div
                                    className="card-header"
                                    id={`heading-${index}`}
                                  >
                                    <h5 className="mb-0">
                                      <button className="btn btn-link">
                                        {index + 1}. {faq.question}
                                      </button>
                                    </h5>
                                  </div>
                                  <div>
                                    <div className="card-body">
                                      {faq.answer}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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

                              {/* <div className="d-flex align-items-center">
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
                              </div> */}
                              {contacts.map(
                                (contact, index) =>
                                  contact.contact_type === "website" &&
                                  isValidWebsite(contact.value) && (
                                    <div className="d-flex align-items-center">
                                      <Link
                                        key={index}
                                        to={contact.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        underline="none"
                                        sx={{ cursor: "pointer" }}
                                      >
                                        <p className="text-dark text-underline">
                                          {contact.value}
                                        </p>
                                      </Link>
                                    </div>
                                  )
                              )}
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
                              {contacts.map(
                                (contact, index) =>
                                  contact.contact_type === "email" && (
                                    <p>{contact.value}</p>
                                  )
                              )}
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
                              <p>{contactData.value}</p>
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
                                  {locationData.address_line_1},{" "}
                                  {locationData.address_line_2},{" "}
                                  {locationData.landmark}, {locationData.city},{" "}
                                  {locationData.state} - {locationData.pin_code}
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
                      {tags.map((tag, index) => (
                        <div
                          className="w-auto m-1 px-3 py-2"
                          style={{
                            backgroundColor: "#fff",
                            color: "#000",
                            border: "1.5px solid #ccc",
                            borderRadius: "5px",
                            fontWeight: "550",
                          }}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="jb-apply-form bg-white rounded py-4 px-4 border mb-4">
                    <h4 className="ft-bold mb-1">Course Offered</h4>
                    <div className="row mt-2">
                      {educationData?.course_offered?.map((course, index) => (
                        <div
                          className="w-auto m-1 px-3 py-2"
                          key={index}
                          style={{
                            backgroundColor: "#fff",
                            color: "#000",
                            border: "1.5px solid #ccc",
                            borderRadius: "5px",
                            fontWeight: "550",
                          }}
                        >
                          {course}
                        </div>
                      ))}
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
