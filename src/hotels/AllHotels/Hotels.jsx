import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Col, Table } from 'reactstrap';
import Rooms from './Rooms';
import Breadcrumb from '../../components/Breadcrumb';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const Hotels = () => {
    const hotelData = [
        {
            hotelName: "Hotel Samudra Bilash",
            owner: "Dr Mizan",
            address: "Kolatoli beatch point,Marin drive road",
            contact: "01712345678",
            todayBooking: "80",
            todayChecking: "34",
            remaining: "46",
            available: "61",
            employees: [
                { id: 1, name: 'Rakib', email: 'Rakib@hotel.com', address: 'mdo' },
                { id: 2, name: 'Jacob', email: 'Thornton@hotel.com', address: 'fat' },

            ]
        },
        {
            hotelName: "Hotel B",
            owner: "Jon de",
            address: "Marin drive road,Cox bazar",
            contact: "01712345678",
            todayBooking: "180",
            todayChecking: "134",
            remaining: "46",
            available: "150",
            employees: [
                { id: 1, name: 'Tamim', email: 'Tamim@hotel.com', address: 'abc' },
                { id: 2, name: 'abc', email: 'abc@hotel.com', address: 'abc' },
                { id: 3, name: 'abcd', email: 'abcd@hotel.com', address: 'abcd' }
            ]
        }
    ];

    const options = hotelData.map((hotel) => ({
        value: hotel.hotelName,
        label: hotel.hotelName
    }));

    const [selectedHotel, setSelectedHotel] = useState(hotelData[0]);

    const handleHotelChange = (selectedOption) => {
        const hotel = hotelData.find((h) => h.hotelName === selectedOption.value);
        setSelectedHotel(hotel);
    };

    return (
        <div className='content-wrapper'>
            <div className='content-header'>
                <div className='align-items-center d-flex mb-2 pt-2 text-nowrap'>
                    <Select options={options} onChange={handleHotelChange} placeholder="Select a hotel" />
                </div>

              
                <div className='ps-3 py-1 shadow-sm'>
                    <h5>Hotel Name :{selectedHotel.hotelName}</h5>
                    <h6>Owner : {selectedHotel.owner}</h6>
                    <p className='mb-0'> Address : {selectedHotel.address} </p>
                    <p>contact : {selectedHotel.contact} </p>
                </div>
                <div className='d-flex flex-wrap justify-content-around my-3 text-center'>
                    <Link to='/dashboard/calendar' className='text-decoration-none border-end border-start px-4 my-4'>
                        <span className='fs-5'><i className="text-cyan fa-solid fa-user-check"></i>&nbsp;&nbsp;
                            {selectedHotel.todayBooking}</span>
                        <p className='mb-0'>Today Booking</p>
                    </Link>
                    <Link to='/dashboard/calendar' className='text-decoration-none border-end border-start px-4 my-4'>
                        <span className='fs-5'><i className="text-cyan fa-solid fa-bed"></i>&nbsp;&nbsp;
                            {selectedHotel.todayChecking}</span>
                        <p className='mb-0'>Today Checking</p>
                    </Link>
                    <Link to='/dashboard/calendar' className='text-decoration-none border-end border-start px-4 my-4'>
                        <span className='fs-5'><i className="text-cyan fa-sharp fa-solid fa-door-open"></i>&nbsp;&nbsp;
                            {selectedHotel.remaining}</span>
                        <p className='mb-0'>remaining</p>
                    </Link>
                    <Link to='/dashboard/calendar' className='text-decoration-none border-end border-start px-4 my-4'>
                        <span className='fs-5'><i className="fa-solid  text-cyan fa-house-circle-check"></i>&nbsp;&nbsp;
                            {selectedHotel.available}  </span>
                        <p className='mb-0'>Available Rooms</p>
                    </Link>
                </div>
                <Col lg="12">
                    {/* <Card>
                        <div className='d-flex justify-content-between align-items-center'>
                            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                                Employee List
                            </CardTitle>
                            <Link to='/' className="border-bottom btn btn-secondary mb-0  text-decoration-none">
                                <i className="fa-solid fa-plus"></i> Add Employee
                            </Link>
                        </div>
                        <CardBody className="">
                            <Table bordered striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedHotel.employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <th scope="row">{employee.id}</th>
                                            <td>{employee.name}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.address}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card> */}
                </Col>
            </div>
            {/* Rooms details */}
            <Rooms />
        </div>
    );
};

export default Hotels;
