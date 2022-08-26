import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePosts } from "../context/postContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const PostForm = () => {
  const { createPost, getPost, updatePost } = usePosts();

  const navigate = useNavigate();
  const params = useParams();

  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const res = await getPost(params.id);
        setPost(res);
      }
    })();
  }, [params.id]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">New Post</h3>
          <Link to={"/"} className="text-gray-400 text-sm hover:text-gray-300">
            Go Back
          </Link>
        </header>
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("Post title is required"),
            description: Yup.string().required("Post description is required"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              const res = await updatePost(params.id, values);

              res.status === 200
                ? toast.success("Post updated successfully")
                : toast.error("Error has occurred");
            } else {
              await createPost(values);
            }

            actions.setSubmitting(false);
            navigate("/");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="">
              <label
                htmlFor="title"
                className="text-sm font-bold block text-gray-400"
              >
                Title
              </label>
              <Field
                className="mb-4 px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                name="title"
                placeholder="title"
              />
              <ErrorMessage
                component="p"
                className="text-red-400"
                name="title"
              />
              <label
                htmlFor="description"
                className="text-sm font-bold block text-gray-400"
              >
                Description
              </label>
              <Field
                className="mb-4 px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                name="description"
                placeholder="description"
                component="textarea"
                rows="3"
              />
              <ErrorMessage
                component="p"
                className="text-red-400"
                name="description"
              />
              <label
                htmlFor="file"
                className="text-sm font-bold block text-gray-400"
              >
                File
              </label>
              <input
                onChange={(e) => {
                  setFieldValue("image", e.target.files[0]);
                }}
                type="file"
                name="image"
                className="mb-4 px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full hover:cursor-pointer"
              />

              <button
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
