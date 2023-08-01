// data
import {
  roomNumberFirstFloor,
  roomNumberFourthFloor,
  roomNumberSecondFloor,
  roomNumberThirdFloor,
} from "../../data/data";
import { AiOutlineClose } from "react-icons/ai";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-9 -mt-1">
          {/* title */}
          <h2 className="text-3xl font-semibold text-gray-600 my-4">Home</h2>
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
        <div className="col-span-3 bg-gray-200 p-4 rounded-sm mt-16 ml-4">
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
            <div className="font-semibold text-lg">206</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
