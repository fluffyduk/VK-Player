import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { formatTime } from '../utils';

export default function Player({musicFiles, currentTrackIndex, setCurrentTrackIndex, audioRef}) {
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

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

    const handleChangeVolume = (e) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    return (
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
            </div>
            <audio
            ref={audioRef}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            />
        </main>
    )
}
