import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../chat-app-assets/assets';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {

  const { authUser, updateProfile } = useContext(AuthContext);

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(authUser.fullName || "Steve Martin");
  const [bio, setBio] = useState(authUser.bio || "Hello! I am proudly using Talk Live.");
  const [preview, setPreview] = useState(assets.avatar_icon);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (preview && preview !== assets.avatar_icon) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      await updateProfile({ fullName: name, bio });
      navigate('/');
      return;
    }

    const render = new FileReader();
    render.readAsDataURL(selectedImage);
    render.onload = async () => {
      const base64image = render.result;
      await updateProfile({ fullName: name, bio, profilePic: base64image });
      navigate('/');
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer"
            >
              ← Back
            </button>
          </div>

          <h3 className='text-lg'>Profile Details</h3>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={handleImageChange} type="file" id="avatar" accept='.png, .jpg, .jpeg, .webp' hidden />
            <img src={preview || assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImage && 'rounded-full'}`} />
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
        <img src={authUser?.profilePic || assets.talk_live_logo} alt="" className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' />
      </div>
    </div>
  )
}

export default Profile
