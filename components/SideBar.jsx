/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from "react";
import Image from "next/legacy/image";
import nookies from "nookies";
import axios from "axios";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import styles from "./style/SideBar.module.scss";

function SideBar({ friends, profile, profileIsLoading }) {
  const [pendingFriends, setPendingFriends] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const access_token = nookies.get().accessToken;

  useEffect(() => {
    axios(`${process.env.NEXT_PUBLIC_API_HOST}/friends/pending`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        console.log(response);
        setPendingFriends(response.data.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const friendsToShow = showAll ? friends : friends.slice(0, 8);
  const pendingToShow = showAll
    ? pendingFriends
    : pendingFriends.slice(0, 8 - friendsToShow.length);

  // if (isLoading) {
  //   return (
  //     <div className={styles.sideBar}>
  //       <div className={styles.self}>
  //         <div style={{ marginRight: "20px" }}>
  //           <Skeleton
  //             variant="circle"
  //             width={42}
  //             height={42}
  //             style={{ borderRadius: "50%" }}
  //           />
  //         </div>
  //         <Skeleton
  //           variant="reactangle"
  //           width={150}
  //           height={25}
  //           className={styles.yourName}
  //         />
  //       </div>
  //       <div className={styles.friendBox}>
  //         <div className={styles.myFriendBox}>
  //           <div className={styles.vectorContainer}>
  //             <Image
  //               src="/Vector.png"
  //               alt="The friend icon"
  //               width={26.79}
  //               height={25}
  //               className={styles.vector}
  //             />
  //           </div>
  //           <div className={styles.myFriend}>我的好友</div>
  //         </div>
  //         {Array.from({ length: 7 }).map((_, index) => (
  //           <div key={index} className={styles.self}>
  //             <div style={{ marginRight: "20px" }}>
  //               <Skeleton
  //                 variant="circle"
  //                 width={42}
  //                 height={42}
  //                 style={{ borderRadius: "50%" }}
  //               />
  //             </div>
  //             <Skeleton variant="reactangle" width={150} height={25} />
  //           </div>
  //         ))}
  //         <div className={styles.loadMoreBox}>
  //           <Image
  //             src="/options 1.png"
  //             alt="The option icon"
  //             width={39}
  //             height={39}
  //           />
  //           <div className={styles.loadMore}>查看全部</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.sideBar}>
      <div className={styles.self}>
        {!profile?.picture && profileIsLoading && (
          <div style={{ marginRight: "20px" }}>
            <Skeleton
              variant="circle"
              width={42}
              height={42}
              style={{ borderRadius: "50%" }}
            />
          </div>
        )}
        {!profile?.picture && !profileIsLoading && (
          <Image
            src="/profile.jpg"
            alt="default picture"
            height={42}
            width={42}
            className={styles.profilePicture}
          />
        )}
        {profile?.picture && (
          <Image
            src={profile.picture}
            alt="The user's picture"
            width={42}
            height={42}
            className={styles.userProfile}
          />
        )}
        {profile.name ? (
          <div className={styles.yourName}>{profile.name}</div>
        ) : (
          <Skeleton variant="reactangle" width={150} height={30} />
        )}
      </div>
      <div className={styles.friendBox}>
        <div className={styles.myFriendBox}>
          <div className={styles.vectorContainer}>
            <Image
              src="/Vector.png"
              alt="Vector image"
              width={26.79}
              height={25}
              className={styles.vector}
            />
          </div>
          <div className={styles.myFriend}>我的好友</div>
        </div>
        {friendsToShow.map((friendData) => (
          <div key={friendData.id}>
            <div className={styles.smallFriendBox}>
              <Link
                href={`../users/${friendData.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className={styles.profileNameBox}>
                  {friendData.picture ? (
                    <Image
                      src={friendData.picture}
                      alt={friendData.name}
                      width={42}
                      height={42}
                      className={styles.profile}
                    />
                  ) : (
                    <Image
                      src="/profile.jpg"
                      alt="default picture"
                      height={42}
                      width={42}
                      className={styles.profile}
                    />
                  )}
                  <div className={styles.friendName}>{friendData.name}</div>
                </div>
              </Link>
            </div>
          </div>
        ))}
        {pendingToShow.map((request) => (
          <div key={request.id}>
            <div className={styles.smallFriendRequestBox}>
              <Link
                href={`../users/${request.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className={styles.profileNameBox}>
                  {request.picture ? (
                    <Image
                      src={request.picture}
                      alt={request.name}
                      width={42}
                      height={42}
                      className={styles.profile}
                    />
                  ) : (
                    <Image
                      src="/profile.jpg"
                      alt="default picture"
                      height={42}
                      width={42}
                      className={styles.profile}
                    />
                  )}
                  <div className={styles.friendName}>{request.name}</div>
                </div>
              </Link>
              <div className={styles.confirmCancelBox}>
                <button type="button" className={styles.confirm}>
                  確認
                </button>
                <button type="button" className={styles.cancel}>
                  取消
                </button>
              </div>
            </div>
          </div>
        ))}
        {pendingFriends.length + friends.length > 8 && !showAll && (
          <div className={styles.loadMoreBox} onClick={() => setShowAll(true)}>
            <Image
              src="/options 1.png"
              alt="Options icon"
              width={39}
              height={39}
            />
            <div className={styles.loadMore}>查看全部</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
