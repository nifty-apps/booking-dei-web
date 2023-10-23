import { Layout, Menu } from "antd";
import {
  AiOutlineBarChart,
  AiOutlineCalendar,
  AiOutlineHome,
} from "react-icons/ai";
import { TbBed, TbBrandGoogleAnalytics, TbUsers } from "react-icons/tb";
import { BsPersonVcard } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import version from "../../package.json";
import logo from "../assets/logo.png";

const { Sider } = Layout;
interface SidebarProps {
  collapsed: boolean;
}

const appVersion = version.version;

const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();
  const dateTime = new Date();
  const currentYear = dateTime.getFullYear().toString();

  // Determine the selected key based on the current path
  let selectedKey;
  switch (location.pathname) {
    case "/":
      selectedKey = "1";
      break;
    case "/calender":
      selectedKey = "2";
      break;
    case "/new-booking":
      selectedKey = "3";
      break;
    case "/guest-lookup":
      selectedKey = "4";
      break;
    case "/employees":
      selectedKey = "5";
      break;
    case "/transactions":
      selectedKey = "6";
      break;
    case "/rooms-overview":
      selectedKey = "7";
      break;
    case "/booking-overview":
      selectedKey = "8";
      break;

    default:
      selectedKey = "1";
  }

  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link
          to="/"
          className="p-5 flex items-center gap-3 border-gray-300 border-b hover:text-black"
        >
          <img src={logo} alt="Sumudro bilash" className="cursor-pointer" />
          {!collapsed && (
            <span className="font-semibold text-xl cursor-pointer">
              Somudra <br /> Bilash
            </span>
          )}
        </Link>

        <div className="demo-logo-vertical" />
        <p className="text-gray-400 text-center py-4">APPS & PAGES</p>
        <Menu theme="light" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="1" icon={<AiOutlineHome />}>
            <Link to="/" className="menuLink">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AiOutlineCalendar />}>
            <Link to="/calender" className="menuLink">
              Calendar
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TbBed />}>
            <Link to="/new-booking" className="menuLink">
              Booking
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<TbUsers />}>
            <Link to="/guest-lookup" className="menuLink">
              Guest Look-up
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<BsPersonVcard />}>
            <Link to="/employees" className="menuLink">
              Employees
            </Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<TbBrandGoogleAnalytics />}>
            <Link to="/transactions" className="menuLink">
              Transactions
            </Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<AiOutlineBarChart />}>
            <Link to="/rooms-overview" className="menuLink">
              Rooms Overview
            </Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<AiOutlineBarChart />}>
            <Link to="/booking-overview" className="menuLink">
             Booking Overview
            </Link>
          </Menu.Item>
         
        </Menu>

        {/* footer part for sidebar */}
        <p className="mt-40 text-gray-500 text-center pt-40 text-sm pb-2">
          All Rights Reserved, {currentYear} Version - {appVersion}
        </p>
      </Sider>
    </>
  );
};

export default Sidebar;
