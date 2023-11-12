import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Modal, Space, Table, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { CreateRoomTypeInput, RoomType } from "../graphql/__generated__/graphql";
import { GET_ROOM_TYPES } from "../graphql/queries/roomQueries";
import { CREATE_ROOM_TYPE } from "../graphql/mutations/roomMutations";
import { FaRegTrashAlt } from "react-icons/fa";

interface RoomTypesProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomTypes = ({isModalOpen,setIsModalOpen}:RoomTypesProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchText, setSearchText] = useState<string>("");

  // create room type mutation
  const [createRoomType] = useMutation(CREATE_ROOM_TYPE,{
    refetchQueries: [{ query: GET_ROOM_TYPES}],
  })

  // fetch all room types
  const { data: { roomTypes } = { roomTypes: [] as RoomType[] } } = useQuery(GET_ROOM_TYPES, {
    variables: {
      findByFilter: {
        hotel: user?.hotels[0] || "",
      },
    },
  });

    const filteredRoomTypes = roomTypes?.filter((roomType) => {
      const lowercaseSearchText = searchText.toLowerCase();
      return (
        roomType?.title?.toLowerCase().includes(lowercaseSearchText)
      );
    });

const dataSource = filteredRoomTypes?.map((roomType) => ({
  key: roomType?._id,
  rent: roomType?.rent,
  title: roomType?.title,
}));


// create room type form handler
const onFinish = async (values:CreateRoomTypeInput ) => {
    try {
      const response = await createRoomType({
        variables: {
          createRoomTypeInput: {
            ...values,
            hotel: user?.hotels[0] || "",
            title: values.title,
            rent: Number(values.rent),
          },
        },
      });

      if (response?.data?.createRoomType) {
        message.success("Room Type Added successfully!");
        setIsModalOpen(false);
      }
    } catch (err) {
      message.error(`Something went wrong!`);
    }
  };


  const columns = [
    {
      title: "ROOM TYPE",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "ROOM RENT",
      dataIndex: "rent",
      key: "rent",
    },
    {
      title: "ACTIONS",
      dataIndex: "action",
      render:()=>{
       return (
        <FaRegTrashAlt/>
       )
      }
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
      </div>
      <Table columns={columns} dataSource={dataSource}/>

      <Modal
        title="Create New Room Type"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
      >
        <Form onFinish={onFinish}>
          <Space direction="vertical" className="w-full">
            <h3>Room Type</h3>
            <Form.Item name="title" className="mb-0">
              <Input type="text" placeholder="Enter Room Type" />
            </Form.Item>
            <h3>Room Rent</h3>
            <Form.Item name="rent" className="mb-0">
              <Input type="text" placeholder="Enter Room Rent" />
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
export default RoomTypes;
