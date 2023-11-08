
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { RootState } from '../../store';
import { GET_ROOMS } from '../../graphql/queries/roomQueries';
import { Table, Input, Modal, message, Form, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


import { CREATE_ROOM } from '../../graphql/mutations/contactMutations';
import { CreateRoomInput } from '../../graphql/__generated__/graphql';
import { useState } from 'react';

const Rooms = () => {
      const { user } = useSelector((state: RootState) => state.auth);

      const [isModalOpen, setIsModalOpen] = useState(false);
      const { data: RoomsData, loading, error } = useQuery(GET_ROOMS, {
            variables: {
                  findByFilter: {
                        hotel: user?.hotels[0] || '',
                  },
            },
      });

      const [createRoom] = useMutation(CREATE_ROOM, {
            refetchQueries: [{ query: GET_ROOMS }],
      });

      if (loading) return <p>Loading</p>;
      if (error) return <p>{error?.message}</p>;
      //   console.log(RoomsData?.rooms)
      const dataSource = RoomsData?.rooms.map((roomData) => ({
            key: roomData?._id,
            hotel: roomData?.hotel,
            roomNumber: roomData.number,
      }));


      const columns = [
            {
                  title: 'ROOM NUMBER',
                  dataIndex: 'roomNumber',
                  key: 'title',
            },
            {
                  title: 'ROOM TYPE',
                  dataIndex: '',
                  key: '',
            },
            {
                  title: 'ROOM RENT',
                  dataIndex: '',
                  key: '',
            }


      ];


      const onFinish = async (values: CreateRoomInput) => {
            try {
                  const response = await createRoom({
                        variables: {
                              createRoomInput: {
                                    ...values,
                                    number: values.number,
                                    floor: values.floor,
                                    position: values.position,
                                    type: values.type,
                                    hotel: user?.hotels[0] || "",

                                    detactivatedAt: values.detactivatedAt,
                              },
                        },
                  });

                  if (response?.data?.createRoom) {
                        message.success("Room Type Added successfully!");
                        // Handle other actions if needed
                  }
            } catch (err) {
                  message.error(`Something went wrong!`);
            }
      };




      return (
            <>
                  <div className="mb-5">
                        <div>
                              <div className='flex justify-end'>  <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="hover:text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-900 bg-blue-700 text-white hover:bg-white duration-200"
                              >
                                    {/* <PlusOutlined /> */}
                                    Add Room
                              </button></div>
                              <div>
                                    <Input
                                          placeholder="Search by Title"
                                          prefix={<SearchOutlined />}
                                          allowClear
                                          onChange={() => ''}
                                          style={{ width: 300, marginBottom: 16 }}
                                    />
                                    <Modal
                                          title="Create New Room Type"
                                          visible={isModalOpen}
                                          onCancel={() => setIsModalOpen(false)}
                                          footer={null}
                                    >
                                          <Form onFinish={onFinish}>
                                                <Space direction="vertical" className="w-full">
                                                      <h3>Number</h3>
                                                      <Form.Item
                                                            name="number"
                                                            className="mb-0"
                                                            rules={[{ required: true, message: "Please enter the room number" }]}
                                                      >
                                                            <Input type="text" placeholder="Enter room number" />
                                                      </Form.Item>

                                                      <h3>Floor</h3>
                                                      <Form.Item
                                                            name="floor"
                                                            className="mb-0"
                                                            rules={[{ required: true, message: "Please enter the room floor" }]}
                                                      >
                                                            <Input type="text" placeholder="Enter room floor" />
                                                      </Form.Item>

                                                      <h3>Position</h3>
                                                      <Form.Item
                                                            name="position"
                                                            className="mb-0"
                                                            rules={[{ required: true, message: "Please enter the room position" }]}
                                                      >
                                                            <Input type="text" placeholder="Enter room position" />
                                                      </Form.Item>

                                                      <h3>Type</h3>
                                                      <Form.Item
                                                            name="type"
                                                            className="mb-0"
                                                            rules={[{ required: true, message: "Please enter the room type" }]}
                                                      >
                                                            <Input type="text" placeholder="Enter room type" />
                                                      </Form.Item>
                                                      <h3>Deactivated At</h3>
                                                      <Form.Item
                                                            name="detactivatedAt"
                                                            className="mb-0"
                                                            rules={[
                                                                  { required: true, message: "Please enter the deactivated date" },
                                                            ]}
                                                      >
                                                            <Input type="text" placeholder="Enter deactivated date" />
                                                      </Form.Item>
                                                </Space>
                                                <button
                                                      type="submit"
                                                      className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                                                >
                                                      Add Room
                                                </button>

                                          </Form>
                                    </Modal>
                                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default Rooms;
