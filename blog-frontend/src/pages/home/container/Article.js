import React from 'react'
import ArticleCard from '../../../components/ArticleCard'
import { FaArrowRightLong } from "react-icons/fa6";
import { useQuery } from '@tanstack/react-query'
import { getAllPost } from '../../../services/index/post'
import ArticleCardSkeleton from '../../../components/ArticleCardSkeleton';

export default function Article() {
    const { data, isLoading, isError } = useQuery({
        queryFn: () => {
            return getAllPost()
        },
        queryKey: ['posts']
    })
    return (
        <section className='container mx-auto px-5 lg:py-2 py-10  justify-between'>
            <div className='flex flex-wrap md:gap-x-5 gap-y-5 pb-10'>
                {(!isLoading && !isError && Array.isArray(data.data))
                    ? data.data.map(post => {
                        return <ArticleCard
                            key={post._id}
                            post={post}
                            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33%-20px)]"
                        />
                    })
                    : (
                        [...Array(3)].map((item, idx) => {
                            return <ArticleCardSkeleton
                                key = {idx}
                                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33%-20px)]"
                            />
                        })
                    )
                }
            </div>
            <div className='flex justify-center items-center '>
                <button className='px-8 flex items-center gap-x-2 text-blue-500 font-bold border-2 border-blue-500 bg-white py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300'>
                    <span>More Articles</span>
                    <FaArrowRightLong />
                </button>
            </div>
        </section>
    )
}
