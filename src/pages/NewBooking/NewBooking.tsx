import { useState } from "react";
import { DatePicker, Modal, Select, Checkbox, Form, Input, Button } from "antd";
// data

import { AiOutlineDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import RoomNumber from "../../components/RoomNumber";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const NewBooking = () => {
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

  // guest details form
  const [form] = Form.useForm();

  const onFinish = () => {};

  return (
    <>
      <div className="flex items-center justify-between">
        {/* btn */}
        <div className="text-3xl font-semibold">NewBooking</div>
        <div className="flex items-center gap-4">
          <button className="text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-700 hover:bg-blue-900 hover:text-white">
            Reset
          </button>
          <button className="bg-blue-900 text-white px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2">
            Confirm Booking
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-5">
        <div className="col-span-9 bg-gray-300">
          {/* room details */}
          <h1 className="font-semibold text-xl">Room details</h1>
          <div className="flex">
            <div>
              <div className="flex items-center">
                <div>Check in</div>
                <div>Check out</div>
              </div>
              <DatePicker.RangePicker format="YYYY-MM-DD" />
            </div>
            <div>
              <div>Room Type</div>
              <Button onClick={showModal}>
                Select Room Type
                <span>
                  <AiOutlineDown />
                </span>
              </Button>
            </div>

            <div>
              <div>Room No</div>
              <Select defaultValue="302" />
            </div>

            <div>
              <div>Status</div>
              <Select
                defaultValue="Select status"
                style={{ width: 120 }}
                options={[
                  { value: "booked", label: "booked" },
                  { value: "check in", label: "check in" },
                  { value: "check out", label: "check out" },
                  { value: "partial payment", label: "partial payment" },
                  { value: "cancel", label: "cancel" },
                ]}
              />
            </div>

            {/* three dots click */}
            <div>
              <Button onClick={showModalForExtra}>
                <span>
                  <BsThreeDotsVertical />
                </span>
              </Button>
            </div>

            {/* cancel row */}
            <div>
              <MdClose />
            </div>
          </div>
          <h1>Guest details</h1>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="flex items-center"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number",
                },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
              label="NID"
              name="nid"
              rules={[
                {
                  required: true,
                  message: "Please enter your National Identification Number",
                },
              ]}
            >
              <Input placeholder="Enter your National Identification Number" />
            </Form.Item>
          </Form>
          <h1>Additional Guest</h1>

          <Form form={form} layout="vertical" className="flex items-center">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number",
                },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
              label="NID"
              name="nid"
              rules={[
                {
                  required: true,
                  message: "Please enter your National Identification Number",
                },
              ]}
            >
              <Input placeholder="Enter your National Identification Number" />
            </Form.Item>
          </Form>

          {/* add extra guest */}
          <div>
            <button className="flex items-center">
              <span>
                <FaPlus />
              </span>
              Add Guest
            </button>
          </div>
        </div>

        {/* booking summary */}
        <div className="col-span-3 bg-gray-200 p-4 rounded-sm ml-4">
          <h3 className="text-lg capitalize font-semibold mb-5">
            Booking Summary
          </h3>
          <hr />
          <p>Subtotal: </p>
          <p>Discount</p>
          <hr />

          <p>Grand Total: </p>
          <p>Inclusive of 15% value added tas (vat)</p>

          <div>
            <input type="text" placeholder="Enter Discount" />
            <button>Apply</button>
          </div>

          {/* total payments */}
          <p>Total: </p>

          <hr />

          <p>Due</p>

          {/* payment btn  */}
          <div className="mt-72">
            <h1>Payments</h1>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md w-full mb-2 font-semibold">
              + New Payment
            </button>
          </div>
        </div>
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
