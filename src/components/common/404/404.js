import React from 'react';
import HomeSvg from '../../../assets/svgs/homeSvg.svg';

const BrokenPage = () => {
  return (
    <div className='flex'>
      <div className='flex flex-col gap-5 text-white overflow-hidden items-center justify-center'>
      <img src={HomeSvg} alt="HomeSvg" />
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>
          404 - ERROR!
        </h1>
        <h2 className='text-2xl'>
          Page Not Found
        </h2>
      </div>
      </div>
    </div>
  );
}

export default BrokenPage;
