import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import "../assets/css/style.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Form } from "react-bootstrap";
import axiosInstance from "../js/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WhatsappBtn from "../components/WhatsappBtn";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [currentStep, setCurrentStep] = React.useState("login");
  const [otpDialogOpen, setOtpDialogOpen] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
        service: 'INPTA-LISTING'
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

        // const IsInptaUser = response.data.data.active_services.find(
        //   (service) => service === "INPTA-LISTING"
        // );

        // if (!IsInptaUser) {
        //   await axiosInstance.post("/account/enable-inpta-listing");
        // }

        window.location.href = "/";
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
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Login to Your Account - Access Your Business Dashboard</title>
        <meta
          name="description"
          content="Login to manage your business listings, update information, and access personalized features. Stay connected and in control of your business profile."
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="images/favicon.ico"
        />
        <link href="css/styles.css" rel="stylesheet" />
      </Helmet>
      <>
        {loading && <div className="preloader" />}
        <div id="main-wrapper">
          <Header />
          <div className="clearfix" />
          <section className="gray text-start d-flex align-items-center" style={{ marginTop: "70px", height: '500px' }}>
            <div className="container">
              <div className="row align-items-start justify-content-center p-3">
                <div className="col-xl-5 col-lg-8 col-md-12">
                  {!isLogin && currentStep === "login" && (
                    <div className="signup-screen-wrap">
                      <div className="signup-screen-single">
                        <a
                          className="nav-brand d-flex justify-content-center align-items-center"
                          href="/"
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
                          <h4 class="m-0 ft-medium">
                            Login for a seamless experience
                          </h4>
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
                      </div>
                    </div>
                  )}
                  {!isLogin && otpDialogOpen && currentStep === "otp" && (
                    <div className="signup-screen-wrap">
                      <div className="signup-screen-single">
                        <a
                          className="nav-brand d-flex justify-content-center align-items-center"
                          href="/"
                        >
                          <img
                            src="images/inpta-logo.webp"
                            className="logo"
                            alt="logo"
                            width="40%"
                          />
                        </a>
                        <div class="text-center mb-5">
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
                      </div>
                    </div>
                  )}
                  {isLogin && (
                    <div className="text-center">
                      <div className="d-flex mb-2 justify-content-center align-items-center">
                        <img
                          src="images/logo.png"
                          className="img-footer small mb-2"
                          alt=""
                        />
                        <h5 className="ps-2 mb-0">FG Group</h5>
                      </div>
                      <h3>You have already Logged in</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          <Footer />
          <a
            id="tops-button"
            className="top-scroll"
            title="Back to top"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <i className="ti-arrow-up" />
          </a>
        </div>
      </>
    </div>
  );
};

export default Login;
