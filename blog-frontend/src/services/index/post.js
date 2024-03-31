import axios from "axios"

export const getAllPost = async (search = "", page = 1, limit = 1) => {
    try {
        console.log('helo')
        const { data, headers } = await axios.get(`/api/posts?searchKey=${search}&page=${page}&limit=${limit}`)
        return {data, headers};
    } catch (error) {
        if (error?.response?.data?.message)
            throw new Error(error.response.data.message)
        throw new Error(error.message)
    }
}

export const getPostDetails = async ({slug}) => {
    try {
        const { data } = await axios.get(`/api/posts/${slug}`)
        return data
    } catch (error) {
        if (error.response && error.response?.data?.message)
            throw new Error(error.response.data.message)
        throw new Error(error.message)
    }
}

