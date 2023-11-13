import { ExclamationCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Switch,
  Table,
  Tooltip,
  message,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import TitleText from "../../components/Title";
import {
  Contact,
  ContactFilterInput,
} from "../../graphql/__generated__/graphql";
import { UPDATE_CONTACT } from "../../graphql/mutations/contactMutations";
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
import { RootState } from "../../store";
import { GET_BOOKING_GUEST } from "../../graphql/queries/bookingDetailsQueries";
import { Link } from "react-router-dom";
const { confirm } = Modal;
const GuestLookUp = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchText, setSearchText] = useState<string>("");
  const [handleModalOpen, setHandleModalOpen] = useState<boolean>(false);
  const [guestBookingModalOpen, setGuestBookingModalOpen] =
    useState<boolean>(false);
  const [filterDeactivated, setFilterDeactivated] = useState<boolean>(false);
  const [guestID, setGuestID] = useState<string | null>(null);
  const [customerID, setCustomerID] = useState<string | null>(null);
  const [form] = Form.useForm();

  // fetching data using Hotel ID
  const {
    data: guestData,
    loading,
    error,
  } = useQuery(GET_CONTACTS, {
    variables: {
      filter: {
        hotel: user?.hotels[0] || "",
        type: "CUSTOMER",
      } as ContactFilterInput,
    },
  });
  


  // fetching guest data using hotel ID and customer id
  const {
    data: guestBookingData,
    loading: guestBookingLoading,
    error: guestBookingError,
  } = useQuery(GET_BOOKING_GUEST, {
    variables: {
      bookingFilter: {
        hotel: user?.hotels[0] || "",
        customer: customerID || "",
      },
    },
  });

  const allGuestData = filterDeactivated
    ? guestData?.contacts?.filter((guestInfo) => {
        return guestInfo;
      })
    : guestData?.contacts?.filter((guestInfo) => {
        return guestInfo?.detactivatedAt == null;
      });

  // filter Guest by name phone ID number
  const filteredGuestList = allGuestData?.filter((guestInformation) => {
    const lowercaseSearchText = searchText.toLowerCase();
    return (
      guestInformation?.name?.toLowerCase().includes(lowercaseSearchText) ||
      guestInformation?.phone?.toLowerCase().includes(lowercaseSearchText) ||
      guestInformation?.address?.toLowerCase().includes(lowercaseSearchText) ||
      guestInformation?.idType?.toLowerCase().includes(lowercaseSearchText) ||
      guestInformation?.idNo?.toLowerCase().includes(lowercaseSearchText)
    );
  });

  // update contact mutation query
  const [updateContact] = useMutation(UPDATE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });

  // update contact function
  const handleUpdate = async (values: Contact, guestID: string) => {
    try {
      await updateContact({
        variables: {
          updateContactInput: {
            ...values,
            _id: guestID,
            name: values.name,
            phone: values.phone,
            idNo: values.idNo,
            idType: values.idType,
            address: values.address,
          },
        },
      });
      message.success("Guest information updated successfully.");
      setHandleModalOpen(false);
    } catch (error) {
      message.error("Failed to update information. Please try again");
    }
  };

  // deactivate function to add deactivateAt field in the database
  const handleDeactiveAccount = async (guestID: string, setActive: boolean) => {
    const selectedGuestInformation = dataSource?.find(
      (data) => data.key === guestID
    );
    confirm({
      title: `Do you want to ${setActive ? "Deactivate" : "Activate"} ${
        selectedGuestInformation?.name
      }?`,
      icon: <ExclamationCircleFilled />,
      okType: setActive ? "danger" : "default",
      async onOk() {
        try {
          await updateContact({
            variables: {
              updateContactInput: {
                _id: guestID,
                detactivatedAt: setActive
                  ? dayjs().format("YYYY-MM-DDTHH:mm:ss[Z]")
                  : null,
              },
            },
          });
          message.success(
            `This Guest Account is ${setActive ? "Deactivated" : "Activated"}.`
          );
        } catch (error) {
          message.error(
            `${
              setActive ? "Deactivation" : "Activation"
            } failed, Please try again`
          );
        }
      },
    });
  };

  // setting loading and error message on page load
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const dataSource = filteredGuestList?.map((guestInformation) => ({
    key: guestInformation?._id,
    name: guestInformation?.name,
    phone: guestInformation?.phone,
    idType: guestInformation?.idType || null,
    idNo: guestInformation?.idNo || null,
    address: guestInformation?.address || null,
    action: guestInformation?._id,
    status: guestInformation?.detactivatedAt ? "Deactive" : "Active",
  }));

  // get a guestInfo By customer id
  const getGuestInfoById = allGuestData?.find(
    (booking) => booking._id === customerID
  );
// console.log(dataSource)
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
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
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
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: (record: string) => {
        // find clicked guest information
        const selectedGuestInformation = dataSource?.find(
          (data) => data.key === record
        );
        return (
          <div className="flex items-center cursor-pointer">
            <Button
              type="link"
              onClick={() => {
                setGuestBookingModalOpen(true);
                setCustomerID(record);
                setGuestID(record);
              }}
            >
              <span className="underline mr-1">More</span> {">"}
            </Button>
            <div className="mr-3">
              <FaRegEdit
                title={"Edit Guest Information"}
                onClick={() => {
                  setHandleModalOpen(true);
                  setGuestID(record);
                  // setting the clicked information on modal
                  form.setFieldsValue({
                    name: selectedGuestInformation?.name,
                    phone: selectedGuestInformation?.phone,
                    idNo: selectedGuestInformation?.idNo,
                    idType: selectedGuestInformation?.idType,
                    address: selectedGuestInformation?.address,
                  });
                }}
              />
            </div>

            {selectedGuestInformation?.status == "Deactive" ? (
              <Button
                style={{
                  backgroundColor: "transparent",
                }}
                size="small"
                onClick={() => {
                  handleDeactiveAccount(record, false);
                }}
              >
                Activate
              </Button>
            ) : (
              <Button
                danger
                style={{ backgroundColor: "transparent" }}
                size="small"
                onClick={() => {
                  handleDeactiveAccount(record, true);
                }}
              >
                Deactive
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const bookingOverViewColumn = [
    {
      title: "Booking Id",
      dataIndex: "number",
      key: "number",
      render: (number: string, record: { _id: string }) => (
        <Link to={`/booking-details/${record._id}`}>
          <span className="text-blue-500 underline">SB{number}</span>
        </Link>
      ),
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
  ];

  return (
    <>
      <div className="mb-5">
        <TitleText text="Guest Look up" />
      </div>
      <div className="flex items-center justify-between mb-3">
        <div className="w-3/12">
          <Input
            placeholder="Search here.."
            allowClear
            size="middle"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
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

      {/* modal to See guest Booking detail */}
      <Modal
        title="Guest Booking Overview"
        open={guestBookingModalOpen}
        onOk={() => setGuestBookingModalOpen(false)}
        onCancel={() => setGuestBookingModalOpen(false)}
        footer={null}
        centered
      >
        <>
          {/*  setting loading and error message for guest booking info */}
          {guestBookingLoading && <p>Loading...</p>}
          {guestBookingError && <p>Error :{guestBookingError?.message}</p>}
          <div className="mb-5">
            <h6 className="mb-2">
              <span className="font-semibold mr-1">Guest Name:</span>
              {getGuestInfoById?.name}
            </h6>
            <p>
              <span className="font-semibold mr-1">Phone No:</span>
              {getGuestInfoById?.phone}
            </p>
          </div>
          <Table
            dataSource={
              guestBookingData?.bookings &&
              Array.isArray(guestBookingData?.bookings) &&
              guestBookingData?.bookings.length > 0
                ? guestBookingData?.bookings
                : []
            }
            columns={bookingOverViewColumn}
          />
          ;
        </>
      </Modal>

      {/* modal to edit guest information  */}
      <Modal
        title="Edit Guest Information"
        open={handleModalOpen}
        onOk={() => setHandleModalOpen(false)}
        onCancel={() => setHandleModalOpen(false)}
        footer={null}
        centered
      >
        <Form
          form={form}
          onFinish={(values) => handleUpdate(values, guestID || "")}
        >
          <Space direction="vertical" className="w-full">
            <h3>Name</h3>
            <Form.Item name="name" className="mb-0">
              <Input placeholder="Name" autoComplete="off" />
            </Form.Item>

            <h3>Phone</h3>
            <Form.Item name="phone" className="mb-0">
              <Input placeholder="Phone" autoComplete="off" />
            </Form.Item>

            <h3>Address</h3>
            <Form.Item name="address" className="mb-0">
              <Input placeholder="Address" autoComplete="off" />
            </Form.Item>

            <h3>ID Type</h3>
            <Form.Item name="idType" className="mb-0">
              <Select
                placeholder="ID Type"
                options={[
                  { value: "DRIVING_LICENSE", label: "Driving License" },
                  { value: "NID", label: "Nid" },
                  { value: "PASSPORT", label: "Passport" },
                ]}
              />
            </Form.Item>

            <h3>ID No</h3>
            <Form.Item name="idNo" className="mb-0">
              <Input placeholder="ID No" autoComplete="off" />
            </Form.Item>
          </Space>

          <div className="flex justify-end">
            <button
              type="submit"
              className=" mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-8 rounded"
            >
              Confirm
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default GuestLookUp;
