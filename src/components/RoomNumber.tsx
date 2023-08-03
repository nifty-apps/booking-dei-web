import {
  roomNumberFirstFloor,
  roomNumberFourthFloor,
  roomNumberSecondFloor,
  roomNumberThirdFloor,
} from "../data/data";

const RoomNumber = () => {
  return (
    <>
      <div className="col-span-9">
        {/* room number part */}
        <div className="grid grid-cols-4 gap-2">
          <div className=" bg-gray-100">
            <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-500 text-black font-semibold mb-4">
              First floor
            </div>
            <div className="grid grid-cols-2 gap-2">
              {roomNumberFirstFloor.map((room) => {
                const { id, roomNumber, lift, roomType, bg } = room;
                return (
                  <div
                    key={id}
                    className={`w-full rounded-lg shadow-sm p-2 border border-gray-500 text-center cursor-pointer flex flex-col justify-center`}
                    style={{ background: bg }}
                  >
                    <h4 className="font-bold text-lg">{roomNumber}</h4>
                    <div>
                      <span>{lift}</span>
                    </div>
                    <p className="text-md">{roomType}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" bg-gray-100">
            <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-500 text-black font-semibold mb-4">
              Second floor
            </div>
            <div className="grid grid-cols-2 gap-2">
              {roomNumberSecondFloor.map((room) => {
                const { id, roomNumber, lift, roomType, bg, color } = room;
                return (
                  <div
                    key={id}
                    className={`w-full rounded-lg shadow-sm p-2 border border-gray-500 text-center cursor-pointer flex flex-col justify-center`}
                    style={{ background: bg, color: color }}
                  >
                    <h4 className="font-bold text-lg">{roomNumber}</h4>
                    <div>
                      <span>{lift}</span>
                    </div>
                    <p className="text-md">{roomType}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" bg-gray-100">
            <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-500 text-black font-semibold mb-4">
              Third floor
            </div>
            <div className="grid grid-cols-2 gap-2">
              {roomNumberThirdFloor.map((room) => {
                const { id, roomNumber, lift, roomType, bg } = room;
                return (
                  <div
                    key={id}
                    className="w-full bg-white rounded-lg shadow-sm p-2 border border-gray-500 text-center cursor-pointer flex flex-col justify-center"
                    style={{ background: bg }}
                  >
                    <h4 className="font-bold text-lg">{roomNumber}</h4>
                    <div>
                      <span>{lift}</span>
                    </div>
                    <p className="text-md">{roomType}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" bg-gray-100">
            <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-500 text-black font-semibold mb-4">
              Fourth floor
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              {roomNumberFourthFloor.map((room) => {
                const { id, roomNumber, lift, roomType, bg } = room;
                return (
                  <div
                    key={id}
                    className="w-full bg-white rounded-lg shadow-sm p-2 border border-gray-500 cursor-pointer flex flex-col justify-center"
                    style={{ background: bg }}
                  >
                    <h4 className="font-bold text-lg">{roomNumber}</h4>
                    <div>
                      <span>{lift}</span>
                    </div>
                    <p className="text-md">{roomType}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* rounding circle */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="w-5 h-5 rounded-full bg-white border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Available</span>

          <div className="w-5 h-5 rounded-full bg-blue-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Booked</span>

          <div className="w-5 h-5 rounded-full bg-green-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Check In</span>

          <div className="w-5 h-5 rounded-full bg-gray-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Check Out</span>

          <div className="w-5 h-5 rounded-full bg-orange-100  border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Partial Payment</span>

          <div className="w-5 h-5 rounded-full bg-red-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Unavailable</span>
        </div>
      </div>
    </>
  );
};

export default RoomNumber;
