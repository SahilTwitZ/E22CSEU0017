import React, { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser } from "../api";

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const getTopUsers = async () => {
      const usersData = await fetchUsers();
      const userPostCounts = [];

      for (const [id, name] of Object.entries(usersData.users)) {
        const postsData = await fetchPostsByUser(id);
        userPostCounts.push({ id, name, posts: postsData.posts.length });
      }

      userPostCounts.sort((a, b) => b.posts - a.posts);
      setTopUsers(userPostCounts.slice(0, 5));
    };

    getTopUsers();
  }, []);

  return (
    <div>
      <h1>Top Users</h1>
      <ul>
        {topUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.posts} posts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
