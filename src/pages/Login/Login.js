import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  // Navigate
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  // Sign in with email and password
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  // handle login
  const handleLogin = async (data) => {
    // Check White Space
    if (!/^\S*$/.test(data.password)) {
      setError("password", {
        type: "whitespace",
        message: "Your password must not contain Whitespaces",
      });
    }
    // Check at least One Uppercase
    else if (!/^(?=.*[A-Z]).*$/.test(data.password)) {
      setError("password", {
        type: "uppercase",
        message: "Your password must have at least one Uppercase Character",
      });
    }
    // Check at least One Lowercase
    else if (!/^(?=.*[a-z]).*$/.test(data.password)) {
      setError("password", {
        type: "lowercase",
        message: "Your password must have at least one Lowercase Character",
      });
    }
    // Check at least one digit
    else if (!/^(?=.*[0-9]).*$/.test(data.password)) {
      setError("password", {
        type: "digit",
        message: "Your password must contain at least one Digit",
      });
    }
    // Check at least one symbol
    else if (
      !/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(data.password)
    ) {
      setError("password", {
        type: "symbol",
        message: "Your password must contain at least one Special Symbol",
      });
    }
    // Check Minimum 8 characters
    else if (!/^.{10,16}$/.test(data.password)) {
      setError("password", {
        type: "length",
        message: "Your password must be 10-16 Characters Long",
      });
    } else {
      await signInWithEmailAndPassword(data.email, data.password);
      //   console.log(data);
      reset();
    }
  };

  // Navigate
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, user]);

  // Loading
  if (loading) {
    return <p className="text-center text-4xl font-bold">Loading...</p>;
  }

  // Error
  if (error) {
    toast.error(error.message, {
      id: "signin error",
    });
  }
  return (
    <div className="flex justify-center items-center">
      <div>
        <Toaster />
      </div>
      <div className="my-8 flex min-h-[calc(100vh-200px)] items-center justify-center">
        <div className="card w-96 bg-base-100 drop-shadow-lg">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-primary">Login</h2>

            {/* Form Start */}
            <form
              onSubmit={handleSubmit(handleLogin)}
              className=" flex flex-col gap-3 text-gray-800"
            >
              {/* Email */}
              <div className="form-control min-w-[350px]">
                <label className="text-left pb-1">Email</label>
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
                {errors.email?.type === "required" && (
                  <p className="pt-2 text-left text-error">
                    {errors.email.message}
                  </p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="text-danger py-2 text-left text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-control min-w-[350px]">
                <label className="text-left pb-1">Password</label>
                <input
                  type="text"
                  className={`input input-bordered w-full bg-secondary ${
                    errors.password && "input-error"
                  }`}
                  {...register("password", {
                    required: "Please enter your password",
                  })}
                />
                {/* Error Message */}
                {errors.password?.type === "required" && (
                  <p className="pt-2 text-left text-error">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "whitespace" && (
                  <p className="text-danger py-2 text-left text-red-500">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "uppercase" && (
                  <p className="py-2 text-left text-error">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "lowercase" && (
                  <p className="py-2 text-left text-error">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "digit" && (
                  <p className="py-2 text-left text-error">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "symbol" && (
                  <p className="py-2 text-left text-error">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "length" && (
                  <p className="py-2 text-left text-error">
                    {errors.password.message}
                  </p>
                )}
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

            <p className="text-black">
              New to Microblogging?{" "}
              <Link to="/registration" className="text-primary">
                Create New Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
