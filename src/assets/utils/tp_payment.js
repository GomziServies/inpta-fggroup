import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { inptaListingAxiosInstance } from "../../js/api";

export const createTPPayment = async (listing_id) => {
  try {
    if (!listing_id) {
      throw new Error("TP Listing ID is required.");
    }

    const result = await inptaListingAxiosInstance.get(
      `/payment-order/training-placement-listing?listing_id=${listing_id}`
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
            text: "Please check your email for the invoice.",
            icon: "success",
          }).then(() => {
            toast.success("Order created");
            localStorage.removeItem("tp_listing_id");
            localStorage.setItem("tp_listing_submitted", true);
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
