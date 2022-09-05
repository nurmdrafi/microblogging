import React, { useState, useContext } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { GlobalContext } from "../context/GlobalState";

const Article = ({ article }) => {
  const [text, setText] = useState("");
  const { updateArticle } = useContext(GlobalContext);

  const handleUpVote = () => {};
  const handleDownVote = () => {};

  const handleSubmitComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const comment = {id: article.comments.length + 1, user: "Rafe", text: text}
      const comments = [...article.comments, comment];
      const updatedArticle = {
        ...article,
        comments,
      };
      updateArticle(updatedArticle);
      setText("");
    }
  };
  console.log(article);

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
        <div className="flex justify-start items-center text-black my-2">
          <div className="flex items-center">
            <AiFillLike
              className="text-2xl cursor-pointer"
              onClick={handleUpVote}
            />{" "}
            <span className="ml-1">{article.upVote}</span>
          </div>
          <div className="flex items-center">
            <AiFillDislike
              className="text-2xl cursor-pointer ml-6"
              onClick={handleDownVote}
            />
            <span className="ml-1">{article.downVote}</span>
          </div>
        </div>
        <input
          className="input bg-secondary text-black"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleSubmitComment}
          placeholder="Write a public comment..."
        />
        {/* comments */}
        <div>
          {article.comments.map((comment) => (
            <div key={comment.id} className="flex">
              {/* avatar */}
              <span className="w-12 h-12 bg-primary text-white text-3xl flex justify-center items-center uppercase mr-2">
                {comment.user[0]}
              </span>
              {/* comment */}
              <p className="p-3 mb-2 bg-secondary text-gray-600 break-words rounded-sm">
                {" "}
                <span className="text-primary capitalize">{comment.user}</span> <br />
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Article;
