import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Geçerli email girin").required("Email zorunludur"),
  password: yup
    .string()
    .min(6, "şifre en az 6 karakter olmalı")
    .required("Şifre zorunludur"),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name en az 3 karakter olmalı")
    .required("Name zorunludur"),
  email: yup.string().email("Geçerli email girin").required("Email zorunludur"),
  password: yup
    .string()
    .min(6, "şifre en az 6 karakter olmalıdır")
    .required("Şifre zorunludur"),
});
