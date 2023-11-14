import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { RootState } from '../../store';
import { GET_ROOM_TYPES } from '../../graphql/queries/roomQueries';
import { Table, Input, Button, Popconfirm, Tabs, Form, Space, Modal, message } from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import TitleText from '../../components/Title';
import TabPane from 'antd/es/tabs/TabPane';
import { CreateRoomTypeInput } from '../../graphql/__generated__/graphql';

import Rooms from './Rooms';
import { CREATE_ROOM_TYPE } from '../../graphql/mutations/bookingMutations';

const RoomSetting = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: RoomsTypeData, loading, error } = useQuery(GET_ROOM_TYPES, {
    variables: {
      findByFilter: {
        hotel: user?.hotels[0] || '',
      },
    },
  });



  // roomtypes data get 

  const dataSource = RoomsTypeData?.roomTypes?.map((roomData) => ({
    key: roomData?._id,
    hotel: roomData?.hotel,
    rent: roomData?.rent,
    title: roomData?.title,


  }));
  // console.log(dataSource)

  // creat roomtype mutation are added
  const [createRoomType] = useMutation(CREATE_ROOM_TYPE, {
    refetchQueries: [{ query: GET_ROOM_TYPES }],
  });

  // table columns created
  const columns = [
    {
      title: 'ROOM TYPE',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'ROOM RENT',
      dataIndex: 'rent',
      key: 'rent',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: string) => (
        <span>
          <Popconfirm title="Are you sure to delete this room type?" onConfirm={() => handleDelete(record)}>
            <Button type="link" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    setSelectedTab(key);
  };

  const onSearch = (value: string) => {
    setSearchText(value);
  };
  // global filter search implemets 
  const filteredDataSource = dataSource?.filter((item) => {

    return (
      item?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      item?.rent?.toString().toLowerCase().includes(searchText.toLowerCase())

    )

  });
  // handle delte 
  const handleDelete = (key: string) => {
    alert('no delete mutation from bacend')
    console.log(`Deleting room type with key: ${key}`);
  };
  const onFinish = async (values: CreateRoomTypeInput) => {
    console.log(values)
    try {
      const response = await createRoomType({

        variables: {
          createRoomTypeInput: {
            ...values,
            title: values?.title,
            rent: Number(values.rent),
            hotel: user?.hotels[0] || "",

          },
        },

      });

      if (response?.data?.createRoomType) {
        message.success("Room Type Added successfully!");
        setIsModalOpen(false)

      }
    } catch (err) {
      message.error(`Something went wrong!`);
    }
  };
  if (loading) return <p>Loading</p>;
  if (error) return <p>{error?.message}</p>;
  return (
    <>
      <div className="mb-5  ">
        <div>

          <TitleText text="Room Setting " />
          <Tabs activeKey={selectedTab} onChange={handleTabChange}>
            <TabPane tab="Rooms" key="tab1">

              <Rooms />
            </TabPane>
            <TabPane tab="Room Types" key="tab2">

              <div className=''>
                <div className='flex justify-end'>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="hover:text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-900 bg-blue-700 text-white hover:bg-white duration-200"
                  >

                    Add Room Type
                  </button>
                </div>
                <Input
                  placeholder="Search by Title"
                  prefix={<SearchOutlined />}
                  allowClear
                  onChange={(e) => onSearch(e.target.value)}
                  style={{ width: 300, marginBottom: 16 }}
                />
                {/* modal for add Rooms */}
                <Modal
                  title="Create New Room Type"
                  open={isModalOpen}
                  onOk={() => setIsModalOpen(false)}
                  onCancel={() => {
                    setIsModalOpen(false);
                  }}
                  footer={null}
                >
                  {/* input form  */}
                  <Form onFinish={onFinish}>
                    <Space direction="vertical" className="w-full">
                      <h3>Room Title</h3>
                      <Form.Item name="title" className="mb-0" rules={[{ required: true, message: "Please enter the room title" }]}>
                        <Input type="text" placeholder="Enter room title" />
                      </Form.Item>

                      <h3>Rent</h3>
                      <Form.Item name="rent" className="mb-0" rules={[{ required: true, message: "Please enter the room rent" }]}>
                        <Input type="text" placeholder="Enter room rent" />
                      </Form.Item>



                    </Space>
                    <button
                      type="submit"
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                    >
                      Add  RoomTpe
                    </button>
                  </Form>
                </Modal>
                <Table dataSource={filteredDataSource} columns={columns} pagination={false} />
              </div>
            </TabPane>


          </Tabs>
        </div>

      </div>

    </>
  );
};

export default RoomSetting;