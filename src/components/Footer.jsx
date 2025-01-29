import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
      />
      <div
        className="container-fluid bg-dark text-light footer pt-5 wow fadeIn text-start"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-4">
              <h4 className="text-white mb-3">Quick Link</h4>
              <Link className="btn btn-link" to="/">
                Home
              </Link>
              <Link className="btn btn-link" to="/all-listing">
                Listing
              </Link>
              <Link className="btn btn-link" to="/profile">
                Profile
              </Link>
            </div>
            <div className="col-lg-4">
              <h4 className="text-white mb-3">Contact</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>2, Gomzi, Near Sumul dairy road, Katargam, Surat-395004
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>+91 63540 51487
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>fitnesswithgomzi@gmail.com
              </p>
            </div>
            <div className="col-lg-4">
              <h4 className="text-white mb-3">Links</h4>
              <div className="d-flex pt-2">
                <Link className="btn btn-outline-light btn-social" to="https://api.whatsapp.com/send?phone=6354051487&text=Hello">
                  <i className="fab fa-whatsapp"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="https://instagram.com/gomzi2712?igshid=Y2IzZGU1MTFhOQ==">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="https://www.facebook.com/gajani2">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="https://www.youtube.com/@GautamJaniOffcial">
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" to="https://www.linkedin.com/in/gautam-jani-561a50161">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
