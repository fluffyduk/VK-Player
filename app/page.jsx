'use client'

import { useEffect, useRef, useState } from "react";
import { getUserSongs } from "./api-service";
import { Playlist } from "./ui/playlist";
import Player from "./ui/player";
import NoTracks from "./ui/no_tracks";

export default function Home() {
  const [musicFiles, setMusicFiles] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null); 

  useEffect(() => {
    console.log(musicFiles);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = musicFiles[currentTrackIndex]?.url;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [currentTrackIndex, musicFiles]);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16">
      {musicFiles.length === 0
      ? 
      <NoTracks setMusicFiles={setMusicFiles}/>
      : 
      <>
        <Playlist songs={musicFiles} songIndex={currentTrackIndex} />
        <Player musicFiles={musicFiles} currentTrackIndex={currentTrackIndex} setCurrentTrackIndex={setCurrentTrackIndex} audioRef={audioRef}/>
      </>
      }
    </div>
  );
}