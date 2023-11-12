import { useMutation, useQuery } from "@apollo/client";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { BiUserCircle } from "react-icons/bi";
import {FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import {   
    Input,   
    Modal,   
    Table,
    message,   
} from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TitleText from "../../components/Title";
import { RootState } from "../../store";
import {  Link, useParams } from "react-router-dom";
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
import {  GET_TRANSACTION_BY_FILTER } from "../../graphql/queries/transactionsQueries";
import { REMOVE_TRANSACTION } from "../../graphql/mutations/transactionMutations";
const { confirm } = Modal;
const EmployeeDetails = () => {
    const { userid} = useParams();   
    const { user } = useSelector((state: RootState) => state.auth);  
    const [searchText, setSearchText] = useState<string>("");
    
  
    const { data: employeeData, loading, error,refetch: refetchTransactions} = useQuery(GET_TRANSACTION_BY_FILTER, {
        variables: {
            transactionFilter: {
                contact:userid
            },
        },
    });
    
    useEffect(() => {
        // Refetch transactions when the component mounts (page reload)
        refetchTransactions({
            transactionFilter: {
                contact: userid,
            },
        });
    }, [refetchTransactions, userid]);

    const { data: contactData} = useQuery(GET_CONTACTS, {
      variables: {
          filter: {
              hotel: user?.hotels[0] || "",
              _id: userid
          },
      },
  });

   // remove transaction
   const [removeTransaction] = useMutation(REMOVE_TRANSACTION, {
    refetchQueries: [
      {
        query: GET_TRANSACTION_BY_FILTER,
        variables: {
          transactionFilter: {
            contact: userid,
          },
        },
      },
    ],
  });
  

  const handleRemoveTransaction = async (transactionId: string) => {
    confirm({
      title: "Do you want to delete this transaction?",
      icon: <ExclamationCircleFilled />,
      okType: "danger",
      async onOk() {
        try {
          await removeTransaction({ variables: { id: transactionId } });
          message.success("Transaction deleted successfully.");
        } catch (error) {
          message.error("An error occurred while deleting the transaction.");
        }
      },
    });
  };

// filter Guest by name, date, category, subCategory, method, and amount
const filteredEmployeeList = employeeData?.transactionByFilter.filter((employeeInformation) => {
    const lowercaseSearchText = searchText.toLowerCase();
    const formattedDate = new Date(employeeInformation?.date).toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  
    return (
      employeeInformation?.contact.name?.toLowerCase().includes(lowercaseSearchText) ||
      formattedDate.includes(lowercaseSearchText) ||
      employeeInformation?.category?.toLowerCase().includes(lowercaseSearchText) ||
      employeeInformation?.subCategory?.toLowerCase().includes(lowercaseSearchText) ||
      employeeInformation?.method?.toLowerCase().includes(lowercaseSearchText) ||
      employeeInformation?.amount?.toString().toLowerCase().includes(lowercaseSearchText) 
    );
  });

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    //  filtering transaction 
    const dataSource = filteredEmployeeList?.map((employeeInformation) => ({
        key: employeeInformation?._id,
        name:employeeInformation.contact.name,
        date:new Date(employeeInformation?.date).toLocaleDateString(),
        subCategory: employeeInformation?.subCategory,
        method: employeeInformation?.method,
        amount: employeeInformation?.amount,    
        category:employeeInformation?.category,
        action: employeeInformation.booking || employeeInformation._id,
    }));
   
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
            title: "ACTION",
            dataIndex: "action",
            key: "action",
            render: (bookingId: string | undefined, record: { key: string }) => {
            return (
           <div className="flex gap-3 items-center cursor-pointer">
                 {bookingId && (
            <Link
            to={`/booking-details/${bookingId}`}
            className="text-blue-500 hover:text-blue-700"
            >
            Booking Details
              </Link>
            )}
            <div className="flex items-center gap-3 cursor-pointer">
              <FaRegTrashAlt
                onClick={() => handleRemoveTransaction(record.key)}
              />
            </div>
          </div>
              );
            },
          },
       
    ];

   

    return (
        <>
            <div className="mb-5">
                <TitleText text="Employee's Transaction Details" />
            </div>
            <div className="py-5 px-2 flex">
                <div>
                    <span className="text-5xl text-gray-600"><BiUserCircle /></span>
                </div>
                <div className="pl-2">
                    <span className="text-lg block font-semibold text-gray-700">{contactData?.contacts[0].name}</span>
                    <span className="block text-sm font-semibold text-gray-600">{contactData?.contacts[0].phone}</span>
                </div>
            </div>
            <div className="flex items-center justify-between mb-3">
                <div className="w-3/12">
                    <Input
                        placeholder="Search here.."
                        allowClear
                        size="middle"
                        value={searchText}                       
                        onChange={(e)=>setSearchText(e.target.value)}
                    />
                </div>
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={false} />          
        </>
    );
};

export default EmployeeDetails;
