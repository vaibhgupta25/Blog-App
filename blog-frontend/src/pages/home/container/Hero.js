import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { images } from '../../../constants'

const items = ["Design", "User Experience", "User Interface"];
const Popular = ({ item }) => (
  <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
    {item}
  </li>
)

export default function Hero() {
  return (
    <section className='flex container mx-auto flex-col lg:flex-row px-5 py-5'>
      <div className='lg:w-1/2 mt-10'>
        <h1 className='font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl md:max-w-[540px] md:mx-auto lg:mx-0 lg:text-left'>
          Read the most interesting articles
        </h1>
        <p className='text-dark-ligh mt-4 text-center md:text-xl xl:text-xl lg:text-base lg:text-left'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aperiam facere dolorum laborum velit similique a reprehenderit, unde reiciendis harum!</p>
        <div className='md:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] flex flex-col md:flex-row md:justify-between md:items-center gap-y-2.5 relative mt-10 lg:mt-6 xl:mt-10'>
          <div className='flex items-center w-full md:shadow-none shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
            <AiOutlineSearch className=' w-6 h-6 text-[#959EAD]  ml-3 ' />
            <input type="text" className='placeholder:font-bold font-semibold text-dark-soft placeholder-text-[#959EAD] px-2 w-full py-3 md:py-4 focus:outline-none ' placeholder='Search Article' />
          </div>
          <button className='w-full bg-primary md:mr-2 text-white font-semibold rounded-lg px-5 py-3  md:w-fit md:py-2'>Search</button>
        </div>
        <div className='flex mt-4 flex-col md:flex-row flex-nowrap md:gap-x-4 lg:mt-7 lg:text-sm xl:text-base items-start'>
          <span className='text-dark-light font-semibold italic md:mt-4'>Popular Tags:</span>
          <ul className='flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3'>
            {items.map((item, index) => (
              <Popular item={item} key={index} />
            ))}
          </ul>
        </div>
      </div>
      <div className='lg:1/2 hidden lg:block'>
        <img src={images.Hero} alt="" className='w-full' />
      </div>
    </section>
  )
}
