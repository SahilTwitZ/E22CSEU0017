import React, { useEffect, useState } from "react";
import { fetchUsers, fetchPostsByUser, fetchCommentsByPost } from "../api";

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const getTrendingPosts = async () => {
      const usersData = await fetchUsers();
      let postsWithComments = [];

      for (const id of Object.keys(usersData.users)) {
        const postsData = await fetchPostsByUser(id);

        for (const post of postsData.posts) {
          const commentsData = await fetchCommentsByPost(post.id);
          postsWithComments.push({ ...post, comments: commentsData.comments.length });
        }
      }

      postsWithComments.sort((a, b) => b.comments - a.comments);
      setTrendingPosts(postsWithComments.filter(post => post.comments === postsWithComments[0].comments));
    };

    getTrendingPosts();
  }, []);

  return (
    <div>
      <h1>Trending Posts</h1>
      <ul>
        {trendingPosts.map((post) => (
          <li key={post.id}>
            {post.content} - {post.comments} comments
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPosts;
