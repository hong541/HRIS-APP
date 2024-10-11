const initialState = {
  loading: false,
  checkInDate: null,
  error: null,
};

export const checkInReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECKIN_REQUEST":
      return { ...state, loading: true };
    case "CHECKIN_SUCCESS":
      return { ...state, loading: false, checkInDate: action.payload };
    case "CHECKIN_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const checkOutReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECKOUT_REQUEST":
      return { ...state, loading: true };
    case "CHECKOUT_SUCCESS":
      return { ...state, loading: false, checkOutData: action.payload };
    case "CHECKOUT_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default checkOutReducer;
