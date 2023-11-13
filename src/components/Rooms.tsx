import { useMutation, useQuery } from "@apollo/client";
import {
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
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { GET_ROOM_BOOKING } from "../graphql/queries/roomBookingQueries";
import {
  CreateRoomInput,
  Room,
  RoomBookingResponse,
  RoomType,
} from "../graphql/__generated__/graphql";
import { GET_ROOMS, GET_ROOM_TYPES } from "../graphql/queries/roomQueries";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { CREATE_ROOM, UPDATE_ROOM } from "../graphql/mutations/roomMutations";

interface RoomsProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Rooms = ({ isModalOpen, setIsModalOpen }: RoomsProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchText, setSearchText] = useState<string>("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [filterDeactivated, setFilterDeactivated] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [rent, setRent] = useState<number>(0);
  const [form] = Form.useForm();

  //   fetch all room bookings
  const {
    data: { roomBookings } = { roomBookings: [] as RoomBookingResponse[] },
  } = useQuery(GET_ROOM_BOOKING, {
    variables: {
      roomBookingFilter: {
        hotel: user?.hotels[0] || "",
      },
    },
  });

  // fetch all rooms
  const { data: { rooms } = { rooms: [] as Room[] } } = useQuery(GET_ROOMS, {
    variables: {
      findByFilter: {
        hotel: user?.hotels[0] || "",
      },
    },
  });

  // fetch all room types
  const { data: { roomTypes } = { roomTypes: [] as RoomType[] } } = useQuery(
    GET_ROOM_TYPES,
    {
      variables: {
        findByFilter: {
          hotel: user?.hotels[0] || "",
        },
      },
    }
  );

  const combinedRooms = [];

  for (const room of rooms) {
    for (const roomType of roomTypes) {
      if (room.type === roomType._id) {
        combinedRooms.push({
          _id: room._id,
          floor: room.floor,
          number: room.number,
          position: room.position,
          roomType: roomType._id,
          hotel: room.hotel,
          rent: roomType.rent,
          title: roomType.title,
          detactivatedAt: room?.detactivatedAt,
        });
      }
    }
  }

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    const findRent = roomTypes.find((type) => type._id === value);
    setRent(findRent?.rent as number);
  };

  // filter active rooms
  const filterAllRooms = filterDeactivated
    ? combinedRooms.filter((room) => room)
    : combinedRooms.filter((room) => room?.detactivatedAt == null);

  const filteredRoomList = filterAllRooms?.filter((room) => {
    const lowercaseSearchText = searchText.toLowerCase();
    return (
      room?.number?.toLowerCase().includes(lowercaseSearchText) ||
      room?.title?.toLowerCase().includes(lowercaseSearchText)
    );
  });

  const dataSource = filteredRoomList?.map((room) => ({
    key: room?._id,
    position: room.position,
    floor: room.floor,
    number: room?.number,
    type: room.roomType,
    title: room?.title,
    rent: room?.rent,
    status: room?._id,
    detactivatedAt: room.detactivatedAt,
    action: room._id,
  }));

  // create room mutation
  const [createRoom] = useMutation(CREATE_ROOM, {
    refetchQueries: [{ query: GET_ROOMS }],
  });
  // update room mutation
  const [updateRoom] = useMutation(UPDATE_ROOM, {
    refetchQueries: [{ query: GET_ROOMS }],
  });

  const handleUpdate = async (values: Room, roomId: string) => {
    try {
      await updateRoom({
        variables: {
          updateRoomInput: {
            ...values,
            _id: roomId,
            hotel: user?.hotels[0] || "",
            floor: values.floor,
            number: values.number,
            position: values.position,
            type: values.type,
            detactivatedAt: null,
          },
        },
      });
      message.success("Room information updated successfully.");
      setUpdateModalOpen(false);
    } catch (error) {
      message.error("Failed to update information. Please try again");
    }
  };

  const onFinish = async (values: CreateRoomInput) => {
    try {
      const response = await createRoom({
        variables: {
          createRoomInput: {
            hotel: user?.hotels[0] || "",
            floor: values.floor,
            number: values.number,
            position: values.position,
            type: values.type,
            detactivatedAt: null,
          },
        },
      });

      if (response?.data?.createRoom) {
        message.success("Room Added successfully!");
        setIsModalOpen(false);
        form.resetFields();
      }
    } catch (err) {
      message.error(`Something went wrong!`);
    }
  };

  const columns = [
    {
      title: "ROOM NUMBER",
      dataIndex: "number",
      key: "name",
    },
    {
      title: "ROOM TYPE",
      dataIndex: "title",
      key: "phone",
    },
    {
      title: "ROOM RENT",
      dataIndex: "rent",
      key: "rent",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      render: (record: string) => {
        const filerBookedRoom = roomBookings?.find(
          (data) => data?.room._id === record
        );
        return (
          <p>{filerBookedRoom?.status ? filerBookedRoom?.status : "N/A"}</p>
        );
      },
    },
    {
      title: "ACTIONS",
      dataIndex: "action",
      render: (record: string) => {
        const selectedRoomInformation = dataSource?.find(
          (data) => data.key === roomId
        );

        form.setFieldsValue({
          number: selectedRoomInformation?.number,
          floor: selectedRoomInformation?.floor,
          position: selectedRoomInformation?.position,
          rent:selectedRoomInformation?.rent,
          type: selectedRoomInformation?.type,
        });
        return (
          <div className="flex items-center gap-3 cursor-pointer">
            <FaRegEdit
              title={"Edit Room Information"}
                onClick={() => {
                setRoomId(record);
                setUpdateModalOpen(true);
              }}
            />
            <FaRegTrashAlt />
          </div>
        );
      },
    },
  ];
  return (
    <>
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
          title={`See ${filterDeactivated ? "Active" : "Deactivated"} Room`}
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
      <Table columns={columns} dataSource={dataSource} />
      {/* room create modal */}
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
            <Form.Item name="number" className="mb-0">
              <Input type="text" placeholder="Enter Room Number" />
            </Form.Item>
            <h3>Floor Number</h3>
            <Form.Item name="floor" className="mb-0">
              <Input type="text" placeholder="Enter Room Number" />
            </Form.Item>
            <h3>Position</h3>
            <Form.Item name="position" className="mb-0">
              <Input type="text" placeholder="Enter Room Number" />
            </Form.Item>

            <h3>Room Type</h3>
            <Form.Item name="type" className="mb-0">
              <Select
                className="w-full"
                placeholder="Select Room Type"
                onChange={handleSelectChange}
                value={selectedValue}
                options={roomTypes.map((type) => ({
                  value: type._id,
                  label: type.title,
                }))}
              />
            </Form.Item>
            <h3>Room Rent</h3>
            <Form.Item className="mb-0">
              <Input
                type="text"
                disabled
                className="placeholder:text-black"
                placeholder={String(rent)}
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
      {/* room update modal */}

      {/* modal to edit guest information  */}
      <Modal
        title="Edit Room Information"
        open={updateModalOpen}
        onOk={() => setUpdateModalOpen(false)}
        onCancel={() => setUpdateModalOpen(false)}
        footer={null}
        centered
      >
        <Form
          form={form}
          onFinish={(values) => handleUpdate(values, roomId || "")}
        >
          <Space direction="vertical" className="w-full">
            <h3>Room Number</h3>
            <Form.Item name="number" className="mb-0">
              <Input placeholder="Room Number" autoComplete="off" />
            </Form.Item>
            <h3>Floor Number</h3>
            <Form.Item name="floor" className="mb-0">
              <Input placeholder="Enter Room Number" autoComplete="off" />
            </Form.Item>
            <h3>Position</h3>
            <Form.Item name="position" className="mb-0">
              <Input placeholder="Enter Room Number" autoComplete="off" />
            </Form.Item>

            <h3>Room Type</h3>
            <Form.Item name="type" className="mb-0">
              <Select
                className="w-full"
                placeholder="Select Room Type"
                onChange={handleSelectChange}
                value={selectedValue}
                options={roomTypes.map((type) => ({
                  value: type._id,
                  label: type.title,
                }))}
              />
            </Form.Item>
            <h3>Rent</h3>
            <Form.Item name="rent" className="mb-0">
              <Input placeholder="Enter Room Number" autoComplete="off" />
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
export default Rooms;
