import React, { useState, useContext } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { GlobalContext } from "../context/GlobalState";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const Article = ({ article }) => {
  const [user] = useAuthState(auth);
  const [text, setText] = useState("");
  const { updateArticle } = useContext(GlobalContext);
  const [focus, setFocus] = useState(false);
  const upVoteCurrentUser = article.upVoteUsers.includes(user?.email);
  const downVoteCurrentUser = article.downVoteUsers.includes(user?.email);

  // Up Vote Functionality
  const [statusUpVote, setStatusUpVote] = useState(false);
  const upVoteUsers = [...article.upVoteUsers, user?.email];
  const excludeEmailUpVote = article.upVoteUsers.filter(
    (email) => email !== user?.email
  );

  // Down Vote Functionality
  const [statusDownVote, setStatusDownVote] = useState(false);
  const downVoteUsers = [...article.downVoteUsers, user?.email];
  const excludeEmailDownVote = article.downVoteUsers.filter(
    (email) => email !== user?.email
  );

  const handleUpVote = () => {
    if (!upVoteCurrentUser && !statusUpVote) {
      setStatusUpVote(true);
      const updatedVoteCount = {
        ...article,
        upVote: article?.upVote + 1,
        upVoteUsers,
      };
      updateArticle(updatedVoteCount);
    } else if (upVoteCurrentUser && statusUpVote) {
      setStatusUpVote(false);

      const updatedVoteCount = {
        ...article,
        upVote: article?.upVote - 1,
        upVoteUsers: excludeEmailUpVote,
      };
      updateArticle(updatedVoteCount);
    }
  };

  const handleDownVote = () => {
    if (!downVoteCurrentUser && !statusDownVote) {
      setStatusDownVote(true);
      const updatedVoteCount = {
        ...article,
        downVote: article?.downVote + 1,
        downVoteUsers,
      };
      updateArticle(updatedVoteCount);
    } else if (downVoteCurrentUser && statusDownVote) {
      setStatusDownVote(false);

      const updatedVoteCount = {
        ...article,
        downVote: article?.downVote - 1,
        downVoteUsers: excludeEmailDownVote,
      };
      updateArticle(updatedVoteCount);
    }
  };

  const handleSubmitComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (text) {
        const comment = {
          id: article.comments.length + 1,
          user: user?.displayName,
          text: text,
        };

        const comments = [...article.comments, comment];
        const updatedArticle = {
          ...article,
          comments,
        };
        updateArticle(updatedArticle);
        setText("");
      }
    }
  };
  // console.log(articles)
  return (
    <div className="card container lg:px-10 bg-base-100 mx-auto my-10 shadow-md">
      <div className="card-body">
        <div className="flex justify-between items-center">
          {/* Title */}
          <h2 className="card-title text-primary text-2xl font-extrabold uppercase break-words">
            {article.title}
          </h2>
          {/* Category */}
          <span className="badge badge-secondary capitalize">
            {article.category}
          </span>
        </div>
        {/* Author */}
        <h2 className="capitalize text-black font-bold text-lg">
          {article.userName}
        </h2>
        {/* Body */}
        <p className="text-black capitalize">{article.body}</p>
        <span>Last Updated: {article.time}</span>

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
        {/* Write Comment */}
        <input
          className="input bg-secondary text-black"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleSubmitComment}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="Write a public comment..."
        />
        {focus && (
          <span className="ml-auto">
            Press{" "}
            <kbd className="w-10 animate-pulse kbd kbd-xs bg-secondary rounded-none">
              Enter
            </kbd>{" "}
          </span>
        )}
        {/* Comments */}
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
                <span className="text-primary capitalize">
                  {comment.user}
                </span>{" "}
                <br />
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
