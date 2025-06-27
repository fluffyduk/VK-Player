import React from 'react'

export const SongCard = ({ song, isActive }) => {
  console.log(`Now ${song.title} is ${isActive}`);
  return (
    <div key={song.track_id} 
    className={`w-64 h-20 border-white border-1 rounded-md text-start p-4 mb-4 ${isActive ? 'bg-white text-black' : ''}`}>
        <p className='text-base'>{`${song.title}`}</p>
        <p className={`${isActive ? 'text-gray-800' : 'text-gray-400'} text-xs`}>{song.artist}</p>
    </div>
  )
}