import { Tabs, TabsProps } from "antd";
import TitleText from "../../components/Title";
import { PlusOutlined } from "@ant-design/icons";
import Rooms from "../../components/Rooms";

const RoomSettings = () => {

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: <p className="text-xl text-center outline-none">Rooms</p>,
          children: <Rooms />,
        },
        {
          key: '2',
          label: <p className="text-xl outline-none">Rooms Types</p>,
          children: 'Content of Tab Pane 2',
        },
      ];
  return (
    <>
      <div className="mb-5 flex justify-between">
        <TitleText text="Room Settings" />
        <button className="hover:text-blue-700 px-20 py-2 rounded-md mb-2 font-semibold capitalize flex items-center gap-2 border border-blue-900 bg-blue-700 text-white hover:bg-white duration-200">
          <PlusOutlined />
          Add Room
        </button>
      </div>

      <Tabs className=" outline-none" defaultActiveKey="1" items={items} />
    </>
  );
};
export default RoomSettings;
