import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { logoutUser, refreshToken } from "./api/user";
import { useNavigate } from "react-router-dom";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { accessToken, setAccessToken } = useAuth();
  const timerSet = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) return;
    if (timerSet.current) return;
    timerSet.current = true;
    const timer = setTimeout(
      async () => {
        try {
          const res = await refreshToken();
          setAccessToken(res.accessToken);
          toast.success("Oturum yenilendi (24h)");
        } catch {
          toast.error("Oturum süresi doldu, tekrar giriş yapın");
          navigate("/login");
        }
      },
      13 * 60 * 1000,
    );

    return () => clearTimeout(timer);
  }, [accessToken]);

  const handleLogout = async () => {
    if (accessToken) await logoutUser(accessToken);
    setAccessToken(null);
    navigate("/login");
  };
  return (
    <div className="app">
      <Header
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        handleLogout={handleLogout}
      />
      <div className="main">
        <SideBar
          sideOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(false)}
          handleLogout={handleLogout}
        />
        {isSidebarOpen && (
          <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
        )}
        <div className="content">
          <AppRouter />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
