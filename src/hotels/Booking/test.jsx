import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file
import Select from 'react-select';
import { Card } from 'reactstrap';

const AddBooking = () => {
    const [selectedRange, setSelectedRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const hotelOptions = [
        { value: 'hotel1', label: 'Hotel 1' },
        { value: 'hotel2', label: 'Hotel 2' },
        { value: 'hotel3', label: 'Hotel 3' }
    ];

    const [selectedHotel, setSelectedHotel] = useState(null);

    return (
        <div className='content-wrapper d-flex flex-column'>
            <div className="content-header">
                <div className='row flex-wrap justify-content-between mx-2'>
                    <div className='col-md-6'>
                        <div className="mb-2 pt-2">
                            <Select
                                options={hotelOptions}
                                value={selectedHotel}
                                onChange={(hotel) => setSelectedHotel(hotel)}
                                placeholder="Select hotel"
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
                    </div>
                    <Card className='col-md-6'>
                        <h5>Hotel Name : {selectedHotel?.label}</h5>

                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AddBooking;
