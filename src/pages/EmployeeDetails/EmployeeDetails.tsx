import { useQuery } from "@apollo/client";
import {   
    Input,   
    Table,   
} from "antd";

import { useSelector } from "react-redux";
import TitleText from "../../components/Title";
import { RootState } from "../../store";
import {  useParams } from "react-router-dom";
import { GET_TRANSACTION_BY_FILTER } from "../../graphql/queries/transactionsQueries";
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
const EmployeeDetails = () => {
    const { userid} = useParams();   
    const { user } = useSelector((state: RootState) => state.auth);  
  
    const { data: employeeData, loading, error } = useQuery(GET_TRANSACTION_BY_FILTER, {
        variables: {
            transactionFilter: {
                hotel: user?.hotels[0] || "",
                user: userid,
            },
        },
    });

    const { data: contact} = useQuery(GET_CONTACTS, {
      variables: {
          filter: {
              hotel: user?.hotels[0] || "",
              _id: userid
          },
      },
  });

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
//  filtering transaction 
    const dataSource = employeeData?.transactionByFilter?.map((employeeInformation) => ({
        key: employeeInformation?._id,
        name:employeeInformation.contact.name,
        date: employeeInformation?.date,
        subCategory: employeeInformation?.subCategory,
        method: employeeInformation?.method,
        amount: employeeInformation?.amount,    
        category:employeeInformation?.category    
    }));
   
    const columns = [
        {
            title: "DATE",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "SUB-CATEGORY",
            dataIndex: "subCategory",
            key: "subCategory",
        },       
        {
            title: "BANK",
            dataIndex: "method",
            key: "method",
        },
        {
            title: "AMOUNT",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "CATEGORY",
            dataIndex: "category",
            key: "category",
        },
     
    ];

   

    return (
        <>
            <div className="mb-5">
                <TitleText text="Specific Employee Details" /> 
                <br />
                <h1 className="text-primary">Employee Name : {contact?.contacts[0]?.name}</h1>
                <h1>Employee Phone : {contact?.contacts[0]?.phone}</h1>
            </div>
            <div className="flex items-center justify-between mb-3">
                <div className="w-3/12">
                    <Input
                        placeholder="Search here.."
                        allowClear
                        size="middle"                       
                    />
                </div>
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={false} />          
        </>
    );
};

export default EmployeeDetails;
