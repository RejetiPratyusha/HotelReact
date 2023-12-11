// const initialState = {
//   list: [],
// };
// //this is a reducer
// const location = (state = initialState, action) => {
//   console.log("in reducer..");
//   if (action.type === "GET_LIST") {
//     return { ...state, list: action.payload };
//   }
//   return state;
// };
// export default location;

const initialState = {
  hotels: [],
};

const hotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HOTELS":
      return {
        ...state,
        hotels: action.payload,
      };
    default:
      return state;
  }
};

export default hotelReducer;
