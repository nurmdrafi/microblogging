import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useArticleContext from "../context/ArticleContext";
import useUserAuth from "../context/UserAuthContext";

const Comment = ({ article }) => {
  const { authUser } = useUserAuth();
  const { addComment } = useArticleContext();
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);

  const handleSubmitComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (text) {
        const comment = {
          id: article?.comments?.length + 1,
          user: authUser?.displayName,
          email: authUser?.email,
          text: text,
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
        {article.comments.map((comment) => (
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
                <div className="flex justify-start items-center">
                  <AiFillHeart className="text-black dark:text-white text-xl cursor-pointer" />{" "}
                  <span className="ml-1">0</span>
                </div>
                {/* edit */}

                {/* delete */}
                {authUser?.email === comment?.email && (
                  <div className="inline-block">
                    <span className="cursor-pointer mr-3">Edit</span>
                    <span className="cursor-pointer">Delete</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
