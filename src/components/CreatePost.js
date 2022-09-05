import React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCreatePost = (data) => {
    const id = uuidv4();
    localStorage.setItem(`${id}`, JSON.stringify([data.title, data.article]));
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

          {/* Article */}
          <div className="form-control min-w-[350px]">
            <textarea
              type="text"
              placeholder="Your article"
              className={`textarea textarea-bordered w-full text-black bg-secondary ${
                errors.post && "textarea-error"
              }`}
              {...register("article", {
                required: "Please write your article",
              })}
            />
            {/* Error Message */}
            {errors.article?.type === "required" && (
              <p className="text-error text-left pt-2">{errors.article.message}</p>
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
