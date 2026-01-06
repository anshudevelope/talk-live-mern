import { Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import assets from './chat-app-assets/assets.js'
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext.jsx'

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <div className='bg-[url("./src/chat-app-assets/talk-live-bg-img.png")] bg-cover bg-no-repeat min-h-screen relative'>
      <img src={assets.talk_live_logo} alt="logo" className='max-w-30 m-5 absolute top-0 right-0' />
      <Toaster />
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" replace />}
          />

          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" replace />}
          />
        </Routes>

    </div>
  )
}

export default App
