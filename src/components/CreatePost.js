import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { GlobalContext } from "../context/GlobalState";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const CreatePost = () => {
  const [user] = useAuthState(auth);
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
      downVote: 0,
      email: user?.email,
      userName: user?.displayName,
    };
    addArticle(newPost);
    reset();
  };
  return (
    <div className="card mx-auto max-w-md bg-white drop-shadow-lg">
      <div className="card-body items-center text-center">
        <form
          onSubmit={handleSubmit(handleCreatePost)}
          className=" flex flex-col gap-3"
        >
          {/* Title */}
          <div className="form-control min-w-[350px]">
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
            {errors.title?.type === "required" && (
              <p className="text-error text-left pt-2">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="form-control min-w-[350px]">
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
            {errors.category?.type === "required" && (
              <p className="text-error text-left pt-2">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Body */}
          <div className="form-control min-w-[350px]">
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
            {errors.body?.type === "required" && (
              <p className="text-error text-left pt-2">{errors.body.message}</p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-active btn-primary text-white uppercase min-w-[350px]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
