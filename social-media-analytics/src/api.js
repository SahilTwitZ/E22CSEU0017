const BASE_URL = "http://20.244.56.144/evaluation-service";

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  return response.json();
};

export const fetchPostsByUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/posts`);
  return response.json();
};

export const fetchCommentsByPost = async (postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  return response.json();
};
