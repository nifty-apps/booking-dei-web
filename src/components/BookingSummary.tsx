import { Input, Modal, Radio } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { BookingDetails } from "../pages/NewBooking/NewBooking";
const { TextArea } = Input;

interface BookingSummaryProps {
  bookingDetails: BookingDetails;
}

const BookingSummary = ({ bookingDetails }: BookingSummaryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plainOptions = ["Bank", "Bkash", "Cash"];

  console.log(bookingDetails);

  return (
    <>
      <div className="col-span-3 bg-gray-200 p-4 rounded-sm">
        <h3 className="text-lg capitalize font-semibold mb-5">
          Booking Summary
        </h3>

        {bookingDetails.roomBookings?.map((room, index) => (
         
            <div className="flex justify-between text-md" key={room.checkIn}>
              <div className="flex items-center">
                <span className="mr-2">{index + 1}</span>
                <span className="cursor-pointer">
                  <FaXmark />
                </span>
                <div className="mx-2 font-semibold">{room?.type}</div>
              </div>
              <div className="font-semibold">{room.rent}</div>
            </div>
        ))}

        <div className="border border-gray-400 my-2"></div>
        <div className="flex items-center justify-between">
          <p className="font-bold">Subtotal</p>
          <p>{bookingDetails.totalBookingRent}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-bold">Discount</p>
          <p>{bookingDetails.discount}</p>
        </div>

        <div className="border border-gray-400 my-2"></div>
        <div className="flex items-center justify-between">
          <p className="font-bold">Grand Total</p>
          <p>
            {bookingDetails.totalBookingRent &&
              bookingDetails.totalBookingRent - (bookingDetails.discount || 0)}
          </p>
        </div>

        <p className="text-gray-400 text-xs">
          Inclusive of 15% Value Added Tax (VAT)
        </p>

        {/* Discount field */}
        <div className="mt-4 mb-14 flex justify-start">
          <input
            type="text"
            placeholder="1000.00"
            className="px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button className=" text-blue-700 font-bold py-2 px-4 border border-blue-900 hover:bg-blue-900 hover:text-white">
            Apply
          </button>
        </div>

        <div>
          {/* payments */}
          <h1 className="font-semibold text-xl text-black mb-4 capitalize">
            Payments
          </h1>

          <div>
            <div className="border border-gray-400 my-2"></div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Due</p>
              <p>16000.00</p>
            </div>
          </div>
        </div>

        {/* payment btn  */}
        <div className="mt-16" onClick={() => setIsModalOpen(true)}>
          <button className="bg-blue-900 text-white px-4 py-2 rounded-md w-full mb-2 font-semibold flex items-center justify-center gap-2">
            <span>
              <FaPlus />
            </span>
            New Payment
          </button>
        </div>
      </div>

      {/* modal for payment status */}
      <Modal
        title="Payment"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        cancelText="Cancel"
        okText="Confirm"
        okButtonProps={{
          style: { background: "#005099" },
        }}
      >
        <div>
          <div>
            <h3 className="font-semibold mb-1">Description</h3>
            <TextArea
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </div>

          <div className="my-2">
            <h3 className="font-semibold">Payment Method</h3>
            <Radio.Group options={plainOptions} />
          </div>

          <div>
            <h3 className="font-semibold mb-1">Amount</h3>
            <Input placeholder="Enter Amount" type="number" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookingSummary;
