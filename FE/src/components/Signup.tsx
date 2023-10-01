import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import Fade from "react-reveal/Fade";

interface IFormInput {
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const history = useNavigate();

  const onSubmit = (data: IFormInput) => {
    // const newData = (data.role = "user");
    console.log(data);
    axios
      .post("http://localhost:4000/user/db/api/signup", data)
      .then((res) => {
        history("/protect");
        console.log(res.data);
        toast.success("You have submitted!");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Fill the information correctly");
      });
  };

  return (
    <Fade left>
      <div className="flex justify-center items-center  bg-gradient-to-r from-[#ebd6a8] to-[#faf0f8] ml-[33rem]">
        <ToastContainer />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 bg-gray-400 bg-opacity-50 p-[2rem] rounded-md shadow-2xl h-[35rem]"
        >
          <p
            className="text-center font-bold text-[2rem]"
            style={{ fontFamily: "fantasy" }}
          >
            Sign up
          </p>
          {/* <Name /> */}
          <div className="name flex flex-col justify-between gap-3">
            <div>
              <label className="text-gray-900 font-semibold">Name</label>
            </div>
            <input
              className="p-2 rounded-md w-[30rem]"
              {...register("name", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            <div>
              {errors?.name?.type === "required" && (
                <p className="text-red-400">This field is required</p>
              )}
              {errors?.name?.type === "maxLength" && (
                <p className="text-red-400">
                  First name cannot exceed 20 characters
                </p>
              )}
              {errors?.name?.type === "pattern" && (
                <p className="text-red-400">Alphabetical characters only</p>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4">
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
            <div className="name flex flex-col justify-between gap-3">
              <div>
                <label className="text-gray-900 font-semibold">Username</label>
              </div>
              <input
                className="p-2 rounded-md w-[15rem]"
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
                  <p className="text-red-400">Invalid username</p>
                )}
              </div>
            </div>
          </div>
          {/* <Password /> */}
          <div className="flex justify-between gap-4">
            <div className="password">
              <label className="text-gray-900 font-semibold mr-2">
                Password
              </label>
              <br />
              <input
                className="p-2 mt-3 rounded-md w-[30rem]"
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

          <div className="flex justify-center font-bold ">
            <input
              type="submit"
              className="bg-[#747575] hover:bg-gray-300 w-[30%] rounded-md p-2  ring-purple-500 ring-offset-4 ring-offset-slate-50 shadow-2xl dark:ring-offset-slate-900"
            />
          </div>
        </form>
      </div>
    </Fade>
  );
}
