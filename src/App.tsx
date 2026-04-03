import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import TokenRefresher from "./components/TokenRefresher";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRouter />
        <ToastContainer />
        <TokenRefresher />
      </AuthProvider>
    </>
  );
}

export default App;
