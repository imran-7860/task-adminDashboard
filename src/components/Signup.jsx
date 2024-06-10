import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    
    try {
      if (!name || !email || !password) {
        alert('Please fill all information');
        return;
      }
      const response = await axios.post('http://localhost:3001/signup', { name, email, password });
      console.log(response);

      if (response.data.status) {
        setName("");
        setEmail("");
        setPassword("");
        alert('User successfully created account');
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-start mx-auto mt-10 bg-gray-200 border shadow-xl container max-w-md">
      <div className="flex flex-col justify-center items-center p-10">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          className="py-2 px-5 outline-none border-blue-700 mb-3 w-full"
          onChange={(e) => setName(e.target.value)}
        />
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
        <button onClick={handleSignup} className="py-2 px-5 bg-blue-400 rounded-2xl">Sign Up</button>
        <p className="mb-3">or</p>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default Signup;
