import React, { useEffect, useState, useRef } from 'react'
import { axiosClient } from '../utils/axiosClient';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

function Signup() {
  document.title = 'SignUp';
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const ref = useRef(null);

  // Prevent signup if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/");
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      await axiosClient.post('/auth/signup', { username, email, password });
      toast.success("Registered Successfully!!");
      ref.current.complete();
      navigate("/login");

    } catch (error) {
      ref.current.complete();
      toast.error("Signup failed. Please try again.");
      console.error(error.message);
    }
  }

  return (
    <div className='bg-slate-800 w-screen h-screen flex flex-col md:flex-row'>
      <LoadingBar color='orange' ref={ref} />

      {/* Left Section */}
      <div className='left w-full md:w-2/5 h-1/3 md:h-full flex items-center justify-center p-6'>
        <h1 className='text-white font-thin text-5xl md:text-7xl leading-tight whitespace-pre-wrap text-center md:text-left'>
          <span className='font-medium text-lg text-yellow-500'>Expense</span>
          <br />
          Tracker App!!
        </h1>
      </div>

      {/* Divider Line */}
      <div className='hidden md:block w-0.5 h-[100%] bg-white mx-auto'></div>

      {/* Right Section */}
      <div className='flex justify-center items-center w-full md:w-3/5 h-2/3 md:h-full'>
        <form 
          className='flex flex-col gap-5 w-11/12 max-w-md px-4 md:w-3/5 items-center'
          onSubmit={submitForm}
        >
          <h1 className='text-3xl md:text-4xl text-white font-bold'>SignUp</h1>

          <input 
            type='text'
            placeholder='UserName'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full h-12 px-4 rounded-2xl outline-none transition-all focus:outline-2 focus:outline-white'
          />

          <input 
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full h-12 px-4 rounded-2xl outline-none transition-all focus:outline-2 focus:outline-white'
          />

          <input 
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full h-12 px-4 rounded-2xl outline-none transition-all focus:outline-2 focus:outline-white'
          />

          <button 
            type="submit"
            className='w-full h-12 justify-center text-lg rounded-2xl bg-yellow-600 text-center flex items-center font-bold'
          >
            Submit
          </button>

          <p className='text-white text-center'>
            Already Registered? <a href='/login' className='text-yellow-500 underline'>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
