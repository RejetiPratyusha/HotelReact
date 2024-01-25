// import { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// function ExecutiveDashboard(){
//     const [param] = useSearchParams();
//   const navigate = useNavigate();
//   const executiveId = localStorage.getItem("id");
// //   const [hotel, setHotel] = useState("");
// //   localStorage.setItem("hotelId", hotel.id);
// //   console.log(localStorage.getItem("hotelId"));
// const process = () => {
//     if (!param.get("page")) {
//       return (
//         <div>
//           <h1
//             style={{
//               justifyContent: "center",
//             }}
//           >
//             Welcome Executive
//           </h1>
//         </div>
//       );
//     }
//     if (param.get("page") === `ViewallBookings/${hotel.id}`) {
//       return (
//         <div>

//         </div>
//       );
//     }

//     if (param.get("page") === "addroom") {
//       return (
//         <div>
//           <AddRoomDetails hotelId={hotel.id} />
//         </div>
//       );
//     }

//     if (param.get("page") === `viewrooms/${hotel.id}`) {
//       return (
//         <div>
//           <ViewRooms hotelId={hotel.id} />
//         </div>
//       );
//     }
//   };
//     return(
//         <div>

//         </div>
//     )
//     }
//     export default  ExecutiveDashboard;
