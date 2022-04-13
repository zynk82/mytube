import React, {useCallback, useEffect, useState} from 'react';
import './app.module.css';
import VideoList from "./components/video-list/video-list";
import {VideoListData} from "./data/types";
import Header from "./components/header/header";
import styles from './app.module.css';
import YoutubeService from './service/youtube-service';

type AppProps = {
    youtubeService: YoutubeService;
}

function App({youtubeService}: AppProps) {
    const [videoList, setVideoList] = useState<VideoListData>({items: []});

    const queryPopular = () => {
        youtubeService.query("popular").then((videoDatas) => {
            setVideoList({items: videoDatas});
        }).catch((reason) => {
            alert(reason);
        });
    };

    const queryKeyword = (word: string) => {
        youtubeService.query("keyword", word).then((videoDatas) => {
            setVideoList({items: videoDatas});
        }).catch((reason) => {
            alert(reason);
        });
    };

    useEffect(queryPopular, []);

    const onSearch = useCallback((word: string) => {
            let inputWord = word.trim();

            queryKeyword(inputWord);
        }
        , []);

    const onHomeClick = useCallback(() => {
        queryPopular();
    }, []);

    return (
        <main className={styles.main}>
            <Header onSearch={onSearch} onHomeClick={onHomeClick}/>
            <VideoList videoList={videoList}/>
        </main>
    );
}

export default App;
