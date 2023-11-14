import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { RootState } from '../../store';
import { GET_ROOMS, GET_ROOM_TYPES } from '../../graphql/queries/roomQueries';
import { Table, Input, Modal, message, Form, Space, Select, } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


import { CREATE_ROOM } from '../../graphql/mutations/contactMutations';
import { CreateRoomInput, UpdateRoomInput } from '../../graphql/__generated__/graphql';
import { useState } from 'react';

import { GET_ROOM_BOOKING } from '../../graphql/queries/roomBookingQueries';
import { FaRegEdit } from 'react-icons/fa';
import { UPDATE_ROOM } from '../../graphql/mutations/bookingMutations';
// import { UPDATE_ROOM_BOOKING } from '../../graphql/mutations/bookingMutations';
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
      const [RoomtID, setGuestID] = useState<string | null>(null);
      const [handleModalOpen, setHandleModalOpen] = useState<boolean>(false);
      const [form] = Form.useForm();


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

      const [createRoom] = useMutation(CREATE_ROOM, {
            refetchQueries: [{ query: GET_ROOMS }],
      });



      const dataSource = RoomsData?.rooms.map((roomData) => {
            const foundRoomType = RoomsTypeData?.roomTypes.find(
                  (roomtype) => roomtype._id === roomData.type
            );

            const FoundRoomStatus = roomBookingsData?.roomBookings.find((data) => data.room._id === roomData._id);



            return {

                  key: roomData?._id,
                  hotel: roomData?.hotel,
                  roomNumber: roomData.number,
                  type: roomData?.type,
                  roomtype: foundRoomType?.title,
                  roomRent: foundRoomType?.rent,
                  status: FoundRoomStatus?.status,
                  roomTypesId: foundRoomType?._id,
                  roombookingsId: FoundRoomStatus?._id,
                  room_id: roomData?._id,
            };
      });

      //  console.log(roomBookingsData)

      const onFinish = async (values: CreateRoomInput) => {
            try {
                  const response = await createRoom({
                        variables: {
                              createRoomInput: {
                                    number: values.number,
                                    floor: values.floor,
                                    position: values.position,
                                    type: selectedRoomTypeId,
                                    hotel: user?.hotels[0] || '', // Hardcoded hotel ID or use a dynamic value
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
                  (data) => data?.room?.type?.title === value
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
                  item.roomtype?.toString().toLowerCase().includes(searchText.toLowerCase())

            )

      });

      console.log(RoomsData)
      const columns = [
            {
                  title: 'ROOM NUMBER',
                  dataIndex: 'roomNumber',
                  key: 'roomNumber',
            },
            {
                  title: 'ROOM TYPE',
                  dataIndex: 'roomtype',
                  key: 'roomtype',
            },
            {
                  title: 'ROOM RENT',
                  dataIndex: 'roomRent',
                  key: 'roomRent',
            },
            {
                  title: 'STATUS',
                  dataIndex: 'status',
                  key: 'status',
            },
            {
                  title: "ACTION",
                  dataIndex: "room_id",
                  key: "room_id",
                  render: (record: string) => {
                        // find clicked guest information
                        // console.log(record)
                        const selectedInformation = RoomsData?.rooms?.find(
                              (data) => data?._id === record
                        );
                        // console.log(selectedInformation)
                        return (
                              <div className="flex items-center cursor-pointer">

                                    <div className="mr-3">
                                          <FaRegEdit
                                                title={"Edit Guest Information"}
                                                onClick={() => {
                                                      setHandleModalOpen(true);
                                                      setGuestID(record);
                                                      // setting the clicked information on modal
                                                   
                                                      form.setFieldsValue({
                                                            floor: selectedInformation?.floor,
                                                             number: selectedInformation?.number,
                                                             position:selectedInformation?.position




                                                      });
                                                }}
                                          />
                                    </div>


                              </div>
                        );
                  },
            },

         
      ];
      // const [updateRoomBooking] = useMutation(UPDATE_ROOM_BOOKING);
    
      const [updateRoom] = useMutation(UPDATE_ROOM,{
            refetchQueries: [{ query: GET_ROOMS }],
      });
      const handleUpdate = async (values:UpdateRoomInput, roomID:string) => {
            try {
              await updateRoom({
                variables: {
                  updateRoomInput: {
                    ...values, // Include other fields from your 'values' object
                    _id: roomID, // Assuming roomID is the ID of the room to update
                  },
                },
              });
              message.success('Room information updated successfully.');
              setHandleModalOpen(false);
            } catch (error) {
              message.error('Failed to update room information. Please try again.');
            }
          };

// console.log(roomBookingsData)



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


                                    {/* for edit  */}
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
                                                onFinish={(values) => handleUpdate(values, RoomtID || "")}
                                          >
                                                <Space direction="vertical" className="w-full">
                                                      <h3>floor</h3>
                                                      <Form.Item name="floor" className="mb-0">
                                                            <Input placeholder="floor" autoComplete="off" />
                                                      </Form.Item>
                                                      <h3>number</h3>
                                                      <Form.Item name="number" className="mb-0">
                                                            <Input placeholder="number" autoComplete="off" />
                                                      </Form.Item>

                                                      <h3>position</h3>
                                                      <Form.Item name="position" className="mb-0">
                                                            <Input placeholder="position" autoComplete="off" />
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
                                    <Table dataSource={filteredDataSource} columns={columns} pagination={false} />
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default Rooms;