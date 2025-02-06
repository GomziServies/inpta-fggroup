import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function TCPersonalInformation({ setCheckData }) {
  const [paymentMode, setPaymentMode] = useState("ONLINE");
  const [prepaidCouponCode, setPrepaidCouponCode] = useState({});
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    pin_code: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
  });

  const getUserData = async () => {
    try {
      // const response = await axiosInstance.get("/account/profile");
      const response = {};
      const userData = response.data.data;
      if (userData) {
        setUserData({
          pin_code: userData.user?.address?.pin_code || "",
          address_line_1: userData.user?.address?.address_line_1 || "",
          address_line_2: userData.user?.address?.address_line_2 || "",
          city: userData.user?.address?.city || "",
          state: userData.user?.address?.state || "",
          country: userData.user?.address?.country || "",
          email: userData.user?.email || "",
          mobile: userData.user?.mobile || "",
          first_name: userData.user?.first_name || "",
          last_name: userData.user?.last_name || "",
        });
      }
    } catch (error) {
      console.error("Error in getUserData:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateUserData = async (data) => {
    try {
      // await axiosInstance.post("/account/update-profile", data);
      getUserData();
    } catch (error) {
      console.error("Error in updateUserData:", error);
    }
  };

  const compareUserData = (updatedUserData) => {
    return (
      updatedUserData.pin_code === userData.pin_code &&
      updatedUserData.address_line_1 === userData.address_line_1 &&
      updatedUserData.address_line_2 === userData.address_line_2 &&
      updatedUserData.city === userData.city &&
      updatedUserData.email === userData.email
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // const updatedUserData = {
      //   pin_code: e.target.postalCode.value,
      //   address_line_1: e.target.officeName.value,
      //   address_line_2: e.target.roadName.value,
      //   city: e.target.city.value,
      //   state: e.target.state.value,
      //   country: e.target.country.value,
      //   email: e.target.email.value,
      //   first_name: e.target.first_name.value,
      //   last_name: e.target.last_name.value,
      // };
      // if (!userData.username) {
      //   await updateUserData(updatedUserData);
      // } else if (!compareUserData(updatedUserData)) {
      //   await updateUserData(updatedUserData);
      // }
      localStorage.setItem("offlineCheckOut", "address");
      setCheckData("address");
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
    }
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
              <div className="col-12 mx-0 px-0">
                <div className="row justify-content-center flex-column-reverse flex-md-row mx-0 px-0">
                  <div className="col-12 col-md-7 col-lg-8 px-0 px-md-3">
                    <div className="checkout-left" id="accordion">
                      {/* <CheckOutLoginSignup /> */}
                      <div className="card br-15 mb-3 active-tab-shadow">
                        <div className="card-header bg-white" id="headingTwo">
                          <div data-toggle="" data-target="#collapseTwo">
                            <span className="f-rob-bol f-16 text-uppercase text-secondary">
                              <i className="fas fa-check-circle mr-2"></i>
                              Personal Information
                            </span>
                          </div>
                        </div>
                        <div id="collapseTwo" className="collapse show">
                          {/* <UserAddressForm
                            userData={userData}
                            handleFormSubmit={handleFormSubmit}
                            paymentMode={paymentMode}
                            setPaymentMode={setPaymentMode}
                            setPrepaidCouponCode={setPrepaidCouponCode}
                          /> */}

                          <div className="card-body px-4 px-xl-5">
                            <div className="row">
                              <div className="col-12">
                                <div className="row">
                                  <div className="col-12 col-md-6 mb-3">
                                    <div className="text-start">
                                      <div>
                                        <label className="mb-2">
                                          First Name
                                        </label>
                                      </div>
                                      <div className="input-with-label d-flex align-items-center">
                                        <input
                                          type="text"
                                          placeholder="Enter First Name"
                                          name="first_name"
                                          className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                          required
                                          defaultValue={userData.first_name}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 mb-3">
                                    <div className="text-start">
                                      <div>
                                        <label className="mb-2">
                                          Last Name
                                        </label>
                                      </div>
                                      <div className="input-with-label d-flex align-items-center">
                                        <input
                                          type="text"
                                          placeholder="Enter Last Name"
                                          name="last_name"
                                          className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                          required
                                          defaultValue={userData.last_name}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 mb-3">
                                    <div className="text-start">
                                      <div>
                                        <label className="mb-2">
                                          Mobile Number
                                        </label>
                                      </div>
                                      <div className="input-with-label d-flex align-items-center">
                                        <input
                                          type="text"
                                          placeholder="Enter Mobile Number"
                                          name="mobile"
                                          className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                          required
                                          defaultValue={userData.mobile}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 mb-3">
                                    <div className="text-start">
                                      <div>
                                        <label className="mb-2">
                                          WhatsaApp Number
                                        </label>
                                      </div>
                                      <div className="input-with-label d-flex align-items-center">
                                        <input
                                          type="text"
                                          placeholder="Enter WhatsaApp Number"
                                          name="mobile"
                                          className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                          required
                                          defaultValue={userData.mobile}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 mb-3">
                                    <div className="text-start">
                                      <div>
                                        <label className="mb-2">Email</label>
                                      </div>
                                      <div className="input-with-label d-flex align-items-center">
                                        <input
                                          type="email"
                                          placeholder="Enter Email"
                                          name="email"
                                          className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                          required
                                          defaultValue={userData.email}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 mb-3">
                                    <div className="text-start">
                                      <div>
                                        <label className="mb-2">Website</label>
                                      </div>
                                      <div className="input-with-label d-flex align-items-center">
                                        <input
                                          type="text"
                                          placeholder="Enter Website"
                                          name="mobile"
                                          className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                          required
                                          defaultValue={userData.mobile}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 mb-3">
                                    <div className="text-start">
                                      <div>
                                        <label className="mb-2">
                                          Objective
                                        </label>
                                      </div>
                                      <div className="input-with-label d-flex align-items-center">
                                        <textarea
                                          placeholder="Describe"
                                          rows={5}
                                          name="issue"
                                          defaultValue={userData.last_name}
                                          required
                                          className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="col-12 col-md-6 mb-3">
                                    <div className="text-start">
                                      <div>
                                        <label className="mb-2">
                                          House No/Building Name/Office Name
                                        </label>
                                      </div>
                                      <div className="input-with-label d-flex align-items-center">
                                        <input
                                          type="text"
                                          placeholder="Enter House No/Building Name/Office Name"
                                          name="officeName"
                                          className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                          required
                                          defaultValue={userData.address_line_1}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 mb-3">
                                    <div className="text-start">
                                      <div>
                                        <label className="mb-2">
                                          Road Name/Area/Colony
                                        </label>
                                      </div>
                                      <div className="input-with-label d-flex align-items-center">
                                        <input
                                          type="text"
                                          placeholder="Enter Road Name/Area/Colony"
                                          name="roadName"
                                          className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                          required
                                          defaultValue={userData.address_line_2}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 mb-3">
                                    <div className="text-start">
                                      <div>
                                        <label className="mb-2">City</label>
                                      </div>
                                      <div className="input-with-label d-flex align-items-center">
                                        <input
                                          type="text"
                                          placeholder="Enter City"
                                          name="city"
                                          className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                          required
                                          defaultValue={userData.city}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 mb-3">
                                    <div className="text-start">
                                      <div>
                                        <label className="mb-2">
                                          State Name
                                        </label>
                                      </div>
                                      <div className="input-with-label d-flex align-items-center">
                                        <input
                                          id="state"
                                          type="text"
                                          placeholder="Enter State Name"
                                          name="state"
                                          className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                          required
                                          defaultValue={userData.state}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 mb-3">
                                    <div className="text-start">
                                      <div>
                                        <label className="mb-2">Country</label>
                                      </div>
                                      <div className="input-with-label d-flex align-items-center">
                                        <input
                                          id="country"
                                          type="text"
                                          placeholder="Enter Country"
                                          name="country"
                                          className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                          required
                                          defaultValue={userData.country}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 mb-3">
                                    <div className="text-start">
                                      <div>
                                        <label className="mb-2">
                                          Postal Code
                                        </label>
                                      </div>
                                      <div className="input-with-label d-flex align-items-center">
                                        <input
                                          id="postalCode"
                                          type="text"
                                          placeholder="Enter Postal Code"
                                          name="postalCode"
                                          className="form-control br-10 f-14 f-pop-sembol text-black common-input"
                                          required
                                          maxLength="6"
                                          defaultValue={userData.pin_code}
                                        />
                                      </div>
                                    </div>
                                  </div> */}

                                  <div className="col-12 col-md-12">
                                    <div className="common-button">
                                      <button
                                        type="button"
                                        className="bg-blue my-2 py-2 text-uppercase text-white f-16 f-rob-bol checkout-add-edit-address"
                                        onClick={(e) => {
                                          handleFormSubmit(e)
                                          // setPaymentMode("ONLINE");
                                          // setPrepaidCouponCode({ discount: 0 });
                                          // if (paymentMode) {
                                          //   document
                                          //     .querySelector("form")
                                          //     .requestSubmit();
                                          // } else {
                                          //   Swal.fire({
                                          //     icon: "error",
                                          //     title: "Error!",
                                          //     text: "Please select a payment method.",
                                          //   });
                                          // }
                                        }}
                                      >
                                        Next
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <Form.Group controlId="mobile">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Mobile Number*"
                              className="rounded bg-light"
                              // onChange={(e) => setMobileNumber(e.target.value)}
                            />
                          </Form.Group> */}
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
    </>
  );
}

export default TCPersonalInformation;
