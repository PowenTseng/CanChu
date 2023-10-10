import React from "react";
import LoginSignUp from "@/components/LoginSignUp";
import styles from "@/components/style/LoginSignUpPage.module.scss";

function LoginSignUpPage() {
  return (
    <div className={styles.page}>
      <div className={styles.loginBox}>
        <LoginSignUp />
        <div className={styles.aboutUsBox}>
          <div className={styles.aboutUs}>
            關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUpPage;
