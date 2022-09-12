import React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import useUserAuth from "../context/UserAuthContext";
import useArticleContext from "../context/ArticleContext";

const CreatePost = ({ closeModal }) => {
  const { authUser } = useUserAuth();
  const { addArticle } = useArticleContext();
  const id = uuidv4();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleCreatePost = (data) => {
    let now = new Date();
    const newArticle = {
      id: id,
      title: data.title,
      time: now.toUTCString(),
      body: data.body,
      comments: [],
      upVote: 0,
      upVoteUsers: [],
      downVote: 0,
      downVoteUsers: [],
      email: authUser?.email,
      userName: authUser?.displayName,
    };
    addArticle(newArticle);
    reset();
    closeModal();
  };
  return (
    <div className="bg-white">
      <form
        onSubmit={handleSubmit(handleCreatePost)}
        className=" flex flex-col gap-3 bg-gradient-to-r from-slate-50 to-gray-100   dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-800"
      >
        {/* Title */}
        <div className="form-control min-w-[350px] max-w-screen-lg">
          <input
            type="text"
            placeholder="Title"
            className={`input input-bordered w-full text-black bg-secondary ${
              errors.title && "input-error"
            }`}
            {...register("title", {
              required: "Please enter your post title",
            })}
          />
          {/* Error Message */}
          <p className="text-error text-left pt-2">{errors?.title?.message}</p>
        </div>

        {/* Body */}
        <div className="form-control min-w-[350px] max-w-screen-lg">
          <textarea
            type="text"
            placeholder="Body"
            className={`textarea textarea-bordered w-full text-black bg-secondary ${
              errors.post && "textarea-error"
            }`}
            {...register("body", {
              required: "Please write your article",
            })}
          />
          {/* Error Message */}
          <p className="text-error text-left pt-2">{errors?.body?.message}</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-active btn-primary text-white uppercase min-w-[350px] max-w-screen-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
