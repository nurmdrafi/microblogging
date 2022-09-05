import React, { useState, useContext } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { GlobalContext } from "../context/GlobalState";

const Article = ({ article }) => {
  const [comment, setComment] = useState("");
  const { updateArticle, articles } = useContext(GlobalContext);

  const handleSubmitComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const comments = [...article.comments, comment]
      const updatedArticle ={
        ...article,
        comments
      };
      updateArticle(updatedArticle)
      setComment("");
    }
  };
  console.log(articles);

  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto my-10">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-primary font-extrabold uppercase">
            {article.title}
          </h2>
          <span>{article.category}</span>
        </div>
        <h2>{article.userName}</h2>
        <span>Last Updated: {article.time}</span>
        <p className="text-black">{article.body}</p>
        {/* upvote & downvote */}
        <div className="flex justify-end items-center text-black ">
          <span className="flex flex-col items-center justify-center cursor-pointer rounded-full p-1 w-12 h-12 border shadow-md mr-1">
            {" "}
            <IoIosArrowUp className="text-2xl" /> {article.upVote}
          </span>
          <span className="flex flex-col items-center justify-center cursor-pointer rounded-full p-1 w-12 h-12 border shadow-md">
            {" "}
            <IoIosArrowDown className="text-2xl" />
            {article.downVote}
          </span>
        </div>
        <input
          className="input bg-secondary text-black"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleSubmitComment}
          placeholder="Write a public comment..."
        />
      </div>
    </div>
  );
};

export default Article;
