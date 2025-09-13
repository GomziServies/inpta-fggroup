import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Modal from "react-bootstrap/Modal";

function TCOfflineCheckOutFinal({ setCheckData }) {
  const utc = require("dayjs/plugin/utc");
  dayjs.extend(utc);
  let offlineCourseData = localStorage.getItem("offlineCourseData");
  offlineCourseData = JSON.parse(offlineCourseData);
  const [userData, setUserData] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  const handleRadioChange = (e) => {
    setIsConfirmed(e.target.checked);
  };

  const getUserData = async () => {
    try {
      // const response = await axiosInstance.get("/account/profile");
      const response = {};
      const userData = response.data.data;
      if (userData) {
        setUserData(userData.user);
      }
      const prices = offlineCourseData.prices || 0;
      const selectedEmiOption =
        offlineCourseData.selectedEmiOption === "3month"
          ? {
              month: 3,
              additional: {
                percent: 6,
                amount: (prices * 0.06).toFixed(0),
              },
              price: prices.toFixed(0),
              additionalPrice: (prices + prices * 0.06).toFixed(0),
              perMonth: ((prices + prices * 0.06) / 3).toFixed(0),
              paidId: offlineCourseData?.planId?.three,
            }
          : offlineCourseData.selectedEmiOption === "6month"
          ? {
              month: 6,
              additional: {
                percent: 12,
                amount: (prices * 0.12).toFixed(0),
              },
              price: prices.toFixed(0),
              additionalPrice: (prices + prices * 0.12).toFixed(0),
              perMonth: ((prices + prices * 0.12) / 6).toFixed(0),
              paidId: offlineCourseData?.planId?.six,
            }
          : offlineCourseData.selectedEmiOption === "9month"
          ? {
              month: 9,
              additional: {
                percent: 18,
                amount: (prices * 0.18).toFixed(0),
              },
              price: prices.toFixed(0),
              additionalPrice: (prices + prices * 0.18).toFixed(0),
              perMonth: ((prices + prices * 0.18) / 9).toFixed(0),
              paidId: offlineCourseData?.planId?.nine,
            }
          : offlineCourseData.selectedEmiOption === "12month"
          ? {
              month: 12,
              additional: {
                percent: 24,
                amount: (prices * 0.24).toFixed(0),
              },
              price: prices.toFixed(0),
              additionalPrice: (prices + prices * 0.24).toFixed(0),
              perMonth: ((prices + prices * 0.24) / 12).toFixed(0),
              paidId: offlineCourseData?.planId?.twelve,
            }
          : null;

      setSelectedOption(selectedEmiOption);
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
      const updatedCourseData = {
        plan_id: selectedOption?.paidId,
        total_count: selectedOption?.month,
        quantity: 1,
        // start_at: dayjs().utc().format("YYYY-MM-DDTHH:mm:ss[Z]"),
        // expire_by: dayjs().utc().add(3, "day").format("YYYY-MM-DDTHH:mm:ss[Z]"),
        customer_notify: 1,
      };
      try {
        // const response = await axiosInstance.post(
        //   "/subscription/create",
        //   updatedCourseData
        // );
        // setShowModal(false);
        // setIsConfirmed(false);

        try {
          localStorage.setItem("IsCoursePurchase", "Offline");
          // const result = await createCourseSubscriptionOrder(updatedCourseData)
          const result = {};
          if (result.success) {
            localStorage.removeItem("tmp_CourseSubscriptionPurchasePayload");
            // localStorage.removeItem("offlineCourseClick")
          }
        } catch (error) {
          console.error("Error during order:", error);
        }
        window.Razorpay && window.Razorpay.close && window.Razorpay.close();
        window.scrollTo(0, 0);

        // window.location.href = response?.data?.data?.short_url;
        // window.open(response?.data?.data?.short_url, "_blank");

        // setTimeout(() => {
        //   localStorage.setItem("offlineCheckOut", "checkOut");
        //   setCheckData("checkOut");
        // }, 1000);
        // toast.success('Course Purchase Successfully.')
      } catch (error) {
        console.error("Error during order:", error);
      }
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
    }
  };

  const handleBackPage = () => {
    localStorage.setItem("offlineCheckOut", "document");
    setCheckData("document");
    // window.location.reload();
  };
  return (
    <>
      <div className="main-content margintop20 checkout-page-main">
        <section className="checkout-main checkout-page-detail p-lg-4">
          <div className="container-fluid w-100 checkout-padding">
            <div className="row justify-content-center">
              {/* <div className="col-12 mb-3">
                <h2 className="f-rob-bol h2-fs text-center f-30 text-black text-uppercase">
                  User Data
                </h2>
              </div> */}
              <div className="d-md-none d-block col-md-10 px-0 px-md-3 mb-2">
                <button
                  className="f-rob-bol f-16 text-uppercase bg-white border-0"
                  onClick={handleBackPage}
                >
                  <i class="fa-solid fa-chevron-left mr-2"></i>
                  Back
                </button>
              </div>
              {/* <div className="col-12 mx-0 px-0"> */}
              {/* <div className="row justify-content-center align-items-center flex-column-reverse flex-md-row mx-0 px-0"> */}
              <div className="col-12 d-md-block d-none mb-3 pl-5">
                <button
                  className="f-rob-bol f-16 text-uppercase bg-white border-0"
                  onClick={handleBackPage}
                >
                  <i class="fa-solid fa-chevron-left mr-2"></i>
                  Back
                </button>
              </div>

              <div className="course-section-wrapper check-final col-12 col-md-7 promo-code-sticky mb-2 mt-2 mt-md-0 text-start">
                <div className="section-card px-4 pt-3 pb-1">
                  <div className="section-content mb-4">
                    <div className="section-header pb-1 mb-3 border-bottom">
                      <h4 className="h4-fs">User Information</h4>
                    </div>
                    <div className="section-content row">
                      <div className="detail-item col-md-4">
                        <div>
                          <b className="me-2 mb-2">Name: </b>
                          <input
                            type="text"
                            value={
                              userData.first_name + " " + userData.last_name
                            }
                            className="form-control inputfield-bg mt-1"
                            disabled
                          />
                        </div>
                        {/* <span>
                            {userData.first_name + " " + userData.last_name}
                          </span> */}
                      </div>
                      <div className="detail-item col-md-4">
                        <div>
                          <b className="mb-2">Email: </b>
                          <input
                            type="text"
                            value={userData.email}
                            className="form-control inputfield-bg mt-1"
                            disabled
                          />
                        </div>
                        {/* <span>{userData.email}</span> */}
                      </div>
                      <div className="detail-item col-md-4">
                        <div>
                          <b className="mb-2">Mobile No.: </b>
                          <input
                            type="text"
                            value={
                              userData.country_code + " " + userData.mobile
                            }
                            className="form-control inputfield-bg mt-1"
                            disabled
                          />
                        </div>
                        {/* <span>
                          {userData.country_code + " " + userData.mobile}
                        </span> */}
                      </div>
                    </div>

                    <div className="section-content row">
                      <div className="detail-item col-md-12">
                        <div>
                          <div className="section-header pb-1 mb-3 border-bottom">
                            <h4 className="h4-fs">Note:</h4>
                          </div>
                          <p>
                            The first step to becoming a training partner with
                            INPTA is fulfilling all accreditation requirements
                            carefully. Once you complete the selection process
                            and get approved, you will proceed with the training
                            center affiliation accreditation. The full amount of
                            <b> ₹10,000 will be refunded</b> to your account.
                          </p>
                        </div>
                        <div className="mt-2">
                          <b className="me-2 mb-2">Support: </b>
                          <p className="mb-1">
                            For any issues regarding payments, please contact
                            our support team.
                          </p>
                          <p>
                            <b>Mobile:</b> +91-8866842520
                          </p>
                          <p className="m-0">
                            <b>Email:</b> fitnesswithgomzi@gmail.com
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* <div>
                      <div className="section-header pb-1 mb-3 border-bottom">
                        <h2 className="h4-fs">Course Details</h2>
                      </div>

                      <div className="detail-item">
                        <b>Course Name: </b>
                        <span>{offlineCourseData?.name}</span>
                      </div>
                      <div className="detail-item">
                        <b>Description: </b>
                        <span>
                          {offlineCourseData?.description}
                          {showMore ? (
                            <span className="new-span">
                              {" " + offlineCourseData?.showMoreDesc}
                            </span>
                          ) : (
                            <span id="dotsx">...</span>
                          )}
                        </span>

                        <span
                          onClick={toggleReadMore}
                          id="myBtnn"
                          style={{
                            color: "#00afef",
                            fontWeight: "500",
                            cursor: "pointer",
                          }}
                        >
                          {showMore ? " Read less" : " Read more"}
                        </span>
                      </div>

                      <div>
                        {offlineCourseData?.info ? (
                          <ul className="p-0 new-li">
                            <li>
                              <i className="fas fa-clock"></i>
                              {offlineCourseData.info[0]}
                            </li>
                            <li>
                              <i className="fas fa-chalkboard-teacher"></i>
                              {offlineCourseData.info[1]}
                            </li>
                            <li>
                              <i className="fas fa-video"></i>
                              {offlineCourseData.info[2]}
                            </li>
                            <li>
                              <i className="fas fa-file-signature"></i>
                              {offlineCourseData.info[3]}
                            </li>
                          </ul>
                        ) : (
                          <ul className="p-0 new-li">
                            <li>
                              <i className="fas fa-clock"></i>
                              {offlineCourseData?.secondInfo[0]}
                            </li>
                            <li>
                              <i className="fas fa-chalkboard-teacher"></i>
                              {offlineCourseData?.secondInfo[1]}
                            </li>
                            <li>
                              <i className="fas fa-video"></i>
                              {offlineCourseData?.secondInfo[2]}
                            </li>
                          </ul>
                        )}
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4 px-0 px-md-3 promo-code-sticky mb-2 mt-2 mt-md-0">
                {/* ----- Mobile ------ */}
                <div className="col-12 mb-3 border bg-white p-3 br-15 d-block d-md-none price-mb">
                  <div
                    // className={`ReactCollapse--collapse ${
                    //   isOpen ? "open" : ""
                    // }`}
                    // aria-hidden={!isOpen}
                    // style={{
                    //   height: isOpen ? "auto" : "0px",
                    //   overflow: "hidden",
                    // }}
                    id="opendata"
                  >
                    <div className="ReactCollapse--content">
                      <div className="col-12 mb-3 bg-white py-2 px-3 d-block d-md-none border-bottom">
                        <div className="col-12 p-0">
                          <p className="f-pop-sembol f-16 text-center pb-3 mb-2 border-bottom">
                            <b className="text-center">
                              {selectedOption?.month} Training Partner
                            </b>
                          </p>
                          <p className="f-pop-sembol f-16 mb-2">
                            Price Details:
                          </p>
                        </div>
                        <div className="col-12 p-0">
                          <ul className="list-unstyled mb-0 amount-payee-list">
                            <li className="d-block mb-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-inline-block p-0 text-left">
                                  <p className="m-0 f-rob-reg f-16 text-secondary">
                                    Order Total
                                  </p>
                                </div>
                                <div className="d-inline-block p-0 text-right">
                                  <p className="m-0 f-rob-med f-16">
                                    ₹ {selectedOption?.price || 0} /-
                                  </p>
                                </div>
                              </div>
                            </li>
                            {/* {totalDiscount !== 0 && ( */}
                            <li className="d-block mb-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-inline-block p-0 text-left">
                                  <p className="m-0 f-rob-reg f-16 text-secondary">
                                    Extra ({selectedOption?.additional?.percent}
                                    %)
                                  </p>
                                </div>
                                <div className="d-inline-block p-0 text-success text-right">
                                  <p className="m-0 f-rob-med f-16">
                                    ₹ {selectedOption?.additional?.amount || 0}{" "}
                                    /-
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
                                      ₹ {selectedOption?.additionalPrice || 0}{" "}
                                      /-
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-12 px-3 d-flex justify-content-between align-items-center"
                    id="clickonthis"
                    // onClick={toggleCollapse}
                  >
                    <p className="m-0 f-rob-med f-16">Per Month</p>
                    <p className="m-0 f-rob-med f-16">
                      ₹ {selectedOption?.perMonth || 0} /-
                      <i
                        // className={`cp fa fa-chevron-${
                        //   isOpen ? "down" : "up"
                        // } f-18 text-yellow ml-2`}
                        aria-hidden="true"
                      ></i>
                    </p>
                  </div>
                </div>

                {/* ----- Desktop ------ */}
                <div className="col-12 mb-3 border bg-white p-3 br-15 d-none d-md-block">
                  <div className="col-12 p-0">
                    <p className="f-pop-sembol f-16 text-center pb-3 mb-2 border-bottom">
                      <b className="text-center">
                        {selectedOption?.month} Training Partner
                      </b>
                    </p>
                    <p className="f-pop-sembol f-16 mb-0">Price Details:</p>
                  </div>
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
                              ₹ {selectedOption?.additional?.amount || 0} /-
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
                        <p className="m-0 f-rob-med f-16">Total Amount</p>
                      </div>
                      <div className="d-inline-block">
                        <p className="m-0 f-rob-med f-16">₹ {10000 || 0} /-</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-12 mt-7">
                  <div className="common-button">
                    <button
                      type="button"
                      className="bg-blue my-2 py-2 text-uppercase text-white f-16 f-rob-bol checkout-add-edit-address"
                      onClick={(e) => handleFormSubmit(e)}
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default TCOfflineCheckOutFinal;
