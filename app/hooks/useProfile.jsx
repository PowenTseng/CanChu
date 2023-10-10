import { useState, useEffect } from "react";
import axios from "axios";
import nookies from "nookies";

const useProfile = (userId) => {
  const [profile, setProfile] = useState([]);
  const [profileIsLoading, setProfileIsLoading] = useState(false);
  const access_token = nookies.get().accessToken;

  useEffect(() => {
    setProfileIsLoading(true);
    axios(`${process.env.NEXT_PUBLIC_API_HOST}/users/${userId}/profile`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        setProfile(response.data.data.user);
        setProfileIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setProfileIsLoading(false);
      });
  }, [userId]);

  return [profile, setProfile, profileIsLoading];
};

export default useProfile;
