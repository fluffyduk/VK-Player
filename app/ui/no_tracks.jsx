'use client'

import React, { useState } from 'react'
import { Roboto_Mono } from 'next/font/google';
import { getUserSongs } from '../api-service';

const robotoMono = Roboto_Mono({
  subsets: ["latin"]
});

export default function NoTracks({setMusicFiles}) {
    const [userIndex, setUserIndex] = useState(sessionStorage.getItem('vk_id'));

    console.log(userIndex);

    const handleUpdateSongs = (e) => {
        sessionStorage.setItem('vk_id', userIndex);
        getUserSongs(userIndex)
        .then(res => res.json())
        .then(data => {
            setMusicFiles(data.filter(song => song.url));
        });
    };

    return (
    <div className={`${robotoMono.className}`}>
        <h1 className='font-bold text-2xl mb-4'>Пока что ваши песни не загружены.</h1>
        <p>Введите ваш <a className='underline' href='https://id.vk.com/account/#/personal' target='_blank'>VK ID</a> ниже и нажмите загрузить. Учтите, что ваша музыка должна быть общедоступной!</p>
        <input placeholder={userIndex} type="text" onChange={(e) => setUserIndex(e.target.value)} className='border-white border-1 rounded-md'/>
        <button onClick={handleUpdateSongs}>Загрузить</button>
    </div>
    )
}