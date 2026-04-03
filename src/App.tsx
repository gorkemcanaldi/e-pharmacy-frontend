import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRouter />
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
