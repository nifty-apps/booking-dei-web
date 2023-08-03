import { useState } from "react";
// global css
import "./global.scss";
import { Layout } from "antd";
const { Content } = Layout;
// react router
import { Routes, Route } from "react-router-dom";
// components
import Sidebar from "./components/Sidebar";
// pages
import Home from "./pages/Home/Home";
import Toolbar from "./components/Toolbar";
import NewBooking from "./pages/NewBooking/NewBooking";
import Calender from "./pages/Calender/Calender";
import GuestLookUp from "./pages/GuestLookUp/GuestLookUp";
import FinancialOverview from "./pages/FinancialOverview/FinancialOverview";

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-booking" element={<NewBooking />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="/guest-lookup" element={<GuestLookUp />} />
            <Route path="/financial-overview" element={<FinancialOverview />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
