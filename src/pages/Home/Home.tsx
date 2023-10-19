import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import FloorPlan, { Room } from "../../components/FloorPlan";
import RemainingRooms from "../../components/RemainingRooms";
import TitleText from "../../components/Title";

const Home = () => {
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(
    dayjs(selectedDate).format("YYYY-MM-DD")
  );

  const handlePreviousClick = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
    setFormattedDate(dayjs(newDate).format("YYYY-MM-DD"));
  };

  const handleNextClick = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
    setFormattedDate(dayjs(newDate).format("YYYY-MM-DD"));
  };

  return (
    <>
      <div className="flex items-center">
        {/* new booking title */}
        <TitleText text="Home" />
        {/* Date range picker */}
        <div className="mx-auto flex items-center">
          <Button type="primary" ghost onClick={handlePreviousClick}>
            Previous
          </Button>
          <div>
            <DatePicker
              className="mx-1"
              allowClear={false}
              placeholder="Select Date"
              value={dayjs(formattedDate)}
              onChange={(_, date) => {
                const newDate = new Date(date);
                setSelectedDate(newDate);
                setFormattedDate(dayjs(newDate).format("YYYY-MM-DD"));
              }}
            />

            <Button type="primary" ghost onClick={handleNextClick}>
              Next
            </Button>
          </div>
        </div>

        <Link
          to="/new-booking"
          className="bg-blue-900 text-white px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 hover:text-white"
        >
          <span>
            <FaPlus />
          </span>
          New Booking
        </Link>
      </div>
      <div className="grid grid-cols-12 mt-5">
        {/* room number part */}
        <div className="col-span-9">
          <FloorPlan
            selectedRooms={selectedRooms}
            onSelectionChange={(rooms) => setSelectedRooms(rooms)}
            startDate={selectedDate}
            endDate={selectedDate}
          />
        </div>
        {/* current selection part  */}
        <div className="col-span-3">
          <RemainingRooms startDate={selectedDate} endDate={selectedDate} />
        </div>
      </div>
    </>
  );
};

export default Home;
