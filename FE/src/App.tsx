import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Home from "./components/Home";
import LoginAuth from "./components/LoginAuth";
import SignupAuth from "./components/SignUpAuth";
import Inventory from "./components/Inventory";
import Navbar from "./components/Navbar";
import ForgetPw from "./components/ForgetPw";
import Reset from "./components/Reset";
import Dashboard from "./components/inventory/Dashboard";
import Order from "./components/inventory/AddProduct";
import Table from "./components/inventory/OrderTable";
import ViewStock from "./components/inventory/ViewDetails";
import Logout from "./components/Logout";
import AddProduct from "./components/inventory/AddProduct";
import InventoryTable from "./components/inventory/InventoryTable";
import AdminOrderTable from "./components/inventory/AdminOrderTable";

// redux
import { setIsAdmin } from "./features/ShowSlice";
import { setName } from "./features/NameSlice";

//notification
import { io } from "socket.io-client";
// import { Socket } from "socket.io-client/debug";

// import Sidebar from "./components/inventory/SideBar";
// import Admin from "./components/Admin";

const getadmin = () => {
  const isadmin = localStorage.getItem("isadmin");
  return isadmin ? JSON.parse(isadmin) : "";
  // return isadmin ? isadmin : ""; since in login strinfg so parsing
};
const getName = () => {
  const name = localStorage.getItem("name");
  return name ? JSON.parse(name) : "";
};

function App() {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<any>(null);

  //dispatch in app also after dispatching in login to get the datas after reloading as well
  if (getadmin) {
    dispatch(setIsAdmin(getadmin()));
  }

  if (getName) {
    dispatch(setName(getName()));
  }

  const data = useSelector((c: any) => {
    return c.admin.value;
  });

  const name = useSelector((c: any) => {
    return c.name.name;
  });

  useEffect(() => {
    const connection = io("http://localhost:4000");
    setSocket(connection);
  }, []);

  useEffect(() => {
    socket?.on("from server", (msg: any) => console.log(msg));
    socket?.emit("from client", name);
  }, [socket, name]);

  useEffect(() => {
    socket?.on("server", (msg: any) => console.log(msg));
  });

  console.log("from app", socket);

  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginAuth />} />
          <Route path="logout" element={<Logout />} />
          <Route path="signup" element={<SignupAuth />} />
          <Route path="/forgetpw" element={<ForgetPw />} />
          <Route path="/reset" element={<Reset />} />
          {/* <Route path="/admin" element={<Admin />} /> */}

          <Route path="protect/*" element={<Inventory isadmin={data} />}>
            <Route
              index
              element={<Dashboard isadmin={data} socket={socket} />}
            />
            <Route
              path="dashboard"
              element={<Dashboard isadmin={data} socket={socket} />}
            />
            <Route path="viewStock" element={<ViewStock />} />
            <Route path="order" element={<Order />} />
            {data == "admin" ? (
              <Route path="ordertable" element={<AdminOrderTable />} />
            ) : (
              <Route path="ordertable" element={<Table />} />
            )}
            <Route
              path="inventories"
              element={<InventoryTable socket={socket} />}
            />
            {data == "admin" && <Route path="add" element={<AddProduct />} />}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// export { Sidebar };
