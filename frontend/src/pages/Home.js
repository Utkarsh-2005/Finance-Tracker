import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Items from '../components/Items';
import { Chartss } from '../components/Chartss';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from 'react-top-loading-bar';
import { createExpense, getUserExpenses } from '../utils/renders';
import NavBar from '../components/NavBar';

function Home() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [userdata] = useState(JSON.parse(localStorage.getItem('User')));
  const [userexp, setUserexp] = useState([]);
  const ref = useRef(null);

  document.title = 'Home';

  // Redirect to login if not logged in
  useEffect(() => {
    if (!localStorage.getItem('User')) {
      navigate('/login');
    }

    getUserExpenses(userdata._id).then(data => setUserexp(data));
    console.log(userexp)
  }, [userdata._id, navigate]);

  const getTotal = () => {
    return userexp.reduce((sum, item) => sum + item.amount, 0);

  };

  return (
    <div className='min-h-screen font-mont w-full bg-zinc-900'>
      <LoadingBar color='orange' ref={ref} />
      <NavBar data={userexp} />

      {/* Main Content */}
      <div className='w-full md:w-4/5 mx-auto h-[calc(100%-6rem)] flex flex-col md:flex-row p-4 gap-4'>
        
        {/* Left Section - Charts */}
        <div className='leftbox w-full md:w-1/2 h-full flex justify-center md:block'>
          <div className='p-5 h-full'>
            <Chartss exdata={userexp} />
          </div>
        </div>

        {/* Right Section - Expense Creation and List */}
        <div className='rightbox flex flex-col gap-8 items-center w-full md:w-1/2'>
          
          {/* Create Transaction Form */}
          <div className='createnew bg-gray-800 w-full max-w-md rounded-3xl p-6 flex flex-col justify-center items-center gap-4'>
            <div className='font-bold text-2xl md:text-3xl text-white'>Create Transaction</div>
            
            <div className='flex flex-col sm:flex-row gap-4 w-fit'>
              <input 
                type='number' 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder='Amount' 
                className='w-full h-12 text-base placeholder-black p-4 rounded-xl outline-none focus:outline-2 focus:outline-indigo-500' 
              />

              <select 
                onChange={(e) => setCategory(e.target.value)} 
                defaultValue='' 
                className="w-full h-12 bg-white text-gray-900 border border-gray-300 rounded-xl p-2.5 outline-none focus:outline-2 focus:outline-indigo-500"
              >
                <option value=''>--Select--</option>
                <option value='Grocery'>Grocery</option>
                <option value='Vehicle'>Vehicle</option>
                <option value='Shopping'>Shopping</option>
                <option value='Travel'>Travel</option>
                <option value='Food'>Food</option>
                <option value='Fun'>Fun</option>
                <option value='Other'>Other</option>
              </select>
            </div>

            <DatePicker
              selected={selectDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-full h-12 p-3 rounded-xl bg-gray-700 text-white outline-none focus:outline-2 focus:outline-indigo-500"
              placeholderText="Date"
              showYearDropdown
            />

            <button 
              onClick={() => {
                const expInfo = { usersid: userdata._id, category, date: selectDate, amount };
                ref.current.staticStart();
                createExpense(expInfo);
                ref.current.complete();
              }}
              className="w-full text-center rounded-xl px-5 py-2 bg-gray-800 border-2 text-white transition-all ease-out duration-300 hover:bg-indigo-600 hover:ring-2 hover:ring-indigo-600 font-bold text-lg"
            >
              +
            </button>
          </div>

          {/* Expense List */}
          <div className='w-full max-w-md p-6 bg-gray-800 rounded-xl h-auto border border-gray-700 overflow-y-auto'>
            <div className='text-2xl md:text-3xl text-white font-bold mb-4'>Total Expense: ₹ {getTotal()}</div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {userexp.map((item) => (
                <Items key={item._id} data={item} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
