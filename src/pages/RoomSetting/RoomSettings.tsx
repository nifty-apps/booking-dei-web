import { useState } from "react";
import TitleText from "../../components/Title";
import { PlusOutlined } from "@ant-design/icons";
import Rooms from "../../components/Rooms";
import RoomTypes from "../../components/RoomTypes";
const RoomSettings = () => {
  const [activeTab, setActiveTab] = useState("rooms");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleTab1 = () => {
    setActiveTab("rooms");
  };
  const handleTab2 = () => {
    setActiveTab("roomTypes");
  };
  return (
    <>
      <div className="mb-5 flex justify-between">
        <TitleText text="Room Settings" />
        {activeTab === "rooms" ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-900 bg-blue-700 text-white hover:bg-white duration-200"
          >
            <PlusOutlined />
            Add Room
          </button>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-900 bg-blue-700 text-white hover:bg-white duration-200"
          >
            <PlusOutlined />
            Add Room Types
          </button>
        )}
      </div>

      <div className="flex gap-5 py-8">
        <button
          onClick={handleTab1}
          className={`text-lg font-semibold ${
            activeTab === "rooms" && "border-b-2 border-blue-500"
          }`}
        >
          Rooms
        </button>
        <button
          onClick={handleTab2}
          className={`text-lg font-semibold ${
            activeTab === "roomTypes" && "border-b-2 border-blue-500"
          }`}
        >
          Room Types
        </button>
      </div>

      {activeTab === "rooms" ? (
        <Rooms isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      ) : (
        <RoomTypes isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};
export default RoomSettings;
