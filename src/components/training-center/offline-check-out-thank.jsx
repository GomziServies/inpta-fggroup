import React from "react";

function TCOfflineCheckOutThank({ setCheckData }) {
  let offlineCourseData = localStorage.getItem("offlineCourseData");
  offlineCourseData = JSON.parse(offlineCourseData);

  const handleComplete = () => {
    localStorage.removeItem("offlineCheckOut");
    setCheckData("");
    window.location.href = offlineCourseData.link;
  };

  return (
    <>
      <div className="main-content margintop20 checkout-page-main">
        <section className="checkout-main checkout-page-detail p-lg-4">
          <div className="container-fluid w-100 checkout-padding">
            <div className="row justify-content-center">
              <div className="col-12 col-md-7 px-0 px-md-3 promo-code-sticky mb-2 mt-2 mt-md-0">
                <div className="col-12 mb-2 border bg-white p-4 rounded shadow-sm">
                  <div className="text-center">
                    <h2 className="thank-you-title h2-fs">
                      Thank You for Your Purchase!
                    </h2>
                    <div className="thank-you-content">
                      <p className="thank-you-message">
                        We appreciate your trust in choosing our course. You now
                        have full access to all materials, and we're excited to
                        be part of your learning journey.
                      </p>
                      <p className="support-info">
                        For any questions or assistance, feel free to reach out
                        to our support team. We're here to help!
                      </p>
                      <div className="contact-info">
                        <p>
                          <strong>Mobile:</strong> +91-8866842520
                        </p>
                        <p>
                          <strong>Email:</strong> fitnesswithgomzi@gmail.com
                        </p>
                      </div>
                      <p className="enjoy-message">
                        Enjoy your learning experience!
                      </p>
                      <p className="team-signature">- The FG Group Team</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-12 mt-4">
                  <div className="common-button">
                    <button
                      type="button"
                      className="bg-blue my-2 py-2 text-uppercase text-white f-16 f-rob-bol checkout-add-edit-address"
                      onClick={() => handleComplete()}
                    >
                      Okay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default TCOfflineCheckOutThank;
