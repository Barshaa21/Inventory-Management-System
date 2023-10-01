import { Link, NavLink } from "react-router-dom";
// import Logout from "../Logout";
import { useSelector } from "react-redux";
import { RiLogoutBoxLine } from "react-icons/ri";

interface Iprops {
  ShowSidebar: boolean;
  viewSidebar: () => void;
  isadmin: string;
}
const classNameFunc = ({ isActive }: any) =>
  isActive
    ? "active_link bg-gray-100 font-bold  inset-0 flex text-center w-full bg-opacity-50 backdrop-blur-lg  border border-gray-300"
    : " flex text-center text-center w-full";

export default function SideBar({ ShowSidebar, viewSidebar, isadmin }: Iprops) {
  const theme = useSelector((c: any) => {
    // console.log(c.theme.theme);
    return c.theme.theme;
  });
  const data = useSelector((c: any) => {
    return c.admin.value;
  });

  return (
    <div
      className={`bg-cover ${
        theme == "gray-200" ? "bg-gray-600" : "bg-hero-pattern "
      } bg-no-repeat`}
    >
      {/* bg-${theme} */}
      {/* <i
        className="fa-solid fa-bars cursor-pointer text-[1.5rem] m-2.5"
        onClick={viewSidebar}
      ></i> */}
      {ShowSidebar ? (
        <>
          <div
            className={`navbar bg-cover ${
              theme == "gray-200" ? "bg-[#232323]" : "bg-hero-pattern "
            }
            bg-no-repeat`}
            // bg-hero-pattern
          >
            <li className="flex gap-10">
              {/* <NavLink to="/"> */}
              <p
                className={`text-center font-bold text-[2rem]  text-gray-700 ml-3 mt-4 ${
                  theme == "gray-200" ? "text-white" : "text-gray-700 "
                }`}
                style={{ fontFamily: "fantasy" }}
              >
                Inventory
              </p>
              {/* </Link> */}
              <i
                className={`${
                  theme == "gray-200" ? "text-white" : "text-gray-700"
                } fa-solid fa-xmark cursor-pointer p-[1rem] text-[1.5rem]`}
                onClick={viewSidebar}
              ></i>
            </li>
            <li className={`text-gray-700 flex text-center w-full `}>
              <NavLink
                className={classNameFunc}
                to="/protect/dashboard"
                // className="flex text-center"
              >
                <i
                  className={`fa-solid fa-house p-[1rem] ${
                    theme == "gray-200" ? "text-white" : "text-gray-700 "
                  }`}
                ></i>
                <p
                  className={`text-gray-700 p-3 ${
                    theme == "gray-200" ? "text-white" : "text-gray-700 "
                  }`}
                >
                  Dashboard
                </p>
              </NavLink>
            </li>
            <li className="text-gray-700 flex text-center first-letter w-full">
              <NavLink to="/protect/inventories" className={classNameFunc}>
                {/* <i className="fa-solid fa-warehouse text-gray-700"></i> */}
                <i
                  className={`fa-solid fa-warehouse p-[1rem] ${
                    theme == "gray-200" ? "text-white" : "text-gray-700 "
                  }`}
                ></i>
                <p
                  className={`text-gray-700 p-3 ${
                    theme == "gray-200" ? "text-white" : "text-gray-700 "
                  }`}
                >
                  Inventory
                </p>
              </NavLink>
            </li>
            {/* <li className="text-gray-700 flex text-center w-full">
              <NavLink to="/protect/viewStock" className={classNameFunc}>
                <i
                  className={`fa-solid fa-box-open p-[1rem] ${
                    theme == "gray-200" ? "text-white" : "text-gray-700 "
                  }`}
                ></i>
                <p
                  className={`text-gray-700 p-3 ${
                    theme == "gray-200" ? "text-white" : "text-gray-700 "
                  }`}
                >
                  View Details
                </p>
              </NavLink>
            </li> */}

            <li className="text-gray-700 flex text-center w-full">
              <NavLink to="/protect/ordertable" className={classNameFunc}>
                <i
                  className={`fa-solid fa-boxes-packing p-[1rem] ${
                    theme == "gray-200" ? "text-white" : "text-gray-700 "
                  }`}
                ></i>
                {/* <p className="text-gray-700 p-3">View Orders</p> */}
                <p
                  className={`text-gray-700 p-3 ${
                    theme == "gray-200" ? "text-white" : "text-gray-700 "
                  }`}
                >
                  {data === "admin" ? <p> View Orders</p> : <p>My Orders</p>}
                </p>
              </NavLink>
            </li>

            {isadmin == "admin" ? (
              <>
                <li className="text-gray-700 flex text-center w-full">
                  <NavLink to="/protect/add" className={classNameFunc}>
                    <i
                      className={`fa-solid fa-folder-plus p-[1rem] ${
                        theme == "gray-200" ? "text-white" : "text-gray-700 "
                      }`}
                    ></i>
                    {/* <p className="text-gray-700 p-3"> Add Product</p> */}
                    <p
                      className={`text-gray-700 p-3 ${
                        theme == "gray-200" ? "text-white" : "text-gray-700 "
                      }`}
                    >
                      Add Product
                    </p>
                  </NavLink>
                </li>
              </>
            ) : null}
            <button className="bg-gray-300 p-1 h-[3rem] border fixed bottom-3 left-[4rem] rounded-xl hover:bg-red-100 shadow-lg hover:border-red-400 ">
              <Link to="/logout">
                <div className="flex items-center gap-2">
                  {/* <i className="fa-solid fa-right-from-bracket text-xl p-0 "></i> */}
                  <RiLogoutBoxLine />
                  <span className="text-[1.1rem] ">Logout</span>
                </div>
              </Link>
            </button>
          </div>
        </>
      ) : (
        <i
          className="fa-solid fa-bars cursor-pointer text-[1.5rem] m-2.5"
          onClick={viewSidebar}
        ></i>
      )}
    </div>
  );
}
