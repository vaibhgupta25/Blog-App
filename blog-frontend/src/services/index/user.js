import axios from 'axios'

export const signup = async ({ name, email, password }) => {
    try {
        const { data } = await axios.post("api/users/register", { name, email, password })
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message)
    }
}

export const login = async ({ email, password }) => {
    try {
        const { data } = await axios.post('api/users/login', {
            email:email.toLowerCase(), password
        })
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message)
    }
}

export const getUserProfile = async ({ token }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const { data } = await axios.get('api/users/profile', config)
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message)
        }

        throw new Error(error.message);
    }
}

export const updateProfle = async ({ token, userData }) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const { data } = await axios.put('/api/users/updateProfile', userData, config)
        return data
    } catch (error) {
        if (error?.response && error.response?.data?.message)
            throw new Error(error.response.data.message);

        throw new Error(error.message)

    }
}

export const updateUserProfilePicture = async ({ token, formData }) => {
    try {
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axios.put("/api/users/updateProfilePicture",
            formData,
            config
        )
        return data;
    } catch (error) {
        if (error?.response && error?.response?.data?.message)
            throw new Error(error.response.data.message)
        throw new Error(error.message)
    }
}