import React, { useState, useRef } from 'react';
import GeneralSetting from "../../assets/svgs/generalsetting"
import ReferralsSetting from "../../assets/svgs/Referrals & Credits"
import Tick from "../../assets/svgs/tick.svg";
import Copy from "../../assets/svgs/copy";

const Refer = () => {
  const [activeSection, setActiveSection] = useState('General');
  const inputRef = useRef(null);
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  const handleCopy = (event) => {
    event.preventDefault();
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.placeholder).then(() => {
        console.log('Text is copied');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  };
  return (
    <div className="flex w-screen max-lg:flex-col bg-gray-100">
      <aside className="sticky top-0 w-full lg:w-64 px-5 bg-[#202020] bg-gray-800 text-white flex-shrink-0 lg:flex-col lg:justify-between lg:h-auto">
        <div className="flex items-center justify-start h-16 bg-gray-900">
          <h1 className="text-[14px] text-description-color font-medium">Menu</h1>
        </div>
        <nav className="flex-1 flex max-lg:flex-row lg:flex-col">
          <ul className="mb-4 flex max-lg:flex-row lg:flex-col gap-1">
            <li>
              <button
                onClick={() => handleSectionChange('General')}
                className={`flex items-center buttondashboard gap-2 text-lg w-full px-2 py-3 text-left ${activeSection === 'General' ? 'bg-[#2c2c2c] rounded-md stroke-white' : 'text-description-color stroke-[#878593]'}`}
              >
                <GeneralSetting/>
                General
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange('Referrals & Credits')}
                className={`flex items-center gap-2 buttondashboard px-2 py-3 text-lg w-full text-left ${activeSection === 'Referrals & Credits' ? 'bg-[#2c2c2c] rounded-md stroke-white' : 'text-description-color stroke-[#878593]'}`}
              >
                <ReferralsSetting/>
                Referrals & Credits
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6 pt-[8px] overflow-auto lg:ml-[60px]">
        {activeSection === 'General' && (
          <div className="p-6 text-white">
            <h2 className="text-[24px] font-normal mb-5">General Settings</h2>
            <p className='text-[20px]'>Account Information</p>
            <form>
            <div className='flex mt-5 gap-10 w-full'>
            <div className='w-1/3'>
            <label for="name" className="block text-lg font-normal leading-6 text-gray-900">Name</label>
            <div className="mt-2.5">
              <input required placeholder='Input name' type="text" name="name" id="name" autocomplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-light-grey-color ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 bg-[#1b1c1c]"/>
            </div>
            </div>
            <div className='w-1/3'>
            <label for="email" className="block text-lg font-normal leading-6 text-gray-900">Email</label>
            <div className="mt-2.5">
              <input required placeholder='nonosisihoy@gmail.com' type="email" name="email" id="email" autocomplete="email" className="placeholder:text-white block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-light-grey-color ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 bg-[#1b1c1c]"/>
            </div>
            </div>
            </div>
            <div className='flex mt-5 gap-10 w-full'>
            <div className='w-1/3'>
            <label for="username" className="block text-lg font-normal leading-6 text-gray-900">username</label>
            <div className="mt-2.5">
              <input required placeholder='noshhoy' type="text" name="username" id="username" autocomplete="given-username" className="placeholder:text-white block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-light-grey-color ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 bg-[#1b1c1c]"/>
            </div>
            </div>
            <div className='w-1/3'>
            <label for="avatar-url" className="block text-lg font-normal leading-6 text-gray-900">Avatar URL</label>
            <div className="mt-2.5">
              <input required placeholder='https://avatars.github/noshhoy' type="url" name="avatar-url" id="avatar-url" autocomplete="avatar-url" className="placeholder:text-white block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-light-grey-color ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 bg-[#1b1c1c]"/>
            </div>
            </div>
            </div>
            <button
              type="submit"
              className="z-20 text-black mt-10 bg-light-blue hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md max-md:text-xs md:text-lg px-4 lg:py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update info
            </button>
            </form>
            <div className='mt-10'>
              <p className='text-[18px]'>Credits</p>
              <ul className='m-6 mb-3 mt-4 flex flex-col gap-3'>
                <li className='flex items-center gap-2'><img
                      className="pb-1 w-[16px] h-[16px]"
                      src={Tick}
                      alt="Tick"
                    />You have $300 in credits.</li>
                <li className='flex items-center gap-2'><img
                      className="pb-1 w-[16px] h-[16px]"
                      src={Tick}
                      alt="Tick"
                    />Get $25 in credit for every person you invite.</li>
              </ul>
            </div>
            <a href='/' className='ml-12 underline text-[16px] text-[#28B8CD]'>Learn more about credits</a>
          </div>
        )}
        {activeSection === 'Referrals & Credits' && (
          <div className="p-6 text-white max-w-[900px]">
            <h2 className="text-[24px] font-normal mb-5">Referrals & Credits</h2>
            <p className="mb-[10px] text-[20px]">Get $25 for every person you refer to Our Platfrom</p>
            <p className='text-[#878593] mb-[30px] text-[16px]'>You’ll receive credit when the person you invite signs up and verifies their email. You can rede this credit to upgrade your account or access premium features.</p>
            <form className="">
              <div>
                <label htmlFor="link" className="block text-lg font-normal leading-6 text-gray-900">Your referral link</label>
                <div className='mt-2.5 relative'>
                <button className='absolute right-[7px] top-[7px] cursor-pointer' onClick={handleCopy}>
                  <Copy />
                </button>
                <input ref={inputRef} placeholder='https://nexlater.io/invite/r/BZybi5Qf' disabled type="link" name="link" id="link" autocomplete="given-name" className="block placeholder:text-white w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-light-grey-color ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 bg-[#1b1c1c]"/>
                </div>
              </div>
              <div className='py-[20px] flex flex-col gap-[5px]'>
                <p className='text-[20px]'>Your credits</p>
                <p className='text-[#28B8CD] text-[28px] font-medium'>$300</p>
                <p className='text-[#878593] text-[16px]'>Earned from <span className='text-white'>12 referrals</span></p>
              </div>
              <div className="">
              <label for="email" className="block text-lg font-normal leading-6 text-gray-900">Email an invite</label>
              <div className="mt-2.5 flex h-fit gap-2">
                <input required placeholder='Enter email address' type="email" name="email" id="email" autocomplete="email" className="h-fit block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-light-grey-color ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 bg-[#1b1c1c]"/>
                <button 
                type="submit"
                className="z-20 h-fit w-[130px] text-black bg-light-blue hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md max-md:text-xs md:text-lg px-4 lg:py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Send Invite
                </button>
              </div>
              </div>
              <div className="mt-[30px]">
                <p className="text-[20px]">Confirmed Referrals</p>
                <ul className='m-6 mb-3 mt-4 flex flex-col gap-3 text-[16px]'>
                <li className='flex items-center gap-2'><img
                      className="pb-1 w-[16px] h-[16px]"
                      src={Tick}
                      alt="Tick"
                    />$25 Jhon Potter has signed up for Our Platform on 2024-07-15</li>
                <li className='flex items-center gap-2'><img
                      className="pb-1 w-[16px] h-[16px]"
                      src={Tick}
                      alt="Tick"
                    />$25 Sarah Thompson has signed up for Our Platform on 2024-07-14</li>
                <li className='flex items-center gap-2'><img
                      className="pb-1 w-[16px] h-[16px]"
                      src={Tick}
                      alt="Tick"
                    />$25 Michael Chen has signed up for Our Platform on 2024-07-13</li>
                </ul>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Refer;
