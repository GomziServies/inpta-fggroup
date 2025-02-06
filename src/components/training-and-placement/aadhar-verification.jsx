import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function AadharVerification({ setCheckData }) {
  const [paymentMode, setPaymentMode] = useState("ONLINE");
  const [prepaidCouponCode, setPrepaidCouponCode] = useState({});
  const [userData, setUserData] = useState({
    adhar1: "",
    adhar2: "",
    pan_card: "",
  });
  const [imagePreviews, setImagePreviews] = useState({
    adhar1: process.env.PUBLIC_URL + "images/documents/aadhaar-card-front.webp",
    adhar2: process.env.PUBLIC_URL + "images/documents/aadhaar-card-back.webp",
    pan_card: process.env.PUBLIC_URL + "/images/documents/pan-card.webp",
    selectedImg1: false,
    selectedImg2: false,
  });
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [showVerificationEMIPopup, setShowVerificationEMIPopup] =
    useState(false);
  const [verificationStatus, setVerificationStatus] = useState("process");

  useEffect(() => {
    if (showVerificationPopup) {
      setTimeout(() => {
        setVerificationStatus("verify");
      }, 3000);

      setTimeout(() => {
        setVerificationStatus("done");
      }, 6000);

      setTimeout(() => {
        setShowVerificationPopup(false);
        setTimeout(() => {
          setShowVerificationEMIPopup(true);
        }, 300);
      }, 7500);

      setTimeout(() => {
        setShowVerificationEMIPopup(false);
        localStorage.setItem("offlineCheckOut", "final");
        setCheckData("final");
      }, 9500);
    }
  }, [showVerificationPopup]);

  const getUserData = async () => {
    try {
      // const response = await axiosInstance.get("/account/profile");
      const response = {};
      const userData = response.data.data;

      if (userData) {
        setImagePreviews({
          adhar1: userData.user?.document?.[0]?.file,
          pan_card: userData.user?.document?.[1]?.file,
        });
        setUserData({
          document: userData.user?.document || [],
        });
      }
    } catch (error) {
      console.error("Error in getUserData:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // await axiosInstance.post("/account/update-profile", {
      //   document: [
      //     { file: imagePreviews.adhar1, document_type: "identity" },
      //     // { file: imagePreviews.adhar2, document_type: "identity" },
      //     { file: imagePreviews.pan_card, document_type: "identity" },
      //   ],
      // });

      // toast.success("Adhar and Pan Card uploaded successfully");

      // setShowVerificationPopup(true);
      localStorage.setItem("offlineCheckOut", "information");
      setCheckData("information");
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
    }
  };

  // Handle file selection and preview for each file input
  const handleFileSelect = async (event, key) => {
    try {
      const file = event.target.files[0];
      if (!file) {
        toast.error("No file selected.");
        return;
      }

      const formDataForUpload = new FormData();
      formDataForUpload.append("files", file);

      // const response = await axiosInstance.post(
      //   "/file-upload",
      //   formDataForUpload
      // );
      const response = {};

      const fileURLs = response.data?.data?.fileURLs;
      const photoUrl = fileURLs[0];

      if (key == "adhar1") {
        setImagePreviews((prev) => ({
          ...prev,
          ["adhar1"]: photoUrl,
          selectedImg1: true,
        }));
      } else {
        setImagePreviews((prev) => ({
          ...prev,
          ["pan_card"]: photoUrl,
          selectedImg2: true,
        }));
      }

      toast.success("Adhar & Pan Card uploaded successfully");
    } catch (error) {
      console.error("Error uploading Adhar & Pan Card photo:", error);
      toast.error("Error uploading Adhar & Pan Card photo");
    }
  };

  const handleBackPage = () => {
    localStorage.setItem("offlineCheckOut", "");
    setCheckData("");
    window.location.reload();
  };

  return (
    <>
      <div className="main-content margintop20 checkout-page-main">
        <section className="checkout-main checkout-page-detail p-lg-4">
          <div className="container-fluid w-100 checkout-padding">
            <div className="row no-gutters">
              {/* <div className="col-12 mb-3">
                <h2 className="f-rob-bol text-center f-30 text-black text-uppercase h2-fs">
                User Data
                </h2>
                </div> */}
              <div className="col-12 d-md-none d-block col-md-10 col-lg-10 px-0 px-md-3 mb-3">
                <button
                  className="f-rob-bol f-16 text-uppercase bg-white border-0"
                  onClick={handleBackPage}
                >
                  <i class="fa-solid fa-chevron-left mr-2"></i>
                  Back
                </button>
              </div>
              <div className="col-12 mx-0 px-0">
                <div className="row justify-content-center flex-column-reverse flex-md-row mx-0 px-0">
                  <div className="col-12 d-md-block d-none col-md-10 col-lg-10 px-0 px-md-3 mb-3">
                    <button
                      className="f-rob-bol f-16 text-uppercase bg-white border-0"
                      onClick={handleBackPage}
                    >
                      <i class="fa-solid fa-chevron-left mr-2"></i>
                      Back
                    </button>
                  </div>
                  <div className="col-12 col-md-10 col-lg-10 px-0 px-md-3">
                    <div className="checkout-left" id="accordion">
                      <div className="card br-15 mb-3 active-tab-shadow">
                        <div className="card-header bg-white" id="headingTwo">
                          <div data-toggle="" data-target="#collapseTwo">
                            <span className="f-rob-bol f-16 text-uppercase text-secondary">
                              <i className="fas fa-check-circle mr-2"></i>
                              ADD DOCUMENTS
                            </span>
                          </div>
                        </div>
                        <div id="collapseTwo" className="collapse show">
                          <form>
                            <div className="card-body px-4 px-xl-5">
                              <div className="row">
                                <div className="col-12">
                                  <label
                                    className="check-label text-center d-block mb-3"
                                    htmlFor="adhar1"
                                  >
                                    Adhar Card:
                                  </label>
                                  <div className="row justify-content-around">
                                    <div className="col-md-4 mb-3">
                                      <div>
                                        <div className="d-flex justify-content-center check-doc">
                                          <img
                                            src={
                                              imagePreviews.adhar1
                                                ? imagePreviews.adhar1
                                                : "/images/documents/aadhaar-card-front.webp"
                                            }
                                            alt="Selected Aadhar Front"
                                            width="auto"
                                            height="200px"
                                            className="check-document"
                                          />
                                        </div>
                                        <div className="input-with-label">
                                          <input
                                            type="file"
                                            name="adhar1"
                                            className="d-none form-control br-10 f-14 f-pop-sembol text-black common-file-input"
                                            onChange={(e) =>
                                              handleFileSelect(e, "adhar1")
                                            }
                                            id="adhar1Input"
                                          />
                                        </div>
                                        {/* <div className="common-button d-flex justify-content-center">
                                          <button
                                            type="button"
                                            className="bg-blue col-6 my-2 py-2 text-uppercase text-white f-16 f-rob-bol checkout-add-edit-address"
                                            onClick={() => {
                                              document
                                                .getElementById("adhar1Input")
                                                .click();
                                            }}
                                          >
                                            Add Adhar
                                          </button>
                                        </div> */}
                                      </div>
                                    </div>

                                    <div className="col-12 col-md-12">
                                      <div className="common-button">
                                        <button
                                          type="button"
                                          className="bg-blue me-3 my-2 py-2 text-uppercase text-white f-16 f-rob-bol checkout-add-edit-address"
                                          onClick={() => {
                                            document
                                              .getElementById("adhar1Input")
                                              .click();
                                          }}
                                        >
                                          Add Adhar
                                        </button>
                                        <button
                                          type="button"
                                          className="bg-blue my-2 py-2 text-uppercase text-white f-16 f-rob-bol checkout-add-edit-address"
                                          onClick={(e) => handleFormSubmit(e)}
                                        >
                                          SAVE &amp; CONTINUE
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showVerificationPopup && (
        <>
          <div
            className={`overlay ${showVerificationPopup ? "show-popup" : ""}`}
          ></div>
          <div
            className={`verification-popup ${
              showVerificationPopup ? "show-popup" : ""
            }`}
          >
            <div className="verification-content">
              {verificationStatus === "process" && (
                <>
                  <div class="payment-loader-container">
                    <div class="payment-loader">
                      <div class="payment-circle">
                        <div class="payment-inner-circle"></div>
                        <h1>
                          <i class="fa-regular fa-id-card"></i>
                        </h1>
                      </div>
                    </div>
                  </div>
                  {/* <div className="loader"></div> */}
                  <p>Processing Aadhar Card Verification...</p>
                </>
              )}
              {verificationStatus === "verify" && (
                <>
                  <div class="payment-loader-container">
                    <div class="payment-loader">
                      <div class="payment-circle">
                        <div class="payment-inner-circle"></div>
                        <h2 className="h1-fs">
                          <i class="fa-regular fa-address-card"></i>
                        </h2>
                      </div>
                    </div>
                  </div>
                  {/* <div className="loader"></div> */}
                  <p>Processing Pan Card Verification...</p>
                </>
              )}
              {verificationStatus === "done" && (
                <>
                  <i className="fa fa-check-circle"></i>
                  <p>Verification Complete!</p>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {showVerificationEMIPopup && (
        <>
          <div
            className={`overlay ${
              showVerificationEMIPopup ? "show-popup" : ""
            }`}
          ></div>
          <div
            className={`verification-popup ${
              showVerificationPopup ? "show-popup" : ""
            }`}
          >
            <div className="verification-content">
              {verificationStatus === "done" && (
                <>
                  <i className="fa fa-check-circle"></i>
                  <p>You Are Eligible For EMI!</p>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AadharVerification;
