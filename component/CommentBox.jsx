import React from "react";
import Image from "next/legacy/image";
import styles from "./style/Comment.module.scss";

const post = {
  id: 1,
  user_id: 1,
  context:
    "欸，你們好\n我一個人住，我的房子還滿大的，歡迎你們來我家玩\n玩累了就直接睡覺，沒問題的。",
  created_at: "2023-07-02 23:59:00",
  name: "傑哥",
  picture: "https://i.imgur.com/5NAGJfl.png",
  is_liked: false,
  like_count: 0,
  comments: [
    {
      id: 1,
      content: "但是我拒絕。",
      created_at: "2023-07-03 18:00:00",
      user: {
        id: 2,
        name: "岸邊露伴",
        picture: "https://i.imgur.com/Tma98BO.jpg",
      },
    },
    {
      id: 2,
      content: "要去是可以去，不要叫我坐下就是了。",
      created_at: "2023-07-03 18:00:01",
      user: {
        id: 3,
        name: "萊納",
        picture: "https://i.imgur.com/DKLeJZN.jpg",
      },
    },
  ],
  comment_count: 2,
};
function CommentBox() {
  return (
    <ul className={styles.ul}>
      {post.comments.map((comment) => (
        <li key={comment.id}>
          <div className={styles.outerCommentPictureBox}>
            <div className={styles.commentPictureBox}>
              <div className={styles.picturesBox}>
                <Image
                  src={comment.user.picture}
                  alt={comment.user.name}
                  height={32}
                  width={32}
                  className={styles.profilePicture}
                />
              </div>

              <div className={styles.outerCommentBox}>
                <div className={styles.commentBox}>
                  <div className={styles.userName}>{comment.user.name}</div>
                  <div className={styles.comment}>{comment.content}</div>
                </div>
                <div className={styles.time}>{comment.created_at}</div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentBox;
