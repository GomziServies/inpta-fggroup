import React, { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../../assets/css/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/rsuite.min.css";
import { Modal } from "react-bootstrap";
import Cropper from "react-easy-crop";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

const ProgressBar = ({ activeData, pendingData }) => {
  return (
    <div>
      <>
        <div className="col-12 mb-5">
          <div className="col-12 p-0 mt-4 meal">
            <p className="mt-md-5 mt-0 mb-3 text-center fs-20">Registration :-</p>
          </div>
          <div className="row meal">
            <div
              className={`order-tracking ${
                activeData === "first" || activeData === "second" || activeData === "third" || activeData === "fourth" ? "completed" : pendingData === "first" ? "pending" : ""
              }`}
            >
              <span className="is-complete"></span>
              <p>Training Partner</p>
            </div>
            <div
              className={`order-tracking ${
                activeData === "second" || activeData === "third" || activeData === "fourth" ? "completed" : pendingData === "second" ? "pending" : ""
              }`}
            >
              <span className="is-complete"></span>
              <p>Training Center</p>
            </div>
            <div
              className={`order-tracking ${
                activeData === "third" || activeData === "fourth" ? "completed" : pendingData === "third" ? "pending" : ""
              }`}
            >
              <span className="is-complete"></span>
              <p>Submit Certificate</p>
            </div>
            <div
              className={`order-tracking ${
                activeData === "fourth" ? "completed" : pendingData === "fourth" ? "pending" : ""
              }`}
            >
              <span className="is-complete"></span>
              <p>Auditor Verification</p>
            </div>
          </div>
        </div>
      </>
      <ToastContainer />
    </div>
  );
};
export default ProgressBar;
