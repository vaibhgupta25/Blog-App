import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import parse from 'html-react-parser'
import { generateHTML } from '@tiptap/html'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { useSelector } from 'react-redux'

import MainLayout from '../../components/MainLayout'
import BreadCrumb from '../../components/BreadCrumb'
import { images } from '../../constants'
import SuggestedPosts from './Container/SuggestedPosts'
import CommentContainer from '../../components/comments/CommentContainer'
import { getAllPost, getPostDetails } from '../../services/index/post'
import { stables } from '../../constants/index'
import SuggestedPostSkeleton from './components/SuggestedPostSkeleton'
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton'


const ArticlePage = () => {

    const { slug } = useParams()
    const user = useSelector((state) => state.user.userInfo);
    const [BreadCrumbData, setBreadcrumbData] = useState([]);
    const [body, setBody] = useState(null)

    const { data, isLoading, isError } = useQuery({
        queryFn: () => {
            console.log(slug)
            return getPostDetails({ slug })
        },
        queryKey: ['post'],
    })

    useEffect(() => {
        setBreadcrumbData([
            { name: "Home", link: "/" },
            { name: "blog", link: "/blog" },
            { name: `${data !== undefined ? data.title : ""}`, link: `/blog/${data?.slug}` }
        ]);

        !isLoading && !isError && setBody(
            parse(
                generateHTML(data?.body, [
                    Document,
                    Paragraph,
                    Text,
                    Bold,
                    Italic
                ])
            )
        )
        console.log(data)
    }, [data, user])

    const {data:postsData} = useQuery({
        queryFn:()=>getAllPost(),
        queryKey:['posts']
    })

    return (
        <MainLayout>
            <section className='container mx-auto  px-5 py-5 mb-5'>
                <div className='flex flex-col lg:flex-row lg:px-5 lg:space-x-10 lg:w-5/4 '>
                    <article className='flex-1 max-w-5xl'>
                        {
                            isLoading
                                ? <ArticleDetailSkeleton />
                                : (
                                    <>
                                        <BreadCrumb
                                            data={BreadCrumbData}
                                        />
                                        <img
                                            src={data.photo ? stables + data.photo : images.post1}
                                            alt=""
                                            className='w-full object-cover rounded-xl'
                                        />
                                        <div className='flex gap-2 mt-4'>
                                            {data?.categories?.map(category => {
                                                return <Link
                                                    to={`/blog?category=${category.name}`}
                                                    className=' text-primary text-sm lg:text-base inline-block mt-6 mb-6 font-roboto tracking-wider uppercase'>
                                                    {`${category.name}`}
                                                </Link>
                                            })}
                                        </div>
                                        <h1 className='font-opensans font-bold text-xl'>{data?.title}</h1>
                                        <div className='mt-4 prose prose-sm sm-prose:base'>
                                            {body}
                                        </div>
                                        <CommentContainer
                                            loggedInUserId={user._id}
                                            comments={data?.comments}
                                            slug = {data?.slug}
                                        />
                                    </>
                                )
                        }
                    </article>
                    <div className='lg:w-1/3'>
                        {/* {console.log(postsData)} */}
                        {isLoading
                            ? <SuggestedPostSkeleton />
                            : <SuggestedPosts posts={postsData?.data} TagData={data.tags} />
                        }
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default ArticlePage
