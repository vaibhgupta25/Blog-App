import React, { useEffect, useRef, useState } from 'react'
import { FiEdit2, FiMessageSquare, FiTrash2 } from "react-icons/fi";
import CommentForm from './CommentForm';
import { images, stables } from '../../constants';

const Comment = ({
    comment,
    loggedInUserId,
    affectedComment,
    setAffectedcomment,
    parentId = null,
    addCommentHandler,
    deleteCommentHandler,
    updateCommentHandler,
    replyHandler,
    replies,
}) => {
    // { console.log(replies) }
    const isUserLoggedIn = Boolean(loggedInUserId)
    const commentBelongsToUser = loggedInUserId === comment.user._id;
    const isReplying = affectedComment && affectedComment.type === "replying" && affectedComment._id === comment._id
    const isEditing = affectedComment && affectedComment.type === "editing" && affectedComment._id === comment._id
    const repliedCommentId = parentId ? parentId : comment._id
    const replyOnUserId = comment.user._id;
    const textAreaRef = useRef(null)

    useEffect(() => {
        if (isReplying && textAreaRef || isEditing && textAreaRef) {
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(0, textAreaRef.current.value.length); // Set cursor to the end
        }
    }, [isReplying, isEditing])

    return (
        <div className={`flex relative flex-nowrap space-x-1 md:space-x-2 lg:space-x-3 bg-[#F2F4F5] p-2 md:p-3 items-start rounded-lg `}>
            <img
                src={comment.user.avatar ? stables + comment.user.avatar : images.profile1}
                alt="img not found"
                className='w-7 h-7 md:w-9 md:h-9  object-cover rounded-full'
            />
            <div className='flex-1 flex flex-col text-xs md:text-sm'>
                <h5 className='font-bold text-dark-hard text-xs'>
                    {comment.user.name}
                </h5>
                <span className='text-[10px] md:text-xs  text-dark-light'>
                    {
                        new Date(comment.createdAt)
                            .toLocaleDateString("en-Us", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            })
                    }
                </span>
                {
                    !isEditing &&
                    <p className='font-opensans text-dark-light mt-1.5 font-semibold '>{comment.desc}</p>
                }
                {
                    isEditing &&
                    (

                        <CommentForm
                            btnLabel="Update"
                            formSubmitHandler={(value) => {
                                updateCommentHandler(value, comment._id);
                            }}
                            formCancelHandler={() => setAffectedcomment(null)}
                            textAreaRef={textAreaRef}
                            initialText={comment.desc}
                            className="my-2"
                        />
                    )
                }
                <div className='text-[10px]  md:text-sm flex items-center gap-x-2 md:gap-x-3 font-roboto my-2 md:my-3'>
                    {isUserLoggedIn &&
                        <button
                            className='flex space-x-1 items-center text-dark-light'
                            onClick={() => setAffectedcomment({
                                type: "replying",
                                _id: comment._id
                            })}
                        >
                            <FiMessageSquare className='w-3 md:w-4 h-auto' />
                            <span>Reply</span>
                        </button>
                    }
                    {
                        commentBelongsToUser &&
                        <>
                            <button
                                className='flex space-x-1 items-center text-dark-light'
                                onClick={() => {
                                    setAffectedcomment({
                                        type: "editing",
                                        _id: comment._id
                                    })
                                }}
                            >
                                <FiEdit2 className='w-3 md:w-4 h-auto' />
                                <span>Edit</span>
                            </button>
                            <button className='flex space-x-1 items-center text-dark-light' onClick={() => deleteCommentHandler(comment._id)}>
                                <FiTrash2 className='w-3 md:w-4 h-auto' />
                                <span>Delete</span>
                            </button>
                        </>
                    }
                </div>
                {
                    isReplying && (
                        <CommentForm
                            btnLabel="Reply"
                            formSubmitHandler={(value) =>
                                addCommentHandler(value, repliedCommentId, replyOnUserId)
                            }
                            formCancelHandler={() => setAffectedcomment(null)}
                            textAreaRef={textAreaRef}
                        />
                    )}
                {
                    (replies.length > 0) && (
                        <div>
                            {comment.replies.map((reply) => {
                                // { console.log(reply._id) }
                                return <Comment
                                    key={reply._id}
                                    comment={reply}
                                    loggedInUserId={loggedInUserId}
                                    affectedComment={affectedComment}
                                    setAffectedcomment={setAffectedcomment}
                                    addCommentHandler={addCommentHandler}
                                    updateCommentHandler={updateCommentHandler}
                                    deleteCommentHandler={deleteCommentHandler}
                                    replies={reply._id}
                                />
                            })}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Comment
