/* eslint-disable no-unused-vars */

"use client";

import nookies from "nookies";
import Post from "@/components/Post";
import NavBar from "@/components/NavBar";
import styles from "@/components/style/PostDetailPage.module.scss";
import usePostDetail from "@/app/hooks/usePostDetail";
import useProfile from "@/app/hooks/useProfile";

function PostDetailPage({ params }) {
  const currentUserId = nookies.get().userId;
  const postsId = params.posts_id;
  const [post, setPost, isLoading] = usePostDetail(postsId);
  const [profile, setProfile] = useProfile(currentUserId);

  return (
    <div className={styles.page}>
      <NavBar profile={profile} />
      <div />
      <div className={styles.post}>
        {post && (
          <Post
            key={post.id}
            post={post}
            setPost={setPost}
            currentUserId={currentUserId}
            profile={profile}
          />
        )}
      </div>
    </div>
  );
}

export default PostDetailPage;
