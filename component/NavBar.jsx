import React from "react";
import Image from "next/legacy/image";
import styles from "./style/NavBar.module.scss";

function NavBar() {
  return (
    <div className={styles.navBarBox}>
      <div className={styles.canChuSearchBox}>
        <Image
          src="/CanChu.png"
          alt="The search icon"
          height={24}
          width={113}
        />
        <div className={styles.searchBar}>
          <div className={styles.searchIconWordBox}>
            <Image
              src="/search 2.png"
              alt="The search icon"
              className={styles.searchIcon}
              height={17}
              width={17}
            />
            <div className={styles.searchWord}>搜尋</div>
          </div>
        </div>
      </div>
      <Image
        src="/profile.jpg"
        alt="The user's picture"
        className={styles.picture}
        height={36}
        width={36}
      />
    </div>
  );
}

export default NavBar;
