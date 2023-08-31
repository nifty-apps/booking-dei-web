import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  AutoComplete,
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
  message,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Contact,
  ContactFilterInput,
  ContactTypes,
  CreateContactInput,
} from "../graphql/__generated__/graphql";
import { CREATE_CONTACT } from "../graphql/mutations/createContactMutations";
import { GET_CONTACTS } from "../graphql/queries/contactQueries";
import { RootState } from "../store";

interface GuestDetailsInfoProps {
  onSelect: (contact: Contact) => void;
}

const GuestDetailsInfo = ({ onSelect }: GuestDetailsInfoProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [createContact] = useMutation(CREATE_CONTACT);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // create contact
  const onFinish = async (values: CreateContactInput) => {
    try {
      const response = await createContact({
        variables: {
          createContactInput: {
            ...values,
            idNo: Number(values.idNo),
            hotel: user?.hotels[0] || "",
            type: ContactTypes.Customer,
          },
        },
      });

      if (response?.data?.createContact) {
        message.success("Contact created successfully!");
        setContact(response.data.createContact);
        form.setFieldsValue(response.data.createContact);
        setIsModalOpen(false);
      }
    } catch (err) {
      message.error(`something went wrong!`);
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
        <Form.Item name="name" label="Full Name" className="mx-5 w-48">
          <Select
            placeholder="Enter full name"
            className="w-48"
            dropdownRender={(option) => (
              <>
                <Button
                  block
                  type="text"
                  icon={<PlusOutlined style={{ verticalAlign: "0" }} />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Add new contact
                </Button>
                <Divider className="my-2" />
                {option}
              </>
            )}
            options={contacts.map((contact) => ({
              label: contact.name,
              value: contact._id,
            }))}
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

      {/* modal for guest details */}
      <Modal
        title="Create New Contact"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        okButtonProps={{
          style: { background: "#005099" },
        }}
      >
        <Form onFinish={onFinish}>
          <Space direction="vertical" className="w-full">
            <h3>Full Name</h3>
            <Form.Item name="name">
              <Input type="text" placeholder="Enter name" />
            </Form.Item>

            <h3>Phone</h3>
            <Form.Item name="phone">
              <Input type="text" placeholder="Enter your phone" />
            </Form.Item>

            <h3>ID Type</h3>
            <Form.Item name="idType">
              <Select
                className="w-full"
                placeholder="Select ID Type"
                options={[
                  { value: "NID", label: "NID" },
                  { value: "PASSPORT", label: "PASSPORT" },
                ]}
              />
            </Form.Item>

            <h3>ID No</h3>
            <Form.Item name="idNo">
              <Input placeholder="Enter your ID number" />
            </Form.Item>
          </Space>
          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default GuestDetailsInfo;
