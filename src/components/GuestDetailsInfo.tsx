import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
  message,
} from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const memoizedOnContact = useMemo(() => onSelect, [onSelect]);

  const [form] = Form.useForm();

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

  const prevContact = useRef(contact);

  const searchContact = (selectedContact: Contact) => {
    setContact(selectedContact);
    form.setFieldsValue(selectedContact);
  };

  useEffect(() => {
    if (contact !== prevContact.current) {
      prevContact.current = contact;
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
        className="flex items-center justify-between"
      >
        <Form.Item name="name" label="Full Name" className="w-48">
          <Select
            placeholder="Enter full name"
            className="w-48"
            onSelect={(value) => {
              const selectedContact = contacts.find(
                (contact) => contact._id === value
              );
              if (selectedContact) {
                searchContact(selectedContact);
              }
            }}
            dropdownRender={(option) => (
              <>
                <Button
                  className="bg-gray-100"
                  block
                  type="text"
                  icon={<PlusOutlined style={{ verticalAlign: "0" }} />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Add new contact
                </Button>
                <Divider className="my-2" />
                <span>{option}</span>
              </>
            )}
            options={contacts.map((contact) => ({
              label: contact.name,
              value: contact._id,
            }))}
          />
        </Form.Item>

        <Form.Item name="phone" label="Phone" className="w-48">
          <Select
            placeholder="Enter phone number"
            className="w-48"
            onSelect={(value) => {
              const selectedContact = contacts.find(
                (contact) => contact._id === value
              );
              if (selectedContact) {
                searchContact(selectedContact);
              }
            }}
            dropdownRender={(option) => (
              <>
                <Button
                  className="bg-gray-100"
                  block
                  type="text"
                  icon={<PlusOutlined style={{ verticalAlign: "0" }} />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Add new contact
                </Button>
                <Divider className="my-2" />
                <span>{option}</span>
              </>
            )}
            options={contacts.map((contact) => ({
              label: contact.phone,
              value: contact._id,
            }))}
          />
        </Form.Item>

        <Form.Item name="idType" label="ID Type" className="w-48">
          <Select
            value={contact?.idType}
            options={[
              { value: "NID", label: "NID" },
              { value: "PASSPORT", label: "PASSPORT" },
            ]}
          />
        </Form.Item>

        <Form.Item name="idNo" label="ID No" className="w-48">
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
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <Form onFinish={onFinish}>
          <Space direction="vertical" className="w-full">
            <h3>Full Name</h3>
            <Form.Item name="name" className="mb-0">
              <Input type="text" placeholder="Enter name" />
            </Form.Item>

            <h3>Phone</h3>
            <Form.Item name="phone" className="mb-0">
              <Input type="text" placeholder="Enter your phone" />
            </Form.Item>

            <h3>ID Type</h3>
            <Form.Item name="idType" className="mb-0">
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
            <Form.Item name="idNo" className="mb-0">
              <Input placeholder="Enter your ID number" />
            </Form.Item>
          </Space>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default GuestDetailsInfo;
