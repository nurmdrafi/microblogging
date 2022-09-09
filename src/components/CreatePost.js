import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../context/GlobalState";
import { useUserAuth } from "../context/UserAuthContext";

const CreatePost = ({ closeModal }) => {
  const { authUser } = useUserAuth();
  const { addArticle, articles } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  let today = new Date();
  const handleCreatePost = (data) => {
    const newPost = {
      id: articles.length + 1,
      title: data.title,
      category: data.category,
      time: today.toLocaleString(),
      body: data.body,
      comments: [],
      upVote: 0,
      upVoteUsers: [],
      downVote: 0,
      downVoteUsers: [],
      email: authUser?.email,
      userName: authUser?.displayName,
    };
    addArticle(newPost);
    reset();
    closeModal();
  };
  return (
    <div className="flex justify-center mx-auto container bg-white">
      <div className=" mx-auto items-center text-center">
        <form
          onSubmit={handleSubmit(handleCreatePost)}
          className=" flex flex-col gap-3"
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
            <p className="text-error text-left pt-2">
              {errors?.title?.message}
            </p>
          </div>

          {/* Category */}
          <div className="form-control min-w-[350px] max-w-screen-lg">
            <input
              type="text"
              placeholder="Category"
              className={`input input-bordered w-full text-black bg-secondary ${
                errors.category && "input-error"
              }`}
              {...register("category", {
                required: "Please enter your post category",
              })}
            />
            {/* Error Message */}
            <p className="text-error text-left pt-2">
              {errors?.category?.message}
            </p>
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
    </div>
  );
};

export default CreatePost;
