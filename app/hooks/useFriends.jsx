import { useState, useEffect } from "react";
import axios from "axios";
import nookies from "nookies";

const useFriends = () => {
  const [friends, setFriends] = useState([]);
  const access_token = nookies.get().accessToken;

  useEffect(() => {
    axios(`${process.env.NEXT_PUBLIC_API_HOST}/friends`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => setFriends(response.data.data.users))
      .catch((error) => console.log(error));
  }, []);

  return [friends, setFriends];
};

export default useFriends;
