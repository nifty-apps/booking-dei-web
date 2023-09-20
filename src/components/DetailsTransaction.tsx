import { useQuery } from "@apollo/client";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Transaction } from "../graphql/__generated__/graphql";
import { GET_TRANSACTION_BY_FILTER } from "../graphql/queries/transactionsQueries";
import { RootState } from "../store";
import TitleText from "./Title";

const DetailsTransaction = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { bookingId } = useParams();

  const { data, loading, error } = useQuery(GET_TRANSACTION_BY_FILTER, {
    variables: {
      transactionFilter: {
        hotelId: user?.hotels[0] || "",
        bookingId: bookingId,
        deletedAt: null,
      },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error - {error.message}</div>;

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const dataSource = data?.transactionByFilter?.map(
    (transaction: Transaction) => {
      return {
        key: transaction._id,
        date: transaction.date,
        description: transaction.description,
        method: transaction.method,
        amount: transaction.amount,
      };
    }
  );

  return (
    <>
      <div className="mb-4">
        <TitleText text={"Transaction Details"} />
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </>
  );
};

export default DetailsTransaction;
