import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../chat-app-assets/assets';

const Profile = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("Anshu Maurya");
  const [bio, setBio] = useState("Hello. I am using Talk Live")

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile Details</h3>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e) => setSelectedImage(e.target.files[0])} type="file" id="avatar" accept='.png, .jpg, .jpeg, .webp' hidden />
            <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImage && 'rounded-full'}`} />
            upload profile image
          </label>

          <input
            type="text"
            className='p-2 border border-gray-500 rounded-md focus:outline-none'
            placeholder='Full Name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />

          <textarea
            rows={4}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white-500' placeholder='provide a short bio'
            required
            onChange={(e) => setBio(e.target.value)}
            value={bio}>Bio</textarea>

          <button type='submit' className='py-3 bg-linear-to-r from-purple-400 to-voilet-600 text-white rounded-md cursor-pointer'>Save</button>
        </form>
        <img src={assets.talk_live_logo} alt="" className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' />
      </div>
    </div>
  )
}

export default Profile
