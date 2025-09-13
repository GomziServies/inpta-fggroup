import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../assets/css/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ThankYouPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleNextOpen = () => {
    if (!localStorage.getItem("tp_listing_submitted")) return;

    if (!localStorage.getItem("tc_listing_submitted")) {
      window.location.href = "/training-center";
      return;
    }

    if (!localStorage.getItem("tc_listing_auditor_submitted")) {
      window.location.href = "/training-center/auditor-verification";
      return;
    }

    window.location.href = "/";
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
        <Header />
        <section className="thank-you-margin" style={{ marginTop: "90px" }}>
          <div className="container-fluid pt-md-5">
            <div className="container">
              <div className="row">
                <div className="wrapper-1">
                  <div className="wrapper-2">
                    <div className="success-checkmark">
                      <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                      </div>
                    </div>
                    <h1 className="mb-4">Thank you for Listing!</h1>
                    <p className="mb-5">
                      We will contact you further. Our team will get back you
                      soon.
                    </p>
                    <button onClick={handleNextOpen} className="go-home">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    </div>
  );
};

export default ThankYouPage;
