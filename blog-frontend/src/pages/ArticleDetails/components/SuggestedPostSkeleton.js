const SuggestedPostSkeleton = () => {
    return (
        <div className='mt-8 mb-10 lg:mt-0 py-5 px-4 pb-10 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] animate-pulse' >
            <div className='w-1/3 h-2 bg-slate-400 rounded-lg mt-3' />
            <div className='grid grid-cols-2 flex-col space-y-4 mt-8'>
                {[...Array(5)].map((itemp, idx) => (
                    <div key={idx} className='flex space-x-4 w-full items-center col-span-2 md:col-span-1 lg:col-span-2'>
                        <div className=' aspect-square rounded-lg w-1/5 bg-slate-300' />
                        <div className='w-full overflow-hidden'>
                            <div className='w-[calc(100%-10%)] h-2 bg-slate-300 rounded-lg'/>
                            <div className='w-1/2 h-2 bg-slate-300 rounded-lg mt-4'/>
                            <span className='text-dark-light font-opensans italic text-sm'>
                                {/* {new Date(post.createdAt).toLocaleDateString("en-Us", { day: "numeric", month: "short", year: "numeric" })} */}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='py-4'>
                <div className='w-[30%] h-2 mt-4 bg-slate-400 rounded-lg'></div>
                <ul className='flex gap-y-3 gap-x-3 flex-wrap mt-4'>
                    {[...Array(5)].map((item, idx) => (
                        <div className='bg-slate-300 w-20 h-2 rounded-lg' key={idx}>
                        </div>
                    ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default SuggestedPostSkeleton
