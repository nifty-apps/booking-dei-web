import { useQuery } from "@apollo/client";
import { Form, Input, Modal, Select, Space, Table } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import TitleText from "../../components/Title";
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
import { RootState } from "../../store";
import { FaRegEdit } from "react-icons/fa";

const GuestLookUp = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchText, setSearchText] = useState("");
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  const [form] = Form.useForm();

  // fetch contacts data by_opu
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const guests = contactsData?.contacts || [];

  // Filter guest based on search text
  const filteredGuestList = guests.filter((guestInformation) => {
    const lowercaseSearchText = searchText.toLowerCase();
    return (
      guestInformation?.name?.toLowerCase().includes(lowercaseSearchText) ||
      guestInformation?.phone?.toLowerCase().includes(lowercaseSearchText) ||
      guestInformation?.idType?.toLowerCase().includes(lowercaseSearchText) ||
      guestInformation?.address?.toLowerCase().includes(lowercaseSearchText) ||
      guestInformation?.idNo?.toString().includes(lowercaseSearchText)
      //here idNo is Number type thats why convirted to string first to filter
    );
  });

  const dataSource = filteredGuestList.map((guestInformation) => ({
    key: guestInformation._id,
    name: guestInformation.name,
    phone: guestInformation.phone,
    idType: guestInformation.idType,
    idNo: guestInformation.idNo,
    address: guestInformation.address,
    hotel: guestInformation.hotel,
    type: guestInformation.type,
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
      title: "ID NUMBER",
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
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <div className="flex gap-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <FaRegEdit
                size={18}
                onClick={() => {
                  setIsModalOpenUpdate(true);
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
        <TitleText text="Guest List" />
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
        <Form
          form={form}
          // onValuesChange={(values) => {
          //   setContact({ ...contact, ...values });
          // }}
          // onFinish={handleUpdateContact}
        >
          <Space direction="vertical" className="w-full">
            <h3>Full Name</h3>
            <Form.Item name="name" className="mb-0">
              <Input
                type="text"
                placeholder="Enter name"
                // value={contactInfo?.name}
              />
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
            Update
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default GuestLookUp;
