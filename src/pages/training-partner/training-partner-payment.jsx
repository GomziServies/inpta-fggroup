import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../../assets/css/style.css";
import Header from "../../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/rsuite.min.css";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProgressBar from "../../components/progress-bar/registration-progress-bar";
import { createTPPayment } from "../../assets/utils/tp_payment";

const TPRegistrationPayment = () => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const listing_id = localStorage.getItem("tp_listing_id");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const postData = {
  //       // logo: logoUrl,
  //     };

  //     await inptaListingAxiosInstance.post("/create-tc-listing", postData);
  //     setIsLoading(false);
  //     toast.success("Listing created successfully!", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });

  //     Swal.fire({
  //       title: "Success",
  //       text: "We will contact you further. Our team will get back you soon.",
  //       showCancelButton: false,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Okay",
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         window.location.href = "/training-center";
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error uploading files:", error);
  //     setIsLoading(false);
  //     toast.error(error?.message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      try {
        await createTPPayment(listing_id);
      } catch (error) {
        console.error("Error during order:", error);
      }
      window.Razorpay && window.Razorpay.close && window.Razorpay.close();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
    }
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
                      <ProgressBar pendingData="first" />
                      <div className="col-xl-12 col-md-12 col-sm-12">
                        <div className="submit-form">
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
                                              ₹ {10000 || 0} /-
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
                                                ₹ {10000 || 0} /-
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
                                          ₹ {10000 || 0} /-
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 d-flex justify-content-center">
                                  <div className="form-group">
                                    <button
                                      className="btn theme-bg rounded text-light add-listing-btn"
                                      onClick={handleSubmit}
                                    >
                                      Pay & Continue
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
export default TPRegistrationPayment;
