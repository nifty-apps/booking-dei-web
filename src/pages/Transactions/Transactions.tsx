import { useQuery } from "@apollo/client";
import { DatePicker, Input, Table } from "antd";
import { format } from "date-fns";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TitleText from "../../components/Title";
import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_BY_DATE_RANGE,
} from "../../graphql/queries/transactionsQueries";
import { RootState } from "../../store";

const { RangePicker } = DatePicker;

const Transactions = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedDateRange, setSelectedDateRange] = useState<[string, string]>([
    dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    format(new Date(), "yyyy-MM-dd"),
  ]);
  const [searchText, setSearchText] = useState("");

  const { data: transactionsData, loading, error } = useQuery(GET_TRANSACTIONS);

  // Fetch data based on the selected date range
  const { data: transactionsByDateRangeData } = useQuery(
    GET_TRANSACTIONS_BY_DATE_RANGE,
    {
      variables: {
        hotelId: user?.hotels[0] || "",
        startDate: selectedDateRange[0],
        endDate: selectedDateRange[1],
      },
      skip: !selectedDateRange[0] || !selectedDateRange[1], // Skip the query if dates are not selected
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const transactions = transactionsData?.transactions || [];
  const transactionsByDateRange =
    transactionsByDateRangeData?.transactionsByDateRange || [];

  // Combine the data from both queries based on date range
  const combinedTransactions = selectedDateRange[0]
    ? transactionsByDateRange
    : transactions;

  // Filter transactions based on search text
  const filteredTransactions = combinedTransactions.filter((transaction) => {
    const lowercaseSearchText = searchText.toLowerCase();
    return (
      transaction?.date.toLowerCase().includes(lowercaseSearchText) ||
      transaction?.contact?.name.toLowerCase().includes(lowercaseSearchText) ||
      transaction?.category?.toLowerCase().includes(lowercaseSearchText) ||
      transaction?.subCategory?.toLowerCase().includes(lowercaseSearchText) ||
      transaction?.method.toLowerCase().includes(lowercaseSearchText)
    );
  });

  const dataSource = filteredTransactions.map((transaction) => ({
    key: transaction._id,
    date: format(new Date(transaction.date), "yyyy-MM-dd"),
    contact: transaction.contact.name,
    category: transaction.category,
    subCategory: transaction.subCategory,
    method: transaction.method,
    amount: transaction.amount,
    description: transaction.description,
    actions: transaction.booking,
  }));

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
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
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
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      render: (bookingId: string) => {
        return (
          <>
            {bookingId && (
              <Link
                to={`/booking-details/${bookingId}`}
                className="text-blue-500 hover:text-blue-700"
              >
                Booking Details
              </Link>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-5">
        <TitleText text="Transactions" />
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
        <RangePicker
          allowClear={true}
          format="YYYY-MM-DD"
          value={
            selectedDateRange[0] && selectedDateRange[1]
              ? [dayjs(selectedDateRange[0]), dayjs(selectedDateRange[1])]
              : undefined
          }
          onChange={(dates) =>
            setSelectedDateRange([
              dates?.[0]?.format("YYYY-MM-DD") || "",
              dates?.[1]?.format("YYYY-MM-DD") || "",
            ])
          }
        />
      </div>

      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </>
  );
};

export default Transactions;
