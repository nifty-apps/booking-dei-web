import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Modal, Select, Space, Table, message, } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import TitleText from "../../components/Title";
import { RootState } from "../../store";
import { FaRegEdit } from "react-icons/fa";
import { UPDATE_CONTACT } from "../../graphql/mutations/contactMutations";
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
import { Contact } from "../../graphql/__generated__/graphql";

const GuestLookUp = () => {

  const { user } = useSelector((state: RootState) => state.auth);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);

  const [form] = Form.useForm();

  // Fetch data based on the hotel id
  const {
    data: contactsData,
    loading,
    error,
  } = useQuery(GET_CONTACTS, {
    variables: {
      filter: {
        hotel: user?.hotels[0] || "",
      },
    },
  });

  // Filter contacts based on search text
  const filteredContacts = contactsData?.contacts?.filter((Contact) => {

    const { name, phone, type, idType, address, idNo } = Contact;
    const lowercaseSearchText = searchText.toLowerCase();
    return (
      name?.toLowerCase().includes(lowercaseSearchText) ||
      phone?.toLowerCase().includes(lowercaseSearchText) ||
      type?.toLowerCase().includes(lowercaseSearchText) ||
      idType?.toLowerCase().includes(lowercaseSearchText) ||
      address?.toLowerCase().includes(lowercaseSearchText) ||
      JSON.stringify(idNo)?.toLowerCase().includes(lowercaseSearchText)
    );
  });

  // update contact api call
  const [updateContact] = useMutation(UPDATE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });

  // Update contact
  const onFinish = async (values: Contact, contactId: string) => {
    try {
      // update contact
      await updateContact({
        variables: {
          updateContactInput: {
            _id: contactId,
            name: values.name,
            phone: values.phone,
            address: values.address,
            idNo: Number(values.idNo),
            idType: values.idType,
          },
        },
      });
      message.success("Contact updated successfully.");
      setIsModalOpen(false);
    } catch (error) {
      message.error("An error occurred while updating the contact.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const dataSource = filteredContacts?.map((contact) => ({
    key: contact._id,
    name: contact.name,
    phone: contact.phone,
    address: contact.address || null,
    idType: contact.idType || null,
    idNo: contact.idNo || null,
    type: contact.type,
    action: contact._id,
  }));

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "TYPE",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "ID NO",
      dataIndex: "idNo",
      key: "idNo",
    },
    {
      title: "ID TYPE",
      dataIndex: "idType",
      key: "idType",
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: (record: string) => {
        return (
          <div className="flex gap-4">
            <Button type="text" className=" text-blue-500">
              Guest Details
            </Button>
            <div className="flex items-center gap-3 cursor-pointer">
              <FaRegEdit
                onClick={() => {
                  setIsModalOpen(true);
                  setEditingContactId(record);
                  const editedContact = dataSource?.find(
                    (item) => item.key === record
                  );
                  form.setFieldsValue({
                    name: editedContact?.name,
                    phone: editedContact?.phone,
                    idNo: editedContact?.idNo,
                    address:editedContact?.address,
                    idType: editedContact?.idType,
                  });
                }}
              />
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="mb-5">
        <TitleText text="Guest Look-up" />
      </div>
      <div className="flex align-middle justify-between mb-3">
        <div className="w-3/12">
          <Input
            placeholder="Search here.."
            allowClear
            size="middle"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
      </div>

      <Table dataSource={dataSource} columns={columns} pagination={false} />

      {/* Modal for edit contacts */}
      <Modal
        title="Edit Guest Information"
        visible={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <Form
          form={form}
          onFinish={(values) => onFinish(values, editingContactId || "")}
        >
          <Space direction="vertical" className="w-full">
            <h3>Name</h3>
            <Form.Item name="name" className="mb-0">
              <Input placeholder="Name" autoComplete="off" />
            </Form.Item>

            <h3>Phone</h3>
            <Form.Item name="phone" className="mb-0">
              <Input placeholder="phone" autoComplete="off" />
            </Form.Item>

            <h3>Address</h3>
            <Form.Item name="address" className="mb-0">
              <Input placeholder="address" autoComplete="off" />
            </Form.Item>

            <h3>ID No</h3>
            <Form.Item name="idNo" className="mb-0">
              <Input placeholder="Id no" autoComplete="off" />
            </Form.Item>

            <h3>ID Type</h3>
            <Form.Item name="idType" className="mb-0">
              <Select
                placeholder="Select Type"
                options={[
                  { value: "DRIVING_LICENSE", label: "DrivingLicense" },
                  { value: "NID", label: "Nid" },
                  { value: "PASSPORT", label: "Passport" },
                ]}
              />
            </Form.Item>
          </Space>

          <div className="flex justify-end">
            <button
              type="submit"
              className=" mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-8 rounded">
              Edit Contact
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default GuestLookUp;