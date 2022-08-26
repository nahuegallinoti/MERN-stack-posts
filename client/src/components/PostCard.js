import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";

export function PostCard({ post }) {
  const { deletePost } = usePosts();

  const navigate = useNavigate();

  const handleDelete = (postId) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            Do you want to delete post <strong>{postId}</strong>
          </p>
          <div>
            <button
              onClick={() => {
                deletePost(postId);
                toast.dismiss(t.id);
              }}
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        style: {
          backgroundColor: "grey",
        },
      }
    );
  };
  return (
    <div
      onClick={() => navigate(`/posts/${post._id}`)}
      className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
    >
      <div className="px-4 py-7">
        <div className="flex justify-between">
          <h3>{post.title}</h3>
          <button
            className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post._id);
            }}
          >
            Delete
          </button>
        </div>
        <p>{post.description}</p>
      </div>
      {post.image && (
        <img className="h-96 w-full object-cover" src={post.image.url} alt="" />
      )}
    </div>
  );
}
