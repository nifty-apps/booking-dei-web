import { Layout, Menu } from "antd";
const { Sider } = Layout;
import { AiOutlineHome, AiOutlineCalendar } from "react-icons/ai";
import { TbBed, TbUsers, TbBrandGoogleAnalytics } from "react-icons/tb";
import logo from "../../assets/logo.png";

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="p-5 flex items-center gap-3 border-gray-300 border-b">
        <img src={logo} alt="Sumudro bilash" />
        <span className="font-semibold text-xl">
          Somudra <br /> Bilash
        </span>
      </div>
      <div className="demo-logo-vertical" />
      <p className="text-gray-400 text-center py-4">APPS & PAGES</p>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <AiOutlineHome />,
            label: "Home",
          },
          {
            key: "2",
            icon: <AiOutlineCalendar />,
            label: "Calender",
          },
          {
            key: "3",
            icon: <TbBed />,
            label: "New Booking",
          },
          {
            key: "4",
            icon: <TbUsers />,
            label: "Guest Look-up",
          },
          {
            key: "5",
            icon: <TbBrandGoogleAnalytics />,
            label: "Financial Overview",
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
