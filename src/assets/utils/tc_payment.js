import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { inptaListingAxiosInstance } from "../../js/api";

export const createTCPayment = async (listing_id) => {
  try {
    if (!listing_id) {
      throw new Error("TC Listing ID is required.");
    }

    const result = await inptaListingAxiosInstance.get(
      `/payment-order/training-center-listing?listing_id=${listing_id}`
    );

    if (result && result.status === 200) {
      if (!window.Razorpay) {
        Swal.fire({
          title: "Error",
          text: "Razorpay SDK failed to load. Please try again.",
          icon: "error",
        });
        return;
      }

      const options = {
        hidden: { contact: false, email: false },
        handler: function (response) {
          Swal.fire({
            title: "Success",
            text: "Your payment has been successfully processed.",
            icon: "success",
          }).then(() => {
            toast.success("Order created");
            localStorage.setItem("tc_listing_submitted", true);
            window.location.href = "/thank-you";
          });
        },
      };

      const razorpay = new window.Razorpay({
        ...result.data.data,
        ...options,
      });

      razorpay.open();
      return { showLoginModal: false, success: true };
    }
  } catch (error) {
    if (error.response && error.response.data.status === 401) {
      console.log("error response");
      return { showLoginModal: true };
    } else {
      Swal.fire({
        title: "Error",
        text: error.message || "An error occurred during the order creation.",
        icon: "error",
      });
    }
  }
};

export const createTCSubmitCertificatePayment = async (listing_id) => {
  try {
    if (!listing_id) {
      throw new Error("TC Submit Certificate Listing ID is required.");
    }

    const result = await inptaListingAxiosInstance.get(
      `/payment-order/training-center-certificate-submission?listing_id=${listing_id}`
    );

    if (result && result.status === 200) {
      if (!window.Razorpay) {
        Swal.fire({
          title: "Error",
          text: "Razorpay SDK failed to load. Please try again.",
          icon: "error",
        });
        return;
      }

      const options = {
        hidden: { contact: false, email: false },
        handler: function (response) {
          Swal.fire({
            title: "Success",
            text: "Your payment has been successfully processed.",
            icon: "success",
          }).then(() => {
            toast.success("Order created");
            localStorage.setItem("tc_listing_certificate_submitted", true);
            window.location.href = "/thank-you";
          });
        },
      };

      const razorpay = new window.Razorpay({
        ...result.data.data,
        ...options,
      });

      razorpay.open();
      return { showLoginModal: false, success: true };
    }
  } catch (error) {
    if (error.response && error.response.data.status === 401) {
      console.log("error response");
      return { showLoginModal: true };
    } else {
      Swal.fire({
        title: "Error",
        text: error.message || "An error occurred during the order creation.",
        icon: "error",
      });
    }
  }
};

export const createTCAuditorVerificationPayment = async (listing_id) => {
  try {
    if (!listing_id) {
      throw new Error("TC Auditor Verification Listing ID is required.");
    }

    const result = await inptaListingAxiosInstance.get(
      `/payment-order/training-center-approval-fee?listing_id=${listing_id}`
    );

    if (result && result.status === 200) {
      if (!window.Razorpay) {
        Swal.fire({
          title: "Error",
          text: "Razorpay SDK failed to load. Please try again.",
          icon: "error",
        });
        return;
      }

      const options = {
        hidden: { contact: false, email: false },
        handler: function (response) {
          Swal.fire({
            title: "Success",
            text: "Your payment has been successfully processed.",
            icon: "success",
          }).then(() => {
            toast.success("Order created");
            localStorage.setItem("tc_listing_auditor_submitted", true);
            window.location.href = "/thank-you";
          });
        },
      };

      const razorpay = new window.Razorpay({
        ...result.data.data,
        ...options,
      });

      razorpay.open();
      return { showLoginModal: false, success: true };
    }
  } catch (error) {
    if (error.response && error.response.data.status === 401) {
      console.log("error response");
      return { showLoginModal: true };
    } else {
      Swal.fire({
        title: "Error",
        text: error.message || "An error occurred during the order creation.",
        icon: "error",
      });
    }
  }
};
