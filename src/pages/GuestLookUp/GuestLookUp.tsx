import { useQuery } from "@apollo/client";
import { Input, Table } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import TitleText from "../../components/Title";
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
import { RootState } from "../../store";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const GuestLookUp = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchText, setSearchText] = useState("");

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

  const contacts = contactsData?.contacts || [];

  const filteredContacts = contacts.filter((contact) => {
    const lowercaseSearchText = searchText.toLowerCase();
    return (
      contact?.name?.toLowerCase().includes(lowercaseSearchText) ||
      contact?.phone?.toLowerCase().includes(lowercaseSearchText) ||
      contact?.idType?.toLowerCase().includes(lowercaseSearchText) ||
      contact?.address?.toLowerCase().includes(lowercaseSearchText) ||
      contact?.type?.toLowerCase().includes(lowercaseSearchText) ||
      contact?.idNo?.toString().toLowerCase().includes(lowercaseSearchText)
    );
  });

  const dataSource = filteredContacts.map((contact) => ({
    key: contact._id,
    name: contact.name,
    phone: contact.phone,
    idType: contact.idType,
    idNo: contact.idNo,
    address: contact.address,
    hotel: contact.hotel,
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
      title: "ID-TYPE",
      dataIndex: "idType",
      key: "idType",
    },
    {
      title: "ID-NUMBER",
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
              <FaRegEdit size={18} />
              <FaRegTrashAlt />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-5">
        <TitleText text="Contacts Information" />
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
    </>
  );
};

export default GuestLookUp;
