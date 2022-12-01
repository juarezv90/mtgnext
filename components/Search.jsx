import React from 'react'
import {FcSearch} from 'react-icons/fc'

const Search = () => {
  return (
    <div className='w-full mt-20'>
        <div className='max-w-[1240px] w-[100%] m-auto flex justify-center items-center p-10'>
            <input className='border rounded p-1' type="text" placeholder='Search' />
            <FcSearch className='ml-1 cursor-pointer' size={20}/>
        </div>      
    </div>
  )
}

export default Search
