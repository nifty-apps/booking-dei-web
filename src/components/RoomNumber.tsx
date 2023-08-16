interface Room {
  number: number;
  type: {
    title: string;
    rent: number;
  };
  _id: string;
  status: string; // Add status to Room interface
}

interface RoomBooking {
  _id: string;
  status: string;
  room: string;
}

interface RoomNumberProps {
  rooms: Room[];
  roomBookings: RoomBooking[];
  selectedRooms: Room[];
  setSelectedRooms: (rooms: Room[]) => void;
}

const RoomNumber: React.FC<RoomNumberProps> = ({
  rooms,
  roomBookings,
  selectedRooms,
  setSelectedRooms,
}: RoomNumberProps) => {
  const toggleRoomSelection = (room: Room) => {
    if (selectedRooms.includes(room)) {
      setSelectedRooms(
        selectedRooms.filter((selectedRoom) => selectedRoom !== room)
      );
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  const renderRooms = (floorRooms: Room[]) => (
    <div className="grid grid-cols-2 gap-2">
      {floorRooms.map((room) => {
        const { number, type, _id, status } = room;
        // console.log(`Main status: `, status);
        const roomBookingStatus = roomBookings?.find(
          (booking) => booking?.status === status
        );

        // console.log(`roomBookingStatus`, roomBookingStatus);

        const getStatusColorClass = (bookingStatus: string) => {
          switch (bookingStatus) {
            case "available":
              return "bg-red-50";
            case "BOOKED":
              return "bg-blue-400";
            case "CHECKEDIN":
              return "bg-green-100";
            case "CHECKEDOUT":
              return "bg-black-100";
            case "CANCELLED":
              return "bg-purple-100";
            default:
              return "bg-gray-100";
          }
        };

        const bgColorClass = getStatusColorClass(
          roomBookingStatus?.status || "available"
        );

        return (
          <div
            key={_id}
            className={`${bgColorClass} w-full rounded-lg shadow-sm p-2 border border-gray-500 text-center cursor-pointer flex flex-col justify-center`}
            onClick={() => toggleRoomSelection(room)}
          >
            <h4 className="font-bold text-lg">{number}</h4>
            <p className={`text-md`}>{type.title}</p>
          </div>
        );
      })}
    </div>
  );

  const firstFloorRooms = rooms.filter(
    (room) => room.number >= 100 && room.number < 200
  );
  const secondFloorRooms = rooms.filter(
    (room) => room.number >= 200 && room.number < 300
  );
  const thirdFloorRooms = rooms.filter(
    (room) => room.number >= 300 && room.number < 400
  );
  const fourthFloorRooms = rooms.filter(
    (room) => room.number >= 400 && room.number < 500
  );

  return (
    <div className="col-span-9 bg-white p-5 rounded">
      <div className="grid grid-cols-4 gap-2">
        <div>
          <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-500 text-black font-semibold mb-4">
            First floor
          </div>
          {renderRooms(firstFloorRooms)}
        </div>
        <div>
          <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-500 text-black font-semibold mb-4">
            Second floor
          </div>
          {renderRooms(secondFloorRooms)}
        </div>
        <div>
          <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-500 text-black font-semibold mb-4">
            Third floor
          </div>
          {renderRooms(thirdFloorRooms)}
        </div>
        <div>
          <div className="capitalize border text-center py-3 bg-white rounded-lg border-gray-500 text-black font-semibold mb-4">
            Fourth floor
          </div>
          {renderRooms(fourthFloorRooms)}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-3">
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
    </div>
  );
};

export default RoomNumber;
