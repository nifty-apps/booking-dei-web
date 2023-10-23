import { useMutation, useQuery } from "@apollo/client";
import { Select, Table, message } from "antd";
import { format } from "date-fns"; // Import date-fns for date formatting
import { useEffect, useState } from "react";
import { FaEllipsisVertical, FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AdditionalGuests from "../../components/AdditionalGuests";
import BookingSummary from "../../components/BookingSummary";
import GuestDetailsInfo from "../../components/GuestDetailsInfo";
import RoomOptionsModal from "../../components/RoomOptionsModal";
import TitleText from "../../components/Title";
import {
  CreateBookingInput,
  PaymentStatus,
  RoomBookingInput,
  RoomBookingStatus,
  UpdateBookingInput,
} from "../../graphql/__generated__/graphql";
import {
  REMOVE_ROOM_BOOKING,
  UPDATE_BOOKING,
  UPDATE_ROOM_BOOKING,
} from "../../graphql/mutations/bookingMutations";
import {
  GET_BOOKING,
  GET_CONTACT,
} from "../../graphql/queries/bookingDetailsQueries";
import { GET_ROOM_BOOKING } from "../../graphql/queries/roomBookingQueries";
import { GET_ROOMS_BY_FLOOR } from "../../graphql/queries/roomQueries";
import { RootState } from "../../store";

interface RoomBooking {
  _id: string;
  checkIn: string;
  checkOut: string;
  room: {
    _id: string;
    number: string;
    type: {
      title: string;
      rent: number;
    };
  };
  status: string;
}
[];

export interface RoomBookingInfo extends CreateBookingInput {
  roomBookings: (RoomBookingInput & {
    _id: string;
    room: {
      _id: string;
      number: string;
      type: {
        _id: string;
        title: string;
        rent: number;
      };
    };
  })[];
}

const EditRoomBooking = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [updateBooking] = useMutation(UPDATE_BOOKING, {
    refetchQueries: [GET_ROOMS_BY_FLOOR, GET_ROOM_BOOKING],
  });
  const [updateRoomBooking] = useMutation(UPDATE_ROOM_BOOKING, {
    refetchQueries: [GET_ROOMS_BY_FLOOR, GET_ROOM_BOOKING],
  });
  const [removeRoomBooking] = useMutation(REMOVE_ROOM_BOOKING, {
    refetchQueries: [GET_ROOM_BOOKING],
  });

  const [extraOptions, setExtraOptions] = useState<{
    roomBooking?: RoomBookingInput;
    showModal: boolean;
  }>({
    showModal: false,
  });

  const { bookingId } = useParams();

  const [bookingDetails, setBookingDetails] = useState<RoomBookingInfo>({
    roomBookings: [],
    customer: "",
    hotel: user?.hotels[0] || "",
    paymentStatus: PaymentStatus.Unpaid,
  });

  const { data: { roomBookings } = { roomBookings: [] as RoomBooking[] } } =
    useQuery(GET_ROOM_BOOKING, {
      variables: {
        roomBookingFilter: {
          hotel: user?.hotels[0] || "",
          booking: bookingId,
        },
      },
    });

  const { data: bookingInfo } = useQuery(GET_BOOKING, {
    variables: {
      id: bookingId || "",
    },
  });

  const contactId = bookingInfo?.booking?.customer || "";

  const { data: contactInfo } = useQuery(GET_CONTACT, {
    variables: {
      id: contactId,
    },
  });

  // delete room booking
  const deleteRoomBooking = async (roomId: string) => {
    try {
      const { data } = await removeRoomBooking({
        variables: { id: roomId },
      });

      if (data) {
        message.success("Room booking deleted successfully!");
      }
    } catch (error) {
      message.error("Oops! Something went wrong.");
    }
  };

  const columns = [
    {
      title: "Check In",
      dataIndex: "checkin",
      key: "checkin",
    },
    {
      title: "Check Out",
      dataIndex: "checkout",
      key: "checkout",
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      key: "room",
    },
    {
      title: "Room No",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      dataIndex: "key",
      render: (roomId: string) => (
        <div className="flex items-center gap-4 text-lg">
          {user?.type === "ADMIN" && (
            <>
              <button
                onClick={() =>
                  setExtraOptions({
                    showModal: true,
                    roomBooking: bookingDetails.roomBookings.find(
                      (room) => room.room === roomId
                    ),
                  })
                }
              >
                <FaEllipsisVertical />
              </button>
              <button
                onClick={() =>
                  deleteRoomBooking(
                    bookingDetails.roomBookings.find(
                      (room) => room.room === roomId
                    )?._id || ""
                  )
                }
              >
                <FaXmark />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  const dataSource = roomBookings.map((roomBooking) => ({
    key: roomBooking.room,
    checkin: format(new Date(roomBooking.checkIn), "yyyy-MM-dd"),
    checkout: format(new Date(roomBooking.checkOut), "yyyy-MM-dd"),
    roomType: roomBooking.room.type.title,
    roomNo: roomBooking.room.number,
    status: (
      <div className="flex">
        <Select
          defaultValue={roomBooking.status as RoomBookingStatus}
          className="w-40"
          options={[
            { value: RoomBookingStatus.Booked, label: "Booked" },
            { value: RoomBookingStatus.Checkedin, label: "Check In" },
            { value: RoomBookingStatus.Checkedout, label: "Check Out" },
          ]}
          onChange={(value) =>
            setBookingDetails({
              ...bookingDetails,
              roomBookings: bookingDetails.roomBookings.map((booking) =>
                booking.room === roomBooking.room
                  ? { ...booking, status: value }
                  : booking
              ),
            })
          }
        />
      </div>
    ),
  }));

  // Update booking
  const handleUpdateBooking = async () => {
    let successMessageDisplayed = false;

    try {
      const updateBookingInput: UpdateBookingInput = {
        _id: bookingId,
        customer: bookingDetails.customer,
        hotel: bookingDetails.hotel,
        paymentStatus: bookingDetails.paymentStatus,
      };

      if (!bookingDetails.customer) {
        delete updateBookingInput.customer;
      }

      await updateBooking({ variables: { updateBookingInput } });

      for (const roomBooking of bookingDetails.roomBookings) {
        const res = await updateRoomBooking({
          variables: {
            updateRoomBookingInput: {
              _id: roomBooking._id,
              room: roomBooking.room._id,
              checkIn: roomBooking.checkIn,
              checkOut: roomBooking.checkOut,
              rent: roomBooking.room.type.rent,
              discount: roomBooking.discount,
              extraBed: roomBooking.extraBed,
              extraBreakfast: roomBooking.extraBreakfast,
              booking: bookingId,
              hotel: bookingDetails.hotel,
              status: roomBooking.status,
            },
          },
        });

        if (res.data && !successMessageDisplayed) {
          message.success("Booking updated successfully!");
          successMessageDisplayed = true;
        }
      }
    } catch (error) {
      message.error("Oops! Edit booking not working.");
    }
  };

  useEffect(() => {
    setBookingDetails((booking) => ({
      ...booking,
      roomBookings: roomBookings as [],
    }));
  }, [roomBookings]);

  return (
    <>
      <div
        className={`flex items-center justify-between ${
          bookingId && "justify-between"
        }`}
      >
        {location.pathname === `/edit-booking/${bookingId}` && (
          <>
            <TitleText text="Edit Booking" />
            <button
              className="text-white py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2  bg-blue-900 px-20 hover:text-white"
              onClick={() => handleUpdateBooking()}
            >
              Update Booking
            </button>
          </>
        )}
      </div>
      <div className="grid grid-cols-12 mt-5">
        <div className="col-span-8 bg-white shadow-sm p-5 mr-4">
          {/* room details */}
          <h1 className="font-semibold text-xl text-gray-500 mb-4 capitalize">
            Room Details
          </h1>
          <Table
            dataSource={dataSource}
            columns={columns}
            size="small"
            pagination={false}
          />
          {/* guest details part */}
          <GuestDetailsInfo
            onSelect={(contact) => {
              setBookingDetails({
                ...bookingDetails,
                customer: contact._id,
              });
            }}
            contactInfo={contactInfo?.contact}
            isDetails={true}
            isEditing={true}
          />
          {/* Additional guests */}
          <AdditionalGuests />
        </div>

        {/* booking summary || Payment flow */}
        <BookingSummary
          roomBookings={bookingDetails.roomBookings}
          bookingId={bookingId || ""}
          contactId={contactId}
        />
      </div>

      {/* Room  options modal */}
      <RoomOptionsModal
        options={extraOptions}
        onOk={(options) => {
          setExtraOptions({ showModal: false });
          if (!options.roomBooking) return;
          setBookingDetails({
            ...bookingDetails,
            roomBookings: bookingDetails.roomBookings.map((roomBooking) =>
              roomBooking.room === options.roomBooking?.room
                ? options.roomBooking
                : roomBooking
            ) as [],
          });
        }}
      />
    </>
  );
};

export default EditRoomBooking;
