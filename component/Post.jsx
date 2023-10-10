import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import styles from "./style/style.module.scss";
import CommentBox from "./CommentBox";

function Post({ post, shouldHideData }) {
  return (
    <div className={styles.postBox}>
      <div />
      {/* The first box */}
      <div className={styles.postContent}>
        <div className={styles.userInfoBox}>
          <Image
            src={post.picture}
            alt={post.name}
            height={74}
            width={76.44}
            className={styles.profilePicture}
          />
          <div className={styles.nameTimeBox}>
            <div className={styles.name}>{post.name}</div>
            <Link href="/posts/demo">
              <div className={styles.time}>{post.created_at}</div>
            </Link>
          </div>
        </div>

        {/* article element */}
        <article className={styles.post}>{post.context}</article>
      </div>

      {/* The second box */}
      <div className={styles.heartCommentBox}>
        <div className={styles.heartCommentSmallBox}>
          <Image
            src="/heart-2 1.png"
            alt="heart"
            height={28}
            width={28}
            style={{ marginRight: "12px" }} // Set the right margin
          />
          <Link href="/posts/demo">
            <Image src="/Fb-comment.png" alt="comment" height={20} width={20} />
          </Link>
        </div>
      </div>

      {/* The third box */}
      <div className={styles.numberBox}>
        <Link href="/posts/demo">
          <p className={styles.likeNumber}>{post.like_count}人喜歡這則貼文</p>
        </Link>
        <Link href="/posts/demo">
          <p className={styles.commentNumber}>{post.comment_count}則留言</p>
        </Link>
      </div>

      {/* The fourth box */}
      <div className={styles.commentArea}>
        {shouldHideData ? null : <CommentBox />}
        <Link href="/posts/demo">
          <div className={styles.commentBox}>
            <Image
              src="/profile.jpg"
              alt="The user's picture"
              height={52}
              width={52}
            />
            <div className={styles.commentblock}>
              <div className={styles.comment}>留個言吧</div>
              {shouldHideData ? null : (
                <Image
                  src="/send.png"
                  alt="send button"
                  height={25}
                  width={25}
                />
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Post;
