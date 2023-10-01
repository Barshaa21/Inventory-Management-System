import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @ts-ignore
import Pulse from "react-reveal/Pulse";
// @ts-ignore
import Flip from "react-reveal/Flip";

export default function ViewProduct({
  showViewModel,
  selectedViewProduct,
  closeDetails,
}: any) {
  // console.log(selectedViewProduct);
  const product = selectedViewProduct;
  const handleClose = (e: any) => {
    if (e.target.id === "container") {
      closeDetails();
    }
  };

  if (!showViewModel) {
    return null;
  }

  return (
    <div
      id="container"
      // className="flex justify-center items-center "
      className="absolute bg-slate-500  mt-0 w-screen h-screen bg-opacity-80 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
    >
      <Pulse>
        {/* <div className="m-auto justify-center bg-white "> </div> */}
        <div
          key={product._id}
          className={`flex mr-4 flex-col  rounded-3xl shadow-1xl `}
        >
          <div className="h-[25rem] w-[40rem] m-5 p-2 pr-4 flex border border-black  bg-white rounded-3xl shadow-slate-200 shadow-2xl justify-center items-center ">
            <img
              className="h-[20rem] m-2 w-[20rem]"
              src={product.ImageURL}
              alt={product.ProductName}
            />
            <div>
              <p
                className="text-center text-[1.5rem] "
                style={{ fontFamily: "fantasy" }}
              >
                Product Name
              </p>
              <p className="text-center text-xl font-semibold mb-4">
                {product.ProductName}
              </p>
              <p
                className="text-center text-[1.5rem]"
                style={{ fontFamily: "fantasy" }}
              >
                Quantity
              </p>
              <p className="text-center text-xl font-semibold mb-3">
                {product.Quantity}
              </p>
              <p
                className="text-center text-[1.5rem]"
                style={{ fontFamily: "fantasy" }}
              >
                Description
              </p>
              <p className="text-center text-xl font-semibold ">
                {product.Description}
              </p>
            </div>
          </div>
        </div>
      </Pulse>
      <ToastContainer />
    </div>
  );
}
