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
          <div className="grid grid-cols-4 gap-2">
            <div className=" bg-gray-100">
              <div className="capitalize">First floor</div>
              <div className="grid grid-cols-2 gap-2">
                {roomNumberFirstFloor.map((room) => {
                  const { id, roomNumber, lift, roomType } = room;
                  return (
                    <div
                      key={id}
                      className="w-full bg-white rounded-lg shadow-sm p-2 border border-gray-300"
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
              <div>Second floor</div>
              <div className="grid grid-cols-2 gap-2">
                {roomNumberSecondFloor.map((room) => {
                  const { id, roomNumber, lift, roomType } = room;
                  return (
                    <div
                      key={id}
                      className="w-full bg-white rounded-lg shadow-sm p-2 border border-gray-300"
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
              <div>Third floor</div>
              <div className="grid grid-cols-2 gap-2">
                {roomNumberThirdFloor.map((room) => {
                  const { id, roomNumber, lift, roomType } = room;
                  return (
                    <div
                      key={id}
                      className="w-full bg-white rounded-lg shadow-sm p-2 border border-gray-300"
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
              <div>Fourth floor</div>
              <div className="grid grid-cols-2 gap-2">
                {roomNumberFourthFloor.map((room) => {
                  const { id, roomNumber, lift, roomType } = room;
                  return (
                    <div
                      key={id}
                      className="w-full bg-white rounded-lg shadow-sm p-2 border border-gray-300"
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
