import axios from "axios";

export const setHotels = (hotels) => ({
  type: "SET_HOTELS",
  payload: hotels,
});

export const fetchHotels = (location) => (dispatch) => {
  axios
    .get(`http://localhost:8083/hotel/getAllByLocationName/${location}`)
    .then((response) => {
      dispatch(setHotels(response.data));
    })
    .catch((error) => {
      // Handle error if needed
      console.error("Error fetching hotels:", error);
    });
};
