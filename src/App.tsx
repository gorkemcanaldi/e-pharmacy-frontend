import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import TokenRefresher from "./components/TokenRefresher";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <AppRouter />
        <ToastContainer />
        <TokenRefresher />
      </AuthProvider>
    </>
  );
}

export default App;
