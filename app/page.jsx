/* eslint-disable no-unused-vars */

"use client";

// External Dependencies
import nookies from "nookies";

// Internal Dependencies
import CircularProgress from "@mui/material/CircularProgress";
import Post from "@/components/Post";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import News from "@/components/News";
import styles from "@/components/style/Index.module.scss";
import usePosts from "@/app/hooks/usePosts";
import useProfile from "@/app/hooks/useProfile";
import useFriends from "@/app/hooks/useFriends";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";

function HomePage({ params }) {
  // UserId of the current user
  const currentUserId = nookies.get().userId;

  // Retrieve userId from params
  const { user_id } = params;

  // Custom hooks for posts, profile, friends, and infinite scroll
  const [posts, setPosts, loadMore, isLoading] = usePosts(user_id);
  const [profile, setProfile, profileIsLoading] = useProfile(currentUserId);
  const [friends, setFriends] = useFriends();

  // Apply infinite scroll
  useInfiniteScroll(loadMore, 100);

  // Content to be displayed in the about us section
  const aboutUsContent =
    "關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.";

  return (
    <div>
      <NavBar profile={profile} profileIsLoading={profileIsLoading} />
      <div className={styles.page}>
        <div className={styles.sideBarBox}>
          <SideBar
            friends={friends}
            profile={profile}
            profileIsLoading={profileIsLoading}
          />
          <div className={styles.aboutUsBox}>
            <div className={styles.aboutUs}>{aboutUsContent}</div>
          </div>
        </div>
        <div className={styles.post}>
          <News profile={profile} profileIsLoading={profileIsLoading} />
          {posts.length &&
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                setPosts={setPosts}
                profile={profile}
                currentUserId={currentUserId}
                isLoading={isLoading}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
