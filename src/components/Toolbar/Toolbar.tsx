import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  BellOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Input, Space } from "antd";
import { AiOutlineSearch } from "react-icons/ai";

interface ToolbarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Toolbar = ({ collapsed, setCollapsed }: ToolbarProps) => {
  const notificationCount = 5;

  const items = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
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
          className="w-3/6"
          size="large"
          placeholder="Search your booking"
          prefix={<AiOutlineSearch />}
        />
        <div className="space-x-3 ml-auto mr-6 flex items-center">
          <Badge count={notificationCount}>
            <BellOutlined style={{ fontSize: "24px" }} />
            <ExclamationCircleOutlined
              className="text-red-500 absolute top-0 right-0 -mt-2 -mr-2"
              style={{ fontSize: "12px" }}
            />
          </Badge>
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
            <p className="font-bold">Ahmad</p>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toolbar;
