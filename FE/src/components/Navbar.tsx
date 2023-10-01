import { Link } from "react-router-dom";
const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : "";
};

export default function Navbar() {
  // const location = useLocation();
  const token = getToken();
  return (
    <div>
      {!token && (
        // location.pathname != "/protect" &&
        // location.pathname != "/protect/dashboard" &&
        // location.pathname != "/protect/order" &&
        // location.pathname != "/protect/ordertable" &&
        <nav
          className={
            "flex justify-between cursor-pointer left-0 right-0  lg:px-12 z-20  mb-5"
          }
        >
          <div className="flex items-center gap-12">
            <Link to="/">
              <p
                className="text-center font-bold text-[2rem] "
                style={{ fontFamily: "fantasy" }}
              >
                Inventory
              </p>
            </Link>
          </div>
          <div className="flex">
            <button className="login-btn bg-gray-100 border-none rounded-[20px] lg:rounded-[25px]  h-[3rem] mr-7 p-5 items-center lg:w-[7rem] lg:h-[2rem] flex mt-2 mb-2 hover:bg-gray-400">
              <i className="fa-solid fa-user user w-[0.5em] text-[1.5rem] lg:text-[1.2em]"></i>
              &nbsp;&nbsp;
              <p className="text-[0px]  lg:text-[1em] font-semibold p-1">
                <Link to="/login">Login </Link>
              </p>
            </button>
            {/* <button className="Signup text-white bg-black rounded-[20px] lg:rounded-[30px] text-[1.5em] h-[4rem] w-[8rem] p-4 items-center lg:w-[6rem] lg:h-[3.4rem] lg:text-[1.2em] lg:p-2 lg:font-normal">
            <Link to="/signup">
              <b>Signup</b>
            </Link>
          </button> */}
          </div>
        </nav>
      )}
    </div>
  );
}
