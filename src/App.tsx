import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import TokenRefresher from "./components/TokenRefresher";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <div className="main">
          <SideBar />
          <div className="content">
            <AppRouter />
          </div>
        </div>
        <ToastContainer />
        <TokenRefresher />
      </div>
    </AuthProvider>
  );
}

export default App;
