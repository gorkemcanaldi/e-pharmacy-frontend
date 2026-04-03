import { useNavigate } from "react-router-dom";
import style from "../Register/RegisterLogin.module.css";
import { loginUser } from "../../api/user";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validation/userValidation";
import { useForm } from "react-hook-form";
import type { LoginInput } from "../../types/user";
import { useState } from "react";
import EyeIcon from "../../icons/EyeIcon";
import EyeOffIcon from "../../icons/EyeOffIcon";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const handleLogin = async (data: LoginInput) => {
    try {
      const result = await loginUser(data);
      setAccessToken(result.accessToken);
      console.log("Login result:", result);
      navigate("/dashboard");
      if (result) {
        toast.success("register success.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Login failed.");
      }
    }
  };
  return (
    <>
      <div className={style.register}>
        <div className={style.reg_header}>
          <img src="/registerLogo.png" alt="registerLogo" />
          <span className={style.reg_span}>E-Pharmacy</span>
        </div>
        <div className={style.left_right_div}>
          <div className={style.left_div}>
            <img src="/pill.png" alt="pill" className={style.pill} />
            <p className={style.login_p}>
              Your medication, delivered Say goodbye to all
              <span className={style.span_}> your healthcare </span>
              worries with us
            </p>
          </div>
          <form
            className={style.right_div}
            onSubmit={handleSubmit(handleLogin)}
          >
            <input
              type="email"
              {...register("email")}
              className={`${style.register_input} ${!errors.email && watch("email") ? style.success : ""}`}
              placeholder="Email address"
            />
            {errors.email && <p>{errors.email.message}</p>}

            <div className={style.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`${style.register_input_}  ${!errors.password && watch("password") ? style.success : ""}`}
                placeholder="Password"
              />
              <button
                type="button"
                className={style.eye_button}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>
            {errors.password && <p>{errors.password.message}</p>}

            <button type="submit" className={style.register_button}>
              Log in
            </button>
            <button
              type="button"
              className={style.navig}
              onClick={() => navigate("/register")}
            >
              Don't have an account?
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
