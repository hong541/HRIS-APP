import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await axios.post(
        `${import.meta.env.APP_URL}/api/auth/signin`,
        {
          email,
          password,
        }
      );
      if (res.status === 200) {
        const data = res.data;
        dispatch(signInSuccess(data));
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        dispatch(signInFailure("Gagal Login."));
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch(signInFailure(errorMsg));
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-md p-8 space-y-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center">Sign In</h2>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          <form
            className="space-y-4"
            onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-100">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-100">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Sign In
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
