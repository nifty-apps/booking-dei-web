import { Layout } from "antd";
import { useState } from "react";
// global css
import "./global.scss";
const { Content } = Layout;
// react router
import { Route, Routes } from "react-router-dom";
// components
import Sidebar from "./components/Sidebar";
// pages
import { useSelector } from "react-redux";
import Toolbar from "./components/Toolbar";
import BookingDetails from "./pages/BookingDetails/BookingDetails";
import Calender from "./pages/Calender/Calender";
import CreateHotel from "./pages/CreateHotel/CreateHotel";
import EditRoomBooking from "./pages/EditRoomBooking/EditRoomBooking";
import Employees from "./pages/Employees/Employees";
import Error from "./pages/Error/Error";
import GuestLookUp from "./pages/GuestLookUp/GuestLookUp";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NewBooking from "./pages/NewBooking/NewBooking";
import Registration from "./pages/Registration/Registration";
import RoomBookingFinancials from "./pages/RoomBookingFinancials/RoomBookingFinancials";
import Transactions from "./pages/Transactions/Transactions";
import VendorDetails from "./pages/VendorDetails/VendorDetails";
import Vendors from "./pages/Vendors/Vendors";
import { RootState } from "./store";
import EmployeeDetails from "./pages/EmployeeDetails/EmployeeDetails";
import RoomSettings from "./pages/RoomSetting/RoomSettings";

const App = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Toolbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/create-hotel" element={<CreateHotel />} />
            <Route path="/new-booking" element={<NewBooking />} />
            <Route
              path="/booking-details/:bookingId"
              element={<BookingDetails />}
            />
            <Route
              path="/employee-Details/:userid"
              element={<EmployeeDetails />}
            />
            <Route
              path="/edit-booking/:bookingId"
              element={<EditRoomBooking />}
            />
            <Route path="/calender" element={<Calender />} />
            <Route path="/guest-lookup" element={<GuestLookUp />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/vendor-details/:userid" element={<VendorDetails />} />

            {/* check user type to show protected route */}
            {user?.type === "ADMIN" && (
              <>
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/employees" element={<Employees />} />
                <Route
                  path="/rooms-overview"
                  element={<RoomBookingFinancials />}
                />
                <Route path="/rooms-setting" element={<RoomSettings />} />
              </>
            )}

            <Route path="*" element={<Error />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
