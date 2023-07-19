import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Select from 'react-select';
import { Card, FormGroup, Input, Label, Button } from 'reactstrap';
const bookingData = [{
    HotelName: 'Hotel A',
    roomsDetails: [
        {
            roomType: 'single',
            rent: '1000',
            roomNo: ["101", "102", "103"],
            booked: [{
                room: ["101", "103"],
                bookStart: "18-07-2023",
                bookEnd: "20-07-2023"
            }]
        },
        {
            roomType: 'Double',
            rent: '2000',
            roomNo: ["201", "202", "203"],
            booked: [{
                room: ["202", "203"],
                bookStart: "25-07-2023",
                bookEnd: "30-07-2023"
            }]
        },
        {
            roomType: 'Couple',
            rent: '3000',
            roomNo: ["301", "302", "303"]
            , booked: [{
                room: ["303"],
                bookStart: "20-07-2023",
                bookEnd: "25-07-2023"
            }]
        }

    ]
},
{
    HotelName: 'Hotel B',
    roomsDetails: [
        {
            roomType: 'Triple',
            rent: '1000',
            roomNo: ["101", "102", "103"],
            booked: [{
                room: ["101", "103"],
                bookStart: "18-07-2023",
                bookEnd: "20-07-2023"
            }]
        },
        {
            roomType: 'Couple AC',
            rent: '2000',
            roomNo: ["201", "202", "203"],
            booked: [{
                room: ["202", "203"],
                bookStart: "25-07-2023",
                bookEnd: "30-07-2023"
            }]
        },
        {
            roomType: 'Couple Normal',
            rent: '3000',
            roomNo: ["301", "302", "303"]
            , booked: [{
                room: ["303"],
                bookStart: "20-07-2023",
                bookEnd: "25-07-2023"
            }]
        }

    ]
}

]
const AddBooking = () => {
    const [selectedRange, setSelectedRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const [selectedHotel, setSelectedHotel] = useState(null);
    const [selectedRooms, setSelectedRooms] = useState([]);

    const hotelOptions = bookingData.map((hotel) => ({
        value: hotel.HotelName,
        label: hotel.HotelName,
    }));

    const roomOptions = selectedHotel
        ? bookingData.flatMap((hotel) => {
            if (hotel.HotelName === selectedHotel.value) {
                return hotel.roomsDetails.flatMap((room) =>
                    room.roomNo.map((roomNo) => ({
                        value: `${room.roomType} - ${roomNo}`,
                        label: `${room.roomType} - ${roomNo}`,
                    }))
                );
            }
            return [];
        })
        : [];

    const calculateTotalAmount = () => {
        let totalAmount = 0;
        if (selectedRooms && selectedHotel) {
            selectedRooms.forEach((selectedRoom) => {
                const [roomType, roomNo] = selectedRoom.value.split(' - ');
                const hotel = bookingData.find((hotel) => hotel.HotelName === selectedHotel.value);
                const room = hotel.roomsDetails.find((room) => room.roomType === roomType && room.roomNo.includes(roomNo));
                if (room) {
                    totalAmount += parseInt(room.rent);
                }
            });
        }
        return totalAmount;
    };

    console.log(selectedRange.startDate);
    console.log(selectedRange.startDate);
    return (
        <div className="content-wrapper d-flex flex-column">
            <div className="content-header">
                <div className="row flex-wrap justify-content-between mx-2">
                    <div className="col-md-6">
                        <div className="mb-2 pt-2">
                            <Select
                                options={hotelOptions}
                                value={selectedHotel}
                                onChange={(hotel) => {
                                    setSelectedHotel(hotel);
                                    setSelectedRooms([]);
                                }}
                                placeholder="Select hotel"
                            />
                        </div>
                        <div className="mb-2 pt-2">
                            <Select
                                options={roomOptions}
                                value={selectedRooms}
                                onChange={(rooms) => setSelectedRooms(rooms)}
                                placeholder="Select room(s)"
                                isDisabled={!selectedHotel}
                                isMulti
                            />
                        </div>
                        <DateRange
                            ranges={[selectedRange]}
                            onChange={(ranges) => setSelectedRange(ranges.selection)}
                            showDateDisplay={false}
                            showMonthAndYearPickers={false}
                            showSelectionPreview={false}
                            showPreview={false}
                        />
                        <div>
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="Checkin"
                                    label="Checkin now"
                                />
                            </Form>

                            <Form>
                                <FormGroup floating>
                                    <Input
                                        id="CustomarName"
                                        name="name"
                                        placeholder="Name"
                                        type="text"
                                    />
                                    <Label for="CustomarName">
                                        Customar Name
                                    </Label>
                                </FormGroup>
                                {' '}
                                <FormGroup floating>
                                    <Input
                                        id="phoneNumber"
                                        name="number"
                                        placeholder="Phone Number"
                                        type="text"
                                    />
                                    <Label for="phoneNumber">
                                        Phone Number
                                    </Label>
                                </FormGroup>
                                <div className='d-flex justify-content-between'>
                                    <FormGroup floating>
                                        <Input
                                            id="discount"
                                            name="number"
                                            placeholder="Discount"
                                            type="text"
                                        />
                                        <Label for="discount">
                                            Discount
                                        </Label>
                                    </FormGroup>
                                    <FormGroup floating>
                                        <Input
                                            id="Advance"
                                            name="Advance"
                                            placeholder="Advance Ammount"
                                            type="text"
                                        />
                                        <Label for="Advance">
                                            Advance Ammount
                                        </Label>
                                    </FormGroup>
                                </div>
                                {' '}
                                <Button>
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                    <Card className="col-md-6">
                        <h5>Hotel Name: {selectedHotel?.label}</h5>
                        <span></span>
                        <h6>Selected Rooms:</h6> <ul>{selectedRooms.map((room) => <li>{room.label}</li>)}</ul>
                        <h6>Total Amount: {calculateTotalAmount()}</h6>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AddBooking;