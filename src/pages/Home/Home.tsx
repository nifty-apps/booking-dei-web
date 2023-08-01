// data
import {
  roomNumberFirstFloor,
  roomNumberFourthFloor,
  roomNumberSecondFloor,
  roomNumberThirdFloor,
} from "../../data/data";
import { FaTrashAlt } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          {/* title */}
          <h2 className="text-3xl font-semibold text-gray-600 my-4">Home</h2>
          <div className="grid grid-cols-4 gap-2">
            <div className=" bg-gray-100">
              <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-300 text-black font-semibold">
                First floor
              </div>
              <div className="grid grid-cols-2 gap-2">
                {roomNumberFirstFloor.map((room) => {
                  const { id, roomNumber, lift, roomType, bg } = room;
                  return (
                    <div
                      key={id}
                      className={`w-full rounded-lg shadow-sm p-2 border border-gray-300`}
                      style={{ background: bg }}
                    >
                      <h4>{roomNumber}</h4>
                      <p>{lift}</p>
                      <p>{roomType}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" bg-gray-100">
              <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-300 text-black font-semibold">
                Second floor
              </div>
              <div className="grid grid-cols-2 gap-2">
                {roomNumberSecondFloor.map((room) => {
                  const { id, roomNumber, lift, roomType, bg } = room;
                  return (
                    <div
                      key={id}
                      className="w-full bg-white rounded-lg shadow-sm p-2 border border-gray-300"
                      style={{ background: bg }}
                    >
                      <h4>{roomNumber}</h4>
                      <p>{lift}</p>
                      <p>{roomType}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" bg-gray-100">
              <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-300 text-black font-semibold">
                Third floor
              </div>
              <div className="grid grid-cols-2 gap-2">
                {roomNumberThirdFloor.map((room) => {
                  const { id, roomNumber, lift, roomType, bg } = room;
                  return (
                    <div
                      key={id}
                      className="w-full bg-white rounded-lg shadow-sm p-2 border border-gray-300"
                      style={{ background: bg }}
                    >
                      <h4>{roomNumber}</h4>
                      <p>{lift}</p>
                      <p>{roomType}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" bg-gray-100">
              <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-300 text-black font-semibold">
                Fourth floor
              </div>
              <div className="grid grid-cols-2 gap-2">
                {roomNumberFourthFloor.map((room) => {
                  const { id, roomNumber, lift, roomType, bg } = room;
                  return (
                    <div
                      key={id}
                      className="w-full bg-white rounded-lg shadow-sm p-2 border border-gray-300"
                      style={{ background: bg }}
                    >
                      <h4>{roomNumber}</h4>
                      <p>{lift}</p>
                      <p>{roomType}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-gray-200 p-4">
          <h3 className="text-lg capitalize font-semibold">
            Current Selection
          </h3>
          <div className="flex justify-between">
            <div className="flex items-center">
              <FaTrashAlt />
              <div className="mx-1 ">Super Deluxe Tripel (Non-AC)</div>
            </div>
            <div className="font-semibold">206</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
