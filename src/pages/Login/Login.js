import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/Loading";
import useUserAuth from "../../context/UserAuthContext";
import GoogleButton from "react-google-button";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const { logIn, isLoading, setIsLoading, googleSignIn } = useUserAuth();

  // handle login
  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      await logIn(data.email, data.password);
      reset();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message, {
        id: "logIn error",
      });
    }
  };

  // handleGoogleSignIn
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await googleSignIn();
      
      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
      toast.error(err.message, {
        id: "googleLogIn error",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gradient-to-r from-rose-50 to-teal-50 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900 flex min-h-[calc(100vh-65px)] items-center justify-center">
      <div>
        <Toaster />
      </div>
      <div className="card dark:bg-slate-800 w-96 bg-base-100 drop-shadow-lg">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-primary">Login</h2>

          {/* Form Start */}
          <form
            onSubmit={handleSubmit(handleLogin)}
            className=" flex flex-col gap-3 text-gray-800"
          >
            {/* Email */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1 dark:text-white">Email</label>
              <input
                type="text"
                className={`input input-bordered w-full bg-secondary ${
                  errors.email && "input-error"
                }`}
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Please provide a valid email",
                  },
                })}
              />
              {/* Error Message */}
              <p className="pt-2 text-left text-error">
                {errors?.email?.message}
              </p>
            </div>

            {/* Password */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1 dark:text-white">Password</label>
              <input
                type="password"
                className={`input input-bordered w-full bg-secondary ${
                  errors.password && "input-error"
                }`}
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 8,
                    message: "Your pass must have 8 characters",
                  },
                  validate: {
                    whitespace: (v) =>
                      /^\S*$/.test(v) ||
                      "Your password must not contain whitespace",
                    oneUpperCase: (v) =>
                      /^(?=.*[A-Z]).*$/.test(v) ||
                      "Your password must have at least one uppercase character",
                    oneLowerCase: (v) =>
                      /^(?=.*[a-z]).*$/.test(v) ||
                      "Your password must have at least one lowercase character",
                    oneDigit: (v) =>
                      /^(?=.*[0-9]).*$/.test(v) ||
                      "Your password must have at least one digit",
                    oneSymbol: (v) =>
                      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(
                        v
                      ) ||
                      "Your password must have at least one special symbol",
                  },
                })}
              />
              {/* Error Message */}
              <p className="pt-2 text-left text-error">
                {errors?.password?.message}
              </p>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-active btn-primary text-white uppercase min-w-[350px]"
            >
              Login
            </button>
          </form>
          {/* Form End */}

          <p className="text-black dark:text-white">
            New to Microblogging?{" "}
            <Link to="/registration" className="text-primary">
              Create New Account
            </Link>
          </p>
          <p className="px-2 opacity-75 text-black dark:text-white">OR</p>
          <GoogleButton
            style={{width: "100%"}}
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
