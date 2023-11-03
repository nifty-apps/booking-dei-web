import { useQuery } from "@apollo/client";
import { GET_USERS_BOOKINGS } from "../graphql/queries/bookingDetailsQueries";
import { ContactFilterInput } from "../graphql/__generated__/graphql";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { guestInfoType } from "../pages/GuestLookUp/GuestLookUp";

interface GuestBookingProps {
  guestInfoState: guestInfoType;
}

const GuestBookingsModal = ({ guestInfoState }: GuestBookingProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: bookingsData,
    loading,
    error,
  } = useQuery(GET_USERS_BOOKINGS, {
    variables: {
      bookingFilter: {
        hotel: user?.hotels[0] || "",
        customer: guestInfoState.id || "",
      } as ContactFilterInput,
    },
  });
  const bookings = bookingsData?.bookings;

  const dataSource = bookings?.map((BookingData) => ({
    key: BookingData?._id,
    number: BookingData?.number,
    paymentStatus: BookingData?.paymentStatus,
  }));

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "key",
      key: "key",
      render: (record: string) => {
        // find clicked guest information
        const guestData = dataSource?.find((data) => data.key === record);
        return (
          <Link
            to={`/booking-details/${guestData?.key}`}
            className="text-blue-500 hover:text-blue-600 hover:underline"
          >
            SB{guestData?.number}
          </Link>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="mb-4 font-semibold">
        <h6>
          Guest Name:
          <span className="font-normal ms-2">{guestInfoState?.name}</span>
        </h6>
        <h6>
          Phone Number:
          <span className="font-normal ms-2">{guestInfoState?.phone}</span>
        </h6>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </>
  );
};

export default GuestBookingsModal;
