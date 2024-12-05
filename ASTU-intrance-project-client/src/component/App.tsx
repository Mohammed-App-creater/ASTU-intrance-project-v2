import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LogInPage from "./LogInPage";
import SignUp from "./SignUp";
import ChatBot from "./ChatBot";
import LandingPage from "./LandingPage";

const App = () => {
  return (
    <div className="rel w-full h-screen bg-white flex items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/ChatBot"
            element={
              <ProtectedRoute>
                <ChatBot />
              </ProtectedRoute>
            }
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<LogInPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
