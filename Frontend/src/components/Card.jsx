import React from 'react';

const Card = ({ title, description, icon, className }) => {
  return (
    <div className={`relative p-4 border-t-2 border-green-900 w-full md:w-[200px] bg-white rounded-lg shadow-md m-2 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      
      <div className='text-xl font-semibold text-green-900 mb-2'>
        {title}
      </div>

      <div className='text-green-800 mb-4 text-sm h-[50px]'>
        {description}
      </div>
      
      <div className='absolute right-1 md:bottom-3 bottom-4'>
        {icon}
      </div>
    </div>
  );
}

export default Card;