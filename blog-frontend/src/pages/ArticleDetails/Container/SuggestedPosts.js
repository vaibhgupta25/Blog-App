import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllPost } from '../../../services/index/post'
import { images, stables } from '../../../constants'

const SuggestedPosts = ({ posts = [], TagData = [] }) => {
    console.log(posts)
    return (
        <div className='mt-8 mb-10  lg:mt-0 py-5 px-4 pb-10 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]' >
            <h1 className='font-bold  text-lg'>
                Latest Article
            </h1>
            <div className='grid grid-cols-2 flex-col space-y-4 mt-5'>
                {posts.slice(0, 5).map((post, i) => (
                    <div key={i} className='flex space-x-4 w-full items-center col-span-2 md:col-span-1 lg:col-span-2'>
                        <img src={post?.photo ? stables + post?.photo : images.post1} alt="" className=' aspect-square rounded-lg w-1/5' />
                        <div className='w-full overflow-hidden font-roboto'>
                            <h1 className='font-bold whitespace-nowrap overflow-hidden text-ellipsis'>{post.title}</h1>
                            <span className='text-dark-light font-opensans italic text-sm'>
                                {new Date(post.createdAt).toLocaleDateString("en-Us", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='py-4'>
                <h2 className='font-semibold py-2 text-base lg:text:lg'>Tags</h2>
                <ul className='flex gap-y-3 gap-x-3 flex-wrap'>

                    {TagData.length !== 0 ? TagData.map((tag) => (
                        <li className='bg-primary text-center text-white px-3 py-1.5 rounded-lg text-sm lg:text-base tracking-wide' key={tag}>
                            <a href="/">{tag}</a>
                        </li>
                    )) : <p className='text-slate-500 text-sm'>Tags are not available!</p>
                    }
                </ul>
            </div>
        </div>
    )
}

export default SuggestedPosts
