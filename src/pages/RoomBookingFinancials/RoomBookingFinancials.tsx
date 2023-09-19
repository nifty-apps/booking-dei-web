import { useQuery } from "@apollo/client";
import { DatePicker, Input, Table } from "antd";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TitleText from "../../components/Title";
import { GET_ROOM_BOOKING_FINANCIALS } from "../../graphql/queries/roomBookingFinancialQueries";
import { RootState } from "../../store";

const RoomBookingFinancials = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { data, loading, error } = useQuery(GET_ROOM_BOOKING_FINANCIALS, {
    variables: {
      hotel: user?.hotels[0] || "",
      startDate: "2023-08-10",
      endDate: "2023-08-13",
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occured - {error.message}</p>;

  const columns = [
    {
      title: "ROOM NUMBER",
      dataIndex: "roomNumber",
      key: "roomNumber",
    },
    {
      title: "CONTACT",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "RENT AMOUNT",
      dataIndex: "rentAmount",
      key: "rentAmount",
    },
    {
      title: "PAID AMOUNT",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
    {
      title: "DUE AMOUNT",
      dataIndex: "dueAmount",
      key: "dueAmount",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: (bookingId: string) => (
        <Link to={`/booking-details/${bookingId}`} className="text-blue-600">
          Booking Details
        </Link>
      ),
    },
  ];

  const dataSource = data?.roomBookingFinancials.map((transaction) => ({
    key: transaction._id,
    roomNumber: transaction.number,
    contact: transaction?.roombookings.map(
      (contact) => contact?.bookingCustomer
    ),
    rentAmount: transaction?.type.rent,
    paidAmount: transaction?.roombookings.map(
      (amount) => amount?.bookingPayment
    ),
    dueAmount: transaction?.roombookings.map((due) => due?.bookingDue),
    action: transaction?.roombookings.map((bookingId) => bookingId?.booking),
  }));

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <>
      <div className="mb-5">
        <TitleText text="Rooms Overview" />
      </div>
      <div className="flex align-middle justify-between mb-3">
        <div className="w-3/12">
          <Input
            placeholder="Search here.."
            allowClear
            size="middle"
            onChange={handleSearchChange}
          />
        </div>
        <DatePicker placeholder="Select Date" />
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default RoomBookingFinancials;
