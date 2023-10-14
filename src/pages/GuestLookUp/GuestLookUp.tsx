import { useQuery } from "@apollo/client";
import {
  DatePicker,
  Table,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import TitleText from "../../components/Title";
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const { RangePicker } = DatePicker;

const GuestLookUp = () => {
  const { user } = useSelector((state: RootState) => state.auth);  
  const [selectedDateRange, setSelectedDateRange] = useState<[string, string]>([
    dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ]);

  const filter = {
    filter: {
      hotel: user!.hotels[0],
    },
  };

  const { data: contactsData, error: contactError, loading } = useQuery(GET_CONTACTS, {
    variables: filter,
  }); 

  if (loading) return <p>Loading...</p>;
  if (contactError) return <p>Error: {contactError.message}</p>;

  const contacts = contactsData?.contacts || [];

  const dataSource = contacts.map((contact) => ({
    key: contact._id,
    name: contact.name,
    phone: contact.phone,
    idType: contact.idType,
    idNo: contact.idNo,
    address: contact.address,
    hotel: contact.hotel,
    type: contact.type,
  }));

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ID TYPE",
      dataIndex: "idType",
      key: "idType",
    },
    {
      title: "ID NO",
      dataIndex: "idNo",
      key: "idNo",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "HOTEL",
      dataIndex: "hotel",
      key: "hotel",
    },
    {
      title: "TYPE",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <>
      <div className="flex align-middle justify-between mb-3">
        <TitleText text="Guest LookUp" />
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

export default GuestLookUp;
