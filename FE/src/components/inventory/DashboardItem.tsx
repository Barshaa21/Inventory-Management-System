import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { setName } from "./features/NameSlice";
import { setName } from "../../features/NameSlice";

// const getname = () => {
//   const storedData = localStorage.getItem("data");
//   if (storedData) {
//     const parsedData = JSON.parse(storedData);
//     return parsedData.username.name;
//   } else {
//     return "";
//   }
//   // return getname ? JSON.parse(getname.username.name) : "";
// };

//retrive
// const storedData = localStorage.getItem("data");
// const getName = storedData ? JSON.parse(storedData)?.username?.name || "" : "";

const getName = () => {
  const name = localStorage.getItem("name");
  return name ? JSON.parse(name) : "";
};

export default function DashboardItem({ showSidebar }: any) {
  // const data = useSelector((state: any) => {
  //   return state.name.name;
  // });

  const dispatch = useDispatch();

  if (getName) {
    dispatch(setName(getName()));
  }
  //redux state replaced with count from backend
  // const totalProduct = useSelector((c: any) => {
  //   console.log(c.count.count);
  //   return c.count.count;
  // });

  const [countUser, setcountUser] = useState("");
  const [countProduct, setcountProduct] = useState("");
  const [countOutOfStock, setcountOutOfStock] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/count")
      .then((response) => {
        setcountUser(response.data.result.userCount);
        setcountProduct(response.data.result.productCount);
        setcountOutOfStock(response.data.result.OutOfStock);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <ToastContainer />

      <div className="flex space-y-1 justify-between mx-9 mb-5 pt-3"></div>

      <div
        className={`flex items-center justify-center ${
          showSidebar ? "gap-7" : "gap-20"
        }`}
      >
        {/* <Pulse> */}
        <div className="w-[13rem] text-gray-600 h-[14rem] bg-white rounded-2xl shadow-2xl text-center p-4 transform hover:scale-105 transition-transform duration-300">
          <i className="fa-solid fa-boxes-stacked text-4xl"></i>

          <p className="text-xl font-semibold ">Total Products</p>
          <p className="text-3xl font-bold ">{countProduct}</p>

          <img
            src="https://i.stack.imgur.com/Yy7y6.png"
            className="bg-white rounded-3xl mt-2"
            alt="graph"
          />
        </div>
        {/* </Pulse> */}

        <div className="w-[13rem] text-gray-600 h-[14rem] bg-white rounded-2xl shadow-2xl text-center p-4 transform hover:scale-105 transition-transform duration-300">
          <i className="fa-solid fa-users text-4xl"></i>
          <p className="text-xl font-semibold ">Total Users</p>
          <p className="text-3xl font-bold ">{countUser}</p>
          <img
            className="bg-white rounded-3xl mt-2"
            src="https://i.stack.imgur.com/Yy7y6.png"
          />
        </div>

        <div className="w-[13rem] text-gray-600 h-[14rem] bg-white rounded-2xl shadow-2xl text-center p-4 transform hover:scale-105 transition-transform duration-300">
          <i className="fa-solid fa-boxes-packing text-4xl"></i>
          {/* <i class="fa-solid fa-people-carry-box text-4xl"></i> */}
          <p className="text-xl font-semibold ">Instock</p>
          <p className="text-3xl font-bold ">
            {isNaN(parseInt(countProduct) - parseInt(countOutOfStock))
              ? null
              : parseInt(countProduct) - parseInt(countOutOfStock)}
          </p>
          <img
            className="bg-white rounded-3xl mt-2"
            src="https://i.stack.imgur.com/Yy7y6.png"
          />
        </div>

        <div className="w-[13rem] text-gray-600 h-[14rem] bg-white rounded-2xl shadow-2xl text-center p-4 transform hover:scale-105 transition-transform duration-300">
          <i className="fa-solid fa-box-open text-4xl"></i>
          <p className="text-xl font-semibold ">Out of stock</p>
          <p className="text-3xl font-bold ">{countOutOfStock}</p>
          <img
            className="bg-white rounded-3xl mt-2 "
            src="https://i.stack.imgur.com/Yy7y6.png"
          />
        </div>
      </div>
    </div>
  );
}
