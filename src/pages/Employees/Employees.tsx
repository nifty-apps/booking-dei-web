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
import {
  Card,
  Form,
  Input,
  Modal,
  QRCode,
  Select,
  Space,
  Table,
  message,
} from "antd";
import { UPDATE_CONTACT } from "../../graphql/mutations/contactMutations";
import { FaDownload, FaRegEdit } from "react-icons/fa";

const Employees = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [searchText, setSearchText] = useState<string>("");
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [employeeID, setEmployeeID] = useState<string | null>(null);
  const [form] = Form.useForm();

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
            {/* <div id="myqrcode">
              <QRCode
                value={`${EmployeeDetails}`}
                bgColor="#fff"
                style={{ marginBottom: 16 }}
              />

              <FaDownload title={"Download Employee Data"} />
            </div> */}
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
    </>
  );
};

export default Employees;
