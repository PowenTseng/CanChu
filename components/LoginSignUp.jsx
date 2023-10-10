/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */

"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import styles from "./style/LoginSignUp.module.scss";

function LoginSignUp() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleModeChange = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");

    const userSignUpData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const userLoginData = {
      provider: "native",
      email: values.email,
      password: values.password,
    };

    try {
      let response;
      if (isLogin) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_HOST}/users/signin`,
          userLoginData
        );
        const accessToken = response.data.data.access_token;
        const userId = response.data.data.user.id;
        setCookie(null, "accessToken", accessToken, {
          path: "/", // Cookie path (optional)
        });
        setCookie(null, "userId", userId, {
          path: "/", // Cookie path (optional)
        });
        router.push("/");
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_HOST}/users/signup`,
          userSignUpData
        );
        setIsLogin(true);
        Swal.fire(
          "Successful!",
          "You have been registered successfully!",
          "success"
        );
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response && error.response.status === 403) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email or password is wrong. Please try again.",
        });
      } else if (error.response && error.response.status >= 500) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something's wrong. Please try again later or notify our engineering team.",
        });
      }
      setErrorMessage("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isLoading) {
      return "登入中...";
    }
    if (isLogin) {
      return "登入";
    }
    return "註冊";
  };

  const validationSchema = Yup.object({
    name: !isLogin ? Yup.string().trim().required("Name is required") : null,
    email: Yup.string()
      .trim()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .trim()
      .min(8, "Password should be a minimum of 8 characters")
      .matches(
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
        "Password must contain a number, lower and uppercase letter"
      )
      .required("Password is required"),
    confirmPassword: !isLogin
      ? Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required")
      : null,
  });

  return (
    <div className={styles.LoginSignUpBox}>
      <div className={styles.whiteBox}>
        <div className={styles.canChu}>CanChu</div>
        <div className={styles.SignUpLogin}>
          {isLogin ? "會員登入" : "會員註冊"}
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange }) => (
            <Form className={styles.forms}>
              {!isLogin && (
                <div className={styles.userContainer}>
                  <div className={styles.user}>使用者名稱</div>
                  <Field
                    type="text"
                    placeholder="例: Chou Chou Hu"
                    name="name"
                    className={styles.userBox}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="name" />
                </div>
              )}
              <div className={styles.emailContainer}>
                <div className={styles.email}>電子郵件</div>
                <Field
                  type="email"
                  placeholder="例: shirney@appworks.tw"
                  name="email"
                  className={styles.emailBox}
                  onChange={handleChange}
                />
                <ErrorMessage name="email" />
              </div>
              <div className={styles.passwordContainer}>
                <div className={styles.password}>密碼</div>
                <Field
                  type="password"
                  name="password"
                  className={styles.passwordBox}
                  onChange={handleChange}
                />
                <ErrorMessage name="password" />
              </div>
              {!isLogin && (
                <div className={styles.rePasswordContainer}>
                  <div className={styles.rePassword}>再次輸入密碼</div>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className={styles.rePasswordBox}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="confirmPassword" />
                </div>
              )}
              <button
                type="submit"
                className={styles.loginButton}
                disabled={isLoading}
              >
                {getButtonText()}
              </button>
            </Form>
          )}
        </Formik>
        <div className={styles.signUpBox}>
          <div className={styles.member}>
            {isLogin ? "尚未成為會員?" : "已經是會員了？"}
          </div>
          <div className={styles.signUp} onClick={handleModeChange}>
            {isLogin ? "會員註冊?" : "會員登入"}
          </div>
        </div>
      </div>
      <div className={styles.purpleBox} />
    </div>
  );
}

export default LoginSignUp;
