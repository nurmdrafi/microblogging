import React, { useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import useUserAuth from "../context/UserAuthContext";
import useArticleContext from "../context/ArticleContext";
import Comment from "./Comment";

const Article = ({ article }) => {
  const { authUser } = useUserAuth();
  const { upVote, downVote, updateToggleVote } = useArticleContext();

  // Up Vote Functionality
  const upVoteCurrentUser = article.upVoteUsers.includes(authUser?.email);
  const [statusUpVote, setStatusUpVote] = useState(false);
  const upVoteUsers = [...article.upVoteUsers, authUser?.email];
  const excludeEmailUpVote = article.upVoteUsers.filter(
    (email) => email !== authUser?.email
  );

  // Down Vote Functionality
  const downVoteCurrentUser = article.downVoteUsers.includes(authUser?.email);
  const [statusDownVote, setStatusDownVote] = useState(false);
  const downVoteUsers = [...article.downVoteUsers, authUser?.email];
  const excludeEmailDownVote = article.downVoteUsers.filter(
    (email) => email !== authUser?.email
  );

  const handleUpVote = () => {
    if (!upVoteCurrentUser && !statusUpVote) {
      const updatedArticle = {
        ...article,
        upVote: article?.upVote + 1,
        upVoteUsers,
      };
      upVote(article.id, updatedArticle);
      setStatusUpVote(true);
    } else if (upVoteCurrentUser && statusUpVote) {
      const updatedArticle = {
        ...article,
        upVote: article?.upVote - 1,
        upVoteUsers: excludeEmailUpVote,
      };
      upVote(article.id, updatedArticle);
      setStatusUpVote(false);
    }
    if (downVoteCurrentUser && statusDownVote && !statusUpVote) {
      const updatedArticle = {
        ...article,
        downVote: article?.downVote - 1,
        downVoteUsers: excludeEmailDownVote,
        upVote: article?.upVote + 1,
        upVoteUsers,
      };
      updateToggleVote(article.id, updatedArticle);
      setStatusDownVote(false);
      setStatusUpVote(true);
    }
  };

  const handleDownVote = () => {
    if (!downVoteCurrentUser && !statusDownVote) {
      const updatedArticle = {
        ...article,
        downVote: article?.downVote + 1,
        downVoteUsers,
      };
      downVote(article.id, updatedArticle);
      setStatusDownVote(true);
    } else if (downVoteCurrentUser && statusDownVote) {
      const updatedArticle = {
        ...article,
        downVote: article?.downVote - 1,
        downVoteUsers: excludeEmailDownVote,
      };
      downVote(article.id, updatedArticle);
      setStatusDownVote(false);
    }
    if (upVoteCurrentUser && statusUpVote && !statusDownVote) {
      const updatedArticle = {
        ...article,
        upVote: article?.upVote - 1,
        upVoteUsers: excludeEmailUpVote,
        downVote: article?.downVote + 1,
        downVoteUsers,
      };
      updateToggleVote(article.id, updatedArticle);
      setStatusUpVote(false);
      setStatusDownVote(true);
    }
  };

  return (
    <div className="card mx-10 mb-10 bg-base-100 shadow-md dark:bg-slate-800 dark:shadow-md dark:shadow-slate-700">
      {/* Settings */}
      <div className="card-body flex-grow-0">
        <div className="flex justify-end">
          <BsThreeDots />
        </div>
        {/* Title */}
        <p className="text-primary text-2xl font-extrabold uppercase break-words">
          {article.title}
        </p>

        {/* Author */}
        <h2 className="capitalize text-black dark:text-white font-bold text-lg">
          {article.userName}
        </h2>
        {/* Body */}
        <p className="text-black dark:text-white capitalize flex-grow-0">
          {article.body}
        </p>
        <span>Last Updated: {article.time}</span>

        {/* upvote & downvote */}
        <div className="flex justify-start items-center text-black dark:text-white my-2">
          <div className="flex items-center">
            <AiFillLike
              className={`text-2xl cursor-pointer ${
                upVoteCurrentUser && "text-primary"
              }`}
              onClick={handleUpVote}
            />{" "}
            <span className="ml-1">{article.upVote}</span>
          </div>
          <div className="flex items-center">
            <AiFillDislike
              className={`text-2xl cursor-pointer ml-6 ${
                downVoteCurrentUser && "text-primary"
              }`}
              onClick={handleDownVote}
            />
            <span className="ml-1">{article.downVote}</span>
          </div>
        </div>
        <Comment article={article} />
      </div>
    </div>
  );
};

export default Article;
