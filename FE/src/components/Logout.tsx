import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("isadmin");

      navigate("/login");
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="text-blue-950 h-[100vh] pt-[20rem] text-3xl text-center bg-cover bg-[url('https://wallpapercave.com/wp/wp4465115.jpg')] bg-no-repeat">
      Logging out...
    </div>
  );
};

export default Logout;
