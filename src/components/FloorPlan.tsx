import { useQuery } from "@apollo/client";
import { Modal } from "antd";
import classNames from "classnames";
import { useState } from "react";
import {
  RoomBookingDetails,
  RoomBookingStatus,
} from "../graphql/__generated__/graphql";
import { GET_ROOMS_BY_FLOOR } from "../graphql/queries/roomQueries";

export type Room = {
  _id: string;
  number: string;
  type: {
    title: string;
    rent: number;
  };
  bookings: RoomBookingDetails[];
};

interface FloorPlanProps {
  selectedRooms?: Room[];
  onSelectionChange: (rooms: Room[]) => void;
  startDate: Date;
  endDate: Date;
}

const FloorPlan = ({
  selectedRooms = [],
  onSelectionChange: setSelectedRooms,
  startDate,
  endDate,
}: FloorPlanProps) => {
  const [open, setOpen] = useState(false);

  const { data, loading, error } = useQuery(GET_ROOMS_BY_FLOOR, {
    variables: {
      hotel: JSON.parse(localStorage.getItem("user") || "{}").user.hotels[0],
      startDate,
      endDate,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  // modal for booking details
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // toggle room selection
  const toggleRoomSelection = (room: Room) => {
    if (selectedRooms.includes(room)) {
      setSelectedRooms(
        selectedRooms.filter((selectedRoom) => selectedRoom !== room)
      );
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  return (
    <>
      <div className="col-span-9 bg-white p-5 rounded">
        {/* room number part */}
        <div className="grid grid-cols-4 gap-2">
          {data?.roomsByFloor.map((floorDetails) => (
            <div key={floorDetails.floor}>
              <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-500 text-black font-semibold mb-4">
                Floor {floorDetails.floor}
              </div>
              <div className="grid grid-cols-2 gap-2" onClick={showModal}>
                {floorDetails.rooms.map((room) => {
                  const { _id, number, type, bookings } = room;
                  const status =
                    bookings.length > 0
                      ? RoomBookingStatus.Booked
                      : "AVAILABLE";

                  const bgClass = classNames({
                    "bg-red-100": status === RoomBookingStatus.Booked,
                    "bg-blue-600 text-white": selectedRooms.includes(room),
                  });

                  return (
                    <div
                      key={_id}
                      className={`h-28 w-full rounded-lg shadow-sm p-2 border border-gray-500 text-center cursor-pointer flex flex-col justify-center ${bgClass}`}
                      onClick={() => toggleRoomSelection(room)}
                    >
                      <h4 className="font-bold text-lg">{number}</h4>
                      {number !== "Lift" && number !== "Staff" && (
                        <div>
                          <span>{type.title}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {/* rounding circle */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="w-5 h-5 rounded-full bg-white border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Available</span>

          <div className="w-5 h-5 rounded-full bg-blue-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Booked</span>

          <div className="w-5 h-5 rounded-full bg-green-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Check In</span>

          <div className="w-5 h-5 rounded-full bg-gray-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Check Out</span>

          <div className="w-5 h-5 rounded-full bg-orange-100  border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Partial Payment</span>

          <div className="w-5 h-5 rounded-full bg-red-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Unavailable</span>
        </div>
      </div>

      {/* modal for booking details */}
      <Modal
        title="Booking Details"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>modal content here to show</div>
      </Modal>
    </>
  );
};

export default FloorPlan;
