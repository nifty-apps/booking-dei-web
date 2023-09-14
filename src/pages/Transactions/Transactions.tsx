import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import TitleText from "../../components/Title";

interface DataType {
  key: React.Key;
  roomNumber: string;
  contact: string;
  BookingAmount: string;
  PaidAmount: string;
  DueAmount: string;
  action: React.ReactNode;
}

const columns: ColumnsType<DataType> = [
  { title: "ROOM NUMBER", dataIndex: "roomNumber" },
  { title: "CONTACT", dataIndex: "contact" },
  { title: "BOOKING AMOUNT", dataIndex: "BookingAmount" },
  { title: "PAID AMOUNT", dataIndex: "PaidAmount" },
  { title: "DUE AMOUNT", dataIndex: "DueAmount" },
  { title: "ACTIONS", dataIndex: "action" },
];

const Transactions = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      roomNumber: "101",
      contact: "1234567890",
      BookingAmount: "1000",
      PaidAmount: "500",
      DueAmount: "500",
      action: (
        <>
          <AiOutlineEdit className="text-2xl mx-2 text-green-500" />
          <AiOutlineDelete className="text-2xl mx-2 text-red-500" />
        </>
      ),
    });
  }

  return (
    <div className="p-5">
      {/* Transactions title */}
      <TitleText text={"Transactions"} />

      {/* table */}
      <div className="my-4">
        <span>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default Transactions;
