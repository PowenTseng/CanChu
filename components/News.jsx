/* eslint-disable prettier/prettier */

"use client";

import { useState } from "react";
import Image from "next/legacy/image";
import nookies from "nookies";
import axios from "axios";
import { Skeleton } from "@mui/material";
import styles from "./style/News.module.scss";

function News({ profile, profileIsLoading }) {
  const [postContent, setPostContent] = useState("");
  const access_token = nookies.get().accessToken;

  const handlePostSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/posts`,
        { context: postContent },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.log("Failed to publish the post.");
      }
    } catch (error) {
      console.log("Error occurred while publishing the post:", error);
    }
  };
  return (
    <div className={styles.newsBox}>
      <div className={styles.profileContainer}>
        {!profile?.picture && profileIsLoading && (
          <Skeleton
            variant="circle"
            width={74}
            height={74}
            style={{ borderRadius: "50%" }}
          />
        )}
        {!profile?.picture && !profileIsLoading && (
          <Image
            src="/profile.jpg"
            alt="default picture"
            height={74}
            width={74}
            className={styles.profile}
          />
        )}
        {profile?.picture && (
          <Image
            src={profile.picture}
            alt="The friend icon"
            width={74}
            height={74}
            className={styles.profile}
          />
        )}
      </div>
      <div className={styles.postArea}>
        <textarea
          className={styles.saySomethingBox}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="說點什麼嗎？"
        />
        <button
          type="button"
          className={styles.postAPostBotton}
          onClick={handlePostSubmit}
        >
          發佈貼文
        </button>
      </div>
    </div>
  );
}

export default News;
