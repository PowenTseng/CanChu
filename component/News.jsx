import React from "react";
import Image from "next/legacy/image";
import styles from "./style/News.module.scss";

function News({ intro }) {
  return (
    <div className={styles.newsBox}>
      <div className={styles.profileContainer}>
        <Image
          src={intro.picture}
          alt="The friend icon"
          width={74}
          height={74}
          className={styles.profile}
        />
      </div>
      <div className={styles.postArea}>
        <div className={styles.saySomethingBox}>
          <div className={styles.saySomething}>說點什麼嗎？</div>
        </div>
        <div className={styles.postAPostBotton}>
          <div className={styles.postAPost}>發佈貼文</div>
        </div>
      </div>
    </div>
  );
}

export default News;
