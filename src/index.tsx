import React from 'react';
// @ts-ignore
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './app';
import YoutubeService from './service/youtube-service';

const youtubeService: YoutubeService = new YoutubeService(process.env.REACT_APP_YOUTUBE_API_KEY!);

createRoot(document.getElementById('root'))
    .render(<App youtubeService={youtubeService}/>);
