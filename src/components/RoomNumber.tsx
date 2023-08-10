import React from "react";

interface Room {
  number: number;
  type: {
    title: string;
    rent: number;
  };
  _id: string;
}

interface RoomNumberProps {
  rooms: Room[];
  selectedRooms: Room[];
  setSelectedRooms: (rooms: Room[]) => void;
}

const RoomNumber: React.FC<RoomNumberProps> = ({
  rooms,
  selectedRooms,
  setSelectedRooms,
}) => {
  // Separate the rooms based on floor
  const firstFloorRooms = rooms?.filter(
    (room) => room.number >= 100 && room.number < 200
  );
  const secondFloorRooms = rooms?.filter(
    (room) => room.number >= 200 && room.number < 300
  );
  const thirdFloorRooms = rooms?.filter(
    (room) => room.number >= 300 && room.number < 400
  );
  const fourthFloorRooms = rooms?.filter(
    (room) => room.number >= 400 && room.number < 500
  );

  const toggleRoomSelection = (room: Room) => {
    if (selectedRooms.includes(room)) {
      setSelectedRooms(
        selectedRooms.filter((selectedRoom) => selectedRoom !== room)
      );
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  // Function to render rooms
  const renderRooms = (floorRooms: Room[]) => (
    <div className="grid grid-cols-2 gap-2">
      {floorRooms?.map((room) => {
        const { number, type, _id } = room;
        return (
          <div
            key={_id}
            className={`w-full rounded-lg shadow-sm p-2 border border-gray-500 text-center cursor-pointer flex flex-col justify-center`}
            onClick={() => toggleRoomSelection(room)}
          >
            <h4 className="font-bold text-lg">{number}</h4>
            <p className="text-md">{type.title}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="col-span-9 bg-white p-5 rounded">
        {/* room number part */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-gray-100">
            <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-500 text-black font-semibold mb-4">
              First floor
            </div>
            {renderRooms(firstFloorRooms)}
          </div>
          <div className="bg-gray-100">
            <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-500 text-black font-semibold mb-4">
              Second floor
            </div>
            {renderRooms(secondFloorRooms)}
          </div>
          <div className="bg-gray-100">
            <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-500 text-black font-semibold mb-4">
              Third floor
            </div>
            {renderRooms(thirdFloorRooms)}
          </div>
          <div className="bg-gray-100">
            <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-500 text-black font-semibold mb-4">
              Fourth floor
            </div>
            {renderRooms(fourthFloorRooms)}
          </div>
        </div>
        {/* rounding circle */}
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
        ;
      </div>
    </>
  );
};

export default RoomNumber;
