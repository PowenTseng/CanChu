import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import nookies from "nookies";

const constructUrl = (userId, cursor) => {
  let url = `${process.env.NEXT_PUBLIC_API_HOST}/posts/search`;

  if (userId) url += `?user_id=${userId}`;
  if (cursor) url += `${userId ? "&" : "?"}cursor=${cursor}`;

  return url;
};

const usePosts = (user_id) => {
  const [posts, setPosts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [ableToLoad, setAbleToLoad] = useState(true);
  const access_token = nookies.get().accessToken;

  const loadMore = useCallback(() => {
    console.log("test");
    if (isLoading || !hasMore) return Promise.resolve();

    setIsLoading(true);
    console.log("loadmore!!!");
    const url = constructUrl(user_id, nextCursor);

    return axios(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        const newPosts = response.data.data.posts;
        const nextCursorFromServer = response.data.data.next_cursor;

        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setNextCursor(nextCursorFromServer);
        setIsLoading(false);
        setHasMore(!!nextCursorFromServer);

        console.log(nextCursorFromServer);
      })
      .catch((error) => {
        console.log(error?.response || error);
        setIsLoading(false);
      });
  }, [user_id, nextCursor, isLoading, hasMore, access_token]);

  useEffect(() => {
    if (ableToLoad) {
      loadMore();
      setAbleToLoad(false);
    }
  }, [ableToLoad, loadMore]);

  return [posts, setPosts, loadMore, isLoading];
};

export default usePosts;
