import { useMutation, useQuery } from "@apollo/client";
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  message,
} from "antd";
import { format } from "date-fns";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  PaymentStatus,
  Transaction,
  TransactionSubCategory,
  TransactionType,
} from "../graphql/__generated__/graphql";
import { UPDATE_BOOKING } from "../graphql/mutations/bookingMutations";
import { CREATE_TRANSACTION } from "../graphql/mutations/transactionMutations";
import { GET_BOOKING } from "../graphql/queries/bookingDetailsQueries";
import {
  GET_TRANSACTIONS,
  GET_TRANSACTION_BY_FILTER,
} from "../graphql/queries/transactionsQueries";
import { BookingDetails } from "../pages/NewBooking/NewBooking";
import { RootState } from "../store";

const { TextArea } = Input;

interface BookingSummaryProps {
  roomBookings: BookingDetails["roomBookings"];
  bookingId: string | null;
  contactId: string | null;
}

interface Column {
  title: string;
  dataIndex: string;
  key: string;
  align?: "left" | "center" | "right";
}

const BookingSummary = ({
  roomBookings,
  bookingId: createBookingId,
  contactId,
}: BookingSummaryProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionInfo, setTransactionInfo] = useState({} as Transaction);

  const [form] = Form.useForm();

  const { bookingId: booking } = useParams();

  const { data: transactionSummary, refetch } = useQuery(
    GET_TRANSACTION_BY_FILTER,
    {
      variables: {
        transactionFilter: {
          hotel: user?.hotels[0] || "",
          booking: booking || "",
        },
      },
    }
  );

  // Create transaction API call
  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [GET_TRANSACTIONS],
  });

  // update booking info
  const [updateBooking] = useMutation(UPDATE_BOOKING, {
    refetchQueries: [GET_BOOKING],
  });

  const roomBookingInfo = roomBookings?.map((roomBooking) => {
    return (
      <div className="flex justify-between text-md" key={roomBooking.checkIn}>
        <div className="flex items-center">
          <div className="font-semibold">
            {roomBooking?.type && roomBooking?.type}
            {roomBooking.room?.type?.title &&
              `${roomBooking.room?.type?.title}`}
            <span className="text-xs">
              {roomBooking.extraBed && " ( Extra Bed"}
            </span>
            <span className="text-xs">
              {roomBooking.extraBreakfast && " + Extra Breakfast )"}
            </span>
          </div>
        </div>
        <div className="font-semibold">{roomBooking.rent}</div>
      </div>
    );
  });

  // Define columns for the transaction table
  const columns: Column[] = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
    },
  ];

  // Prepare data source for the transaction table
  const dataSource = transactionSummary?.transactionByFilter
    .filter((transaction) => transaction?.booking === createBookingId)
    .map((transaction) => {
      return {
        key: transaction?._id,
        date: format(new Date(transaction?.date), "dd-MM-yyyy"),
        description: transaction?.description,
        method: transaction?.method,
        amount: transaction?.amount,
      };
    });

  // Calculate the total rent for all room bookings
  const totalBookingRent = roomBookings?.reduce(
    (total, roomBooking) => total + (roomBooking?.rent ?? 0),
    0
  );

  // Calculate the total discount
  const discount = roomBookings?.reduce(
    (total, room) => total + (room?.discount ?? 0),
    0
  );

  // Calculate the total amount paid from the table data
  const totalAmountPaid = dataSource?.reduce(
    (total, transaction) => total + (transaction?.amount || 0),
    0
  );

  // Calculate the remaining amount based on the grand total and total amount paid
  const remainingAmount =
    (totalBookingRent && discount
      ? totalBookingRent - discount
      : totalBookingRent) - (totalAmountPaid || 0);

  // Function to update payment status based on the total amount paid
  const updatePaymentStatus = async () => {
    try {
      if (typeof totalAmountPaid !== "undefined") {
        if (remainingAmount - totalAmountPaid === 0) {
          await updateBooking({
            variables: {
              updateBookingInput: {
                _id: booking,
                paymentStatus: PaymentStatus.Paid,
              },
            },
          });
        } else if (remainingAmount - totalAmountPaid > 0) {
          await updateBooking({
            variables: {
              updateBookingInput: {
                _id: booking,
                paymentStatus: PaymentStatus.PartialPaid,
              },
            },
          });
        } else {
          await updateBooking({
            variables: {
              updateBookingInput: {
                _id: booking,
                paymentStatus: PaymentStatus.Unpaid,
              },
            },
          });
        }
      } else {
        // Handle the case where totalAmount is undefined
        console.error("totalAmount is undefined");
        // You might want to add some error handling or take appropriate action here.
      }
    } catch (err) {
      message.error("Error updating payment status.");
    }
  };

  // Handle transaction submission
  const onFinish = async (values: Transaction) => {
    try {
      const amount = Number(values.amount);

      // Validate that the amount is not negative
      if (amount < 0) {
        message.error("Amount cannot be negative.");
        return;
      }

      // Validate that the amount is not greater than the remaining amount
      if (amount > remainingAmount) {
        message.error("Amount cannot be greater than the remaining amount.");
        return;
      }

      const res = await createTransaction({
        variables: {
          createTransactionInput: {
            contact: contactId || "",
            booking: createBookingId || null,
            hotel: user?.hotels[0] || "",
            date: values.date,
            category: TransactionType.Income,
            subCategory: TransactionSubCategory.Roomrent,
            method: values.method,
            description: values.description,
            amount: amount,
          },
        },
      });

      if (res?.data?.createTransaction) {
        message.success("Transaction created successfully!");
        form.resetFields();
        setIsModalOpen(false);
        setTransactionInfo(res?.data?.createTransaction as Transaction);
        // Refetch the transaction data to update the table
        refetch();

        // Update payment status when a new transaction is created
        updatePaymentStatus();
      }
    } catch (err) {
      message.error("Something went wrong!");
    }
  };


  return (
    <>
      {user?.type === "ADMIN" ? (
        <div className="col-span-4 bg-gray-200 p-4 rounded-sm">
          <h3 className="text-lg capitalize font-semibold mb-5">
            Booking Summary
          </h3>

          {roomBookingInfo}
          <div className="border border-gray-400 my-2"></div>
          <div className="flex items-center justify-between">
            <p className="font-bold">Subtotal</p>
            <p>{totalBookingRent}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold">Discount</p>
            <p>{discount}</p>
          </div>
          <div className="border border-gray-400 my-2"></div>
          <div className="flex items-center justify-between">
            <p className="font-bold">Grand Total</p>
            <p>
              {totalBookingRent && discount
                ? totalBookingRent - discount
                : totalBookingRent}
            </p>
          </div>
          <p className="text-gray-400 text-xs">
            Inclusive of 15% Value Added Tax (VAT)
          </p>

          <div className="my-12">
            {/* Payments */}
            <h1 className="font-semibold text-xl text-black mb-4 capitalize">
              Transactions
            </h1>
            {/* If transaction is successful */}
            {transactionInfo && booking ? (
              <Table
                className="custom_table"
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            ) : (
              ""
            )}

            <div className="border border-gray-400 my-2"></div>

            <div className="flex items-center justify-between">
              <p className="font-bold">Total Amount Paid</p>
              <p>
                {transactionInfo && booking ? <div>{totalAmountPaid}</div> : 0}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="font-bold">Remaining</p>

              <p>
                {transactionInfo && booking ? (
                  <div>{remainingAmount}</div>
                ) : (
                  <div>
                    {totalBookingRent && discount
                      ? totalBookingRent - discount
                      : totalBookingRent}
                  </div>
                )}
              </p>
            </div>
          </div>
          {/* Payment button */}
          <div className="mt-16" onClick={() => setIsModalOpen(true)}>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md w-full mb-2 font-semibold flex items-center justify-center gap-2">
              <span>
                <FaPlus />
              </span>
              New Transaction
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <div className="text-right text-gray-800 italic">
              Created By: {user?.name} at {format(new Date(), "dd-MM-yyyy")}
              12:00 PM
            </div>
            <div className="text-right text-gray-800 italic">
              Updated By: {user?.name} at {format(new Date(), "dd-MM-yyyy")}
              12:00 PM
            </div>
          </div>
        </div>
      ) : (
        <div className="col-span-4 bg-gray-200 p-4 rounded-sm">
          <h3 className="text-lg capitalize font-semibold mb-5">
            Booking Summary
          </h3>

          <div className="my-12">
            {/* Payments */}
            <div className="border border-gray-400 my-2"></div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Due</p>
              <p>
                {totalBookingRent && discount
                  ? totalBookingRent - discount
                  : totalBookingRent}
              </p>
            </div>
          </div>

          {/* Payment button */}
          <div className="mt-16" onClick={() => setIsModalOpen(true)}>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md w-full mb-2 font-semibold flex items-center justify-center gap-2">
              <span>
                <FaPlus />
              </span>
              New Transaction
            </button>
          </div>
        </div>
      )}

      {/* Modal for payment status */}
      <Modal
        title="Transaction"
        visible={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Space direction="vertical" className="w-full">
            <h3>Date</h3>
            <Form.Item name="date" className="mb-0">
              <DatePicker className="w-full" />
            </Form.Item>

            <h3>Payment Method</h3>
            <Form.Item name="method" className="mb-0">
              <Select
                placeholder="Payment method"
                options={[
                  { value: "CASH", label: "Cash" },
                  { value: "BANK", label: "Bank" },
                  { value: "BKASH", label: "Bkash" },
                ]}
              />
            </Form.Item>

            <h3>Description</h3>
            <Form.Item name="description" className="mb-0">
              <TextArea
                placeholder="Enter description"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>

            <h3>Amount</h3>
            <Form.Item name="amount" className="mb-0">
              <Input placeholder="Amount" autoComplete="off" />
            </Form.Item>
          </Space>

          <div className="flex justify-end">
            <button
              type="submit"
              className=" mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-8 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Confirm
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default BookingSummary;
