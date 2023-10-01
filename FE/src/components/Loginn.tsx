import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
// @ts-ignore
import Fade from "react-reveal/Fade";
import { useDispatch } from "react-redux";
import { setName } from "../features/NameSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setIsAdmin } from "../features/ShowSlice";

interface IFormInput {
  username: string;
  password: string;
}
// const getadmin = () => {
//   const isadmin = localStorage.getItem("isadmin");
//   return isadmin ? JSON.parse(isadmin) : "";
//   // return isadmin ? isadmin : ""; since in login strinfg so parsing
// };

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const nav = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data: IFormInput) => {
    console.log("data in frontend", data);
    axios
      .post("http://localhost:4000/user/db/api/login", data)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
        localStorage.setItem("isadmin", JSON.stringify(res.data.username.role));
        localStorage.setItem("userId", JSON.stringify(res.data.username._id));
        localStorage.setItem("name", JSON.stringify(res.data.username.name));
        localStorage.setItem("data", JSON.stringify(res.data));

        dispatch(setName(res.data.username.name));
        dispatch(setIsAdmin(res.data.username.role));

        console.log(res.data);
        // console.log("here", res.data.username._id);

        // dispatch(setIsAdmin(getadmin()));

        nav("/protect");
        toast.success("You have submitted!");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Fill the information correctly");
      });
  };

  return (
    <Fade right>
      <div className="flex justify-center items-center  bg-gradient-to-r from-[#ebd6a8] to-[#faf0f8] rounded-[10rem] ">
        <ToastContainer />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-1 bg-gradient-to-r from-[#ebd6a8] to-[#faf0f8] p-11 pt-5 h-[35rem]"
        >
          <p
            className="text-center font-bold text-[2rem] mb-5"
            style={{ fontFamily: "fantasy" }}
          >
            Log In
          </p>

          {/* <Name /> */}
          <div className="name flex flex-col justify-between gap-3 text-center">
            <label className="text-gray-900 font-semibold text-cenetr">
              UserName
            </label>
            <input
              className="p-2 m-7 mt-3 rounded-md w-[25rem] bg-gradient-to-r from-[#ebd6a8] to-[#faf0f8] border-b border-b-black"
              {...register("username", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z0-9_]+$/,
              })}
            />
            <div>
              {errors?.username?.type === "required" && (
                <p className="text-red-400">This field is required</p>
              )}
              {errors?.username?.type === "maxLength" && (
                <p className="text-red-400">
                  First name cannot exceed 20 characters
                </p>
              )}
              {errors?.username?.type === "pattern" && (
                <p className="text-red-400">Username is invalid</p>
              )}
            </div>
          </div>
          {/* <Password /> */}
          <div className="flex justify-between gap-3">
            <div className="password text-center">
              <label className="text-gray-900 font-semibold mr-2 text-center">
                Password
              </label>
              <br />
              <input
                className="p-2 mt-3 mx-7 mb-0 rounded-md w-[25rem] bg-gradient-to-r from-[#ebd6a8] to-[#faf0f8] border-b border-b-black"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  // pattern: /^.{6,}$/,
                })}
              />
              {errors?.password?.type === "required" && (
                <p className="text-red-400">This field is required</p>
              )}
              {errors?.password?.type === "minLength" && (
                <p className="text-red-400">
                  Password must be at least 8 characters
                </p>
              )}
              {errors?.password?.type === "maxLength" && (
                <p className="text-red-400">
                  Password cannot exceed 20 characters
                </p>
              )}
              {/* {errors?.password?.type === "pattern" && (
              <p className="text-red-400">
                Password must contain at least one uppercase letter, one
                lowercase letter, and one digit
              </p>
            )} */}
            </div>
          </div>
          <p className="underline cursor-pointer pl-6 mt-2 text-sm ">
            <Link to="/forgetpw">Forgot password?</Link>
          </p>

          <div className="flex justify-center font-bold ">
            <input
              type="submit"
              className="bg-[#747575] hover:bg-gray-300 cursor-pointer w-[30%] rounded-md p-2  ring-purple-500 ring-offset-4 ring-offset-slate-50 shadow-2xl dark:ring-offset-slate-900"
            />
          </div>
        </form>
      </div>
    </Fade>
  );
}
