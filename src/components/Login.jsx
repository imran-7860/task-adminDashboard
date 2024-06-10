import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function check() {
      if (sessionStorage.getItem("email")) {
        navigate("/admin");
      }
    }
    check();
  }, [navigate]);
 
  const handleSignup = async () => {
    try {
      if (!email | !password) {
        alert("please enter all info");
      }

      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      console.log(response);

      if (response.data.message !== "user invalid") {
        navigate("/admin");
        sessionStorage.setItem("email", email);
        setEmail("");
        setPassword("");
        alert("susccfullu login");
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };
  return (
    <div className="flex justify-center items-start mx-auto mt-10 bg-gray-200 border shadow-xl container max-w-md">
      <div className="flex flex-col justify-center items-center p-10">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          className="py-2 px-5 outline-none border-blue-700 mb-3 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          className="py-2 px-5 outline-none border-blue-700 mb-5 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="py-2 px-5 bg-blue-400 rounded-2xl"
        >
          Login
        </button>
        <p className="mb-3">or</p>
        <p>dont have account  <Link to={"/signup"}>SignUp</Link></p>
       
      </div>
    </div>
  );
};

export default Login;
