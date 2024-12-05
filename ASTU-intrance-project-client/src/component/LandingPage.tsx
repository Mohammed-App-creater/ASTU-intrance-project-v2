import { useEffect, useState } from "react";
import logo from "../assets/photo_2024-12-03_09-36-25(1)(1)_enhanced.png";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate("/login");
  };
  const fullText: string = `I am ASTUChat, a chatbot powered by Gemini-Pro AI. My purpose is to assist you with various tasks and provide helpful, accurate, and engaging responses. Whether you're looking for information, need assistance with a project, or just want to have a conversation, I am here to help. With the capabilities of Gemini-Pro AI, I can understand complex queries, generate creative content, and even analyze data, making me a versatile tool for many different needs. Let me know how I can assist you!`;


  const [text, setText] = useState("");

  useEffect(() => {
    const animateText = (fullText: string, delay: number) => {
      let index = 0;

      const interval = setInterval(() => {
        setText((prev) => {
          return prev + fullText[index];
        });
        index++;

        if (index >= fullText.length) {
          clearInterval(interval);
        }
      }, delay);
    };

    animateText(fullText, 100);

    return () => clearInterval(100); // Cleanup the interval when the component unmounts
  }, []);

  return (
    <section className="relative landingBg flex items-center justify-center">
      <div className=" absolute top-0 left-0 w-full  h-20 bg-[#00000045] flex justify-between items-center px-6">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          ASTUChat AI
        </h1>
        <div className=" p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full hover:scale-110 active:scale-90 transition-transform duration-300 ">
          <button
            onClick={handleClick}
            className=" text-white font-semibold text-lg bg-[#0b162b] py-3 px-8 rounded-full "
          >
            Login
          </button>
        </div>
      </div>
      <div className=" w-full md:w-10/12  h-full flex flex-col md:flex-row-reverse md:justify-between items-center pt-32  ">
        <div className=" w-full flex flex-col items-center gap-6">
          <div className=" w-44 h-44 ">
            <img src={logo} alt="Logo" />
          </div>
          <div className=" w-11/12 md:w-2/3 md:h-1/2 min-h-32 p-4 h-auto mb-12 rounded-3xl bg-[#000000cb]">
            <p className=" text-white text-wrap text-center w-full h-full ">
              {text}
            </p>
          </div>
        </div>
        <div className=" md:w-1/2 flex flex-col items-center">
          <div>
            <p className=" text-white text-wrap text-xl font-semibold mb-6 text-center leading-10">
              Experience the Future of Intelligent Conversation with ASTUChat -
              a cutting-edge AI-powered chatbot designed to revolutionize how
              you communicate, solve problems, and discover new ideas. Dive into
              seamless interactions, meaningful insights, and smarter solutions
              tailored just for you.
            </p>
          </div>
          <h1 className=" text-white text-xl font-bold mb-6 ">
            Explore the Depths of Intelligent chats
          </h1>
          <div className=" p-1 w-fit flex  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full hover:scale-110 active:scale-90 transition-transform duration-300 ">
            <button
              onClick={handleClick}
              className="  flex items-center gap-2 min-h-16 text-white font-semibold text-lg bg-[#0b162b] py-3 px-8 rounded-full "
            >
              Start Chating
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFF"
              >
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
