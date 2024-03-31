import React from 'react'
import { images, stables } from '../constants/index'
import { BsCheckLg } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { VscUnverified, VscVerifiedFilled } from "react-icons/vsc";
import { Link } from 'react-router-dom'
import UPLOAD_FOLDER_BASE_URL from '../constants/stables';

export default function ArticleCard({ post, className }) {
    return (
        <section className={`rounded-xl overflow-hidden shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ${className}`}>
            <Link to={`/blog/${post.slug}`}>
                <img
                    src={
                        post.photo
                            ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
                            : images.post1
                    }
                    alt="Image not found"
                    className='w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60'
                />
            </Link>
            <div className='p-5'>
                <Link to={`/blog/${post.slug}`}>
                    <h1 className='text-xl sm:text-2xl lg:text-3xl font-roboto text-dark-soft font-bold tracking-wide'>
                        {post.title}
                    </h1>
                    <p className='text-dark-light font-opensans text-sm mt-3 sm:text-lg'>
                        {post.caption}
                    </p>
                </Link>
                <div className='flex w-full flex-nowrap justify-between items-center mt-6'>
                    <div className='flex gap-x-2 items-center md:gap-x-2.5'>
                        <img src={post.user.avatar ? UPLOAD_FOLDER_BASE_URL + post.user.avatar : images.user} alt="" className='w-9 h-9 md:w-10 md:h-10 rounded-full' />
                        <div className='flex flex-col'>
                            <h4 className='font-bold text-dark-soft text-sm sm:text-base'>{post.user.name}</h4>
                            <div className='flex items-center gap-x-2  '>
                                <span className={`${post.user.verified ? "text-[#36B37E]" : "text-red-500"} bg-opacity-30 p-0.5  rounded-full`}>
                                    {
                                        post.user.verified ?
                                            <VscVerifiedFilled /> :
                                            <VscUnverified />
                                    }
                                </span>
                                <span className='italic text-xs sm:text-sm text-dark-light'>
                                    {post.user.verified ? "Verified" : "Unverified"} writer
                                </span>
                            </div>
                        </div>
                    </div>
                    <span className='italic text-dark-light font-bold text-sm sm:text-base'>
                        {new Date(post.createdAt).toLocaleDateString("default", {
                            day: "numeric",
                            month: "short"
                        })}
                    </span>
                </div>
            </div>
        </section>
    )
}
