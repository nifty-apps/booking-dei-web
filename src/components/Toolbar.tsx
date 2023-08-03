import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  BellOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Input, Space } from "antd";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import gridots from "../assets/gridots.png";

interface ToolbarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Toolbar = ({ collapsed, setCollapsed }: ToolbarProps) => {
  const notificationCount = 5;

  const items = [
    {
      label: (
        <a href="/" className="flex items-center gap-2">
          <span>
            <AiOutlineUser />
          </span>
          My Account
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a href="/" className="flex items-center gap-2">
          <span>
            <AiOutlineSetting />
          </span>
          Settings
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a href="/" className="flex items-center gap-2">
          <span>
            <FiHelpCircle />
          </span>
          Help
        </a>
      ),
      key: "3",
    },
  ];

  return (
    <>
      <div className="flex items-center gap-6">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Input
          className="w-2/5"
          size="large"
          placeholder=" Search your booking"
          prefix={<AiOutlineSearch />}
        />
        <div className="space-x-3 ml-auto mr-6 flex items-center">
          <Badge count={notificationCount} className="cursor-pointer">
            <BellOutlined style={{ fontSize: "24px" }} />
            <ExclamationCircleOutlined className="text-red-500 absolute top-0 right-0 -mt-2 -mr-2" />
          </Badge>
          <div className="px-2 cursor-pointer">
            <span className="text-xl">
              <img src={gridots} alt="Dots" />
            </span>
          </div>
          <Dropdown
            menu={{
              items: items as [],
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space wrap size={16} style={{ alignItems: "center" }}>
                <Avatar size="large" icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
          <div className="text-left">
            <p className="font-bold text-md">Ahmad (Nifty)</p>
            <p className="font-semibold text-gray-600">Admin</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toolbar;
