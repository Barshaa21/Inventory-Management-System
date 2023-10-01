import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @ts-ignore
import Fade from "react-reveal/Fade";

import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface IFormInput {
  password: string;
  id: number;
}

export default function Reset() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const nav = useNavigate();

  //   const { token } = useParams();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const token = search.get("token");

  const onSubmit = (data: IFormInput) => {
    axios
      .post("http://localhost:4000/user/db/api/reset", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        nav("/login");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Fill the password correctly");
      });
  };

  return (
    <Fade right>
      <div className="flex justify-center items-center  bg-gradient-to-r from-[#ebd6a8] to-[#faf0f8] rounded-[10rem] h-[100vh] ">
        <ToastContainer />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-1 bg-gradient-to-r from-[#ebd6a8] to-[#faf0f8] p-11 pt-5 h-[15rem]"
        >
          <p
            className="text-center font-bold text-[2rem] mb-5"
            style={{ fontFamily: "fantasy" }}
          >
            Reset Password
          </p>

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

          <div className="flex justify-center font-bold mt-5">
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
