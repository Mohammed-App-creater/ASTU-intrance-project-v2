import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import Formatter from "./Formater";
import logo from "../assets/favicon-96x96.png";
import { useHistory } from "./HistoryContext";
import axios from "axios";



interface ChattboxProps {
  userMassage?: string;
  aiResponse?: string;
  isSidebarOpen: boolean;
}

// Define the ref type
interface ChattboxRef {
  loadHistory: (index: number) => void;
}

// Pass the ref as the second argument in forwardRef
const Chattbox = forwardRef<ChattboxRef, ChattboxProps>(({ userMassage, aiResponse, isSidebarOpen }, ref) => {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const prevUserMessageRef = useRef("");

  useEffect(() => {
    if (userMassage && userMassage !== prevUserMessageRef.current) {
      setChatHistory((prevHistory) => [...prevHistory, userMassage]);
      prevUserMessageRef.current = userMassage;
    } else if (aiResponse) {
      setChatHistory((prevHistory) => [...prevHistory, aiResponse]);
    }
  }, [userMassage, aiResponse]);

  const { history } = useHistory();

  
  const loadHistory = async (index: number) => {
    console.log(history, index)
    try {
      const response = await axios.post(
        "http://localhost:8000/loadHistory",
        { 
          index: index ,
          history : history,
         }
      );
      console.log(response.data);
      setChatHistory(response.data);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  useImperativeHandle(ref, () => ({
    loadHistory,
  }));

  return (
    <div
      className={` w-full  flex  justify-center h-[81%] mb-[3rem] overflow-y-auto transition-all ease-linear ${
        isSidebarOpen ? " lg:translate-x-48" : ""
      } `}
    >
      <div
        className={`  w-full lg:w-[45%] h-full  lg:px-4   ${
          chatHistory.length === 0
            ? "pb-12 flex justify-center items-center"
            : "pt-6"
        }`}
      >
        {chatHistory.length === 0 ? (
          <div className=" w-fit h-12  ">
            <h1 className=" text-4xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              {" "}
              WellCome ASTUChat
            </h1>
          </div>
        ) : null}
        {chatHistory.length > 0 &&
          chatHistory.map((item, index) => {
            return (
              <div
                className=" w-[98%] h-auto  flex flex-col lg:flex-row items-start justify-start   p-4 gap-6 dark:text-[#fff]  "
                key={index}
              >
                <div className=" flex-none w-12 h-12 rounded-full  overflow-hidden">
                {index % 2 === 0 ? (<div className=" w-full h-full bg-[#fa903e] flex items-center justify-center"> <h1 className="text-2xl font-semibold">M</h1></div>) : (<img src={logo} alt="Logo" className=" w-12 h-12 rounded-full object-cover hover:scale-110 transition-transform duration-300" />)}
                </div>
                {index % 2 === 0 ? (
                  <pre className=" w-full max-w-[90%] text-wrap text-[1.1rem] pl-1 ">{item}</pre>
                ) : (
                  <Formatter aiResponse={item} />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default Chattbox;


