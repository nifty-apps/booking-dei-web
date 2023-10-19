import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GET_CONTACTS } from "../../graphql/queries/contactQueries";
import {
  Contact,
  ContactFilterInput,
} from "../../graphql/__generated__/graphql";
import TitleText from "../../components/Title";
import { Form, Input, Modal, Select, Space, Table, message } from "antd";
import { UPDATE_CONTACT } from "../../graphql/mutations/contactMutations";
import { FaEye, FaRegEdit } from "react-icons/fa";

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
  const [form] = Form.useForm();

  const [modal2Open, setModal2Open] = useState(false);
  const [information, setInformation] = useState<employee>();

  const {
    data: allEmployeesData,
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

  // filter Employee by name phone ID number
  const filteredEmployeeData = allEmployeesData?.contacts?.filter(
    (employeeData) => {
      const lowercaseSearchText = searchText.toLowerCase();
      return (
        employeeData?.name?.toLowerCase().includes(lowercaseSearchText) ||
        employeeData?.phone?.toLowerCase().includes(lowercaseSearchText) ||
        employeeData?.address?.toLowerCase().includes(lowercaseSearchText) ||
        employeeData?.idType?.toLowerCase().includes(lowercaseSearchText) ||
        employeeData?.idNo?.toLowerCase().includes(lowercaseSearchText)
      );
    }
  );

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
                  setModal2Open(true);
                  setInformation(EmployeeDetails);
                }}
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
      </div>

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
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
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
            <div className="font-semibold">
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
