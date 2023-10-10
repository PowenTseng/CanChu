/* eslint-disable prettier/prettier */

"use client";

import { useState, useRef } from "react";
import nookies from "nookies";
import axios from "axios";
import Image from "next/legacy/image";
import Swal from "sweetalert2";
import { Skeleton } from "@mui/material";
import styles from "./style/PersonalContent.module.scss";

function PersonalContent({
  profile,
  setProfile,
  setPosts,
  setCurrentUserProfile,
  profileIsLoading,
}) {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const access_token = nookies.get().accessToken;

  const handleFile = (file) => {
    const formData = new FormData();
    formData.append("picture", file);
    axios
      .put(`${process.env.NEXT_PUBLIC_API_HOST}/users/picture`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Profile picture updated successfully!");
        setProfile((prevProfile) => ({
          ...prevProfile,
          picture: response.data.data.picture,
        }));
        setCurrentUserProfile((prevCurrentUserProfile) => ({
          ...prevCurrentUserProfile,
          picture: response.data.data.picture,
        }));

        axios(`${process.env.NEXT_PUBLIC_API_HOST}/posts/search?`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
          .then((response1) => {
            const newPosts = response1.data.data.posts;
            setPosts(newPosts);
          })
          .catch((error) => {
            console.log(error?.response || error);
          });

        Swal.fire(
          "Success",
          "Profile picture updated successfully!",
          "success"
        );
      })
      .catch((error) => {
        console.log(
          "Error occurred while updating the profile picture:",
          error
        );
        Swal.fire("Oops...", "Something went wrong!", "error");
      });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setDragging(false);
    handleFile(file);
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleProfilePicEdit = () => {
    fileInputRef.current.click();
  };
  return (
    <div className={styles.personalContentBox}>
      <div className={styles.profileBoxContainer}>
        <div className={styles.profileBox}>
          <div
            className={`${styles.profilePictureBox} ${
              dragging ? styles.dragging : ""
            }`}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!profile?.picture && profileIsLoading && (
              <Skeleton
                variant="circle"
                width={180}
                height={180}
                style={{ borderRadius: "50%" }}
              />
            )}
            {!profile?.picture && !profileIsLoading && (
              <Image
                src="/profile.jpg"
                alt="default picture"
                height={180}
                width={180}
                className={styles.profile}
              />
            )}
            {profile?.picture && (
              <Image
                src={profile.picture}
                alt="The profile picture"
                width={180}
                height={180}
                className={styles.profile}
              />
            )}
            <div className={styles.editWordContainer}>
              {/* Hidden input element to handle file selection */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className={styles.editWord}
                onClick={handleProfilePicEdit}
              >
                編輯大頭貼
              </button>
            </div>
          </div>
          <div className={styles.nameFriendContainer}>
            <div className={styles.yourName}>{profile.name}</div>
            <div className={styles.friendNumber}>
              {profile.friend_count}位朋友
            </div>
          </div>
        </div>
      </div>
      <div className={styles.postBar}>
        <div className={styles.postBox}>
          <div className={styles.post}>貼文</div>
        </div>
      </div>
    </div>
  );
}

export default PersonalContent;
