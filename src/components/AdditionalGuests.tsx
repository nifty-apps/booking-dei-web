import { AutoComplete, Form } from "antd";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const AdditionalGuests = () => {
  const [guests, setGuests] = useState([{ id: Date.now() }]);

  const handleAddGuest = () => {
    setGuests([...guests, { id: Date.now() }]);
  };

  const handleRemoveGuest = (idToRemove: number) => {
    const newGuests = guests.filter((guest) => guest.id !== idToRemove);
    setGuests(newGuests);
  };

  return (
    <>
      <h1 className="font-semibold text-xl text-gray-500 capitalize my-4">
        Additional Guest
      </h1>

      {guests?.map((guest) => (
        <div key={guest.id}>
          <Form layout="vertical" className="flex items-center">
            <Form.Item
              name={`name${guest.id}`}
              label="Full Name"
              className="w-1/2"
            >
              <AutoComplete placeholder="Enter your name" allowClear />
            </Form.Item>

            <Form.Item
              name={`phone${guest.id}`}
              label="Phone"
              className="mx-5 w-1/2"
            >
              <AutoComplete placeholder="Enter your phone" allowClear />
            </Form.Item>
            {/* delete icon */}
            <button
              className="text-lg"
              onClick={() => handleRemoveGuest(guest.id)}
            >
              <FaTimes />
            </button>
          </Form>
        </div>
      ))}

      {/* Add Guest button */}
      <div className="w-28 capitalize border border-blue-700 rounded-sm text-blue-700 px-2 py-1">
        <button className="flex items-center gap-2" onClick={handleAddGuest}>
          <FaPlus />
          <span className="font-semibold"> Add Guest</span>
        </button>
      </div>
    </>
  );
};

export default AdditionalGuests;
