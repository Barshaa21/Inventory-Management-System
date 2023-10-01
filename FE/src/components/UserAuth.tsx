import Loginn from "./Loginn";
import Signup from "./Signup";
// @ts-ignore
import Reveal from "react-reveal/Reveal";
import { Navigate } from "react-router-dom";

interface Iprops {
  handleImgBtnClick: () => void;
  isSignUp: boolean;
  isShifted: boolean;
}

function UserAuth({ handleImgBtnClick, isSignUp, isShifted }: Iprops) {
  // function UserAuth() {
  // const [isSignUp, setIsSignUp] = useState(false);
  // const [isShifted, setIsShifted] = useState(false);

  // // Function to handle the click event on the "img-btn"
  // const handleImgBtnClick = () => {
  //   // setIsSignUp((prevState) => !prevState);
  //   setIsSignUp(!isSignUp);
  //   setIsShifted(!isShifted);
  // };

  // const handleShift = () => {
  //   setIsShifted(!isShifted);
  // };

  return (
    <div className="h-[100vh] py-[0rem] px-[14rem]  bg-gradient-to-r from-[#ebd6a8] to-[#faf0f8] rounded-[15rem] mt-10  ">
      <div className="bg-black text-center text-white">
        {isSignUp ? "Dont't have an Account" : "Already have an account?"}
        <button
          className="mt-1 bg-transparent  text-white py-3 px-4 rounded"
          onClick={handleImgBtnClick}
        >
          {isSignUp ? "SignUp" : "LogIn"}
        </button>
      </div>

      <div className=" bg-gradient-to-r from-[#ebd6a8] to-[#faf0f8]">
        <div
          className={`absolute ${
            isShifted
              ? "transform scale-2 transition-transform duration-500 ease-in "
              : ""
          }`}
        >
          {isSignUp ? (
            // <Fade top right>
            <>
              <Loginn />
              {/* <Navigate to="/login"></Navigate> */}
            </>
          ) : (
            // </Fade>
            <>
              {/* <Navigate to="/signup"></Navigate> */}
              <Signup />
            </>
          )}
        </div>

        <div
          className={`w-[33rem] h-[35rem] bg-gray-500 text-white text-center flex items-center justify-center transform-gpu ${
            isShifted
              ? "translate-x-[34rem] transition-transform duration-1000 bg-[url('https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Smartphone_1080x1920.jpg')]"
              : "translate-x-[-0rem]  transition-transform duration-1000 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMXAbe4AkpyY1iwIdqi0v5FpWFift2DBtEmqnqghqgV-1QmsWdkNSiYzQ9hb29IL7VbSg&usqp=CAU')]"
          } bg-cover  bg-no-repeat`}
        >
          {isSignUp ? (
            <div
              className="text-center m-5  text-lg"
              style={{ fontFamily: "fantasy" }}
            >
              <Reveal effect="fadeInUp">
                <h1>Welcome Back</h1>
                <p>
                  Thank you for being a part of our community. Together, we'll
                  make great things happen! Happy exploring!
                </p>
              </Reveal>
            </div>
          ) : (
            <p
              className="text-center m-5  text-lg"
              style={{ fontFamily: "fantasy" }}
            >
              We're excited to have you as a new member of our community. Your
              journey with us begins now, and it's full of possibilities waiting
              to be explored
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserAuth;
