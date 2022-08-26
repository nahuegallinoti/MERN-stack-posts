import { useState, useContext, createContext, useEffect } from "react";
import {
  getPostsRequest,
  getPostRequest,
  createPostRequest,
  deletePostRequest,
  updatePostRequest,
} from "../api/posts";

const postContext = createContext();

export const usePosts = () => {
  const context = useContext(postContext);
  if (!context) throw new Error("Post Provider is missing");

  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      await getPosts();
    })();
  }, []);

  const getPosts = async () => {
    try {
      const res = await getPostsRequest();
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPost = async (postId) => {
    try {
      const res = await getPostRequest(postId);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async (post) => {
    try {
      const res = await createPostRequest(post);
      setPosts([...posts, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const res = await deletePostRequest(postId);

      if (res.status === 204)
        setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = async (id, post) => {
    try {
      const res = await updatePostRequest(id, post);
      setPosts(posts.map((post) => (post._id === id ? res.data : post)));
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <postContext.Provider
      value={{ posts, createPost, deletePost, getPost, updatePost }}
    >
      {children}
    </postContext.Provider>
  );
};
