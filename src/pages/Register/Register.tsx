import { useState } from "react";
import { RegisterUser } from "../../api/user";
import style from "./RegisterLogin.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validation/userValidation";
import { useForm } from "react-hook-form";
import type { RegisterInput } from "../../types/user";
import EyeIcon from "../../icons/EyeIcon";
import EyeOffIcon from "../../icons/EyeOffIcon";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterInput>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const handleRegister = async (data: RegisterInput) => {
    try {
      const result = await RegisterUser(data);
      if (result) {
        toast.success("register success.");
        navigate("/login");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Register failed.");
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
            <img src="/pill.png" alt="pill" className={style.pil} />
            <p className={style.login_p}>
              Your medication, delivered Say goodbye to all
              <span className={style.span_}> your healthcare </span>
              worries with us
            </p>
          </div>
          <form
            className={style.right_div}
            onSubmit={handleSubmit(handleRegister)}
          >
            <input
              type="text"
              {...register("name")}
              className={`${style.register_input} ${!errors.name && watch("name") ? style.success : ""} `}
              placeholder="name"
            />
            {errors.name && <p>{errors.name.message}</p>}
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
              Register
            </button>
            <button
              type="button"
              className={style.navig}
              onClick={() => navigate("/login")}
            >
              Already have an account?
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
