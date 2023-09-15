import { useQuery } from "@apollo/client";
import { DatePicker, Input, Table } from "antd";
import { format } from "date-fns";
import { ChangeEvent, useState } from "react";
import { GET_TRANSACTIONS } from "../../graphql/queries/transactionsQueries";

const columns = [
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "CONTACT",
    dataIndex: "contact",
    key: "contact",
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "SUB-CATEGORY",
    dataIndex: "subCategory",
    key: "subCategory",
  },
  {
    title: "METHOD",
    dataIndex: "method",
    key: "method",
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "DESCRIPTION",
    dataIndex: "description",
    key: "description",
  },
];

const Transactions = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);
  const [searchByText, setSearchByText] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const onChange = () => {
    console.log("something changed");
  };

  const onOk = () => {
    console.log("ok");
  };

  const searchTransaction = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchByText(e.target.value);
  };

  const filteredDataSource = data?.transactions.filter((transaction) => {
    const lowercaseSearchText = searchByText.toLowerCase();

    // Check if any of the fields match the search text
    return (
      transaction.date.toLowerCase().includes(lowercaseSearchText) ||
      transaction.contact.name.toLowerCase().includes(lowercaseSearchText) ||
      transaction?.category?.toLowerCase().includes(lowercaseSearchText) ||
      transaction?.subCategory?.toLowerCase().includes(lowercaseSearchText) ||
      transaction.method.toLowerCase().includes(lowercaseSearchText)
    );
  });

  const dataSource = filteredDataSource?.map((transaction) => ({
    key: transaction._id,
    date: format(new Date(transaction.date), "yyyy-MM-dd"),
    contact: transaction.contact.name,
    category: transaction.category,
    subCategory: transaction.subCategory,
    method: transaction.method,
    amount: transaction.amount,
    description: transaction.description,
  }));

  return (
    <>
      <div className="flex align-middle justify-between mb-3">
        <div className="w-3/12">
          <Input
            placeholder="Search here.."
            allowClear
            size="middle"
            onChange={searchTransaction}
            value={searchByText}
          />
        </div>

        <DatePicker showTime onChange={onChange} onOk={onOk} />
      </div>
      {/* Transaction table */}
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default Transactions;
