import Form from "./Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useHistory } from "./HistoryContext"

const LogIn = () => {
  const Navigate = useNavigate();
  const { setHistory } = useHistory();
  const handleLogin = (email: string, password: string) => {
    axios
      .post("http://localhost:8000/login", {
        email: email,
        password: password,
      })
      .then(async (response) => {
        console.log(response);
        if (response.data.authenticate) {
          const historyResponse = await axios.post<{ history: string[] }>(
            "http://localhost:8000/history"
          );
          setHistory(historyResponse.data.history); 
          Navigate("/ChatBot");
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("login erorr");
      });

    return true;
  };

  return <Form signup={true} Port={"/signUp"} handleSubmit={handleLogin} />;
};

export default LogIn;
