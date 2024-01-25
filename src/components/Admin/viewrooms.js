import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BsFillPencilFill } from "react-icons/bs";
import { EditRoom } from "./EditRoom";

export const ViewRooms = ({ hotelId }) => {
  const [roomList, setRoomList] = useState([]);
  const [editRoom, setEditRoom] = useState({});
  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:8083/feelhome/rooms/getByHotel/${hotelId}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((response) => setRoomList(response.data));
  }, [hotelId, token]);
  return (
    <div>
      {editRoom?.id ? (
        <EditRoom roomDetails={editRoom} />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room Type</TableCell>
                <TableCell>Room Price</TableCell>
                <TableCell>Total Number of Rooms</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomList.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.room_type}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.totalRooms}</TableCell>
                  <TableCell>
                    {/* <button>Update</button> */}
                    <span>
                      <BsFillPencilFill
                        className="edit-btn"
                        onClick={() => setEditRoom(row)}
                      />
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
