import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import TitleText from "../../components/Title";

interface DataType {
  key: React.Key;
  date: string;
  contact: string;
  category: string;
  subCategory: string;
  method: string;
  description: string;
  amount: string;
  action: React.ReactNode;
}

const columns: ColumnsType<DataType> = [
  { title: "Date", dataIndex: "date" },
  { title: "Contact", dataIndex: "contact" },
  { title: "Category", dataIndex: "category" },
  { title: "Sub-Category", dataIndex: "subCategory" },
  { title: "Method", dataIndex: "method" },
  { title: "Description", dataIndex: "description" },
  { title: "Amount", dataIndex: "amount" },
  { title: "Action", dataIndex: "action" },
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
      date: `2023-08-${i + 1}`,
      contact: `Contact ${i}`,
      category: `Category ${i}`,
      subCategory: `Sub-Category ${i}`,
      method: `Method ${i}`,
      description: `Description ${i}`,
      amount: `${i * 100}`,
      action: (
        <div className="flex items-center gap-5">
          <AiOutlineEdit />
          <AiOutlineDelete />
        </div>
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
