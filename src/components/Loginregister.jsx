import React from "react";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.png"

const Loginregister = () => {
  const [action, setAction] = useState("");

  const navigate = useNavigate();

  const [newuser, setnewuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [olduser, setolduser] = useState({
    name: "",
    password: "",
  });

  const HandleLogin = async () => {
    if (!olduser.name) {
      alert("Username is required");
      return;
    }

    try {
      const response = await axios.get("http://localhost:7000/users");

      const users = response.data;

      const userExists = users.some((user) => user.password === olduser.password);

      if (userExists) {
        alert("Login Success");
        navigate("/")
      } else {
        alert("User Not found");
        registerLink();
      }
    } catch (error) {
      alert("User not found");
    }
  };

  const HandleName = (e) => {
    setnewuser({
      ...newuser,
      name: e.target.value,
    });
  };

  const HandleEmail = (e) => {
    setnewuser({
      ...newuser,
      email: e.target.value,
    });
  };

  const HandlePassword = (e) => {
    setnewuser({
      ...newuser,
      password: e.target.value,
    });
  };

  const registerLink = () => {
    setAction(" active");
  };

  const LoginLink = () => {
    setAction("");
  };

  const HandleOldName = (e) => {
    setolduser({
      ...olduser,
      name: e.target.value,
    });
  };

  const HandleOldPassword = (e) => {
    setolduser({
      ...olduser,
      password: e.target.value,
    });
  };

  const HandleRegister = async () => {
    const user = await axios.post("http://localhost:7000/user", newuser);
    console.log(user);

    LoginLink();
  };

  return (
    <div
      id="register"
      className="flex  items-center justify-center w-screen h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(${image1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`relative flex items-center overflow-hidden transition-all duration-200 w-[420px] bg-transparent border-2 border-white/10 rounded-lg text-white ${
          action ? "h-[520px]" : "h-[450px]"
        }`}
      >
        {/* Login Form */}
        <div
          className={`w-full p-10 transition-transform duration-150 ${
            action ? "translate-x-[-400px]" : "translate-x-0"
          }`}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="text-3xl text-center">Login</h1>
            <div className="relative w-full mt-8 mb-8">
              <input
                onChange={HandleOldName}
                type="text"
                placeholder="Username"
                required
                className="w-full h-12 px-5 py-2 text-base text-white bg-transparent border-2 border-white/10 rounded-full outline-none"
              />
              <FaUser className="absolute text-lg top-1/2 right-5 -translate-y-1/2" />
            </div>
            <div className="relative w-full mb-4">
              <input
                onChange={HandleOldPassword}
                type="password"
                placeholder="Password"
                required
                className="w-full h-12 px-5 py-2 text-base text-white bg-transparent border-2 border-white/10 rounded-full outline-none"
              />
              <FaLock className="absolute text-lg top-1/2 right-5 -translate-y-1/2" />
            </div>
            <div className="flex justify-between mt-4 mb-6 text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-white" />
                Remember me
              </label>
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              onClick={HandleLogin}
              type="submit"
              className="w-full h-11 text-base font-bold text-gray-800 bg-white rounded-full shadow-md cursor-pointer"
            >
              Login
            </button>
            <div className="mt-6 text-sm text-center">
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={registerLink} className="font-semibold hover:underline">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Registration Form */}
        <div
          className={`absolute w-full p-10 transition-transform duration-150 ${
            action ? "translate-x-0" : "translate-x-[400px]"
          }`}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="text-3xl text-center">Registration</h1>
            <div className="relative w-full mt-8 mb-8">
              <input
                onChange={HandleName}
                type="text"
                placeholder="Username"
                required
                className="w-full h-12 px-5 py-2 text-base text-white bg-transparent border-2 border-white/10 rounded-full outline-none"
              />
              <FaUser className="absolute text-lg top-1/2 right-5 -translate-y-1/2" />
            </div>
            <div className="relative w-full mb-8">
              <input
                onChange={HandleEmail}
                type="email"
                placeholder="Email"
                required
                className="w-full h-12 px-5 py-2 text-base text-white bg-transparent border-2 border-white/10 rounded-full outline-none"
              />
              <FaEnvelope className="absolute text-lg top-1/2 right-5 -translate-y-1/2" />
            </div>
            <div className="relative w-full mb-4">
              <input
                onChange={HandlePassword}
                type="password"
                placeholder="Password"
                required
                className="w-full h-12 px-5 py-2 text-base text-white bg-transparent border-2 border-white/10 rounded-full outline-none"
              />
              <FaLock className="absolute text-lg top-1/2 right-5 -translate-y-1/2" />
            </div>
            <div className="flex justify-between mt-4 mb-6 text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-white" />
                I agree to terms & conditions
              </label>
            </div>
            <button
              onClick={HandleRegister}
              className="w-full h-11 text-base font-bold text-gray-800 bg-white rounded-full shadow-md cursor-pointer"
            >
              Register
            </button>
            <div className="mt-6 text-sm text-center">
              <p>
                Already have an account?{" "}
                <a href="#" onClick={LoginLink} className="font-semibold hover:underline">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginregister;
