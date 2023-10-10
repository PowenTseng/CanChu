/* eslint-disable prettier/prettier */
import { useEffect } from "react";

function useInfiniteScroll(loadMore, offset) {
  useEffect(() => {
    const handleScroll = () => {
      console.log(
        window.innerHeight + document.documentElement.scrollTop,
        document.documentElement.offsetHeight - offset
      );
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - offset
      ) {
        console.log("get the posts!");
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, offset]);
}

export default useInfiniteScroll;
