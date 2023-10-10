import Image from "next/legacy/image";
import styles from "./style/Comment.module.scss";

function CommentBox({ post }) {
  return (
    <ul className={styles.ul}>
      {post?.comments?.map((comment) => (
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
