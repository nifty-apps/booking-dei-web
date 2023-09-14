import { useMutation, useQuery } from "@apollo/client";
import { Button, Select, Table, message } from "antd";
import { format } from "date-fns"; // Import date-fns for date formatting
import { useEffect, useState } from "react";
import { FaEllipsisVertical, FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookingSummary from "../../components/BookingSummary";
import GuestDetailsInfo from "../../components/GuestDetailsInfo";
import RoomOptionsModal from "../../components/RoomOptionsModal";
import TitleText from "../../components/Title";
import {
  CreateBookingInput,
  PaymentStatus,
  RoomBookingInput,
  RoomBookingStatus,
} from "../../graphql/__generated__/graphql";
import {
  UPDATE_BOOKING,
  UPDATE_ROOM_BOOKING,
} from "../../graphql/mutations/bookingMutations";
import {
  GET_BOOKING,
  GET_CONTACT,
} from "../../graphql/queries/bookingDetailsQueries";
import { GET_ROOM_BOOKING } from "../../graphql/queries/roomBookingQueries";
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
  const [updateBooking] = useMutation(UPDATE_BOOKING);
  const [updateRoomBooking] = useMutation(UPDATE_ROOM_BOOKING);

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
          )}
          <button
            onClick={() =>
              setBookingDetails({
                ...bookingDetails,
                roomBookings: bookingDetails.roomBookings.filter(
                  (room) => room.room !== roomId
                ),
              })
            }
          >
            <FaXmark />
          </button>
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
          defaultValue={RoomBookingStatus.Booked}
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
    try {
      const variables = {
        updateBookingInput: {
          _id: bookingId,
          customer: bookingDetails.customer,
          hotel: bookingDetails.hotel,
          paymentStatus: bookingDetails.paymentStatus,
        },
      };

      await updateBooking({ variables });

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

        if (res?.data && res) {
          message.success("Booking updated successfully");
        }
      }
    } catch (error) {
      message.error("Oops! Something went wrong.");
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
            <Button
              className="text-white  py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2  bg-blue-900 px-20"
              onClick={() => handleUpdateBooking()}
            >
              Edit Booking
            </Button>
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
        </div>
        {/* booking summary || Payment flow */}
        <BookingSummary roomBookings={bookingDetails.roomBookings} />
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
