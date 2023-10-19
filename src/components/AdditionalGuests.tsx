import { AutoComplete, Form } from "antd";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Guest } from "../graphql/__generated__/graphql";

const AdditionalGuests = () => {
  const [form] = Form.useForm();

  const [guests, setGuests] = useState([{ name: "", phone: "" }]);

  // add guest multiple times
  const addGuests = () => {
    setGuests([...guests, { name: "", phone: "" }]);
  };

  // form submit handler
  const onFinish = (values: Guest) => {
    console.log("Received values of form:", values);
  };

  return (
    <>
      <h1 className="font-semibold text-xl text-gray-500 capitalize my-4 mt-6">
        Additional Guest
      </h1>

      {guests?.map((guest) => (
        <Form
          layout="vertical"
          className="flex items-center"
          key={guest.phone}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="Full Name" className="w-1/2">
            <AutoComplete placeholder="Enter your name" allowClear />
          </Form.Item>

          <Form.Item label="Phone" className="mx-5 w-1/2">
            <AutoComplete placeholder="Enter your phone" allowClear />
          </Form.Item>
          {/* delete icon */}
          <button className="text-lg">
            <FaTimes />
          </button>
        </Form>
      ))}

      {/* Add Guest button */}
      <div className="w-28 capitalize border border-blue-700 rounded-sm text-blue-700 px-2 py-1">
        <button className="flex items-center gap-2" type="submit">
          <FaPlus />
          <span className="font-semibold" onClick={addGuests}>
            Add Guest
          </span>
        </button>
      </div>
    </>
  );
};

export default AdditionalGuests;
