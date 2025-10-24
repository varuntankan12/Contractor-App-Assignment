import React from 'react'

const Footer = () => {
  return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-12 flex justify-around items-center text-gray-500 shadow-xl">
          <button className="flex flex-col items-center p-2 text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"></path></svg>
              <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3 .895-3 2-1.343 2-3 2h14"></path></svg>
              <span className="text-xs">Jobs</span>
          </button>
          <button className="flex flex-col items-center p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c1.657 0 3 .895 3 2s-1.343 2-3 2-3 .895-3 2h6"></path></svg>
              <span className="text-xs">Profile</span>
          </button>
      </div>
  )
}

export default Footer