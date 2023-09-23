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

  const { data, loading, error } = useQuery(GET_ROOMS_BY_FLOOR, {
    variables: {
      hotel: user?.hotels[0] || "",
      startDate,
      endDate,
    },
  });

  if (loading) return <p>Loading...</p>;
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

  return (
    <>
      <Card
        title="Remaining Rooms"
        bordered={false}
        style={{ width: 400 }}
        className="bg-transparent"
      >
        {unBookedRooms?.map((room) => (
          <div key={room._id}>
            <p className="mb-2">
              {room.type.title} - {room.number}
            </p>
          </div>
        ))}
      </Card>
    </>
  );
};

export default RemainingRooms;
