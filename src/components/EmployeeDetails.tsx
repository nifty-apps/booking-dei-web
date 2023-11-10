import { useState } from "react";
import { DatePicker, Input, Table } from "antd";
import dayjs from "dayjs";
import TitleText from "./Title";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useParams } from "react-router-dom";
import { GET_TRANSACTION_FILTER } from "../graphql/queries/transactionsQueries";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { UserOutlined } from "@ant-design/icons";
import { GET_CONTACTS } from "../graphql/queries/contactQueries";

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

  // fetch employee transactions data
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

  // fetch employee details
  const {
    data: employeeInfoData,
    loading: loadingEmployeeInfo,
    error: errorEmployeeInfo,
  } = useQuery(GET_CONTACTS, {
    variables: {
      filter: {
        hotel: user?.hotels[0] || "",
        _id: employeeId, // filter by employee id
      },
    },
  });

  console.log(employeeInfoData?.contacts[0]);

  //   show loading state for employee transactions data
  if (loading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;

  // show loading state for employee info data
  if (loadingEmployeeInfo) return <p>Loading</p>;
  if (errorEmployeeInfo) return <p>{errorEmployeeInfo.message}</p>;

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
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: (date: string) => {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
          return "Invalid Date";
        }
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const day = String(parsedDate.getDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      },
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => {
        return (
          <div className="flex gap-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <FaRegEdit />
              <FaRegTrashAlt />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-7">
        <TitleText text="Employee Details" />
      </div>
      <div className="mb-7 flex items-center gap-4">
        <UserOutlined
          size={60}
          className="border-2 border-gray-500 text-gray-500 bg-gray-200/80 rounded-full w-16 h-16 text-5xl"
        />
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-1">
            {employeeInfoData?.contacts[0]?.name || "Loading..."}
          </h3>
          <p className=" text-gray-600 font-medium text-lg">
            {employeeInfoData?.contacts[0]?.phone || "Loading..."}
          </p>
        </div>
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
