import { DatePicker, Input, Table } from "antd";

const dataSource = [
  {
    key: "1",
    roomNumber: "John Doe",
    contact: "34354534653",
    bookingAmount: "2100",
    paidAmount: "500",
    dueAmount: "100",
    actions: "Booking Details",
  },
  {
    key: "2",
    roomNumber: "annur",
    contact: "34354534653",
    bookingAmount: "2100",
    paidAmount: "5000",
    dueAmount: "1000",
    actions: "Booking Details",
  },
  {
    key: "3",
    roomNumber: "jany",
    contact: "34354534653",
    bookingAmount: "2100",
    paidAmount: "500",
    dueAmount: "100",
    actions: "Booking Details",
  },
];

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
    title: "ACTIONS",
    dataIndex: "actions",
    key: "bookingDetails",
  },
];

const Transactions = () => {
  const onChange = () => {
    console.log("somethig change");
  };

  const onOk = () => {
    console.log("ok");
  };

  return (
    <>
      <div className="flex align-middle justify-between mb-3">
        <div className="w-3/12">
          <Input placeholder="Search here.." allowClear size="middle" />
        </div>
        <DatePicker
          showTime
          onChange={onChange}
          onOk={onOk}
          placeholder="Select Date"
        />
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default Transactions;
