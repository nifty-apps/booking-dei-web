import { useMutation, useQuery } from "@apollo/client";
import { PlusOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
import {
  Contact,
  ContactFilterInput,
  ContactTypes,
  CreateContactInput,
} from "../../graphql/__generated__/graphql";
import dayjs from "dayjs";
import TitleText from "../../components/Title";
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
import {
  CREATE_CONTACT,
  UPDATE_CONTACT,
} from "../../graphql/mutations/contactMutations";
import { FaEye, FaRegEdit } from "react-icons/fa";
const { confirm } = Modal;

// custome interface for employee card modal
interface employee {
  name: string | undefined;
  phone: string | undefined;
  idNo: string | null | undefined;
  idType: string | null | undefined;
  address: string | null | undefined;
}

const Employees = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [searchText, setSearchText] = useState<string>("");
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [employeeID, setEmployeeID] = useState<string | null>(null);
  const [filterDeactivated, setFilterDeactivated] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [informationModalOpen, setInformationModalOpen] = useState(false);
  const [information, setInformation] = useState<employee>();

  const [form] = Form.useForm();

  const {
    data: EmployeesData,
    loading,
    error,
  } = useQuery(GET_CONTACTS, {
    variables: {
      filter: {
        hotel: user?.hotels[0] || "",
        type: "EMPLOYEE",
      } as ContactFilterInput,
    },
  });

  const allEmployeeData = filterDeactivated
    ? EmployeesData?.contacts?.filter((employeesInfo) => {
        return employeesInfo;
      })
    : EmployeesData?.contacts?.filter((employeesInfo) => {
        return employeesInfo?.detactivatedAt == null;
      });

  // filter Employee by name phone ID number
  const filteredEmployeeData = allEmployeeData?.filter((employeeData) => {
    const lowercaseSearchText = searchText.toLowerCase();
    return (
      employeeData?.name?.toLowerCase().includes(lowercaseSearchText) ||
      employeeData?.phone?.toLowerCase().includes(lowercaseSearchText) ||
      employeeData?.address?.toLowerCase().includes(lowercaseSearchText) ||
      employeeData?.idType?.toLowerCase().includes(lowercaseSearchText) ||
      employeeData?.idNo?.toLowerCase().includes(lowercaseSearchText)
    );
  });
  // create employe mutation
  const [createContact] = useMutation(CREATE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });
  // update Employee mutation query
  const [updateContact] = useMutation(UPDATE_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });

  // update Employee function
  const handleUpdate = async (values: Contact, employeeID: string) => {
    try {
      await updateContact({
        variables: {
          updateContactInput: {
            ...values,
            _id: employeeID,
            name: values.name,
            phone: values.phone,
            idNo: values.idNo,
            idType: values.idType,
            address: values.address,
          },
        },
      });
      message.success("Employee information updated successfully.");
      setUpdateModalOpen(false);
    } catch (error) {
      message.error("Failed to update information. Please try again");
    }
  };

  // create employe
  const onFinish = async (values: CreateContactInput) => {
    try {
      const response = await createContact({
        variables: {
          createContactInput: {
            ...values,
            idNo: values.idNo,
            hotel: user?.hotels[0] || "",
            type: ContactTypes.Employee,
            detactivatedAt: dayjs().format("YYYY-MM-DDTHH:mm:ss[Z]"),
          },
        },
      });

      if (response?.data?.createContact) {
        message.success("Employee Added successfully!");
        form.setFieldsValue(response.data.createContact);
        setIsModalOpen(false);
      }
    } catch (err) {
      message.error(`Something went wrong!`);
    }
  };

  // handle Deactivated account
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

  // handle loading and error
  if (loading) return <p>Loading</p>;
  if (error) return <p>{error?.message}</p>;

  const dataSource = filteredEmployeeData?.map((employeeData) => ({
    key: employeeData?._id,
    name: employeeData?.name,
    phone: employeeData?.phone,
    idType: employeeData?.idType || null,
    idNo: employeeData?.idNo || null,
    address: employeeData?.address || null,
    action: employeeData?._id,
    status: employeeData?.detactivatedAt ? "Deactive" : "Active",
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

        const EmployeeDetails = {
          name: selectedGuestInformation?.name,
          phone: selectedGuestInformation?.phone,
          idNo: selectedGuestInformation?.idNo,
          idType: selectedGuestInformation?.idType,
          address: selectedGuestInformation?.address,
        };
        return (
          <div className="flex gap-3 items-center cursor-pointer">
            <FaRegEdit
              title={"Edit Employee Information"}
              onClick={() => {
                setUpdateModalOpen(true);
                setEmployeeID(record);
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
            <div id="myqrcode">
              <FaEye
                title={"View Employee Card"}
                onClick={() => {
                  setInformationModalOpen(true);
                  setInformation(EmployeeDetails);
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

  return (
    <>
      <div className="mb-5 flex justify-between">
        <TitleText text="Employee Details" />
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-900 bg-blue-700 text-white hover:bg-white duration-200"
        >
          <PlusOutlined />
          Add Employee
        </button>
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
          title={`See ${filterDeactivated ? "Acive" : "All"} Employees`}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <span className="mr-1">All Employees</span>
          <Switch
            className={`${filterDeactivated ? "" : "bg-gray-400"}`}
            defaultChecked={false}
            onChange={() => setFilterDeactivated(!filterDeactivated)}
          />
        </Tooltip>
      </div>
      {/* modal for create new employee  */}
      <Modal
        title="Create New Employee"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <Form onFinish={onFinish}>
          <Space direction="vertical" className="w-full">
            <h3>Full Name</h3>
            <Form.Item name="name" className="mb-0">
              <Input type="text" placeholder="Enter name" />
            </Form.Item>

            <h3>Phone</h3>
            <Form.Item name="phone" className="mb-0">
              <Input type="text" placeholder="Enter your phone" />
            </Form.Item>

            <h3>ID Type</h3>
            <Form.Item name="idType" className="mb-0">
              <Select
                className="w-full"
                placeholder="Select ID Type"
                options={[
                  { value: "NID", label: "NID" },
                  { value: "PASSPORT", label: "PASSPORT" },
                ]}
              />
            </Form.Item>

            <h3>ID No</h3>
            <Form.Item name="idNo" className="mb-0">
              <Input placeholder="Enter your ID number" />
            </Form.Item>
          </Space>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </Form>
      </Modal>

      <Table dataSource={dataSource} columns={columns} pagination={false} />

      {/* modal to edit guest information  */}
      <Modal
        title="Edit Guest Information"
        open={updateModalOpen}
        onOk={() => setUpdateModalOpen(false)}
        onCancel={() => setUpdateModalOpen(false)}
        footer={null}
        centered
      >
        <Form
          form={form}
          onFinish={(values) => handleUpdate(values, employeeID || "")}
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

      {/* employee data modal to show all others information of an employee */}
      <Modal
        centered
        open={informationModalOpen}
        onOk={() => setInformationModalOpen(false)}
        onCancel={() => setInformationModalOpen(false)}
        footer={null}
      >
        <div>
          <h3 className="text-center font-semibold text-xl mb-5">
            Employee ID Card
          </h3>
          <div className="flex gap-5">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              alt=""
              className="w-24 rounded"
            />
            <div className="font-semibold space-y-1">
              <p>Name: {information?.name}</p>
              <p>Phone: {information?.phone}</p>
              <p>Address: {information?.address}</p>
              <p>
                {information?.idType}: {information?.idNo}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Employees;
