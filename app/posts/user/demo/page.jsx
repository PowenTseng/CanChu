import React from "react";
import Post from "../../../../component/Post";
import NavBar from "../../../../component/NavBar";
import styles from "../../../../component/style/Index.module.scss";
import News from "../../../../component/News";
import PersonalContent from "@/component/PersonalContent";
import PersonalProfile from "@/component/PersonalProfile";

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
const intros = [
  {
    id: 10,
    name: "PJ",
    picture: "https://i.imgur.com/LpWvQDp.png",
    friend_count: 1,
    introduction: "客戶要的不是你為他做一個網站，而是要你幫他解決問題",
    tags: "chatGPT,系統思考,設計思考",
    friendship: {
      id: 1,
      status: "requested",
    },
  },
];
const shouldHideData = true;
function PersonalProfilePage() {
  return (
    <div>
      <NavBar />
      {intros.map((intro) => (
        <PersonalContent key={intro.id} intro={intro} />
      ))}
      <div className={styles.page}>
        <div className={styles.sideBarBox}>
          {intros.map((intro) => (
            <PersonalProfile key={intro.id} intro={intro} />
          ))}
          <div className={styles.aboutUsBox}>
            <div className={styles.aboutUs}>
              關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.
            </div>
          </div>
        </div>
        <div className={styles.post}>
          {intros.map((intro) => (
            <News key={intro.id} intro={intro} />
          ))}
          {posts.map((post) => (
            <Post key={post.id} post={post} shouldHideData={shouldHideData} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PersonalProfilePage;
