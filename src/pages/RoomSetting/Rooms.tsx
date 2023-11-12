import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { RootState } from '../../store';
import { GET_ROOMS, GET_ROOM_TYPES } from '../../graphql/queries/roomQueries';
import { Table, Input, Modal, message, Form, Space, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


import { CREATE_ROOM } from '../../graphql/mutations/contactMutations';
import { CreateRoomInput } from '../../graphql/__generated__/graphql';
import { useState } from 'react';

import { GET_ROOM_BOOKING } from '../../graphql/queries/roomBookingQueries';
const roomTypes = [
      'Honeymoon Suite (AC)',
      'Family Deluxe Suite (AC)',
      'Super Deluxe Couple Bed (AC)',
      'Super Deluxe Tripple Bed (Non-AC)',
     'Super Deluxe Tripple Bed (AC)',
    'Super Deluxe Couple Bed (Non-AC)',
     'Super Deluxe Twin Bed (AC)',
];

const Rooms = () => {

      const { user } = useSelector((state: RootState) => state.auth);
      const [searchText, setSearchText] = useState<string>('');

      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedRoomType, setSelectedRoomType] = useState<string>("");
      const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<string>("");


      const { data: RoomsData, loading, error } = useQuery(GET_ROOMS, {
            variables: {
                  findByFilter: {
                        hotel: user?.hotels[0] || '',
                  },
            },
      });


      const { data: RoomsTypeData } = useQuery(GET_ROOM_TYPES, {
            variables: {
                  findByFilter: {
                        hotel: user?.hotels[0] || '',
                  },
            },
      });


      const { data: roomBookingsData } = useQuery(GET_ROOM_BOOKING, {
            variables: {
                  roomBookingFilter: {
                        hotel: user?.hotels[0] || '', // Replace with your hotel ID
                  },
            },
      });
      // roomBookingsData?.roomBookings?.map((data) => console.log(data.room.type._id))
      //     console.log(roomBookingsData?.roomBookings )
      const [createRoom] = useMutation(CREATE_ROOM, {
            refetchQueries: [{ query: GET_ROOMS }],
      });



      const dataSource = RoomsData?.rooms.map((roomData) => {
            const foundRoomType = RoomsTypeData?.roomTypes.find(
                  (roomtype) => roomtype._id === roomData.type
            );
                  // console.log({foundRoomType});
            const FoundRoomStatus = roomBookingsData?.roomBookings.find((data) => data.room._id === roomData._id );
           
             

            return {
                
                  key: roomData?._id,
                  hotel: roomData?.hotel,
                  roomNumber: roomData.number,
                  type: roomData?.type,
                  roomtype: foundRoomType?.title,
                  roomRent: foundRoomType?.rent,
                  status: FoundRoomStatus?.status
            };
      });
      // console.log({ roomBookingsData})

      const columns = [
            {
                  title: 'ROOM NUMBER',
                  dataIndex: 'roomNumber',
                  key: 'title',
            },
            {
                  title: 'ROOM TYPE',
                  dataIndex: 'roomtype',
                  key: 'title',
            },
            {
                  title: 'ROOM RENT',
                  dataIndex: 'roomRent',
                  key: 'title',
            },
            {
                  title: 'STATUS',
                  dataIndex: 'status',
                  key: 'title',
            },
            // {
            //       title: 'ROOM TYPE',
            //       dataIndex: 'type',
            //       key: 'type',
            //       render: (record: string) => {
            //         const Single = RoomsTypeData?.roomTypes.find(data => data._id === record);

            //         if (Single) {
            //           return <div>{Single.title}</div>; // Display the room type name (adjust 'name' to your actual property)
            //         } else {
            //           return <div>Not Found</div>; // Handle the case where the room type is not found
            //         }
            //       }
            //     },

            //     {
            //       title: 'ROOM TYPE',
            //       dataIndex: 'type',
            //       key: 'type',
            //       render: (record: string) => {
            //         const Single = RoomsTypeData?.roomTypes.find(data => data._id === record);
            //         if (Single) {
            //           return <div>{Single.rent}</div>; // Display the room type name (adjust 'name' to your actual property)
            //         } else {
            //           return <div>Not Found</div>; // Handle the case where the room type is not found
            //         }
            //       }
            //     },


      ];


      const onFinish = async (values: CreateRoomInput) => {
            try {
                  const response = await createRoom({
                        variables: {
                              createRoomInput: {
                                    number: values.number,
                                    floor: values.floor,
                                    position: values.position,
                                    type: selectedRoomTypeId,
                                    hotel: '64d0a1d008291a484b015d0b', // Hardcoded hotel ID or use a dynamic value
                                    detactivatedAt: values.detactivatedAt,
                              }
                        }
                  });

                  if (response?.data?.createRoom) {
                        message.success("Rooms Added successfully!");
                        setIsModalOpen(false)
                        // Handle other actions if needed
                  }
            } catch (err) {
                  message.error(`Something went wrong!`);
            }
      };
      const handleRoomTypeChange = (value: string) => {
            setSelectedRoomType(value);
            const findRoomBookinTypeId = roomBookingsData?.roomBookings?.find(
                  (data) => data?.room?.type.title === value
                );
                setSelectedRoomTypeId(findRoomBookinTypeId?.room?.type?._id!)
            //     console.log(findRoomBookinTypeId?.room?.type?._id)
      };
      const onSearch = (value: string) => {
            setSearchText(value);
      };
      const filteredDataSource = dataSource?.filter((item) => {

            return (
                  item.roomNumber.toLowerCase().includes(searchText.toLowerCase()) ||
                  item.status?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
                  item.roomRent?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
                  item.roomRent?.toString().toLowerCase().includes(searchText.toLowerCase())

            )

      });

      if (loading) return <p>Loading</p>;
      if (error) return <p>{error?.message}</p>;

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
                                          onChange={(e) => onSearch(e.target.value)}
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


                                                      {/* <h3>Type</h3> */}
                                                      <Form.Item
                                                            name="type"
                                                            className="mb-0"
                                                            // rules={[{ required: true, message: "Please enter the room type" }]}
                                                      >
                                                            <div>
                                                                  <h3>Select Room Type:</h3>
                                                                  <Select
                                                                        style={{ width: 200 }}
                                                                        value={selectedRoomType} // Make sure you have 'selectedRoomType' state defined
                                                                        onChange={handleRoomTypeChange} // Define 'handleRoomTypeChange' function
                                                                  >
                                                                        {roomTypes.map((type) => (
                                                                              <Select.Option key={type} value={type}>
                                                                                    {type}
                                                                              </Select.Option>
                                                                        ))}
                                                                  </Select>
                                                                  {/* <p>{selectedRoomType}</p> */}
                                                            </div>

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
                                    <Table dataSource={filteredDataSource} columns={columns} pagination={false} />
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default Rooms;