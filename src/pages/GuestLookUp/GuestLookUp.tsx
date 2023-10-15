import { useQuery } from "@apollo/client";
import {
  Input,
  Table,
} from "antd";
import TitleText from "../../components/Title";
import { Modal } from 'antd';
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const GuestLookUp = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filter = {
    filter: {
      hotel: user!.hotels[0],
    },
  };
  const [searchText, setSearchText] = useState("");

  const { data: contactsData, error: contactError, loading } = useQuery(GET_CONTACTS, {
    variables: filter,
  });

  if (loading) return <p>Loading...</p>;
  if (contactError) return <p>Error: {contactError.message}</p>;

  const contacts = contactsData?.contacts || [];
  // filtered contacts
  const filteredContacts = contacts.filter((contact) => {
    const lowercaseSearchText = searchText.toLowerCase();
    return (
      contact.name.toLowerCase().includes(lowercaseSearchText) ||
      contact.phone.toLowerCase().includes(lowercaseSearchText) ||
      contact.idType?.toLowerCase().includes(lowercaseSearchText) ||
      (contact.idNo !== null && contact.idNo?.toString().includes(lowercaseSearchText)) ||
      contact.hotel?.toLowerCase().includes(lowercaseSearchText) ||
      contact.type?.toLowerCase().includes(lowercaseSearchText)
    );
  });
  const dataSource = filteredContacts.map((contact) => ({
    key: contact._id,
    name: contact.name,
    phone: contact.phone,
    idType: contact.idType,
    idNo: contact.idNo,
    address: contact.address,
    type: contact.type,
    action: "delete"
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
      dataIndex: "action",
      key: "action",
      render: () => (
        <div className="flex gap-4 cursor-pointer">
          <span onClick={openModal}>
            <FaRegEdit />
          </span>
          <span onClick={openModal}>
            <FaRegTrashAlt />
          </span>
        </div>
      )
    },
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
      {/* demo modal */}
      <Modal
        title="This Feature is under development"
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <p>
          Comming soon !
        </p>
      </Modal>
    </>
  );
};

export default GuestLookUp;