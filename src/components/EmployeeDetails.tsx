import { useState } from "react";
import { DatePicker, Input, Table } from "antd";
import dayjs from "dayjs";
import TitleText from "./Title";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useParams } from "react-router-dom";
import { GET_TRANSACTION_FILTER } from "../graphql/queries/transactionsQueries";
const { RangePicker } = DatePicker;

const EmployeeDetails = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<[string, string]>([
    dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ]);
  const [searchText, setSearchText] = useState("");
  const { user } = useSelector((state: RootState) => state.auth);
  const { employeeId } = useParams();

  //  fetch transaction data
  // Ensure that employeeId is always a string
  const employeeIdAsString = String(employeeId);

  const {
    data: transactionsData,
    loading,
    error,
  } = useQuery(GET_TRANSACTION_FILTER, {
    variables: {
      hotelId: user?.hotels[0] || "",
      contactId: employeeIdAsString,
    },
  });
  console.log(transactionsData?.transactionByFilter);

  //   show loading state
  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  const dataSource = transactionsData?.transactionByFilter?.map(
    (employeeInformation) => ({
      name: employeeInformation.contact.name,
      date: employeeInformation?.date,
      category: employeeInformation?.category,
      subCategory: employeeInformation?.subCategory,
      method: employeeInformation?.method,
      amount: employeeInformation?.amount,
    })
  );

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "SUB CATEGORY",
      dataIndex: "subCategory",
      key: "subCategory",
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
  ];

  return (
    <>
      <div className="mb-5">
        <TitleText text="Employee Details" />
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
      <div className="flex align-middle justify-between mb-3">
        <div className="w-3/12"></div>
      </div>

      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </>
  );
};

export default EmployeeDetails;
