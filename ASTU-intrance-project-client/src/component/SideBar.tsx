import { useState } from "react";
import History from "./History";
import Setting from "./Setting";


type Props = {
  isOpen: boolean;
  onLoadHistory: (index: number) => void;
};

const SideBar: React.FC<Props> = (props) => {
  const [settings, setSettings] = useState(false);
  const handleClick = () => {
    setSettings(!settings);
  };


 

  return (
    <section
      className={`h-screen w-[85%] bg-[#eff4fb]   absolute top-0 left-0   flex flex-col justify-end gap-3     dark:bg-[#040824] rounded-r-2xl lg:rounded-none z-10  ${
        props.isOpen
          ? " max-lg:translate-x-0   transition-all duration-300   pb-32 lg:w-[23.5%] xl:w-[18.5%]  "
          : " max-lg:-translate-x-full  transition-all duration-300  lg:w-[4.6rem] pb-16"
      }`}
    >
      <div
        className={` h-12 flex items-center gap-4 ${
          props.isOpen
            ? "hover:bg-[#09172c]  active:bg-opacity-5 rounded-xl pl-6 "
            : "pl-3"
        }`}
      >
        <a  href="/ChatBot" target="_blank">
        <div className=" h-full w-12 flex items-center justify-center  rounded-full active:bg-opacity-5 hover:bg-[#09172c]  ">
          <svg
            className=" dark:fill-[#b5b8c5]"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </div>
        <p
          className={` dark:text-[#b5b8c5] ${
            props.isOpen
              ? "transition-all duration-300 ease-in-out"
              : " transition-all duration-300 ease-in-out  hidden"
          }`}
        >
          New Chat
        </p>
        </a>
      </div>
      <History isOpne={props.isOpen} onLoadHistory={props.onLoadHistory} />
      <div
        className={` h-12 flex items-center gap-4 ${
          props.isOpen
            ? "hover:bg-[#09172c]  active:bg-opacity-5 rounded-xl pl-6 "
            : "pl-3"
        }`}
      >
        <div className=" h-full w-12 flex items-center justify-center  rounded-full active:bg-opacity-5 hover:bg-[#09172c]  ">
          <svg
            className=" dark:fill-[#b5b8c5]"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
          </svg>
        </div>
        <p
          className={` dark:text-[#b5b8c5] ${
            props.isOpen
              ? "transition-all duration-300 ease-in-out"
              : "transition-all duration-300 ease-in-out hidden"
          }`}
        >
          {" "}
          History
        </p>
      </div>
      <div
      onClick={handleClick}
        className={`flex items-center h-12 gap-4 ${
          props.isOpen
            ? "hover:bg-[#09172c]  active:bg-opacity-5 rounded-xl pl-6 "
            : "pl-3"
        } `}
        >
        <div className=" h-full w-12 flex items-center justify-center  rounded-full active:bg-opacity-5 hover:bg-[#09172c]  ">
          <svg
            className=" dark:fill-[#b5b8c5]"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
          </svg>
        </div>
        <p
          className={` dark:text-[#b5b8c5] ${
            props.isOpen
              ? "transition-all duration-300 ease-in-out"
              : "transition-all duration-300 ease-in-out hidden"
          }`}
        >
          Settings
        </p>
      </div>
        <div className={` ${settings ? "block " : "hidden"} ${props.isOpen ? "left-80 " : "left-20"} absolute bg-[#eff4fb]   dark:bg-[#040824] dark:shadow-[#363a4a] shadow-[#a0a1a2]  shadow-all-around  w-[16rem] h-40 rounded-3xl overflow-hidden `}>
          <Setting   />
        </div>
    </section>
  );
};

export default SideBar;
