const ArticleDetailSkeleton = () => {
    return (
        <section className='container mx-auto  px-5 py-5 mb-5 animate-pulse'>
            <div className='flex flex-col lg:flex-row lg:px-5 lg:space-x-10 lg:w-5/4 '>
                <article className='flex-1 max-w-5xl'>
                    {/* image  */}
                    <div
                        className='w-full bg-slate-300 aspect-video object-cover rounded-xl'
                    />
                    {/* categories */}
                    <div className=' w-[calc(100%-40%)] bg-slate-400 h-2 rounded-lg mt-4'></div>
                    {/* title  */}
                    <div className=' w-[calc(100%-30%)] h-2 bg-slate-300 rounded-lg mt-4'></div>
                    <div className=' w-[calc(100%-10%)] h-2 bg-slate-300 rounded-lg mt-4'></div>
                    <div className=' w-[calc(100%-30%)] h-2 bg-slate-300 rounded-lg mt-4'></div>
                    <div className=' w-[calc(100%-20%)] h-2 bg-slate-300 rounded-lg mt-4'></div>
                </article>
            </div>
        </section>
    )
}

export default ArticleDetailSkeleton
