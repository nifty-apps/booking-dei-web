import { useState } from "react";
import { DatePicker, Modal, Select, Checkbox, Form, Input, Button } from "antd";
// data

import { AiOutlineDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import RoomNumber from "../../components/RoomNumber";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import BookingSummary from "../../components/BookingSummary";

const NewBooking = () => {
  // guest details form
  const [guestForm] = Form.useForm();
  const [additionalGuestForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [extra, setExtra] = useState(false);

  // modal for Room type
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // modal for extra | discount
  const showModalForExtra = () => {
    setExtra(true);
  };

  const handleOkForExtra = () => {
    setExtra(false);
  };

  const handleCancelForExtra = () => {
    setExtra(false);
  };

  const onFinish = () => {};

  return (
    <>
      <div className="flex items-center justify-between">
        {/* title */}
        <div className="text-3xl font-semibold">New Booking</div>
        {/* new booking btn top */}
        <div className="flex items-center gap-4">
          <button className="text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-700 hover:bg-blue-900 hover:text-white">
            Reset
          </button>
          <button className="text-gray-500 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 bg-gray-200 hover:bg-gray-300">
            Confirm Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 mt-5">
        <div className="col-span-9 bg-white shadow-sm p-5 mr-4">
          {/* room details */}
          <h1 className="font-semibold text-xl text-gray-500 mb-4 capitalize">
            Room details
          </h1>
          <div className="flex font-semibold">
            <div>
              <div className="flex items-center gap-24 mb-2">
                <div>Check in</div>
                <div>Check out</div>
              </div>
              <DatePicker.RangePicker format="YYYY-MM-DD" />
            </div>
            <div className="mx-3">
              <div className="mb-2">Room Type</div>
              <Button onClick={showModal}>
                Select Room Type
                <span className="mx-3 text-gray-400">
                  <AiOutlineDown />
                </span>
              </Button>
            </div>

            <div>
              <div className="mb-2">Room No</div>
              <Select defaultValue="302" />
            </div>

            <div className="mx-3">
              <div className="mb-2">Status</div>
              <Select
                defaultValue="Select Status"
                style={{ width: 140 }}
                options={[
                  { value: "Booked", label: "Booked" },
                  { value: "Check In", label: "Check In" },
                  { value: "Check Out", label: "Check Out" },
                  { value: "Partial Payment", label: "Partial Payment" },
                ]}
              />
            </div>

            {/* three dots click */}
            <div className="mt-9 cursor-pointer mr-4">
              <span onClick={showModalForExtra}>
                <span>
                  <BsThreeDotsVertical />
                </span>
              </span>
            </div>

            {/* cancel row */}
            <div className="cursor-pointer mt-8 text-gray-500 text-xl">
              <MdClose />
            </div>
          </div>
          {/* add room button */}
          <div className="w-28 capitalize border border-blue-700 rounded-sm text-blue-700 px-2 py-1 mt-2">
            <button className="flex items-center gap-2">
              <span>
                <FaPlus />
              </span>
              <span className="font-semibold"> Add Room</span>
            </button>
          </div>

          {/* guest detailas part */}
          <div className="my-8">
            <h1 className="font-semibold text-xl text-gray-500 mb-4 capitalize">
              Guest details
            </h1>
          </div>
          <Form
            form={guestForm}
            layout="vertical"
            onFinish={onFinish}
            className="flex items-center font-semibold"
          >
            <Form.Item
              label="Full Name"
              name="guestName"
              rules={[
                {
                  message: "Please enter your name",
                },
              ]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              className="mx-5"
              label="Phone Number"
              name="guestPhone"
              rules={[
                {
                  message: "Please enter your phone number",
                },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
              label="NID/Passport"
              name="guestNID"
              rules={[
                {
                  message: "Please enter your NID Number",
                },
              ]}
            >
              <Input placeholder="Enter your NID Number" />
            </Form.Item>
          </Form>

          {/* Additional Guest details info */}
          <div className="my-8">
            <h1 className="font-semibold text-xl text-gray-500 mb-4 capitalize">
              Additional guests
            </h1>
          </div>
          <Form
            form={additionalGuestForm}
            layout="vertical"
            onFinish={onFinish}
            className="flex items-center font-semibold"
          >
            <Form.Item
              label="Full Name"
              name="additionalGuestName"
              rules={[
                {
                  message: "Please enter your name",
                },
              ]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              className="mx-5"
              label="Phone Number"
              name="additionalGuestPhone"
              rules={[
                {
                  message: "Please enter your phone number",
                },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
              label="NID/Passport"
              name="additionalGuestNID"
              rules={[
                {
                  message: "Please enter your NID Number",
                },
              ]}
            >
              <Input placeholder="Enter your NID Number" />
            </Form.Item>
          </Form>

          {/* add extra guest btn */}
          <div className="w-28 capitalize border border-blue-700 rounded-sm text-blue-700 px-2 py-1 mt-2">
            <button className="flex items-center gap-2">
              <span>
                <FaPlus />
              </span>
              <span className="font-semibold"> Add Guest</span>
            </button>
          </div>
        </div>

        {/* booking summary || Payment flow */}
        <BookingSummary />
      </div>

      {/* modal for room select */}
      <Modal
        title="Room Type"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Cancel"
        okText="Apply"
        width={1000}
        cancelButtonProps={{
          style: { background: "" },
        }}
        okButtonProps={{
          style: { background: "gray" },
        }}
      >
        <RoomNumber />
      </Modal>

      {/* modal for extra | discount */}
      <Modal
        title="Extra | Discount"
        open={extra}
        onOk={handleOkForExtra}
        onCancel={handleCancelForExtra}
        cancelText="Cancel"
        okText="Apply"
        width={1000}
        cancelButtonProps={{
          style: { background: "" },
        }}
        okButtonProps={{
          style: { background: "gray" },
        }}
      >
        <div className="flex items-center">
          <div>
            <h3>Extras</h3>
            <Checkbox>Bed</Checkbox>
            <br />
            <Checkbox>Breakfast</Checkbox>
          </div>
          <div>
            <h3>Discount</h3>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewBooking;
