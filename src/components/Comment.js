import React, { useState  } from "react";
import useArticleContext from "../context/ArticleContext";
import useUserAuth from "../context/UserAuthContext";

const Comment = ({ article }) => {
  const { authUser } = useUserAuth();
  const { addComment } = useArticleContext();
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);

  console.log(authUser);
  const handleSubmitComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (text) {
        const comment = {
          id: article?.comments?.length + 1,
          user: authUser?.displayName,
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
            <kbd className="w-10 animate-pulse kbd kbd-xs bg-secondary dark:bg-slate-600 text-black dark:text-white rounded-none">
              Enter
            </kbd>{" "}
          </span>
        )}
      </div>
      {/* Comments */}
      <div className="mt-2">
        {article.comments.map((comment) => (
          <div key={comment?.id} className="flex">
            {/* avatar */}
            <span className="w-12 h-12 bg-primary text-white text-2xl font-bold flex justify-center items-center uppercase mr-2">
              {comment?.user[0]}
            </span>
            {/* comment */}
            <p className="p-3 mb-2 bg-secondary text-gray-600 break-words rounded-sm">
              {" "}
              <span className="text-primary capitalize">
                {comment?.user}
              </span>{" "}
              <br />
              {comment?.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
