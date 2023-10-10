import { useState, useEffect } from "react";
import axios from "axios";
import nookies from "nookies";

function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const access_token = nookies.get().accessToken;

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
  }, []);

  return [notifications, setNotifications];
}

export default useNotifications;
