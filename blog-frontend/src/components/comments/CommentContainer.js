import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

import CommentForm from './CommentForm'
import { createNewComment, deleteComment, updateComment } from '../../services/index/comments'
import Comment from './Comment';


const CommentContainer = ({ loggedInUserId, comments, slug }) => {

    const [affectedComment, setAffectedcomment] = useState(null);
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user)

    const {
        mutate: mutateNewComment,
        isLoading: isLoadingNewComment
    } = useMutation({
        mutationFn: (
            { token, desc, slug, parent, replyOnUser }
        ) => {
            console.log('eh')
            return createNewComment(
                { token, desc, slug, parent, replyOnUser }
            )
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success('Comment will display after the confirmation! ')
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const {
        mutate: mutateUpdateComment,
    } = useMutation({
        mutationFn: async (
            { token, desc, commentId }
        ) => {
            // console.log('eh')
            return updateComment(
                { token, desc, commentId }
            )
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['post'])
            toast.success('Comment will display after the confirmation! ')
        },
        onError: (error) => {
            toast.error(error);
        }
    })
    
    const { mutate: mutateDelete } = useMutation({
        mutationFn: ({ commentId, token }) => {
            console.log('commentId' + commentId + " " + token)
            return deleteComment({ commentId, token });
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['post'])
            toast.success('Comment Deleted!')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    const addCommentHandler = (value, parent = null, replyOnUser = null) => {
        mutateNewComment({ desc: value, parent, replyOnUser, token: userState.userInfo.token, slug })
        setAffectedcomment(null)
    }

    const updateCommentHandler = (value, commentId) => {
        console.log(commentId)
        mutateUpdateComment({ desc: value, token: userState.userInfo.token, commentId })
        setAffectedcomment(null)
    }


    const deleteCommentHandler = (commentId) => {
        console.log(userState.userInfo.token)
        mutateDelete({ commentId, token: userState.userInfo.token })
    }


    return (
        <div className='mt-10 flex flex-col'>
            <CommentForm
                loading={isLoadingNewComment}
                btnLabel="Send"
                formSubmitHandler={(value) => (addCommentHandler(value))}
            />
            <div className='space-y-4 mt-12 overflow-hidden'>
                {comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        loggedInUserId={loggedInUserId}
                        affectedComment={affectedComment}
                        setAffectedcomment={setAffectedcomment}
                        addCommentHandler={addCommentHandler}
                        updateCommentHandler={updateCommentHandler}
                        deleteCommentHandler={deleteCommentHandler}
                        replies={comment.replies}
                        parentId={comment._id}
                    />
                ))}
            </div>
        </div>
    )
}

export default CommentContainer
