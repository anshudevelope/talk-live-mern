import React, { useContext, useState } from 'react'
import assets from '../chat-app-assets/assets'
import { AuthContext } from '../context/AuthContext';

const Login = () => {

  const [currentState, setCurrentState] = useState("Sign up");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currentState === "Sign up" ? "signup" : "login", { fullName: name, email, password, bio });
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col-reverse sm:flex-row items-center justify-center gap-10 sm:justify-evenly px-4 sm:px-16 py-12 backdrop-blur-lg">

      {/* Left - Logo */}
      <img
        src={assets.talk_live_logo}
        alt="Talk Live Logo"
        className="w-[min(40vw,300px)] max-sm:mb-6"
      />

      {/* Right - Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[400px] border border-gray-500 bg-white/10 backdrop-blur-md p-8 flex flex-col gap-6 rounded-xl shadow-2xl text-white"
      >
        <h2 className="font-semibold text-2xl flex justify-between items-center">
          {currentState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt="Back"
              className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
            />
          )}
        </h2>

        {/* Full Name - Sign Up */}
        {currentState === "Sign up" && !isDataSubmitted && (
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg border border-gray-400 bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
          />
        )}

        {/* Email & Password */}
        {!isDataSubmitted && (
          <>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg border border-gray-400 bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            />
            <input
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg border border-gray-400 bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            />
          </>
        )}

        {/* Bio Textarea */}
        {currentState === "Sign up" && isDataSubmitted && (
          <textarea
            rows={4}
            placeholder="Provide a short bio"
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-3 rounded-lg border border-gray-400 bg-white/20 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
          ></textarea>
        )}

        {/* Terms Checkbox */}
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            className="accent-violet-500"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          Agree to the terms and privacy policy
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!termsAccepted} // Disabled until checkbox is checked
          className={`py-3 rounded-lg text-white font-semibold shadow-lg transition-transform ${termsAccepted
              ? "bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 hover:scale-105"
              : "bg-gray-600 cursor-not-allowed"
            }`}
        >
          {currentState === "Sign up" ? "Create Account" : "Login to Your Account"}
        </button>

        {/* Switch Form */}
        <div className="flex flex-col gap-2 text-sm text-gray-200">
          {currentState === "Sign up" ? (
            <p>
              Already have an account?{" "}
              <span
                className="font-medium text-violet-500 cursor-pointer hover:underline"
                onClick={() => {
                  setCurrentState("Login");
                  setIsDataSubmitted(false);
                  setTermsAccepted(false); // Reset checkbox
                }}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an account{" "}
              <span
                className="font-medium text-violet-500 cursor-pointer hover:underline"
                onClick={() => {
                  setCurrentState("Sign up");
                  setTermsAccepted(false); // Reset checkbox
                }}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>

  )
}

export default Login
