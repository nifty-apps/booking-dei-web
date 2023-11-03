import { useMutation } from "@apollo/client";
import { DatePicker, Modal, Select, Table, message } from "antd";
import dayjs from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaEllipsisVertical, FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdditionalGuests from "../../components/AdditionalGuests";
import BookingSummary from "../../components/BookingSummary";
import FloorPlan, { Room } from "../../components/FloorPlan";
import GuestDetailsInfo from "../../components/GuestDetailsInfo";
import RemainingRooms from "../../components/RemainingRooms";
import RoomOptionsModal from "../../components/RoomOptionsModal";
import TitleText from "../../components/Title";
import {
  CreateBookingInput,
  PaymentStatus,
  RoomBookingInput,
  RoomBookingStatus,
} from "../../graphql/__generated__/graphql";
import { CREATE_BOOKING } from "../../graphql/mutations/bookingMutations";
import { GET_ROOMS_BY_FLOOR } from "../../graphql/queries/roomQueries";
import { RootState } from "../../store";

export interface BookingDetails extends CreateBookingInput {
  roomBookings: (RoomBookingInput & {
    type?: string;
    room?: {
      type?: {
        title?: string;
        rent?: number;
      };
    };
  })[];
}

const NewBooking = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [bookingId, setCreateBookingId] = useState<string | null>(null);
  const [contactId, setContactId] = useState<string | null>(null);
  const [guests, setGuests] = useState([{ name: "", phone: "" }]);

  //  Remove guest
  const removeGuest = (index: number) => {
    setGuests((prevGuests) => {
      const updatedGuests = [...prevGuests];
      updatedGuests.splice(index, 1);
      return updatedGuests;
    });
  };

  // create booking API call
  const [createBooking] = useMutation(CREATE_BOOKING, {
    refetchQueries: [GET_ROOMS_BY_FLOOR],
  });

  const navigate = useNavigate();

  const [selectedDateRange, setSelectedDateRange] = useState<
    RangeValue<dayjs.Dayjs>
  >([dayjs().startOf("day"), dayjs().add(1, "day").startOf("day")]);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [selectedRoomsByDate, setSelectedRoomsByDate] = useState<
    {
      dateRange: RangeValue<dayjs.Dayjs>;
      rooms: Room[];
    }[]
  >([]);
  const [extraOptions, setExtraOptions] = useState<{
    roomBooking?: RoomBookingInput;
    showModal: boolean;
  }>({
    showModal: false,
  });

  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    roomBookings: [],
    customer: "",
    hotel: user?.hotels[0] || "",
    paymentStatus: PaymentStatus.Unpaid,
  });

  // table columns
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
      title: "Action",
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
                onClick={() => {
                  setSelectedRoomsByDate(
                    selectedRoomsByDate.map((roomByDate) => ({
                      ...roomByDate,
                      rooms: roomByDate.rooms.filter(
                        (room) => room._id !== roomId
                      ),
                    }))
                  );
                  setBookingDetails({
                    ...bookingDetails,
                    roomBookings: bookingDetails.roomBookings.filter(
                      (roomBooking) => roomBooking.room !== roomId
                    ),
                  });
                }}
              >
                <FaXmark />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  // table data source
  const dataSource = bookingDetails.roomBookings.map((roomBooking) => ({
    key: roomBooking.room,
    checkin: dayjs(roomBooking?.checkIn).format("YYYY-MM-DD"),
    checkout: dayjs(roomBooking?.checkOut).format("YYYY-MM-DD"),
    roomType: selectedRoomsByDate
      .find((roomByDate) =>
        roomByDate.rooms.find((room) => room._id === roomBooking.room)
      )
      ?.rooms.find((room) => room._id === roomBooking.room)?.type?.title,
    roomNo: selectedRoomsByDate
      .find((roomByDate) =>
        roomByDate.rooms.find((room) => room._id === roomBooking.room)
      )
      ?.rooms.find((room) => room._id === roomBooking.room)?.number,
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

  const handleCreateBooking = async () => {
    try {
      const res = await createBooking({
        variables: {
          createBookingInput: {
            ...bookingDetails,
            roomBookings: bookingDetails.roomBookings.map((roomBooking) => ({
              ...roomBooking,
              type: undefined,
            })),
            guests: guests.map((guest) => ({
              ...guest,
              _id: undefined,
            })),
          },
        },
      });

      if (res.data?.createBooking?._id) {
        message.success("Yay! Your new booking was added successfully.");
        navigate({
          pathname: `/booking-details/${res.data?.createBooking?._id}`,
        });
        setCreateBookingId(res.data?.createBooking?._id);
        setContactId(res.data?.createBooking?.customer);
      }
    } catch (error) {
      message.error("Oops! Something went wrong.");
    }
  };

  useEffect(() => {
    const newRoomBookings = selectedRoomsByDate.flatMap((roomByDate) =>
      roomByDate.rooms.map((room) => ({
        checkIn: roomByDate.dateRange?.[0]?.toDate() as Date,
        checkOut: roomByDate.dateRange?.[1]?.toDate() as Date,
        room: room._id,
        type: room.type.title,
        extraBed: false,
        extraBreakfast: false,
        discount: 0,
        rent: room.type.rent,
        status: RoomBookingStatus.Booked,
      }))
    );

    const filteredNewRoomBookings = newRoomBookings.filter(
      (roomBooking) =>
        !bookingDetails.roomBookings.some(
          (existingBooking) => existingBooking.room === roomBooking.room
        )
    );

    if (filteredNewRoomBookings.length > 0) {
      setBookingDetails((prevBookingDetails) => ({
        ...prevBookingDetails,
        roomBookings: [
          ...prevBookingDetails.roomBookings,
          ...filteredNewRoomBookings,
        ],
      }));
    }
  }, [selectedRoomsByDate, bookingDetails]);

  return (
    <>
      <div className="flex items-center justify-between">
        {/* edit booking title */}
        {location.pathname === "/new-booking" && (
          <TitleText text="New Booking" />
        )}

        {location.pathname === "/edit-booking/:id" && (
          <TitleText text="Edit Booking" />
        )}

        {/* new booking btn top */}
        <div className="flex items-center gap-4">
          <button className="text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-900 hover:bg-blue-900 hover:text-white">
            Reset
          </button>
          <button
            type="submit"
            className="text-white px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2  bg-blue-900 w-full"
            onClick={() => handleCreateBooking()}
          >
            Confirm Booking
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-5">
        <div className="col-span-8 bg-white shadow-sm p-5 mr-4">
          {/* room details */}
          <h1 className="font-semibold text-xl text-gray-500 mb-4 capitalize">
            Room details
          </h1>
          {bookingDetails.roomBookings.length !== 0 && (
            <Table
              dataSource={dataSource}
              columns={columns}
              size="small"
              pagination={false}
            />
          )}

          {/* add room button */}
          <div
            className="w-28 capitalize border border-blue-700 rounded-sm text-blue-700 px-2 py-1 mt-2"
            onClick={() => setShowFloorPlan(true)}
          >
            <button className="flex items-center gap-2">
              <span>
                <FaPlus />
              </span>
              <span className="font-semibold"> Add Room </span>
            </button>
          </div>

          {/* guest details part */}
          <GuestDetailsInfo
            onSelect={(contact) => {
              setBookingDetails({
                ...bookingDetails,
                customer: contact._id,
              });
            }}
            isDetails={false}
            isEditing={false}
          />

          {/* Additional Guest details info */}
          <AdditionalGuests
            guests={guests}
            setGuests={setGuests}
            removeGuest={removeGuest}
          />
        </div>
        {/* booking summary || Payment flow */}
        <BookingSummary
          roomBookings={bookingDetails.roomBookings}
          bookingId={bookingId}
          contactId={contactId}
        />
      </div>

      {/* modal for room select */}
      <Modal
        open={showFloorPlan}
        onOk={() => setShowFloorPlan(false)}
        onCancel={() => setShowFloorPlan(false)}
        cancelText="Cancel"
        okText="Apply"
        width={1400}
        okButtonProps={{
          className: "bg-blue-600",
        }}
      >
        <div className="flex justify-around">
          <h3 className="font-semibold">Select Date : </h3>
          <DatePicker.RangePicker
            allowClear={true}
            format="YYYY-MM-DD"
            value={selectedDateRange}
            onChange={(value) => setSelectedDateRange(value)}
          />
          <span>
            Start Date:
            {selectedDateRange && selectedDateRange[0]?.format("DD/MM/YYYY")} -
            End Date:
            {selectedDateRange && selectedDateRange[1]?.format("DD/MM/YYYY")}
          </span>
        </div>
        {/* floor plan */}
        <div className="flex gap-2">
          <FloorPlan
            startDate={selectedDateRange?.[0]?.toDate() as Date}
            endDate={selectedDateRange?.[1]?.toDate() as Date}
            selectedRooms={
              selectedRoomsByDate.find(
                (room) =>
                  dayjs(room.dateRange?.[0]).isSame(
                    selectedDateRange?.[0],
                    "date"
                  ) &&
                  dayjs(room.dateRange?.[1]).isSame(
                    selectedDateRange?.[1],
                    "date"
                  )
              )?.rooms || []
            }
            onSelectionChange={(rooms) => {
              setSelectedRoomsByDate([
                ...selectedRoomsByDate.filter(
                  (room) =>
                    !dayjs(room.dateRange?.[0]).isSame(
                      selectedDateRange?.[0],
                      "date"
                    ) &&
                    !dayjs(room.dateRange?.[1]).isSame(
                      selectedDateRange?.[1],
                      "date"
                    )
                ),
                {
                  dateRange: selectedDateRange,
                  rooms,
                },
              ]);
            }}
          />

          <RemainingRooms
            startDate={selectedDateRange?.[0]?.toDate() as Date}
            endDate={selectedDateRange?.[1]?.toDate() as Date}
          />
        </div>
      </Modal>
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
            ),
          });
        }}
      />
    </>
  );
};

export default NewBooking;
