import React from 'react'
import { images } from '../../../constants/index'

export default function CTA() {
    return (
        <>
            <svg
                className='w-full h-auto h-max-40 translate-y-[2px]'
                preserveAspectRatio='none'
                viewBox="0 0 2160 263"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    id="Wave"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
                    fill="#0D2436"
                />
            </svg>
            <section className='relative bg-dark-hard px-5 translate-y-[1px] '>
                <div className='container grid grid-cols-12 mx-auto py-10 pb-20 lg:place-items-center border-b border-b-dark-light'>
                    <div className='col-span-12 lg:col-span-6'>
                        <h2 className=' text-white font-roboto font-bold text-2xl md:text-4xl text-center lg:text-left leading-normal'>
                            Get our stories delivered from us to your inbox weekly.
                        </h2>
                        <div className='w-full max-w-[494px] mt-12 space-y-3 mx-auto lg:mx-0 md:space-y-0 md:flex md:items-center md:space-x-2'>
                            <input
                                type="text"
                                placeholder='Your Email'
                                className='outline-none px-4 py-3 rounded-lg w-full placeholder:text-dark-light'
                            />
                            <button className='bg-blue-500 px-4 py-3 md:w-fit md:whitespace-nowrap text-white font-bold rounded-lg w-full tracking-wide'>Get Started</button>
                        </div>
                        <p className='md:text-base text-dark-light mt-6 mx-auto text-sm leading-7 text-center lg:text-left'>
                            <b className='text-white italic'>Get a response tomorrow</b> if you submit by 9pm today. If we received after 9pm will get a reponse the following day.
                        </p>
                    </div>
                    <div className='col-span-12 lg:col-span-6 mb-[70px] hidden md:block md:order-first lg:order-2 '>
                        <div className='w-3/4 mx-auto relative'>
                            <div className='w-1/2 h-1/2 absolute bg-white opacity-[0.06] -bottom-[10%] -left-[8%] rounded-xl' />
                            <div className='w-1/2 h-1/2 absolute bg-[#FC5A5A] top-[10%] -right-[8%] -z-1 rounded-xl' />
                            <div className={`bg-white w-full rounded-xl p-3 z-[1] relative`}>
                                <img
                                    src={images.fb}
                                    alt=""
                                    className='w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60'
                                />
                                <div className='p-5'>
                                    <h1 className='text-xl sm:text-2xl lg:text-[28px] font-roboto text-dark-soft font-bold tracking-wide'>
                                        The best aticles every week
                                    </h1>
                                    <p className='text-dark-light font-opensans text-sm mt-3 sm:text-lg'>
                                    Our insurance plans offers are priced the same everywhere else.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
