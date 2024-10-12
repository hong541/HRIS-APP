import axios from "axios";

export const checkInUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "CHECKIN_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${import.meta.env.APPLICATION_URL}/api/checkIn/checkin`,
      formData,
      config
    );
    dispatch({ type: "CHECKIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "CHECKIN_FAIL",
      payload: error.response?.data?.message || "Failed to check in",
    });
  }
};

export const checkOutUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "CHECKOUT_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${import.meta.env.APPLICATION_URL}/api/checkIn/checkout`,
      formData,
      config
    );
    dispatch({ type: "CHECKOUT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "CHECKOUT_FAIL",
      payload: error.response?.data?.message || "Failed to check out",
    });
  }
};
