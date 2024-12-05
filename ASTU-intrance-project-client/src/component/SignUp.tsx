import { useNavigate } from "react-router-dom";
import Form from "./Form";
import axios from "axios";

const SignUp = () => {
  const Navigate = useNavigate();
  const handleSignUp = ( email: string, password: string,  Name?: string) => {

    if(email === "" || Name === "" || password === ""){
      Navigate("/signUp");
      alert("Please fill all the fields");
      return false;
    }
    
      axios.post("http://localhost:8000/signUp", {
      name: Name,
      email: email,
      password: password,
    }).then((response) => {
      if (response.data === "User registered successfully") {
        Navigate("/logIn");
      }
      else{
        alert("User already exists");
      }
      
    }).catch((error) => {
      console.log(error, " here");
    });
   
  return true;
};

  return <Form signup={false} handleSubmit={handleSignUp} Port={"/logIn"} />;
};


export  default SignUp;