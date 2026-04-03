import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { refreshToken } from "../api/user";
import { toast } from "react-toastify";

export default function TokenRefresher() {
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) return;
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
      4 * 60 * 1000,
    );
    return () => clearTimeout(timer);
  }, [accessToken, setAccessToken, navigate]);

  return null;
}
