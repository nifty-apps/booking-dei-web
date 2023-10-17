import { Contact } from '../../graphql/__generated__/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_CONTACT } from '../../graphql/mutations/contactMutations';
import {
  Form,
  Input,
  Select,
  Space,
  Table,
  message
} from "antd";
import TitleText from "../../components/Title";
import { Modal } from 'antd';
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const GuestLookUp = () => {
  const [updateContact] = useMutation(UPDATE_CONTACT);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContactId, setEditingContactId] = useState<
  string | null
  >(null);
  const [searchText, setSearchText] = useState("");
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const [form] = Form.useForm();
  const filter = {
    filter: {
      hotel: user!.hotels[0],
    },
  };
  
  const { data: contactsData, error: contactError, loading } = useQuery(GET_CONTACTS, {
    variables: filter,
  });
  const contacts = contactsData?.contacts || [];    

  if (loading) return <p>Loading...</p>;
  if (contactError) return <p>Error: {contactError.message}</p>;

  // filtered contacts
  const filteredContacts = contacts.filter((contact) => {
    const lowercaseSearchText = searchText.toLowerCase();
    return (
      contact.name.toLowerCase().includes(lowercaseSearchText) ||
      contact.phone.toLowerCase().includes(lowercaseSearchText) ||
      contact.idType?.toLowerCase().includes(lowercaseSearchText) ||
      (contact.idNo !== null && !!contact.idNo?.includes(lowercaseSearchText)) ||
      contact.hotel?.toLowerCase().includes(lowercaseSearchText) ||
      contact.type?.toLowerCase().includes(lowercaseSearchText)
    );
  });

// Then, in your onFinish function:

const onFinish = async (values: Contact, contactId: string) => {
  const idNoAsFloat = typeof values.idNo === 'number' ? (values.idNo as number).toString() : values.idNo;

  try {
    const res = await updateContact({
      variables: {
        updateContactInput: {
          _id: contactId,
          name: values.name,
          phone: values.phone,
          idType: values.idType,
          idNo: idNoAsFloat,
          address: values.address,
          type: values.type,
        },
      },
    });
    message.success("Contact updated successfully.");    
  } catch (error) {    
    message.error("An error occurred while updating the contact");
  }
};

const dataSource = filteredContacts.map((contact) => ({
  key: contact._id,
  name: contact.name,
  phone: contact.phone,
  idType: contact.idType,
  idNo: contact.idNo,
  address: contact.address,
  type: contact.type,
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
    title: "ID TYPE",
    dataIndex: "idType",
    key: "idType",
  },
  {
    title: "ID NO",
    dataIndex: "idNo",
    key: "idNo",
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
    title: "Action",
    dataIndex: "key",
    key: "action",
    render: (recordkey:string) => (
      <div className="flex gap-4 cursor-pointer">
        <span onClick={() => {          
          openModal()
          setEditingContactId(recordkey);
          const editedContact = contacts.find((contact) => contact._id === recordkey);

          form.setFieldsValue({
            name: editedContact?.name,
            phone: editedContact?.phone,
            idType: editedContact?.idType,
            idNo: editedContact?.idNo,
            address: editedContact?.address,
            type: editedContact?.type
          });

        }}>
          <FaRegEdit
          />
        </span>
        <span>
          <FaRegTrashAlt />
        </span>
      </div>
    )
  }

];




  return (
    <>
      <div className="mb-5">
        <TitleText text="Guest LookUp" />
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
      {/* update contact modal */}
      <Modal
        title="Edit Contact"
        visible={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
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
              <Input placeholder="Phone" autoComplete="off" />
            </Form.Item>

            <h3>ID Type</h3>
            <Form.Item name="idType" className="mb-0">
              <Select
                placeholder="ID Type"
                options={[
                  { value: "NID", label: "Nid" },
                  { value: "DRIVING_LICENSE", label: "DRIVING LICENSE" },
                ]}
              />
            </Form.Item>
            <h3>ID No</h3>

            <Form.Item name="idNo" className="mb-0">
              <Input type="number" placeholder="ID No" autoComplete="off" />
            </Form.Item>

            <h3>Address</h3>
            <Form.Item name="address" className="mb-0">
              <Input placeholder="Address" autoComplete="off" />
            </Form.Item>
          </Space>

          <h3>Type</h3>
          <Form.Item name="type" className="mb-0">
            <Select
              placeholder="Type"
              options={[
                { value: "VENDOR", label: "Vendor" },
                { value: "CUSTOMER", label: "Customer" },
                { value: "EMPLOYEE", label: "Employee" },
              ]}
            />
          </Form.Item>

          <div className="flex justify-end">
            <button
              type="submit"
              className=" mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-8 rounded"
            >
              Update Contact
            </button>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default GuestLookUp