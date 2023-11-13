import { useMutation, useQuery } from "@apollo/client";
import { Form, Input } from "antd";
import { ChangeEvent, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { GuestInput } from "../graphql/__generated__/graphql";
import { UPDATE_BOOKING } from "../graphql/mutations/bookingMutations";
import { GET_BOOKING } from "../graphql/queries/bookingDetailsQueries";

const AdditionalGuestEdit = () => {
  const { bookingId } = useParams();
  const [guestFormData, setGuestFormData] = useState<GuestInput[]>([]);

  const { data } = useQuery(GET_BOOKING, {
    variables: { id: bookingId || "" },
  });

  const [updateBooking] = useMutation(UPDATE_BOOKING);

  const updateAdditionalGuest = () => {
    updateBooking({
      variables: {
        updateBookingInput: {
          _id: bookingId,
          guests: guestFormData,
        },
      },

      refetchQueries: [{ query: GET_BOOKING, variables: { id: bookingId } }],
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedGuests = [...guestFormData];
    updatedGuests[index] = {
      ...updatedGuests[index],
      [e.target.name]: e.target.value,
    };
    setGuestFormData(updatedGuests);
  };

  return (
    <>
      <h1 className="font-semibold text-xl text-gray-500 capitalize my-4 mt-6">
        Additional Guest
      </h1>

      {data?.booking?.guests?.map((guest: GuestInput, index: number) => (
        <Form layout="vertical" className="flex items-center" key={index}>
          <Form.Item
            label="Full Name"
            className="w-1/2"
            initialValue={guest?.name || "No name found"}
          >
            <Input
              type="text"
              placeholder={guest?.name || "No name found"}
              allowClear
              name="name"
              onChange={(e) => handleChange(e, index)}
            />
          </Form.Item>

          <Form.Item label="Phone" className="mx-5 w-1/2">
            <Input
              type="number"
              placeholder={guest?.phone || "No phone found"}
              allowClear
              name="phone"
              onChange={(e) => handleChange(e, index)}
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
        <button
          className="flex items-center gap-2"
          type="submit"
          onClick={updateAdditionalGuest}
        >
          <span className="font-semibold">Update Guest</span>
        </button>
      </div>
    </>
  );
};

export default AdditionalGuestEdit;
