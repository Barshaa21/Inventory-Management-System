import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import Fade from "react-reveal/Fade";
import { useSelector } from "react-redux";

interface IFormInput {
  ProductID: string;
  ImageURL: string;
  ProductName: string;
  Status: string;
  Quantity: number;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  // const history = useNavigate();

  const theme = useSelector((c: any) => {
    return c.theme.theme;
  });
  const nav = useNavigate();

  const onSubmit = (data: IFormInput) => {
    // const newData = (data.role = "user");
    console.log(data);
    axios
      .post("http://localhost:4000/user/addProduct", data)
      .then((res) => {
        console.log(res.data);
        toast.success("You have submitted!");
        nav("/protect/inventories");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Fill the information correctly");
      });
  };

  return (
    // <Fade top>
    <div
      className={`${
        theme == "gray-200"
          ? "bg-gray-300"
          : " bg-cover bg-hero-pattern bg-no-repeat"
      }  ml-[14rem] pl-[20%]  min-h-screen pt-11 flex`}
    >
      {/* <div className="flex justify-center items-center  bg-gradient-to-r from-[#ebd6a8] to-[#faf0f8] ml-[33rem]"> */}
      <ToastContainer />
      <Fade top>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 justify-center align-middle bg-gray-400 bg-opacity-50 p-[2rem] rounded-md shadow-2xl h-[35rem]"
        >
          <p
            className="text-center font-bold text-[2rem]"
            style={{ fontFamily: "fantasy" }}
          >
            Add Product
          </p>
          {/* <Name /> */}
          <div className="name flex flex-col justify-between gap-3">
            <div>
              <label className="text-gray-900 font-semibold">ProductID</label>
            </div>
            <input
              className="p-2 rounded-md w-[30rem]"
              {...register("ProductID", {
                required: true,
                pattern: /^PROD-[A-Z]{3}-\d{3}$/,
              })}
            />
            <div>
              {errors?.ProductID?.type === "required" && (
                <p className="text-red-400">This field is required</p>
              )}

              {errors?.ProductID?.type === "pattern" && (
                <p className="text-red-400">
                  Invalid ProductID format (e.g., PROD-QWE-435)
                </p>
              )}
            </div>
          </div>

          {/* <div className="flex justify-between gap-4"> */}
          <div className=" ">
            <label className=" text-gray-900 font-semibold mr-2">
              ImageURL
            </label>
            <br />
            <input
              className="p-2 rounded-md mt-3 w-[30rem]"
              {...register("ImageURL", {
                required: true,
                maxLength: 200,
                pattern: /^https?:\/\/.*$/,
              })}
            />
            <div>
              {errors?.ImageURL?.type === "required" && (
                <p className="text-red-400">This field is required</p>
              )}
              {errors?.ImageURL?.type === "pattern" && (
                <p className="text-red-400">Invalid URL</p>
              )}
            </div>
          </div>
          <div className="name flex flex-col justify-between gap-3">
            <div>
              <label className="text-gray-900 font-semibold">ProductName</label>
            </div>
            <input
              className="p-2 rounded-md  w-[30rem]"
              {...register("ProductName", {
                required: true,
                maxLength: 50,
                pattern: /^[A-Za-z0-9_ ]+$/,
              })}
            />
            <div>
              {errors?.ProductName?.type === "required" && (
                <p className="text-red-400">This field is required</p>
              )}
              {errors?.ProductName?.type === "maxLength" && (
                <p className="text-red-400">
                  ProductName cannot exceed 20 characters
                </p>
              )}
              {errors?.ProductName?.type === "pattern" && (
                <p className="text-red-400">Invalid ProductName</p>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="name flex flex-col justify-between gap-3">
            <div>
              <label className="text-gray-900 font-semibold">Quantity</label>
            </div>
            <input
              className="p-2 rounded-md  w-[30rem]"
              {...register("Quantity", {
                required: true,
                maxLength: 2,
                pattern: /^[0-9]+$/,
              })}
            />
            <div>
              {errors?.ProductName?.type === "required" && (
                <p className="text-red-400">This field is required</p>
              )}
              {errors?.ProductName?.type === "maxLength" && (
                <p className="text-red-400">
                  Quantity cannot exceed 2 characters
                </p>
              )}
              {errors?.ProductName?.type === "pattern" && (
                <p className="text-red-400">
                  Quantity cannot include alphabets
                </p>
              )}
            </div>
          </div>
          {/* </div> */}

          <div className="flex justify-center font-bold ">
            <input
              type="submit"
              className="bg-[#747575] hover:bg-gray-300 w-[30%] rounded-md p-2  ring-purple-500 ring-offset-4 ring-offset-slate-50 shadow-2xl dark:ring-offset-slate-900"
            />
          </div>
        </form>
      </Fade>
      {/* </div> */}
    </div>
  );
}
