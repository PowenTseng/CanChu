import { useState, useEffect } from "react";
import axios from "axios";
import nookies from "nookies";

const usePostDetail = (postId) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const access_token = nookies.get().accessToken;

  useEffect(() => {
    setIsLoading(true);
    axios(`${process.env.NEXT_PUBLIC_API_HOST}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        setPost(response.data.data.post);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [postId]);

  return [post, setPost, isLoading];
};

export default usePostDetail;
