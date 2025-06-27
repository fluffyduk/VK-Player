'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic } from 'lucide-react';
import { formatTime } from './utils';
import { getToken, getUserSongs } from "./api-service";
import { Playlist } from "./ui/playlist";

export default function Home() {
  const [musicFiles, setMusicFiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);

  // console.log(audioRef);

  const handlePlayPause = () => {
    isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  const handlePreviousTrack = () => {
    audioRef.current.src = musicFiles[currentTrackIndex - 1]?.src || '';
    setCurrentTrackIndex(currentTrackIndex - 1);
    setIsPlaying(false);
  }

  const handleNextTrack = () => {
    audioRef.current.src = musicFiles[currentTrackIndex + 1]?.src || '';
    setCurrentTrackIndex(currentTrackIndex + 1);
    setIsPlaying(false);
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleProgressBarChange = (e) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleUpdateSongs = (e) => {
    getUserSongs(312529343) 
    .then(res => res.json())
    .then(data => {
      setMusicFiles(data.filter(song => song.url));
    });
  };
  
  const handleChangeVolume = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  useEffect(() => {
    console.log(musicFiles);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = musicFiles[currentTrackIndex]?.url;
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(true)
      audioRef.current.play();
    }
  }, [currentTrackIndex, musicFiles]);

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Playlist songs={musicFiles} songIndex={currentTrackIndex} />
        <button className="flex justify-center items-center gap-2">
            <Volume2 />
            <input 
            type="range" 
            className="cursor-pointer bg-gray-400 h-[0.5em] accent-white" 
            value={volume}
            min={0}
            max={1}
            step={0.01}
            onChange={handleChangeVolume}
            />
        </button>
        <main className="flex flex-col gap-[32px] row-start-2 items-center">
          <div className="flex flex-col items-center">
            <p className="text-xl">{musicFiles[currentTrackIndex]?.title}</p>
            <p className="text-sm text-gray-300">{musicFiles[currentTrackIndex]?.artist}</p>
          </div>
          <div className="flex gap-6 min-w-24w items-center">
            <span>{formatTime(currentTime)}</span>
            <input type="range" 
            className="cursor-pointer bg-gray-400 h-[0.5em] accent-white"
            value={currentTime}
            max={duration}
            onChange={(e) => handleProgressBarChange(e)}
            onMouseDown={() => audioRef.current?.pause()}
            onMouseUp={() => audioRef.current?.play()}
          />
            <span>{formatTime(duration)}</span>
          </div>
          <div className="flex gap-1">
            <button onClick={handlePreviousTrack}>
              <SkipBack />
            </button>
            <button onClick={handlePlayPause}>
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button onClick={handleNextTrack}>
              <SkipForward />
            </button>
          </div>
          <audio
          ref={audioRef}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          />
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <button onClick={handleUpdateSongs}>Обновить</button>
        </footer>
      </div>
  );
}