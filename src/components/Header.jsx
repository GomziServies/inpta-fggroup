import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosInstance from "../js/api";
import "../assets/css/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Header() {
  const [isFixed, setIsFixed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [currentStep, setCurrentStep] = React.useState("login");
  const [otpDialogOpen, setOtpDialogOpen] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleShow = (event) => {
    event.preventDefault();
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const LoginToken = localStorage.getItem("authorization");
    if (LoginToken) {
      setIsLogin(true);
    }
  }, []);

  const handleLoginSubmit = async () => {
    try {
      const response = await axiosInstance.post("/account/authorization", {
        mobile: mobileNumber,
      });

      if (response.data && response.data.data && response.data.data.OTP) {
        setOtpDialogOpen(true);
        setCurrentStep("otp");
        setOtpCode(response.data.data.OTP);

        toast.success("OTP Sent! You will receive an OTP shortly.");
      } else {
        setOtpDialogOpen(true);
        setCurrentStep("otp");
        toast.success("OTP Sent! You will receive an OTP shortly.");
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
      console.error("Error in handleLoginSubmit:", error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        "/account/authorization/verify",
        {
          mobile: mobileNumber,
          otp: otpCode,
        }
      );

      const auth = response.data.data.authorization;

      if (response.status === 200) {
        localStorage.setItem("authorization", auth);
        getUserData();
        setOtpDialogOpen(false);
        toast.success("OTP Verified!");
        setIsLogin(true);
        const activeServices = response.data.data.active_services;
        if (activeServices.includes("BUSINESS-LISTING")) {
          toast.success("Login Successful!");
        }
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleOtpSubmit:", error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get("/account/profile");
      localStorage.setItem("user_info", JSON.stringify(response.data.data));
    } catch (error) {
      console.error("Error in handleAgreeAndConfirm:", error);
    }
  };

  const handleGoBack = () => {
    setCurrentStep("login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h2 className="m-0 text-primary">
            <img
              src="images/inpta-logo.webp"
              alt="inpta-logo"
              className="inpta-logo"
            />
          </h2>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav w-100 d-flex justify-content-center p-4 p-lg-0">
            <Link to="/" className="nav-item nav-link active">
              Home
            </Link>
            <Link to="/all-listing" className="nav-item nav-link">
              Listing
            </Link>
            <Link to="/profile" className="nav-item nav-link">
              Profile
            </Link>
          </div>
          <Link
            to="/add-listing"
            className="btn btn-primary rounded-start w-25 py-4 px-lg-5 d-none d-lg-flex align-items-center"
          >
            Add Listing <FontAwesomeIcon icon={faArrowRightLong} className="ms-3" />
          </Link>
        </div>
      </nav>

      <Modal
        show={showModal && currentStep === "login"}
        onHide={handleClose}
        centered
      >
        <div className="modal-headers">
          <button type="button" className="close" onClick={handleClose}>
            <span className="ti-close"></span>
          </button>
        </div>
        <Modal.Body className="p-5">
          <Link
            className="nav-brand d-flex justify-content-center align-items-center"
            to="#"
          >
            <img src="images/logo.png" className="logo" alt="" />
          </Link>
          <h3 className="text-center">Welcome</h3>
          <div className="text-center mb-5">
            <h4 className="m-0 ft-medium">Login for a seamless experience</h4>
          </div>
          <Form>
            <Form.Group controlId="mobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile Number*"
                className="rounded bg-light"
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </Form.Group>

            <div className="text-center my-3">
              <Button
                variant="primary"
                className="w-100 theme-bg text-light rounded ft-medium"
                onClick={handleLoginSubmit}
              >
                Sign In
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={otpDialogOpen && currentStep === "otp"}
        onHide={() => setOtpDialogOpen(false)}
        centered
      >
        <div className="modal-headers">
          <button
            type="button"
            className="close"
            onClick={() => setOtpDialogOpen(false)}
          >
            <span className="ti-close"></span>
          </button>
        </div>
        <Modal.Body className="p-5">
          <Link
            className="nav-brand d-flex justify-content-center align-items-center"
            to="#"
          >
            F
            <img src="images/logo.png" className="logo" alt="" />
          </Link>
          <div className="text-center mb-4">
            <h4 className="m-0 ft-medium">OTP Verification</h4>
          </div>
          <Form>
            <Form.Group controlId="mobile">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP*"
                className="rounded bg-light"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
              />
            </Form.Group>
            <div className="text-center row justify-content-center mt-4 my-3">
              <div className="col-5">
                <Button
                  variant="primary"
                  className="w-100 bg-dark text-light rounded ft-medium"
                  onClick={handleGoBack}
                >
                  Back
                </Button>
              </div>
              <div className="col-5">
                <Button
                  variant="primary"
                  className="w-100 theme-bg text-light rounded ft-medium"
                  onClick={handleOtpSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
