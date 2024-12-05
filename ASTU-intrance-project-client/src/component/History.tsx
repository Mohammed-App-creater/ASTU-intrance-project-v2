import { useHistory } from "./HistoryContext";

const History = (props: { isOpne: boolean; onLoadHistory: (index: number) => void }) => {
  const { history } = useHistory();
  const handleLodeHistory = (index: number) =>{
    props.onLoadHistory(index);
  }
  return (
    <div className=" w-full h-[60%] flex flex-col gap-1  active:bg-opacity-5 rounded-xl  dark:text-[#b5b8c5]    overflow-x-hidden overflow-y-auto history ">
      <div className=" w-full h-12 flex items-center justify-center">
        <p
          className={` text-sm ${
            props.isOpne ? "dark:text-[#b5b8c5]   " : " text-transparent"
          }`}
        >
          History
        </p>
      </div>
      {history &&
        history.firstMessages.map((item, index) => (
          <div
            key={index}
            onClick={ () => {handleLodeHistory(index)}}
            className=" w-full h-10  px-4 py-1  hover:bg-[#09172c]  "
          >
            <p
              className={` text-sm overflow-ellipsis truncate ${
                props.isOpne ? " " : " hidden "
              }`}
            >
              {item}
            </p>
          </div>
        ))}
    </div>
  );
};

export default History;
