import { Form, Input } from "antd";
import { FaTimes } from "react-icons/fa";

const AdditionalGuestEdit = () => {
  return (
    <>
      <h1 className="font-semibold text-xl text-gray-500 capitalize my-4 mt-6">
        Additional Guest
      </h1>

      <Form layout="vertical" className="flex items-center">
        <Form.Item label="Full Name" className="w-1/2">
          <Input placeholder="Enter your name" allowClear />
        </Form.Item>

        <Form.Item label="Phone" className="mx-5 w-1/2">
          <Input placeholder="Enter your phone" allowClear />
        </Form.Item>
        {/* delete icon */}
        <button className="text-lg">
          <FaTimes />
        </button>
      </Form>

      {/* Add Guest button */}
      <div className="w-28 capitalize border border-blue-700 rounded-sm text-blue-700 px-2 py-1">
        <button className="flex items-center gap-2" type="submit">
          <span className="font-semibold">Update Guest</span>
        </button>
      </div>
    </>
  );
};

export default AdditionalGuestEdit;
