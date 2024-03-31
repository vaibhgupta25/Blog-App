import React, { useEffect } from 'react'
import MainLayout from '../../components/MainLayout'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../store/reducers/userReducers'
import toast from 'react-hot-toast'
import { login } from '../../services/index/user'

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (user.userInfo) {
            navigate('/')
        }
    }, [user.userInfo, navigate])

    const { mutate } = useMutation({
        mutationFn: ({ email, password }) => {
            console.log(email)
            return login({ email, password });
        },
        onSuccess: (data) => {
            navigate('/');
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem('account', JSON.stringify(data));
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })



    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onChange"
    })

    const submitHandler = (data) => {
        const { email, password } = data;
        mutate({ email, password });

    }
    return (
        <MainLayout>
            <div className='container px-5 py-10 mx-auto'>
                <div className='w-full  max-w-sm mx-auto'>
                    <h1 className='text-dark-hard text-2xl w-full font-roboto tracking-wide font-semibold text-center mb-10'>Sign In</h1>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className='flex flex-col mb-6'>
                            <label htmlFor="email" className='text-[#5a7184] font-semibold mb-3'>Email</label>
                            <input
                                type="email"
                                className={`px-5 py-3 rounded-lg border  placeholder:text-[#959EAD] focus:outline-none ${errors && errors.email ? "border-red-500" : ""}`}
                                placeholder='Enter email'
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: "Please enter valid email!"
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address!",
                                    },
                                })}
                            />
                            {errors && errors.email && <p className='mt-3 text-sm text-red-500'>{errors.email.message}</p>}
                        </div>
                        <div className='flex flex-col mb-6'>
                            <label htmlFor="password" className='text-[#5a7184] font-semibold mb-3'>Password</label>
                            <input
                                type="password"
                                className={`px-5 py-3 rounded-lg border placeholder:text-[#959EAD] focus:outline-none ${errors && errors.password ? "border-red-500" : ""}`}
                                placeholder='Enter password'
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: "Password is required !"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Length must be atleast 8 charachters"
                                    }
                                })}
                            />
                            {errors && errors.password && <p className='text-sm mt-3 text-red-500'>{errors.password.message}</p>}
                        </div>
                        <p className='text-sm text-blue-500 font-semibold mb-6'>
                            Forgot password?
                        </p>
                        <button
                            type="submit"
                            disabled={!isValid}
                            className='w-full mb-6 bg-blue-500 text-white py-3 tracking-wide rounded-lg disabled:cursor-not-allowed disabled:opacity-70'>Login</button>
                        <div className='flex text-sm'>
                            <p className='text-[#959EAD]'>You don't have an account? </p>
                            <Link to="/register" className='text-blue-500 tracking-wide font-semibold'>&nbsp; Signup now</Link>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    )
}

export default LoginPage
