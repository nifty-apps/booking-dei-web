import { DatePicker, Form, Input, Modal, Select, Space } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { BookingDetails } from "../pages/NewBooking/NewBooking";
import { RootState } from "../store";

const { TextArea } = Input;

interface BookingSummaryProps {
  roomBookings: BookingDetails["roomBookings"];
}

const BookingSummary = ({ roomBookings }: BookingSummaryProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const roomBookingInfo = roomBookings?.map((roomBooking) => {
    return (
      <div className="flex justify-between text-md" key={roomBooking.checkIn}>
        <div className="flex items-center">
          <div className="font-semibold">
            {roomBooking.type}
            {/* {`${roomBooking.room?.type?.title} - ${roomBooking.room?.number}`} */}
            <span className="text-xs">
              {roomBooking.extraBed && " + Extra Bed"}
            </span>
            <span className="text-xs">
              {roomBooking.extraBreakfast && " + Extra Breakfast"}
            </span>
          </div>
        </div>
        <div className="font-semibold">{roomBooking.rent}</div>
      </div>
    );
  });

  // Calculate the total rent for all room bookings
  const totalBookingRent = roomBookings?.reduce(
    (total, roomBooking) => total + (roomBooking?.rent ?? 0),
    0
  );

  // discount
  const discount = roomBookings?.reduce(
    (total, room) => total + (room?.discount ?? 0),
    0
  );

  return (
    <>
      {user?.type === "ADMIN" ? (
        <div className="col-span-4 bg-gray-200 p-4 rounded-sm">
          <h3 className="text-lg capitalize font-semibold mb-5">
            Booking Summary
          </h3>

          {...roomBookingInfo}

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
            {/* payments */}
            <h1 className="font-semibold text-xl text-black mb-4 capitalize">
              Transactions
            </h1>
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

          {/* payment btn  */}
          <div className="mt-16" onClick={() => setIsModalOpen(true)}>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md w-full mb-2 font-semibold flex items-center justify-center gap-2">
              <span>
                <FaPlus />
              </span>
              New Transaction
            </button>
          </div>
        </div>
      ) : (
        <div className="col-span-4 bg-gray-200 p-4 rounded-sm">
          <h3 className="text-lg capitalize font-semibold mb-5">
            Booking Summary
          </h3>

          <div className="my-12">
            {/* payments */}
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

          {/* payment btn  */}
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

      {/* modal for payment status */}
      <Modal
        title="Transaction"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          onValuesChange={(changedValues) => {
            console.log(changedValues);
          }}
        >
          <Space direction="vertical" className="w-full">
            <h3>Date</h3>
            <Form.Item name="date" className="mb-0">
              <DatePicker className="w-full" />
            </Form.Item>

            <div className="flex items-center justify-between gap-4">
              <Space direction="vertical" className="w-full">
                <h3>Category</h3>
                <Form.Item name="category" className="mb-0">
                  <Select
                    placeholder="Select category"
                    options={[
                      { value: "INCOME", label: "Income" },
                      { value: "EXPENSE", label: "Expense" },
                    ]}
                  />
                </Form.Item>
              </Space>

              <Space direction="vertical" className="w-full">
                <h3>Sub-Category</h3>
                <Form.Item name="subCategory" className="mb-0">
                  <Select
                    placeholder="Select sub-category"
                    options={[
                      { value: "SALARY", label: "Salary" },
                      { value: "ELECTRICITY", label: "Electricity" },
                      { value: "WATER", label: "Water" },
                      { value: "RENT", label: "Rent" },
                      { value: "OTHEREXPENSE", label: "Other Expense" },
                      { value: "ROOMRENT", label: "Room Rent" },
                    ]}
                  />
                </Form.Item>
              </Space>
            </div>

            <h3>Payment Method</h3>
            <Form.Item name="paymentMethod" className="mb-0">
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
            <TextArea
              name="description"
              placeholder="Enter description"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />

            <h3>Amount</h3>
            <Input placeholder="Amount" name="amount" />
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
