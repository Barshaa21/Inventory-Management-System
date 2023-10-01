import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @ts-ignore
import Fade from "react-reveal/Fade";

import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  email: string;
}

export default function forgetPw() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const nav = useNavigate();

  const onSubmit = (data: IFormInput) => {
    axios
      .post("http://localhost:4000/user/db/api/forgetpw", data)
      .then(() => {
        nav("/login");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Fill the email correctly");
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
            Forget Password
          </p>

          {/* <Password /> */}
          <div className=" email">
            <label className=" text-gray-900 font-semibold mr-2">Email</label>
            <br />
            <input
              className="p-2 rounded-md mt-3"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              })}
            />
            <div>
              {errors?.email?.type === "required" && (
                <p className="text-red-400">This field is required</p>
              )}
              {errors?.email?.type === "pattern" && (
                <p className="text-red-400">Invalid email address</p>
              )}
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
