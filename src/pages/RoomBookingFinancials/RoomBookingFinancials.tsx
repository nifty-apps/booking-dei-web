import { useQuery } from "@apollo/client";
import { DatePicker, Input, Table } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TitleText from "../../components/Title";
import { GET_ROOM_BOOKING_FINANCIALS } from "../../graphql/queries/roomBookingFinancialQueries";
import { RootState } from "../../store";

const RoomBookingFinancials = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data, loading, error } = useQuery(GET_ROOM_BOOKING_FINANCIALS, {
    variables: {
      hotel: user?.hotels[0] || "",
      startDate: selectedDate,
      endDate: selectedDate,
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
      title: "BOOKING AMOUNT",
      dataIndex: "bookingAmount",
      key: "bookingAmount",
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

  console.log(searchText);

  const dataSource = data?.roomBookingFinancials
    .filter((transaction) => transaction?.roombookings?.length > 0) // Filter out items with an empty roombookings array
    .map((transaction) => ({
      key: transaction._id,
      roomNumber: transaction.number,
      contact: transaction.roombookings[0]?.bookingCustomer,
      bookingAmount: transaction?.type?.rent,
      paidAmount: transaction?.roombookings[0]?.bookingPayment,
      dueAmount: transaction?.roombookings[0]?.bookingDue,
      action: transaction?.roombookings[0]?.booking,
    }));

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
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
        <DatePicker
          allowClear={true}
          placeholder="Select Date"
          onChange={(_, date) => setSelectedDate(new Date(date))}
        />
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default RoomBookingFinancials;
