import { AutoComplete, Form, Input, Select } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AdditionalGuests = () => {
  const [additionalGuest, setAdditionalGuest] = useState([
    {
      name: "",
      phone: "",
      idType: "",
      idNo: "",
    },
  ]);
  const addAdditionalGuest = () => {
    setAdditionalGuest([
      ...additionalGuest,
      {
        name: "",
        phone: "",
        idType: "",
        idNo: "",
      },
    ]);
  };

  return (
    <>
      <h1 className="font-semibold text-xl text-gray-500 capitalize">
        Additional Guest
      </h1>

      <Form
        layout="vertical"
        className="flex items-center"
        onValuesChange={(values) => {
          setAdditionalGuest({ ...additionalGuest, ...values });
        }}
      >
        <Form.Item name="name" label="Full Name" className="w-48">
          <AutoComplete placeholder="Enter your name" allowClear />
        </Form.Item>

        <Form.Item name="phone" label="Phone" className="mx-5 w-48">
          <AutoComplete placeholder="Enter your phone" allowClear />
        </Form.Item>

        <Form.Item className="mt-6">
          <Form.Item name="idType" label="ID Type" className="mx-5 w-48">
            <Select
              options={[
                { value: "NID", label: "NID" },
                { value: "PASSPORT", label: "PASSPORT" },
              ]}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item name="idNo" label="ID No" className="mx-5 w-48">
          <Input placeholder="Enter your ID number" />
        </Form.Item>
      </Form>
      {/* button */}
      <div className="w-28 capitalize border border-blue-700 rounded-sm text-blue-700 px-2 py-1 -mt-7">
        <button
          className="flex items-center gap-2"
          onClick={addAdditionalGuest}
        >
          <span>
            <FaPlus />
          </span>
          <span className="font-semibold"> Add Guest</span>
        </button>
      </div>
    </>
  );
};

export default AdditionalGuests;
