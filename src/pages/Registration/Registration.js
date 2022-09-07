import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/Loading";

const Registration = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  // Navigate
  const navigate = useNavigate();

  // Create User With Email and Password
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // Update Profile
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  // Handle Registration
  const handleRegistration = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "match",
        message: "Please confirm your password",
      });
    } else {
      await createUserWithEmailAndPassword(data.email, data.password);
      await updateProfile({ displayName: data.name });
      reset();
    }
  };
  // Navigate
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  // Loading
  if (loading || updating) {
    return <Loading />;
  }

  // Error
  if (error) {
    toast.error(error.message, {
      id: "registration error",
    });
  }
  if (updateError) {
    toast.error(updateError.message, {
      id: "update error",
    });
  }
  // console.log(errors);
  return (
    <div className="bg-gradient-to-r from-rose-50 to-teal-50 flex min-h-[calc(100vh-65px)] items-center justify-center">
      <div>
        <Toaster />
      </div>
      <div className="card w-96 bg-base-100 drop-shadow-lg">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-primary">Registration</h2>

          {/* Form Start */}
          <form
            onSubmit={handleSubmit(handleRegistration)}
            className=" flex flex-col gap-3 text-gray-800"
          >
            {/* Name */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1">Name</label>
              <input
                type="text"
                className={`input input-bordered w-full bg-secondary ${
                  errors.name && "input-error"
                }`}
                {...register("name", {
                  required: "Please enter your name",
                })}
              />
              {/* Error Message */}
              <p className="text-error text-left pt-2">{errors?.name?.message}</p>
            </div>

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
              <p className="text-error text-left pt-2">
                {errors?.email?.message}
              </p>
            </div>

            {/* Password*/}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1">Password</label>
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
              <p className="text-error text-left">
                {errors?.password?.message}
              </p>
            </div>

            {/* Confirm Password */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1">Confirm Password</label>
              <input
                type="password"
                className={`input input-bordered w-full bg-secondary ${
                  errors.confirmPassword && "input-error"
                }`}
                {...register("confirmPassword")}
              />
              {/* Error Message */}
              <p className="text-error text-left">
                {errors?.confirmPassword?.message}
              </p>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-active btn-primary text-white uppercase min-w-[350px]"
            >
              Register
            </button>
          </form>
          {/* Form End */}

          <p className="text-black">
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Log In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
