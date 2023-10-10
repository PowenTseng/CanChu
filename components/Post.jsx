/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import { useState, useRef } from "react";
import Image from "next/legacy/image";
import nookies from "nookies";
import axios from "axios";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import styles from "./style/post.module.scss";
import CommentBox from "./CommentBox";

function Post({
  post,
  setPosts,
  currentUserId,
  profile,
  isLoading,
  profileIsLoading,
}) {
  const [postLike, setPostLike] = useState(post.like_count || 0);
  const [isLike, setIsLike] = useState(post.is_liked || false);
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isContentFullyShown, setIsContentFullyShown] = useState(false);
  const [originalContent, setOriginalContent] = useState(post.context);
  const access_token = nookies.get().accessToken;
  const isMyPost = Number(currentUserId) === Number(post.user_id);

  const handleReadMoreClick = () => {
    setIsContentFullyShown(true);
  };

  const likePost = async () => {
    setPostLike(postLike + 1);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/posts/${post.id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.status === 200) {
        setPostLike(response.data.post.id);
      } else {
        console.log("Failed to publish the post.");
      }
    } catch (error) {
      console.log("Error occurred while publishing the post:", error);
    }
  };

  const unlikePost = async () => {
    setPostLike(postLike - 1);
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_HOST}/posts/${post.id}/like`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.status === 200) {
        setPostLike(response.data.post.id);
      } else {
        console.log("Failed to delete the post.");
      }
    } catch (error) {
      console.log("Error occurred while deleting the post:", error);
    }
  };

  const handleLikeSubmit = async () => {
    console.log("islike", isLike);
    if (!isLike) {
      likePost();
      setIsLike(true);
    } else {
      unlikePost();
      setIsLike(false);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/posts/${post.id}/comment`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.status === 200) {
        // clear the comment field and close the comment input
        setComment("");
        setIsCommenting(false);
        window.location.reload();
        // here you might want to also update the comments list or post.comment_count
      } else {
        console.log("Failed to post the comment.");
      }
    } catch (error) {
      console.log("Error occurred while posting the comment:", error);
    }
  };

  const handlePostEdit = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_HOST}/posts/${post.id}`,
        { context: post.context },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (response.status === 200) {
        // here you might want to update the post's content in your local state
        setPosts((prevState) =>
          prevState.map((item) =>
            item.id === post.id ? { ...item, context: post.context } : item
          )
        );
      } else {
        console.log("Failed to edit the post.");
      }
    } catch (error) {
      console.log("Error occurred while editing the post:", error);
    }
  };

  const handlePostChange = (content) => {
    setPosts((prevState) =>
      prevState.map((item) =>
        item.id === post.id ? { ...item, context: content } : item
      )
    );
  };

  return (
    <div
      className={styles.postBox}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The first box */}
      <div className={styles.postContent}>
        {isHovered && isMyPost && (
          <picture>
            <img
              src="/icon.png"
              alt="edit button"
              height={24}
              width={24}
              onClick={() => setIsEditing(true)}
              className={styles.editButton}
            />
          </picture>
        )}
        <div className={styles.userInfoBox}>
          {!post.picture?.picture && isLoading && (
            <Skeleton
              variant="circle"
              width={74}
              height={74}
              style={{ borderRadius: "50%" }}
            />
          )}
          {!post?.picture && !isLoading && (
            <Image
              src="/profile.jpg"
              alt="default picture"
              height={74}
              width={76.44}
              className={styles.profilePicture}
            />
          )}
          {post?.picture && (
            <Image
              src={post.picture}
              alt={post.name}
              width={74}
              height={76.44}
              className={styles.profilePicture}
            />
          )}
          <div className={styles.nameTimeBox}>
            <div className={styles.name}>{post.name}</div>
            <Link href={`/post/${post.id}`} style={{ textDecoration: "none" }}>
              <div className={styles.time}>{post.created_at}</div>
            </Link>
          </div>
          <div />
        </div>

        {/* article element */}
        {/* <article className={styles.post}>{post.context}</article> */}
        {isEditing ? (
          <div>
            <textarea
              value={post.context}
              onChange={handlePostChange}
              className={styles.postEdit}
            />
            <div className={styles.confirmCancelBox}>
              <button
                type="button"
                className={styles.confirm}
                onClick={() => {
                  handlePostEdit();
                  setIsEditing(false);
                }}
              >
                確認
              </button>
              <button
                type="button"
                className={styles.cancel}
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                取消
              </button>
            </div>
          </div>
        ) : null}
        {!isEditing && post && post.context && (
          <div>
            <article className={styles.post}>
              {isContentFullyShown ? (
                <div>{post.context}</div>
              ) : (
                <div>
                  {post.context.slice(0, 200)}
                  <button
                    type="button"
                    onClick={handleReadMoreClick}
                    className={styles.readMoreButton}
                  >
                    ...查看更多
                  </button>
                </div>
              )}
            </article>
          </div>
        )}
        {/* {!isEditing && (!post || !post.context) && (
          <div style={{ marginTop: "30px", marginBottom: "10px" }}>
            <Skeleton variant="rectangle" width={500} height={100} />
          </div>
        )} */}
      </div>

      {/* The second box */}
      <div className={styles.heartCommentBox}>
        <div className={styles.heartCommentSmallBox}>
          {/* Heart button */}
          <button
            type="button"
            onClick={handleLikeSubmit}
            className={styles.heartButton}
          >
            <Image
              src={isLike ? "/heart-2 1.png" : "/emptyHeart.png"}
              alt="heart"
              height={isLike ? 28 : 24}
              width={isLike ? 28 : 24}
              // className={isLike ? styles.fullHeartIcon : styles.emptyHeartIcon}
            />
          </button>
          <Link href={`/post/${post.id}`}>
            <Image src="/Fb-comment.png" alt="comment" height={20} width={20} />
          </Link>
        </div>
      </div>

      {/* The third box */}
      <div className={styles.numberBox}>
        <Link href={`/post/${post.id}`} style={{ textDecoration: "none" }}>
          <p className={styles.likeNumber}>{postLike}人喜歡這則貼文</p>
        </Link>
        <Link href={`/post/${post.id}`} style={{ textDecoration: "none" }}>
          <p className={styles.commentNumber}>{post.comment_count}則留言</p>
        </Link>
      </div>

      {/* The fourth box */}
      <div className={styles.commentArea}>
        <CommentBox post={post} />
        <div className={styles.commentBox}>
          {!profile?.picture && profileIsLoading && (
            <Skeleton
              variant="circle"
              width={52}
              height={52}
              className={styles.userPic}
            />
          )}
          {!profile?.picture && !profileIsLoading && (
            <Image
              src="/profile.jpg"
              alt="default picture"
              height={52}
              width={52}
              className={styles.userPic}
            />
          )}
          {profile?.picture && (
            <Image
              src={profile.picture}
              alt="The user's picture"
              width={52}
              height={52}
              className={styles.userPic}
            />
          )}
          <div className={styles.commentblock}>
            <input
              value={comment}
              onChange={handleCommentChange}
              className={styles.textArea}
              placeholder="留個言吧"
              onClick={() => setIsCommenting(true)}
            />
            {isCommenting && (
              <Image
                src="/send.png"
                alt="send button"
                height={25}
                width={25}
                onClick={handleCommentSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
