import { ReactElement } from "react";
// import Slide from "react-reveal/Slide";
// @ts-ignore
import Zoom from "react-reveal/Zoom";

// interface NavbarProps {
//   onClick: (action: string) => void;
// }

export default function Home(): ReactElement {
  return (
    <div className="h-screen ">
      <div className="flex justify-center">
        <div className="flex flex-col text-[2em]  lg:pt-[4rem]  mt-[5rem]">
          <h1 className="mb-[3rem] text-[10rem] font-bold lg:text-[10rem]">
            <Zoom>Welcome</Zoom>
          </h1>
          <div className="flex flex-col gap-3 lg:flex-row w-[90%] justify-center mx-auto  lg:ml-0">
            <button className="ml-[8.5rem] text-black bg-transparent rounded  cursor-pointer border border-black w-full h-[5rem] pt-[10px] pr-[40px] pb-[10px] pl-[10px] lg:w-[13rem] lg:text-[0.7em] lg:font-medium lg:rounded-2xl lg:p-0 lg:h-[4rem] hover:bg-gray-700">
              Find out more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
