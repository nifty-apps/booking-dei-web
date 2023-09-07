import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import TitleText from "../../components/Title";
import { CreateBookingInput } from "../../graphql/__generated__/graphql";
import { RootState } from "../../store";

export interface BookingDetails extends CreateBookingInput {}

const EditRoomBooking = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  console.log(user);

  const { bookingId } = useParams();

  return (
    <>
      <div
        className={`flex items-center justify-between ${
          bookingId && "justify-between"
        }`}
      >
        <TitleText text="Edit Booking" />
        <Link
          className="text-white  py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2  bg-blue-900 px-20 hover:text-white"
          to={`/edit-booking/${bookingId}`}
          onClick={() => console.log("clicked")}
        >
          Edit Booking
        </Link>
      </div>
      <div className="grid grid-cols-12 mt-5">
        <div className="col-span-8 bg-white shadow-sm p-5 mr-4">
          {/* room details */}
          <h1 className="font-semibold text-xl text-gray-500 mb-4 capitalize">
            Room Details
          </h1>
          <div className="flex justify-between mb-8">
            <div>
              <div className="mb-2">Check In</div>
              <input className="border w-36 p-1" type="text" />
            </div>
            <div>
              <div className="mb-2">Check Out</div>
              <input className="border w-36 p-1" type="text" />
            </div>
            <div>
              <div className="mb-2">Room Type</div>
              <input className="border w-36 p-1" type="text" />
            </div>
            <div>
              <div className="mb-2">Room No</div>
              <input className="border w-36 p-1" type="text" />
            </div>
            <div>
              <div className="mb-2">Status</div>
              <select className="border w-36 p-1">
                <option value="">Booked</option>
                <option value="">Checked In</option>
                <option value="">Checked Out</option>
              </select>
            </div>
          </div>

          <h1 className="font-semibold text-xl text-gray-500 mb-4 capitalize">
            Guest Details
          </h1>

          <div className="flex justify-between">
            <div>
              <div className="mb-2">Name</div>
              <input className="border w-36 p-1" type="text" />
            </div>
            <div>
              <div className="mb-2">Phone</div>
              <input className="border w-36 p-1" type="text" />
            </div>
            <div>
              <div className="mb-2">ID Type</div>
              <select className="border w-36 p-1">
                <option value="">NID</option>
                <option value="">PASSPORT</option>
              </select>
            </div>
            <div>
              <div className="mb-2">ID No</div>
              <input className="border w-36 p-1" type="text" />
            </div>
          </div>
        </div>
        {/* booking summary || Payment flow */}
        {/* <BookingSummary bookingDetails={bookingDetails} /> */}
      </div>
    </>
  );
};

export default EditRoomBooking;
