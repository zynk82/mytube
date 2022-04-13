import React from 'react';
// @ts-ignore
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './app';
import YoutubeService from './service/youtube-service';

const youtubeService: YoutubeService = new YoutubeService('AIzaSyCK_skRn0x8G_s-BK5CcAfmfXnLow9_KpI');

createRoot(document.getElementById('root'))
    .render(<App youtubeService={youtubeService}/>);
