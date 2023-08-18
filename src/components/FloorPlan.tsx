import { useQuery } from "@apollo/client";
import classNames from "classnames";
import {
  RoomBookingDetails,
  RoomBookingStatus,
  RoomBookingsOverviewResponse,
} from "../graphql/__generated__/graphql";
import { GET_ROOM_BOOKING_OVERVIEW } from "../graphql/queries/roomQueries";

export type Room = {
  _id: string;
  number: string;
  type: {
    title: string;
    rent: number;
  };
  bookings: RoomBookingDetails[];
};

interface FloorPlanProps {
  selectedRooms?: Room[];
  onSelectionChange: (rooms: Room[]) => void;
  startDate: Date;
  endDate: Date;
}

const FloorPlan = ({
  selectedRooms = [],
  onSelectionChange: setSelectedRooms,
  startDate,
  endDate,
}: FloorPlanProps) => {
  const { loading, error, data } = useQuery(GET_ROOM_BOOKING_OVERVIEW, {
    variables: {
      hotel: "64d0a1d008291a484b015d0b",
      startDate,
      endDate,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const toggleRoomSelection = (room: Room) => {
    if (selectedRooms.includes(room)) {
      setSelectedRooms(
        selectedRooms.filter((selectedRoom) => selectedRoom !== room)
      );
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  const renderRooms = (floorRooms: RoomBookingsOverviewResponse[]) => (
    <div className="grid grid-cols-2 gap-2">
      {floorRooms.map((room) => {
        const { number, type, _id, bookings } = room;
        const status =
          bookings.length > 0 ? RoomBookingStatus.Booked : "AVAILABLE";

        const bgClass = classNames({
          // "bg-white": status === "AVAILABLE",
          "bg-red-100": status === "BOOKED",
          "bg-blue-600 text-white": selectedRooms.includes(room),
        });

        return (
          <div
            key={_id}
            className={`w-full rounded-lg shadow-sm p-2 border border-gray-500 text-center cursor-pointer flex flex-col justify-center ${bgClass}`}
            onClick={() => toggleRoomSelection(room)}
          >
            <h4 className="font-bold text-lg">{number}</h4>
            <p className={`text-md`}>{type.title}</p>
          </div>
        );
      })}
    </div>
  );

  const rooms = data?.roomBookingsOverview || [];

  const firstFloorRooms = rooms.filter(
    (room) => Number(room.number) >= 100 && Number(room.number) < 200
  );
  const secondFloorRooms = rooms.filter(
    (room) => Number(room.number) >= 200 && Number(room.number) < 300
  );
  const thirdFloorRooms = rooms.filter(
    (room) => Number(room.number) >= 300 && Number(room.number) < 400
  );
  const fourthFloorRooms = rooms.filter(
    (room) => Number(room.number) >= 400 && Number(room.number) < 500
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
        {/* Status indicators */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="w-5 h-5 rounded-full bg-white border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Available</span>

          <div className="w-5 h-5 rounded-full bg-red-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Checked In</span>

          <div className="w-5 h-5 rounded-full bg-green-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Checked Out</span>

          <div className="w-5 h-5 rounded-full bg-yellow-100 border border-gray-500"></div>
          <span className="text-gray-500 font-semibold">Cancelled</span>
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;
