import { AutoComplete, Form, Input, Select } from "antd";
import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const AdditionalGuests = () => {
  return (
    <>
      <h1 className="font-semibold text-xl text-gray-500 capitalize">
        Additional Guest
      </h1>

      <Form layout="vertical" className="flex items-center">
        <Form.Item name="name" label="Full Name" className="w-48">
          <AutoComplete placeholder="Enter your name" allowClear />
        </Form.Item>

        <Form.Item name="phone" label="Phone" className="mx-5 w-48">
          <AutoComplete placeholder="Enter your phone" allowClear />
        </Form.Item>

        <Form.Item name="idType" label="ID Type" className="mx-5 w-48">
          <Select
            options={[
              { value: "NID", label: "NID" },
              { value: "PASSPORT", label: "PASSPORT" },
            ]}
          />
        </Form.Item>

        <Form.Item name="idNo" label="ID No" className="mx-5 w-48">
          <Input placeholder="Enter your ID number" />
        </Form.Item>

        {/* delete icon */}
        <button className="text-lg">
          <FaXmark />
        </button>
      </Form>

      {/* button */}
      <div className="w-28 capitalize border border-blue-700 rounded-sm text-blue-700 px-2 py-1">
        <button className="flex items-center gap-2">
          <FaPlus />
          <span className="font-semibold"> Add Guest</span>
        </button>
      </div>
    </>
  );
};

export default AdditionalGuests;
