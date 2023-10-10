/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import nookies from "nookies";
import axios from "axios";
import "moment/locale/zh-tw";
import moment from "moment";
import styles from "./style/Notification.module.scss";

moment.locale("zh-tw");

function Notification({ notifications, setNotifications }) {
  const [showAll, setShowAll] = useState(false);
  const displayedNotifications = showAll
    ? notifications
    : notifications
        .sort(
          (a, b) =>
            moment(b.created_at).valueOf() - moment(a.created_at).valueOf()
        )
        .slice(0, 4);

  function markAsRead(eventId) {
    const access_token = nookies.get().accessToken;
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_HOST}/events/${eventId}/read`,
        {},
        { headers }
      )
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === eventId
              ? { ...notification, is_read: true }
              : notification
          )
        );
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_API_HOST}/events/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setNotifications(response.data.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className={styles.dropdown}>
      <div className={styles.myNotificationBox}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
        >
          <circle cx="18" cy="18" r="18" fill="white" />
          <path
            d="M13.5208 26.1521C14.557 26.1521 16.2606 26.0568 18.5646 25.6325C18.1661 26.7159 17.1277 27.4923 15.9079 27.4923C14.8938 27.4923 14.0054 26.9551 13.504 26.1521H13.5208ZM26.5311 20.2412C26.7193 21.2104 26.0397 22.0675 24.5098 22.7906C23.6717 23.186 21.808 23.9388 18.7299 24.5376C16.3559 24.9986 14.6164 25.1045 13.5216 25.1045C13.1962 25.1045 12.9273 25.0953 12.7155 25.0831C11.0271 24.9864 10.0747 24.4454 9.88652 23.4763C9.6008 22.0081 10.0526 21.4412 10.8016 20.5026L10.9989 20.2549C11.504 19.6142 11.7014 18.9848 11.3783 17.3247C10.6553 13.6066 12.3299 11.0656 15.9719 10.354C19.6153 9.65075 22.1204 11.3772 22.8435 15.0961C23.1658 16.7563 23.5848 17.2652 24.2934 17.6698V17.6706L24.5692 17.8268C25.6145 18.4165 26.2454 18.7723 26.5311 20.2412Z"
            fill="#5458F7"
          />
        </svg>
        <div className={styles.myNotification}>我的通知</div>
      </div>
      {displayedNotifications.map((notification) => (
        <div
          key={notification.id}
          className={styles.outterNotificationBox}
          onClick={() => markAsRead(notification.id)}
        >
          <img
            src={notification.image}
            alt={notification.summary}
            className={styles.picture}
          />
          <div className={styles.notificationBox}>
            <div
              className={
                notification.is_read
                  ? styles.notificationRead
                  : styles.notification
              }
            >
              {notification.summary}
            </div>
            <div
              className={notification.is_read ? styles.whenRead : styles.when}
            >
              {moment(notification.created_at).fromNow()}
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={notification.is_read ? styles.checkRead : styles.check}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM9.37311 3.74641C9.08022 3.45351 8.60535 3.45351 8.31245 3.74641L5.25 6.81434L3.90533 5.46967C3.61244 5.17678 3.13756 5.17678 2.84467 5.46967C2.55178 5.76256 2.55178 6.23744 2.84467 6.53033L4.71967 8.40533C5.01256 8.69822 5.48744 8.69822 5.78033 8.40533L9.37311 4.80707C9.66601 4.51417 9.66601 4.0393 9.37311 3.74641Z"
              fill="#5458F7"
            />
          </svg>
        </div>
      ))}
      {notifications.length > 4 && !showAll && (
        <div className={styles.showMoreBox}>
          <button
            type="button"
            className={styles.showMore}
            onClick={() => setShowAll(true)}
          >
            查看全部通知
          </button>
        </div>
      )}
    </div>
  );
}

export default Notification;
