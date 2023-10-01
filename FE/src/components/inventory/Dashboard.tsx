import { useOutletContext } from "react-router-dom";
import DashboardItem from "./DashboardItem";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Chart } from "./Chart";
// import DashboardTable from "./DashboardTable";
import { useEffect, useState } from "react";
import { BubbleChart } from "./BubbleChart";
import { setTheme } from "../../features/Theme";
import { ToastContainer, toast } from "react-toastify";

interface IProduct {
  _id: string;
  ProductName: string;
  ProductID: string;
  ImageURL: string;
  Status: string;
  Quantity: number;
}

export default function Dashboard({ socket }: any) {
  const dispatch = useDispatch();

  // const [ShowSidebar] = useOutletContext();
  const [ShowSidebar]: any = useOutletContext();
  // const [countUser, setcountUser] = useState("");
  // const [countProduct, setcountProduct] = useState("");
  const [countPending, setCountPending] = useState("");
  const [countApproved, setCountApproved] = useState("");
  const [notification, setNotification] = useState<any>([
    // { 1: "Someone requested" },
  ]);
  const [showNotification, setShowNotification] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentTheme, setcurrentTheme] = useState("hero-pattern");

  const theme = useSelector((c: any) => {
    return c.theme.theme;
  });

  const name = useSelector((c: any) => {
    return c.name.name;
  });
  const changeTheme1 = () => {
    if (currentTheme == "hero-pattern") {
      dispatch(setTheme("gray-200"));
      toast.success("Switched to basic theme!");
      setcurrentTheme("gray-200");
    } else {
      dispatch(setTheme("hero-pattern"));
      toast.success("Switched to vibrant theme!!");
      setcurrentTheme("hero-pattern");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/count")
      .then((response) => {
        // setcountUser(response.data.result.userCount);
        // setcountProduct(response.data.result.productCount);
        setCountPending(response.data.result.pendingCount);
        setCountApproved(response.data.result.approvedCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // to show products in asude nav
  useEffect(() => {
    axios
      .get("http://localhost:4000/user/showProduct")
      .then((response) => {
        setProducts(response.data.result);
        // const responseData = response.data.result; // Assuming result contains data
        // console.log("inventdata", response.data.result);
        // setLoadingTable(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        // setLoadingTable(false);
      });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("getNotification", (data: any) => {
        console.log("user name from backend", data);
        setNotification((prev: any) => [data, ...prev]);
      });
    }
  }, [socket]);
  console.log("noti", notification);

  const showNotify = () => {
    setShowNotification(!showNotification);
  };

  return (
    <div className=" min-h-[100vh]  ">
      <div
        className={`flex w-full min-h-[100vh]    ml-[${
          ShowSidebar ? "14rem" : "0rem"
        }]  bg-cover bg-${theme}  bg-no-repeat `}
        // bg-hero-pattern
      >
        <div className="flex flex-col">
          <div className="flex justify-between mx-9  pt-3">
            <div>
              <p className="text-[1.5rem] font-bold text-gray-600">
                Welcome Back , {name}
              </p>
            </div>
            <div className="flex text-gray-600 gap-4">
              <span className="text-center font-bold text-[1.2rem]">
                Switch Theme
              </span>
              <label className="switch" onChange={changeTheme1}>
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <div
            className={`${
              ShowSidebar ? "mr-[0rem] " : "mr-[3rem] w-[70rem] ml-10"
            } bg-opacity-30  bg-slate-300 backdrop-blur-lg  px-10 pb-7 rounded-3xl mt-5`}
          >
            <DashboardItem showSidebar={ShowSidebar} />

            {/* <div className="h-[25rem] w-[60rem] pl-[5rem] flex"> */}
            <div className="  pl-2 pt-0  flex gap-2 mt-7 bg-opacity-50 backdrop-blur-md bg-white backdrop-filter  shadow-2xl rounded-2xl ">
              <div className=" w-[42rem] ">
                <BubbleChart />
              </div>
              <div className="w-[15rem]">
                <Chart />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-4 ${
            ShowSidebar ? "w-[20rem]" : "w-[20rem]"
          }  border-l border-[#d6d6d6] pr-10  right-0 `}
        >
          <div className="flex gap-3 ml-[12rem]">
            <i
              className="fa-solid fa-bell text-2xl cursor-pointer "
              onClick={showNotify}
            ></i>
            <img
              className="h-[2rem] rounded-full content-end mb-5 cursor-pointer"
              src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/292600815/original/46fe8a85183ee3d1d7965c4fad9042ec83bb0875/transform-your-image-into-stunning-ai-generated-masterpiece.png"
            />
          </div>

          {/* notification */}
          {showNotification && (
            <div className="right-[5rem] top-[3rem] bg-white p-3 rounded-lg text-center absolute">
              {notification.map((a: any) => (
                <div key={Date.now()}>
                  <div> {a.senderName} requested a product</div>
                  {/* <div> mary requested a product</div> */}
                </div>
              ))}
            </div>
          )}

          <p className="text-xl  text-gray-600  mt-[1.5rem] mb-[1rem] mx-9">
            Order Details
          </p>
          <div className="flex mt-2 justify-center gap-4  ">
            <p className="h-[6rem] w-[6rem] text-center p-2.5 bg-opacity-50 backdrop-blur-md bg-white backdrop-filter  shadow-2xl rounded-2xl transform hover:scale-105 transition-transform duration-300">
              <span className="text-3xl">{countPending}</span> Pending Orders
            </p>
            <p className="h-[6rem] w-[6rem] text-center p-2.5 bg-opacity-50 backdrop-blur-md bg-white backdrop-filter  shadow-2xl rounded-2xl transform hover:scale-105 transition-transform duration-300">
              <span className="text-3xl">{countApproved}</span> Approved Orders
            </p>
          </div>

          <div className="mx-4">
            <p className="text-xl  text-gray-600  mt-11 mb-3 mx-4 ">
              New Stock Alert!
            </p>
            {products.slice(-6).map((product) => (
              <div
                className={` flex justify-between  items-center mb-1 p-1 border border-gray-300  bg-opacity-50 backdrop-blur-md bg-white backdrop-filter  shadow-2xl rounded-xl transform hover:scale-105 transition-transform duration-300 `}
                key={product.ProductID}
              >
                <img
                  className="h-[2rem] w-[2rem] rounded-full"
                  src={`${product.ImageURL}`}
                ></img>
                <span className="py-2 px-4 font-bold">
                  {product.ProductName}
                </span>
                <span className="py-2 px-4">{product.Quantity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
