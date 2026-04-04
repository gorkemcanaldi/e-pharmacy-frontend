import { useLocation } from "react-router-dom";
import style from "./Header.module.css";
import { useEffect, useState } from "react";
import { userInfo } from "../../api/user";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const location = useLocation();
  const [email, setEmail] = useState<string | null>(null);
  const { accessToken } = useAuth();
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
  return (
    <>
      <div className={style.header}>
        <div className={style.header_logo}>
          <img src="/e-pharmacy-logo.svg" alt="logo" />
          <div>
            <p className={style.header_p}>Medicine store</p>
            <p>
              {currentTitle} | <span>{email}</span>
            </p>
          </div>
        </div>
        <div>
          <img src="/logout.svg" alt="logout" />
        </div>
      </div>
    </>
  );
}
