import React, { useEffect, useState } from "react";
import { sendInquiry } from "../assets/js/contact-us";
import axiosInstance from "../js/api";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [currentStep, setCurrentStep] = React.useState("login");
  const [otpDialogOpen, setOtpDialogOpen] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState("");

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

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

        const IsInptaUser = response.data.data.active_services.find(
          (service) => service === "INPTA-LISTING"
        );

        if (!IsInptaUser) {
          await axiosInstance.post("/account/enable-inpta-listing");
        }

        handleApplyForInquiry();
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleOtpSubmit:", error);
    }
  };

  const handleGoBack = () => {
    setCurrentStep("login");
  };

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get("/account/profile");
      localStorage.setItem("user_info", JSON.stringify(response.data.data));
      setUserData(response?.data?.data?.user);
    } catch (error) {
      console.error("Error in handleAgreeAndConfirm:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleApplyForInquiry = async () => {
    try {
      const LoginToken = await localStorage.getItem("authorization");
      if (!LoginToken) {
        handleShow();
      } else {
        let modifiedMessage = `${message}\n\n: ${course}`;
        await sendInquiry(
          name,
          email,
          userData?.mobile,
          course,
          modifiedMessage,
          window.location.href,
          null,
          null,
          null
        );
        setName("");
        setEmail("");
        setPhoneNumber("");
        setCourse("");
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <section>
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Contact Us
              </h6>
              <h1 className="mb-5">Contact For Any Query</h1>
            </div>
            <div className="row g-4">
              <div
                className="col-lg-6 col-md-6 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <iframe
                  className="position-relative rounded w-100 h-100"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2707.136526656638!2d72.83842927353027!3d21.220501781168633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ee63ed3cc6b%3A0x6328012d841aebd!2sAbhushan%20Bunglows!5e1!3m2!1sen!2sin!4v1737972221349!5m2!1sen!2sin"
                  frameBorder={0}
                  style={{ minHeight: 300, border: 0 }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex={0}
                />
              </div>
              <div
                className="col-lg-6 col-md-12 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: 150 }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      onClick={handleApplyForInquiry}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            className="nav-brand d-flex justify-content-center align-items-center mb-2"
            href="#"
          >
            <img
              src="images/inpta-logo.webp"
              className="logo"
              alt="logo"
              width="40%"
            />
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
            <img
              src="images/inpta-logo.webp"
              className="logo"
              alt="logo"
              width="40%"
            />
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

export default ContactPage;
