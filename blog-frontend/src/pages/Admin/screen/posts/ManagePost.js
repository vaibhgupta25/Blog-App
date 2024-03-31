import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FaSearch } from "react-icons/fa";
import { images, stables } from '../../../../constants/index'
import { getAllPost } from '../../../../services/index/post';
import Pagination from '../../../../components/Pagination';

const ManagePost = () => {
  const [search, setSearch] = useState("");
  const [currPage, setCurrPage] = useState(1);
  

  const { refetch, data: postData, isLoading, isFetching } = useQuery({
    queryFn: () => {
      // console.log('object')
      return getAllPost(search);
    },
    queryKey: ['posts'],
  });

  useEffect(()=>{
    refetch(search, currPage);
    console.log(currPage);
  }, [refetch, currPage])


  const searchHandler = (e) => {
    e.preventDefault();
    // console.log(search)
    const { value } = e.target;
    setSearch(value)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('s')
    refetch(search)
  }

  return (
    <div className=''>
      <h1 className='px-4 text-2xl font-semibold'>Manage Posts</h1>
      <div className="w-full  px-4 mx-auto">
        <div className="py-4">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">
              Posts
            </h2>
            <div className="text-end pl-4">
              <form
                onSubmit={submitHandler}
                className="flex  justify-center w-full max-w-sm  md:flex-row  space-x-3 md:space-y-0"
              >
                <div className=" relative ">
                  <input
                    onChange={searchHandler}
                    type="text"
                    value={search}
                    id="&quot;form-subscribe-Filter"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="title..."
                  />
                </div>
                <button
                  className="px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="Submit"
                >
                  <span className='lg:hidden '><FaSearch /></span>
                  <span className='hidden lg:block '>Search</span>
                </button>
              </form>
            </div>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Title
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Category
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Created at
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Tags
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {console.log(postData)} */}
                  {
                    postData?.data.map((item) => {
                      return <tr key={item.title}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <a href="#" className="relative block">
                                <img alt="profil" src={item.photo ? stables + item.photo : images.post1} className="mx-auto object-cover rounded-full h-10 w-10 " />
                              </a>
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {item.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.category ? item.category : "Uncategorized"}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {new Date(item.updatedAt).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          {item.tags.length > 0 ?
                            item.tags.map((tag, index) => {
                              <span>{`${tag(index !== item.length - 1) ? ", " : ""}`}</span>
                            })
                            : (<>No Tags</>)}
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                        </td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
              {
                !isLoading && <Pagination  onPageChange={(page) => setCurrPage(page)} currPage = {currPage} totalPageCount={JSON.parse(postData?.headers?.['x-totalpagecount'])}/>
              }
              {
                console.log(postData)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagePost
