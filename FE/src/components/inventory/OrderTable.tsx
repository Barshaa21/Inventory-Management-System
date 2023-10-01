import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// @ts-ignore
import Pulse from "react-reveal/Pulse";

interface Product {
  _id: string;
  ProductName: string;
  ProductID: string;
  ImageURL: string;
  // Status: string;
  // RequestedBy: string;
}
interface Iuser {
  name: string;
}
interface IOrder {
  // product: Product;
  order: Product; //product table is merged as order
  Status: string;
  user: Iuser;
  _id: string;
  approvalStatus: string;
}
// const storedData = localStorage.getItem("data");
// const getName = storedData ? JSON.parse(storedData)?.username?.name || "" : "";
// const getRole = storedData ? JSON.parse(storedData)?.username?.role || "" : "";

export default function Table() {
  const [ShowSidebar]: any = useOutletContext();
  const [products, setProducts] = useState<IOrder[]>([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [Statusvalue, setStatusValue] = useState("");
  const [deleteProductState, setdeleteProduct] = useState(false);

  const theme = useSelector((c: any) => {
    return c.theme.theme;
  });

  const isadmin = useSelector((c: any) => {
    return c.admin.value;
  });
  const name = useSelector((c: any) => {
    return c.name.name;
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/showOrder")
      .then((response) => {
        // setProducts(response.data.result);
        // setFilteredProducts(response.data);
        console.log("data", response.data);
        setProducts(response.data);
        console.log("order date", response.data[0]);
        setLoadingTable(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoadingTable(false);
      });
    setdeleteProduct(false);
  }, [deleteProductState]);

  const deleteOrder = (id: string) => {
    console.log("editkoid", id);
    setdeleteProduct(true);
    axios
      .delete("http://localhost:4000/user/deleteOrder", {
        data: { id }, // Passing the data as an object
      })
      .then((response) => {
        console.log("Product deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const clickedByAdmin = (orderTableId: string, productId: string) => {
    // productId =product_id of the merged ordertable
    // dont approve by just productid approve by name and product_id
    console.log("approveid", productId);
    axios
      .put("http://localhost:4000/user/changeQuantity", { id: productId })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    const updatedProducts = products.map((product) => {
      // if (product.ProductID === productId) {
      if (product._id === productId) {
        return { ...product, approvalStatus: "Approved" };
      }
      return product;
    });

    setProducts(updatedProducts);

    // Sending  request to update the status in the database
    axios
      .put(`http://localhost:4000/user/changeOrderStatus/${productId}`)
      .then((response) => {
        console.log("Status updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const clickedByUser = () => {
    alert("Users cannot change the Status");
  };

  return (
    <div
      className={`${
        theme == "gray-200" ? "bg-gray-300" : " bg-cover bg-hero-pattern "
      }  ${ShowSidebar ? "ml-[14rem]" : "ml-[0rem]"} p-8 pt-2`}
    >
      {loadingTable ? (
        <div className="min-h-screen flex align-middle justify-center w-[75rem]">
          <img
            className="h-[7rem]"
            src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif"
          ></img>
        </div>
      ) : (
        <div className="container mx-auto p-6 min-h-[100vh] ">
          <div className="flex gap-4">
            <div className="relative mb-9 w-[50rem]">
              <input
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                className="border h-[2.5rem] border-gray-300 rounded-lg p-2 pr-[40px] w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="Search by Product Name..."
              />
              <i className="fa-solid fa-magnifying-glass icon absolute right-3 top-1/2 transform -translate-y-1/2"></i>
            </div>
            <select
              className="border rounded p-2 mb-9 w-[10rem]"
              // value={filter}
              onChange={(e) => setStatusValue(e.target.value)}
            >
              <option value="">Filter by</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
          </div>
          <Pulse>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden ">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <td className="py-2 px-4 font-bold">ProductID</td>
                  <td className="py-2 px-4 font-bold">Product</td>
                  <td className="py-2 px-4 font-bold">Product Name</td>
                  {isadmin === "admin" ? (
                    <td className="py-2 px-4 font-bold">Orderd By</td>
                  ) : null}

                  <td className="py-2 px-4 font-bold">Order Date</td>
                  <td className="py-2 px-4 font-bold">Status</td>
                  <td className="py-2 px-4 font-bold">Actions</td>
                </tr>
              </thead>
              <tbody className="text-gray-600 shadow-xl">
                {products.map((item: any) => (
                  // {item.user.name===getName?():null}
                  <tr
                    className={`border border-gray-300 hover:bg-gray-200
              
        ${
          item.user.name.toLowerCase() === name.toLowerCase()
            ? "solid"
            : "hidden"
        }
                  ${
                    item.order.ProductName.toLowerCase().includes(
                      keyword.toLowerCase()
                    )
                      ? "solid"
                      : "hidden"
                  }
                   ${
                     item.approvalStatus
                       .toLowerCase()
                       .includes(Statusvalue.toLowerCase())
                       ? "solid"
                       : "hidden"
                   }
                  `}
                    // key={order.product.ProductID}
                    key={item._id}
                  >
                    <td className="py-2 px-4 font-semibold">
                      {item.order.ProductID}
                    </td>
                    <td className="py-2 px-4">
                      <img
                        className="h-[5rem] w-[5rem] rounded-xl"
                        src={`${item.order.ImageURL}`}
                        alt={item.order.ProductName}
                      />
                    </td>
                    <td className="py-2 px-4 font-semibold">
                      {item.order.ProductName}
                    </td>
                    {isadmin == "admin" ? (
                      <td className="py-2 px-4 font-semibold">
                        {item.user.name}
                      </td>
                    ) : null}

                    {/* <td className="py-2 px-4">{item.orderDate.LocaleString()}</td> */}
                    <td className="py-2 px-4">
                      <p className="font-semibold">
                        {new Date(item.orderDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        {new Date(item.orderDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>
                    <td className="py-2 px-4">
                      {item.approvalStatus === "Pending" ? (
                        <>
                          {isadmin == "admin" ? (
                            <button
                              onClick={() =>
                                clickedByAdmin(item._id, item.order._id)
                              }
                              className={`bg-yellow-400 w-[5em] text-white rounded p-1.5 text-center transform scale-100 hover:scale-110 transition-transform`}
                            >
                              {item.approvalStatus}
                            </button>
                          ) : (
                            <button
                              onClick={clickedByUser}
                              className="bg-yellow-400 w-[5em] text-white rounded p-1.5 text-center transform scale-100 hover:scale-110 transition-transform"
                            >
                              {item.approvalStatus}
                            </button>
                          )}
                        </>
                      ) : (
                        <button className="bg-green-600 w-[6em] text-white rounded p-1.5 text-center transform scale-100 hover:scale-110 transition-transform">
                          {item.approvalStatus}
                        </button>
                      )}
                    </td>
                    <td>
                      <i
                        onClick={() => deleteOrder(item._id)}
                        className="fa-solid fa-trash cursor-pointer pl-8 text-red-500"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Pulse>
        </div>
      )}
    </div>
  );
}
