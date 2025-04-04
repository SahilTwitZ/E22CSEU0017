import React, { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser } from "../api";

const Feed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const getFeed = async () => {
      const usersData = await fetchUsers();
      let allPosts = [];

      for (const id of Object.keys(usersData.users)) {
        const postsData = await fetchPostsByUser(id);
        allPosts.push(...postsData.posts);
      }

      allPosts.sort((a, b) => b.id - a.id); // Newest first
      setFeed(allPosts);
    };

    getFeed();
  }, []);

  return (
    <div>
      <h1>Feed</h1>
      <ul>
        {feed.map((post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
