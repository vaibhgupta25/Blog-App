import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from './CropImage'
import { Form } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfilePicture } from '../../services/index/user';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/reducers/userReducers';

const CropEasy = ({ photo, setOpenCrop }) => {

    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ formData }) => {
            return updateUserProfilePicture({
                token: userState.userInfo.token,
                formData
            })
        },
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem('account', JSON.stringify(data))
            queryClient.invalidateQueries(['profile'])
            toast.success("Picture uploaded Successfully")

        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleCropImage = async () => {
        try {
            const croppedImg = await getCroppedImg(photo?.url, croppedAreaPixels)
            const file = new File([croppedImg.file], `${photo?.file?.name}`, {
                type: photo?.file?.type
            })
            const formData = new FormData()
            formData.append("profilePicture", file);
            mutate({ formData })
            setOpenCrop(false);
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    return (
        <div className='fixed bg-black/50 flex justify-center inset-0 overflow-hidden p-5 z-[1000]'>
            <div className='bg-white h-fit w-full sm:max-w-[350px] p-5 rounded-lg'>
                <h2 className="font-semibold text-dark-hard mb-2">Crop Image</h2>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <Cropper
                        image={photo?.url}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onZoomChange={setZoom}
                        onCropChange={setCrop}
                        onCropComplete={handleCropComplete}
                    />
                </div>
                <div>
                    <label
                        htmlFor="zoomRange"
                        className=' mt-2 mb-0.5 text-sm text-gray-900 font-medium block'
                    >
                        Zoom : {`${Math.round(zoom * 100)}%`}
                    </label>
                    <input
                        type="range"
                        className="w-full h-6 mb-4 rounded-lg range-sm cursor-pointer text-gray-200"
                        id="zoomRange"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(e.target.value)}
                    />
                </div>
                <div className="flex justify-between flex-wrap gap-2">
                    <button
                        disabled={isLoading}
                        onClick={() => setOpenCrop(false)}
                        className='px-5 py-2.5 rounded-lg text-red-500 border border-red-500 text-sm  disabled:opacity-70'
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={handleCropImage}
                        className='px-5 py-2.5  rounded-lg text-blue-500 border border-blue-500'
                    >
                        Done
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CropEasy
