import React from "react";

const Loading = () => {
  return (
    <div className="bg-gradient-to-r from-rose-50 to-teal-50 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900 flex min-h-[calc(100vh-65px)] items-center justify-center">
      <h1 className="text-center text-4xl font-bold text-primary">
        Loading...
      </h1>
    </div>
  );
};

export default Loading;
