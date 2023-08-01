// data
import {
  roomNumberFirstFloor,
  roomNumberFourthFloor,
  roomNumberSecondFloor,
  roomNumberThirdFloor,
} from "../../data/data";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        {/* new booking btn */}
        <div></div>
        <button className="bg-blue-900 text-white px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2">
          <span>
            <FaPlus />
          </span>
          New Booking
        </button>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          {/* room number part */}
          <div className="grid grid-cols-4 gap-2">
            <div className=" bg-gray-100">
              <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-300 text-black font-semibold mb-4">
                First floor
              </div>
              <div className="grid grid-cols-2 gap-2">
                {roomNumberFirstFloor.map((room) => {
                  const { id, roomNumber, lift, roomType, bg } = room;
                  return (
                    <div
                      key={id}
                      className={`w-full rounded-lg shadow-sm p-2 border border-gray-300 text-center cursor-pointer`}
                      style={{ background: bg }}
                    >
                      <h4 className="font-bold text-lg">{roomNumber}</h4>
                      <p className="flex items-center justify-center">{lift}</p>
                      <p className="text-md">{roomType}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" bg-gray-100">
              <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-300 text-black font-semibold mb-4">
                Second floor
              </div>
              <div className="grid grid-cols-2 gap-2">
                {roomNumberSecondFloor.map((room) => {
                  const { id, roomNumber, lift, roomType, bg } = room;
                  return (
                    <div
                      key={id}
                      className="w-full bg-white rounded-lg shadow-sm p-2 border border-gray-300 text-center cursor-pointer"
                      style={{ background: bg }}
                    >
                      <h4 className="font-bold text-lg">{roomNumber}</h4>
                      <p>{lift}</p>
                      <p className="text-md">{roomType}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" bg-gray-100">
              <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-300 text-black font-semibold mb-4">
                Third floor
              </div>
              <div className="grid grid-cols-2 gap-2">
                {roomNumberThirdFloor.map((room) => {
                  const { id, roomNumber, lift, roomType, bg } = room;
                  return (
                    <div
                      key={id}
                      className="w-full bg-white rounded-lg shadow-sm p-2 border border-gray-300 text-center cursor-pointer"
                      style={{ background: bg }}
                    >
                      <h4 className="font-bold text-lg">{roomNumber}</h4>
                      <p>{lift}</p>
                      <p className="text-md">{roomType}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" bg-gray-100">
              <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-300 text-black font-semibold mb-4">
                Fourth floor
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                {roomNumberFourthFloor.map((room) => {
                  const { id, roomNumber, lift, roomType, bg } = room;
                  return (
                    <div
                      key={id}
                      className="w-full bg-white rounded-lg shadow-sm p-2 border border-gray-300 cursor-pointer"
                      style={{ background: bg }}
                    >
                      <h4 className="font-bold text-lg">{roomNumber}</h4>
                      <p>{lift}</p>
                      <p className="text-md">{roomType}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* current selection part */}
        <div className="col-span-3 bg-gray-200 p-4 rounded-sm ml-4">
          <h3 className="text-lg capitalize font-semibold mb-5">
            Current Selection
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
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md w-full mb-2 font-semibold">
              Edit Booking
            </button>
            {/* view booking btn */}
            <button className="w-full px-4 py-2 border-2 border-blue-900 text-blue-900 rounded-md hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-colors duration-300 font-semibold">
              View Booking Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
