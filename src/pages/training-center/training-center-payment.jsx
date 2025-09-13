import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../../assets/css/style.css";
import Header from "../../components/Header";
import { inptaListingAxiosInstance } from "../../js/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProgressBar from "../../components/progress-bar/registration-progress-bar";
import { createTCPayment } from "../../assets/utils/tc_payment";
import { useNavigate } from "react-router-dom";

const TCPaymentPage = () => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsCorrect, setIsDetailsCorrect] = useState(false);
  const [listingId, setListingId] = useState(null);
  const [listingData, setListingData] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyAccess() {
      setLoading(true);
      
      const storedListingId = localStorage.getItem("tc_listing_id");
      
      if (!storedListingId) {
        toast.error("No training center listing found. Please create a listing first.");
        navigate("/training-center");
        return;
      }
      
      setListingId(storedListingId);
      
      try {
        const response = await inptaListingAxiosInstance.get(`/get-tc-listing?listing_id=${storedListingId}`);
        
        if (response?.data?.data?.length > 0) {
          const listing = response.data.data[0];
          setListingData(listing);
          
          if (listing.tcPayment === true) {
            toast.info("Payment already completed. Redirecting to next step...");
            setTimeout(() => {
              navigate("/training-center/auditor-verification");
            }, 2000);
            return;
          }
          
          if (listing.tcForm !== true) {
            toast.error("Please complete training center registration first");
            setTimeout(() => {
              navigate("/training-center");
            }, 2000);
            return;
          }
          
          setShowContent(true);
          
        } else {
          toast.error("Training center listing not found.");
          setTimeout(() => {
            navigate("/training-center");
          }, 2000);
          return;
        }
      } catch (error) {
        console.error("Error fetching listing data:", error);
        toast.error("Failed to fetch listing data.");
        navigate("/training-center");
        return;
      } finally {
        setLoading(false);
      }
    }
    
    verifyAccess();
  }, [navigate]);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!listingId) {
        toast.error("Listing ID not found. Please try again.");
        return;
      }

      await createTCPayment(listingId);
      setIsLoading(false);
    } catch (error) {
      console.error("Error processing payment:", error);
      setIsLoading(false);
      toast.error(error?.message || "Error processing payment. Please try again.");
    }
  };

  if (!showContent) {
    return (
      <div className="loader-background">
        <div className="spinner-box">
          <div className="three-quarter-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Training Center Registration Payment</title>
        <meta
          name="description"
          content="Complete your training center registration by making the payment."
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="images/favicon.ico"
        />
        <link href="css/styles.css" rel="stylesheet" />
      </Helmet>
      <>
        {(loading || isLoading) && (
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
                      <ProgressBar activeData="first" pendingData="second" />
                      <div className="col-12 mb-4 text-center">
                        <h2 className="mb-0 ft-medium fs-md">
                          Training Center Registration Payment
                        </h2>
                      </div>
                      <div className="col-xl-12 col-md-12 col-sm-12">
                        <div className="dashboard-list-wraps bg-white rounded mb-4">
                          <div className="dashboard-list-wraps-head br-bottom py-3 px-3">
                            <div className="dashboard-list-wraps-flx">
                              <h4 className="mb-0 ft-medium fs-md">
                                <i className="fa fa-file-invoice me-2 theme-cl fs-sm" />
                                Payment Details
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
                                            Registration Fees
                                          </p>
                                        </div>
                                        <div className="d-inline-block p-0 text-right">
                                          <p className="m-0 f-rob-med f-16">
                                            ₹ {66666 || 0} /-
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                    <li className="d-block mb-3">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-inline-block p-0 text-left">
                                          <p className="m-0 f-rob-reg f-16 text-secondary">
                                            GST (0%)
                                          </p>
                                        </div>
                                        <div className="d-inline-block p-0 text-success text-right">
                                          <p className="m-0 f-rob-med f-16 text-red">
                                            ₹ 0 /-
                                          </p>
                                        </div>
                                      </div>
                                    </li>
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
                                              ₹ {66666 || 0} /-
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
                                        ₹ {66666 || 0} /-
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={isDetailsCorrect}
                                      onChange={() =>
                                        setIsDetailsCorrect(!isDetailsCorrect)
                                      }
                                      color="primary"
                                    />
                                  }
                                  label="I agree to the terms and conditions and wish to proceed with the payment"
                                  sx={{ mt: 2 }}
                                />
                                <div className="form-group">
                                  <button
                                    className="btn theme-bg rounded text-light add-listing-btn"
                                    onClick={handlePaymentSubmit}
                                    disabled={!isDetailsCorrect}
                                  >
                                    Pay Now
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

export default TCPaymentPage; 