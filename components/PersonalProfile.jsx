/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */

"use client";

import { useState } from "react";
import nookies from "nookies";
import axios from "axios";
import { Skeleton } from "@mui/material";
import Swal from "sweetalert2";
import styles from "./style/PersonalProfile.module.scss";

function PersonalProfile({
  profile,
  setProfile,
  isMyProfile,
  user_id,
  profileIsLoading,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const access_token = nookies.get().accessToken;
  const [profileIntro, setProfileIntro] = useState("");
  const [profileTags, setProfileTags] = useState("");

  const acceptRequest = async () => {
    try {
      // Post request to /friends/:user_id/request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/friends/${profile.friendship.id}/agree`,
        {}, // if body is needed, fill it here
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      // If the request is successful, set profile.friendship.status to 'requested'
      if (response.status === 200) {
        //
      }
    } catch (error) {
      console.log("Error occurred while sending friend request:", error);
    }
  };

  const handleModeChange = () => {
    setIsEdit(!isEdit); // Toggle edit mode
  };

  const handleProfileEdit = async () => {
    try {
      console.log(profile.name);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_HOST}/users/profile`,
        {
          name: profile.name,
          introduction: profileIntro,
          tags: profileTags,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Profile name, intro and tags updated successfully!");
        setProfile((prevProfile) => ({
          ...prevProfile,
          introduction: profileIntro,
          tags: profileTags,
        }));

        // Success Sweet Alert
        Swal.fire("Success", "Profile updated successfully!", "success");
      } else {
        // Failed Sweet Alert
        Swal.fire("Oops...", "Failed to update the profile.", "error");
        console.log("Failed to update the profile.");
      }
    } catch (error) {
      // Error Sweet Alert
      Swal.fire("Oops...", "Something went wrong!", "error");
      console.log("Error occurred while updating the profile:", error);
    }
  };

  const handleFriendRequest = async () => {
    try {
      // Post request to /friends/:user_id/request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/friends/${user_id}/request`,
        {}, // if body is needed, fill it here
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      // If the request is successful, set profile.friendship.status to 'requested'
      if (response.status === 200) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          friendship: {
            ...prevProfile.friendship,
            status: "requested",
          },
        }));
        axios(`${process.env.NEXT_PUBLIC_API_HOST}/users/${user_id}/profile`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
          .then((response1) => {
            console.log(response1);
            setProfile(response1.data.data.user);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log("Error occurred while sending friend request:", error);
    }
  };

  const handleFriendDelete = () => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgba(84, 88, 247, 1)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // If the user confirms, proceed to delete
      if (result.isConfirmed) {
        try {
          // Delete request to /friends/:friendship_id
          const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_HOST}/friends/${profile.friendship.id}`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );

          // If the request is successful, set profile.friendship.status to null
          if (response.status === 200) {
            setProfile((prevProfile) => ({
              ...prevProfile,
              friendship: null,
            }));

            // Optionally, you can show a success message
            Swal.fire("Deleted!", "Your friend has been deleted.", "success");
          }
        } catch (error) {
          console.log("Error occurred while deleting friend request:", error);

          // Optionally, you can show an error message
          Swal.fire("Oops...", "Something went wrong!", "error");
        }
      }
    });
  };

  const handleClick = () => {
    if (profile?.friendship?.status === "requested") {
      handleFriendDelete();
    } else if (profile?.friendship?.status === "pending") {
      acceptRequest();
    } else if (profile?.friendship === null) {
      handleFriendRequest();
    } else {
      handleFriendDelete();
    }
  };
  const text = () => {
    if (profile?.friendship?.status === "requested") {
      return "刪除好友邀請";
    }
    if (profile?.friendship?.status === "pending") {
      return "接受好友邀請";
    }
    if (profile?.friendship === null) {
      return "邀請成為好友";
    }
    return "刪除好友";
  };

  return (
    <div className={styles.personalProfile}>
      {isMyProfile ? (
        isEdit ? (
          // If in edit mode, display a confirm button
          <div className={styles.editBoxGray}>編輯個人檔案</div>
        ) : (
          // If not in edit mode, display the edit button
          <button
            type="button"
            className={styles.editBoxPurple}
            onClick={() => {
              handleProfileEdit();
              handleModeChange();
            }}
          >
            編輯個人檔案
          </button>
        )
      ) : (
        <button
          type="button"
          className={styles.editBoxPurple}
          onClick={handleClick}
        >
          {text()}
        </button>
      )}

      <div className={styles.introHobbyBox}>
        <div className={styles.introBox}>
          <div className={styles.introHeading}>自我介紹</div>
          {isEdit && (
            <textarea
              value={profileIntro}
              onChange={(e) => setProfileIntro(e.target.value)}
              className={styles.introContentEdit}
            />
          )}
          {!isEdit && profile && profile.introduction && (
            <div className={styles.introContent}>{profile.introduction}</div>
          )}

          {!isEdit &&
            (!profile || !profile.introduction) &&
            profileIsLoading && (
              // Replace this with your Skeleton component
              <div style={{ marginTop: "10px" }}>
                <Skeleton variant="rectangle" width={100} height={20} />
              </div>
            )}
        </div>
        <div className={styles.hobbyBox}>
          <div className={styles.hobbyHeading}>興趣</div>
          {isEdit && (
            <textarea
              value={profileTags}
              onChange={(e) => setProfileTags(e.target.value)}
              className={styles.hobbyContentEdit}
            />
          )}
          {!isEdit && profile && profile.tags && (
            <div className={styles.hobbyContent}>{profile.tags}</div>
          )}

          {!isEdit && (!profile || !profile.tags) && profileIsLoading && (
            <div style={{ marginTop: "10px" }}>
              <Skeleton variant="rectangle" width={100} height={20} />
            </div>
          )}
        </div>
        {isEdit && (
          // If in edit mode, display a confirm button
          <div className={styles.confirmCancelBox}>
            <button
              type="button"
              className={styles.confirm}
              onClick={() => {
                handleProfileEdit();
                handleModeChange();
              }}
            >
              確認
            </button>
            <button
              type="button"
              className={styles.cancel}
              onClick={handleModeChange}
            >
              取消
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalProfile;
