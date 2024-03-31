import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { images } from '../constants/index'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../store/actions/userActions';


const navItemsInfo = [
    {
        name: 'Home',
        type: "link",
        href: "/"
    },
    {
        name: 'Articles',
        type: "link",
        href: "/Articles"
    },
    {
        name: 'Pages',
        type: "dropdown",
        item: [
            {
                title: "About us",
                href: "/about"
            }, {
                title: "Contact us",
                href: "/contact"
            }]
    },
    {
        name: 'Pricing',
        type: "link",
        href: "/pricing"
    },
    {
        name: 'Faq',
        type: "link",
        href: "/Faq"
    }
]

const NavItems = ({ item }) => {
    const [dropDown, setDropDown] = useState(false);
    const dropDownHandler = () => {
        setDropDown((curr) => {
            return !curr
        })
    }

    return <li className='relative group text-xl lg:text-base'>
        {
            item.type === "link" ? (
                <>
                    <Link to={item.href} className='py-2 px-4 '>{item.name}</Link>
                    <span className=' absolute top-0 right-0 tansition-all duration-500 group-hover:right-[90%] opacity-0 group-hover:opacity-100 font-bold text-blue-500'>/</span>
                </>
            ) : (
                <div className="flex flex-col items-center"  >
                    <button
                        className='px-4 flex items-center'
                        onClick={dropDownHandler}
                    >
                        {item.name}
                        {
                            dropDown ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />
                        }
                    </button>
                    <div
                        className={`lg:pt-4 lg:absolute lg:bottom-0 lg:left-0 lg:translate-y-full
                    ${dropDown ? "opacity-100 h-auto pt-2" : "opacity-0 h-0 pt-0"} w-max lg:transform transition-all ease-in
                    ${dropDown ? "duration-300" : "duration-0"} lg:duration-300`
                        }>
                        <ul
                            className='overflow-hidden rounded-lg flex flex-col items-center justify-center lg:shadow-md shadow-dark-soft shadow-inner border-gray-600 z-50 lg:bg-white '>
                            {
                                item.item.map((pages) => {
                                    return <li key={pages.title}
                                        className='px-4 py-2 w-full hover:bg-dark-soft lg:hover:bg-dark-hard hover:text-white '>
                                        <Link to={`${pages.href}`} >{pages.title}</Link>
                                    </li>
                                }
                                )
                            }
                        </ul>
                    </div>
                </div>
            )}
    </li>
}

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userState = useSelector(state => state.user)
    const [navIsVisible, setNavIsVisible] = useState(false);
    const [profileDropdown, setprofileDropdown] = useState(false)

    const logoutHandler = () => {
        dispatch(logout())
    }
    const navVisiblilityHandler = () => {
        setNavIsVisible((curr) => {
            return !curr;
        })
    }

    return (
        <section>
            <header className='container flex justify-between mx-auto px-5 py-4 items-center'>
                <div className='w-16 z-50'>
                    <Link to="/" className='text-dark-light font-bold md:text-xl rounded-full  px-3 py-3'>
                        Wp
                    </Link>
                </div>
                <div className='z-50 hover:cursor-pointer lg:hidden '>
                    {
                        navIsVisible
                            ? <AiOutlineClose className='w-6 h-6' onClick={navVisiblilityHandler} /> :
                            <AiOutlineMenu className='w-6 h-6' onClick={navVisiblilityHandler} />
                    }
                </div>
                <div
                    className={`gap-x-8 z-[49] ${navIsVisible ? "right-0" : "-right-full"}  lg:mt-0 flex flex-col w-full lg:w-auto justify-center lg:justify-end bg-dark-hard lg:flex-row fixed top-[56px] bottom-0 lg:static lg:bg-transparent text-white lg:text-black transition-all duration-500 items-center`}>
                    <ul className='flex flex-col lg:flex-row gap-x-2 font-semibold gap-y-4 lg:gap-y-0 items-center'>
                        {
                            navItemsInfo.map((item) => {
                                return <NavItems item={item} key={item.name} />
                            })
                        }
                    </ul>
                    {
                        userState.userInfo ?
                            (
                                <div className='flex flex-col lg:flex-row  font-semibold gap-y-4 lg:gap-y-0 items-center'>
                                    <div className='relative group'>
                                        <div className="flex flex-col items-center"  >
                                            <button
                                                className=' lg:border border-blue-500 rounded-full py-2 px-6 flex items-center text-xl lg:text-base lg:hover:bg-blue-500 lg:hover:text-white'
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setprofileDropdown(!profileDropdown)
                                                }}
                                            >
                                                Account
                                                {
                                                    profileDropdown ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />
                                                }
                                            </button>
                                            <div
                                                className={`lg:pt-4 lg:absolute lg:bottom-0 lg:left-0 lg:translate-y-full  
                                                ${profileDropdown ? "opacity-100 h-auto" : "opacity-0 h-0"} w-max lg:transform transition-all ease-in
                                                ${profileDropdown ? "duration-300" : "duration-0"} lg:duration-300 z-50 lg:bg-white bg-opacity-70`
                                                }>

                                                <div
                                                    className='overflow-hidden  rounded-lg flex flex-col items-center justify-center lg:shadow-md shadow-dark-soft shadow-inner border-gray-600'>
                                                    {userState?.userInfo?.admin && <button
                                                        className='px-4 py-2 w-full hover:bg-dark-soft lg:hover:bg-dark-hard  hover:text-white '
                                                        onClick={() => navigate('/admin')}
                                                    >
                                                        Admin 
                                                    </button>}
                                                    <button
                                                        className='px-4 py-2 w-full hover:bg-dark-soft lg:hover:bg-dark-hard  hover:text-white '
                                                        onClick={() => navigate('/profile')}
                                                    >
                                                        Profile
                                                    </button>
                                                    <button onClick={logoutHandler}
                                                        className='px-4 py-2 w-full hover:bg-dark-soft lg:hover:bg-dark-hard hover:text-white '>
                                                        Log out
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <button onClick={() => navigate('/login')} className='border-2 px-5 py-2 rounded-full border-blue-500 mt-5 lg:mt-0 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white tracking-wider transition-all ease-in-out duration-300'>
                                    Sign in
                                </button>
                            )
                    }
                </div>
            </header>
        </section>
    )
}
