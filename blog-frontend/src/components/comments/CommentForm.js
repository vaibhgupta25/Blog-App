import React, { useState } from 'react'

const CommentForm = ({ 
    btnLabel,
    loading = false,
    formSubmitHandler,
    formCancelHandler = null,
    className,
    textAreaRef,
    initialText = ""
}) => {
    const [value, setValue] = useState(initialText)

    const submitHandler = (e) => {
        e.preventDefault();
        formSubmitHandler(value);
        setValue("");
    }
    return (
        <form onSubmit={submitHandler} >
            <div className={`border border-primary flex flex-col items-end p-4 ${className}`}>
                <textarea
                    rows="5"
                    ref={textAreaRef}
                    className={`w-full outline-none bg-transparent`}
                    placeholder='Enter your comment here...'
                    value={value}
                    style={{ "msOverflowStyle": "none", "scrollbarWidth": "none" }}
                    onChange={(e) => setValue(e.target.value)}
                />
                <div className='text-xs md:text-sm flex md:flex-row flex-col-reverse gap-x-2 pt-2 items-center'>
                    {
                        formCancelHandler && (
                            <button
                                className='px-6 py-2.5 border border-red-500 rounded-lg font-semibold mt-2'
                                type='submit'
                                onClick={formCancelHandler}
                            >
                                Cancel
                            </button>
                        )
                    }
                    <button
                        disabled = {loading}
                        className={`disabled:bg-opacity-70 disabled:cursor-not-allowed px-6 py-2.5 bg-primary w-full text-white rounded-lg font-semibold mt-2`}
                        type='submit'
                    >
                        {btnLabel}
                    </button>
                </div>
            </div>

        </form>
    )
}

export default CommentForm
