import { useQuery } from "@apollo/client";
import { DatePicker, Input, Table } from "antd";
import { Link } from "react-router-dom";
import { GET_TRANSACTIONS } from "../../graphql/queries/transactionsQueries";

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
    dataIndex: "amount",
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
      <Link to={`/booking-details/${bookingId}`}>Booking Details</Link>
    ),
  },
];

const Transactions = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const onChange = () => {
    console.log("something changed");
  };

  const onOk = () => {
    console.log("ok");
  };

  const searchInput = () => {
    console.log("searching");
  };

  const dataSource = data?.transactions.map((transaction) => ({
    key: transaction.booking,
    contact: transaction.contact.name,
    amount: transaction.amount,
  }));

  return (
    <>
      <div className="flex align-middle justify-between mb-3">
        <div className="w-3/12">
          <Input
            placeholder="Search here.."
            allowClear
            size="middle"
            onChange={searchInput}
          />
        </div>

        <DatePicker showTime onChange={onChange} onOk={onOk} />
      </div>
      {/* Transaction table */}
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default Transactions;
