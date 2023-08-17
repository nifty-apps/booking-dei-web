import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus, FaRegCheckCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import BookingSummary from "../../components/BookingSummary";
import FloorPlan from "../../components/FloorPlan";
import TitleText from "../../components/Title";

const NewBooking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [extra, setExtra] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [numOfRows, setNumOfRows] = useState(1);
  const [addGuestRow, setAddGuestRow] = useState(1);

  // add row when click on add room button
  const addRow = () => {
    setNumOfRows(numOfRows + 1);
  };

  // add row when click on add guest button
  const addExtraGuest = () => {
    setAddGuestRow(addGuestRow + 1);
  };

  // cancel row for room details
  const cancelRow = () => {
    setNumOfRows(numOfRows - 1);
  };

  // cancel row for extra guest
  const cancelExtranGuestRow = () => {
    setAddGuestRow(addGuestRow - 1);
  };

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

  // modal for booking confirm
  const showModalForConfirm = () => {
    setConfirm(true);
  };

  const handleOkForConfirm = () => {
    setConfirm(false);
  };

  const handleCancelForConfirm = () => {
    setConfirm(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        {/* edit booking title */}
        {location.pathname === "/new-booking" && (
          <TitleText text="New Booking" />
        )}

        {location.pathname === "/edit-booking/:id" && (
          <TitleText text="Edit Booking" />
        )}

        {/* new booking btn top */}
        <div className="flex items-center gap-4">
          <button className="text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-900 hover:bg-blue-900 hover:text-white">
            Reset
          </button>
          <button
            className="text-white px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2  bg-blue-900 w-full"
            onClick={showModalForConfirm}
          >
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

          {/* room details labels */}
          <div className="flex items-center">
            <div className="flex items-center gap-24 mb-2">
              <div className="font-semibold">Check in</div>
              <div className="font-semibold">Check out</div>
            </div>
            <div className="mb-2 font-semibold mx-28">Room Type</div>
            <div className="mb-2 font-semibold">Room No</div>
            <div className="mb-2 font-semibold mx-5">Status</div>
          </div>

          {/* room details input */}
          {Array.from({ length: numOfRows }).map((_, index) => (
            <div className="flex font-semibold mb-2" key={index}>
              <div>
                <DatePicker.RangePicker format="YYYY-MM-DD" />
              </div>
              <div className="mx-3">
                <Button onClick={showModal}>
                  Select Room Type
                  <span className="mx-3 text-gray-400">
                    <AiOutlineDown />
                  </span>
                </Button>
              </div>

              <div>
                <Select defaultValue="302" />
              </div>

              <div className="mx-3">
                <Select
                  defaultValue="Select Status"
                  style={{ width: 140 }}
                  options={[
                    { value: "BOOKED", label: "Booked" },
                    { value: "CHECKEDIN", label: "Check In" },
                    { value: "CHECKEDOUT", label: "Check Out" },
                  ]}
                />
              </div>

              {/* three dots click */}
              <div className="mt-1 cursor-pointer mr-4">
                <span onClick={showModalForExtra}>
                  <span>
                    <BsThreeDotsVertical />
                  </span>
                </span>
              </div>

              {/* cancel row */}
              <div
                className="cursor-pointer text-gray-500 text-xl"
                onClick={cancelRow}
              >
                <MdClose />
              </div>
            </div>
          ))}

          {/* add room button */}
          <div className="w-28 capitalize border border-blue-700 rounded-sm text-blue-700 px-2 py-1 mt-2">
            <button className="flex items-center gap-2" onClick={addRow}>
              <span>
                <FaPlus />
              </span>
              <span className="font-semibold"> Add Room</span>
            </button>
          </div>

          {/* guest detailas part */}
          <div className="mt-8">
            <h1 className="font-semibold text-xl text-gray-500 mb-4 capitalize">
              Guest details
            </h1>
          </div>
          <Form layout="vertical" className="flex items-center font-semibold">
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
          <h1 className="font-semibold text-xl text-gray-500 mb-4 capitalize">
            Additional Guests
          </h1>

          {/* Additional Guest details info labels */}
          <div className="flex items-center mb-2">
            <div className="font-semibold">Full Name</div>
            <div className="font-semibold ml-64">
              Phone Number <span className="text-gray-400">(Optional)</span>
            </div>
            <div className="font-semibold ml-52">
              NID/Passport <span className="text-gray-400">(Optional)</span>
            </div>
          </div>

          {/* Additional Guest details info input */}
          {Array.from({ length: addGuestRow }).map((_, index) => (
            <Form
              key={index}
              layout="vertical"
              className="flex items-center font-semibold mb-2"
            >
              <Input placeholder="Enter your name" />
              <Input className="mx-3" placeholder="Enter your phone number" />
              <Input placeholder="Enter your NID Number" />

              {/* cancel row */}
              <div
                className="cursor-pointer text-gray-500 text-xl ml-2"
                onClick={cancelExtranGuestRow}
              >
                <MdClose />
              </div>
            </Form>
          ))}

          {/* add extra guest btn */}
          <div
            className="w-28 capitalize border border-blue-700 rounded-sm text-blue-700 px-2 py-1"
            onClick={addExtraGuest}
          >
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
        <FloorPlan onSelectionChange={(rooms) => console.log(rooms)} />
      </Modal>

      {/* modal for extra | discount */}
      <Modal
        open={extra}
        onOk={handleOkForExtra}
        onCancel={handleCancelForExtra}
        cancelText="Cancel"
        okText="Apply"
        width={450}
        cancelButtonProps={{
          style: { background: "" },
        }}
        okButtonProps={{
          style: { background: "#005099" },
        }}
      >
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-xl mb-2">Extras</h3>
            <div className="flex items-center gap-2">
              <Checkbox>Bed</Checkbox>
              <br />
              <Checkbox>Breakfast</Checkbox>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="font-semibold text-xl">Discount</h3>
            <div className="flex items-center">
              <div className="my-2">Final Room Rent</div>
              <div className="mx-5">Amount</div>
            </div>
            <Input placeholder="Enter Discount" maxLength={16} />
          </div>
        </div>
      </Modal>

      {/* modal for confirm booking */}
      <Modal
        open={confirm}
        onOk={handleOkForConfirm}
        onCancel={handleCancelForConfirm}
        cancelText="View Booking Details"
        okText="Back To Home"
        width={400}
        cancelButtonProps={{
          style: { background: "" },
        }}
        okButtonProps={{
          style: { background: "#005099" },
        }}
      >
        <div className="flex justify-evenly">
          <div className="mt-2">
            <span className="text-xl text-blue-300">
              <FaRegCheckCircle />
            </span>
          </div>
          <div className="mx-2 mb-2">
            <h4 className="font-semibold text-xl">Booking Confirmed</h4>
            <p>Yay! Your new booking was added successfully.</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewBooking;
