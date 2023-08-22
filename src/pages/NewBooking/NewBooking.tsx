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
            onClick={() => setConfirm(true)}
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
                <Button onClick={() => setIsModalOpen(true)}>
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
                    { value: "PARTIALPAYMENT", label: "Partial Payment" },
                  ]}
                />
              </div>

              {/* three dots click */}
              <div className="mt-1 cursor-pointer mr-4">
                <span onClick={() => setExtra(true)}>
                  <span>
                    <BsThreeDotsVertical />
                  </span>
                </span>
              </div>

              {/* cancel row */}
              <div
                className="cursor-pointer text-gray-500 text-xl"
                onClick={() => setNumOfRows(numOfRows - 1)}
              >
                <MdClose />
              </div>
            </div>
          ))}

          {/* add room button */}
          <div className="w-28 capitalize border border-blue-700 rounded-sm text-blue-700 px-2 py-1 mt-2">
            <button
              className="flex items-center gap-2"
              onClick={() => setNumOfRows(numOfRows + 1)}
            >
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
            <div className="font-semibold ml-32">
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
                onClick={() => setAddGuestRow(addGuestRow - 1)}
              >
                <MdClose />
              </div>
            </Form>
          ))}

          {/* add extra guest btn */}
          <div
            className="w-28 capitalize border border-blue-700 rounded-sm text-blue-700 px-2 py-1"
            onClick={() => setAddGuestRow(addGuestRow + 1)}
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
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        cancelText="Cancel"
        okText="Apply"
        width={1000}
        okButtonProps={{
          style: { background: "gray" },
        }}
      >
        <FloorPlan
          onSelectionChange={(rooms) => console.log(rooms)}
          startDate={new Date()}
          endDate={new Date()}
        />
      </Modal>

      {/* modal for extra | discount */}
      <Modal
        open={extra}
        onOk={() => setExtra(false)}
        onCancel={() => setExtra(false)}
        cancelText="Cancel"
        okText="Apply"
        width={600}
        cancelButtonProps={{
          style: { background: "" },
        }}
        okButtonProps={{
          style: { background: "#005099" },
        }}
      >
        <div>
          <h3 className="font-semibold text-xl mb-2">Extras & Discount</h3>
          <div className="flex items-center gap-2 mb-3">
            <Checkbox>Bed</Checkbox>
            <br />
            <Checkbox>Breakfast</Checkbox>
          </div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="font-semibold">Room Rent : </div>
              <div className="font-semibold my-2">Discount : </div>
              <div className="font-semibold">
                Final Room Rent (Including Extras & Discount) :
              </div>
            </div>
            <div>
              <div>3000</div>
              <input
                type="number"
                placeholder="Enter Discount"
                className="border border-gray-400 rounded-md p-2 my-2"
              />
              <div>1321313</div>
            </div>
          </div>
        </div>
      </Modal>

      {/* modal for confirm booking */}
      <Modal
        open={confirm}
        onOk={() => setConfirm(false)}
        onCancel={() => setConfirm(false)}
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
