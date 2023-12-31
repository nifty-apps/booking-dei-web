import { AiOutlineClose } from "react-icons/ai";
import { Room } from "./FloorPlan";

interface CurrentSelectionProps {
  selectedRooms: Room[];
  onChange: (rooms: Room[]) => void;
}

const SelectionSummary = ({
  selectedRooms,
  onChange,
}: CurrentSelectionProps) => {
  const removeItem = (room: Room) => {
    const newRooms = selectedRooms.filter((item) => item._id !== room._id);
    onChange(newRooms);
  };

  if (selectedRooms.length === 0)
    return (
      <div className="col-span-3 bg-gray-200 p-4 rounded-sm ml-4">
        <h3 className="text-lg capitalize font-semibold mb-5">
          Current Selection
        </h3>
        <p className="text-gray-500">No current selection</p>
      </div>
    );

  return (
    <div className="col-span-3 bg-gray-200 p-4 rounded-sm ml-4">
      <h3 className="text-lg capitalize font-semibold mb-5">
        Current Selection
      </h3>

      {/* selected rooms */}
      {selectedRooms.length > 0 &&
        selectedRooms.map((room) => {
          return (
            <>
              <div key={room._id} className="flex justify-between text-md">
                <div className="flex items-center">
                  <span
                    className="cursor-pointer"
                    onClick={() => removeItem(room)}
                  >
                    <AiOutlineClose />
                  </span>
                  <div className="mx-2 font-semibold">{room.type.title}</div>
                </div>
                <div className="mx-2 font-semibold">{room.number}</div>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default SelectionSummary;
