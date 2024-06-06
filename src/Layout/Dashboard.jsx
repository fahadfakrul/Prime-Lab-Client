import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar/SideBar";

const Dashboard = () => {
  return (
    <div className="min-h-screen md:flex relative">
      {/* sidebar */}
      <SideBar></SideBar>
      {/* outlet */}
      <div className="flex-1 md:ml-64">
        <div className="p-5 border border-red-600"><Outlet></Outlet></div>
      </div>
    </div>
  );
};

export default Dashboard;
