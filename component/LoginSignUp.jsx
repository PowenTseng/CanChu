/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */

"use client";

import React, { useState } from "react";
import styles from "./style/LoginSignUp.module.scss";

function LoginSignUp() {
  const [isLogin, setIsLogin] = useState(true);

  const handleModeChange = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.LoginSignUpBox}>
      <div className={styles.whiteBox}>
        <div className={styles.canChu}>CanChu</div>
        <div className={styles.SignUpLogin}>
          {isLogin ? "會員登入" : "會員註冊"}
        </div>
        <div className={styles.forms}>
          {!isLogin && (
            <div className={styles.userContainer}>
              <div className={styles.user}>使用者名稱</div>
              <div className={styles.userBox}>
                <div className={styles.userEg}>例: Chou Chou Hu</div>
              </div>
            </div>
          )}
          <div className={styles.emailContainer}>
            <div className={styles.email}>電子郵件</div>
            <div className={styles.emailBox}>
              <div className={styles.emailEg}>例: shirney@appworks.tw</div>
            </div>
          </div>
          <div className={styles.passwordContainer}>
            <div className={styles.password}>密碼</div>
            <div className={styles.passwordBox} />
          </div>
          {!isLogin && (
            <div className={styles.rePasswordContainer}>
              <div className={styles.rePassword}>再次輸入密碼</div>
              <div className={styles.rePasswordBox} />
            </div>
          )}
          <div className={styles.loginButton}>
            <div className={styles.login}>{isLogin ? "登入" : "註冊"}</div>
          </div>
          <div className={styles.signUpBox}>
            <div className={styles.member}>
              {isLogin ? "尚未成為會員?" : "已經是會員了？"}
            </div>
            <div className={styles.signUp} onClick={handleModeChange}>
              {isLogin ? "會員註冊?" : "會員登入"}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.purpleBox} />
    </div>
  );
}

export default LoginSignUp;
