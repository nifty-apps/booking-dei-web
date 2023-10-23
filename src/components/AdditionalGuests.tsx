import { Form, Input } from "antd";
import { FaPlus, FaTimes } from "react-icons/fa";

interface AdditionalGuestsProps {
  guests: {
    name: string;
    phone: string;
  }[];
  setGuests: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        phone: string;
      }[]
    >
  >;
  removeGuest: (index: number) => void;
}

const AdditionalGuests = ({
  guests,
  setGuests,
  removeGuest,
}: AdditionalGuestsProps) => {
  // handleChange
  const handleInputChange = (index: number, field: string, value: string) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest, i) =>
        i === index ? { ...guest, [field]: value } : guest
      )
    );
  };

  // Function to add a guest
  const addGuest = () => {
    setGuests((prevGuests) => [...prevGuests, { name: "", phone: "" }]);
  };

  return (
    <>
      <h1 className="font-semibold text-xl text-gray-500 capitalize my-4 mt-6">
        Additional Guest
      </h1>

      {guests?.map((guest, index) => (
        <Form layout="vertical" className="flex items-center" key={index}>
          <Form.Item label="Full Name" className="w-1/2">
            <Input
              placeholder="Enter your name"
              allowClear
              value={guest.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Phone" className="mx-5 w-1/2">
            <Input
              placeholder="Enter your phone"
              allowClear
              value={guest.phone}
              onChange={(e) =>
                handleInputChange(index, "phone", e.target.value)
              }
            />
          </Form.Item>
          {/* delete icon */}
          <button className="text-lg" onClick={() => removeGuest(index)}>
            <FaTimes />
          </button>
        </Form>
      ))}

      {/* Add Guest button */}
      <div className="w-28 capitalize border border-blue-700 rounded-sm text-blue-700 px-2 py-1">
        <button
          className="flex items-center gap-2"
          type="submit"
          onClick={addGuest}
        >
          <FaPlus />
          <span className="font-semibold">Add Guest</span>
        </button>
      </div>
    </>
  );
};

export default AdditionalGuests;
