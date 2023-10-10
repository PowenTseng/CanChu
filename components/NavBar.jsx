/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */

"use client";

import { useState } from "react";
import nookies from "nookies";
import Image from "next/legacy/image";
import axios from "axios";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./style/NavBar.module.scss";
import useNotifications from "@/app/hooks/useNotifications";
import Notification from "./Notification";

function NavBar({ profile, profileIsLoading }) {
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useNotifications();

  const access_token = nookies.get().accessToken;
  const router = useRouter();

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
  };

  function handleLogout() {
    nookies.destroy(null, "accessToken");
    router.push("/login");
  }

  const handleMouseOverProfile = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseOutProfile = () => {
    setIsDropdownOpen(false);
  };

  const fetchSearchResults = async (searchKeyword) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/users/search?keyword=${searchKeyword}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setSearchResults(response.data.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchFocus = () => {
    setShowResults(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowResults(false), 100); // delay to allow for click event on results
  };

  const unreadNotificationsCount = notifications.filter(
    (notification) => notification.is_read === 0
  ).length;

  return (
    <div className={styles.navBarBox}>
      <div className={styles.canChuSearchBox}>
        <Link href="../../" style={{ textDecoration: "none" }}>
          <div className={styles.canChu}>CanChu</div>
        </Link>
        <div className={styles.searchBar}>
          <div className={styles.searchIconWordBox}>
            <Image
              src="/search 2.png"
              alt="The search icon"
              className={styles.searchIcon}
              height={17}
              width={17}
            />
            <input
              type="text"
              placeholder="搜尋"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                fetchSearchResults(e.target.value);
              }}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className={styles.searchWord}
            />
          </div>
          {showResults && searchResults?.length > 0 && (
            <ul className={styles.searchResults}>
              {searchResults?.map((user) => (
                <li key={user.id} className={styles.searchResultsList}>
                  {user.picture ? (
                    <Image
                      src={user.picture}
                      alt={`${user.name}'s picture`}
                      height={36}
                      width={36}
                      className={styles.userPicture}
                    />
                  ) : (
                    <Image
                      src="/profile.jpg"
                      alt="default picture"
                      height={36}
                      width={36}
                      className={styles.userPicture}
                    />
                  )}
                  <Link href={`/users/${user.id}`} className={styles.userName}>
                    {user.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={styles.profileNotificationContainer}>
        <div className={styles.notificationContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            className={styles.notificationNumber}
          >
            <circle cx="11.3332" cy="10.6667" r="10.6667" fill="#DE3F4F" />
            <text
              x="11.5" // Centered horizontally
              y="15" // Slightly below the vertical center to visually align better
              textAnchor="middle" // Align text in the middle
              fill="white" // Text color
              fontSize="13" // Font size, can be adjusted
              fontFamily="Helvetica Neue" // Font family, can be adjusted
            >
              {unreadNotificationsCount}
            </text>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            className={styles.notificationIcon}
            onClick={handleNotificationClick}
          >
            <circle cx="18" cy="18" r="18" fill="#A3C3D3" />
            <path
              d="M13.5208 26.1521C14.557 26.1521 16.2606 26.0569 18.5646 25.6325C18.1662 26.7159 17.1277 27.4923 15.9079 27.4923C14.8938 27.4923 14.0054 26.9552 13.5041 26.1521H13.5208ZM26.5311 20.2413C26.7193 21.2104 26.0397 22.0675 24.5098 22.7906C23.6717 23.186 21.8081 23.9388 18.73 24.5376C16.3559 24.9986 14.6164 25.1045 13.5216 25.1045C13.1962 25.1045 12.9273 25.0954 12.7155 25.0832C11.0271 24.9864 10.0747 24.4454 9.88653 23.4763C9.60082 22.0081 10.0526 21.4413 10.8016 20.5026L10.9989 20.255C11.5041 19.6142 11.7014 18.9849 11.3783 17.3247C10.6553 13.6066 12.33 11.0656 15.9719 10.354C19.6153 9.65078 22.1204 11.3773 22.8435 15.0961C23.1658 16.7563 23.5848 17.2653 24.2934 17.6698V17.6706L24.5692 17.8268C25.6145 18.4165 26.2454 18.7723 26.5311 20.2413Z"
              fill="white"
            />
          </svg>
        </div>
        {showNotification && (
          <Notification
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}
        <div
          onMouseOver={handleMouseOverProfile}
          onMouseOut={handleMouseOutProfile}
          className={styles.profileContainer}
        >
          <Link
            href={`../users/${profile.id}`}
            style={{ textDecoration: "none" }}
          >
            {!profile?.picture && profileIsLoading && (
              <Skeleton
                variant="circle"
                width={36}
                height={36}
                style={{ borderRadius: "50%" }}
              />
            )}
            {!profile?.picture && !profileIsLoading && (
              <Image
                src="/profile.jpg"
                alt="default picture"
                height={36}
                width={36}
                className={styles.profilePicture}
              />
            )}
            {profile?.picture && (
              <Image
                src={profile.picture}
                alt="The user's picture"
                width={36}
                height={36}
                className={styles.profilePicture}
              />
            )}
          </Link>
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <div className={styles.myNameBox}>
                <div className={styles.profileContainer}>
                  {!profile?.picture && profileIsLoading && (
                    <Skeleton
                      variant="circle"
                      width={36}
                      height={36}
                      style={{ borderRadius: "50%" }}
                    />
                  )}
                  {!profile?.picture && !profileIsLoading && (
                    <Image
                      src="/profile.jpg"
                      alt="default picture"
                      height={36}
                      width={36}
                      className={styles.insideProfilePicture}
                    />
                  )}
                  {profile?.picture && (
                    <Image
                      src={profile.picture}
                      alt="The user's picture"
                      width={36}
                      height={36}
                      className={styles.insideProfilePicture}
                    />
                  )}
                </div>
                <div className={styles.myName}>{profile.name}</div>
              </div>
              <div className={styles.profileBox}>
                <Link
                  href={`../users/${profile.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className={styles.personalProfile}>查看個人檔案</div>
                </Link>
              </div>
              <div className={styles.logOutBox}>
                <button
                  onClick={handleLogout}
                  className={styles.logOut}
                  type="submit"
                >
                  登出
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
