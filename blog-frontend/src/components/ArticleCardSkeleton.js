import React from 'react'

const ArticleCardSkeleton = ({ className }) => {
    return (
        <section
            className={`rounded-xl overflow-hidden animate-pulse
        shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ${className}`}
        >
            {/* post image */}
            <div
                className='w-full aspect-video bg-slate-300'
            />
            <div className='p-5'>
                {/* title */}
                <div className='w-56 h-2 mt-4 bg-slate-300 rounded-lg' />
                {/* caption */}
                <div className='w-24 h-2 mt-4 bg-slate-300 rounded-lg' />

                <div className='flex w-full flex-nowrap justify-between items-center mt-6'>
                    <div className='flex gap-x-2 items-center md:gap-x-2.5'>
                        {/* user Image */}
                        <div className='w-9 h-9 bg-slate-300 rounded-full' />
                        <div className='flex flex-col'>
                            {/* name */}
                            <div className='bg-slate-300 w-24 h-2 rounded-lg' />
                            {/* verified status */}
                            <div className='w-16 h-2 bg-slate-300 mt-2 rounded-lg' />
                        </div>
                    </div>
                    <div className='h-2 w-10 bg-slate-300 rounded-lg mt-4'></div>
                </div>
            </div>
        </section>
    )
}

export default ArticleCardSkeleton
