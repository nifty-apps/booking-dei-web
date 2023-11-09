import { useQuery } from "@apollo/client";
import {
    Button,
    Input,
    Switch,
    Table,
    Tooltip
} from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import TitleText from "../../components/Title";


import { RootState } from "../../store";
import { useParams } from "react-router-dom";
import { GET_TRANSACTION_BY_FILTER } from "../../graphql/queries/transactionsQueries";
import { FaRegEdit } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
const VendorDetails = () => {
    const { userid } = useParams();
    const { user } = useSelector((state: RootState) => state.auth);
    const [filterDeactivated, setFilterDeactivated] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");

    // fetching data using User ID

    const { data: vendorData, loading, error } = useQuery(GET_TRANSACTION_BY_FILTER, {
        variables: {
            transactionFilter: {
                hotel: user?.hotels[0] || "",
                contact: userid,
            },
        },
    });

    const filteredGuestList = vendorData?.transactionByFilter?.filter((guestInformation) => {
        const lowercaseSearchText = searchText.toLowerCase();
        return (
          guestInformation?.date?.toLowerCase().includes(lowercaseSearchText) ||
          guestInformation?.subCategory?.toLowerCase().includes(lowercaseSearchText) ||
          guestInformation?.method?.toLowerCase().includes(lowercaseSearchText) ||
          guestInformation?.amount?.toString().includes(lowercaseSearchText)
        );
      });


    const { data: contactData} = useQuery(GET_CONTACTS, {
        variables: {
            filter: {
                hotel: user?.hotels[0] || "",
                _id: userid
            },
        },
    });    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const dataSource = filteredGuestList?.map((guestInformation) => ({
        key: guestInformation?._id,
        name: guestInformation?.date.split("T")[0],
        phone: guestInformation?.subCategory,
        idType: guestInformation?.method,
        idNo: guestInformation?.amount,
    }));


    const columns = [
        {
            title: "DATE",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "SUB-CATEGORY",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "METHOD",
            dataIndex: "idType",
            key: "idType",
        },
        {
            title: "AMOUNT",
            dataIndex: "idNo",
            key: "idNo",
        },
        {
            title: "ACTION",
            dataIndex: "action",
            key: "action",
            render: () => {
                return (
                    <div className="flex items-center cursor-pointer">
                        <Button
                            type="link"
                        >
                            <span className="underline mr-1">More</span> {">"}
                        </Button>
                        <div className="mr-3">
                            <FaRegEdit
                                title={"Edit Guest Information"}
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
                <TitleText text="Vendor Details" />
            </div>
            <div className="py-5 px-2 flex">
                <div>
                    <span className="text-5xl text-gray-700"><BiUserCircle /></span>
                </div>
                <div className="pl-2">
                    <span className="text-lg block font-semibold text-gray-700">{contactData?.contacts[0].name}</span>
                    <span className="block text-sm font-semibold text-gray-700">{contactData?.contacts[0].phone}</span>
                </div>
            </div>
            <div className="flex items-center justify-between mb-3">
                <div className="w-3/12">
                    <Input
                        placeholder="Search here.."
                        allowClear
                        size="middle"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <Tooltip
                    title={`See ${filterDeactivated ? "Active" : "All"} Guests`}
                    placement="bottomRight"
                    className="cursor-pointer"
                >
                    <span className="mr-1">See All Guests</span>
                    <Switch
                        className={`${filterDeactivated ? "" : "bg-gray-400"}`}
                        defaultChecked={false}
                        onChange={() => setFilterDeactivated(!filterDeactivated)}
                    />
                </Tooltip>
            </div>

            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </>
    );
};

export default VendorDetails;
