import React, { useEffect, useState } from 'react'
import { stables } from '../constants'
import { FaUser } from "react-icons/fa";
import CropEasy from './crop/CropEasy';
import { createPortal } from 'react-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfilePicture } from '../services/index/user';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/reducers/userReducers';
import toast from 'react-hot-toast';

const ProfilePicture = ({ avatar }) => {

    const [openCrop, setOpenCrop] = useState(false);
    const [photo, setPhoto] = useState(null)
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch()
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (formData) => {
            return updateUserProfilePicture({
                token: userState.userInfo.token,
                formData
            })
        },
        onSuccess: (data) => {
            localStorage.setItem('account', JSON.stringify(data));
            dispatch(userActions.setUserInfo(data));
            queryClient.invalidateQueries(['profile'])
            toast.success("Profile removed!");
        },
        onError: (err) => {
            toast.error(err.message);
        }

    })

    const handleFileChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setPhoto({ url: URL.createObjectURL(file), file });
        setOpenCrop(true)
    }

    const handleRemove = (e) => {
        if (photo && window.confirm("Do you want to really remove profile picture?")) {
            try {
                const formData = new FormData();
                formData.append('profilePicture', undefined)
                mutate({ formData });
                setPhoto(undefined)

            } catch (error) {
                toast.error(error.message);
            }
        }
    }


    return (
        <>
            {console.log(stables + avatar)}
            {
                openCrop && createPortal(<CropEasy photo={photo} setOpenCrop={setOpenCrop} />, document.getElementById("portal"))
            }
            <div className='flex w-full items-center gap-x-4'>
                <div className='relative w-20 h-20  rounded-full outline outline-1 outline-offset-2 overflow-hidden outline-primary'>
                    <label htmlFor="profilePicture" className='cursor-pointer absolute inset-0 bg-transparent'>
                        {
                            avatar ? <img src={stables + avatar} alt="Profile" />
                                : (
                                    <div className='bg-50/50 w-full h-full flex items-center justify-center'>
                                        <FaUser className='h-7 w-auto text-primary' />
                                    </div>
                                )
                        }
                    </label>
                    <input type="file" className='sr-only' id="profilePicture" onChange={handleFileChange} />
                </div>
                <button className='px-5 py-2 text-red-500 rounded-lg border border-red-500' onClick={handleRemove}>Remove</button>
            </div>
        </>
    )
}

export default ProfilePicture
