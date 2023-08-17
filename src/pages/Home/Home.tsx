import { DatePicker } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import FloorPlan, { Room } from "../../components/FloorPlan";
import SelectionSummary from "../../components/SelectionSummary";
import TitleText from "../../components/Title";

const Home = () => {
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);

  return (
    <>
      <div className="flex items-center justify-between">
        {/* new booking title */}
        <TitleText text="Home" />
        {/* Date range picker */}
        <div>
          <DatePicker.RangePicker format="YYYY-MM-DD" />
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
