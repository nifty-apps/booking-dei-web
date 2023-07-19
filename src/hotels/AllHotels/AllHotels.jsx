import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Table } from 'reactstrap';
import Breadcrumb from '../../components/Breadcrumb';
import Select, { components } from 'react-select';
import { Form } from 'react-bootstrap';

const hotelData = [
  {
    id: "6hf54",
    name: "Hotel A",
    email: "hgover@gmail.com",
    location: "Flexy React",
    status: "pending",
    checkIn: "20/06/2023",
    checkOut: "20/06/2023",
  },
  {
    id: "654gd",
    name: "Hotel B",
    email: "hgover@gmail.com",
    location: "Lading pro React",
    status: "done",
    checkIn: "20/06/2023",
    checkOut: "20/06/2023",
  },
  {
    id: "65jkl4",
    name: "Hotel C",
    email: "hgover@gmail.com",
    location: "Elite React",
    status: "holt",
    checkIn: "20/06/2023",
    checkOut: "20/06/2023",
  },
  {
    id: "65ghgg4",
    name: "Hotel D",
    email: "hgover@gmail.com",
    location: "Flexy React",
    status: "pending",
    checkIn: "20/06/2023",
    checkOut: "20/06/2023",
  },
  {
    id: "654fdd",
    name: "Hotel E",
    email: "hgover@gmail.com",
    location: "Ample React",
    status: "done",
    checkIn: "20/06/2023",
    checkOut: "20/06/2023",
  },
];

const AllHotels = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const hotelOptions = hotelData.map((data) => ({
    value: data.name,
    label: data.name,
  }));

  const handleHotelSelect = (selectedOption) => {
    setSelectedHotel(selectedOption);
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <span className="fa fa-chevron-down" />
      </components.DropdownIndicator>
    );
  };

  // Filter the hotelData based on the selected hotel
  const filteredHotelData = selectedHotel
    ? hotelData.filter((hotel) => hotel.name === selectedHotel.value)
    : hotelData;

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="align-items-center d-flex mb-2">
          <Form.Group controlId="hotelSelect" className="me-3">

            <Select
              className="border"
              options={hotelOptions}
              value={selectedHotel}
              onChange={handleHotelSelect}
              components={{ DropdownIndicator }}
              placeholder="Select a hotel"
            />
          </Form.Group>
        </div>
        <Breadcrumb route={'Hotels'} />



        <Card>
          <CardBody>
            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>Hotel Name</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredHotelData.map((hotel, index) => (
                  <tr key={index} className="border-top">
                    <td>{hotel.name}</td>
                    <td>{hotel.location}</td>
                    <td>{hotel.status}</td>
                    <td>{hotel.checkIn}</td>
                    <td>{hotel.checkOut}</td>
                    <td>
                      <Link to={`/dashboard/hotel/${hotel.id}`}>
                        <Button className="btn" color="primary" size="sm">
                          See Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AllHotels;
