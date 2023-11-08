import { Input, Switch, Tooltip } from "antd";
import TitleText from "../../components/Title";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const RoomSettings = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [filterDeactivated, setFilterDeactivated] = useState<boolean>(false);
  return (
    <>
      <div className="mb-5 flex justify-between">
        <TitleText text="Room Settings" />
        <button className="hover:text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-900 bg-blue-700 text-white hover:bg-white duration-200">
          <PlusOutlined />
          Add Room
        </button>
      </div>
      <div className="flex items-center justify-between mb-3">
        <div className="w-3/12">
          <Input
            placeholder="Search here.."
            allowClear
            size="middle"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>

        <Tooltip
          title={`See ${filterDeactivated ? "Active" : "Deactivated"} Employees`}
          placement="bottomRight"
          className="cursor-pointer flex justify-center gap-1"
        >
          <Switch
            className={`${filterDeactivated ? "" : "bg-gray-400"}`}
            defaultChecked={false}
            onChange={() => setFilterDeactivated(!filterDeactivated)}
          />
          Deactivated
        </Tooltip>
      </div>
    </>
  );
};
export default RoomSettings;
