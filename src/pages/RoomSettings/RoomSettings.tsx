import TitleText from "../../components/Title";
import { PlusOutlined } from "@ant-design/icons";

const RoomSettings = () => {

  return (
    <>
      <div className="mb-5 flex justify-between">
        <TitleText text="Room Settings" />
        <button className="hover:text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-900 bg-blue-700 text-white hover:bg-white duration-200">
          <PlusOutlined />
          Add Room
        </button>
      </div>
    </>
  );
};
export default RoomSettings;
