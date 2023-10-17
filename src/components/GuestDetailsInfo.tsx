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
  UpdateContactInput,
} from "../graphql/__generated__/graphql";
import {
  CREATE_CONTACT,
  UPDATE_CONTACT,
} from "../graphql/mutations/contactMutations";
import { GET_CONTACTS } from "../graphql/queries/contactQueries";
import { RootState } from "../store";
interface GuestDetailsInfoProps {
  onSelect: (contact: Contact) => void;
  contactInfo?: Contact;
  isDetails: boolean;
  isEditing: boolean;
}

const GuestDetailsInfo = ({
  onSelect,
  contactInfo,
  isDetails,
  isEditing,
}: GuestDetailsInfoProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  const [createContact] = useMutation(CREATE_CONTACT);
  const [updateContact] = useMutation(UPDATE_CONTACT);

  const memoizedOnContact = useMemo(() => onSelect, [onSelect]);

  const [form] = Form.useForm();

  const [contact, setContact] = useState<Contact>({
    _id: contactInfo?._id || "",
    hotel: user?.hotels[0] || "",
    name: contactInfo?.name || "",
    phone: contactInfo?.phone || "",
    type: ContactTypes.Customer,
    detactivatedAt: "",
    idType: contactInfo?.idType,
    idNo: contactInfo?.idNo || "",
    address: contactInfo?.address || "",
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
            idNo: values.idNo,
            hotel: user?.hotels[0] || "",
            type: ContactTypes.Customer,
            detactivatedAt: new Date().toISOString(),
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
      message.error(`Something went wrong!`);
    }
  };

  // update contact
  const handleUpdateContact = async (values: UpdateContactInput) => {
    try {
      const res = await updateContact({
        variables: {
          updateContactInput: {
            ...values,
            _id: contact._id,
            name: values.name || "",
            phone: values.phone || "",
            idNo: values.idNo,
            type: ContactTypes.Customer,
            address: values.address || "",
          },
        },
      });
      console.log(res);
      message.success("Contact updated successfully!");
      setIsModalOpenUpdate(false);
    } catch (err) {
      message.error(`Something went wrong!`);
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

      {
        <div className="mb-4 grid grid-cols-5 gap-4">
          <div>
            <h3 className="mb-1">Full Name</h3>
            <p className="text-gray-600">
              {contactInfo?.name || "No name found"}
            </p>
          </div>
          <div>
            <h3 className="mb-1">Phone</h3>
            <p className="text-gray-600">
              {contactInfo?.phone || "No phone found"}
            </p>
          </div>
          <div>
            <h3 className="mb-1">ID Type</h3>
            <p className="text-gray-600">{contactInfo?.idType || "N/A"}</p>
          </div>
          <div>
            <h3 className="mb-1">ID No</h3>
            <p className="text-gray-600">{contactInfo?.idNo || "N/A"}</p>
          </div>
          <div>
            <h3 className="mb-1">Address</h3>
            <p className="text-gray-600">{contactInfo?.address || "N/A"}</p>
          </div>
        </div>
      }

      {
        <Form
          form={form}
          onValuesChange={(values) => {
            setContact({ ...contact, ...values });
          }}
          layout="vertical"
          className="flex items-center justify-between"
        >
          <Form.Item
            name="name"
            label="Full Name"
            className="w-48"
            initialValue={contactInfo?.name}
          >
            <Select
              disabled={!isEditing && isDetails}
              placeholder="Enter your name"
              className="w-48 custom__select"
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

          <Form.Item
            name="phone"
            label="Phone"
            className="w-48"
            initialValue={contactInfo?.phone}
          >
            <Select
              disabled={!isEditing && isDetails}
              placeholder="Enter phone number"
              className="w-48 custom__select"
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

          <Form.Item
            name="idType"
            label="ID Type"
            className="w-48"
            initialValue={contact?.idType}
          >
            <Select
              disabled={!isEditing && isDetails}
              placeholder="Enter ID Type"
              className="w-48 custom__select"
              options={[
                { value: "NID", label: "NID" },
                { value: "PASSPORT", label: "PASSPORT" },
              ]}
            />
          </Form.Item>

          <Form.Item
            className="w-48"
            name="idNo"
            label="ID No"
            initialValue={contactInfo?.idNo?.toString()}
          >
            <Input
              className="custom__input w-48"
              disabled={!isEditing && isDetails}
              placeholder="Enter ID Type"
            />
          </Form.Item>
          <Form.Item
            className="w-48"
            name="address"
            label="Address"
            initialValue={contactInfo?.address?.toString()}
          >
            <Input
              className="custom__input w-48"
              disabled={!isEditing && isDetails}
              placeholder="Enter ID Type"
            />
          </Form.Item>
        </Form>
      }
      {/* Update contact */}
      {isEditing && (
        <Button type="primary" size="middle" ghost>
          Update Contact
        </Button>
      )}

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

      {/*update contact modal */}
      <Modal
        title="Update Contact"
        open={isModalOpenUpdate}
        onOk={() => setIsModalOpenUpdate(false)}
        onCancel={() => {
          setIsModalOpenUpdate(false);
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdateContact}>
          <Space direction="vertical" className="w-full">
            <h3>Full Name</h3>
            <Form.Item
              className="w-full mb-0"
              name="name"
              initialValue={contactInfo?.name?.toString()}
            >
              <Input
                className="custom__input guest w-full"
                placeholder="Enter your name"
              />
            </Form.Item>

            <h3>Phone</h3>
            <Form.Item
              className="w-full mb-0"
              name="phone"
              initialValue={contactInfo?.phone?.toString()}
            >
              <Input
                className="custom__input guest w-full"
                placeholder="Enter phone number"
              />
            </Form.Item>

            <h3>ID Type</h3>
            <Form.Item
              name="idType"
              className="w-full mb-0"
              initialValue={contact?.idType?.toString()}
            >
              <Select
                placeholder="Enter ID Type"
                className="w-full guest custom__select"
                options={[
                  { value: "NID", label: "NID" },
                  { value: "PASSPORT", label: "PASSPORT" },
                ]}
              />
            </Form.Item>

            <h3>ID No</h3>
            <Form.Item
              className="w-full mb-0"
              name="idNo"
              initialValue={contactInfo?.idNo?.toString()}
            >
              <Input
                className="custom__input guest w-full"
                placeholder="Enter ID Type"
              />
            </Form.Item>

            <h3>Address</h3>
            <Form.Item
              className="w-full mb-0"
              name="address"
              initialValue={contactInfo?.address?.toString()}
            >
              <Input
                className="custom__input guest w-full"
                placeholder="Enter Address"
              />
            </Form.Item>
          </Space>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            Update
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default GuestDetailsInfo;
