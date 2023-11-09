import { useQuery } from "@apollo/client";
import { Form, Input } from "antd";
import { FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { GuestInput } from "../graphql/__generated__/graphql";
import { GET_BOOKING } from "../graphql/queries/bookingDetailsQueries";

const AdditionalGuestEdit = () => {
  const { bookingId } = useParams();

  const { data } = useQuery(GET_BOOKING, {
    variables: { id: bookingId || "" },
  });

  console.log("data edit : ", data?.booking.guests);

  return (
    <>
      <h1 className="font-semibold text-xl text-gray-500 capitalize my-4 mt-6">
        Additional Guest
      </h1>

      {data?.booking.guests?.map((guest: GuestInput, index: number) => (
        <Form layout="vertical" className="flex items-center" key={index}>
          <Form.Item label="Full Name" className="w-1/2">
            <Input
              placeholder="Enter your name"
              allowClear
              value={guest?.name || "No name found"}
            />
          </Form.Item>

          <Form.Item label="Phone" className="mx-5 w-1/2">
            <Input
              placeholder="Enter your phone"
              allowClear
              value={guest?.phone || "No phone found"}
            />
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
          <span className="font-semibold">Update Guest</span>
        </button>
      </div>
    </>
  );
};

export default AdditionalGuestEdit;
