import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import RoomNumber from "../../components/RoomNumber";
import TitleText from "../../components/Title";
import CurrentSelection from "../../components/CurrentSelection";
import { GET_ROOMS } from "../../graphql/queries/roomQueries";
import { useQuery } from "@apollo/client";

const Home = () => {
  const { data, error, loading } = useQuery(GET_ROOMS);
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
        <RoomNumber />
        {/* current selection part */}
        <CurrentSelection />
      </div>
    </>
  );
};

export default Home;
