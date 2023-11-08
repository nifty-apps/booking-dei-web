import TitleText from "../../components/Title";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Form, Input, Modal, Select, Space, Switch, Table, Tooltip } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GET_ROOMS, GET_ROOM_TYPE, GET_ROOM_TYPES } from "../../graphql/queries/roomQueries";
import { RootState } from "../../store";

const RoomSettings = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [filterDeactivated, setFilterDeactivated] = useState<boolean>(false);
  //   fetch all rooms

  const { data: rooms } = useQuery(GET_ROOMS, {
    variables: {
      findByFilter: {
        hotel: user?.hotels[0] || "",
      },
    },
  });

  const { data: roomTypes } = useQuery(GET_ROOM_TYPES, {
    variables: {
      findByFilter: {
        hotel: user?.hotels[0] || "",
      },
    },
  });

  const allRoomTypes = roomTypes?.roomTypes.map((type) => ({
    value: type.title,
    label: type.title,
  }));

  const { data: roomType } = useQuery(GET_ROOM_TYPE, {
    variables: {
      roomTypeId: rooms?.rooms[1].type as string,
    },
  });

  console.log(roomType)

  const onFinish = async (values) => {console.log(values)};
  const columns = [
    {
      title: "ROOM NUMBER",
      dataIndex: "roomNumber",
      key: "name",
    },
    {
      title: "ROOM TYPE",
      dataIndex: "type",
      key: "phone",
    },
    {
      title: "ROOM RENT",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "STATUS",
      dataIndex: "idType",
      key: "idType",
    },
    {
      title: "ACTIONS",
      dataIndex: "action",
      key: "action",
    },
  ];
  return (
    <>
      <div className="mb-5 flex justify-between">
        <TitleText text="Room Settings" />
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-900 bg-blue-700 text-white hover:bg-white duration-200"
        >
          <PlusOutlined />
          Add Room
        </button>
      </div>

      <div className="flex gap-5 py-4">
        <button className="text-lg font-semibold border-b-2 border-blue-500">
          Rooms
        </button>
        <button className="text-lg font-semibold border-b-2 border-blue-500">
          Room Types
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
          title={`See ${
            filterDeactivated ? "Active" : "Deactivated"
          } Employees`}
          placement="bottomRight"
          className="cursor-pointer flex justify-center gap-1"
        >
          <Switch
            className={`${filterDeactivated ? "" : "bg-gray-400"}`}
            defaultChecked={false}
            onChange={() => setFilterDeactivated(!filterDeactivated)}
          />
          Deactivated
        </Tooltip>
      </div>
      <Table columns={columns} />

      <Modal
        title="Create New Room"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <Form onFinish={onFinish}>
          <Space direction="vertical" className="w-full">
            <h3>Room Number</h3>
            <Form.Item name="roomNumber" className="mb-0">
              <Input type="text" placeholder="Enter Room Number" />
            </Form.Item>

            <h3>Room Type</h3>
            <Form.Item name="type" className="mb-0">
              <Select
                className="w-full"
                placeholder="Select Room Type"
                options={allRoomTypes}
              />
            </Form.Item>
            <h3>Room Rent</h3>
            <Form.Item name="rent" className="mb-0">
              <Input type="text" placeholder="Enter your phone" />
            </Form.Item>

            <h3>Status</h3>
            <Form.Item name="status" className="mb-0">
              <Select
                className="w-full"
                placeholder="Select  Status"
                options={[
                  { value: "Active", label: "Active" },
                  { value: "InActive", label: "Deactivated" },
                ]}
              />
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
    </>
  );
};
export default RoomSettings;
