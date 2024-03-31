import axios from 'axios';

const createNewComment = async ({ token, desc, slug, parent, replyOnUser }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
        const { data } = await axios.post('/api/comment/', {
            desc,
            slug,
            parent,
            replyOnUser
        }, config)

        return data;
    } catch (error) {
        if (error?.response?.data?.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

const updateComment = async ({ desc, token, commentId }) => {
    try {
        console.log(commentId)
        const { data } = await axios.put(`/api/comment/${commentId}`, { desc }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (error) {
        if (error?.response?.data?.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }

}

const deleteComment = async ({ commentId, token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        console.log("delete comment  "+commentId+ token)
        const { data } = await axios.delete(`/api/comment/${commentId}`, config);
        return data;
    } catch (error) {
        if (error?.response?.data?.message) throw new Error(error.response.data.message)
        throw new Error(error.message)
    }
}
export { createNewComment, updateComment, deleteComment };