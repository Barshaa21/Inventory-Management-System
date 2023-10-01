import { useState } from "react";
import UserAuth from "./UserAuth";
// @ts-ignore
import Fade from "react-reveal/Fade";
// import Flip from "react-reveal/Flip";

export default function LoginAuth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isShifted, setIsShifted] = useState(true);

  const handleBtnClick = () => {
    // setIsSignUp((prevState) => !prevState);
    setIsSignUp(!isSignUp);
    setIsShifted(!isShifted);
  };
  return (
    <Fade>
      <div>
        <UserAuth
          handleImgBtnClick={handleBtnClick}
          isSignUp={isSignUp}
          isShifted={isShifted}
        />
      </div>
    </Fade>
  );
}
