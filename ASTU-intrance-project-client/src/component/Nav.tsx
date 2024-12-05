import axios from "axios";
import { MouseEventHandler, useState } from "react";

const Nav = (props: {
  menuBtn?: MouseEventHandler<HTMLDivElement>;
  isSidebarOpen?: boolean;
}) => {
  const [profile, setProfile] = useState(false);

  const handleLogout = () => {
    axios.post("http://localhost:8000/logout").then((response) => {
      console.log(response);
      window.location.reload();
    });
  };

  const profileBtn = () => {
    setProfile((pre) => !pre);
  };

  return (
    <nav className=" w-full h-16 absolute top-1 flex items-center  justify-between  pl-2 pr-8   bg-transparent ">
      <div className=" h-full flex items-center gap-12 z-20 ">
        <div
          className=" h-3/4 w-12 flex items-center justify-center rounded-full hover:bg-[#09172c] active:bg-opacity-5 "
          onClick={props.menuBtn}
        >
          <svg
            className=" dark:fill-[#b5b8c5]  "
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </div>
        <a
          className={`dark:text-[#b5b8c5] font-semibold text-xl transition-all ease-in-out ${
            props.isSidebarOpen ? " lg:translate-x-60" : ""
          } `}
        >
          ASTUChat
        </a>
      </div>
      <div className="flex gap-14 items-center  ">
        <svg
          className=" dark:fill-[#b5b8c5]"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
        </svg>
        <div
          onClick={profileBtn}
          className=" w-9 h-9 bg-[#fa903e] flex items-center justify-center rounded-full transition-all duration-300  hover:scale-125"
        >
          <h1 className="text-xl text-white font-semibold">M</h1>
        </div>

        <div
          className={` absolute top-0 md:top-16 left-0 md:left-[70%] bg-[#ffffff] dark:bg-[#040824] ${
            profile ? " " : "hidden"
          } w-screen md:w-[27%] h-screen md:h-96  dark:text-white py-4 rounded-2xl shadow-[#141d2a]  shadow-lg   z-20 `}
        >
          <div className=" w-full h-full relative flex flex-col items-center gap-2 ">
            <p className=" mb-12">mahammedismail@gmail.com</p>
            <div className=" w-20 h-20 bg-[#fa903e] flex items-center justify-center rounded-full transition-all duration-300  hover:scale-125">
              <h1 className="text-xl text-white font-semibold">M</h1>
            </div>
            <h1 className=" text-xl font-semibold">Hi Mohammed</h1>
            <div className=" py-3 px-16 rounded-full border border-white mb-2">
              <p className=" text-sm text-blue-300">
                Manage account coming soon
              </p>
            </div>
            <div onClick={handleLogout} className=" bg-[#181835] flex items-center gap-4 py-4 px-32 rounded-full active:opacity-85 ">
              <h1> LogOut</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFF"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
              </svg>
            </div>
            <p className="absolute bottom-10 md:bottom-0 text-xs">
              &copy; Copyright 2022-2024
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
