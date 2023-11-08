import { Input, Switch, Tooltip } from "antd";
import { useState } from "react";


const Rooms = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [filterDeactivated, setFilterDeactivated] = useState<boolean>(false);
  return (
    <>
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
  )
}
export default Rooms