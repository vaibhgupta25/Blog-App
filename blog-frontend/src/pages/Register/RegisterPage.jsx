import React, { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/index/user";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";

const InputFeild = ({
  id,
  label,
  type,
  placeholder,
  register,
  errors,
  watch,
}) => {
  const password = watch("password");
  return (
    <div className="flex flex-col mb-6">
      <label htmlFor={id} className="text-[#5a7184] font-semibold mb-3">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, {
          minLength: {
            value: label === "Password" || label === "Confirm password" ? 8 : 3,
            message: `${label} length must be at least ${
              label === "Password" || label === "Confirm password" ? 8 : 3
            } character`,
          },
          required: {
            value: true,
            message: `This feild is required`,
          },
          validate: (value) => {
            if (id === "confirmPassword" && value !== password) {
              return "Passwords do not match!";
            }
          },
          ...(id === "email" && {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }),
        })}
        className={`border ${
          errors[id] ? "border-red-500" : "border-[#c3cad9]"
        } px-5 py-4 placeholder:text-[#959EAD] focus:outline-none  text-dark-hard mb-3 rounded-lg`}
        placeholder={placeholder}
      />
      {/* {console.log(errors[label].message)} */}

      {errors[id] && (
        <p className="text-sm text-red-500">{errors[id].message}</p>
      )}
    </div>
  );
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (userState.userInfo) {
      console.log(userState);
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const submitHandler = (data) => {
    // e.preventDefault();
    const { name, email, password } = data;
    mutate({ name, email, password });
    console.log(data);
  };

  const Tags = [
    {
      type: "text",
      label: "Name",
      id: "name",
      placeholder: "Enter name",
    },
    {
      label: "Email",
      id: "email",
      type: "email",
      placeholder: "Enter email",
    },
    {
      label: "Password",
      id: "password",
      type: "password",
      placeholder: "Enter password",
    },
    {
      label: "Confirm password",
      type: "password",
      id: "confirmPassword",
      placeholder: "Confirm password",
    },
  ];
  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="container mx-auto w-full max-w-sm   ">
          <h1 className="text-2xl text-dark-hard  mb-8 text-center">Sign up</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            {Tags.map((feild, index) => {
              return (
                <InputFeild
                  key={index}
                  id={feild.id}
                  label={feild.label}
                  type={feild.type}
                  placeholder={feild.placeholder}
                  register={register}
                  errors={errors}
                  watch={watch}
                />
              );
            })}
            <Link
              to="/forget-password"
              className="text-sm text-blue-500 font-semibold block"
            >
              Forget Password?
            </Link>
            <button
              disabled={!isValid}
              type="submit"
              className={`text-center w-full my-6 py-3 bg-primary font-semibold text-white rounded-lg disabled:cursor-not-allowed disabled:bg-opacity-70`}
            >
              Submit
            </button>
            <p className="text-sm text-[#5a7184] font-semibold">
              You have an account?
              <Link to="/login" className="text-blue-500"> Login now</Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
