import { useLocation, useNavigate } from "react-router-dom";
import style from "./Header.module.css";
import { useEffect, useState } from "react";
import { logoutUser, userInfo } from "../../api/user";
import { useAuth } from "../../hooks/useAuth";
import BurgerMenu from "../../icons/BurgerMenu";
interface HeaderProps {
  toggleSidebar: () => void;
}
export default function Header({ toggleSidebar }: HeaderProps) {
  const location = useLocation();
  const [email, setEmail] = useState<string | null>(null);
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) return;
      try {
        const data = await userInfo(accessToken);
        setEmail(data.email);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [accessToken]);

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/orders": "All orders",
    "/products": "All products",
    "/suppliers": "All suppliers",
    "/customers": "All customers",
  };
  const currentTitle = titles[location.pathname] || "";

  const handleLogout = async () => {
    if (accessToken) await logoutUser(accessToken);
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <>
      <div className={style.header}>
        <div className={style.header_logo}>
          <div>
            <button className={style.burger} onClick={toggleSidebar}>
              <BurgerMenu />
            </button>
          </div>
          <img
            onClick={() => navigate("/dashboard")}
            className={style.header_lo}
            src="/e-pharmacy-logo.svg"
            alt="logo"
          />
          <div>
            <p className={style.header_p}>Medicine store</p>
            <p>
              {currentTitle} | <span>{email}</span>
            </p>
          </div>
        </div>
        <div onClick={handleLogout}>
          <img className={style.logout_head} src="/logout.svg" alt="logout" />
        </div>
      </div>
    </>
  );
}
