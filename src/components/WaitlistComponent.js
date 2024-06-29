import React, { useState } from "react";
import Loading from './SpinnerWaitlist';

const Waitlist = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError && validateEmail(e.target.value)) {
      setEmailError('');
    }
  };

  const handleSubmit = () => {
    if (!email) {
      setEmailError('Please enter an email.');
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed w-full h-full bg-[#070707] bg-opacity-75 inset-0 z-[1000] flex items-center justify-center">
      <div className="bg-background relative text-center bg-opacity-100 z-[1000] p-6 rounded-md shadow-xl my-[45px] mx-[55px] max-md:w-full md:w-[663px] max-md:h-auto md:h-auto">
        <Loading />
        <h2 className="text-light-blue text-3xl mb-[15px] mt-[25px] font-bold leading-[150%]">Join the waitlist!</h2>
        <p className="text-white text-lg leading-[150%]">
          You're just one step away from joining our exclusive waitlist and claiming your<br className="max-md:hidden" /> <span className="text-light-blue">$100 Innovator Credits reward!</span> To claim this app project, enter your email<br className="max-md:hidden" /> address below, and we’ll send you a magic login link.
        </p>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className={`z-10 text-center mt-[45px] mb-[15px] text-tiny text-white w-full block p-[13px] max-md:w-auto md:w-[435px] border-light-black bg-light-black rounded-[5px] mx-auto ${emailError ? 'border-red-500' : ''}`}
          placeholder="Enter your email address..."
        />
        {emailError && <p className="text-base mt-1 mb-3 text-[#ff1f1f]">{emailError}</p>}
        <button
          type="submit"
          className="z-20 text-black bg-light-blue hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[5px] text-base px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Waitlist;
