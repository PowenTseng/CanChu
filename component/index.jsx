import React from "react";
import Post from "../../../component/Post";
import NavBar from "../../../component/NavBar";
import styles from "../../../component/style/Index.module.scss";
import SideBar from "../../../component/SideBar";
import News from "../../../component/News";

const posts = [
  {
    user_id: 1,
    name: "大原所長",
    picture: "https://i.imgur.com/rVRCiZC.png",
    id: 55,
    context: "兩津！你這個大笨蛋！！！",
    created_at: "2023-06-17 12:44:21",
    like_count: 0,
    comment_count: 0,
    is_like: 0,
  },
  {
    user_id: 14,
    name: "Joseph Joestar",
    picture: "https://i.imgur.com/JSZhpVj.jpg",
    id: 66,
    context: "Oh my god!",
    created_at: "2023-06-13 16:32:40",
    like_count: 1,
    comment_count: 1,
    is_like: 1,
  },
  {
    user_id: 14,
    name: "Makima",
    picture: "https://i.imgur.com/mnlDuoX.png",
    id: 64,
    context: "你現在是我的寵物\n你只能說「是」或是「汪」",
    created_at: "2023-05-24 17:30:25",
    like_count: 0,
    comment_count: 1,
    is_like: 0,
  },
];

function HomePage() {
  return (
    <div>
      <NavBar />
      <div className={styles.page}>
        <div className={styles.sideBarBox}>
          <SideBar />
          <div className={styles.aboutUsBox}>
            <div className={styles.aboutUs}>
              關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.
            </div>
          </div>
        </div>
        <div className={styles.post}>
          <News />
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
