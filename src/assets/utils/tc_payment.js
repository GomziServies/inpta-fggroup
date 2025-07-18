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
        handler: async function (response) {
          try {
            await inptaListingAxiosInstance.patch("/update-tc-listing", {
              listing_id: listing_id,
              tcPayment: true
            });

          Swal.fire({
            title: "Success",
            text: "Your payment has been successfully processed.",
            icon: "success",
          }).then(() => {
              toast.success("Payment successful");
              
              localStorage.setItem("tc_listing_submitted", "true");
              
              window.location.href = "/training-center/submit-certificate";
          });
          } catch (error) {
            console.error("Error updating payment status:", error);
            Swal.fire({
              title: "Error",
              text: "Payment was processed but status update failed. Please contact support.",
              icon: "error",
            });
          }
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
        handler: async function (response) {
          try {
            // Update the listing to set certificate submission status
            const updateResult = await inptaListingAxiosInstance.patch("/update-tc-listing", {
              listing_id: listing_id,
              certificateSubmitted: true
            });
            
          Swal.fire({
            title: "Success",
            text: "Your payment has been successfully processed.",
            icon: "success",
          }).then(() => {
              toast.success("Certificate submission complete");
              localStorage.setItem("tc_listing_certificate_submitted", "true");
              window.location.href = "/training-center/auditor-verification";
            });
          } catch (error) {
            console.error("Error updating certificate status:", error);
            Swal.fire({
              title: "Error",
              text: "Payment was processed but status update failed. Please contact support.",
              icon: "error",
            });
          }
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
        handler: async function (response) {
          try {
            // Update the listing to set auditor verification status
            await inptaListingAxiosInstance.patch("/update-tc-listing", {
              listing_id: listing_id,
              auditorVerified: true
            });
            
          Swal.fire({
            title: "Success",
            text: "Your payment has been successfully processed.",
            icon: "success",
          }).then(() => {
              toast.success("Auditor verification complete");
              localStorage.setItem("tc_listing_auditor_submitted", "true");
            window.location.href = "/thank-you";
          });
          } catch (error) {
            console.error("Error updating auditor verification status:", error);
            Swal.fire({
              title: "Error",
              text: "Payment was processed but status update failed. Please contact support.",
              icon: "error",
            });
          }
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
