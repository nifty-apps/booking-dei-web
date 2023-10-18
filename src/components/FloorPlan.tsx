import { useQuery } from "@apollo/client";
import { Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import classNames from "classnames";
import { format } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  RoomBookingDetails,
  RoomBookingStatus,
} from "../graphql/__generated__/graphql";
import { GET_ROOMS_BY_FLOOR } from "../graphql/queries/roomQueries";
import { RootState } from "../store";
import PaymentStatus from "./PaymentStatus";

export type Room = {
  _id: string;
  number: string;
  type: {
    title: string;
    rent: number;
  };
  roombookings: RoomBookingDetails[];
};

interface FloorPlanProps {
  selectedRooms?: Room[];
  onSelectionChange: (rooms: Room[]) => void;
  startDate: Date;
  endDate: Date;
}

const columns: ColumnsType<RoomBookingDetails> = [
  {
    title: "Booking ID",
    dataIndex: "booking",
    render: (booking) => (
      <Link to={`/booking-details/${booking}`}>{booking}</Link>
    ),
  },
  {
    title: "Customer Name",
    dataIndex: "bookingCustomer",
    render: (bookingCustomer) => <p>{bookingCustomer}</p>,
  },
  { title: "Rent", dataIndex: "rent" },
  {
    title: "Check In",
    dataIndex: "checkIn",
    render: (date) => format(new Date(date), "dd/MM/yyyy"),
  },
  {
    title: "Check Out",
    dataIndex: "checkOut",
    render: (date) => format(new Date(date), "dd/MM/yyyy"),
  },
  { title: "Status", dataIndex: "status" },
];

const FloorPlan = ({
  selectedRooms = [],
  onSelectionChange: setSelectedRooms,
  startDate,
  endDate,
}: FloorPlanProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [detailsModalInfo, setDetailsModalInfo] = useState<{
    room: Room | null;
    open: boolean;
  }>({
    room: null,
    open: false,
  });

  const { data, loading, error } = useQuery(GET_ROOMS_BY_FLOOR, {
    variables: {
      hotel: user?.hotels[0] || "",
      startDate,
      endDate,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handleRoomClick = (room: Room) => {
    if (room.roombookings.length > 0) {
      return setDetailsModalInfo({
        room,
        open: true,
      });
    }
    if (room.number !== "Lift" && room.number !== "Staff") {
      if (selectedRooms.includes(room)) {
        setSelectedRooms(selectedRooms.filter((r) => r !== room));
      } else {
        setSelectedRooms([...selectedRooms, room]);
      }
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
              <div className="grid grid-cols-2 gap-2">
                {floorDetails.rooms.map((room) => {
                  const { _id, number, type, roombookings } = room;

                  let status = "AVAILABLE";
                  let bgClass;

                  if (roombookings.length > 0) {
                    if (
                      roombookings.some(
                        (booking) =>
                          booking.status === RoomBookingStatus.Checkedin
                      )
                    ) {
                      status = RoomBookingStatus.Checkedin;
                    } else if (
                      roombookings.some(
                        (booking) =>
                          booking.status === RoomBookingStatus.Checkedout
                      )
                    ) {
                      status = RoomBookingStatus.Checkedout;
                    } else {
                      status = RoomBookingStatus.Booked;
                    }
                  }

                  if (status === RoomBookingStatus.Booked) {
                    bgClass = classNames({
                      "bg-yellow-100": true,
                      "bg-yellow-600 text-white": selectedRooms.includes(room),
                      "cursor-pointer":
                        room.number !== "Lift" && room.number !== "Staff",
                      "cursor-not-allowed bg-gray-100":
                        room.number === "Lift" || room.number === "Staff",
                    });
                  } else if (status === RoomBookingStatus.Checkedin) {
                    bgClass = classNames({
                      "bg-blue-100": true,
                      "bg-blue-600 text-white": selectedRooms.includes(room),
                      "cursor-pointer":
                        room.number !== "Lift" && room.number !== "Staff",
                      "cursor-not-allowed bg-gray-100":
                        room.number === "Lift" || room.number === "Staff",
                    });
                  } else if (status === RoomBookingStatus.Checkedout) {
                    bgClass = classNames({
                      "bg-red-100": true,
                      "bg-red-600 text-white": selectedRooms.includes(room),
                      "cursor-pointer":
                        room.number !== "Lift" && room.number !== "Staff",
                      "cursor-not-allowed bg-gray-100":
                        room.number === "Lift" || room.number === "Staff",
                    });
                  } else {
                    bgClass = classNames({
                      "bg-white": false,
                      "bg-blue-700 text-white": selectedRooms.includes(room),
                      "cursor-pointer":
                        room.number !== "Lift" && room.number !== "Staff",
                      "cursor-not-allowed bg-gray-100":
                        room.number === "Lift" || room.number === "Staff",
                    });
                  }

                  return (
                    <div key={_id}>
                      <div
                        className={`min-h-[7.5rem] w-full relative rounded-lg shadow-sm p-2 border border-gray-500 text-center cursor-pointer flex flex-col justify-center ${bgClass}`}
                        onClick={() => handleRoomClick(room)}
                        title={
                          roombookings?.length > 0
                            ? `Booked by ${roombookings
                                ?.map(
                                  (bookedRoom) => bookedRoom?.bookingCustomer
                                )
                                .join(", ")}`
                            : ""
                        }
                      >
                        {/* payment status */}
                        {roombookings.map((bookingInfo) => {
                          return (
                            <PaymentStatus bookingId={bookingInfo.booking} />
                          );
                        })}

                        <h4 className="font-bold text-lg pt-3">{number}</h4>
                        {number !== "Lift" && number !== "Staff" && (
                          <span>{type.title}</span>
                        )}
                      </div>
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

          <div className="w-5 h-5 rounded-full bg-yellow-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Booked</span>

          <div className="w-5 h-5 rounded-full bg-blue-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Check In</span>

          <div className="w-5 h-5 rounded-full bg-red-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Check Out</span>

          <div className="w-5 h-5 rounded-full bg-orange-100  border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Partial Payment</span>

          <div className="w-5 h-5 rounded-full bg-red-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Unavailable</span>
        </div>
      </div>

      {/* modal for booking details */}
      <Modal
        title={<h2 className="text-xl capitalize">Room booking overview</h2>}
        open={detailsModalInfo.open}
        onCancel={() =>
          setDetailsModalInfo({
            room: null,
            open: false,
          })
        }
        width={800}
        footer={null}
      >
        <div className="my-4">
          <p>
            <span className="font-semibold">Room Type : </span>
            {detailsModalInfo.room?.type?.title}
          </p>
          <p>
            <span className="font-semibold">Room Number :</span>
            {detailsModalInfo.room?.number}
          </p>
        </div>

        {/* table */}
        <Table
          columns={columns}
          dataSource={detailsModalInfo.room?.roombookings}
        />
      </Modal>
    </>
  );
};

export default FloorPlan;
