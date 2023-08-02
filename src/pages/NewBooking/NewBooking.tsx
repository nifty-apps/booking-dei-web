// data
import {
  roomNumberFirstFloor,
  roomNumberFourthFloor,
  roomNumberSecondFloor,
  roomNumberThirdFloor,
} from "../../data/data";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

const NewBooking = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        {/* btn */}
        <div className="text-3xl font-semibold">NewBooking</div>
        <div className="flex items-center gap-4">
          <button className="text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-700 hover:bg-blue-900 hover:text-white">
            Reset
          </button>
          <button className="bg-blue-900 text-white px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2">
            Confirm Booking
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-5">
        <div className="col-span-9">
          <h1>Room details</h1>
          <h1>Guest details</h1>
          <h1>Additional Guest</h1>
        </div>

        {/* booking summary */}
        <div className="col-span-3 bg-gray-200 p-4 rounded-sm ml-4">
          <h3 className="text-lg capitalize font-semibold mb-5">
            Booking Summary
          </h3>
          <div className="flex justify-between text-md">
            <div className="flex items-center">
              <span className="cursor-pointer">
                <AiOutlineClose />
              </span>
              <div className="mx-2 font-semibold">
                Super Deluxe Tripel (Non-AC)
              </div>
            </div>
            <div className="font-semibold">206</div>
          </div>

          {/* edit btn  */}
          <div className="mt-72">
            <h1>Payments</h1>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md w-full mb-2 font-semibold">
              + New Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBooking;
