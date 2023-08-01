import { useState } from "react";
// global css
import "./global.scss";
import { Layout } from "antd";
const { Content } = Layout;
// components
import Sidebar from "./components/Sidebar/Sidebar";
// pages
import Home from "./pages/Home/Home";
import Toolbar from "./components/Toolbar/Toolbar";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      {/* sidebar */}
      <Sidebar collapsed={collapsed} />
      <Layout>
        {/* toolbar */}
        <Toolbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="p-4">
          {/* home page */}
          <Home />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
