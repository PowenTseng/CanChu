import React from "react";
import styles from "./style/PersonalProfile.module.scss";

function PersonalProfile({ intro }) {
  return (
    <div className={styles.personalProfile}>
      <div className={styles.editBoxContainer}>
        <div className={styles.editBox}>
          <div className={styles.editWord}>編輯個人檔案</div>
        </div>
      </div>
      <div className={styles.introHobbyBox}>
        <div className={styles.introBox}>
          <div className={styles.introHeading}>自我介紹</div>
          <div className={styles.introContent}>{intro.introduction}</div>
        </div>
        <div className={styles.hobbyBox}>
          <div className={styles.hobbyHeading}>興趣</div>
          <div className={styles.hobbyContent}>{intro.tags}</div>
        </div>
      </div>
    </div>
  );
}

export default PersonalProfile;
