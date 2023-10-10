import React from "react";
import Image from "next/legacy/image";
import styles from "./style/PersonalContent.module.scss";

function PersonalContent({ intro }) {
  return (
    <div className={styles.personalContentBox}>
      <div className={styles.profileBoxContainer}>
        <div className={styles.profileBox}>
          <div className={styles.profilePictureBox}>
            <Image
              src={intro.picture}
              alt="The profile picture"
              width={180}
              height={180}
              className={styles.profile}
            />
            <div className={styles.editWordContainer}>
              <div className={styles.editWord}>編輯大頭貼</div>
            </div>
          </div>
          <div className={styles.nameFriendContainer}>
            <div className={styles.yourName}>{intro.name}</div>
            <div className={styles.friendNumber}>
              {intro.friend_count}位朋友
            </div>
          </div>
        </div>
      </div>
      <div className={styles.postBar}>
        <div className={styles.postBox}>
          <div className={styles.post}>貼文</div>
        </div>
      </div>
    </div>
  );
}

export default PersonalContent;
