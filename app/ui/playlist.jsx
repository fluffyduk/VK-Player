import React from 'react'
import { SongCard } from './song_card'

export const Playlist = ({ songs, songIndex }) => {
  return (
    <div className='absolute right-3 h-[90%] overflow-auto tracks-scroll'>
        {
            songs.map((song, index) => (
              <SongCard key={song.track_id} song={song} isActive={index === songIndex} />
            ))
        }
    </div>
  )
}
