import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import useArticleContext from "../context/ArticleContext";
import useUserAuth from "../context/UserAuthContext";

const Comment = ({ article }) => {
  const { authUser } = useUserAuth();
  const { addComment, loveVote, deleteComment } =
    useArticleContext();
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);
  const id = uuidv4();
  const commentList = article?.comments?.sort((a, b) => {
    return new Date(a.time) - new Date(b.time);
  });

  // handle submit comment
  const handleSubmitComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let now = new Date();

      if (text) {
        const comment = {
          id: id,
          user: authUser?.displayName,
          email: authUser?.email,
          text: text,
          loveCount: 0,
          loveVoters: [],
          time: now.toUTCString(),
        };

        const comments = [...article.comments, comment];
        const updatedArticleWithComments = {
          ...article,
          comments,
        };
        addComment(article?.id, updatedArticleWithComments);
        setText("");
      }
    }
  };

  // handle love vote
  const handleLoveVote = (id) => {
    // returns true/false
    const currentVoter = article.comments
      .find((comment) => comment.id === id)
      .loveVoters.includes(authUser?.email);

    // prev voters + current voter
    const loveVoteUsers = [
      ...article.comments.find((comment) => comment.id === id).loveVoters,
      authUser?.email,
    ];

    // after unlike remove current voter from list
    const excludeEmailLoveVote = article.comments
      .find((comment) => comment.id === id)
      .loveVoters.filter((email) => email !== authUser?.email);

    if (!currentVoter) {
      // comment with vote
      const commentWithLoveVote = {
        ...article.comments.find((comment) => comment.id === id),
        loveCount:
          article.comments.find((comment) => comment.id === id).loveCount + 1,
        loveVoters: loveVoteUsers,
      };

      const excludeComments = article.comments.filter(
        (comment) => comment.id !== id
      );
      const updatedArticleWithLoveVote = {
        ...article,
        comments: [...excludeComments, commentWithLoveVote],
      };
      loveVote(article.id, updatedArticleWithLoveVote);
    } else if (currentVoter) {
      console.log("clicked2");
      const commentWithLoveVote = {
        ...article.comments.find((comment) => comment.id === id),
        loveCount:
          article.comments.find((comment) => comment.id === id).loveCount - 1,
        loveVoters: excludeEmailLoveVote,
      };
      const excludeComments = article.comments.filter(
        (comment) => comment.id !== id
      );
      const updatedArticleWithLoveVote = {
        ...article,
        comments: [...excludeComments, commentWithLoveVote],
      };
      loveVote(article.id, updatedArticleWithLoveVote);
    }
  };

  // handle delete comment
  const handleDeleteComment = (comment_id) => {
    const excludeComment = article.comments.filter(
      (comment) => comment.id !== comment_id
    );
    const updatedArticle = { ...article, comments: excludeComment };
    deleteComment(article.id, updatedArticle);
  };

  return (
    <div>
      <div className="flex flex-col">
        {/* Write Comments */}
        <input
          className="input bg-secondary text-black"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleSubmitComment}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="Write a comment..."
        />
        {focus && (
          <span className="ml-auto">
            Press{" "}
            <kbd className="w-10 animate-pulse kbd kbd-xs bg-secondary dark:bg-slate-600 text-black dark:text-white rounded-none">
              Enter
            </kbd>{" "}
          </span>
        )}
      </div>
      {/* Comments */}
      <div className="mt-2">
        {commentList.map((comment) => (
          <div key={comment?.id} className="grid grid-cols-8">
            {/* avatar */}

            <span className=" bg-primary text-white text-xl md:text-2xl font-bold flex justify-center items-center uppercase mr-2 h-12">
              {comment?.user[0]}
            </span>

            {/* comment */}
            <div className="col-span-7 mb-3">
              <p className="p-3 bg-secondary dark:bg-slate-700 text-gray-600 dark:text-white break-words rounded-sm">
                {" "}
                <span className="text-primary capitalize">
                  {comment?.user}
                </span>{" "}
                <br />
                {comment?.text}
              </p>
              {/* love, edit, delete */}
              <div className="flex justify-start items-center gap-3 text-black dark:text-white">
                {/* love */}
                <div className="flex justify-start items-center ">
                  <AiFillHeart
                    className={`${
                      comment.loveVoters.includes(authUser?.email) &&
                      "text-red-600"
                    } text-black text-xl cursor-pointer dark:text-white`}
                    onClick={() => handleLoveVote(comment?.id)}
                  />{" "}
                  <span className="ml-1">{comment?.loveCount}</span>
                </div>

                {/* ---PENDING--- */}
                {authUser?.email === comment?.email && (
                  <div className="inline-block">
                    {/* edit */}
                    <span className="cursor-pointer mr-3">Edit</span>
                    {/* delete */}
                    <span
                      className="cursor-pointer"
                      onClick={() => handleDeleteComment(comment?.id)}
                    >
                      Delete
                    </span>
                  </div>
                )}
                {/* ---PENDING--- */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
