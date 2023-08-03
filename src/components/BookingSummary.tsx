import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Modal, Input, Radio } from "antd";
const { TextArea } = Input;

const BookingSummary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plainOptions = ["Bank", "Bkash", "Cash"];

  // modal for new payment
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="col-span-3 bg-gray-200 p-4 rounded-sm">
        <h3 className="text-lg capitalize font-semibold mb-5">
          Booking Summary
        </h3>
        <div className="flex justify-between text-md">
          <div className="flex items-center">
            <span className="mr-2">1.</span>
            <span className="cursor-pointer">
              <AiOutlineClose />
            </span>
            <div className="mx-2 font-semibold">
              Super Deluxe Tripel (Non-AC)
            </div>
          </div>
          <div className="font-semibold">5000.00</div>
        </div>
        <div className="flex items-center justify-between">
          <p>Extrans Bed + Breakfast</p>
          <p>1000.00</p>
        </div>

        <div className="flex justify-between text-md mt-2">
          <div className="flex items-center">
            <span className="mr-2">1.</span>
            <span className="cursor-pointer">
              <AiOutlineClose />
            </span>
            <div className="mx-2 font-semibold">
              Super Deluxe Tripel (Non-AC)
            </div>
          </div>
          <div className="font-semibold">10000.00</div>
        </div>
        <div className="border border-gray-400 my-2"></div>

        <div className="flex items-center justify-between">
          <p className="font-bold">Subtotal</p>
          <p>16000.00</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-bold">Discount</p>
          <p>16000.00</p>
        </div>

        <div className="border border-gray-400 my-2"></div>
        <div className="flex items-center justify-between">
          <p className="font-bold">Grand Total</p>
          <p>16000.00</p>
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
        <div className="mt-16" onClick={showModal}>
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
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Cancel"
        okText="+ New Payment"
        okButtonProps={{
          style: { background: "gray" },
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
            <Input placeholder="Enter Amount" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookingSummary;
