import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import FloorPlan, { Room } from "../../components/FloorPlan";
import SelectionSummary from "../../components/SelectionSummary";
import TitleText from "../../components/Title";

const Home = () => {
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<
    RangeValue<dayjs.Dayjs>
  >([dayjs(), dayjs().add(1, "day")]);

  // Function to handle changing the date range to the previous day
  const handlePreviousDay = () => {
    setSelectedDateRange((prevRange) => {
      if (prevRange) {
        return [
          prevRange[0]?.subtract(1, "day") || dayjs(),
          prevRange[1]?.subtract(1, "day") || dayjs().add(1, "day"),
        ];
      }
      return prevRange;
    });
  };

  // Function to handle changing the date range to the next day
  const handleNextDay = () => {
    setSelectedDateRange((prevRange) => {
      if (prevRange) {
        return [
          prevRange[0]?.add(1, "day") || dayjs(),
          prevRange[1]?.add(1, "day") || dayjs().add(1, "day"),
        ];
      }
      return prevRange;
    });
  };

  return (
    <>
      <div className="flex items-center">
        {/* new booking title */}
        <TitleText text="Home" />
        {/* Date range picker */}
        <div className="mx-auto flex items-center">
          <Button type="primary" ghost onClick={handlePreviousDay}>
            Previous Day
          </Button>
          <div>
            <DatePicker.RangePicker
              allowClear={false}
              format="YYYY-MM-DD"
              value={selectedDateRange}
              onChange={(value) => setSelectedDateRange(value)}
            />
            <Button type="primary" ghost onClick={handleNextDay}>
              Next Day
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
        <FloorPlan
          selectedRooms={selectedRooms}
          onSelectionChange={(rooms) => setSelectedRooms(rooms)}
          startDate={selectedDateRange?.[0]?.toDate() as Date}
          endDate={selectedDateRange?.[1]?.toDate() as Date}
        />
        {/* current selection part */}
        <SelectionSummary
          selectedRooms={selectedRooms}
          onChange={(rooms) => setSelectedRooms(rooms)}
        />
      </div>
    </>
  );
};

export default Home;
