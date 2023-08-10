import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import RoomNumber from "../../components/RoomNumber";
import TitleText from "../../components/Title";
import CurrentSelection from "../../components/CurrentSelection";
import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "../../graphql/queries/roomQueries";

const Home = () => {
  const { data, error, loading } = useQuery(GET_ROOMS);
  const [selectedRooms, setSelectedRooms] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-400">Error: {error.message}</p>;

  return (
    <>
      <div className="flex items-center justify-between">
        {/* new booking title */}
        <TitleText text="Home" />
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
        <RoomNumber
          rooms={data?.rooms}
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
        />
        {/* current selection part */}
        <CurrentSelection selectedRooms={selectedRooms} />
      </div>
    </>
  );
};

export default Home;
