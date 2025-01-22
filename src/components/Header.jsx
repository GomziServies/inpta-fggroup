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
        setIsLogin(true)

        const IsBusinessUser = response.data.data.active_services.find(
          (service) => service === "BUSINESS-LISTING"
        );

        if (!IsBusinessUser) {
          await axiosInstance.post("/account/enable-business-listing");
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

  function openside() {
    document.getElementById("demo").style.width = "100%";
  }

  function sideclose() {
    document.getElementById("demo").style.width = "0px";
  }

  return (
    <>
      <div className="container-fluid main p-0 m-0">
        <div className="d-lg-block d-none log">
          <Link to="/">
            <div>
              <img src="images/inpta-logo.webp" width="80%" alt="Fg Group" />
            </div>
          </Link>
        </div>
        <div className="d-lg-none d-sm-block t0 log1">
          <Link to="/">
            <div>
              <img src="images/inpta-logo.webp" width="100%" alt="Fg Group" />
            </div>
          </Link>
        </div>
        <div className="lang">
          <ul>
            <li>
              <Link to="/">
                <p className="m-0">Home</p>
              </Link>
            </li>
            <li>
              <Link to="/all-listing">
                <p className="m-0">Listing</p>
              </Link>
            </li>
            {isLogin ? (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="side" id="demo">
          <span className="closebtn" onClick={sideclose}>
            ×
          </span>
          <Link to="/" style={{ marginTop: 50 }}>
            <img
              className="lazy mx-auto"
              src="images/inpta-logo.webp"
              width="17%"
              alt="Fg Group"
            />
          </Link>
          <Link to="/">Home</Link>
          <Link to="/listing-list">Listing</Link>
          {isLogin ? <Link to="/profile">Profile</Link> : ""}
          <div className="d-flex justify-content-center mt-3">
            {isLogin ? (
              <Link
                to="/add-listing"
                class="add-list-btn w-75 d-md-none d-block"
              >
                <i class="fas fa-plus me-2"></i>Add Listing
              </Link>
            ) : (
              <Link to="/login" class="add-list-btn w-75 d-md-none d-block">
                <i class="fas fa-plus me-2"></i>Add Listing
              </Link>
            )}
          </div>
        </div>
        <span
          className="d-lg-none d-sm-block btnn"
          style={{ cursor: "pointer", fontSize: 20, color: "black" }}
          onClick={openside}
        >
          ☰
        </span>
        <div className="login d-lg-block d-none">
          <ul>
            {isLogin ? (
              ""
            ) : (
              <li>
                <a href="#" onClick={handleShow} className="ft-bold">
                  <i className="fas fa-sign-in-alt me-2 theme-cl" />
                  Sign In
                </a>
              </li>
            )}
            <li className="mx-0" style={{ cursor: "pointer" }}>
              {isLogin ? (
                <Link to="/add-listing" class="add-list-btn">
                  <i class="fas fa-plus me-2"></i>Add Listing
                </Link>
              ) : (
                <Link to="/login" class="add-list-btn">
                  <i class="fas fa-plus me-2"></i>Add Listing
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      <Modal
        show={showModal && currentStep === "login"}
        onHide={handleClose}
        centered
      >
        <div class="modal-headers">
          <button type="button" class="close" onClick={handleClose}>
            <span class="ti-close"></span>
          </button>
        </div>
        <Modal.Body className="p-5">
          <a
            className="nav-brand d-flex justify-content-center align-items-center"
            href="#"
          >
            <img src="images/inpta-logo.webp" className="logo" alt="" />
          </a>
          <h3 className="text-center">Welcome</h3>
          <div class="text-center mb-5">
            <h4 class="m-0 ft-medium">Login for a seamless experience</h4>
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
        <div class="modal-headers">
          <button
            type="button"
            class="close"
            onClick={() => setOtpDialogOpen(false)}
          >
            <span class="ti-close"></span>
          </button>
        </div>
        <Modal.Body className="p-5">
          <a
            className="nav-brand d-flex justify-content-center align-items-center"
            href="#"
          >
            <img src="images/inpta-logo.webp" className="logo" alt="" />
          </a>
          <div class="text-center mb-4">
            <h4 class="m-0 ft-medium">OTP Verification</h4>
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
                  className="w-100 theme-bg text-light rounded ft-medium"
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
