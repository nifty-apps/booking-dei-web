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
const { confirm } = Modal;
const GuestLookUp = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchText, setSearchText] = useState<string>("");
  const [handleModalOpen, setHandleModalOpen] = useState<boolean>(false);
  const [filterDeactivated, setFilterDeactivated] = useState<boolean>(false);
  const [guestID, setGuestID] = useState<string | null>(null);
  const [showActive, setShowActive] = useState<boolean>(true);
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

  const allGuestData = filterDeactivated
    ? guestData?.contacts?.filter((guestInfo) => {
        return guestInfo;
      })
    : guestData?.contacts?.filter((guestInfo) => {
        return guestInfo?.detactivatedAt == null;
      });

  // filter Guest by name phone ID number
<<<<<<< HEAD
  const filteredGuestList = guestData?.contacts?.filter(
    (guestInformation: Contact) => {
      const lowercaseSearchText = searchText.toLowerCase();
      return (
        guestInformation?.name?.toLowerCase().includes(lowercaseSearchText) ||
        guestInformation?.phone?.toLowerCase().includes(lowercaseSearchText) ||
        guestInformation?.address
          ?.toLowerCase()
          .includes(lowercaseSearchText) ||
        guestInformation?.idType?.toLowerCase().includes(lowercaseSearchText) ||
        guestInformation?.idNo?.toLowerCase().includes(lowercaseSearchText)
      );
    }
  );
=======
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
>>>>>>> origin/main

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
      (data) => data?.key === guestID
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

<<<<<<< HEAD
  // Now datasource will be render according to the showDeacticvate state
  const dataSource = (filteredGuestList || [])
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((guestInformation) => {
      const isDeactivated = guestInformation.detactivatedAt;
      const isActive = !isDeactivated;

      if (showActive) {
        if (isActive) {
          return {
            key: guestInformation?._id,
            name: guestInformation?.name,
            phone: guestInformation?.phone,
            idType: guestInformation?.idType || null,
            idNo: guestInformation?.idNo || null,
            address: guestInformation?.address || null,
            action: guestInformation?._id,
            status: "Active",
          };
        }
      } else {
        return {
          key: guestInformation?._id,
          name: guestInformation?.name,
          phone: guestInformation?.phone,
          idType: guestInformation?.idType || null,
          idNo: guestInformation?.idNo || null,
          address: guestInformation?.address || null,
          action: guestInformation?._id,
          status: isActive ? "Active" : "Deactive",
        };
      }
    })
    .filter((item) => item !== undefined);
=======
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
>>>>>>> origin/main

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
<<<<<<< HEAD

=======
>>>>>>> origin/main
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: (record: string) => {
        // find clicked guest information
        const selectedGuestInformation = dataSource?.find(
          (data) => data?.key === record
        );
        return (
          <div className="flex gap-3 items-center cursor-pointer">
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
  return (
    <>
      <div className="mb-5">
        <TitleText text="Guest Look up" />
      </div>
<<<<<<< HEAD
      <div className="flex align-center  gap-5 mb-3">
=======
      <div className="flex items-center justify-between mb-3">
>>>>>>> origin/main
        <div className="w-3/12">
          <Input
            placeholder="Search here.."
            allowClear
            size="middle"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
<<<<<<< HEAD
        <Switch
          title={`${
            showActive
              ? "tap to see all contacts"
              : "tap to see active contacts"
          }`}
          onClick={() => setShowActive(!showActive)}
          className={`bg-green-500 `}
          checkedChildren="Active"
          unCheckedChildren="All"
          defaultChecked
        />
=======
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
>>>>>>> origin/main
      </div>

      <Table
        dataSource={
          dataSource as {
            key: string;
            name: string;
            phone: string;
            idType: ContactTypes | null;
            idNo: string | null;
            address: string | null;
            action: string;
            status: string;
          }[]
        }
        columns={columns}
        pagination={false}
      />

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
