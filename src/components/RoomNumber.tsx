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
      </div>
    </>
  );
};

export default RoomNumber;
