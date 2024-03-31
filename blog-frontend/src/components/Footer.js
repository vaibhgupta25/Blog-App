import React from 'react'
import { IoMdHeart } from "react-icons/io";
import { MdCopyright } from "react-icons/md";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaTelegram } from "react-icons/fa";

const tags = [
  {
    name: "Product",
    items:
      [
        "Landing Page",
        "Features",
        "Documentation",
        "Referral Program",
        "Pricing",
      ]
  },
  {
    name: "Services",
    items:
      [
        "Documentations",
        "Design",
        "Themes",
        "Illustrations",
        "UI kit",
      ]
  },
  {
    name: "Company",
    items:
      [
        "About",
        "Terms",
        "Privacy Policy",
        "Careers",
      ]
  },
  {
    name: "More",
    items:
      [
        "Documentation",
        "License",
        "Change Log",
      ]
  },
]

const TagCardItems = ({ item, index }) => {
  return (
    <li className='py-0.5 text-base mt-1'>
      <a href="/">{item}</a>
    </li>
  )
  console.log(item)
}
const TagCard = ({ tag }) => {
  return (
    <div className='col-span-6 lg:col-span-3 ' >
      <b className='font-opensans text-dark-light text-base md:text-lg' >{tag.name}</b>
      <ul className='text-[#959EAD] mt-1.5 md:mt-2.5' >
        {
          tag.items.map((item, index) => (
              <TagCardItems item={item} key={index} index={index} />
            )
        )}
      </ul>
    </div>
  );
};
export default function Footer() {
  return (
    <footer className='px-5 bg-dark-hard py-20 pb-10 '>
      <div className='container mx-auto'>
        <div className='md:grid grid-cols-12 '>
          <div className='grid grid-cols-12 gap-y-5 md:gap-8 gap-x-2 md:gap-x-3.5 col-span-6 '>
            {tags.map((tag, i) => (
              <TagCard tag={tag} key={i} />
            ))}
          </div>
          <div className='h-full flex flex-col my-10 md:my-0 col-span-6 order-first md:justify-start justify-center md:items-start items-center gap-y-3 md:gap-y-2' >
            <h1 className='font-bold text-white font-mono text-4xl md:text-5xl'>Webpersona</h1>
            <p className='text-dark-light text-center md:text-left mb-2 text-base md:text-lg xl:text:xl'>Build a modern and creative website with webpersona.</p>
            <ul className='flex gap-x-2.5'>
              <li className='text-white' >
                <a href="/">
                  <FaInstagram className='h-6 w-6 md:h-7 md:w-7' />
                </a>
              </li>
              <li className='text-white' >
                <a href="/">
                  <FaFacebook className='h-6 w-6 md:h-7 md:w-7' />
                </a>
              </li>
              <li className='text-white' >
                <a href="/">
                  <FaTelegram className='h-6 w-6 md:h-7 md:w-7' />
                </a>
              </li>
              <li className='text-white' >
                <a href="/">
                  <FaTwitter className='h-6 w-6 md:h-7 md:w-7' />
                </a>
              </li>
              <li className='text-white' >
                <a href="/">
                  <FaYoutube className='h-6 w-6 md:h-7 md:w-7' />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex-col w-full justify-center items-center mt-28 hidden md:flex gap-y-4'>
          <IoMdHeart className='text-6xl text-white bg-blue-500 px-3 py-3 rounded-full' />
          <p className='italic text-dark-light text-lg flex items-center gap-x-[4px]'>Copyright<MdCopyright />2023. Crafted with love</p>
        </div>
      </div>
    </footer>
  )
}
