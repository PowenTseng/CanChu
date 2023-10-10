import React from "react";
import Image from "next/legacy/image";
import styles from "./style/SideBar.module.scss";

function SideBar() {
  const friend = [
    {
      id: 1,
      name: "大原所長",
      picture: "https://i.imgur.com/rVRCiZC.png",
      friendship: {
        id: 32,
        status: "friend",
      },
    },
    {
      id: 14,
      name: "Joseph Joestar",
      picture: "https://i.imgur.com/JSZhpVj.jpg",
      friendship: {
        id: 2,
        status: "friend",
      },
    },
  ];
  return (
    <div className={styles.sideBar}>
      <div className={styles.self}>
        <div className={styles.userProfile} />
        <div className={styles.yourName}>你的名字</div>
      </div>
      <div className={styles.friendBox}>
        <div className={styles.myFriendBox}>
          <div className={styles.vectorContainer}>
            <Image
              src="/Vector.png"
              alt="The friend icon"
              width={26.79}
              height={25}
              className={styles.vector}
            />
          </div>
          <div className={styles.myFriend}>我的好友</div>
        </div>
        {friend.map((friendData) => (
          <div key={friendData.id}>
            <div className={styles.smallFriendBox}>
              <Image
                src={friendData.picture}
                alt={friendData.name}
                width={42}
                height={42}
                className={styles.profile}
              />
              <div className={styles.friendName}>{friendData.name}</div>
            </div>
          </div>
        ))}
        <div className={styles.loadMoreBox}>
          <Image
            src="/options 1.png"
            alt="The option icon"
            width={39}
            height={39}
          />
          <div className={styles.loadMore}>查看全部</div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
