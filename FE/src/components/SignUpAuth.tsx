import { useState } from "react";
import UserAuth from "./UserAuth";

export default function SignupAuth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isShifted, setIsShifted] = useState(false);

  const handleBtnClick = () => {
    // setIsSignUp((prevState) => !prevState);
    setIsSignUp(!isSignUp);
    setIsShifted(!isShifted);
  };
  return (
    <div>
      <UserAuth
        handleImgBtnClick={handleBtnClick}
        isSignUp={isSignUp}
        isShifted={isShifted}
      />
    </div>
  );
}
