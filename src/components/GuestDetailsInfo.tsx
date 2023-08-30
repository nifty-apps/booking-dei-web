import { useQuery } from "@apollo/client";
import { AutoComplete, Form, Input, Select } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Contact,
  ContactFilterInput,
  ContactTypes,
} from "../graphql/__generated__/graphql";
import { GET_CONTACTS } from "../graphql/queries/contactQueries";
import { RootState } from "../store";

interface GuestDetailsInfoProps {
  onSelect: (contact: Contact) => void;
}

const GuestDetailsInfo = ({ onSelect }: GuestDetailsInfoProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [form] = Form.useForm();

  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [contact, setContact] = useState<Contact>({
    _id: "",
    hotel: user?.hotels[0] || "",
    name: "",
    phone: "",
    type: ContactTypes.Customer,
  });

  const { data, loading, error } = useQuery(GET_CONTACTS, {
    variables: {
      filter: {
        hotel: user?.hotels[0] || "",
      } as ContactFilterInput,
    },
  });

  const getSuggestions = (field: "name" | "phone", value: string) => {
    const matchedContacts = contacts.filter((contact) =>
      contact[field].toLowerCase().includes(value.toLowerCase())
    );

    return matchedContacts.map((contact) => ({
      key: contact._id,
      value: contact[field],
    }));
  };

  const handleSelect = (field: "name" | "phone", value: string) => {
    const matchedContact = contacts.find(
      (contact) => contact[field].toLowerCase() === value.toLowerCase()
    );

    if (matchedContact) {
      setContact(matchedContact);
      form.setFieldsValue(matchedContact);
    }
  };

  const memoizedOnContact = useCallback(onSelect, []);

  useEffect(() => {
    if (contact?._id) {
      memoizedOnContact(contact);
    }
  }, [contact, memoizedOnContact]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const contacts = data?.contacts ?? [];

  return (
    <>
      <div className="mt-8">
        <h1 className="font-semibold text-xl text-gray-500 mb-4 capitalize">
          Guest details
        </h1>
      </div>
      <Form
        form={form}
        onValuesChange={(values) => {
          setContact({ ...contact, ...values });
        }}
        layout="vertical"
        className="flex items-center"
      >
        <Form.Item name="name" label="Full Name" className="w-48">
          <AutoComplete
            value={contact?.name}
            options={options}
            onSearch={(text) => setOptions(getSuggestions("name", text))}
            onSelect={(value) => handleSelect("name", value)}
            placeholder="Enter your name"
            allowClear
          />
        </Form.Item>

        <Form.Item name="phone" label="Phone" className="mx-5 w-48">
          <AutoComplete
            value={contact?.phone}
            options={options}
            onSearch={(text) => setOptions(getSuggestions("phone", text))}
            onSelect={(value) => handleSelect("phone", value)}
            placeholder="Enter your phone"
            allowClear
          />
        </Form.Item>

        <Form.Item name="idType" label="ID Type" className="mx-5 w-48">
          <Select
            value={contact?.idType}
            options={[
              { value: "NID", label: "NID" },
              { value: "PASSPORT", label: "PASSPORT" },
            ]}
          />
        </Form.Item>

        <Form.Item name="idNo" label="ID No" className="mx-5 w-48">
          <Input
            placeholder="Enter your ID number"
            value={contact?.idNo?.toString()}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default GuestDetailsInfo;
