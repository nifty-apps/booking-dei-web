import { ExclamationCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  message,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import TitleText from "../../components/Title";
import { Contact, ContactTypes } from "../../graphql/__generated__/graphql";
import { UPDATE_CONTACT } from "../../graphql/mutations/contactMutations";
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
import { RootState } from "../../store";
const { confirm } = Modal;
const GuestLookUp = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchText, setSearchText] = useState<string>("");
  const [handleModalOpen, setHandleModalOpen] = useState<boolean>(false);
  const [guestID, setGuestID] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [isActivated, setIsActivated]=useState<boolean>(true);

  // fetching data using Hotel ID
  const {
    data: guestData,
    loading,
    error,
  } = useQuery(GET_CONTACTS, {
    variables: {
      filter: {
        hotel: user?.hotels[0] || "",
      },
    },
  });


  let  filteredGuestList ;

// filter by activated or dectivated 
 isActivated ? filteredGuestList = guestData?.contacts?.filter((guestInformation) =>!!guestInformation?.detactivatedAt) : filteredGuestList = guestData?.contacts?.filter((guestInformation) =>!guestInformation?.detactivatedAt || !!guestInformation?.detactivatedAt ) 










  console.log(filteredGuestList)
 filteredGuestList = filteredGuestList?.filter((guestInformation) => {
    const lowercaseSearchText = searchText.toLowerCase();
    return (
      guestInformation?.name?.toLowerCase().includes(lowercaseSearchText) ||
      guestInformation?.phone?.toLowerCase().includes(lowercaseSearchText) ||
      guestInformation?.address?.toLowerCase().includes(lowercaseSearchText) ||
      guestInformation?.idType?.toLowerCase().includes(lowercaseSearchText) ||
      guestInformation?.idNo?.toLowerCase().includes(lowercaseSearchText) ||
      guestInformation?.type?.toLowerCase().includes(lowercaseSearchText) || 
      guestInformation?.detactivatedAt?.toLocaleLowerCase().includes('null')

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
            idNo:values.idNo,
            idType: values.idType,
            type: values.type,
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
          message.success("This Guest Account is Deactivated.");
        } catch (error) {
          message.error("Failed to deactive user. Please try again");
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
    idNo: guestInformation?.idNo || null ,
    type: guestInformation?.type,
    address: guestInformation?.address || null,
    action: guestInformation?._id,
    status: guestInformation?.detactivatedAt ? "Deactive" : "Active",
  }));
console.log(dataSource)
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
      title: "TYPE",
      dataIndex: "type",
      key: "type",
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
          <div className="flex gap-3 items-center cursor-pointer">
            <FaRegEdit
              onClick={() => {
                setHandleModalOpen(true);
                setGuestID(record);
                // setting the clicked information on modal
                form.setFieldsValue({
                  name: selectedGuestInformation?.name,
                  phone: selectedGuestInformation?.phone,
                  idNo: selectedGuestInformation?.idNo,
                  idType: selectedGuestInformation?.idType,
                  type: selectedGuestInformation?.type,
                  address: selectedGuestInformation?.address,
                });
              }}
            />

            {selectedGuestInformation?.status == "Deactive" ? (
              <Button
                onClick={() => {
                  handleDeactiveAccount(record, false);
                }}
              >
                Activate
              </Button>
            ) : (
              <Button
                danger
                onClick={() => {
                  handleDeactiveAccount(record, true);
                }}
              >
                Deactivate
              </Button>
            )}
          </div>
        );
      },
    },
  ];



  //handle Togggole button 
  const handleToggle = () => {
    setIsActivated(!isActivated);
  }
  return (
    <>
      <div className="mb-5">
        <TitleText text="Guest Look up" />
      </div>
      <div className="flex justify-start align-middle  gap-6 mb-3">
        <div className="w-3/12">
          <Input
            placeholder="Search here.."
            allowClear
            size="middle"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
        <div>
  <Button
    onClick={handleToggle}
    type={isActivated ? 'default' : 'primary'}
    style={{ color: isActivated ? 'red' : 'green' }} // Adjust the colors as needed
  >
    {isActivated ? 'Toggle' : 'Activate'}
  </Button>
</div>

      </div>


      <Table dataSource={dataSource} columns={columns} pagination={false} />

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

            <h3>ID No</h3>
            <Form.Item name="idNo" className="mb-0">
              <Input placeholder="ID No" autoComplete="off" />
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
            <h3>Type</h3>
            <Form.Item name="type" className="mb-0">
              <Select
                placeholder="Select Type"
                options={[
                  { value: ContactTypes.Customer, label: "Customer" },
                  { value: ContactTypes.Employee, label: "Employee" },
                  { value: ContactTypes.Vendor, label: "Vendor" },
                ]}
              />
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
