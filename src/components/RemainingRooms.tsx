import { useQuery } from "@apollo/client";
import { Card } from "antd";
import { useSelector } from "react-redux";
import { GET_ROOMS_BY_FLOOR } from "../graphql/queries/roomQueries";
import { RootState } from "../store";

interface FloorPlanProps {
  startDate: Date;
  endDate: Date;
}

const RemainingRooms = ({ startDate, endDate }: FloorPlanProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { data, error } = useQuery(GET_ROOMS_BY_FLOOR, {
    variables: {
      hotel: user?.hotels[0] || "",
      startDate,
      endDate,
    },
  });

  if (error) return <p>Error : {error.message}</p>;

  // Filter unbooked rooms and exclude "Staff" and other categories
  const unBookedRooms = data?.roomsByFloor
    ?.flatMap((floor) =>
      floor.rooms.filter(
        (room) =>
          room?.roombookings?.length === 0 &&
          room.number !== "Staff" &&
          room.type.title !== "Lift"
      )
    )
    .filter((room) => room.number !== "Staff" && room.type.title !== "Lift");

  // Count remaining rooms by room type
  const remainingRoomsByType: { [key: string]: number } = {};
  unBookedRooms?.forEach((room) => {
    const roomType = room.type.title;
    if (remainingRoomsByType[roomType]) {
      remainingRoomsByType[roomType] += 1;
    } else {
      remainingRoomsByType[roomType] = 1;
    }
  });

  return (
    <>
      <Card
        title="Available Rooms By Room Type"
        bordered={false}
        style={{ width: 300 }}
        className="bg-transparent"
      >
        {Object.keys(remainingRoomsByType).map((roomType) => (
          <div key={roomType}>
            <p className="mb-2">
              {roomType} - {remainingRoomsByType[roomType]}
            </p>
          </div>
        ))}
      </Card>
    </>
  );
};

export default RemainingRooms;
