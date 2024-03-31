import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import MainLayout from "../../components/MainLayout";
import { getUserProfile, updateProfle } from "../../services/index/user";
import { userActions } from "../../store/reducers/userReducers";
import ProfilePicture from "../../components/ProfilePicture";

const InputFeild = ({
  id,
  label,
  type,
  placeholder,
  register,
  errors,
}) => {
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
            value: type === "password" ? 8 : 3,
            message: `${type} length must be at least ${type === "password" ? 8 : 3
              } character`,
          },
          required: {
            value: type !== 'password',
            message: `This feild is required`,
          },
          ...
          (id === "email" && {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }),
        })}
        className={`border ${errors[id] ? "border-red-500" : "border-[#c3cad9]"
          } px-5 py-4 placeholder:text-[#959EAD] focus:outline-none  text-dark-hard mb-3 rounded-lg`}
        placeholder={placeholder}
      />
      {
        errors[id] && (
          <p className="text-sm text-red-500">{errors[id].message}</p>
        )}
    </div>
  );
};

export default function ProfilePage() {

  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { data: profileData, isLoading: profileIsLoading, error: profileError } = useQuery({
    queryFn: async () => {
      const data = await getUserProfile({ token: userState.userInfo.token });
      return data;
    },
    // query key automatically updated the cached data 
    queryKey: ['profile']
  })


  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfle({
        token: userState.userInfo.token,
        userData: { name, email, password }
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data))
      queryClient.invalidateQueries(["profile"])
      toast.success("profile is updated!")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: {
      name: profileIsLoading ? "" : profileData.name,
      email: profileIsLoading ? "" : profileData.email
    },
    mode: "onChange",
  });


  const submitHandler = (data) => {
    const { email, name, password } = data;
    mutate({ name, email, password })
  };

  useEffect(() => {
    if (!userState.userInfo) {
      navigate('/');
    }
  }, [])

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
      label: "Password (optional)",
      id: "password",
      type: "password",
      placeholder: "Enter password",
    },
  ];


  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="container mx-auto w-full max-w-sm   ">
          <ProfilePicture avatar={profileData?.avatar} />
          <form onSubmit={handleSubmit(submitHandler)} className="mt-5">
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
              disabled={!isValid || profileIsLoading || updateProfileIsLoading}
              type="submit"
              className={`text-center tracking-wide w-full my-6 py-3 bg-primary font-semibold text-white rounded-lg disabled:cursor-not-allowed disabled:bg-opacity-70`}
            >
              Update
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
