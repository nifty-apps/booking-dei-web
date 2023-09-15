import { useQuery } from "@apollo/client";
import { DatePicker, Input, Table } from "antd";
import { format } from "date-fns";
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const onChange = () => {
    console.log("something changed");
  };

  const onOk = () => {
    console.log("ok");
  };

  const searchInput = () => {
    console.log("searching");
  };

  const dataSource = data?.transactions.map((transaction) => ({
    key: transaction._id,
    date: format(new Date(transaction.date), "dd/MM/yyyy"),
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
            onChange={searchInput}
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
