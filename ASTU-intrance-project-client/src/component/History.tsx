import { useHistory } from "./HistoryContext";

const History = ( props: { isOpne: boolean}) => {
   
      
    const { history } = useHistory();
  return (
    <div className=" w-full h-[60%] flex flex-col gap-1  active:bg-opacity-5 rounded-xl  dark:text-[#b5b8c5]    overflow-x-hidden  overflow-y-auto">
      <div className=" w-full h-12 flex items-center justify-center">
        <p className={` text-sm ${props.isOpne ? "dark:text-[#b5b8c5]   " : " text-transparent" }`}>History</p>
      </div>
      {history &&  history.map((item, index) => (
        <div
          key={index}
          className=" w-full h-10  px-4 py-1  hover:bg-[#09172c]  "
        >
          <p className={` text-sm overflow-ellipsis truncate ${props.isOpne ? " " : " text-transparent" }`}>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default History;
