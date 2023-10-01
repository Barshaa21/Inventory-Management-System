import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./inventory/SideBar";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : "";
};

export default function Inventory({ isadmin }: any) {
  const [ShowSidebar, setShowSidebar] = useState(true);

  const viewSidebar = () => {
    setShowSidebar(!ShowSidebar);
  };
  const tokens = getToken();
  return (
    <>
      <div>
        {tokens ? (
          <div>
            {/* <Product /> */}
            <SideBar
              ShowSidebar={ShowSidebar}
              viewSidebar={viewSidebar}
              isadmin={isadmin}
            />
            <Outlet context={[ShowSidebar]} />
          </div>
        ) : (
          <div>
            <Navigate to="/login" />
          </div>
        )}
      </div>
    </>
  );
}
