import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { setCount } from "../../features/TotalProducts";
import EditProduct from "./EditProduct";
import ViewProduct from "./ViewProduct";

// import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";
// @ts-ignore
import Pulse from "react-reveal/Pulse";
// @ts-ignore
import Fade from "react-reveal/Fade";

interface IProduct {
  _id: string;
  ProductName: string;
  ProductID: string;
  ImageURL: string;
  Status: string;
  Quantity: number;
}
const getuserId = () => {
  const userId = localStorage.getItem("userId");
  return userId ? JSON.parse(userId) : "";
};

export default function DashboardTable({ socket }: any) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [deleteProductState, setdeleteProduct] = useState(false);
  // edit
  const [editProductState, seteditProductStatus] = useState(false);
  const [showeditmodel, setShowEditModel] = useState(false);
  const [selectedProduct, setselectedProduct] = useState<IProduct[]>([]);

  // view
  const [viewDetailsState, setViewDetails] = useState(false);
  const [showViewModel, setShowViewModel] = useState(false);
  const [selectedViewProduct, setselectedViewProduct] = useState<IProduct[]>(
    []
  );

  const [keyword, setKeyword] = useState("");
  const [ShowSidebar]: any = useOutletContext();
  // const [showDetails, setshowDetails] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);

  const connection = io("http://localhost:4000");

  const isadmin = useSelector((c: any) => {
    return c.admin.value;
  });

  const name = useSelector((c: any) => {
    return c.name.name;
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/showProduct")
      .then((response) => {
        setProducts(response.data.result);
        const responseData = response.data.result; // Assuming result contains data
        // console.log("inventdata", response.data.result);
        dispatch(setCount(responseData.length));
        setLoadingTable(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoadingTable(false);
      });
    setdeleteProduct(false);
    seteditProductStatus(false);
  }, [deleteProductState, dispatch, editProductState]);

  const handleNotification = () => {
    connection.emit("sendNotification", {
      // senderName: "jerry",
      senderName: name,
      receiverName: "barsha",
    });
  };

  const handleStatusUpdate = (
    productId: string, //in Prod format id
    product_id: string //id from the db
  ) => {
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        return { ...product, Status: "Requested" };
      }
      return product;
    });

    setProducts(updatedProducts);

    const orderData = {
      product_id: productId,
      user_id: getuserId(),
    };

    axios
      .post(`http://localhost:4000/user/addOrder`, orderData)
      .then((response) => {
        console.log("Order added successfully:", response.data);
        console.log(product_id);
      })
      .catch((error) => {
        console.error("Error adding order:", error);
      });
    handleNotification();
  };

  const theme = useSelector((c: any) => {
    return c.theme.theme;
  });

  const deleteProduct = (ID: string) => {
    setdeleteProduct(true);
    axios
      .delete("http://localhost:4000/user/deleteProduct", {
        data: { ProductID: ID }, // Passing the data as an object
      })
      .then((response) => {
        console.log("Product deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  // for edit
  const showModel = (product: any) => {
    setShowEditModel(true);
    setselectedProduct(product);
  };
  const closeModel = () => {
    setShowEditModel(false);
    seteditProductStatus(true);
  };

  // for details
  const viewDetails = (product: any) => {
    setShowViewModel(true);
    setselectedViewProduct(product);
  };
  const closeDetails = () => {
    setShowViewModel(false);
    setViewDetails(true);
  };

  // for shoing the view icon for user
  // const handleMouseEnter = () => {
  //   setshowDetails(true);
  // };
  // const handleMouseLeave = () => {
  //   setshowDetails(false);
  // };

  return (
    <div
      className={`p-[3.5rem] pt-2 min-h-screen ${
        theme == "gray-200"
          ? "bg-gray-300"
          : "bg-hero-pattern bg-cover bg-no-repeat "
      }  ${ShowSidebar ? "ml-[14rem]" : "ml-[0rem]"} min-h-[100vh]`}
    >
      {loadingTable ? (
        <div className="min-h-screen flex align-middle justify-center w-[75rem]">
          <img
            className="h-[7rem]"
            src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif"
          ></img>
        </div>
      ) : (
        <>
          <div className="relative mb-5 mt-2 w-[30rem]">
            <input
              onChange={(e) => setKeyword(e.target.value)}
              type="text"
              className="border h-[2.5rem] border-gray-300 rounded-lg p-2 pr-[40px] w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              placeholder="Search by Product Name..."
            />
            <i className="fa-solid fa-magnifying-glass icon absolute right-3 top-1/2 transform -translate-y-1/2"></i>
          </div>
          <Pulse>
            <table className=" min-w-full bg-white shadow-md rounded-2xl  overflow-hidden">
              <thead className="bg-gray-400  text-gray-600">
                <tr className="text-[1.1rem]">
                  <td className="py-2 px-4 font-bold ">ProductID</td>
                  <td className="py-2 px-4 font-bold">Product</td>
                  <td className="py-2 px-4 font-bold">Product Name</td>
                  <td className="py-2 px-4 font-bold">Quantity</td>
                  {isadmin == "admin" ? null : (
                    <td className="py-2 px-4 font-bold ">Status</td>
                  )}

                  {/* {isadmin == "admin" ? ( */}
                  <td className="py-2 px-4 font-bold w-[10rem]">Actions</td>
                  {/* ) : null} */}
                </tr>
              </thead>
              <tbody className="text-gray-600 shadow-xl">
                {products.map((product) => (
                  <tr
                    className={`border border-gray-300 hover:bg-gray-200  relative     ${
                      product.ProductName.toLowerCase().includes(
                        keyword.toLowerCase()
                      )
                        ? "solid"
                        : "hidden"
                    } `}
                    key={product.ProductID}
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave}
                  >
                    <td className="py-2 px-4 font-semibold">
                      {product.ProductID}
                    </td>
                    <td className="py-2 px-4">
                      <img
                        className="h-[5rem] w-[5rem] rounded-3xl"
                        src={`${product.ImageURL}`}
                        alt={product.ProductName}
                      />
                    </td>
                    <td className="py-2 px-4 font-semibold">
                      {product.ProductName}
                    </td>
                    <td className="py-2 px-4 font-semibold">
                      {product.Quantity}
                    </td>
                    {isadmin == "admin" ? null : (
                      <td className="py-2 px-4">
                        {/* conditional */}
                        {product.Quantity == 0 ? (
                          <p className="bg-red-500 w-[6em] rounded p-1.5 text-center text-white">
                            Out of Stock
                          </p>
                        ) : (
                          <div>
                            {product.Status === "Request" ? (
                              <button
                                className={`
                   bg-yellow-400 w-[5em] text-white rounded p-1.5 text-center transform scale-100 hover:scale-110 transition-transform`}
                                onClick={() =>
                                  handleStatusUpdate(
                                    product._id,
                                    product.ProductName
                                  )
                                }
                              >
                                {product.Status}
                              </button>
                            ) : (
                              <button className="bg-green-600 w-[6em] text-white rounded p-1.5 text-center transform scale-100 hover:scale-110 transition-transform">
                                {product.Status}
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    )}
                    {isadmin == "admin" ? (
                      <>
                        <td className="py-2    ">
                          <i
                            onClick={() => {
                              viewDetails(product);
                            }}
                            className="fa-solid fa-eye mr-5 text-[#42a8bf] cursor-pointer"
                          ></i>
                          <i
                            onClick={() => showModel(product)}
                            className="fa-solid fa-pen-to-square cursor-pointer mr-5 text-green-500"
                          ></i>
                          <i
                            onClick={() => deleteProduct(product.ProductID)}
                            className="fa-solid fa-trash cursor-pointer text-red-400"
                          ></i>
                        </td>
                      </>
                    ) : (
                      <td className="py-2    ">
                        <i
                          onClick={() => {
                            viewDetails(product);
                          }}
                          className="fa-solid fa-eye mr-5 px-8 text-[#42a8bf] cursor-pointer"
                        ></i>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="fixed top-0  left-[0%]">
              <EditProduct
                showeditmodel={showeditmodel}
                closeModel={closeModel}
                selectedProduct={selectedProduct}
              />
            </div>
            <div className="fixed top-0  left-[0%]">
              <ViewProduct
                showViewModel={showViewModel}
                closeDetails={closeDetails}
                selectedViewProduct={selectedViewProduct}
              />
            </div>
          </Pulse>
        </>
      )}
    </div>
  );
}
