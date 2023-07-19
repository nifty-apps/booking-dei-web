import React, { useState } from 'react';
import { Button, Card, CardBody, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Form } from 'react-bootstrap';
import Breadcrumb from '../../components/Breadcrumb';
import Select from 'react-select';

const BookingData = [
  {
    "hotelName": "Hotel A",
    "bookings": [
      {
        "customerName": "Tamim",
        "phone": "01712345678",
        "bookingStatus": "checkedIn",
        "details": {
          "roomNo": ['209', '201', '565'],
          "roomType": ['single', 'double', 'triple'],
          "total": ["1500", "2000", "2500"],
        },
        "discount": '200',
        "subTotal": '20000',
        "advance": "10000",
        "payable": "300",
        "checkIn": "12/07/2023",
        "checkOut": "12/07/2023"
      },
      {
        "customerName": "Zaber",
        "phone": "01712345678",
        "bookingStatus": "checkedOut",
        "details": {
          "roomNo": ['209', '901', '404'],
          "roomType": ['single', 'double', 'triple'],
          "total": ["1500", "2000", "2500"],
        },
        "discount": '200', "subTotal": '19000',
        "advance": "1000",
        "payable": "300",
        "checkIn": "12/07/2023",
        "checkOut": "12/07/2023"
      },
    ]
  },
  {
    "hotelName": "Hotel D",
    "bookings": [
      {
        "customerName": "Rakib",
        "phone": "01712345678",
        "bookingStatus": "checkedOut",
        "details": {
          "roomNo": ['109', '201'],
          "roomType": ['single', 'double', 'triple'],
          "total": ["1500", "2000", "2500"],
        },
        "discount": '200',
        "subTotal": '22000',
        "advance": "1000",
        "payable": "300",
        "checkIn": "12/07/2023",
        "checkOut": "12/07/2023"
      }
    ]
  },
  {
    "hotelName": "Hotel C",
    "bookings": [
      {
        "customerName": "Sakib",
        "phone": "01712345678",
        "bookingStatus": "checkedOut",
        "details": {
          "roomNo": ['255', '701'],
          "roomType": ['single', 'double', 'triple'],
          "total": ["1500", "2000", "2500"],
        },
        "discount": '200', "subTotal": '20000',
        "advance": "1000",
        "payable": "300",
        "checkIn": "12/07/2023",
        "checkOut": "12/07/2023"
      }
    ]
  },
  {
    "hotelName": "Hotel B",
    "bookings": [
      {
        "customerName": "John",
        "phone": "0123456789",
        "bookingStatus": "checkedIn",
        "details": {
          "roomNo": ['109', '192'],
          "roomType": ['single', 'single'],
          "total": ["1200", "1200"],
        },
        "discount": '0',
        "subTotal": '25000',
        "advance": "500",
        "payable": "700",
        "checkIn": "13/07/2023",
        "checkOut": "15/07/2023"
      }
    ]
  }
];

const Booking = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    toggleModal();
  };

  const handleHotelSelect = (selectedOption) => {
    setSelectedHotel(selectedOption);
    setSearchQuery('');
  };


  const hotelOptions = BookingData.map((data) => ({
    value: data.hotelName,
    label: data.hotelName
  }));

  const filteredBookings = selectedHotel
    ? BookingData.find((hotel) => hotel.hotelName === selectedHotel.value).bookings
    : BookingData.flatMap((hotel) => hotel.bookings);

  const filteredBookingsBySearch = filteredBookings.filter((booking) => {
    const customerName = booking.customerName.toLowerCase();
    const hotelName = selectedHotel ? selectedHotel.value.toLowerCase() : '';
    const query = searchQuery.toLowerCase();
    return customerName.includes(query) || hotelName.includes(query);
  }
  );

  return (
    <div className='content-wrapper d-flex flex-column'>
      <div className="content-header">
        <div className="align-items-center d-flex mb-2 pt-2">
          <Form.Group controlId="hotelSelect" className="me-3">
   
            <Select
              className='border'
              options={hotelOptions}
              value={selectedHotel}
              onChange={handleHotelSelect}
              placeholder="Select a hotel"
            />
          </Form.Group>

        </div>
      


        {selectedHotel && (
          <h2>Hotel Name: {selectedHotel.value}</h2>
        )}

        <Card>
          <CardBody>
            <Table className="no-wrap mt-3 align-middle" responsive>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Phone No</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookingsBySearch.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.customerName}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.bookingStatus}</td>
                    <td>
                      <Button className="btn text-nowrap" color="primary" size="sm" onClick={() => openModal(booking)}>
                        See Details
                      </Button>
                      {/* <div>
                        <strong>Room No:</strong> {booking.details.roomNo.join(', ')}
                        <br />
                        <strong>Room Type:</strong> {booking.details.roomType.join(', ')}
                        <br />
                        <strong>Rent:</strong> {booking.details.total.join(', ')}
                      </div> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>

        <Modal isOpen={modalOpen} toggle={toggleModal}>
          {selectedBooking && (
            <>
              <ModalHeader toggle={toggleModal}>Booking Details of: {selectedBooking.customerName}</ModalHeader>
              <ModalBody>
                <div>
                  <div className="align-items-center d-flex gap-2 mb-2">
                    <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" width="50px" alt="Customer" />
                    <div>
                      <h5 className="fw-bold">{selectedBooking?.customerName}</h5>
                      <h6>{selectedBooking.phone}</h6>
                    </div>
                  </div>
                  <div className="my-3">
                    <div className="d-flex justify-content-between px-2">
                      <span>Checkedin Date</span>
                      <span>{selectedBooking.checkIn}</span>
                    </div>
                    <div className="d-flex justify-content-between px-2">
                      <span>Checkedout Date</span>
                      <span>{selectedBooking.checkOut}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between px-2">
                    <span>Booking Status</span>
                    <span className="fw-semibold">{selectedBooking.bookingStatus}</span>
                  </div>
                  <div className="p-3 rounded-4 shadow-lg">

                    <table className="table border">
                      <thead>
                        <tr>
                          <th className="border" scope="col">
                            Room
                          </th>
                          <th className="border" scope="col">
                            Type
                          </th>
                          <th className="border" scope="col">
                            Rent
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedBooking.details.roomType.map((roomType, index) => (
                          <tr key={index}>
                            <td className="border">{selectedBooking.details.roomNo[index]}</td>
                            <td className="border">{roomType}</td>
                            <td className="border">{selectedBooking.details.total[index]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div>

                      <div className="d-flex justify-content-between px-2">
                        <span>Sub Total</span>
                        <span className='fw-medium'>{selectedBooking.subTotal}</span>
                      </div>
                      <div className="d-flex justify-content-between px-2">
                        <span>Discount</span>
                        <span className='fw-medium'>{selectedBooking.discount}</span>
                      </div>
                      <div className="d-flex justify-content-between px-2">
                        <span>Advance</span>
                        <span className='fw-medium'>{selectedBooking.advance}</span>
                      </div>
                      <div className="d-flex justify-content-between px-2">
                        <span>Payable</span>
                        <span className='fw-medium'>{selectedBooking.payable}</span>
                      </div>



                    </div>
                  </div>
                </div>

                <div className='mx-3 my-3 shadow-sm'>
                  <h6 className="border-top fw-medium mt-3 pt-1">Transaction History</h6>
                  <div className='border-bottom py-2'>
                    <div className="d-flex flex-wrap justify-content-between">  <span>Abu Taher Molla</span>
                      <span className='text-success'>+ Tk 500</span></div>
                    <div className="d-flex flex-wrap justify-content-between"><span className='date-size'>25-06-2023 To 28-06-2023</span>
                      <span className='date-size'>25-06-2023</span></div>
                  </div>
                  <div className='border-bottom py-2'>
                    <div className="d-flex flex-wrap justify-content-between">  <span>Abu Taher Molla</span>
                      <span className='text-danger'>- Tk 300</span></div>
                    <div className="d-flex flex-wrap justify-content-between"><span className='date-size'>25-06-2023 To 28-06-2023</span>
                      <span className='date-size'>25-06-2023</span></div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </Modal>


      </div>
    </div>
  );
};

export default Booking;
