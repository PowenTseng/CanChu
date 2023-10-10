/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

"use client";

import { useState, useEffect } from "react";
// External Dependencies
import nookies from "nookies";
import axios from "axios";

// Internal Dependencies
import CircularProgress from "@mui/material/CircularProgress";
import Post from "@/components/Post";
import NavBar from "@/components/NavBar";
import News from "@/components/News";
import PersonalContent from "@/components/PersonalContent";
import PersonalProfile from "@/components/PersonalProfile";
import usePosts from "@/app/hooks/usePosts";
import useProfile from "@/app/hooks/useProfile";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";
import styles from "@/components/style/PersonalProfilePage.module.scss";

function PersonalProfilePage({ params }) {
  const access_token = nookies.get().accessToken;
  const currentUserId = nookies.get().userId;
  const { user_id } = params;
  const [posts, setPosts, loadMore, isLoading] = usePosts(user_id);
  const [profile, setProfile, profileIsLoading] = useProfile(user_id);
  const [currentUserProfile, setCurrentUserProfile, currentProfileIsLoading] =
    useProfile(currentUserId);
  const [profilePicUpdated, setProfilePicUpdated] = useState(false);

  useInfiniteScroll(loadMore, 100);

  const isMyProfile = currentUserId === user_id;
  const aboutUsContent =
    "關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.";

  return (
    <div>
      <NavBar
        profile={currentUserProfile}
        profileIsLoading={currentProfileIsLoading}
      />
      <PersonalContent
        profile={profile}
        setProfile={setProfile}
        setCurrentUserProfile={setCurrentUserProfile}
        setPosts={setPosts}
        profileIsLoading={profileIsLoading}
      />
      <div className={styles.page}>
        <div className={styles.sideBarBox}>
          <PersonalProfile
            profile={profile}
            setProfile={setProfile}
            isMyProfile={isMyProfile}
            user_id={user_id}
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
                currentUserId={currentUserId}
                profile={profile}
                isLoading={isLoading}
                profileIsLoading={profileIsLoading}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default PersonalProfilePage;
