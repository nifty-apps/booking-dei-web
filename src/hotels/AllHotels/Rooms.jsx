import React from 'react';
import { Card, CardBody, CardTitle, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
const Room = () => {
    /* 
    Sample dat
    102
Honeymoon Suite AC */
    const rooms = [
        {
            id: 1,
            type: 'Honeymoon Suite',
            number: 102,
            rent: 1000,
            description: '1st Floor,Honeymoon Suite AC',
        },
        {
            id: 2,
            type: 'Double',
            number: 302,
            rent: 1500,
            description: '2 bed Double room',
        },
        {
            id: 3,
            type: 'Single',
            number: 203,
            rent: 900,
            description: '1 bed Single room',
        },
        {
            id: 4,
            type: 'Double',
            number: 401,
            rent: 1800,
            description: '2 bed Double room',
        },
        {
            id: 5,
            type: 'Triple',
            number: 505,
            rent: 2200,
            description: '3 bed Triple room',
        },
    ];

    return (
        <div >
            <Col lg="12">
                <Card>
                    <div className='d-flex justify-content-between align-items-center'><CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        Rooms
                    </CardTitle>
                        <Link to='/' className="border-bottom btn btn-secondary mb-0  text-decoration-none">
                            <i className="fa-solid fa-plus"></i>    Add Room
                        </Link></div>
                    <CardBody className="">
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Types of Rooms</th>
                                    <th>Room Number</th>
                                    <th>Rent</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map((room) => (
                                    <tr key={room.id}>
                                        <th scope="row">{room.id}</th>
                                        <td>{room.type}</td>
                                        <td>{room.number}</td>
                                        <td>{room.rent}</td>
                                        <td>{room.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
};

export default Room;
